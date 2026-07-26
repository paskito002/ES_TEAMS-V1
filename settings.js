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

const fs = require('fs');
const chalk = require('chalk');

//owmner v card
global.ytname = "YT: esteams" //ur yt chanel name
global.socialm = "GitHub: paskito002" //ur github or insta name
global.location = "Nigeria, Cross River, Calabar" //ur location

//new
global.botname = ' `🌱𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏🌱`' //ur bot name
global.ownernumber = ['2349037524605'] //ur owner number, dont add more than one
global.ownername = '𝗘𝗦 𝗧𝗘𝗔𝗠𝗦 𝗧𝗘𝗖𝗛' //ur owner name
global.websitex = "https://YouTube.com/@esteams"
global.wagc = "https://whatsapp.com/channel/0029VaoYmHz9MF98STZg4w1h"
global.wagc2 = "https://whatsapp.com/channel/0029VatAyCwFy72JdZXFPm29"
global.botImage = "https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg" //bot image used across the bot
global.themeemoji = '⛩'
global.wm = "Es Teams Bot Inc."
global.botscript = 'https://github.com/paskito002/ES_TEAMS-V1' //script link
global.packname = "ES TEAMS"
global.author = "MΛDΣ BY ES TEAMS TECH"
global.creator = "2349037524605@s.whatsapp.net"
global.xprefix = '.'
global.premium = ["2349037524605"] // Premium User

//bot sett
global.typemenu = 'v2' // menu type 'v1' => 'v12'
global.typereply = 'v4' // reply type 'v1' => 'v4'
global.autoblocknumber = '212' //set autoblock country code
global.antiforeignnumber = '91' //set anti foreign number country code
global.antidelete = false //set anti delete 


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

//~~~~~~~~~~~~~~~< PROCESS >~~~~~~~~~~~~~~~\\

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
