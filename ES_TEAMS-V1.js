const os = require('os');
const moment = require('moment-timezone');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { runtime } = require('./lib/function');
const { imageToWebp, videoToWebp, addExif } = require('./lib/exif');
const { channelInfo } = require('./lib/channelBadge');
const api = require('./lib/esteamsApi');

function bold(text) {
	return String(text).replace(/[A-Za-z0-9]/g, (ch) => {
		const code = ch.codePointAt(0);
		if (code >= 0x41 && code <= 0x5a) return String.fromCodePoint(code + 0x1d593); // A-Z
		if (code >= 0x61 && code <= 0x7a) return String.fromCodePoint(code + 0x1d58d); // a-z
		if (code >= 0x30 && code <= 0x39) return String.fromCodePoint(code + 0x1d7bc); // 0-9
		return ch;
	});
}

// Serif-bold (𝐀𝐚𝟎), used for command names in the menu -- distinct from the sans-bold
// (𝗔𝗮𝟎) used for section headers, matching the two-typeface look of the reference menu.
function boldSerif(text) {
	return String(text).replace(/[A-Za-z0-9]/g, (ch) => {
		const code = ch.codePointAt(0);
		if (code >= 0x41 && code <= 0x5a) return String.fromCodePoint(code + 0x1d3bf); // A-Z
		if (code >= 0x61 && code <= 0x7a) return String.fromCodePoint(code + 0x1d3b9); // a-z
		if (code >= 0x30 && code <= 0x39) return String.fromCodePoint(code + 0x1d79e); // 0-9
		return ch;
	});
}

function linkLine(displayText, url) {
	return `🔗 ${displayText}: ${url}`;
}

// Native-flow interactive buttons don't reliably render on this account (confirmed live:
// message relays with no error but nothing shows on the phone), so every reply instead
// carries its links as plain, auto-linkified WhatsApp URLs inside the caption itself,
// plus the channel badge above for branding.
async function sendBrandedReply(Esteams, m, { image, video, body, extraButtons = [] }) {
	const links = extraButtons.map((b) => linkLine(b.displayText, b.url));
	const caption = links.length ? `${body}\n\n${links.join('\n')}` : body;

	if (video) {
		return Esteams.sendMessage(m.chat, { video: Buffer.isBuffer(video) ? video : { url: video }, caption, ...channelInfo() }, { quoted: m });
	}
	if (image) {
		return Esteams.sendMessage(m.chat, { image: Buffer.isBuffer(image) ? image : { url: image }, caption, ...channelInfo() }, { quoted: m });
	}
	return Esteams.sendMessage(m.chat, { text: caption, ...channelInfo() }, { quoted: m });
}

const requireArg = (args, usage) => {
	const text = args.join(' ').trim();
	if (!text) throw new Error(`Invalid input.\n\nUsage: ${usage}`);
	return text;
};

// Fetches group metadata and enforces that the sender and the bot are both admins.
// Baileys' Contact type (which GroupParticipant extends, and which authState.creds.me /
// Esteams.user also follow) has THREE identity fields: .id (whichever WhatsApp prefers
// for that group's addressing mode -- LID or phone-number JID), .lid (explicitly LID),
// and .phoneNumber (explicitly the @s.whatsapp.net form). A plain "===" on just m.sender
// or Esteams.user.id can miss the real entry when it's filed under a different one of
// these than the one we're comparing -- match against all three instead of guessing
// which format applies. If the bot's own entry still can't be found at all, assume it's
// admin rather than block the command -- the group action itself fails cleanly if that
// assumption turns out wrong.
async function requireGroupAdmin(Esteams, m) {
	if (!m.isGroup) throw new Error('This command can only be used in a group.');
	const metadata = await Esteams.groupMetadata(m.chat);

	const botIdentities = [Esteams.user?.id, Esteams.user?.lid, Esteams.user?.phoneNumber, Esteams.authState?.creds?.me?.id, Esteams.authState?.creds?.me?.lid, Esteams.authState?.creds?.me?.phoneNumber].filter(Boolean);
	const senderIdentities = [m.sender, m.key?.participant, m.key?.participantAlt].filter(Boolean);
	const matchesAny = (p, identities) => identities.includes(p.id) || identities.includes(p.lid) || identities.includes(p.phoneNumber);

	const sender = metadata.participants.find((p) => matchesAny(p, senderIdentities));
	const bot = metadata.participants.find((p) => matchesAny(p, botIdentities));

	const isSenderAdmin = sender && (sender.admin === 'admin' || sender.admin === 'superadmin');
	const isBotAdmin = !bot || bot.admin === 'admin' || bot.admin === 'superadmin';

	if (!isSenderAdmin) throw new Error('This command is for group admins only.');
	if (!isBotAdmin) throw new Error('I need to be an admin in this group to do that.');
	return metadata;
}

const resolveTarget = (m) => {
	const number = m.args.join('').replace(/\D/g, '');
	return number ? `${number}@s.whatsapp.net` : m.quoted?.sender;
};

const requireQuotedImage = (m, usage) => {
	if (!m.quoted || !m.quoted.isMedia || !/image/i.test(m.quoted.mime || '')) {
		throw new Error(`Invalid input.\n\n${usage}`);
	}
	return m.quoted;
};

const MENU_SECTIONS = [
	{
		title: 'DOWNLOAD MENU',
		commands: ['tiktok <link>', 'facebook <link>', 'instagram <link>', 'twitter <link>', 'ytmp4 <link>', 'spotify <track link>', 'play <song name>', 'video <title>', 'apk <app name>', 'gdrive <link>', 'webdl <link>'],
	},
	{
		title: 'GROUP MENU',
		commands: ['kick <number>', 'promote <number>', 'demote <number>', 'tagall <text>', 'hidetag <text>', 'linkgroup', 'resetlink', 'setgcname <name>', 'setgcdesc <desc>', 'setgcpp (reply image)', 'listadmin', 'group open|close', 'welcome on|off', 'antilink on|off', 'leave', 'delete (reply)'],
	},
	{
		title: 'SCRAPE / STALK MENU',
		commands: ['lyrics <song name>', 'weather <city>', 'technews', 'ttstalk <username>', 'igstalk <username>'],
	},
	{
		title: 'TOOLS MENU',
		commands: ['qr <text>', 'tinyurl <link>', 'removebg (reply image)', 'ssweb <link>'],
	},
	{
		title: 'CREATIVE MENU',
		commands: ['flux <prompt>', 'write <text>', 'logo <header>|<subtitle>'],
	},
	{
		title: 'AI MENU',
		commands: ['gpt <question>'],
	},
	{
		title: 'MEDIA MENU',
		commands: ['sticker (reply image/video)', 'shazam (reply audio/video)', 'vv (reply view-once photo/video)'],
	},
	{
		title: 'FUN MENU',
		commands: ['joke', 'quran <surah#>', 'bible <e.g. John 3:16>', 'trend', 'jid', 'info <number>', 'jail (reply image)', 'poll <question>|<options>', 'chatbot on|off'],
	},
	{
		title: 'UTILITY MENU',
		commands: ['tempmail', 'checkmail <key>', 'imgscan (reply image)', 'scanqr (reply image)', 'sysinfo'],
	},
	{
		title: 'USER MENU',
		commands: ['ping', 'runtime'],
	},
];

function ramBar(len = 12) {
	const total = os.totalmem();
	const free = os.freemem();
	const percent = Math.round(((total - free) / total) * 100);
	const filled = Math.round((percent / 100) * len);
	return `${'█'.repeat(filled)}${'░'.repeat(len - filled)} ${percent}%`;
}

function boxSection(title, commands) {
	const lines = commands.map((c) => `┃ ${boldSerif(global.xprefix + c)} ◁️❄️🕷️`).join('\n');
	return `╭━━━❄️【 ${bold(title)} 】❄️━━━╮\n${lines}\n╰━━━━━━━━━━━━━━━━━━━━━╯`;
}

function buildMenu() {
	const now = moment().tz('Africa/Lagos');
	const totalCommands = MENU_SECTIONS.reduce((n, s) => n + s.commands.length, 0);
	const header = [
		`╭━━━━━❄️【 ${bold('ES TEAMS V1')} 】❄️━━━━━╮`,
		`┃ ❁️ Owner : ${global.ownername}`,
		`┃ ❁️ Date : ${now.format('DD MMMM YYYY')}`,
		`┃ ❁️ Time : ${now.format('hh:mm:ss a')}`,
		`┃ ❁️ Commands : ${totalCommands}`,
		`┃ ❁️ Prefix : ${global.xprefix}`,
		`┃ ❁️ Ram : ${ramBar()}`,
		`╰━━━━━━━━━━━━━━━━━━━━━╯`,
	].join('\n');

	const sections = MENU_SECTIONS.map((s) => boxSection(s.title, s.commands)).join('\n');
	return `${header}\n${sections}`;
}

const GROUP_INVITE_LINK = /chat\.whatsapp\.com\/[a-zA-Z0-9]+/i;

async function enforceAntilink(Esteams, m) {
	if (!m.isGroup || m.fromMe || !m.body || !GROUP_INVITE_LINK.test(m.body)) return;
	if (!global.db.groups[m.chat]?.antilink) return;
	try {
		const metadata = await Esteams.groupMetadata(m.chat);
		const sender = metadata.participants.find((p) => p.id === m.sender);
		if (sender?.admin) return;
		await Esteams.sendMessage(m.chat, { delete: m.key });
		await Esteams.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
		await Esteams.sendMessage(m.chat, { text: `🚫 @${m.sender.split('@')[0]} was removed for sending a group invite link.`, mentions: [m.sender], ...channelInfo() });
	} catch (e) {
		console.error('Antilink enforcement failed:', e.message || e);
	}
}

// Auto-replies with AI when .chatbot on has been set for this chat -- skipped for
// anything that looks like a bot command so it never fights the switch below.
async function handleChatbotReply(Esteams, m) {
	if (m.fromMe || !m.body || m.prefix === global.xprefix) return;
	if (!global.db.groups[m.chat]?.chatbot) return;
	try {
		const response = await api.askGpt(m.body);
		await m.reply(response);
	} catch (e) {
		console.error('Chatbot auto-reply failed:', e.message || e);
	}
}

// Reacting on the invoking message doubles as a lightweight "loading" indicator --
// an hourglass while the command runs, swapped for a checkmark/cross when it settles --
// so a slow API call reads as "working on it" instead of "did this get through?".
const react = (Esteams, m, emoji) => Esteams.sendMessage(m.chat, { react: { text: emoji, key: m.key } }).catch(() => {});

module.exports = async (Esteams, m) => {
	// Every m.reply from here on (including the error path below and the chatbot
	// auto-reply) carries the channel badge, same as sendBrandedReply already does --
	// scoped to this one message's m object, so it never leaks to other handlers.
	const plainReply = m.reply.bind(m);
	m.reply = (text, options = {}) => plainReply(text, { ...channelInfo(), ...options });

	await enforceAntilink(Esteams, m);
	await handleChatbotReply(Esteams, m);
	if (!m.body || m.prefix !== global.xprefix) return;
	const command = m.command?.toLowerCase();

	await react(Esteams, m, '⏳');

	try {
		switch (command) {
			case 'menu':
			case 'start': {
				await sendBrandedReply(Esteams, m, { image: global.botImage, body: buildMenu() });
				break;
			}

			case 'ping': {
				const t0 = Date.now();
				await sendBrandedReply(Esteams, m, { image: global.botImage, body: `${bold('Pong!')} ${Date.now() - t0}ms` });
				break;
			}

			case 'runtime': {
				await sendBrandedReply(Esteams, m, { image: global.botImage, body: `${bold('Uptime:')} ${runtime(process.uptime())}` });
				break;
			}

			// ---------- DOWNLOAD ----------
			case 'tiktok': {
				const url = requireArg(m.args, `${global.xprefix}tiktok <video link>`);
				const data = await api.downloadTiktok(url);
				const body = `${bold('ES TEAMS V1 TIKTOK DOWNLOADER')}\n\n${bold('Author:')} ${data.author || 'Unknown'}\n${bold('Description:')} ${data.description || 'No description'}`;
				await sendBrandedReply(Esteams, m, { video: data.video, body });
				break;
			}

			case 'facebook': {
				const url = requireArg(m.args, `${global.xprefix}facebook <video link>`);
				const { videoUrl } = await api.downloadFacebook(url);
				await sendBrandedReply(Esteams, m, { video: videoUrl, body: bold('ES TEAMS V1 FACEBOOK DOWNLOADER') });
				break;
			}

			case 'instagram': {
				const url = requireArg(m.args, `${global.xprefix}instagram <reel/post link>`);
				const { videoUrl } = await api.downloadInstagram(url);
				await sendBrandedReply(Esteams, m, { video: videoUrl, body: bold('ES TEAMS V1 INSTAGRAM DOWNLOADER') });
				break;
			}

			case 'twitter': {
				const url = requireArg(m.args, `${global.xprefix}twitter <tweet link>`);
				const { videoUrl } = await api.downloadTwitter(url);
				await sendBrandedReply(Esteams, m, { video: videoUrl, body: bold('ES TEAMS V1 TWITTER DOWNLOADER') });
				break;
			}

			case 'ytmp4': {
				const url = requireArg(m.args, `${global.xprefix}ytmp4 <youtube link>`);
				const data = await api.downloadYoutube(url);
				const body = `${bold('ES TEAMS V1 YOUTUBE DOWNLOADER')}\n\n${bold('Title:')} ${data.title}\n${bold('Quality:')} ${data.quality}`;
				await sendBrandedReply(Esteams, m, { video: data.download_url, body });
				break;
			}

			case 'spotify': {
				const url = requireArg(m.args, `${global.xprefix}spotify <spotify track link>`);
				if (!url.startsWith('https://open.spotify.com/track/')) throw new Error('Please provide a valid Spotify track link.');
				const data = await api.downloadSpotify(url);
				const body = `${bold('ES TEAMS V1 SPOTIFY DOWNLOADER')}\n\n${bold('Title:')} ${data.title}\n${bold('Duration:')} ${data.duration}\n${bold('Author:')} ${data.channel}`;
				await sendBrandedReply(Esteams, m, { image: data.thumbnail, body, extraButtons: [{ displayText: 'Download Now', url: data.DownloadLink }] });
				break;
			}

			case 'play': {
				const query = requireArg(m.args, `${global.xprefix}play <song name>`);
				const data = await api.downloadSong(query);
				await sendBrandedReply(Esteams, m, { image: data.thumbnail || global.botImage, body: `${bold('ES TEAMS V1 MUSIC DOWNLOADER')}\n\n${bold('Title:')} ${data.title}` });
				await Esteams.sendMessage(m.chat, { audio: { url: data.audio.download_url }, mimetype: 'audio/mpeg', ...channelInfo() }, { quoted: m });
				break;
			}

			case 'video': {
				const query = requireArg(m.args, `${global.xprefix}video <title>`);
				const data = await api.downloadVideoSong(query);
				await sendBrandedReply(Esteams, m, { image: data.thumbnail || global.botImage, body: `${bold('ES TEAMS V1 VIDEO DOWNLOADER')}\n\n${bold('Title:')} ${data.title}` });
				await Esteams.sendMessage(m.chat, { video: { url: data.videoUrl }, mimetype: 'video/mp4', ...channelInfo() }, { quoted: m });
				break;
			}

			case 'apk': {
				const query = requireArg(m.args, `${global.xprefix}apk <app name>`);
				const data = await api.downloadApk(query);
				const body = `${bold('ES TEAMS V1 APK DOWNLOADER')}\n\n${bold('App Name:')} ${data.apk_name}`;
				await sendBrandedReply(Esteams, m, { image: data.thumbnail || global.botImage, body, extraButtons: [{ displayText: 'Download APK', url: data.download_link }] });
				break;
			}

			case 'gdrive': {
				const url = requireArg(m.args, `${global.xprefix}gdrive <google drive link>`);
				const data = await api.downloadGdrive(url);
				const body = `${bold('ES TEAMS V1 GOOGLE DRIVE')}\n\n${bold('Name:')} ${data.name}\n${bold('Size:')} ${data.size}`;
				await sendBrandedReply(Esteams, m, { image: global.botImage, body, extraButtons: [{ displayText: 'Download File', url: data.download_link }] });
				break;
			}

			case 'webdl': {
				const url = requireArg(m.args, `${global.xprefix}webdl <website url>`);
				const { downloadUrl } = await api.downloadWebsite(url);
				await sendBrandedReply(Esteams, m, {
					image: global.botImage,
					body: bold('ES TEAMS V1 WEBSITE DOWNLOADER'),
					extraButtons: [{ displayText: 'Download', url: downloadUrl }],
				});
				break;
			}

			// ---------- SCRAPE / STALK ----------
			case 'lyrics': {
				const query = requireArg(m.args, `${global.xprefix}lyrics <song name>`);
				const { artist, title, lyrics } = await api.getLyrics(query);
				const preview = lyrics.length > 1500 ? lyrics.slice(0, 1500) + '\n\n...(truncated)' : lyrics;
				const body = `${bold('ES TEAMS V1 LYRICS')}\n\n${bold('Artist:')} ${artist}\n${bold('Title:')} ${title}\n\n${preview}`;
				await sendBrandedReply(Esteams, m, { image: global.botImage, body });
				break;
			}

			case 'weather': {
				const city = requireArg(m.args, `${global.xprefix}weather <city>`);
				const d = await api.getWeather(city);
				const body = `${bold('ES TEAMS V1 WEATHER')}\n\n${bold('Location:')} ${d.location}, ${d.country}\n${bold('Condition:')} ${d.weather} (${d.description})\n${bold('Temperature:')} ${d.temperature}\n${bold('Feels Like:')} ${d.feels_like}\n${bold('Humidity:')} ${d.humidity}\n${bold('Wind Speed:')} ${d.wind_speed}`;
				await sendBrandedReply(Esteams, m, { image: global.botImage, body });
				break;
			}

			case 'technews': {
				const n = await api.getTechNews();
				const body = `${bold('ES TEAMS V1 TECH NEWS')}\n\n${bold('Title:')} ${n.title}\n\n${n.description}`;
				await sendBrandedReply(Esteams, m, { image: n.image, body, extraButtons: [{ displayText: 'View Article', url: n.link }] });
				break;
			}

			case 'ttstalk': {
				const username = requireArg(m.args, `${global.xprefix}ttstalk <username>`);
				const { user, stats } = await api.tiktokStalk(username);
				const body = `${bold('ES TEAMS V1 TIKTOK STALKER')}\n\n${bold('Username:')} ${user.uniqueId}\n${bold('Nickname:')} ${user.nickname}\n${bold('Verified:')} ${user.verified ? 'Yes' : 'No'}\n${bold('Followers:')} ${stats.followerCount.toLocaleString()}\n${bold('Following:')} ${stats.followingCount}\n${bold('Likes:')} ${stats.heartCount.toLocaleString()}\n${bold('Videos:')} ${stats.videoCount}`;
				await sendBrandedReply(Esteams, m, { image: user.avatarLarger, body });
				break;
			}

			case 'igstalk': {
				const username = requireArg(m.args, `${global.xprefix}igstalk <username>`);
				const d = await api.igStalk(username);
				const body = `${bold('ES TEAMS V1 INSTAGRAM STALKER')}\n\n${bold('Username:')} ${d.usrname}\n${bold('Posts:')} ${d.status.post}\n${bold('Followers:')} ${d.status.follower}\n${bold('Following:')} ${d.status.following}\n${bold('Bio:')} ${d.desk}`;
				await sendBrandedReply(Esteams, m, { image: d.pp, body });
				break;
			}

			// ---------- TOOLS ----------
			case 'qr': {
				const text = requireArg(m.args, `${global.xprefix}qr <text or link>`);
				const buffer = await api.generateQr(text);
				await sendBrandedReply(Esteams, m, { image: buffer, body: bold('ES TEAMS V1 QR CODE') });
				break;
			}

			case 'tinyurl': {
				const url = requireArg(m.args, `${global.xprefix}tinyurl <link>`);
				const short = await api.shortenUrl(url);
				await sendBrandedReply(Esteams, m, { image: global.botImage, body: `${bold('ES TEAMS V1 URL SHORTENER')}\n\n${short}` });
				break;
			}

			case 'removebg': {
				const quoted = requireQuotedImage(m, `Reply to an image with ${global.xprefix}removebg`);
				const imgBuffer = await quoted.download();
				const catboxUrl = await api.uploadToCatbox(imgBuffer, 'image.jpg');
				if (!catboxUrl.startsWith('https://files.catbox.moe')) throw new Error('Failed to upload the image.');
				const buffer = await api.removeBg(catboxUrl);
				await sendBrandedReply(Esteams, m, { image: buffer, body: bold('ES TEAMS V1 BACKGROUND REMOVER') });
				break;
			}

			case 'ssweb': {
				const url = requireArg(m.args, `${global.xprefix}ssweb <website url>`);
				if (!url.startsWith('http')) throw new Error('Please provide a valid website URL.');
				const buffer = await api.screenshotWebsite(url);
				await sendBrandedReply(Esteams, m, { image: buffer, body: bold('ES TEAMS V1 WEBSITE SCREENSHOT') });
				break;
			}

			// ---------- CREATIVE ----------
			case 'flux': {
				const prompt = requireArg(m.args, `${global.xprefix}flux <image prompt>`);
				const buffer = await api.generateFlux(prompt);
				await sendBrandedReply(Esteams, m, { image: buffer, body: bold('ES TEAMS V1 AI IMAGE GENERATOR') });
				break;
			}

			case 'write': {
				const text = requireArg(m.args, `${global.xprefix}write <your text>`);
				const buffer = await api.generateBookQuote(text);
				await sendBrandedReply(Esteams, m, { image: buffer, body: bold('ES TEAMS V1') });
				break;
			}

			case 'logo': {
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
				await sendBrandedReply(Esteams, m, { image: buffer, body: bold('ES TEAMS V1 LOGO MAKER') });
				break;
			}

			// ---------- AI ----------
			case 'gpt': {
				const text = requireArg(m.args, `${global.xprefix}gpt <question>`);
				const response = await api.askGpt(text);
				await sendBrandedReply(Esteams, m, { image: global.botImage, body: `${bold('ES TEAMS V1 AI')}\n\n${response}` });
				break;
			}

			// ---------- MEDIA ----------
			case 'sticker': {
				const target = m.quoted && m.quoted.isMedia ? m.quoted : (m.isMedia ? m : null);
				if (!target || !/image|video/i.test(target.mime || '')) throw new Error(`Reply to an image or video with ${global.xprefix}sticker`);
				const buffer = await target.download();
				const webpBuffer = /video/i.test(target.mime) ? await videoToWebp(buffer) : await imageToWebp(buffer);
				const sticker = await addExif(webpBuffer, global.packname, global.author);
				await Esteams.sendMessage(m.chat, { sticker }, { quoted: m });
				break;
			}

			case 'shazam': {
				const target = m.quoted && m.quoted.isMedia ? m.quoted : (m.isMedia ? m : null);
				if (!target || !/audio|video/i.test(target.mime || '')) throw new Error(`Reply to an audio or video with ${global.xprefix}shazam`);
				const buffer = await target.download();
				const song = await api.recognizeSong(buffer, /video/i.test(target.mime) ? 'clip.mp4' : 'clip.mp3');
				const image = song.spotify?.album?.images?.[0]?.url || (song.apple_music?.artwork?.url ? song.apple_music.artwork.url.replace('{w}', '640').replace('{h}', '640') : global.botImage);
				const body = `${bold('ES TEAMS V1 SHAZAM')}\n\n${bold('Song:')} ${song.song}\n${bold('Artist:')} ${song.artist}\n${bold('Album:')} ${song.album || 'Unknown'}`;
				await sendBrandedReply(Esteams, m, { image, body });
				break;
			}

			case 'vv': {
				if (!m.quoted) throw new Error(`Reply to a view-once photo or video with ${global.xprefix}vv`);

				// View-once quoted messages arrive either wrapped (viewOnceMessage /
				// viewOnceMessageV2 / viewOnceMessageV2Extension with an inner .message) or
				// unwrapped with just a .viewOnce flag on the media message itself --
				// WhatsApp uses both forms depending on client/media type, and the shared
				// Serialize() quoted-message handling doesn't unwrap the wrapped form.
				const wrapped = /^viewOnceMessage/i.test(m.quoted.type || '');
				let mediaMsg = m.quoted.msg;
				if (wrapped) {
					const inner = mediaMsg?.message || {};
					mediaMsg = inner.imageMessage || inner.videoMessage;
				}

				const mediaType = /^image\//i.test(mediaMsg?.mimetype || '') ? 'image' : /^video\//i.test(mediaMsg?.mimetype || '') ? 'video' : null;
				if (!mediaType || (!wrapped && !mediaMsg?.viewOnce)) throw new Error(`Reply to a view-once photo or video with ${global.xprefix}vv`);

				const stream = await downloadContentFromMessage(mediaMsg, mediaType);
				let buffer = Buffer.from([]);
				for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

				await Esteams.sendMessage(m.sender, { [mediaType]: buffer, caption: bold('ES TEAMS V1 VIEW ONCE'), ...channelInfo() });
				await m.reply('✅ Sent to your DM.');
				break;
			}

			// ---------- FUN ----------
			case 'joke': {
				const { setup, punchline } = await api.getJoke();
				await sendBrandedReply(Esteams, m, { image: global.botImage, body: `${bold('ES TEAMS V1 JOKE')}\n\n😂 ${setup}\n\n👉 ${punchline}` });
				break;
			}

			case 'quran': {
				const surahNumber = requireArg(m.args, `${global.xprefix}quran <surah number 1-114>`);
				const surah = await api.getQuran(surahNumber);
				const body = `${bold('ES TEAMS V1 QURAN READER')}\n\n${bold('Surah:')} ${surah.name.english} (${surah.name.arabic})\n${bold('Ayahs:')} ${surah.ayahCount}\n${bold('Type:')} ${surah.type}\n\n${bold('Tafsir:')}\n${surah.tafsir.id}`;
				await sendBrandedReply(Esteams, m, { image: global.botImage, body, extraButtons: surah.recitation ? [{ displayText: 'MP3 Recitation', url: surah.recitation }] : [] });
				break;
			}

			case 'bible': {
				const reference = requireArg(m.args, `${global.xprefix}bible <e.g. John 3:16>`);
				const d = await api.getBible(reference);
				const body = `${bold('ES TEAMS V1 BIBLE READER')}\n\n${bold('Passage:')} ${d.reference}\n\n${d.text.trim()}`;
				await sendBrandedReply(Esteams, m, { image: global.botImage, body });
				break;
			}

			case 'trend': {
				const coins = await api.getTrendingCoins();
				const body = `${bold('ES TEAMS V1 CRYPTO TRENDS')}\n\nTop trending coins (24h):\n\n${coins.map((c) => `${c.rank}. ${c.name} (${c.symbol})\n💰 ${c.price}  📊 ${c.change24h}  🏅 ${c.marketRank}`).join('\n\n')}`;
				await sendBrandedReply(Esteams, m, { image: global.botImage, body });
				break;
			}

			case 'jid': {
				const target = resolveTarget(m) || m.chat;
				await m.reply(`🆔 ${target}`);
				break;
			}

			case 'info': {
				const target = resolveTarget(m);
				if (!target) throw new Error(`Usage: ${global.xprefix}info <number> (or reply to their message)`);
				const name = await Esteams.getName(target);
				let about = 'Not available';
				try {
					const status = await Esteams.fetchStatus(target);
					if (status?.status) about = status.status;
				} catch {}
				let pic = global.botImage;
				try {
					pic = await Esteams.profilePictureUrl(target, 'image');
				} catch {}
				const body = `${bold('ES TEAMS V1 USER INFO')}\n\n${bold('Name:')} ${name}\n${bold('Number:')} +${target.split('@')[0]}\n${bold('About:')} ${about}`;
				await sendBrandedReply(Esteams, m, { image: pic, body });
				break;
			}

			case 'sysinfo': {
				const totalMem = os.totalmem();
				const freeMem = os.freemem();
				const memPercent = Math.round(((totalMem - freeMem) / totalMem) * 100);
				const cpuPercent = Math.min(Math.round((os.loadavg()[0] / os.cpus().length) * 100), 100);
				const bar = (p, len = 12) => '█'.repeat(Math.round((p / 100) * len)) + '░'.repeat(len - Math.round((p / 100) * len));
				const body = `${bold('ES TEAMS V1 SYSTEM INFO')}\n\n💾 RAM: ${bar(memPercent)} ${memPercent}%\n⚡ CPU: ${bar(cpuPercent)} ${cpuPercent}%\n⏱ ${bold('Uptime:')} ${runtime(process.uptime())}`;
				await sendBrandedReply(Esteams, m, { image: global.botImage, body });
				break;
			}

			case 'tempmail': {
				const data = await api.createTempMail();
				const body = `${bold('ES TEAMS V1 TEMP MAIL')}\n\n${bold('Email:')} ${data.email}\n${bold('Mail Key:')} ${data.session_id}\n${bold('Expires At:')} ${data.expires_at}\n\nUse ${global.xprefix}checkmail ${data.session_id} to check the inbox.`;
				await sendBrandedReply(Esteams, m, { image: global.botImage, body });
				break;
			}

			case 'checkmail': {
				const sessionId = requireArg(m.args, `${global.xprefix}checkmail <mail key>`);
				const messages = await api.checkTempMail(sessionId);
				const body = messages.slice(0, 5).map((mail, i) => `${bold(`Mail ${i + 1}`)}\n${bold('From:')} ${mail.fromAddr}\n${bold('Subject:')} ${mail.headerSubject}\n\n${mail.text}`).join('\n\n———\n\n');
				await sendBrandedReply(Esteams, m, { image: global.botImage, body: `${bold('ES TEAMS V1 MAIL INBOX')}\n\n${body}` });
				break;
			}

			case 'imgscan': {
				const quoted = requireQuotedImage(m, `Reply to an image with ${global.xprefix}imgscan`);
				const imgBuffer = await quoted.download();
				const catboxUrl = await api.uploadToCatbox(imgBuffer, 'image.jpg');
				if (!catboxUrl.startsWith('https://files.catbox.moe')) throw new Error('Failed to upload the image.');
				const result = await api.scanImage(catboxUrl);
				await sendBrandedReply(Esteams, m, { image: global.botImage, body: `${bold('ES TEAMS V1 IMAGE SCANNER')}\n\n${result}` });
				break;
			}

			case 'scanqr': {
				const quoted = requireQuotedImage(m, `Reply to an image containing a QR code with ${global.xprefix}scanqr`);
				const imgBuffer = await quoted.download();
				const catboxUrl = await api.uploadToCatbox(imgBuffer, 'qr.jpg');
				if (!catboxUrl.startsWith('https://files.catbox.moe')) throw new Error('Failed to upload the image.');
				const value = await api.readQrFromImage(catboxUrl);
				await sendBrandedReply(Esteams, m, { image: global.botImage, body: `${bold('ES TEAMS V1 QR READER')}\n\n${value}` });
				break;
			}

			case 'jail': {
				const quoted = requireQuotedImage(m, `Reply to an image with ${global.xprefix}jail`);
				const imgBuffer = await quoted.download();
				const catboxUrl = await api.uploadToCatbox(imgBuffer, 'image.jpg');
				if (!catboxUrl.startsWith('https://files.catbox.moe')) throw new Error('Failed to upload the image.');
				const buffer = await api.applyJailFilter(catboxUrl);
				await sendBrandedReply(Esteams, m, { image: buffer, body: bold('ES TEAMS V1 JAIL FILTER') });
				break;
			}

			case 'poll': {
				const input = requireArg(m.args, `${global.xprefix}poll <question> | <option1, option2, ...>`);
				const [question, optionsPart] = input.split('|').map((s) => s.trim());
				const options = (optionsPart || '').split(',').map((s) => s.trim()).filter(Boolean);
				if (!question || options.length < 2) throw new Error(`Usage: ${global.xprefix}poll <question> | <option1, option2, ...>\n\nAt least 2 options are required.`);
				await Esteams.sendPoll(m.chat, question, options);
				break;
			}

			case 'chatbot': {
				if (m.isGroup) await requireGroupAdmin(Esteams, m);
				const mode = m.args[0]?.toLowerCase();
				global.db.groups[m.chat] = global.db.groups[m.chat] || {};
				if (mode === 'on') {
					global.db.groups[m.chat].chatbot = true;
					await m.reply('✅ Chatbot mode enabled — I will reply to messages here using AI.');
				} else if (mode === 'off') {
					global.db.groups[m.chat].chatbot = false;
					await m.reply('✅ Chatbot mode disabled.');
				} else {
					throw new Error(`Usage: ${global.xprefix}chatbot on | ${global.xprefix}chatbot off`);
				}
				break;
			}

			// ---------- GROUP ----------
			case 'kick': {
				await requireGroupAdmin(Esteams, m);
				const target = resolveTarget(m);
				if (!target) throw new Error(`Usage: ${global.xprefix}kick <number> (or reply to their message)`);
				await Esteams.groupParticipantsUpdate(m.chat, [target], 'remove');
				await m.reply('✅ User removed from the group.');
				break;
			}

			case 'promote': {
				await requireGroupAdmin(Esteams, m);
				const target = resolveTarget(m);
				if (!target) throw new Error(`Usage: ${global.xprefix}promote <number> (or reply to their message)`);
				await Esteams.groupParticipantsUpdate(m.chat, [target], 'promote');
				await m.reply('✅ User promoted to admin.');
				break;
			}

			case 'demote': {
				await requireGroupAdmin(Esteams, m);
				const target = resolveTarget(m);
				if (!target) throw new Error(`Usage: ${global.xprefix}demote <number> (or reply to their message)`);
				await Esteams.groupParticipantsUpdate(m.chat, [target], 'demote');
				await m.reply('✅ User demoted from admin.');
				break;
			}

			case 'tagall': {
				if (!m.isGroup) throw new Error('This command can only be used in a group.');
				const metadata = await Esteams.groupMetadata(m.chat);
				const text = m.args.join(' ').trim();
				const mentionText = metadata.participants.map((p) => `@${p.id.split('@')[0]}`).join(' ');
				await Esteams.sendMessage(m.chat, { text: `${bold('Tag All')}\n\n${text}\n\n${mentionText}`, mentions: metadata.participants.map((p) => p.id), ...channelInfo() }, { quoted: m });
				break;
			}

			case 'hidetag': {
				await requireGroupAdmin(Esteams, m);
				const metadata = await Esteams.groupMetadata(m.chat);
				const text = m.args.join(' ').trim() || '​';
				await Esteams.sendMessage(m.chat, { text, mentions: metadata.participants.map((p) => p.id), ...channelInfo() }, { quoted: m });
				break;
			}

			case 'linkgroup': {
				await requireGroupAdmin(Esteams, m);
				const code = await Esteams.groupInviteCode(m.chat);
				await m.reply(`🔗 https://chat.whatsapp.com/${code}`);
				break;
			}

			case 'resetlink': {
				await requireGroupAdmin(Esteams, m);
				const code = await Esteams.groupRevokeInvite(m.chat);
				await m.reply(`🔗 New link: https://chat.whatsapp.com/${code}`);
				break;
			}

			case 'setgcname': {
				await requireGroupAdmin(Esteams, m);
				const name = requireArg(m.args, `${global.xprefix}setgcname <new name>`);
				await Esteams.groupUpdateSubject(m.chat, name);
				await m.reply('✅ Group name updated.');
				break;
			}

			case 'setgcdesc': {
				await requireGroupAdmin(Esteams, m);
				const desc = requireArg(m.args, `${global.xprefix}setgcdesc <new description>`);
				await Esteams.groupUpdateDescription(m.chat, desc);
				await m.reply('✅ Group description updated.');
				break;
			}

			case 'setgcpp': {
				await requireGroupAdmin(Esteams, m);
				const quoted = requireQuotedImage(m, `Reply to an image with ${global.xprefix}setgcpp`);
				const imgBuffer = await quoted.download();
				await Esteams.updateProfilePicture(m.chat, imgBuffer);
				await m.reply('✅ Group picture updated.');
				break;
			}

			case 'listadmin': {
				const metadata = await requireGroupAdmin(Esteams, m);
				const admins = metadata.participants.filter((p) => p.admin);
				const body = `${bold('GROUP ADMINS')}\n\n${admins.map((p) => `• @${p.id.split('@')[0]}`).join('\n')}`;
				await Esteams.sendMessage(m.chat, { text: body, mentions: admins.map((p) => p.id), ...channelInfo() }, { quoted: m });
				break;
			}

			case 'group': {
				const metadata = await requireGroupAdmin(Esteams, m);
				const mode = m.args[0]?.toLowerCase();
				if (mode === 'close') {
					await Esteams.groupSettingUpdate(m.chat, 'announcement');
					await m.reply('🔒 Group closed — only admins can send messages.');
				} else if (mode === 'open') {
					await Esteams.groupSettingUpdate(m.chat, 'not_announcement');
					await m.reply('🔓 Group opened — everyone can send messages.');
				} else {
					throw new Error(`Usage: ${global.xprefix}group open | ${global.xprefix}group close`);
				}
				break;
			}

			case 'welcome': {
				await requireGroupAdmin(Esteams, m);
				const mode = m.args[0]?.toLowerCase();
				global.db.groups[m.chat] = global.db.groups[m.chat] || {};
				if (mode === 'on') {
					global.db.groups[m.chat].welcome = true;
					await m.reply('✅ Welcome/goodbye messages enabled.');
				} else if (mode === 'off') {
					global.db.groups[m.chat].welcome = false;
					await m.reply('✅ Welcome/goodbye messages disabled.');
				} else {
					throw new Error(`Usage: ${global.xprefix}welcome on | ${global.xprefix}welcome off`);
				}
				break;
			}

			case 'antilink': {
				await requireGroupAdmin(Esteams, m);
				const mode = m.args[0]?.toLowerCase();
				global.db.groups[m.chat] = global.db.groups[m.chat] || {};
				if (mode === 'on') {
					global.db.groups[m.chat].antilink = true;
					await m.reply('✅ Anti-link enabled — non-admins posting group invite links will be removed.');
				} else if (mode === 'off') {
					global.db.groups[m.chat].antilink = false;
					await m.reply('✅ Anti-link disabled.');
				} else {
					throw new Error(`Usage: ${global.xprefix}antilink on | ${global.xprefix}antilink off`);
				}
				break;
			}

			case 'leave': {
				await requireGroupAdmin(Esteams, m);
				await m.reply('👋 Goodbye!');
				await Esteams.groupLeave(m.chat);
				break;
			}

			case 'delete': {
				await requireGroupAdmin(Esteams, m);
				if (!m.quoted) throw new Error(`Reply to a message with ${global.xprefix}delete to delete it.`);
				await Esteams.sendMessage(m.chat, { delete: m.quoted.key });
				break;
			}

			default:
				await react(Esteams, m, '');
				return;
		}
		await react(Esteams, m, '✅');
	} catch (e) {
		await react(Esteams, m, '❌');
		await m.reply(`❌ ${e.message || 'Something went wrong. Please try again later.'}`).catch(() => {});
		console.error(`Command "${command}" failed:`, e);
	}
};
