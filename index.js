require('./settings');
const fs = require('fs');
const pino = require('pino');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const readline = require('readline');
const FileType = require('file-type');
const { exec } = require('child_process');
const { Boom } = require('@hapi/boom');
const NodeCache = require('node-cache');
const PhoneNumber = require('awesome-phonenumber');
const { default: WAConnection, fetchLatestBaileysVersion, useMultiFileAuthState, Browsers, DisconnectReason, makeInMemoryStore, makeCacheableSignalKeyStore, fetchLatestWaWebVersion, proto, PHONENUMBER_MCC, getAggregateVotesInPollMessage } = require('@whiskeysockets/baileys');

let phoneNumber = "2348187637779"
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
let owner = JSON.parse(fs.readFileSync('./src/owner.json'))
const makeWASocket = require("@whiskeysockets/baileys").default

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

const DataBase = require('./src/database');
const database = new DataBase();
(async () => {
	const loadData = await database.read()
	if (loadData && Object.keys(loadData).length === 0) {
		global.db = {
			sticker: {},
			users: {},
			groups: {},
			database: {},
			 settings: {},
			others: {},
			...(loadData || {}),
		}
		await database.write(global.db)
	} else {
		global.db = loadData
	}
	
	setInterval(async () => {
		if (global.db) await database.write(global.db)
	}, 30000)
})();

const { GroupUpdate, GroupParticipantsUpdate, MessagesUpsert, Solving } = require('./src/message');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif');
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/function');

async function startXliconBot() {
//------------------------------------------------------
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } =await useMultiFileAuthState(`./session`)
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    const XliconBotInc = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
      browser: Browsers.windows('Firefox'), // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      markOnlineOnConnect: true, // set false for offline
      generateHighQualityLinkPreview: true, // make high preview link
      getMessage: async (key) => {
         let jid = jidNormalizedUser(key.remoteJid)
         let msg = await store.loadMessage(jid, key.id)

         return msg?.message || ""
      },
      msgRetryCounterCache, // Resolve waiting messages
      defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
   })
   
   store.bind(XliconBotInc.ev)

    // login use pairing code
   // source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L61
   if (pairingCode && !XliconBotInc.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')

      let phoneNumber
      if (!!phoneNumber) {
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +2348187637779")))
            process.exit(0)
         }
      } else {
         phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Es Teams said you should Please type your WhatsApp number 😍\nFor example: +2348187637779 : `)))
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         // Ask again when entering the wrong number
         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +2348187637779")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Es Teams said you should Please type your WhatsApp number 😍\nFor example: +2348187637779 : `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
         }
      }

      setTimeout(async () => {
         let code = await XliconBotInc.requestPairingCode(phoneNumber)
         code = code?.match(/.{1,4}/g)?.join("-") || code
         console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
      }, 3000)
   }
	
	store.bind(XliconBotInc.ev)
	
	await Solving(XliconBotInc, store)
	
	XliconBotInc.ev.on('creds.update', saveCreds)
	
	XliconBotInc.ev.on('connection.update', async (update) => {
		const { connection, lastDisconnect, receivedPendingNotifications } = update
		if (connection === 'close') {
			const reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.connectionLost) {
				console.log('Connection to Server Lost, Attempting to Reconnect...');
				startXliconBot()
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log('Connection closed, Attempting to Reconnect...');
				startXliconBot()
			} else if (reason === DisconnectReason.restartRequired) {
				console.log('Restart Required...');
				startXliconBot()
			} else if (reason === DisconnectReason.timedOut) {
				console.log('Connection Timed Out, Attempting to Reconnect...');
				startXliconBot()
			} else if (reason === DisconnectReason.badSession) {
				console.log('Delete Session and Scan again...');
				process.exit(1)
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log('Close current Session first...');
				XliconBotInc.logout();
			} else if (reason === DisconnectReason.loggedOut) {
				console.log('Scan again and Run...');
			} else if (reason === DisconnectReason.Multidevicemismatch) {
				console.log('Scan again...');
			} else {
				XliconBotInc.end(`Unknown DisconnectReason : ${reason}|${connection}`)
			}
		}
		if (connection == 'open') {
			console.log('Connected to : ' + JSON.stringify(XliconBotInc.user, null, 2));
		} else if (receivedPendingNotifications == 'true') {
			console.log('Please wait About 1 Minute...')
		}
	});
	
	XliconBotInc.ev.on('contacts.update', (update) => {
		for (let contact of update) {
			let id = XliconBotInc.decodeJid(contact.id)
			if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
		}
	});
	
	XliconBotInc.ev.on('call', async (call) => {
		let botNumber = await XliconBotInc.decodeJid(XliconBotInc.user.id);
		let anticall = global.db.settings[botNumber].anticall
		if (anticall) {
			for (let id of call) {
				if (id.status === 'offer') {
					let msg = await XliconBotInc.sendMessage(id.from, { text: `Currently, We Cannot Receive Calls ${id.isVideo ? 'Video' : 'Suara'}.\nIf @${id.from.split('@')[0]} Need Help, Please Contact Owner :)`, mentions: [id.from]});
					await XliconBotInc.sendContact(id.from, global.owner, msg);
					await XliconBotInc.rejectCall(id.id, id.from)
				}
			}
		}
	});
	
	XliconBotInc.ev.on('groups.update', async (update) => {
		await GroupUpdate(XliconBotInc, update, store);
	});
	
	XliconBotInc.ev.on('group-participants.update', async (update) => {
		await GroupParticipantsUpdate(XliconBotInc, update);
	});
	
	XliconBotInc.ev.on('messages.upsert', async (message) => {
		await MessagesUpsert(XliconBotInc, message, store);
	});

	return XliconBotInc
}

startXliconBot()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
