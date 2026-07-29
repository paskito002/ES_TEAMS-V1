const api = require('../lib/esteamsApi');

const results = [];

const CHECK_TIMEOUT_MS = 45000;

async function check(name, fn) {
	const start = Date.now();
	try {
		const data = await Promise.race([
			fn(),
			new Promise((_, reject) => setTimeout(() => reject(new Error(`timed out after ${CHECK_TIMEOUT_MS}ms`)), CHECK_TIMEOUT_MS)),
		]);
		const ms = Date.now() - start;
		results.push({ name, ok: true, ms, note: summarize(data) });
		console.log(`PASS  ${name} (${ms}ms) ${summarize(data)}`);
	} catch (e) {
		const ms = Date.now() - start;
		const msg = e?.response?.status ? `HTTP ${e.response.status} ${describeErrorBody(e.response.data)}` : (e.message || String(e));
		results.push({ name, ok: false, ms, note: msg });
		console.log(`FAIL  ${name} (${ms}ms) ${msg}`);
	}
}

function describeErrorBody(data) {
	if (data == null) return '(no body)';
	if (Buffer.isBuffer(data)) {
		const text = data.toString('utf8');
		return text.slice(0, 300).replace(/\n/g, ' ');
	}
	if (typeof data === 'string') return data.slice(0, 300).replace(/\n/g, ' ');
	try {
		return JSON.stringify(data).slice(0, 300);
	} catch {
		return String(data);
	}
}

function summarize(data) {
	if (Buffer.isBuffer(data)) return `Buffer(${data.length} bytes)`;
	if (typeof data === 'string') return data.slice(0, 120).replace(/\n/g, ' ');
	if (data && typeof data === 'object') return JSON.stringify(data).slice(0, 160);
	return String(data);
}

const TEST_IMAGE = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
const TEST_AUDIO = 'https://upload.wikimedia.org/wikipedia/commons/6/61/Tim_Janis_-_01_-_A_Walk_In_The_Woods.mp3';
const FETCH_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function main() {
	await check('uploadToCatbox', async () => {
		const buf = Buffer.from('ES TEAMS V1 API TEST');
		return api.uploadToCatbox(buf, 'test.txt');
	});

	await check('downloadTiktok', () => api.downloadTiktok('https://www.tiktok.com/@tiktok/video/7106594312292453675'));
	await check('downloadFacebook', () => api.downloadFacebook('https://www.facebook.com/watch/?v=10153231379946729'));
	await check('downloadTwitter', () => api.downloadTwitter('https://x.com/elonmusk/status/1868872687376568593'));
	await check('downloadYoutube', () => api.downloadYoutube('https://www.youtube.com/watch?v=dQw4w9WgXcQ'));
	await check('downloadInstagram', () => api.downloadInstagram('https://www.instagram.com/p/CqIbCzYMi5C/'));
	await check('downloadSong', () => api.downloadSong('Faded Alan Walker'));
	await check('downloadVideoSong', () => api.downloadVideoSong('Faded Alan Walker'));
	await check('downloadApk', () => api.downloadApk('Termux'));
	await check('downloadGdrive', () => api.downloadGdrive('https://drive.google.com/file/d/1BvcHVWNU4Q4wPHVN0J5x2n8ns6FzGnKb/view'));
	await check('downloadSpotify', () => api.downloadSpotify('https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b'));
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

	await check('recognizeSong (endpoint reachability only, dummy audio)', async () => {
		try {
			return await api.recognizeSong(Buffer.from('not a real audio file'), 'clip.mp3');
		} catch (e) {
			if (e.message === 'No match found for that audio/video.') return 'endpoint reachable, correctly reported no match';
			throw e;
		}
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

	console.log('\n========== DIAGNOSTICS ==========');
	const axios = require('axios');
	const FormData = require('form-data');
	const BASE = 'https://apis.davidcyril.name.ng';
	const rawGet = async (label, url, params) => {
		try {
			const { data } = await axios.get(url, { params, timeout: 15000 });
			console.log(`DIAG  ${label}: ${JSON.stringify(data).slice(0, 300)}`);
		} catch (e) {
			console.log(`DIAG  ${label}: HTTP ${e?.response?.status} ${describeErrorBody(e?.response?.data).slice(0, 200)}`);
		}
	};

	const realPng = await api.generateQr('ES TEAMS V1 UPLOAD HOST TEST');

	for (const [label, upload] of [
		['telegra.ph', async () => {
			const form = new FormData();
			form.append('file', realPng, { filename: 'test.png', contentType: 'image/png' });
			return axios.post('https://telegra.ph/upload', form, { headers: { ...form.getHeaders(), 'User-Agent': FETCH_UA }, timeout: 20000 });
		}],
		['uguu.se', async () => {
			const form = new FormData();
			form.append('files[]', realPng, { filename: 'test.png', contentType: 'image/png' });
			return axios.post('https://uguu.se/upload', form, { headers: { ...form.getHeaders(), 'User-Agent': FETCH_UA }, timeout: 20000 });
		}],
		['freeimage.host', async () => {
			const form = new FormData();
			form.append('source', realPng.toString('base64'));
			form.append('type', 'base64');
			form.append('action', 'upload');
			return axios.post('https://freeimage.host/api/1/upload', form, { headers: { ...form.getHeaders(), 'User-Agent': FETCH_UA }, timeout: 20000 });
		}],
	]) {
		try {
			const { data } = await upload();
			console.log(`DIAG  ${label} upload: ${JSON.stringify(data).slice(0, 250)}`);
		} catch (e) {
			console.log(`DIAG  ${label} upload: HTTP ${e?.response?.status} ${describeErrorBody(e?.response?.data)}`);
		}
	}

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
