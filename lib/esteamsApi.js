const axios = require('axios');
const FormData = require('form-data');

const DEFAULT_BASE_URL = 'https://esteamstv.devs.surf';
const KEY_URL = 'https://esteamstv.devs.surf/developers/api';
const UA = 'Mozilla/5.0 (compatible; ES-TEAMS-V1-WhatsApp-Bot)';
const LEGACY_BASE = 'https://apis.davidcyril.name.ng';

const baseUrl = () => String(process.env.ES_TEAMS_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, '');
const apiKey = () => String(process.env.ES_TEAMS_API_KEY || '').trim();

class ApiError extends Error {
	constructor(message, { status = 0, code = 'API_ERROR', plan = false } = {}) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
		this.code = code;
		this.plan = plan;
	}
}

const missingKeyMessage = () =>
	`This command needs an ES Teams TV API key.\n\nEvery bot owner uses their own key: create one at ${KEY_URL}, then set it as the ES_TEAMS_API_KEY environment variable on your host and restart the bot.`;

const errorFromResponse = (status, body) => {
	const detail = body && typeof body.error === 'string' ? body.error : '';
	if (status === 401) {
		if (/missing/i.test(detail)) return new ApiError(missingKeyMessage(), { status, code: 'NO_KEY' });
		return new ApiError(`Your ES_TEAMS_API_KEY is invalid or has been revoked. Create a new key at ${KEY_URL} and update the environment variable.`, { status, code: 'BAD_KEY' });
	}
	if (status === 403) return new ApiError(detail || 'This feature needs a Pro or Max ES Teams TV API plan.', { status, code: 'PLAN', plan: true });
	if (status === 429) {
		if (body && body.monthly_limit) {
			return new ApiError(`The monthly request limit for your ES Teams TV API key was reached (${body.requests_this_month}/${body.monthly_limit}). Upgrade your plan at ${KEY_URL} or wait for the next month.`, { status, code: 'QUOTA' });
		}
		return new ApiError('Too many requests right now. Please wait a few seconds and try again.', { status, code: 'RATE' });
	}
	return new ApiError(detail || `The ES Teams TV API responded with an error (HTTP ${status}).`, { status, code: 'HTTP' });
};

const networkMessage = (err) => {
	if (err && (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT')) return 'The ES Teams TV API took too long to respond. Please try again.';
	return 'Could not reach the ES Teams TV API right now. Please try again shortly.';
};

const parseBinaryError = (data) => {
	try { return JSON.parse(Buffer.from(data).toString('utf8')); } catch { return null; }
};

const request = async (method, path, { params, data, binary = false, timeout = 30000 } = {}) => {
	const key = apiKey();
	if (!key) throw new ApiError(missingKeyMessage(), { status: 401, code: 'NO_KEY' });
	let res;
	try {
		res = await axios({
			method,
			url: `${baseUrl()}${path}`,
			params,
			data,
			timeout,
			responseType: binary ? 'arraybuffer' : 'json',
			headers: { 'x-api-key': key, 'User-Agent': UA, Accept: binary ? '*/*' : 'application/json' },
			validateStatus: () => true,
			maxRedirects: 3,
		});
	} catch (err) {
		throw new ApiError(networkMessage(err), { status: 0, code: 'NETWORK' });
	}
	if (res.status >= 200 && res.status < 300) {
		if (!binary) return res.data;
		const type = String(res.headers?.['content-type'] || '');
		if (/json/i.test(type)) {
			const body = parseBinaryError(res.data);
			throw new ApiError((body && body.error) || 'The ES Teams TV API did not return an image.', { status: res.status, code: 'NOT_BINARY' });
		}
		return Buffer.from(res.data);
	}
	const body = binary ? parseBinaryError(res.data) : res.data;
	throw errorFromResponse(res.status, body && typeof body === 'object' ? body : null);
};

const site = (path, params, opts) => request('get', `/api/v1/dev/${path}`, { params, ...opts });
const siteBinary = (path, params, opts) => request('get', `/api/v1/dev/${path}`, { params, binary: true, ...opts });
const sitePost = (path, body, opts) => request('post', `/api/v1/dev/${path}`, { data: body, ...opts });

const formatBytes = (value) => {
	const n = Number(value);
	if (!Number.isFinite(n) || n <= 0) return 'Unknown';
	const units = ['B', 'KB', 'MB', 'GB'];
	let i = 0, v = n;
	while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
	return `${v.toFixed(i ? 1 : 0)} ${units[i]}`;
};

const legacyGet = (path, params = {}, opts = {}) => axios.get(`${LEGACY_BASE}${path}`, { params, timeout: 30000, ...opts });

const uploadImage = async (buffer, filename) => {
	const form = new FormData();
	form.append('files[]', buffer, filename);
	const res = await axios.post('https://uguu.se/upload', form, {
		headers: { ...form.getHeaders(), 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
		timeout: 30000,
	});
	const url = res.data?.files?.[0]?.url;
	if (!url) throw new Error('Failed to upload image.');
	return url;
};

const downloadTiktok = async (url) => {
	const data = await site('tiktok', { url });
	if (!data.download_url && !(data.image_urls && data.image_urls.length)) throw new Error('No downloadable TikTok media found.');
	return { author: data.author, description: data.title, video: data.download_url, images: data.image_urls || [] };
};

const downloadFacebook = async (url) => {
	const data = await site('facebook', { url });
	const videoUrl = data.hd_download_url || data.sd_download_url;
	if (!videoUrl) throw new Error('No downloadable Facebook video found.');
	return { videoUrl, title: data.title };
};

const downloadTwitter = async (url) => {
	const data = await site('twitter', { url });
	if (!data.download_url) throw new Error('No downloadable Twitter/X video found.');
	return { videoUrl: data.download_url, text: data.text };
};

const downloadYoutube = async (url) => {
	const data = await site('ytdl', { url, format: 'mp4' }, { timeout: 90000 });
	if (typeof data.download_url !== 'string') throw new Error('No downloadable YouTube video found.');
	return { title: data.title, quality: data.quality ? `${data.quality}p` : 'mp4', download_url: data.download_url, thumbnail: data.thumbnail };
};

const downloadYoutubeAudio = async (url) => {
	const data = await site('ytdl', { url, format: 'mp3' }, { timeout: 90000 });
	if (typeof data.download_url !== 'string') throw new Error('No downloadable YouTube audio found.');
	return data;
};

const downloadInstagram = async (url) => {
	const data = await site('instagram', { url });
	if (!data.download_url) throw new Error('No downloadable Instagram media found.');
	return data.type === 'image'
		? { imageUrl: data.download_url, caption: data.caption, title: data.title }
		: { videoUrl: data.download_url, caption: data.caption, title: data.title };
};

const downloadSong = async (query) => {
	const data = await site('mp3', { query }, { timeout: 90000 });
	if (!data.download_url) throw new Error('Song not found.');
	return { title: data.title, thumbnail: data.thumbnail, audio: { download_url: data.download_url } };
};

const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

const downloadVideoSong = async (query) => {
	const data = await site('mp4', { query }, { timeout: 90000 });
	if (!data.download_url) throw new Error('Video not found.');
	const videoUrl = data.download_url;
	try {
		const head = await axios.head(videoUrl, { timeout: 15000 });
		const size = Number(head.headers['content-length']);
		if (size && size > MAX_VIDEO_BYTES) throw new Error(`That video is too large to send (${(size / 1024 / 1024).toFixed(1)}MB, limit ${MAX_VIDEO_BYTES / 1024 / 1024}MB). Try a different title.`);
	} catch (e) {
		if (e.message?.startsWith('That video is too large')) throw e;
	}
	return { title: data.title, thumbnail: data.thumbnail, videoUrl };
};

const downloadApk = async (query) => {
	const data = await site('apk', { query });
	if (!data.infoPage) throw new Error('APK not found.');
	return { apk_name: data.name, thumbnail: data.icon, download_link: data.infoPage };
};

const downloadGdrive = async (url) => {
	const data = await site('gdrive', { url });
	if (!data.downloadLink) throw new Error('Failed to fetch Google Drive file.');
	return { name: data.name, size: formatBytes(data.size), mimeType: data.mimeType, download_link: data.downloadLink, thumbnail: data.thumbnail };
};

const downloadSpotify = async (url) => {
	const data = await site('spotify', { url }, { timeout: 90000 });
	if (!data.download_url) throw new Error('Failed to process Spotify track.');
	return { title: data.title, channel: data.artist, thumbnail: data.thumbnail, DownloadLink: data.download_url };
};

const downloadWebsite = async (url) => {
	const data = await site('downloadweb', { url });
	if (!data.finalUrl) throw new Error('No downloadable link in the response.');
	return { downloadUrl: data.finalUrl, contentType: data.contentType, size: formatBytes(data.size) };
};

const getLyrics = async (query) => {
	let artist, title;
	try {
		const itunes = await axios.get('https://itunes.apple.com/search', { params: { term: query, limit: 1, entity: 'song' }, timeout: 10000 });
		const best = itunes.data.results?.[0];
		if (best) ({ artistName: artist, trackName: title } = best);
	} catch {}
	if (!artist || !title) {
		const parts = query.split(/\s+-\s+/);
		if (parts.length < 2) throw new Error(`Could not find a match for "${query}". Try ".lyrics artist - song title".`);
		[artist, title] = [parts[0].trim(), parts.slice(1).join(' - ').trim()];
	}
	const data = await site('lyrics', { artist, title }, { timeout: 20000 });
	if (!data?.lyrics) throw new Error('Lyrics not found.');
	return { artist: data.artist || artist, title: data.title || title, lyrics: String(data.lyrics).trim() };
};

const getWeather = async (city) => {
	const data = await site('weather', { location: city });
	if (!data?.location) throw new Error('Failed to fetch weather info.');
	return data;
};

const getTechNews = async (limit = 5) => {
	const data = await site('technews', { limit });
	if (!data?.stories?.length) throw new Error('Failed to fetch tech news.');
	return data.stories;
};

const tiktokStalk = async (username) => {
	const data = await site('tiktokstalk', { username });
	if (!data?.uniqueId) throw new Error('TikTok profile not found.');
	return {
		user: { uniqueId: data.uniqueId, nickname: data.nickname, verified: data.verified, avatarLarger: data.avatar, bio: data.bio },
		stats: { followerCount: data.followers ?? 0, followingCount: data.following ?? 0, heartCount: data.likes ?? 0, videoCount: data.videos ?? 0 },
	};
};

const igStalk = async (username) => {
	const data = await site('igstalk', { username });
	if (!data?.username) throw new Error('Instagram profile not found.');
	return data;
};

const askGpt = async (text) => {
	const data = await sitePost('ai', { prompt: text }, { timeout: 60000 });
	if (!data.response) throw new Error('AI did not return a response.');
	return data.response;
};

const removeBg = async (imageUrl) => {
	const data = await sitePost('bg-remove', { image_url: imageUrl }, { timeout: 90000 });
	if (!data.image_url) throw new Error('Background removal failed.');
	return data.image_url;
};

const generateQr = (text) => siteBinary('qrcode', { text });

const shortenUrl = async (url) => {
	const data = await sitePost('shorten', { url });
	if (!data?.short_url) throw new Error('Failed to shorten URL.');
	return data.short_url;
};

const screenshotWebsite = (url) => siteBinary('screenshot', { url }, { timeout: 60000 });

const legacyFlux = async (prompt) => {
	const { data, headers } = await legacyGet('/flux', { prompt }, { responseType: 'arraybuffer' });
	if (!headers['content-type']?.startsWith('image/')) throw new Error('Invalid image received.');
	return Buffer.from(data);
};

const generateFlux = async (prompt) => {
	try {
		return await siteBinary('imagegen', { prompt }, { timeout: 120000 });
	} catch (err) {
		if (!err.plan) throw err;
		try { return await legacyFlux(prompt); } catch { throw err; }
	}
};

const generateBookQuote = (text) => siteBinary('book', { text });

const generateLogo = async (bgUrl, header, subtitle) => {
	const { data } = await legacyGet('/canvas/quote', { image: bgUrl, text: header, font: 'Times New Roman', name: subtitle }, { responseType: 'arraybuffer' });
	return Buffer.from(data);
};

const legacyRecognizeSong = async (buffer, filename) => {
	const form = new FormData();
	form.append('audio', buffer, filename);
	const { data } = await axios.post('https://draculazyx-xyzdrac.hf.space/api/Shazam', form, { headers: form.getHeaders(), timeout: 30000 });
	if (!data || data.STATUS !== 200 || !data.song) throw new Error('No match found for that audio/video.');
	return {
		matched: true,
		title: data.song,
		artist: data.artist,
		album: data.album,
		image: data.spotify?.album?.images?.[0]?.url || (data.apple_music?.artwork?.url ? data.apple_music.artwork.url.replace('{w}', '640').replace('{h}', '640') : undefined),
	};
};

const recognizeSong = async (buffer, filename) => {
	const url = await uploadImage(buffer, filename);
	try {
		const data = await sitePost('shazam', { url }, { timeout: 60000 });
		if (!data.matched) throw new Error('No match found for that audio/video.');
		return data;
	} catch (err) {
		if (!err.plan) throw err;
		try { return await legacyRecognizeSong(buffer, filename); } catch { throw err; }
	}
};

const getJoke = async () => {
	const data = await site('joke');
	if (!data?.joke) throw new Error('Failed to fetch a joke.');
	return data;
};

const getQuran = async (reference) => {
	const ref = /^\d{1,3}$/.test(reference) ? `${reference}:1` : reference;
	const data = await site('quran', { reference: ref });
	if (!data?.text) throw new Error('Verse not found. Use a surah number (1-114) or surah:ayah, e.g. 2:255.');
	return data;
};

const getBible = async (reference) => {
	const data = await site('bible', { reference });
	if (!data?.text) throw new Error('Bible passage not found. Try a format like "John 3:16".');
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
	const data = await sitePost('tempmail/create', {});
	if (!data?.email || !data?.token) throw new Error('Failed to create a temporary email.');
	return { email: data.email, session_id: data.token };
};

const checkTempMail = async (token) => {
	const data = await site('tempmail/inbox', { token });
	if (!data?.messages?.length) throw new Error('Inbox is empty or the mail key is invalid.');
	const top = data.messages.slice(0, 5);
	const bodies = await Promise.allSettled(top.map((msg) => site('tempmail/message', { token, id: msg.id })));
	return top.map((msg, i) => ({
		fromAddr: msg.from || 'Unknown',
		headerSubject: msg.subject || '(no subject)',
		text: String((bodies[i].status === 'fulfilled' && bodies[i].value?.text) || msg.intro || '').trim().slice(0, 700),
	}));
};

const scanImage = async (imageUrl) => {
	const data = await site('imgscan', { url: imageUrl }, { timeout: 60000 });
	if (!data?.description) throw new Error('Could not describe that image.');
	return data.description;
};

const readQrFromImage = async (imageUrl) => {
	const { data } = await axios.get('https://api.qrserver.com/v1/read-qr-code/', { params: { fileurl: imageUrl }, timeout: 15000 });
	const value = data?.[0]?.symbol?.[0]?.data;
	if (!value) throw new Error('That image does not contain a readable QR code.');
	return value;
};

const applyJailFilter = async (imageUrl) => {
	const { data } = await legacyGet('/canvas/jail', { image: imageUrl }, { responseType: 'arraybuffer' });
	return Buffer.from(data);
};

const applyCanvasEffect = async (effect, imageUrl) => {
	const { data } = await axios.get(`https://api.some-random-api.com/canvas/${effect}`, { params: { avatar: imageUrl }, timeout: 30000, responseType: 'arraybuffer' });
	return Buffer.from(data);
};

const decodeEntities = (s) => String(s).replace(/&#?\w+;/g, (e) => ({ '&amp;': '&', '&quot;': '"', '&#039;': "'", '&eacute;': 'é', '&uuml;': 'ü', '&ouml;': 'ö', '&auml;': 'ä' }[e] || e));

const getTrivia = async () => {
	const q = await site('trivia');
	if (!q?.question || !q?.correct_answer) throw new Error('Failed to fetch a trivia question.');
	const options = [...(q.incorrect_answers || []).map(decodeEntities), decodeEntities(q.correct_answer)].sort(() => Math.random() - 0.5);
	return { category: decodeEntities(q.category || 'General'), question: decodeEntities(q.question), options, answer: decodeEntities(q.correct_answer) };
};

const getHoroscope = async (sign) => {
	const { data } = await axios.get('https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily', { params: { sign, day: 'today' }, timeout: 10000 });
	if (!data?.data?.horoscope) throw new Error(`Could not fetch a horoscope for "${sign}". Use a sign like aries, taurus, gemini, etc.`);
	return { sign: data.data.sign, date: data.data.date, horoscope: data.data.horoscope };
};

module.exports = {
	ApiError,
	KEY_URL,
	site,
	siteBinary,
	sitePost,
	formatBytes,
	uploadImage,
	downloadTiktok,
	downloadFacebook,
	downloadInstagram,
	downloadTwitter,
	downloadYoutube,
	downloadYoutubeAudio,
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
