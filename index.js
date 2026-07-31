require('./settings');

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled promise rejection (bot keeps running):', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception (bot keeps running):', err);
});

const fs = require('fs');
const http = require('http');
const pino = require('pino');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const figlet = require('figlet');
const readline = require('readline');
const FileType = require('file-type');
const { exec } = require('child_process');
const { Boom } = require('@hapi/boom');
const NodeCache = require('node-cache');
const PhoneNumber = require('awesome-phonenumber');
const { default: makeWASocket, useMultiFileAuthState, Browsers, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser, proto, getAggregateVotesInPollMessage } = require('@whiskeysockets/baileys');
const { makeInMemoryStore } = require('./lib/store');
const { useMongoAuthState, clearMongoAuthState } = require('./lib/mongoAuthState');
const { patchSendMessage } = require('./lib/channelBadge');

const MONGO_AUTH_URI = process.env.MONGODB_URI || process.env.SESSION_MONGO_URI;

const SESSION_PATH = process.env.SESSION_PATH || './ES_TEAMS-SESSION';
console.log(MONGO_AUTH_URI ? 'Session storage: MongoDB' : `Session storage: local folder at "${SESSION_PATH}" -- for this to survive restarts on a host with a persistent disk, SESSION_PATH must match that disk's mount path exactly.`);

const PORT = process.env.PORT || 0;
const statusServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ES TEAMS V1 IS ACTIVE\n');
});
statusServer.on('error', (err) => {
    console.error('HTTP server failed to bind, continuing without it:', err.message);
});
statusServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${statusServer.address().port}`);
});

const SELF_URL = (process.env.SELF_URL || '').trim().replace(/\/+$/, '') || `http://localhost:${PORT}`;
if (!process.env.SELF_URL) {
    console.warn(`SELF_URL is not set -- pinging ${SELF_URL} instead, which will NOT stop Render from sleeping this service. Set SELF_URL to this service's public deployed URL (e.g. https://your-app.onrender.com) for the self-ping to actually work.`);
}
setInterval(async () => {
    try {
        await axios.get(SELF_URL, { timeout: 15000 });
        console.log('✅ ES TEAMS V1 IS PINGING...');
    } catch (err) {
        console.error('❌ ES TEAMS V1 PING FAILED:', err.message || err);
    }
}, 4 * 60 * 1000);

const AUTO_FOLLOW_CHANNELS = [
    'https://whatsapp.com/channel/0029VaoYmHz9MF98STZg4w1h',
    'https://whatsapp.com/channel/0029VatAyCwFy72JdZXFPm29',
].map((url) => url.split('/channel/')[1]);

const BADGE_CHANNEL_INVITE_CODE = global.wagc2.split('/channel/')[1];

const CHANNEL_REACTION_EMOJIS = ['🙏', '❤️', '👍', '🤭', '😲'];
let hasFollowedChannels = false;
let hasSentConnectedMessage = false;
let pairingCodeRequested = false;
let consecutiveLoggedOut = 0;
const MAX_LOGGED_OUT_RETRIES = 3;

let phoneNumber = (process.env.PHONE_NUMBER || "").replace(/[^0-9]/g, '');
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code");
const useMobile = process.argv.includes("--mobile");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));
let owner = JSON.parse(fs.readFileSync('./src/owner.json'));

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '');

const DataBase = require('./src/database');
const database = new DataBase();
(async () => {
	const loadData = await database.read();
	if (loadData && Object.keys(loadData).length === 0) {
		global.db = {
			sticker: {},
			users: {},
			groups: {},
			database: {},
			settings: {},
			others: {},
			...(loadData || {}),
		};
		await database.write(global.db);
	} else {
		global.db = loadData;
	}

	setInterval(async () => {
		if (global.db) await database.write(global.db);
	}, 30000);
})();

const { GroupUpdate, GroupParticipantsUpdate, MessagesUpsert, Solving } = require('./src/message');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif');
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/function');

console.log(chalk.cyan(figlet.textSync("ES TEAMS", {
    font: 'DOS Rebel',
    horizontalLayout: 'default',
    vertivalLayout: 'default',
    width: 60,
    whitespaceBreak: false
})));

console.log(chalk.white.bold(`${chalk.gray.bold("📃  Information :")}
✉️  Script Name : ES TEAMS V1
✉️  Author : ES TEAMS
✉️  Gmail : examsolutionteam@gmail.com
✉️  Instagram : not available

${chalk.green.bold("Powered By ES TEAMS V1")}\n`));

async function startXliconBot() {
    const { version, isLatest } = await fetchLatestBaileysVersion();

    const sessionId = phoneNumber || 'default';
    const { state, saveCreds } = MONGO_AUTH_URI
        ? await useMongoAuthState(MONGO_AUTH_URI, sessionId)
        : await useMultiFileAuthState(SESSION_PATH);
    const msgRetryCounterCache = new NodeCache();

    const phoneNumberValid = !!phoneNumber && PhoneNumber('+' + phoneNumber).isValid();
    const usePairingCode = pairingCode && phoneNumberValid;
    if (pairingCode && !phoneNumberValid) {
        console.error(chalk.red(`Invalid or missing PHONE_NUMBER ("${phoneNumber}"). Set the PHONE_NUMBER environment variable to YOUR WhatsApp number, digits only, with country code, no + or spaces (e.g. 2349037524605), then redeploy. Falling back to QR code login.`));
    }

    const Esteams = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !usePairingCode,
        browser: Browsers.windows('Firefox'),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        version,
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        getMessage: async (key) => {
            let jid = jidNormalizedUser(key.remoteJid);
            let msg = await store.loadMessage(jid, key.id);
            return msg?.message || "";
        },
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined,
    });

    patchSendMessage(Esteams);

    store.bind(Esteams.ev);

    if (usePairingCode && !Esteams.authState.creds.registered && !pairingCodeRequested) {
        if (useMobile) throw new Error('Cannot use pairing code with mobile API');
        pairingCodeRequested = true;

        setTimeout(async () => {
            try {
                const code = await Esteams.requestPairingCode(phoneNumber);
                console.log(chalk.black(chalk.bgGreen(`🎁  Your Es Teams Pairing Code : ${code}`)));
                console.log(chalk.yellow(`Open WhatsApp on the phone for +${phoneNumber} -> Settings -> Linked Devices -> Link a device -> Link with phone number instead, then enter this code.`));
            } catch (e) {
                console.error('Failed to request pairing code:', e.message || e);
                pairingCodeRequested = false;
            }
        }, 3000);
    }

    store.bind(Esteams.ev);
    await Solving(Esteams, store);
    Esteams.ev.on('creds.update', saveCreds);
    Esteams.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, receivedPendingNotifications } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            if (!Esteams.authState.creds.registered) pairingCodeRequested = false;

            if (reason === DisconnectReason.connectionLost) {
                console.log('Connection to Server Lost, Attempting to Reconnect...');
                connectWithRetry();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log('Connection closed, Attempting to Reconnect...');
                connectWithRetry();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log('Restart Required...');
                connectWithRetry();
            } else if (reason === DisconnectReason.timedOut) {
                console.log('Connection Timed Out, Attempting to Reconnect...');
                connectWithRetry();
            } else if (reason === DisconnectReason.badSession) {
                console.log('Session is invalid -- clearing it and starting fresh with a new pairing code...');
                try {
                    if (MONGO_AUTH_URI) {
                        await clearMongoAuthState(MONGO_AUTH_URI, sessionId);
                    } else {
                        fs.rmSync(SESSION_PATH, { recursive: true, force: true });
                    }
                } catch (e) {
                    console.error('Failed to clear stale session:', e.message || e);
                }
                pairingCodeRequested = false;
                connectWithRetry();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log('Close current Session first...');
                Esteams.logout();
            } else if (reason === DisconnectReason.loggedOut) {
                consecutiveLoggedOut++;
                if (consecutiveLoggedOut > MAX_LOGGED_OUT_RETRIES) {
                    console.error(`Device unlinked ${consecutiveLoggedOut} times in a row -- WhatsApp is likely rejecting this number right now. Stopping automatic retries so we don't get flagged for spamming pairing requests. Restart the service manually once you're ready to try again.`);
                } else {
                    const delayMs = 15000 * consecutiveLoggedOut;
                    console.log(`Device unlinked -- waiting ${delayMs / 1000}s before requesting a fresh pairing code (attempt ${consecutiveLoggedOut}/${MAX_LOGGED_OUT_RETRIES})...`);
                    setTimeout(() => connectWithRetry(), delayMs);
                }
            } else if (reason === DisconnectReason.multideviceMismatch) {
                console.log('Scan again...');
            } else if (reason === DisconnectReason.unavailableService) {
                console.log('WhatsApp service temporarily unavailable, Attempting to Reconnect...');
                connectWithRetry();
            } else {
                console.log(`Unknown DisconnectReason : ${reason}|${connection} -- Attempting to Reconnect...`);
                connectWithRetry();
            }
        }
        if (connection == 'open') {
            consecutiveLoggedOut = 0;
            console.log('Connected to : ' + JSON.stringify(Esteams.user, null, 2));

            if (!hasFollowedChannels) {
                hasFollowedChannels = true;
                for (const inviteCode of AUTO_FOLLOW_CHANNELS) {
                    try {
                        const meta = await Esteams.newsletterMetadata('invite', inviteCode);
                        if (meta?.id) {
                            await Esteams.newsletterFollow(meta.id);
                            if (inviteCode === BADGE_CHANNEL_INVITE_CODE) {
                                global.channelJid = meta.id;
                                global.channelName = meta.name || meta.thread_metadata?.name?.text || global.ownername;
                            }
                        }
                    } catch (e) {
                        console.error('Failed to follow channel', inviteCode, e.message || e);
                    }
                }
            }

            if (!hasSentConnectedMessage) {
                hasSentConnectedMessage = true;
                try {
                    const now = new Date();
                    const caption = `✅ *Connected Successfully!*\n\n🕐 *Time:* ${now.toLocaleTimeString()}\n📅 *Date:* ${now.toLocaleDateString()}\n🤖 *Bot Name:* ${global.botname}\n\nType *${global.xprefix}menu* to get started.`;
                    await Esteams.sendMessage(Esteams.decodeJid(Esteams.user.id), {
                        image: { url: global.botImage },
                        caption,
                        ...(global.channelJid ? { contextInfo: { forwardingScore: 999, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: global.channelJid, newsletterName: global.channelName || global.ownername, serverMessageId: -1 } } } : {}),
                    });
                } catch (e) {
                    console.error('Failed to send connected message', e.message || e);
                }
            }
        } else if (receivedPendingNotifications == 'true') {
            console.log('Please wait About 1 Minute...');
        }
    });

    Esteams.ev.on('contacts.update', (update) => {
        for (let contact of update) {
            let id = Esteams.decodeJid(contact.id);
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
        }
    });

    Esteams.ev.on('call', async (call) => {
        let botNumber = await Esteams.decodeJid(Esteams.user.id);
        let anticall = global.db.settings[botNumber].anticall;
        if (anticall) {
            for (let id of call) {
                if (id.status === 'offer') {
                    let msg = await Esteams.sendMessage(id.from, { text: `Currently, We Cannot Receive Calls ${id.isVideo ? 'Video' : 'Voice'}.\nIf @${id.from.split('@')[0]} Needs Help, Please Contact Owner :)`, mentions: [id.from] });
                    await Esteams.sendContact(id.from, global.owner, msg);
                    await Esteams.rejectCall(id.id, id.from);
                }
            }
        }
    });

    Esteams.ev.on('groups.update', async (update) => {
        await GroupUpdate(Esteams, update, store);
    });

    Esteams.ev.on('group-participants.update', async (update) => {
        await GroupParticipantsUpdate(Esteams, update);
    });

    Esteams.ev.on('messages.upsert', async (message) => {
        for (const msg of message.messages) {
            const serverId = msg.newsletterServerId || msg.key?.id;
            if (msg.key?.remoteJid?.endsWith('@newsletter') && serverId) {
                const emoji = CHANNEL_REACTION_EMOJIS[Math.floor(Math.random() * CHANNEL_REACTION_EMOJIS.length)];
                Esteams.newsletterReactMessage(msg.key.remoteJid, serverId, emoji).catch((e) => {
                    console.error('Failed to react to channel post', e.message || e);
                });
            }
        }
        await MessagesUpsert(Esteams, message, store);
    });

    return Esteams;
}

async function connectWithRetry() {
    try {
        await startXliconBot();
    } catch (e) {
        console.error('Failed to start/reconnect the bot, retrying in 10s:', e.message || e);
        setTimeout(connectWithRetry, 10000);
    }
}

connectWithRetry();

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
