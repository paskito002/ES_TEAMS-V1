const axios = require('axios');
const FormData = require('form-data');

const BASE = 'https://apis.davidcyril.name.ng';

const get = (path, params = {}, opts = {}) => axios.get(`${BASE}${path}`, { params, timeout: 30000, ...opts });

const uploadToCatbox = async (buffer, filename) => {
	const form = new FormData();
	form.append('reqtype', 'fileupload');
	form.append('fileToUpload', buffer, filename);
	const res = await axios.post('https://catbox.moe/user/api.php', form, { headers: form.getHeaders() });
	return res.data;
};

const downloadTiktok = async (url) => {
	const { data } = await get('/download/tiktokv3', { url });
	if (!data.success || !data.video) throw new Error('No downloadable TikTok video found.');
	return data;
};

const downloadFacebook = async (url) => {
	const { data } = await get('/facebook', { url, apikey: '' });
	const downloads = data?.result?.downloads;
	const videoUrl = downloads?.hd?.url || downloads?.sd?.url;
	if (!videoUrl) throw new Error('No downloadable Facebook video found.');
	return { videoUrl };
};

const downloadTwitter = async (url) => {
	const { data } = await get('/twitter', { url });
	if (!data.success || !data.video_hd) throw new Error('No downloadable Twitter/X video found.');
	return { videoUrl: data.video_hd };
};

const downloadYoutube = async (url) => {
	const { data } = await get('/download/ytmp4', { url, apikey: '' });
	if (!data.success || typeof data.result?.download_url !== 'string') throw new Error('No downloadable YouTube video found.');
	return data.result;
};

const downloadInstagram = async (url) => {
	const { data } = await get('/instagram', { url });
	if (!data.success || !data.result?.video) throw new Error('No downloadable Instagram media found.');
	return { videoUrl: data.result.video };
};

const downloadSong = async (query) => {
	const { data } = await get('/song', { query }, { timeout: 90000 });
	if (!data.status || !data.result?.audio?.download_url) throw new Error('Song not found.');
	return data.result;
};

const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

const downloadVideoSong = async (query) => {
	const { data } = await get('/song', { query }, { timeout: 90000 });
	const videoUrl = data?.result?.video?.download_url || data?.result?.video_url;
	if (!data.status || !videoUrl) throw new Error('Video not found.');

	try {
		const head = await axios.head(videoUrl, { timeout: 15000 });
		const size = Number(head.headers['content-length']);
		if (size && size > MAX_VIDEO_BYTES) throw new Error(`That video is too large to send (${(size / 1024 / 1024).toFixed(1)}MB, limit ${MAX_VIDEO_BYTES / 1024 / 1024}MB). Try a different title match.`);
	} catch (e) {
		if (e.message?.startsWith('That video is too large')) throw e;
	}

	return { title: data.result.title, thumbnail: data.result.thumbnail, videoUrl };
};

const downloadApk = async (query) => {
	const { data } = await get('/download/apk', { text: query });
	if (!data.success || !data.download_link) throw new Error('APK not found.');
	return data;
};

const downloadGdrive = async (url) => {
	const { data } = await get('/gdrive', { url });
	if (!data.success) throw new Error('Failed to fetch Google Drive file.');
	return data;
};

const downloadSpotify = async (url) => {
	const { data } = await get('/spotifydl', { url });
	if (!data.success) throw new Error('Failed to process Spotify track.');
	return data;
};

const downloadWebsite = async (url) => {
	const { data } = await get('/tools/downloadweb', { url });
	const downloadUrl = data?.response?.downloadUrl;
	if (!downloadUrl) throw new Error('No downloadable link in the response.');
	return { downloadUrl };
};

const getLyrics = async (query) => {
	const itunes = await axios.get('https://itunes.apple.com/search', { params: { term: query, limit: 1, entity: 'song' }, timeout: 10000 });
	const best = itunes.data.results?.[0];
	if (!best) throw new Error(`Could not find a match for "${query}".`);
	const { artistName: artist, trackName: title } = best;
	const { data } = await get('/lyrics2', { t: title, a: artist }, { timeout: 15000 });
	if (!data?.lyrics) throw new Error('Lyrics not found.');
	return { artist, title, lyrics: String(data.lyrics).trim() };
};

const getWeather = async (city) => {
	const { data } = await get('/weather', { city });
	if (!data?.data) throw new Error('Failed to fetch weather info.');
	return data.data;
};

const getTechNews = async () => {
	const { data } = await get('/random/technews');
	if (!data.status || !data.result) throw new Error('Failed to fetch tech news.');
	return data.result;
};

const tiktokStalk = async (username) => {
	const { data } = await get('/tiktokStalk', { q: username });
	if (!data?.data?.user) throw new Error('TikTok profile not found.');
	return data.data;
};

const igStalk = async (username) => {
	const { data } = await get('/igstalk', { username });
	if (!data?.usrname) throw new Error('Instagram profile not found.');
	return data;
};

const askGpt = async (text) => {
	const { data } = await get('/ai/gpt4omini', { text });
	if (!data.success || !data.response) throw new Error('AI did not return a response.');
	return data.response;
};

const removeBg = async (imageUrl) => {
	const { data } = await get('/removebg', { url: imageUrl }, { responseType: 'arraybuffer' });
	return Buffer.from(data);
};

const generateQr = async (text) => {
	const { data } = await get('/tools/qrcode', { text }, { responseType: 'arraybuffer' });
	return Buffer.from(data);
};

const shortenUrl = async (url) => {
	const { data } = await get('/tinyurl', { url });
	if (!data?.shortened_url) throw new Error('Failed to shorten URL.');
	return data.shortened_url;
};

const screenshotWebsite = async (url) => {
	const { data } = await get('/ssweb', { url, device: 'tablet' }, { responseType: 'arraybuffer' });
	return Buffer.from(data);
};

const generateFlux = async (prompt) => {
	const { data, headers } = await get('/flux', { prompt }, { responseType: 'arraybuffer' });
	if (!headers['content-type']?.startsWith('image/')) throw new Error('Invalid image received.');
	return Buffer.from(data);
};

const generateBookQuote = async (text) => {
	const { data } = await get('/generate/book', { text, size: 30 }, { responseType: 'arraybuffer' });
	return Buffer.from(data);
};

const generateLogo = async (bgUrl, header, subtitle) => {
	const { data } = await get('/canvas/quote', { image: bgUrl, text: header, font: 'Times New Roman', name: subtitle }, { responseType: 'arraybuffer' });
	return Buffer.from(data);
};

const recognizeSong = async (buffer, filename) => {
	const form = new FormData();
	form.append('audio', buffer, filename);
	const { data } = await axios.post('https://draculazyx-xyzdrac.hf.space/api/Shazam', form, { headers: form.getHeaders(), timeout: 30000 });
	if (!data || data.STATUS !== 200 || !data.song) throw new Error('No match found for that audio/video.');
	return data;
};

const getJoke = async () => {
	const { data } = await axios.get('https://official-joke-api.appspot.com/jokes/random', { timeout: 10000 });
	if (!data?.setup || !data?.punchline) throw new Error('Failed to fetch a joke.');
	return data;
};

const getQuran = async (surahNumber) => {
	const { data } = await get('/quran', { surah: surahNumber });
	if (!data.success || !data.surah) throw new Error('Surah not found. Use a number from 1-114.');
	return data.surah;
};

const getBible = async (reference) => {
	const { data } = await get('/bible', { reference });
	if (!data.success || !data.text) throw new Error('Bible passage not found. Try a format like "John 3:16".');
	return data;
};

const getTrendingCoins = async () => {
	const { data } = await axios.get('https://api.coingecko.com/api/v3/search/trending', { timeout: 10000 });
	const coins = (data?.coins || []).slice(0, 7).map((c) => c.item);
	if (!coins.length) throw new Error('No trending coins found right now.');
	const ids = coins.map((c) => c.id).filter(Boolean).join(',');
	let prices = {};
	if (ids) {
		try {
			const priceRes = await axios.get('https://api.coingecko.com/api/v3/simple/price', { params: { ids, vs_currencies: 'usd', include_24hr_change: true }, timeout: 10000 });
			prices = priceRes.data || {};
		} catch {}
	}
	return coins.map((c, i) => ({
		rank: i + 1,
		name: c.name || c.symbol || 'Unknown',
		symbol: (c.symbol || '').toUpperCase(),
		marketRank: c.market_cap_rank ? `#${c.market_cap_rank}` : '—',
		price: prices[c.id]?.usd ? `$${Number(prices[c.id].usd).toLocaleString(undefined, { maximumFractionDigits: 8 })}` : 'N/A',
		change24h: prices[c.id]?.usd_24h_change ? `${Number(prices[c.id].usd_24h_change).toFixed(2)}%` : 'N/A',
	}));
};

const createTempMail = async () => {
	const { data } = await get('/temp-mail');
	if (!data?.email) throw new Error('Failed to create a temporary email.');
	return data;
};

const checkTempMail = async (sessionId) => {
	const { data } = await get('/temp-mail/inbox', { id: sessionId });
	if (!data.success || !data.messages || !data.messages.length) throw new Error('Inbox is empty or the mail key is invalid.');
	return data.messages;
};

const scanImage = async (imageUrl) => {
	const { data } = await get('/imgscan', { url: imageUrl });
	if (!data.success || !data.result) throw new Error('Could not read any text from that image.');
	return data.result;
};

const readQrFromImage = async (imageUrl) => {
	const { data } = await axios.get('https://api.qrserver.com/v1/read-qr-code/', { params: { fileurl: imageUrl }, timeout: 15000 });
	const value = data?.[0]?.symbol?.[0]?.data;
	if (!value) throw new Error('That image does not contain a readable QR code.');
	return value;
};

const applyJailFilter = async (imageUrl) => {
	const { data } = await get('/canvas/jail', { image: imageUrl }, { responseType: 'arraybuffer' });
	return Buffer.from(data);
};

const applyCanvasEffect = async (effect, imageUrl) => {
	const { data } = await get(`/canvas/${effect}`, { image: imageUrl }, { responseType: 'arraybuffer' });
	return Buffer.from(data);
};

const getTrivia = async () => {
	const { data } = await axios.get('https://opentdb.com/api.php', { params: { amount: 1, type: 'multiple' }, timeout: 10000 });
	const q = data?.results?.[0];
	if (!q) throw new Error('Failed to fetch a trivia question.');
	const decode = (s) => String(s).replace(/&#?\w+;/g, (e) => ({ '&amp;': '&', '&quot;': '"', '&#039;': "'", '&eacute;': 'é', '&uuml;': 'ü', '&ouml;': 'ö', '&auml;': 'ä' }[e] || e));
	const options = [...q.incorrect_answers.map(decode), decode(q.correct_answer)].sort(() => Math.random() - 0.5);
	return { category: decode(q.category), question: decode(q.question), options, answer: decode(q.correct_answer) };
};

const getHoroscope = async (sign) => {
	const { data } = await axios.get('https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily', { params: { sign, day: 'today' }, timeout: 10000 });
	if (!data?.data?.horoscope_data) throw new Error(`Could not fetch a horoscope for "${sign}". Use a sign like aries, taurus, gemini, etc.`);
	return { sign: data.data.sign, date: data.data.date, horoscope: data.data.horoscope_data };
};

module.exports = {
	uploadToCatbox,
	downloadTiktok,
	downloadFacebook,
	downloadInstagram,
	downloadTwitter,
	downloadYoutube,
	downloadSong,
	downloadVideoSong,
	downloadApk,
	downloadGdrive,
	downloadSpotify,
	downloadWebsite,
	getLyrics,
	getWeather,
	getTechNews,
	tiktokStalk,
	igStalk,
	askGpt,
	removeBg,
	generateQr,
	shortenUrl,
	screenshotWebsite,
	generateFlux,
	generateBookQuote,
	generateLogo,
	recognizeSong,
	getJoke,
	getQuran,
	getBible,
	getTrendingCoins,
	createTempMail,
	checkTempMail,
	scanImage,
	readQrFromImage,
	applyJailFilter,
	applyCanvasEffect,
	getTrivia,
	getHoroscope,
};
