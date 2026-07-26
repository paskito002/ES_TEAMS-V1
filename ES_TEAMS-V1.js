const { prepareWAMessageMedia, generateWAMessageFromContent } = require('@whiskeysockets/baileys');
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

function channelButton() {
	return {
		name: 'cta_url',
		buttonParamsJson: JSON.stringify({
			display_text: 'WhatsApp Channel',
			url: global.wagc2,
			merchant_url: global.wagc2,
		}),
	};
}

function linkButton(displayText, url) {
	return {
		name: 'cta_url',
		buttonParamsJson: JSON.stringify({ display_text: displayText, url, merchant_url: url }),
	};
}

// Sends an image (URL or Buffer) or text-only card as an interactive message with buttons.
async function sendBrandedReply(Esteams, m, { image, body, extraButtons = [] }) {
	const header = {};
	if (image) {
		const media = await prepareWAMessageMedia(
			{ image: Buffer.isBuffer(image) ? image : { url: image } },
			{ upload: Esteams.waUploadToServer }
		);
		header.hasMediaAttachment = true;
		header.imageMessage = media.imageMessage;
	}
	const message = generateWAMessageFromContent(
		m.chat,
		{
			viewOnceMessage: {
				message: {
					interactiveMessage: {
						body: { text: body },
						footer: { text: global.wm },
						header,
						nativeFlowMessage: {
							buttons: [...extraButtons, channelButton()],
							messageParamsJson: '',
						},
					},
				},
			},
		},
		{ quoted: m }
	);
	return Esteams.relayMessage(m.chat, message.message, { messageId: message.key.id });
}

async function sendBrandedVideo(Esteams, m, { video, body }) {
	return Esteams.sendButtonVideo(m.chat, [channelButton()], m, { video, body, footer: global.wm });
}

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

const MENU = `${bold(global.botname.replace(/[^a-zA-Z0-9 ]/g, '').trim())}

${bold('DOWNLOAD')} 📥
${global.xprefix}tiktok <link>
${global.xprefix}facebook <link>
${global.xprefix}instagram <link>
${global.xprefix}spotify <track link>
${global.xprefix}play <song name>
${global.xprefix}apk <app name>
${global.xprefix}gdrive <link>
${global.xprefix}webdl <link>

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

module.exports = async (Esteams, m) => {
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
				await sendBrandedVideo(Esteams, m, { video: data.video, body });
				break;
			}

			case 'facebook': {
				const url = requireArg(m.args, `${global.xprefix}facebook <video link>`);
				const { videoUrl } = await api.downloadFacebook(url);
				await sendBrandedVideo(Esteams, m, { video: videoUrl, body: bold('ES TEAMS V1 FACEBOOK DOWNLOADER') });
				break;
			}

			case 'instagram': {
				const url = requireArg(m.args, `${global.xprefix}instagram <reel/post link>`);
				const { videoUrl } = await api.downloadInstagram(url);
				await sendBrandedVideo(Esteams, m, { video: videoUrl, body: bold('ES TEAMS V1 INSTAGRAM DOWNLOADER') });
				break;
			}

			case 'spotify': {
				const url = requireArg(m.args, `${global.xprefix}spotify <spotify track link>`);
				if (!url.startsWith('https://open.spotify.com/track/')) throw new Error('Please provide a valid Spotify track link.');
				const data = await api.downloadSpotify(url);
				const body = `${bold('ES TEAMS V1 SPOTIFY DOWNLOADER')}\n\n${bold('Title:')} ${data.title}\n${bold('Duration:')} ${data.duration}\n${bold('Author:')} ${data.channel}`;
				await sendBrandedReply(Esteams, m, { image: data.thumbnail, body, extraButtons: [linkButton('Download Now', data.DownloadLink)] });
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
				await sendBrandedReply(Esteams, m, { image: data.thumbnail || global.botImage, body, extraButtons: [linkButton('Download APK', data.download_link)] });
				break;
			}

			case 'gdrive': {
				const url = requireArg(m.args, `${global.xprefix}gdrive <google drive link>`);
				const data = await api.downloadGdrive(url);
				const body = `${bold('ES TEAMS V1 GOOGLE DRIVE')}\n\n${bold('Name:')} ${data.name}\n${bold('Size:')} ${data.size}`;
				await sendBrandedReply(Esteams, m, { image: global.botImage, body, extraButtons: [linkButton('Download File', data.download_link)] });
				break;
			}

			case 'webdl': {
				const url = requireArg(m.args, `${global.xprefix}webdl <website url>`);
				const { downloadUrl } = await api.downloadWebsite(url);
				await sendBrandedReply(Esteams, m, {
					image: global.botImage,
					body: bold('ES TEAMS V1 WEBSITE DOWNLOADER'),
					extraButtons: [linkButton('Download', downloadUrl)],
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
				await sendBrandedReply(Esteams, m, { image: n.image, body, extraButtons: [linkButton('View Article', n.link)] });
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

			default:
				return;
		}
	} catch (e) {
		await m.reply(`❌ ${e.message || 'Something went wrong. Please try again later.'}`).catch(() => {});
		console.error(`Command "${command}" failed:`, e);
	}
};
