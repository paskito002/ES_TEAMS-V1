const { runtime } = require('./lib/function');
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

function linkLine(displayText, url) {
	return `🔗 ${displayText}: ${url}`;
}

// "Forwarded from channel" badge -- a chip WhatsApp renders on top of an ordinary
// message, not a tappable button. Requires a real, followed channel JID or WhatsApp
// hides it, so it's only attached once global.channelJid has resolved.
function channelInfo() {
	if (!global.channelJid) return {};
	return {
		contextInfo: {
			forwardingScore: 999,
			isForwarded: true,
			forwardedNewsletterMessageInfo: {
				newsletterJid: global.channelJid,
				newsletterName: global.ownername,
				serverMessageId: -1,
			},
		},
	};
}

// Native-flow interactive buttons don't reliably render on this account (confirmed live:
// message relays with no error but nothing shows on the phone), so every reply instead
// carries its links as plain, auto-linkified WhatsApp URLs inside the caption itself,
// plus the channel badge above for branding.
async function sendBrandedReply(Esteams, m, { image, video, body, extraButtons = [] }) {
	const links = [...extraButtons.map((b) => linkLine(b.displayText, b.url)), linkLine('WhatsApp Channel', global.wagc2)];
	const caption = `${body}\n\n${links.join('\n')}`;

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
async function requireGroupAdmin(Esteams, m) {
	if (!m.isGroup) throw new Error('This command can only be used in a group.');
	const metadata = await Esteams.groupMetadata(m.chat);
	const botJid = Esteams.decodeJid(Esteams.user.id);
	const sender = metadata.participants.find((p) => p.id === m.sender);
	const bot = metadata.participants.find((p) => p.id === botJid);
	if (!sender?.admin) throw new Error('This command is for group admins only.');
	if (!bot?.admin) throw new Error('I need to be an admin in this group to do that.');
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

const MENU = `${bold(global.botname.replace(/[^a-zA-Z0-9 ]/g, '').trim())}

${bold('DOWNLOAD')} 📥
${global.xprefix}tiktok <link>
${global.xprefix}facebook <link>
${global.xprefix}instagram <link>
${global.xprefix}twitter <link>
${global.xprefix}ytmp4 <link>
${global.xprefix}spotify <track link>
${global.xprefix}play <song name>
${global.xprefix}apk <app name>
${global.xprefix}gdrive <link>
${global.xprefix}webdl <link>

${bold('GROUP')} 👥 (admin only)
${global.xprefix}kick <number>
${global.xprefix}promote <number>
${global.xprefix}demote <number>
${global.xprefix}tagall <text>
${global.xprefix}hidetag <text>
${global.xprefix}linkgroup
${global.xprefix}resetlink
${global.xprefix}setgcname <name>
${global.xprefix}setgcdesc <description>
${global.xprefix}setgcpp (reply to an image)
${global.xprefix}listadmin
${global.xprefix}group open | close
${global.xprefix}welcome on | off
${global.xprefix}antilink on | off
${global.xprefix}leave

${bold('SCRAPE / STALK')} 🧲
${global.xprefix}lyrics <song name>
${global.xprefix}weather <city>
${global.xprefix}technews
${global.xprefix}ttstalk <username>
${global.xprefix}igstalk <username>

${bold('TOOLS')} 🛠
${global.xprefix}qr <text>
${global.xprefix}tinyurl <link>
${global.xprefix}removebg (reply to an image)
${global.xprefix}ssweb <link>

${bold('CREATIVE')} 🎨
${global.xprefix}flux <prompt>
${global.xprefix}write <text>
${global.xprefix}logo <header> | <subtitle> (optionally reply to a background image)

${bold('AI')} 🤖
${global.xprefix}gpt <question>

${bold('OTHER')} ⚙️
${global.xprefix}ping
${global.xprefix}runtime`;

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
		await Esteams.sendMessage(m.chat, { text: `🚫 @${m.sender.split('@')[0]} was removed for sending a group invite link.`, mentions: [m.sender] });
	} catch (e) {
		console.error('Antilink enforcement failed:', e.message || e);
	}
}

module.exports = async (Esteams, m) => {
	await enforceAntilink(Esteams, m);
	if (!m.body || m.prefix !== global.xprefix) return;
	const command = m.command?.toLowerCase();

	try {
		switch (command) {
			case 'menu':
			case 'start': {
				await sendBrandedReply(Esteams, m, { image: global.botImage, body: MENU });
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
				await Esteams.sendMessage(m.chat, { audio: { url: data.audio.download_url }, mimetype: 'audio/mpeg' }, { quoted: m });
				await sendBrandedReply(Esteams, m, { image: data.thumbnail || global.botImage, body: `${bold('ES TEAMS V1 MUSIC DOWNLOADER')}\n\n${bold('Title:')} ${data.title}` });
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
				const metadata = await requireGroupAdmin(Esteams, m);
				const text = m.args.join(' ').trim();
				const mentionText = metadata.participants.map((p) => `@${p.id.split('@')[0]}`).join(' ');
				await Esteams.sendMessage(m.chat, { text: `${bold('Tag All')}\n\n${text}\n\n${mentionText}`, mentions: metadata.participants.map((p) => p.id) }, { quoted: m });
				break;
			}

			case 'hidetag': {
				await requireGroupAdmin(Esteams, m);
				const metadata = await Esteams.groupMetadata(m.chat);
				const text = m.args.join(' ').trim() || '​';
				await Esteams.sendMessage(m.chat, { text, mentions: metadata.participants.map((p) => p.id) }, { quoted: m });
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
				await Esteams.sendMessage(m.chat, { text: body, mentions: admins.map((p) => p.id) }, { quoted: m });
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

			default:
				return;
		}
	} catch (e) {
		await m.reply(`❌ ${e.message || 'Something went wrong. Please try again later.'}`).catch(() => {});
		console.error(`Command "${command}" failed:`, e);
	}
};
