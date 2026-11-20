const test = require('node:test');
const assert = require('node:assert/strict');
const Module = require('module');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { start, TEST_KEY } = require('./helpers/mockEsTeamsApi');

const sansBold = (text) => String(text).replace(/[A-Za-z0-9]/g, (ch) => {
	const code = ch.codePointAt(0);
	if (code >= 65 && code <= 90) return String.fromCodePoint(code + 120211);
	if (code >= 97 && code <= 122) return String.fromCodePoint(code + 120205);
	return String.fromCodePoint(code + 120764);
});
const header = (title) => sansBold(`ES TEAMS V1 ${title}`);

let mock;
let handler;
const logged = [];
const realConsoleError = console.error;

test.before(async () => {
	mock = await start();
	process.env.ES_TEAMS_API_BASE_URL = mock.base;
	process.env.ES_TEAMS_API_KEY = TEST_KEY;
	const realGet = axios.get;
	axios.get = async (url, ...rest) => (String(url).startsWith('https://apis.davidcyril.name.ng') ? Promise.reject(new Error('Legacy API disabled in tests')) : realGet(url, ...rest));
	const realPost = axios.post;
	axios.post = async (url, ...rest) => (String(url).includes('uguu.se') ? { data: { files: [{ url: 'https://files.test/up.jpg' }] } } : realPost(url, ...rest));
	const realHead = axios.head;
	axios.head = async (url, ...rest) => (String(url).includes('cdn.test') ? { headers: { 'content-length': '1000' } } : realHead(url, ...rest));
	const stubs = {
		'moment-timezone': () => ({ tz: () => ({ format: (f) => `FMT(${f})` }) }),
		'@whiskeysockets/baileys': { downloadContentFromMessage: async () => (async function* () { yield Buffer.from('x'); })(), generateWAMessageContent: async (c) => ({ content: c }), generateWAMessageFromContent: (jid, content) => ({ key: { id: 'GEN' }, message: content }), getUrlInfo: async () => ({}) },
		'./lib/function': { runtime: (s) => `RUNTIME(${Math.floor(s)})` },
		'./lib/exif': { imageToWebp: async (b) => b, videoToWebp: async (b) => b, addExif: async (b) => b },
		'./lib/channelBadge': { channelInfo: () => ({ contextInfo: { badge: true } }) },
	};
	const originalLoad = Module._load;
	Module._load = function (request, parent, isMain) {
		if (Object.prototype.hasOwnProperty.call(stubs, request)) return stubs[request];
		return originalLoad.apply(this, arguments);
	};
	global.xprefix = '.';
	global.db = { groups: {}, users: {}, settings: {} };
	global.botImage = 'https://img.test/bot.jpg';
	handler = require('../ES_TEAMS-V1.js');
	console.error = (...args) => { logged.push(args.map(String).join(' ')); };
});

test.after(async () => {
	console.error = realConsoleError;
	await mock.close();
	fs.writeFileSync('/tmp/bot-requests.json', JSON.stringify(allRequests));
});

const allRequests = [];
test.beforeEach(() => {
	mock.reset();
	logged.length = 0;
	process.env.ES_TEAMS_API_KEY = TEST_KEY;
});

async function run(cmd, args = [], { quoted = null, isGroup = false } = {}) {
	const sent = [];
	const chat = isGroup ? '120363000000@g.us' : '2349000000000@s.whatsapp.net';
	const sock = new Proxy({}, {
		get(_, name) {
			if (name === 'user') return { id: '999:1@s.whatsapp.net' };
			if (name === 'authState') return { creds: { me: { id: '999:1@s.whatsapp.net' } } };
			return async (...a) => { sent.push({ method: String(name), args: a }); return {}; };
		},
	});
	const m = {
		chat, sender: '111@s.whatsapp.net', body: `.${cmd} ${args.join(' ')}`, prefix: '.', command: cmd, args, text: args.join(' '),
		isGroup, fromMe: true, key: { id: 'MK', remoteJid: chat, participant: '111@s.whatsapp.net', fromMe: true }, isMedia: false, mime: '',
		quoted, mentionedJid: [], pushName: 'User', type: 'conversation', message: { conversation: 'x' }, msg: {},
		reply: async (text, opts) => { sent.push({ method: 'm.reply', args: [text, opts] }); return {}; },
	};
	await handler(sock, m);
	allRequests.push(...mock.requests.map((r) => ({ ...r })));
	const texts = sent.flatMap((s) => {
		const payload = s.method === 'm.reply' ? { text: s.args[0] } : s.args[1] || {};
		return [payload.text, payload.caption].filter(Boolean);
	});
	const media = sent.filter((s) => s.method === 'sendMessage').map((s) => s.args[1]);
	return { sent, texts, media, all: texts.join('\n---\n'), reqs: mock.requests };
}

const image = () => ({ isMedia: true, mime: 'image/jpeg', sender: '222@s.whatsapp.net', download: async () => Buffer.from('IMG'), text: 'quoted text', key: { id: 'QK' } });
const audio = () => ({ isMedia: true, mime: 'audio/mpeg', sender: '222@s.whatsapp.net', download: async () => Buffer.from('AUD'), key: { id: 'QK' } });

const NEW_COMMANDS = [
	['ytmp3', ['https://youtu.be/dQw4w9WgXcQ'], 'ytdl', { format: 'mp3' }, 'YT MP3 DOWNLOADER', 'audio'],
	['soundcloud', ['https://soundcloud.com/a/b'], 'soundcloud', { url: 'https://soundcloud.com/a/b' }, 'SOUNDCLOUD DOWNLOADER', 'audio'],
	['pinterest', ['https://pin.it/abc'], 'pinterest', { url: 'https://pin.it/abc' }, 'PINTEREST DOWNLOADER', 'image'],
	['capcut', ['https://www.capcut.com/t/x'], 'capcut', { url: 'https://www.capcut.com/t/x' }, 'CAPCUT DOWNLOADER', 'video'],
	['gitstalk', ['torvalds'], 'githubuser', { username: 'torvalds' }, 'GITHUB STALKER', 'image'],
	['githubrepo', ['facebook/react'], 'githubrepo', { repo: 'facebook/react' }, 'GITHUB REPOSITORY'],
	['githubsearch', ['bot'], 'githubsearch', { query: 'bot' }, 'GITHUB SEARCH'],
	['ytchannel', ['@mkbhd'], 'ytchannel', { channel: '@mkbhd' }, 'YOUTUBE CHANNEL STALKER', 'image'],
	['ytinfo', ['https://youtu.be/dQw4w9WgXcQ'], 'youtube', { url: 'https://youtu.be/dQw4w9WgXcQ' }, 'YOUTUBE INFO', 'image'],
	['wiki', ['Lagos'], 'wikipedia', { title: 'Lagos' }, 'WIKIPEDIA', 'image'],
	['define', ['hello'], 'dictionary', { word: 'hello' }, 'DICTIONARY'],
	['anime', ['naruto'], 'anime', { query: 'naruto' }, 'ANIME INFO', 'image'],
	['movie', ['inception'], 'movie', { query: 'inception' }, 'MOVIE INFO', 'image'],
	['npm', ['express'], 'npm', { package: 'express' }, 'NPM PACKAGE'],
	['country', ['nigeria'], 'country', { name: 'nigeria' }, 'COUNTRY INFO', 'image'],
	['iplookup', ['8.8.8.8'], 'iplookup', { ip: '8.8.8.8' }, 'IP LOOKUP'],
	['sportsteam', ['arsenal'], 'sportsteam', { name: 'arsenal' }, 'SPORTS TEAM', 'image'],
	['minecraft', ['mc.hypixel.net'], 'minecraft', { address: 'mc.hypixel.net' }, 'MINECRAFT SERVER'],
	['holidays', ['NG', '2026'], 'holidays', { country: 'NG', year: '2026' }, 'PUBLIC HOLIDAYS'],
	['livescore', [], 'livescore', {}, 'LIVE SCORES'],
	['forecast', ['Lagos'], 'forecast', { city: 'Lagos' }, '10 DAY FORECAST'],
	['crypto', ['bitcoin'], 'crypto', { coin: 'bitcoin' }, 'CRYPTO PRICE', 'image'],
	['currency', ['100', 'usd', 'ngn'], 'currency', { from: 'usd', to: 'ngn', amount: '100' }, 'CURRENCY CONVERTER'],
	['websearch', ['lagos'], 'websearch', { query: 'lagos' }, 'WEB SEARCH'],
	['imagesearch', ['cats'], 'imagesearch', { query: 'cats' }, 'IMAGE SEARCH', 'image'],
	['ytsearch', ['afro'], 'ytsearch', { query: 'afro' }, 'YOUTUBE SEARCH'],
	['tiktoksearch', ['dance'], 'tiktoksearch', { query: 'dance' }, 'TIKTOK SEARCH'],
	['pinterestsearch', ['decor'], 'pinterestsearch', { query: 'decor' }, 'PINTEREST SEARCH', 'image'],
	['linkpreview', ['https://esteamstv.devs.surf/'], 'linkpreview', { url: 'https://esteamstv.devs.surf/' }, 'LINK PREVIEW', 'image'],
	['pastquestions', ['jamb', 'english-language', '2019'], 'pastquestions', { exam: 'jamb', subject: 'english-language', year: '2019' }, 'PAST QUESTIONS'],
	['wacheck', ['+234 801 234 5678'], 'wa-check', { number: '2348012345678' }, 'WHATSAPP CHECK'],
	['translate', ['es', 'Good', 'morning'], 'translate', { text: 'Good morning', to: 'es' }, 'TRANSLATOR'],
	['password', ['20'], 'password', { length: '20' }, 'PASSWORD GENERATOR'],
	['hash', ['md5', 'hello'], 'hash', {}, 'HASH GENERATOR'],
	['base64', ['encode', 'hello'], 'hash', {}, 'BASE64'],
	['tts', ['Hello', 'there', '|', 'aria'], 'tts', { text: 'Hello there', voice: 'aria' }, 'TEXT TO SPEECH', 'audio'],
	['summarize', ['A', 'long', 'text', 'to', 'summarize'], 'summarize', {}, 'SUMMARIZER'],
	['chart', ['bar', 'Mon:10,Tue:20', 'Visitors'], 'chart', {}, 'CHART GENERATOR', 'image'],
	['ytsummary', ['https://youtu.be/dQw4w9WgXcQ'], 'ytsummary', { url: 'https://youtu.be/dQw4w9WgXcQ' }, 'YOUTUBE SUMMARY'],
	['videogen', ['a', 'lion', 'running'], 'videogen', {}, 'AI VIDEO GENERATOR', 'video'],
	['quote', [], 'quote', {}, 'QUOTE'],
	['advice', [], 'advice', {}, 'ADVICE'],
	['catfact', [], 'catfact', {}, 'CAT FACT'],
	['dog', [], 'dogimage', {}, 'DOG PICTURE', 'image'],
];

for (const [cmd, args, endpoint, params, title, mediaKind] of NEW_COMMANDS) {
	test(`new command .${cmd} calls ${endpoint} and replies in the ES TEAMS V1 style`, async () => {
		const out = await run(cmd, args);
		assert.ok(!logged.some((l) => /failed:/.test(l)), `command failed: ${logged.join(' | ').slice(0, 300)}`);
		const call = out.reqs.find((r) => r.name === endpoint);
		assert.ok(call, `no request to ${endpoint}`);
		for (const [key, value] of Object.entries(params)) assert.equal(call.query[key] ?? String(call.body[key] ?? ''), value, `${endpoint} param ${key}`);
		assert.ok(out.all.includes(header(title)), `missing header ${title} in: ${out.all.slice(0, 200)}`);
		if (mediaKind) assert.ok(out.media.some((p) => p && (p[mediaKind] || p.mimetype)), `expected a ${mediaKind} message`);
	});
}

test('commands that need a quoted image upload it first, then call the site', async () => {
	let out = await run('ocr', [], { quoted: image() });
	assert.ok(out.reqs.some((r) => r.name === 'ocr' && r.query.url === 'https://files.test/up.jpg'));
	assert.ok(out.all.includes(header('IMAGE TO TEXT')));
	out = await run('caption', ['top', 'text'], { quoted: image() });
	assert.ok(out.reqs.some((r) => r.name === 'caption' && r.query.text === 'top text' && r.query.image === 'https://files.test/up.jpg'));
	assert.ok(out.media.some((p) => p && Buffer.isBuffer(p.image)));
	out = await run('shazam', [], { quoted: audio() });
	assert.ok(out.reqs.some((r) => r.name === 'shazam' && r.body.url === 'https://files.test/up.jpg'));
	assert.ok(out.all.includes(header('SHAZAM')));
	assert.ok(out.all.includes('Faded'));
	out = await run('ocr', []);
	assert.ok(out.all.includes(header('INVALID FORMAT')));
});

const UPDATED = [
	['tiktok', ['https://www.tiktok.com/@a/video/1'], 'tiktok', 'TIKTOK DOWNLOADER', 'video'],
	['facebook', ['https://fb.watch/x'], 'facebook', 'FACEBOOK DOWNLOADER', 'video'],
	['instagram', ['https://instagram.com/reel/x'], 'instagram', 'INSTAGRAM DOWNLOADER', 'video'],
	['twitter', ['https://x.com/a/status/1'], 'twitter', 'TWITTER DOWNLOADER', 'video'],
	['ytmp4', ['https://youtu.be/dQw4w9WgXcQ'], 'ytdl', 'YOUTUBE DOWNLOADER', 'video'],
	['spotify', ['https://open.spotify.com/track/1'], 'spotify', 'SPOTIFY DOWNLOADER', 'image'],
	['play', ['afro', 'beats'], 'mp3', null, 'audio'],
	['video', ['afro', 'beats'], 'mp4', null, 'video'],
	['apk', ['whatsapp'], 'apk', 'APK DOWNLOADER', 'image'],
	['gdrive', ['https://drive.google.com/file/d/x'], 'gdrive', 'GOOGLE DRIVE', 'image'],
	['webdl', ['https://example.com'], 'downloadweb', 'WEBSITE DOWNLOADER', 'image'],
	['lyrics', ['Alan', 'Walker', '-', 'Faded'], 'lyrics', 'LYRICS', null],
	['weather', ['Lagos'], 'weather', 'WEATHER', 'image'],
	['technews', [], 'technews', 'TECH NEWS', 'image'],
	['ttstalk', ['alice'], 'tiktokstalk', 'TIKTOK STALKER', 'image'],
	['igstalk', ['alice'], 'igstalk', 'INSTAGRAM STALKER', 'image'],
	['gpt', ['hello'], 'ai', null, null],
	['qr', ['hello'], 'qrcode', null, 'image'],
	['tinyurl', ['https://example.com/long'], 'shorten', null, null],
	['ssweb', ['https://example.com'], 'screenshot', null, 'image'],
	['flux', ['a', 'lion'], 'imagegen', null, 'image'],
	['write', ['hello'], 'book', 'BOOK WRITER', 'image'],
	['joke', [], 'joke', 'JOKE', 'image'],
	['quran', ['2:255'], 'quran', 'QURAN READER', 'image'],
	['bible', ['John', '3:16'], 'bible', 'BIBLE READER', 'image'],
	['tempmail', [], 'tempmail/create', 'TEMP MAIL', 'image'],
	['checkmail', ['TOKEN123'], 'tempmail/inbox', null, null],
	['trivia', [], 'trivia', null, null],
];
for (const [cmd, args, endpoint, title, mediaKind] of UPDATED) {
	test(`existing command .${cmd} now uses ${endpoint} and keeps working`, async () => {
		const out = await run(cmd, args);
		assert.ok(!logged.some((l) => /failed:/.test(l)), `command failed: ${logged.join(' | ').slice(0, 300)}`);
		assert.ok(out.reqs.some((r) => r.name === endpoint), `no request to ${endpoint}`);
		assert.ok(out.all.includes('ES TEAMS V1'.replace(/./g, (c) => sansBold(c))) || out.all.includes(sansBold('ES TEAMS V1')), 'reply should carry the ES TEAMS V1 header');
		if (title) assert.ok(out.all.includes(header(title)), `missing header ${title}`);
		if (mediaKind) assert.ok(out.media.some((p) => p && (p[mediaKind] || p.mimetype)), `expected a ${mediaKind} message`);
	});
}

test('TikTok photo posts and Instagram images are delivered as images', async () => {
	let out = await run('tiktok', ['https://www.tiktok.com/@a/photo/1']);
	assert.equal(out.media.filter((p) => p && p.image).length, 2);
	out = await run('instagram', ['https://instagram.com/photo/x']);
	assert.ok(out.media.some((p) => p && p.image && p.image.url === 'https://cdn.test/p.jpg'));
});

test('weather, tech news and stalkers print the documented fields', async () => {
	assert.match((await run('weather', ['Lagos'])).all, /29\.5/);
	assert.match((await run('technews')).all, /Story one[\s\S]*https:\/\/news\.test\/1/);
	assert.match((await run('ttstalk', ['alice'])).all, /1,200,000/);
	assert.match((await run('igstalk', ['alice'])).all, /Alice A/);
});

test('the menu count is computed from the entries and includes every new command', async () => {
	const out = await run('menu');
	const caption = out.all;
	const entries = [...caption.matchAll(/┃ [^\n]+ ◁️❄️🕷️/g)].length;
	const count = Number((caption.match(/Commands\s*:\s*(\d+)/) || [])[1]);
	assert.ok(count > 100, `count ${count}`);
	assert.equal(count, entries);
	for (const [cmd] of NEW_COMMANDS) {
		const serif = [...cmd].map((c) => (c >= 'a' && c <= 'z' ? String.fromCodePoint(c.codePointAt(0) + 119737) : c >= '0' && c <= '9' ? String.fromCodePoint(c.codePointAt(0) + 120734) : c)).join('');
		assert.ok(caption.includes(serif), `menu is missing ${cmd}`);
	}
});

test('new command names never collide with existing ones', () => {
	const source = fs.readFileSync(path.join(__dirname, '..', 'ES_TEAMS-V1.js'), 'utf8');
	const existing = new Set([...source.matchAll(/^\s{6}case "([^"]+)":/gm)].map((m) => m[1]));
	const extras = Object.keys(require('../lib/esteamsCommands')({ api: {}, bold: (s) => s, sendBrandedReply() {}, requireArg() {}, requireQuotedImage() {}, channelInfo() {} }).handlers);
	assert.equal(extras.length, NEW_COMMANDS.length + 2);
	assert.ok(extras.includes('ocr') && extras.includes('caption'));
	assert.deepEqual(extras.filter((name) => existing.has(name)), []);
});

test('usage errors and API errors use the branded error style', async () => {
	let out = await run('tiktok');
	assert.ok(out.all.includes(header('INVALID FORMAT')));
	assert.match(out.all, /Usage: \.tiktok/);
	process.env.ES_TEAMS_API_KEY = '';
	out = await run('joke');
	assert.ok(out.all.includes(header('ERROR')));
	assert.match(out.all, /ES_TEAMS_API_KEY/);
	assert.match(out.all, /https:\/\/esteamstv\.devs\.surf\/developers\/api/);
	process.env.ES_TEAMS_API_KEY = TEST_KEY;
	mock.state.mode = 'plan';
	out = await run('flux', ['a', 'lion']);
	assert.match(out.all, /Pro or Max/);
	mock.state.mode = 'quota';
	out = await run('weather', ['Lagos']);
	assert.match(out.all, /monthly request limit/);
});

test('the API key never appears in replies or in the logs, even when requests fail', async () => {
	const secret = 'estv_super_secret_unique_value';
	process.env.ES_TEAMS_API_KEY = secret;
	const outputs = [];
	for (const cmd of ['joke', 'weather', 'tiktok', 'flux', 'quote']) {
		const out = await run(cmd, cmd === 'weather' ? ['Lagos'] : cmd === 'tiktok' ? ['https://www.tiktok.com/@a/video/1'] : cmd === 'flux' ? ['a', 'lion'] : []);
		outputs.push(out.all, JSON.stringify(out.sent));
	}
	assert.ok(!outputs.join('\n').includes(secret));
	assert.ok(!logged.join('\n').includes(secret));
});

test('plain command confirmations are branded centrally', async () => {
	const out = await run('jid');
	assert.ok(out.all.includes(header('JID')));
	const ping = await run('ping');
	assert.ok(ping.all.includes(header('PING')));
});

test('commands that already have a header are not branded twice', async () => {
	const out = await run('level', [], { isGroup: true });
	const reply = out.sent.find((s) => s.method === 'm.reply');
	const text = reply.args[0];
	assert.equal(text.split(sansBold('ES TEAMS V1')).length - 1, 1, 'exactly one ES TEAMS V1 header');
	const kick = await run('warnings', ['2348012345678'], { isGroup: true });
	for (const s of kick.sent.filter((x) => x.method === 'm.reply')) assert.ok(s.args[0].split(sansBold('ES TEAMS V1')).length - 1 <= 1);
});
