require("./settings"), process.on("unhandledRejection", (_0x4d123d) => {
  console.error("Unhandled promise rejection (bot keeps running):", _0x4d123d);
}), process.on("uncaughtException", (_0x3340ac) => {
  console.error("Uncaught exception (bot keeps running):", _0x3340ac);
});
const fs = require("fs"), http = require("http"), pino = require("pino"), path = require("path"), axios = require("axios"), chalk = require("chalk"), figlet = require("figlet"), readline = require("readline"), FileType = require("file-type"), { exec } = require("child_process"), { Boom } = require("@hapi/boom"), NodeCache = require("node-cache"), PhoneNumber = require("awesome-phonenumber"), { default: makeWASocket, useMultiFileAuthState, Browsers, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser, proto, getAggregateVotesInPollMessage } = require("@whiskeysockets/baileys"), { makeInMemoryStore } = require("./lib/store"), { useMongoAuthState, clearMongoAuthState } = require("./lib/mongoAuthState"), { patchSendMessage } = require("./lib/channelBadge"), MONGO_AUTH_URI = process.env.MONGODB_URI || process.env.SESSION_MONGO_URI, SESSION_PATH = process.env.SESSION_PATH || (process.env.RAILWAY_VOLUME_MOUNT_PATH ? path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, "ES_TEAMS-SESSION") : "./ES_TEAMS-SESSION");
console.log(MONGO_AUTH_URI ? "Session storage: MongoDB" : 'Session storage: local folder at "' + SESSION_PATH + `" -- for this to survive restarts on a host with a persistent disk, SESSION_PATH must match that disk's mount path exactly.`);
const configuredApiKey = () => String(process.env.ES_TEAMS_API_KEY || "").trim() || String(global.users?.esteams_apikey || "").trim();
!configuredApiKey() && console.warn("ES_TEAMS_API_KEY is not set -- API commands need your own key: https://esteamstv.devs.surf/developers/api (set ES_TEAMS_API_KEY in your host's environment, or global.users.esteams_apikey in settings.js for a VPS panel, then restart).");
!MONGO_AUTH_URI && !process.env.SESSION_PATH && !process.env.RAILWAY_VOLUME_MOUNT_PATH && console.warn("No persistent session storage is configured (MONGODB_URI, SESSION_PATH or a Railway volume). If this host's disk is wiped on restart or redeploy, the bot has to be linked again every time -- and repeated link attempts are the most common reason WhatsApp flags numbers. Set MONGODB_URI, or mount a persistent disk/volume and point SESSION_PATH at it.");
const PORT = process.env.PORT || 0, statusServer = http.createServer((statusReq, statusRes) => {
  statusRes.writeHead(200, { "Content-Type": "text/plain" }), statusRes.end("ES TEAMS V1 IS ACTIVE\n");
});
statusServer.on("error", (_0x48617a) => {
  console.error("HTTP server failed to bind, continuing without it:", _0x48617a.message);
}), statusServer.listen(PORT, "0.0.0.0", () => {
  console.log("Server listening on port " + statusServer.address().port);
});
const SELF_URL = (process.env.SELF_URL || "").trim().replace(/\/+$/, "") || "http://localhost:" + PORT, PING_ENABLED = !!process.env.SELF_URL || !!process.env.RENDER;
!process.env.SELF_URL && process.env.RENDER && console.warn("SELF_URL is not set -- pinging " + SELF_URL + " instead, which will NOT stop Render from sleeping this service. Set SELF_URL to this service's public deployed URL (e.g. https://your-app.onrender.com) for the self-ping to actually work.");
PING_ENABLED && setInterval(async () => {
  try {
    await axios.get(SELF_URL, { timeout: 15e3 }), console.log("\u2705 ES TEAMS V1 IS PINGING " + SELF_URL + (process.env.SELF_URL ? "" : "  <-- LOCALHOST ONLY, THIS DOES NOT PREVENT SLEEP"));
  } catch (_0x36cff3) {
    console.error("\u274C ES TEAMS V1 PING FAILED:", _0x36cff3.message || _0x36cff3);
  }
}, 4 * 60 * 1e3);
const AUTO_FOLLOW_CHANNELS = ["https://whatsapp.com/channel/0029VaoYmHz9MF98STZg4w1h", "https://whatsapp.com/channel/0029VatAyCwFy72JdZXFPm29"].map((_0x50278c) => _0x50278c.split("/channel/")[1]), BADGE_CHANNEL_INVITE_CODE = global.wagc2.split("/channel/")[1], CHANNEL_REACTION_EMOJIS = ["\u{1F64F}", "\u2764\uFE0F", "\u{1F44D}", "\u{1F92D}", "\u{1F632}"];
let hasFollowedChannels = false, hasSentConnectedMessage = false, hasSetProfileName = false, hasCheckedUpdatesOnce = false, hasNotifiedOutOfDate = false, consecutiveBadSession = 0;
const MAX_LOGGED_OUT_RETRIES = 3, MAX_BAD_SESSION_RETRIES = 4, UPDATE_REPO = process.env.UPDATE_REPO || "paskito002/ES_TEAMS-V1", UPDATE_BRANCH = process.env.UPDATE_BRANCH || "main";
let currentEsteams = null;
async function checkForUpdates() {
  const _0x16b4ab = process.env.RENDER_GIT_COMMIT;
  if (!_0x16b4ab || !currentEsteams || hasNotifiedOutOfDate) return;
  try {
    {
      const { data: _0x106d27 } = await axios.get("https://api.github.com/repos/" + UPDATE_REPO + "/commits/" + UPDATE_BRANCH, { timeout: 15e3 });
      _0x106d27.sha && _0x106d27.sha !== _0x16b4ab && (hasNotifiedOutOfDate = true, await currentEsteams.sendMessage(currentEsteams.decodeJid(currentEsteams.user.id), { text: "\u{1F514} Your " + global.botname + " is out of date.\n\nType " + global.xprefix + "restart to get the latest version and relink." }));
    }
  } catch (_0x261d91) {
    console.error("Update check failed:", _0x261d91.message || _0x261d91);
  }
}
setInterval(checkForUpdates, 3 * 60 * 60 * 1e3);
const configuredPhoneNumber = String(process.env.PHONE_NUMBER || "").trim() || String(global.user?.phonenumber || "").trim();
let phoneNumber = configuredPhoneNumber.replace(/[^0-9]/g, "");
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code"), useMobile = process.argv.includes("--mobile"), rl = readline.createInterface({ input: process.stdin, output: process.stdout }), store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) }), question = (_0x2e8c11) => new Promise((_0x261f05) => rl.question(_0x2e8c11, _0x261f05));
let owner = JSON.parse(fs.readFileSync("./src/owner.json"));
global.api = (_0x42d044, _0x6b2dc5 = "/", _0x1ed3ab = {}, _0x317be4) => (_0x42d044 in global.APIs ? global.APIs[_0x42d044] : _0x42d044) + _0x6b2dc5 + (_0x1ed3ab || _0x317be4 ? "?" + new URLSearchParams(Object.entries({ ..._0x1ed3ab, ..._0x317be4 ? { [_0x317be4]: global.APIKeys[_0x42d044 in global.APIs ? global.APIs[_0x42d044] : _0x42d044] } : {} })) : "");
const DataBase = require("./src/database"), database = new DataBase();
(async () => {
  const _0x4f23c3 = await database.read();
  _0x4f23c3 && Object.keys(_0x4f23c3).length === 0 ? (global.db = { sticker: {}, users: {}, groups: {}, database: {}, settings: {}, others: {}, ..._0x4f23c3 || {} }, await database.write(global.db)) : global.db = _0x4f23c3, setInterval((async () => {
    if (global.db) await database.write(global.db);
  }), 3e4);
})();
const { GroupUpdate, GroupParticipantsUpdate, MessagesUpsert, Solving } = require("./src/message"), { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require("./lib/exif"), { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await: awaitFn, sleep } = require("./lib/function");
console.log(chalk.cyan(figlet.textSync("ES TEAMS", { font: "DOS Rebel", horizontalLayout: "default", vertivalLayout: "default", width: 60, whitespaceBreak: false }))), console.log(chalk.white.bold(chalk.gray.bold("\u{1F4C3}  Information :") + "\n\u2709\uFE0F  Script Name : ES TEAMS V1\n\u2709\uFE0F  Author : ES TEAMS\n\u2709\uFE0F  Gmail : examsolutionteam@gmail.com\n\u2709\uFE0F  Instagram : not available\n\n" + chalk.green.bold("Powered By ES TEAMS V1") + "\n"));
const envFlag = (name, fallback) => {
  const value = process.env[name];
  if (value === void 0 || value === "") return fallback;
  return /^(1|true|yes|on)$/i.test(value);
};
const envNumber = (name, fallback) => {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
};
const MARK_ONLINE = envFlag("MARK_ONLINE", false), SET_PROFILE_NAME = envFlag("SET_PROFILE_NAME", false), FOLLOW_CHANNELS = envFlag("AUTO_FOLLOW_CHANNELS", true), POST_LINK_DELAY_MS = envNumber("POST_LINK_DELAY_MS", 3 * 60 * 1e3), CONNECTED_MESSAGE_DELAY_MS = 2e4, BADGE_LOOKUP_DELAY_MS = 3e4, PAIRING_MIN_INTERVAL_MS = 90 * 1e3, PAIRING_MAX_REQUESTS = 3, RECONNECT_BASE_MS = 5e3, RECONNECT_MAX_MS = 5 * 60 * 1e3, REPLACED_RETRY_DELAY_MS = 60 * 1e3, MAX_REPLACED_RETRIES = 3;
let currentSock = null, reconnectTimer = null, reconnectAttempts = 0, replacedRetries = 0, haltedReason = null, pairingRequests = 0, lastPairingRequestAt = 0, hasLoadedBadgeChannel = false, pairingLimitLogged = false;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function haltReconnects(reason) {
  haltedReason = reason;
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  console.error(reason);
}
function scheduleReconnect(label, fixedDelayMs) {
  if (haltedReason || reconnectTimer) return;
  let delayMs;
  if (fixedDelayMs !== void 0) delayMs = fixedDelayMs;
  else {
    delayMs = Math.min(RECONNECT_MAX_MS, RECONNECT_BASE_MS * 2 ** Math.min(reconnectAttempts, 6)) + Math.floor(Math.random() * 2e3);
    reconnectAttempts++;
  }
  console.log(label + " Reconnecting in " + Math.round(delayMs / 1e3) + "s...");
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connectWithRetry();
  }, delayMs);
}
function retireSocket(oldSock) {
  if (!oldSock) return;
  try {
    oldSock.ev.removeAllListeners();
  } catch {
  }
  try {
    oldSock.end(void 0);
  } catch {
  }
}
async function wipeSession(authKey) {
  try {
    MONGO_AUTH_URI ? await clearMongoAuthState(MONGO_AUTH_URI, authKey) : fs.rmSync(SESSION_PATH, { recursive: true, force: true });
  } catch (error) {
    console.error("Failed to clear stale session:", error.message || error);
  }
}
async function requestPairingCode(sock) {
  if (sock.__pairingRequested) return;
  if (useMobile) throw new Error("Cannot use pairing code with mobile API");
  if (pairingRequests >= PAIRING_MAX_REQUESTS) {
    if (!pairingLimitLogged) {
      pairingLimitLogged = true;
      console.error("Pairing-code limit reached (" + PAIRING_MAX_REQUESTS + " requests this run). Not asking WhatsApp for more codes, because repeated requests get numbers rate-limited or banned. Wait at least an hour, then restart the service manually and try again.");
    }
    return;
  }
  const sinceLast = Date.now() - lastPairingRequestAt;
  if (sinceLast < PAIRING_MIN_INTERVAL_MS) {
    console.log("A pairing code was requested " + Math.round(sinceLast / 1e3) + "s ago -- not requesting another one yet. Use the code already shown above.");
    return;
  }
  sock.__pairingRequested = true;
  pairingRequests++;
  lastPairingRequestAt = Date.now();
  try {
    const code = await sock.requestPairingCode(phoneNumber);
    console.log(chalk.black(chalk.bgGreen("\u{1F381}  Your Es Teams Pairing Code : " + code))), console.log(chalk.yellow("Open WhatsApp on the phone for +" + phoneNumber + " -> Settings -> Linked Devices -> Link a device -> Link with phone number instead, then enter this code within a minute."));
  } catch (error) {
    console.error("Failed to request pairing code:", error.message || error);
  }
}
async function handleDisconnect(closedSock, statusCode, authKey) {
  if (haltedReason) return;
  switch (statusCode) {
    case DisconnectReason.restartRequired:
      console.log("Restart Required (normal right after linking)...");
      scheduleReconnect("Restart required.", 1500);
      return;
    case DisconnectReason.badSession: {
      consecutiveBadSession++;
      if (consecutiveBadSession <= MAX_BAD_SESSION_RETRIES) {
        console.log("Server returned a bad-session error (attempt " + consecutiveBadSession + "/" + MAX_BAD_SESSION_RETRIES + ") -- reconnecting WITHOUT wiping the session, since this is usually temporary...");
        scheduleReconnect("Bad session.");
        return;
      }
      console.log("Session still rejected after repeated retries -- clearing it so a fresh link can be started...");
      await wipeSession(authKey);
      consecutiveBadSession = 0;
      scheduleReconnect("Session cleared.", PAIRING_MIN_INTERVAL_MS);
      return;
    }
    case DisconnectReason.connectionReplaced:
      replacedRetries++;
      if (replacedRetries > MAX_REPLACED_RETRIES) {
        haltReconnects("Another instance keeps taking over this WhatsApp session. Stopping so the two instances stop fighting. Make sure only ONE copy of the bot runs for this number, then restart this service. (The session was NOT logged out.)");
        return;
      }
      console.log("Another instance replaced this session. NOT logging out (that would unlink your device).");
      scheduleReconnect("Waiting for the other instance to stop.", REPLACED_RETRY_DELAY_MS);
      return;
    case DisconnectReason.loggedOut:
      await wipeSession(authKey);
      haltReconnects("This device was logged out from WhatsApp (Linked Devices) and the saved session was cleared. Not retrying automatically, because repeated login attempts risk a ban. To link again, restart the service once and enter the new pairing code.");
      return;
    case DisconnectReason.forbidden:
      haltReconnects("WhatsApp refused this connection (HTTP 403). The number may be restricted or banned. Not retrying, because that makes it worse. Check the number in the WhatsApp app.");
      return;
    case DisconnectReason.multideviceMismatch:
      console.log("Scan again...");
      return;
    default:
      scheduleReconnect("Connection closed (code " + (statusCode ?? "unknown") + ").");
  }
}
function runLater(delayMs, task, attemptsLeft = 5) {
  setTimeout(async () => {
    const live = currentEsteams;
    if (!live || live !== currentSock) {
      if (attemptsLeft > 0) runLater(6e4, task, attemptsLeft - 1);
      return;
    }
    try {
      await task(live);
    } catch (error) {
      console.error("Post-connect task failed:", error.message || error);
    }
  }, delayMs + Math.floor(Math.random() * 5e3));
}
async function loadBadgeChannel(sock) {
  const meta = await sock.newsletterMetadata("invite", BADGE_CHANNEL_INVITE_CODE);
  if (meta?.id) {
    global.channelJid = meta.id;
    global.channelName = meta.name || meta.thread_metadata?.name?.text || global.ownername;
  }
}
async function followChannels(sock) {
  for (const code of AUTO_FOLLOW_CHANNELS) {
    try {
      const meta = await sock.newsletterMetadata("invite", code);
      if (meta?.id) {
        await sock.newsletterFollow(meta.id);
        if (code === BADGE_CHANNEL_INVITE_CODE) {
          global.channelJid = meta.id;
          global.channelName = meta.name || meta.thread_metadata?.name?.text || global.ownername;
        }
      }
    } catch (error) {
      console.error("Failed to follow channel", code, error.message || error);
    }
    await delay(3e3 + Math.floor(Math.random() * 7e3));
  }
}
async function sendConnectedMessage(sock) {
  const now = /* @__PURE__ */ new Date(), caption = "\u2705 *Connected Successfully!*\n\n\u{1F550} *Time:* " + now.toLocaleTimeString() + "\n\u{1F4C5} *Date:* " + now.toLocaleDateString() + "\n\u{1F916} *Bot Name:* " + global.botname + "\n\nType *" + global.xprefix + "menu* to get started.";
  await sock.sendMessage(sock.decodeJid(sock.user.id), { image: { url: global.botImage }, caption, ...global.channelJid ? { contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: global.channelJid, newsletterName: global.channelName || global.ownername, serverMessageId: -1 } } } : {} });
}
async function setProfileName(sock) {
  await sock.updateProfileName("ES TEAMS V1");
}
function schedulePostLinkTasks() {
  if (!hasSentConnectedMessage) {
    hasSentConnectedMessage = true;
    runLater(CONNECTED_MESSAGE_DELAY_MS, sendConnectedMessage);
  }
  if (!hasLoadedBadgeChannel) {
    hasLoadedBadgeChannel = true;
    runLater(BADGE_LOOKUP_DELAY_MS, loadBadgeChannel);
  }
  if (FOLLOW_CHANNELS && !hasFollowedChannels) {
    hasFollowedChannels = true;
    runLater(POST_LINK_DELAY_MS, followChannels);
  }
  if (SET_PROFILE_NAME && !hasSetProfileName) {
    hasSetProfileName = true;
    runLater(POST_LINK_DELAY_MS + 45e3, setProfileName);
  }
}
function onConnectionOpen(sock) {
  reconnectAttempts = 0, replacedRetries = 0, consecutiveBadSession = 0, console.log("Connected to : " + JSON.stringify(sock.user, null, 2)), currentEsteams = sock;
  if (global.db) {
    const botJid = sock.decodeJid(sock.user.id);
    global.db.settings[botJid] = global.db.settings[botJid] || {}, sock.public = global.db.settings[botJid].public !== false;
  }
  !hasCheckedUpdatesOnce && (hasCheckedUpdatesOnce = true, checkForUpdates());
  schedulePostLinkTasks();
}
async function startXliconBot() {
  retireSocket(currentSock);
  const { version: waVersion, isLatest: _0x161d22 } = await fetchLatestBaileysVersion(), authKey = phoneNumber || "default", { state: authState, saveCreds } = MONGO_AUTH_URI ? await useMongoAuthState(MONGO_AUTH_URI, authKey) : await useMultiFileAuthState(SESSION_PATH), retryCache = new NodeCache(), phoneValid = !!phoneNumber && PhoneNumber("+" + phoneNumber).isValid(), usePairing = pairingCode && phoneValid;
  pairingCode && !phoneValid && console.error(chalk.red('Invalid or missing PHONE_NUMBER ("' + phoneNumber + '"). Set PHONE_NUMBER in your host environment or global.user.phonenumber in settings.js to YOUR WhatsApp number, digits only, with country code, no + or spaces (e.g. 2349037524605), then restart. Falling back to QR code login.'));
  const sock = makeWASocket({ logger: pino({ level: "silent" }), printQRInTerminal: !usePairing, browser: Browsers.windows("Firefox"), auth: { creds: authState.creds, keys: makeCacheableSignalKeyStore(authState.keys, pino({ level: "fatal" }).child({ level: "fatal" })) }, version: waVersion, markOnlineOnConnect: MARK_ONLINE, generateHighQualityLinkPreview: true, getMessage: async (_0x47ee4a) => {
    {
      let _0x3d530d = jidNormalizedUser(_0x47ee4a.remoteJid), _0x1440bf = await store.loadMessage(_0x3d530d, _0x47ee4a.id);
      return _0x1440bf?.message || "";
    }
  }, msgRetryCounterCache: retryCache, defaultQueryTimeoutMs: void 0 });
  currentSock = sock, patchSendMessage(sock), store.bind(sock.ev);
  return store.bind(sock.ev), await Solving(sock, store), sock.ev.on("creds.update", saveCreds), sock.ev.on("connection.update", async (update) => {
    if (sock !== currentSock) return;
    const { connection, lastDisconnect, receivedPendingNotifications, qr } = update;
    if (qr && usePairing && !sock.authState.creds.registered) await requestPairingCode(sock);
    if (connection === "close") await handleDisconnect(sock, new Boom(lastDisconnect?.error)?.output.statusCode, authKey);
    if (connection === "open") onConnectionOpen(sock);
    else if (receivedPendingNotifications == "true") console.log("Please wait About 1 Minute...");
  }), sock.ev.on("contacts.update", (_0x201ade) => {
    for (let _0x201f71 of _0x201ade) {
      let _0x302b49 = sock.decodeJid(_0x201f71.id);
      if (store && store.contacts) store.contacts[_0x302b49] = { id: _0x302b49, name: _0x201f71.notify };
    }
  }), sock.ev.on("call", async (_0x671ff0) => {
    let _0x316db9 = await sock.decodeJid(sock.user.id), _0x1856dd = global.db.settings[_0x316db9].anticall;
    if (_0x1856dd) for (let _0x35d648 of _0x671ff0) {
      if (_0x35d648.status === "offer") {
        let _0x7ee5da = await sock.sendMessage(_0x35d648.from, { text: "Currently, We Cannot Receive Calls " + (_0x35d648.isVideo ? "Video" : "Voice") + ".\nIf @" + _0x35d648.from.split("@")[0] + " Needs Help, Please Contact Owner :)", mentions: [_0x35d648.from] });
        await sock.sendContact(_0x35d648.from, global.owner, _0x7ee5da), await sock.rejectCall(_0x35d648.id, _0x35d648.from);
      }
    }
  }), sock.ev.on("groups.update", async (_0x1cc000) => {
    await GroupUpdate(sock, _0x1cc000, store);
  }), sock.ev.on("group-participants.update", async (_0x106152) => {
    await GroupParticipantsUpdate(sock, _0x106152);
  }), sock.ev.on("messages.upsert", async (upsert) => {
    if (sock !== currentSock) return;
    for (const message of upsert.messages) {
      const serverId = message.newsletterServerId || message.key?.id;
      if (message.key?.remoteJid?.endsWith("@newsletter") && serverId) {
        const emoji = CHANNEL_REACTION_EMOJIS[Math.floor(Math.random() * CHANNEL_REACTION_EMOJIS.length)];
        setTimeout(() => {
          sock.newsletterReactMessage(message.key.remoteJid, serverId, emoji).catch((error) => {
            console.error("Failed to react to channel post", error.message || error);
          });
        }, 1e3 + Math.floor(Math.random() * 4e3));
      }
    }
    await MessagesUpsert(sock, upsert, store);
  }), sock;
}
async function connectWithRetry() {
  if (haltedReason) return;
  try {
    await startXliconBot();
  } catch (error) {
    console.error("Failed to start/reconnect the bot:", error.message || error);
    scheduleReconnect("Start failed.");
  }
}
connectWithRetry();
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file), console.log(chalk.redBright("Update " + __filename + " detected -- restarting cleanly instead of opening a second WhatsApp connection.")), setTimeout(() => process.exit(0), 500);
});
