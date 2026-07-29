const fs = require('fs');
const chalk = require('chalk');

global.ytname = "YT: esteams"
global.socialm = "GitHub: paskito002"
global.location = "Nigeria, Cross River, Calabar"

global.botname = ' `🌱𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏🌱`'
global.ownernumber = ['2349037524605']
global.ownername = '𝗘𝗦 𝗧𝗘𝗔𝗠𝗦 𝗧𝗘𝗖𝗛'
global.websitex = "https://YouTube.com/@esteams"
global.wagc = "https://whatsapp.com/channel/0029VaoYmHz9MF98STZg4w1h"
global.wagc2 = "https://whatsapp.com/channel/0029VatAyCwFy72JdZXFPm29"
global.botImage = "https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg"
global.themeemoji = '⛩'
global.wm = "Es Teams Bot Inc."
global.botscript = 'https://github.com/paskito002/ES_TEAMS-V1'
global.packname = "ES TEAMS"
global.author = "MΛDΣ BY ES TEAMS TECH"
global.creator = "2349037524605@s.whatsapp.net"
global.xprefix = '.'
global.premium = ["2349037524605"]

global.typemenu = 'v2'
global.typereply = 'v4'
global.autoblocknumber = '212'
global.antiforeignnumber = '91'
global.antidelete = false


global.listv = ['🎄','🎅','🤶','🦌','🌟','✨','❄️','⛄','🎁','🛷','🔔','🎶','🎵','🍪','🥛','🧦','🕯️','🏡','🌌','🎉','🎊','🥂','🍷','🍎','🍏','🥧','🍗','🦃','🧣','🧤','🎍','🎑','🧸','💌','🏔️','🌲','🕊️','🛍️','🎬','🎠','🏰','🎇','🎆','🎗️','🌠','💫','🔥','🎼','🎹','🎷'];
global.tempatDB = 'database.json'



global.limit = {
	free: 100,
	premium: 999,
	vip: 'VIP'
}

global.uang = {
	free: 10000,
	premium: 1000000,
	vip: 10000000
}

global.mess = {
	error: 'Error!',
	nsfw: 'Nsfw is disabled in this group, Please tell the admin to enable',
	done: 'Done'
}

global.bot = {
	limit: 0,
	uang: 0
}

global.game = {
	suit: {},
	menfes: {},
	tictactoe: {},
	kuismath: {},
	tebakbom: {},
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
