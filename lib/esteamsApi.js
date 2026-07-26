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

module.exports = {
	uploadToCatbox,
	downloadTiktok,
	downloadFacebook,
	downloadInstagram,
	downloadTwitter,
	downloadYoutube,
	downloadSong,
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
};
