const { runtime } = require('./lib/function');
const api = require('./lib/esteamsApi');

const react = (Esteams, m, emoji) => Esteams.sendMessage(m.chat, { react: { text: emoji, key: m.key } }).catch(() => {});

const requireArg = (args, usage) => {
	const text = args.join(' ').trim();
	if (!text) throw new Error(`Invalid input.\n\nUsage: ${usage}`);
	return text;
};

const requireQuotedImage = (m, usage) => {
	if (!m.quoted || !m.quoted.isMedia || !/image/i.test(m.quoted.mime || '')) {
		throw new Error(`Invalid input.\n\n${usage}`);
	}
	return m.quoted;
};

const MENU = `${global.botname}

📥 *DOWNLOAD*
${global.xprefix}tiktok <link>
${global.xprefix}facebook <link>
${global.xprefix}instagram <link>
${global.xprefix}spotify <track link>
${global.xprefix}play <song name>
${global.xprefix}apk <app name>
${global.xprefix}gdrive <link>
${global.xprefix}webdl <link>

🧲 *SCRAPE / STALK*
${global.xprefix}lyrics <song name>
${global.xprefix}weather <city>
${global.xprefix}technews
${global.xprefix}ttstalk <username>
${global.xprefix}igstalk <username>

🛠 *TOOLS*
${global.xprefix}qr <text>
${global.xprefix}tinyurl <link>
${global.xprefix}removebg (reply to an image)
${global.xprefix}ssweb <link>

🎨 *CREATIVE*
${global.xprefix}flux <prompt>
${global.xprefix}write <text>
${global.xprefix}logo <header> | <subtitle> (optionally reply to a background image)

🤖 *AI*
${global.xprefix}gpt <question>

⚙️ *OTHER*
${global.xprefix}ping
${global.xprefix}runtime

${global.wm}`;

const commands = {
	async menu(Esteams, m) {
		await m.reply(MENU);
	},
	async ping(Esteams, m) {
		const start = Date.now();
		const sent = await m.reply('Pinging...');
		const speed = Date.now() - start;
		await Esteams.sendMessage(m.chat, { text: `🏓 Pong! ${speed}ms`, edit: sent.key });
	},
	async runtime(Esteams, m) {
		await m.reply(`Bot has been running for ${runtime(process.uptime())}`);
	},

	// ---------- DOWNLOAD ----------
	async tiktok(Esteams, m) {
		const url = requireArg(m.args, `${global.xprefix}tiktok <video link>`);
		const data = await api.downloadTiktok(url);
		await Esteams.sendFileUrl(m.chat, data.video, `👤 *Author:* ${data.author || 'Unknown'}\n📝 *Description:* ${data.description || 'No description'}\n\n${global.wm}`, m);
	},
	async facebook(Esteams, m) {
		const url = requireArg(m.args, `${global.xprefix}facebook <video link>`);
		const { videoUrl } = await api.downloadFacebook(url);
		await Esteams.sendFileUrl(m.chat, videoUrl, global.wm, m);
	},
	async instagram(Esteams, m) {
		const url = requireArg(m.args, `${global.xprefix}instagram <reel/post link>`);
		const { videoUrl } = await api.downloadInstagram(url);
		await Esteams.sendFileUrl(m.chat, videoUrl, global.wm, m);
	},
	async spotify(Esteams, m) {
		const url = requireArg(m.args, `${global.xprefix}spotify <spotify track link>`);
		if (!url.startsWith('https://open.spotify.com/track/')) throw new Error('Please provide a valid Spotify track link.');
		const data = await api.downloadSpotify(url);
		await Esteams.sendFileUrl(m.chat, data.DownloadLink, `🎵 *${data.title}*\n⏱️ ${data.duration}\n🎤 ${data.channel}\n\n${global.wm}`, m);
	},
	async play(Esteams, m) {
		const query = requireArg(m.args, `${global.xprefix}play <song name>`);
		const data = await api.downloadSong(query);
		await Esteams.sendFileUrl(m.chat, data.audio.download_url, `🎵 *${data.title}*\n\n${global.wm}`, m);
	},
	async apk(Esteams, m) {
		const query = requireArg(m.args, `${global.xprefix}apk <app name>`);
		const data = await api.downloadApk(query);
		await m.reply(`📦 *${data.apk_name}*\n\n⬇️ ${data.download_link}\n\n${global.wm}`);
	},
	async gdrive(Esteams, m) {
		const url = requireArg(m.args, `${global.xprefix}gdrive <google drive link>`);
		const data = await api.downloadGdrive(url);
		await m.reply(`📁 *${data.name}*\n*Size:* ${data.size}\n\n⬇️ ${data.download_link}\n\n${global.wm}`);
	},
	async webdl(Esteams, m) {
		const url = requireArg(m.args, `${global.xprefix}webdl <website url>`);
		const { downloadUrl } = await api.downloadWebsite(url);
		await m.reply(`⬇️ ${downloadUrl}\n\n${global.wm}`);
	},

	// ---------- SCRAPE / STALK ----------
	async lyrics(Esteams, m) {
		const query = requireArg(m.args, `${global.xprefix}lyrics <song name>`);
		const { artist, title, lyrics } = await api.getLyrics(query);
		const preview = lyrics.length > 3500 ? lyrics.slice(0, 3500) + '\n\n...(truncated)' : lyrics;
		await m.reply(`🎤 *${title}* — ${artist}\n\n${preview}\n\n${global.wm}`);
	},
	async weather(Esteams, m) {
		const city = requireArg(m.args, `${global.xprefix}weather <city>`);
		const d = await api.getWeather(city);
		await m.reply(`⛅ *Weather in ${d.location}, ${d.country}*\n\n*Condition:* ${d.weather} (${d.description})\n*Temperature:* ${d.temperature}\n*Feels Like:* ${d.feels_like}\n*Humidity:* ${d.humidity}\n*Wind Speed:* ${d.wind_speed}\n*Pressure:* ${d.pressure}\n\n${global.wm}`);
	},
	async technews(Esteams, m) {
		const n = await api.getTechNews();
		await Esteams.sendFileUrl(m.chat, n.image, `📰 *${n.title}*\n\n${n.description}\n\n🔗 ${n.link}\n\n${global.wm}`, m);
	},
	async ttstalk(Esteams, m) {
		const username = requireArg(m.args, `${global.xprefix}ttstalk <username>`);
		const { user, stats } = await api.tiktokStalk(username);
		await Esteams.sendFileUrl(m.chat, user.avatarLarger, `👀 *TikTok Stalker*\n\n*Username:* ${user.uniqueId}\n*Nickname:* ${user.nickname}\n*Verified:* ${user.verified ? 'Yes ✅' : 'No ❌'}\n*Followers:* ${stats.followerCount.toLocaleString()}\n*Following:* ${stats.followingCount}\n*Likes:* ${stats.heartCount.toLocaleString()}\n*Videos:* ${stats.videoCount}\n\n${global.wm}`, m);
	},
	async igstalk(Esteams, m) {
		const username = requireArg(m.args, `${global.xprefix}igstalk <username>`);
		const d = await api.igStalk(username);
		await Esteams.sendFileUrl(m.chat, d.pp, `👀 *Instagram Stalker*\n\n*Username:* ${d.usrname}\n*Posts:* ${d.status.post}\n*Followers:* ${d.status.follower}\n*Following:* ${d.status.following}\n*Bio:* ${d.desk}\n\n${global.wm}`, m);
	},

	// ---------- TOOLS ----------
	async qr(Esteams, m) {
		const text = requireArg(m.args, `${global.xprefix}qr <text or link>`);
		const buffer = await api.generateQr(text);
		await Esteams.sendMessage(m.chat, { image: buffer, caption: `✅ QR code ready\n\n${global.wm}` }, { quoted: m });
	},
	async tinyurl(Esteams, m) {
		const url = requireArg(m.args, `${global.xprefix}tinyurl <link>`);
		const short = await api.shortenUrl(url);
		await m.reply(`🔗 ${short}\n\n${global.wm}`);
	},
	async removebg(Esteams, m) {
		const quoted = requireQuotedImage(m, `Reply to an image with ${global.xprefix}removebg`);
		const imgBuffer = await quoted.download();
		const catboxUrl = await api.uploadToCatbox(imgBuffer, 'image.jpg');
		if (!catboxUrl.startsWith('https://files.catbox.moe')) throw new Error('Failed to upload the image.');
		const buffer = await api.removeBg(catboxUrl);
		await Esteams.sendMessage(m.chat, { image: buffer, caption: `✅ Background removed\n\n${global.wm}` }, { quoted: m });
	},
	async ssweb(Esteams, m) {
		const url = requireArg(m.args, `${global.xprefix}ssweb <website url>`);
		if (!url.startsWith('http')) throw new Error('Please provide a valid website URL.');
		const buffer = await api.screenshotWebsite(url);
		await Esteams.sendMessage(m.chat, { image: buffer, caption: global.wm }, { quoted: m });
	},

	// ---------- CREATIVE ----------
	async flux(Esteams, m) {
		const prompt = requireArg(m.args, `${global.xprefix}flux <image prompt>`);
		const buffer = await api.generateFlux(prompt);
		await Esteams.sendMessage(m.chat, { image: buffer, caption: global.wm }, { quoted: m });
	},
	async write(Esteams, m) {
		const text = requireArg(m.args, `${global.xprefix}write <your text>`);
		const buffer = await api.generateBookQuote(text);
		await Esteams.sendMessage(m.chat, { image: buffer, caption: global.wm }, { quoted: m });
	},
	async logo(Esteams, m) {
		const input = requireArg(m.args, `${global.xprefix}logo <header> | <subtitle>`);
		const [header, subtitle = ''] = input.split('|').map((s) => s.trim());
		if (!header) throw new Error(`Invalid input.\n\nUsage: ${global.xprefix}logo <header> | <subtitle>`);

		let bgUrl = 'https://i.pinimg.com/736x/2f/9c/95/2f9c955cbc2dc6038b4d8a6f23271771.jpg';
		if (m.quoted && m.quoted.isMedia && /image/i.test(m.quoted.mime || '')) {
			const imgBuffer = await m.quoted.download();
			const uploaded = await api.uploadToCatbox(imgBuffer, 'bg.jpg');
			if (uploaded.startsWith('https://files.catbox.moe')) bgUrl = uploaded;
		}

		const buffer = await api.generateLogo(bgUrl, header, subtitle || 'ES TEAMS TECH');
		await Esteams.sendMessage(m.chat, { image: buffer, caption: global.wm }, { quoted: m });
	},

	// ---------- AI ----------
	async gpt(Esteams, m) {
		const text = requireArg(m.args, `${global.xprefix}gpt <question>`);
		const response = await api.askGpt(text);
		await m.reply(response);
	},
};

module.exports = async (Esteams, m) => {
	if (!m.body || m.prefix !== global.xprefix) return;
	const command = m.command?.toLowerCase();
	const handler = commands[command];
	if (!handler) return;

	try {
		await handler(Esteams, m);
	} catch (e) {
		await react(Esteams, m, '❌');
		await m.reply(`❌ ${e.message || 'Something went wrong. Please try again later.'}`).catch(() => {});
		console.error(`Command "${command}" failed:`, e);
	}
};
