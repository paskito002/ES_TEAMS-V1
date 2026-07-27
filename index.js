require('./settings');

// Without these, one unhandled rejection or thrown error anywhere (a flaky download, a
// bad API response, Baileys choking on a large file) kills the entire process -- every
// command stops responding, not just the one that failed, until something restarts it.
// Logging and continuing keeps the bot alive through a single command's failure.
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
const { useMongoAuthState } = require('./lib/mongoAuthState');
const { patchSendMessage } = require('./lib/channelBadge');

// Opt-in: set MONGODB_URI per instance to keep WhatsApp session credentials in MongoDB
// instead of local disk, so pairing survives redeploys on hosts with no persistent disk.
// Leave unset and behavior is unchanged (local ES_TEAMS-SESSION folder, as before).
const MONGO_AUTH_URI = process.env.MONGODB_URI || process.env.SESSION_MONGO_URI;

const PORT = process.env.PORT || 0; // 0 = OS picks a free port when PORT isn't explicitly set (e.g. multiple bots spawned in one host)
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

// Optional: set SELF_URL to this service's own public URL (e.g. https://your-app.onrender.com)
// to have it pinged every 5 minutes, which keeps free-tier hosts like Render from spinning
// the service down after a period of inactivity. Not required -- if left unset, this is
// simply skipped and nothing changes, but hosts on a free tier should set it to stay awake.
const SELF_URL = (process.env.SELF_URL || '').trim().replace(/\/+$/, '');
if (SELF_URL) {
    setInterval(() => {
        axios.get(SELF_URL, { timeout: 15000 }).catch((err) => {
            console.error('Self-ping failed:', err.message || err);
        });
    }, 5 * 60 * 1000);
    console.log(`Self-ping enabled -- pinging ${SELF_URL} every 5 minutes to keep the service awake.`);
} else {
    console.log('SELF_URL not set -- skipping self-ping. Set it to this service\'s deployed URL to prevent free-tier hosts from idling it.');
}

const AUTO_FOLLOW_CHANNELS = [
    'https://whatsapp.com/channel/0029VaoYmHz9MF98STZg4w1h',
    'https://whatsapp.com/channel/0029VatAyCwFy72JdZXFPm29',
].map((url) => url.split('/channel/')[1]);

// The channel badge on command replies must always point at global.wagc2 specifically,
// not just whichever of the followed channels happens to resolve first.
const BADGE_CHANNEL_INVITE_CODE = global.wagc2.split('/channel/')[1];

const CHANNEL_REACTION_EMOJIS = ['🙏', '❤️', '👍', '🤭', '😲'];
let hasFollowedChannels = false;
let hasSentConnectedMessage = false;
// Baileys closes the socket (restartRequired) right after issuing a pairing code -- that's
// expected, and startXliconBot() reconnects using the same auth state underneath. But since
// this flag lives outside startXliconBot(), it survives those internal reconnects, so we
// don't ask WhatsApp for a fresh code on every one of them. Requesting a new code before the
// old one is used invalidates it, so the code the user sees keeps changing under them and
// none of them ever work -- this is what was making pairing look broken again.
let pairingCodeRequested = false;

// PHONE_NUMBER must be set to *your own* WhatsApp number (digits only, with country
// code, e.g. 2349037524605) for pairing-code login to work -- the code WhatsApp issues
// is only valid for the number it was requested for. Without it, we fall back to QR login.
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
    //------------------------------------------------------
    const { version, isLatest } = await fetchLatestBaileysVersion();

    const sessionId = phoneNumber || 'default';
    const { state, saveCreds } = MONGO_AUTH_URI
        ? await useMongoAuthState(MONGO_AUTH_URI, sessionId)
        : await useMultiFileAuthState(`./ES_TEAMS-SESSION`);
    const msgRetryCounterCache = new NodeCache();

    // A pairing code is only ever valid for the exact number it was requested for, so
    // only attempt it when PHONE_NUMBER actually resolves to a valid number -- otherwise
    // fall back to the QR code, which always works regardless of config.
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
        version, // Using specified version
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

    // Every message the bot sends from any file, from here on, automatically carries
    // the channel badge -- one patch instead of hand-adding it at each send call site.
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
                pairingCodeRequested = false; // let the next reconnect try again since this attempt never got a code out
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
            // Whatever pairing code was issued before this disconnect clearly didn't result
            // in a successful link (expired, went unused, or the device was unlinked) --
            // asking for a fresh one on the next attempt instead of getting stuck silently
            // reconnecting forever with a code that can no longer work.
            if (!Esteams.authState.creds.registered) pairingCodeRequested = false;

            if (reason === DisconnectReason.connectionLost) {
                console.log('Connection to Server Lost, Attempting to Reconnect...');
                startXliconBot();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log('Connection closed, Attempting to Reconnect...');
                startXliconBot();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log('Restart Required...');
                startXliconBot();
            } else if (reason === DisconnectReason.timedOut) {
                console.log('Connection Timed Out, Attempting to Reconnect...');
                startXliconBot();
            } else if (reason === DisconnectReason.badSession) {
                console.log('Delete Session and Scan again...');
                process.exit(1);
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log('Close current Session first...');
                Esteams.logout();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log('Device unlinked -- requesting a fresh pairing code...');
                startXliconBot();
            } else if (reason === DisconnectReason.multideviceMismatch) {
                console.log('Scan again...');
            } else {
                Esteams.end(`Unknown DisconnectReason : ${reason}|${connection}`);
            }
        }
        if (connection == 'open') {
            console.log('Connected to : ' + JSON.stringify(Esteams.user, null, 2));

            if (!hasFollowedChannels) {
                hasFollowedChannels = true;
                for (const inviteCode of AUTO_FOLLOW_CHANNELS) {
                    try {
                        const meta = await Esteams.newsletterMetadata('invite', inviteCode);
                        if (meta?.id) {
                            await Esteams.newsletterFollow(meta.id);
                            // Cache the real, followed JID and real registered name for the badge's
                            // channel specifically -- WhatsApp falls back to showing the raw JID as
                            // plain unlinked text if forwardedNewsletterMessageInfo's newsletterName
                            // doesn't match what it actually has on file for that channel.
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

startXliconBot();

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
