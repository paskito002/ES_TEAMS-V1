const test = require('node:test');
const assert = require('node:assert/strict');
const axios = require('axios');
const { start, TEST_KEY, PNG } = require('./helpers/mockEsTeamsApi');

let mock;
let api;

test.before(async () => {
	mock = await start();
	process.env.ES_TEAMS_API_BASE_URL = mock.base;
	process.env.ES_TEAMS_API_KEY = TEST_KEY;
	const realPost = axios.post;
	axios.post = async (url, ...rest) => (String(url).includes('uguu.se') ? { data: { files: [{ url: 'https://files.test/up.jpg' }] } } : realPost(url, ...rest));
	api = require('../lib/esteamsApi');
});

test.after(async () => {
	await mock.close();
});

test.beforeEach(() => {
	mock.reset();
	process.env.ES_TEAMS_API_KEY = TEST_KEY;
	process.env.ES_TEAMS_API_BASE_URL = mock.base;
});

const last = () => mock.requests[mock.requests.length - 1];

test('the key travels only in the x-api-key header, never in the URL', async () => {
	await api.getJoke();
	assert.equal(last().key, TEST_KEY);
	assert.deepEqual(Object.keys(last().query), []);
});

test('a missing key fails before any request and tells the owner where to get one', async () => {
	process.env.ES_TEAMS_API_KEY = '';
	await assert.rejects(api.getJoke(), (err) => {
		assert.equal(err.code, 'NO_KEY');
		assert.match(err.message, /ES_TEAMS_API_KEY/);
		assert.match(err.message, /https:\/\/esteamstv\.devs\.surf\/developers\/api/);
		return true;
	});
	assert.equal(mock.requests.length, 0);
});

test('a wrong key is reported clearly and the key never leaks into the error', async () => {
	process.env.ES_TEAMS_API_KEY = 'estv_wrong_key_value';
	await assert.rejects(api.getJoke(), (err) => {
		assert.equal(err.code, 'BAD_KEY');
		assert.match(err.message, /invalid or has been revoked/);
		const dump = JSON.stringify(err) + String(err.stack) + err.message;
		assert.ok(!dump.includes('estv_wrong_key_value'));
		assert.ok(!dump.includes(TEST_KEY));
		return true;
	});
});

test('plan, quota, rate and upstream errors map to readable messages', async () => {
	mock.state.mode = 'plan';
	await assert.rejects(api.site('imagegen', { prompt: 'x' }), (err) => err.plan === true && err.status === 403 && /Pro or Max/.test(err.message));
	mock.state.mode = 'quota';
	await assert.rejects(api.getJoke(), (err) => err.code === 'QUOTA' && /100\/100/.test(err.message) && /developers\/api/.test(err.message));
	mock.state.mode = 'rate';
	await assert.rejects(api.getJoke(), (err) => err.code === 'RATE' && /wait a few seconds/.test(err.message));
	mock.state.mode = 'down';
	await assert.rejects(api.getJoke(), (err) => err.status === 502 && /Upstream failed/.test(err.message));
});

test('an unreachable API gives a friendly message without exposing internals', async () => {
	process.env.ES_TEAMS_API_BASE_URL = 'http://127.0.0.1:9';
	await assert.rejects(api.getJoke(), (err) => err.code === 'NETWORK' && /Could not reach/.test(err.message) && !/127\.0\.0\.1/.test(err.message));
});

test('downloaders send the documented parameters and return the shapes the commands use', async () => {
	let r = await api.downloadTiktok('https://www.tiktok.com/@a/video/1');
	assert.deepEqual([last().name, last().query.url], ['tiktok', 'https://www.tiktok.com/@a/video/1']);
	assert.equal(r.video, 'https://cdn.test/v.mp4');
	assert.equal(r.author, 'Alice');
	r = await api.downloadTiktok('https://www.tiktok.com/@a/photo/1');
	assert.equal(r.video, undefined);
	assert.equal(r.images.length, 2);

	r = await api.downloadFacebook('https://fb.watch/x');
	assert.equal(r.videoUrl, 'https://cdn.test/hd.mp4');

	r = await api.downloadInstagram('https://instagram.com/reel/x');
	assert.equal(r.videoUrl, 'https://cdn.test/r.mp4');
	r = await api.downloadInstagram('https://instagram.com/photo/x');
	assert.equal(r.imageUrl, 'https://cdn.test/p.jpg');
	assert.equal(r.videoUrl, undefined);

	r = await api.downloadTwitter('https://x.com/a/status/1');
	assert.equal(r.videoUrl, 'https://cdn.test/tw.mp4');

	r = await api.downloadYoutube('https://youtu.be/dQw4w9WgXcQ');
	assert.deepEqual([last().name, last().query.format], ['ytdl', 'mp4']);
	assert.deepEqual([r.title, r.quality, r.download_url], ['Clip', '720p', 'https://cdn.test/y.mp4']);
	r = await api.downloadYoutubeAudio('https://youtu.be/dQw4w9WgXcQ');
	assert.equal(last().query.format, 'mp3');
	assert.equal(r.download_url, 'https://cdn.test/a.mp3');

	r = await api.downloadSong('afro beats');
	assert.deepEqual([last().name, last().query.query], ['mp3', 'afro beats']);
	assert.equal(r.audio.download_url, 'https://cdn.test/s.mp3');
	r = await api.downloadVideoSong('afro beats');
	assert.deepEqual([last().name === 'mp4' || mock.requests.some((q) => q.name === 'mp4'), r.videoUrl], [true, 'https://cdn.test/sv.mp4']);

	r = await api.downloadSpotify('https://open.spotify.com/track/1');
	assert.deepEqual([r.title, r.channel, r.DownloadLink], ['Track', 'Band', 'https://cdn.test/sp.mp3']);
	r = await api.downloadApk('whatsapp');
	assert.deepEqual([r.apk_name, r.download_link], ['WhatsApp', 'https://apk.test/whatsapp']);
	r = await api.downloadGdrive('https://drive.google.com/file/d/x');
	assert.deepEqual([r.name, r.size, r.download_link], ['file.zip', '1.0 MB', 'https://drive.test/dl']);
	r = await api.downloadWebsite('https://example.com');
	assert.deepEqual([r.downloadUrl, r.size], ['https://example.com/final.pdf', '2.0 KB']);
});

test('information endpoints send the documented parameters and map their fields', async () => {
	let r = await api.getLyrics('Alan Walker - Faded');
	assert.equal(last().name, 'lyrics');
	assert.ok(last().query.artist && last().query.title);
	assert.equal(r.lyrics, 'La la la');

	r = await api.getWeather('Lagos');
	assert.deepEqual([last().name, last().query.location, r.temperature_c], ['weather', 'Lagos', 29.5]);
	r = await api.getTechNews(5);
	assert.deepEqual([last().query.limit, r.length, r[0].title], ['5', 2, 'Story one']);

	r = await api.tiktokStalk('alice');
	assert.deepEqual([last().name, last().query.username, r.user.uniqueId, r.stats.followerCount], ['tiktokstalk', 'alice', 'alice', 1200000]);
	r = await api.igStalk('alice');
	assert.deepEqual([last().name, r.username, r.avatar], ['igstalk', 'alice', 'https://i.test/ig.jpg']);

	r = await api.getJoke();
	assert.equal(r.joke, 'Chuck Norris can divide by zero.');
	r = await api.getQuran('255');
	assert.equal(last().query.reference, '255:1');
	r = await api.getQuran('2:255');
	assert.equal(last().query.reference, '2:255');
	assert.equal(r.surah, 'Al-Baqarah');
	r = await api.getBible('John 3:16');
	assert.deepEqual([last().query.reference, r.translation], ['John 3:16', 'World English Bible']);

	r = await api.getTrivia();
	assert.equal(r.answer, 'Mars');
	assert.equal(r.options.length, 4);
	assert.ok(r.options.includes('Mars'));
});

test('POST and binary endpoints use the documented bodies and return usable results', async () => {
	assert.equal(await api.askGpt('hello'), 'AI says hello');
	assert.deepEqual(last().body, { prompt: 'hello' });
	assert.equal(await api.removeBg('https://files.test/a.jpg'), 'https://cdn.test/nobg.png');
	assert.deepEqual(last().body, { image_url: 'https://files.test/a.jpg' });
	assert.equal(await api.shortenUrl('https://example.com/long'), 'https://esteamstv.devs.surf/s/abc');
	assert.deepEqual(last().body, { url: 'https://example.com/long' });

	for (const [fn, arg, name, param] of [['generateQr', 'hello', 'qrcode', 'text'], ['screenshotWebsite', 'https://example.com', 'screenshot', 'url'], ['generateBookQuote', 'write this', 'book', 'text'], ['generateFlux', 'a lion', 'imagegen', 'prompt']]) {
		const out = await api[fn](arg);
		assert.ok(Buffer.isBuffer(out) && out.equals(PNG), fn + ' should return image bytes');
		assert.deepEqual([last().name, last().query[param]], [name, arg]);
	}
});

test('temp mail creates an inbox, lists messages and reads their text', async () => {
	const inbox = await api.createTempMail();
	assert.deepEqual([inbox.email, inbox.session_id], ['abc@mail.test', 'TOKEN123']);
	const mails = await api.checkTempMail('TOKEN123');
	assert.equal(mails.length, 1);
	assert.deepEqual([mails[0].fromAddr, mails[0].headerSubject, mails[0].text], ['noreply@x.com', 'Your code', 'Your code is 482913.']);
	assert.ok(mock.requests.some((q) => q.name === 'tempmail/message' && q.query.id === 'm1' && q.query.token === 'TOKEN123'));
});

test('image helpers upload first and call the site with the hosted link', async () => {
	assert.equal(await api.scanImage('https://files.test/a.jpg'), 'A cat sitting on a sofa');
	assert.equal(last().query.url, 'https://files.test/a.jpg');
	const song = await api.recognizeSong(Buffer.from('audio'), 'clip.mp3');
	assert.deepEqual([last().name, last().body.url, song.title], ['shazam', 'https://files.test/up.jpg', 'Faded']);
});
