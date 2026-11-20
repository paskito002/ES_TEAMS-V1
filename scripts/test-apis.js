const api = require('../lib/esteamsApi');

if (!process.env.ES_TEAMS_API_KEY) {
	console.error('ES_TEAMS_API_KEY is not set.\nCreate a key at https://esteamstv.devs.surf/developers/api and run:\n  ES_TEAMS_API_KEY=estv_your_key node scripts/test-apis.js');
	process.exit(2);
}

const YT = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const TT = process.env.TEST_TIKTOK_URL || 'https://www.tiktok.com/@scout2015/video/6718335390845095173';
const has = (value, what) => { if (!value) throw new Error(`missing ${what}`); };

const checks = [
	['weather', async () => has((await api.getWeather('Lagos')).temperature_c !== undefined, 'temperature')],
	['technews', async () => has((await api.getTechNews(3)).length, 'stories')],
	['joke', async () => has((await api.getJoke()).joke, 'joke')],
	['bible', async () => has((await api.getBible('John 3:16')).text, 'text')],
	['quran', async () => has((await api.getQuran('1:1')).text, 'text')],
	['trivia', async () => has((await api.getTrivia()).options.length, 'options')],
	['lyrics', async () => has((await api.getLyrics('Adele - Hello')).lyrics, 'lyrics')],
	['tiktokstalk', async () => has((await api.tiktokStalk('tiktok')).user.uniqueId, 'profile')],
	['igstalk', async () => has((await api.igStalk('instagram')).username, 'profile')],
	['qrcode', async () => has((await api.generateQr('ES TEAMS')).length, 'image bytes')],
	['book', async () => has((await api.generateBookQuote('Hello')).length, 'image bytes')],
	['shorten', async () => has(await api.shortenUrl('https://example.com/a/very/long/link'), 'short url')],
	['ai', async () => has(await api.askGpt('Say hi in one word'), 'response')],
	['tempmail', async () => { const m = await api.createTempMail(); has(m.email && m.session_id, 'inbox'); }],
	['ytdl mp3 (link)', async () => has((await api.downloadYoutubeAudio(YT)).download_url, 'download_url')],
	['ytdl mp4 (link)', async () => has((await api.downloadYoutube(YT)).download_url, 'download_url')],
	['mp3 (search)', async () => has((await api.downloadSong('Burna Boy Last Last')).audio.download_url, 'download_url')],
	['tiktok', async () => { const r = await api.downloadTiktok(TT); has(r.video || r.images.length, 'media'); }],
	['apk', async () => has((await api.downloadApk('whatsapp')).download_link, 'page')],
	['imagegen (Pro/Max)', async () => has((await api.generateFlux('a red balloon')).length, 'image bytes')],
];
const siteChecks = [
	['wikipedia', { title: 'Lagos' }, 'extract'],
	['dictionary', { word: 'hello' }, 'word'],
	['githubuser', { username: 'torvalds' }, 'login'],
	['crypto', { coin: 'bitcoin' }, 'priceUsd'],
	['currency', { from: 'usd', to: 'ngn', amount: 1 }, 'result'],
	['translate', { text: 'Good morning', to: 'es' }, 'result'],
	['movie', { query: 'Inception' }, 'title'],
	['country', { name: 'nigeria' }, 'name'],
];
for (const [endpoint, params, field] of siteChecks) {
	checks.push([`${endpoint} (new command)`, async () => has((await api.site(endpoint, params))[field], field)]);
}

(async () => {
	let failed = 0, planLocked = 0;
	for (const [name, run] of checks) {
		const started = Date.now();
		try {
			await run();
			console.log(`PASS  ${name} (${Date.now() - started}ms)`);
		} catch (err) {
			if (err.plan) { planLocked++; console.log(`SKIP  ${name}: needs a Pro or Max plan`); continue; }
			if (err.code === 'BAD_KEY' || err.code === 'NO_KEY') { console.error(`\n${err.message}`); process.exit(2); }
			failed++;
			console.log(`FAIL  ${name}: ${err.message}`);
		}
	}
	console.log(`\n${checks.length - failed - planLocked} passed, ${planLocked} plan-locked, ${failed} failed`);
	process.exit(failed ? 1 : 0);
})();
