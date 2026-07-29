const api = require('../lib/esteamsApi');

const results = [];

async function check(name, fn) {
	const start = Date.now();
	try {
		const data = await fn();
		const ms = Date.now() - start;
		results.push({ name, ok: true, ms, note: summarize(data) });
		console.log(`PASS  ${name} (${ms}ms) ${summarize(data)}`);
	} catch (e) {
		const ms = Date.now() - start;
		const msg = e?.response?.status ? `HTTP ${e.response.status} ${e.message}` : (e.message || String(e));
		results.push({ name, ok: false, ms, note: msg });
		console.log(`FAIL  ${name} (${ms}ms) ${msg}`);
	}
}

function summarize(data) {
	if (Buffer.isBuffer(data)) return `Buffer(${data.length} bytes)`;
	if (typeof data === 'string') return data.slice(0, 120).replace(/\n/g, ' ');
	if (data && typeof data === 'object') return JSON.stringify(data).slice(0, 160);
	return String(data);
}

const TEST_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/JPEG_example_JPG_RIP_100.jpg/640px-JPEG_example_JPG_RIP_100.jpg';
const TEST_AUDIO = 'https://upload.wikimedia.org/wikipedia/commons/6/61/Tim_Janis_-_01_-_A_Walk_In_The_Woods.mp3';

async function main() {
	await check('uploadToCatbox', async () => {
		const buf = Buffer.from('ES TEAMS V1 API TEST');
		return api.uploadToCatbox(buf, 'test.txt');
	});

	await check('downloadTiktok', () => api.downloadTiktok('https://www.tiktok.com/@tiktok/video/7106594312292453675'));
	await check('downloadFacebook', () => api.downloadFacebook('https://www.facebook.com/watch/?v=10153231379946729'));
	await check('downloadTwitter', () => api.downloadTwitter('https://twitter.com/Twitter/status/1445078208190291973'));
	await check('downloadYoutube', () => api.downloadYoutube('https://www.youtube.com/watch?v=dQw4w9WgXcQ'));
	await check('downloadInstagram', () => api.downloadInstagram('https://www.instagram.com/p/CqIbCzYMi5C/'));
	await check('downloadSong', () => api.downloadSong('Faded Alan Walker'));
	await check('downloadVideoSong', () => api.downloadVideoSong('Faded Alan Walker'));
	await check('downloadApk', () => api.downloadApk('whatsapp'));
	await check('downloadGdrive', () => api.downloadGdrive('https://drive.google.com/file/d/1BvcHVWNU4Q4wPHVN0J5x2n8ns6FzGnKb/view'));
	await check('downloadSpotify', () => api.downloadSpotify('https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3'));
	await check('downloadWebsite', () => api.downloadWebsite('https://example.com'));

	await check('getLyrics', () => api.getLyrics('Shape of You Ed Sheeran'));
	await check('getWeather', () => api.getWeather('London'));
	await check('getTechNews', () => api.getTechNews());
	await check('tiktokStalk', () => api.tiktokStalk('tiktok'));
	await check('igStalk', () => api.igStalk('instagram'));

	await check('askGpt', () => api.askGpt('Say the word PONG and nothing else.'));
	await check('removeBg', () => api.removeBg(TEST_IMAGE));
	await check('generateQr', () => api.generateQr('ES TEAMS V1 TEST'));
	await check('shortenUrl', () => api.shortenUrl('https://example.com'));
	await check('screenshotWebsite', () => api.screenshotWebsite('https://example.com'));
	await check('generateFlux', () => api.generateFlux('a small blue cat, digital art'));
	await check('generateBookQuote', () => api.generateBookQuote('Hello from ES TEAMS V1 API test.'));
	await check('generateLogo', () => api.generateLogo(TEST_IMAGE, 'ES TEAMS', 'API TEST'));

	await check('recognizeSong', async () => {
		const axios = require('axios');
		const { data } = await axios.get(TEST_AUDIO, { responseType: 'arraybuffer', timeout: 20000 });
		return api.recognizeSong(Buffer.from(data), 'clip.mp3');
	});

	await check('getJoke', () => api.getJoke());
	await check('getQuran', () => api.getQuran(1));
	await check('getBible', () => api.getBible('John 3:16'));
	await check('getTrendingCoins', () => api.getTrendingCoins());

	await check('createTempMail+checkTempMail', async () => {
		const created = await api.createTempMail();
		try {
			const messages = await api.checkTempMail(created.session_id);
			return { created, messages };
		} catch (e) {
			return { created, checkInboxNote: 'empty inbox is expected for a freshly created mailbox: ' + e.message };
		}
	});

	await check('scanImage', () => api.scanImage(TEST_IMAGE));

	await check('generateQr+readQrFromImage', async () => {
		const qrBuffer = await api.generateQr('ES TEAMS V1 ROUNDTRIP TEST');
		const uploadedUrl = await api.uploadToCatbox(qrBuffer, 'qr.png');
		if (!uploadedUrl.startsWith('https://files.catbox.moe')) throw new Error('catbox upload failed, cannot roundtrip test readQrFromImage');
		return api.readQrFromImage(uploadedUrl);
	});

	await check('applyJailFilter', () => api.applyJailFilter(TEST_IMAGE));
	await check('applyCanvasEffect(wasted)', () => api.applyCanvasEffect('wasted', TEST_IMAGE));
	await check('applyCanvasEffect(triggered)', () => api.applyCanvasEffect('triggered', TEST_IMAGE));

	await check('getTrivia', () => api.getTrivia());
	await check('getHoroscope', () => api.getHoroscope('aries'));

	console.log('\n========== SUMMARY ==========');
	const pass = results.filter((r) => r.ok);
	const fail = results.filter((r) => !r.ok);
	console.log(`${pass.length}/${results.length} passed`);
	if (fail.length) {
		console.log('\nFAILED:');
		for (const r of fail) console.log(`- ${r.name}: ${r.note}`);
	}
}

main().catch((e) => {
	console.error('TEST SCRIPT CRASHED:', e);
	process.exit(1);
});
