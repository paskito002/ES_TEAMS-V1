const http = require('http');

const TEST_KEY = 'estv_test_key_0123456789';
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');

const BINARY = new Set(['qrcode', 'screenshot', 'book', 'imagegen', 'caption']);
const PREMIUM = new Set(['shazam', 'imagegen', 'videogen']);

const ok = (body) => ({ code: 200, body });

const routes = {
	tiktok: (q) => ok(/photo/.test(q.url) ? { type: 'images', title: 'Photo post', author: 'Alice', image_urls: ['https://cdn.test/1.jpg', 'https://cdn.test/2.jpg'] } : { type: 'video', title: 'Dance clip', author: 'Alice', download_url: 'https://cdn.test/v.mp4', expires_at: '2026-01-01T00:00:00.000Z' }),
	facebook: () => ok({ title: 'FB clip', hd_download_url: 'https://cdn.test/hd.mp4', sd_download_url: 'https://cdn.test/sd.mp4' }),
	instagram: (q) => ok(/photo/.test(q.url) ? { type: 'image', title: 'Pic', caption: 'Sunset', download_url: 'https://cdn.test/p.jpg' } : { type: 'video', title: 'Reel', caption: 'Fun', download_url: 'https://cdn.test/r.mp4' }),
	twitter: () => ok({ text: 'Tweet text', thumbnail: 'https://cdn.test/t.jpg', download_url: 'https://cdn.test/tw.mp4' }),
	ytdl: (q) => ok(q.format === 'mp3' ? { title: 'Song', thumbnail: 'https://i.test/t.jpg', duration: 212, format: 'mp3', download_url: 'https://cdn.test/a.mp3' } : { title: 'Clip', thumbnail: 'https://i.test/t.jpg', duration: 90, format: 'mp4', quality: '720', download_url: 'https://cdn.test/y.mp4' }),
	mp3: () => ok({ title: 'Found Song', thumbnail: 'https://i.test/t.jpg', download_url: 'https://cdn.test/s.mp3' }),
	mp4: () => ok({ title: 'Found Video', thumbnail: 'https://i.test/t.jpg', download_url: 'https://cdn.test/sv.mp4' }),
	spotify: () => ok({ title: 'Track', artist: 'Band', thumbnail: 'https://i.test/c.jpg', download_url: 'https://cdn.test/sp.mp3' }),
	soundcloud: () => ok({ title: 'SC Track', artist: 'DJ', thumbnail: 'https://i.test/c.jpg', download_url: 'https://cdn.test/sc.mp3' }),
	pinterest: () => ok({ type: 'image', title: 'Pin', download_url: 'https://cdn.test/pin.jpg' }),
	apk: () => ok({ name: 'WhatsApp', icon: 'https://i.test/icon.png', infoPage: 'https://apk.test/whatsapp' }),
	gdrive: () => ok({ name: 'file.zip', size: '1048576', mimeType: 'application/zip', downloadLink: 'https://drive.test/dl', thumbnail: 'https://i.test/th.png' }),
	downloadweb: () => ok({ finalUrl: 'https://example.com/final.pdf', contentType: 'application/pdf', size: 2048, status: 200 }),
	lyrics: (q) => ok({ artist: q.artist, title: q.title, lyrics: 'La la la' }),
	weather: () => ok({ location: 'Lagos, Lagos, Nigeria', temperature_c: 29.5, windspeed_kmh: 12, condition: 'Mainly clear', observed_at: '2026-08-06T10:00' }),
	technews: () => ok({ stories: [{ title: 'Story one', url: 'https://news.test/1', score: 412, author: 'bob' }, { title: 'Story two', url: 'https://news.test/2', score: 300, author: 'amy' }] }),
	tiktokstalk: () => ok({ uniqueId: 'alice', nickname: 'Alice', verified: true, bio: 'hi', avatar: 'https://i.test/av.jpg', followers: 1200000, following: 10, likes: 5000, videos: 42 }),
	igstalk: () => ok({ username: 'alice', name: 'Alice A', bio: 'bio text', avatar: 'https://i.test/ig.jpg' }),
	ai: () => ok({ response: 'AI says hello' }),
	'bg-remove': () => ok({ image_url: 'https://cdn.test/nobg.png' }),
	shorten: () => ok({ short_url: 'https://esteamstv.devs.surf/s/abc' }),
	shazam: () => ok({ matched: true, title: 'Faded', artist: 'Alan Walker', album: 'Different World', releaseDate: '2015-12-03', spotifyUrl: 'https://open.spotify.com/track/1', songLink: 'https://lis.tn/x' }),
	joke: () => ok({ joke: 'Chuck Norris can divide by zero.', url: 'https://api.chucknorris.io/jokes/abc' }),
	quran: (q) => ok({ reference: q.reference, text: 'Allah - there is no deity except Him', surah: 'Al-Baqarah', numberInSurah: 255 }),
	bible: (q) => ok({ reference: q.reference, text: 'For God so loved the world...', translation: 'World English Bible' }),
	'tempmail/create': () => ok({ email: 'abc@mail.test', password: 'pw', token: 'TOKEN123' }),
	'tempmail/inbox': () => ok({ messages: [{ id: 'm1', from: 'noreply@x.com', subject: 'Your code', intro: 'Your code', seen: false }] }),
	'tempmail/message': () => ok({ id: 'm1', from: 'noreply@x.com', subject: 'Your code', text: 'Your code is 482913.' }),
	imgscan: () => ok({ description: 'A cat sitting on a sofa' }),
	trivia: () => ok({ category: 'Science', difficulty: 'easy', question: 'What planet is red?', correct_answer: 'Mars', incorrect_answers: ['Venus', 'Earth', 'Jupiter'] }),
	capcut: () => ok({ data: { title: 'Template', cover: 'https://i.test/c.jpg', video: { url: 'https://cdn.test/cap.mp4' } } }),
	githubuser: () => ok({ login: 'torvalds', name: 'Linus Torvalds', avatar: 'https://i.test/gh.jpg', bio: null, company: 'Linux Foundation', location: 'Portland, OR', blog: '', public_repos: 8, followers: 250000, following: 0, created_at: '2011-09-03T15:26:22Z' }),
	githubrepo: () => ok({ fullName: 'facebook/react', description: 'UI library', stars: 230000, forks: 47000, openIssues: 900, language: 'JavaScript', url: 'https://github.com/facebook/react', createdAt: '2013-05-24T16:15:54Z' }),
	githubsearch: (q) => ok({ query: q.query, results: [{ full_name: 'o/bot', html_url: 'https://github.com/o/bot', stargazers_count: 10, language: 'JS', description: 'a bot' }] }),
	ytchannel: () => ok({ channel: '@x', result: { title: 'MKBHD', subscribers: '19M', videoCount: 1800, avatar: 'https://i.test/av.jpg', url: 'https://youtube.com/@mkbhd', description: 'Tech' } }),
	youtube: () => ok({ title: 'Never Gonna Give You Up', author: 'Rick Astley', authorUrl: 'https://www.youtube.com/@RickAstleyYT', thumbnail: 'https://i.ytimg.com/vi/x/hq.jpg' }),
	wikipedia: () => ok({ title: 'Lagos', extract: 'Lagos is the largest city in Nigeria.', thumbnail: 'https://i.test/l.jpg', url: 'https://en.wikipedia.org/wiki/Lagos' }),
	dictionary: () => ok({ word: 'hello', phonetic: null, meanings: [{ partOfSpeech: 'noun', definitions: ['An expression of greeting.'] }] }),
	anime: () => ok({ title: 'Naruto', titleEnglish: 'Naruto', synopsis: 'A ninja.', type: 'TV', episodes: 220, status: 'Finished Airing', score: 7.99, year: 2002, genres: ['Action'], image: 'https://i.test/n.jpg', url: 'https://mal.test/20' }),
	movie: () => ok({ title: 'Inception', overview: 'Dreams.', releaseDate: '2010-07-15', rating: 8.4, genres: ['Action', 'Sci-Fi'], runtimeMinutes: 148, poster: 'https://i.test/p.jpg', backdrop: 'https://i.test/b.jpg' }),
	npm: () => ok({ name: 'express', version: '4.21.2', description: 'Fast web framework', license: 'MIT', homepage: 'http://expressjs.com/', author: 'TJ' }),
	country: () => ok({ name: 'Nigeria', capital: 'Abuja', region: 'Africa', subregion: 'Western Africa', population: 206139589, flag: 'https://flagcdn.com/w320/ng.png', currencies: ['NGN'] }),
	iplookup: () => ok({ ip: '8.8.8.8', city: 'Mountain View', region: 'California', country: 'United States', country_code: 'US', latitude: 37.4, longitude: -122.08, timezone: 'America/Los_Angeles', org: 'GOOGLE' }),
	sportsteam: () => ok({ name: 'Arsenal', sport: 'Soccer', league: 'English Premier League', country: 'England', stadium: 'Emirates Stadium', founded: '1886', description: 'A club.', badge: 'https://i.test/b.png', website: 'www.arsenal.com' }),
	minecraft: () => ok({ online: true, hostname: 'mc.hypixel.net', version: '1.8-1.21', playersOnline: 25000, playersMax: 200000, motd: '§aHypixel Network' }),
	holidays: () => ok({ holidays: [{ date: '2026-01-01', name: "New Year's Day", localName: "New Year's Day", global: true }] }),
	livescore: () => ok({ matches: [{ competition: 'NPFL', score: '1-0' }] }),
	forecast: (q) => ok({ city: q.city, forecast: [{ date: '2026-11-13', min: 24, max: 31, text: 'Sunny' }] }),
	crypto: () => ok({ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', priceUsd: 64000.12, priceNgn: 99000000, change24hPercent: 1.53, thumbnail: 'https://i.test/btc.png' }),
	currency: (q) => ok({ from: q.from, to: q.to, amount: Number(q.amount), result: 155023, date: '2026-08-05' }),
	websearch: (q) => ok({ engine: 'google', query: q.query, results: [{ title: 'Result 1', link: 'https://r.test/1', snippet: 'snippet' }] }),
	imagesearch: () => ok({ results: [{ title: 'cat', image: 'https://img.test/cat.jpg' }] }),
	ytsearch: () => ok({ results: [{ title: 'Afro mix', channel: 'DJ', duration: '3:20', id: 'dQw4w9WgXcQ' }] }),
	tiktoksearch: () => ok({ results: [{ title: 'dance', author: 'a', url: 'https://tiktok.test/v/1' }] }),
	pinterestsearch: () => ok({ results: [{ title: 'decor', image: 'https://i.test/d.jpg' }] }),
	linkpreview: () => ok({ url: 'https://esteamstv.devs.surf/', title: 'ES TEAMS TV', description: 'Live TV', image: 'https://esteamstv.devs.surf/og.png', siteName: 'esteamstv.devs.surf' }),
	pastquestions: (q) => ok(!q.exam ? { step: 'exams', result: ['jamb', 'waec'] } : !q.subject ? { step: 'subjects', exam: q.exam, result: [{ slug: 'english-language' }] } : !q.year ? { step: 'years', result: [2019] } : { step: 'questions', exam: q.exam, subject: q.subject, year: Number(q.year), result: [{ id: 1, question: 'What is 1+1?', options: ['1', '2', '3', '4'], answer: 'B' }] }),
	'wa-check': () => ok({ exists: true, jid: '2348012345678@s.whatsapp.net' }),
	translate: (q) => ok({ input: q.text, from: 'auto', to: q.to, result: 'Hola' }),
	ocr: () => ok({ text: 'Text in image', confidence: 96 }),
	password: (q) => ok({ password: 'aB3kZ9mQ2pL7vN0x', length: Number(q.length) }),
	hash: (q, body) => ok({ input: body.text, algorithm: body.algorithm || 'sha256', result: body.mode && body.mode !== 'hash' ? 'ENCODED' : 'HASHED' }),
	tts: () => ok({ voice: 'aria', download_url: 'https://cdn.test/tts.mp3', expires_at: '2026-01-01T00:00:00.000Z' }),
	summarize: () => ok({ summary: 'A short summary.' }),
	chart: () => ok({ chart_url: 'https://quickchart.io/chart?c=1' }),
	ytsummary: () => ok({ title: 'Talk', result: { summary: 'Video summary text.' } }),
	videogen: () => ok({ video_url: 'https://files.test/v.mp4' }),
	quote: () => ok({ quote: 'Do great work.', author: 'Steve Jobs' }),
	advice: () => ok({ advice: "Don't be afraid to ask questions." }),
	catfact: () => ok({ fact: 'Cats sleep 70% of their lives.' }),
	dogimage: () => ok({ imageUrl: 'https://images.dog.ceo/breeds/x.jpg' }),
};

function start() {
	const state = { mode: 'normal', requests: [] };
	const server = http.createServer((req, res) => {
		const url = new URL(req.url, 'http://localhost');
		const name = url.pathname.replace('/api/v1/dev/', '');
		const chunks = [];
		req.on('data', (c) => chunks.push(c));
		req.on('end', () => {
			let body = {};
			try { body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch { body = {}; }
			const query = Object.fromEntries(url.searchParams);
			state.requests.push({ method: req.method, name, query, body, key: req.headers['x-api-key'] || '' });
			const send = (code, payload, type = 'application/json') => { res.writeHead(code, { 'Content-Type': type }); res.end(Buffer.isBuffer(payload) ? payload : JSON.stringify(payload)); };
			if (req.headers['x-api-key'] !== TEST_KEY) return send(401, { error: req.headers['x-api-key'] ? 'Invalid or revoked API key.' : 'Missing API key. Send it in the x-api-key header.' });
			if (state.mode === 'quota') return send(429, { error: 'Monthly request limit reached.', requests_this_month: 100, monthly_limit: 100 });
			if (state.mode === 'rate') return send(429, { error: 'Too many requests.' });
			if (state.mode === 'down') return send(502, { error: 'Upstream failed.' });
			if (state.mode === 'plan' && PREMIUM.has(name)) return send(403, { error: 'This endpoint requires a Pro or Max Developer API plan. Upgrade your plan to unlock it.' });
			if (BINARY.has(name)) return send(200, PNG, 'image/png');
			const route = routes[name];
			if (!route) return send(404, { error: 'Unknown endpoint.' });
			const out = route(query, body);
			return send(out.code, out.body);
		});
	});
	return new Promise((resolve) => server.listen(0, '127.0.0.1', () => {
		const base = `http://127.0.0.1:${server.address().port}`;
		resolve({ base, state, requests: state.requests, close: () => new Promise((r) => server.close(r)), reset: () => { state.mode = 'normal'; state.requests.length = 0; } });
	}));
}

module.exports = { start, TEST_KEY, PNG };
