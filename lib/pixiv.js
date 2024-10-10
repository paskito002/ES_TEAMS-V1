//══════════════════════════════════════════════════════════════════════════════════════════════════════//
//                                                                                                      //
//                                    𝐄𝐒 𝐓𝐄𝐀𝐌𝐒 𝐕𝟏                                                //
//                                                                                                      //
//                                         Ｖ：1.0                                                    //
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

const { URL_REGEX } = require('@whiskeysockets/baileys')
const { Pixiv } = require ( '@ibaraki-douji/pixivts')
const pixiv = new Pixiv()


async function pixivdl(query) {
	if (query.match(URL_REGEX)) {
		if (!/https:\/\/www.pixiv.net\/en\/artworks\/[0-9]+/i.test(query)) throw 'Invalid Pixiv Url'
		query = query.replace(/\D/g, '')
		let res = await pixiv.getIllustByID(query).catch(() => null)
		if (!res) throw `ID "${query}" not found :/`
		let media = []
		for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)))
		return {
			artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
		}
	} else {
		let res = await pixiv.getIllustsByTag(query)
		if (!res.length) throw `Tag's "${query}" not found :/`
		res = res[~~(Math.random() * res.length)].id
		res = await pixiv.getIllustByID(res)
		let media = []
		for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)))
		return {
			artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
		}
	}
}

module.exports = { pixivdl }