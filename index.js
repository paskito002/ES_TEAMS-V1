require('./settings');
const fs = require('fs');
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

const AUTO_FOLLOW_CHANNELS = [
    'https://whatsapp.com/channel/0029VaoYmHz9MF98STZg4w1h',
    'https://whatsapp.com/channel/0029VatAyCwFy72JdZXFPm29',
].map((url) => url.split('/channel/')[1]);

const CHANNEL_REACTION_EMOJIS = ['🙏', '❤️', '👍', '🤭', '😲'];
let hasFollowedChannels = false;
let hasSentConnectedMessage = false;

let phoneNumber = "2349037524605";
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

    const { state, saveCreds } = await useMultiFileAuthState(`./ES_TEAMS-SESSION`);
    const msgRetryCounterCache = new NodeCache();
    
    const Esteams = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode,
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
   
    store.bind(Esteams.ev);

    if (pairingCode && !Esteams.authState.creds.registered) {
        if (useMobile) throw new Error('Cannot use pairing code with mobile API');

        phoneNumber = process.env.PHONE_NUMBER || phoneNumber;

        setTimeout(async () => {
            const code = await Esteams.requestPairingCode(phoneNumber);
            console.log(chalk.black(chalk.bgGreen(`🎁  Your Es Teams Pairing Code : ${code}`)));
        }, 3000);
    }

    store.bind(Esteams.ev);
    await Solving(Esteams, store);
    Esteams.ev.on('creds.update', saveCreds);
    Esteams.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, receivedPendingNotifications } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
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
                console.log('Scan again and Run...');
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
                        if (meta?.id) await Esteams.newsletterFollow(meta.id);
                    } catch (e) {
                        console.error('Failed to follow channel', inviteCode, e.message || e);
                    }
                }
            }

            if (!hasSentConnectedMessage) {
                hasSentConnectedMessage = true;
                try {
                    const now = new Date();
                    const body = `✅ *Connected Successfully!*\n\n🕐 *Time:* ${now.toLocaleTimeString()}\n📅 *Date:* ${now.toLocaleDateString()}\n🤖 *Bot Name:* ${global.botname}`;
                    const buttons = [
                        {
                            name: 'quick_reply',
                            buttonParamsJson: JSON.stringify({ display_text: 'START', id: '.start' }),
                        },
                        {
                            name: 'cta_url',
                            buttonParamsJson: JSON.stringify({
                                display_text: 'WhatsApp Channel',
                                url: global.wagc2,
                                merchant_url: global.wagc2,
                            }),
                        },
                    ];
                    await Esteams.sendButtonImage(Esteams.user.id, buttons, null, {
                        image: global.botImage,
                        body,
                        footer: global.wm,
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
