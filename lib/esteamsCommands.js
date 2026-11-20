module.exports = function createExtraCommands(h) {
	const { api, bold, sendBrandedReply, requireArg, requireQuotedImage, channelInfo } = h;

	const px = () => global.xprefix;
	const botImg = () => global.botImage;
	const str = (v) => (v === undefined || v === null ? '' : String(v).trim());
	const clip = (text, max) => {
		const t = str(text).replace(/[ \t]+/g, ' ');
		return t.length > max ? t.slice(0, max - 1).trimEnd() + '…' : t;
	};
	const num = (v) => (Number.isFinite(Number(v)) && str(v) !== '' ? Number(v).toLocaleString('en-US') : str(v));
	const date = (v) => (str(v).length >= 10 ? str(v).slice(0, 10) : str(v));
	const duration = (seconds) => {
		const total = Math.round(Number(seconds));
		if (!Number.isFinite(total) || total <= 0) return '';
		const hh = Math.floor(total / 3600), mm = Math.floor((total % 3600) / 60), ss = total % 60;
		return hh ? `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}` : `${mm}:${String(ss).padStart(2, '0')}`;
	};
	const card = (title, rows = [], text = '') => [
		bold(`ES TEAMS V1 ${title}`),
		'',
		...rows.filter((row) => str(row[1])).map(([label, value]) => `${bold(label + ':')} ${str(value)}`),
		...(str(text) ? ['', str(text)] : []),
	].join('\n');
	const buttons = (...pairs) => pairs.filter(([, url]) => str(url)).map(([displayText, url]) => ({ displayText, url: str(url) }));
	const send = (sock, m, body, image, extraButtons = []) =>
		sendBrandedReply(sock, m, { image: image || botImg(), body, extraButtons });
	const needHttp = (value, what) => {
		if (!/^https?:\/\//i.test(value)) throw new Error(`Please provide a valid ${what}.`);
		return value;
	};

	const pickFirst = (obj, keys) => {
		if (!obj || typeof obj !== 'object') return '';
		for (const key of keys) {
			const value = obj[key];
			if ((typeof value === 'string' && value.trim()) || typeof value === 'number') return String(value).trim();
		}
		return '';
	};
	const deepPick = (node, keys) => {
		let level = [node];
		for (let depth = 0; depth < 4 && level.length; depth++) {
			const next = [];
			for (const item of level) {
				if (!item || typeof item !== 'object') continue;
				if (Array.isArray(item)) { item.slice(0, 10).forEach((c) => next.push(c)); continue; }
				const hit = pickFirst(item, keys);
				if (hit) return hit;
				Object.values(item).forEach((c) => { if (c && typeof c === 'object') next.push(c); });
			}
			level = next;
		}
		return '';
	};
	const findArray = (node, depth = 0) => {
		if (Array.isArray(node)) return node;
		if (!node || typeof node !== 'object' || depth > 3) return [];
		for (const key of ['results', 'items', 'data', 'videos', 'list', 'matches', 'forecast', 'days', 'questions', 'repos', 'result']) {
			if (Array.isArray(node[key])) return node[key];
		}
		for (const value of Object.values(node)) {
			const found = findArray(value, depth + 1);
			if (found.length) return found;
		}
		return [];
	};
	const deepUrl = (node, wantRe, allowImages = false) => {
		const found = [];
		const walk = (value, key, depth) => {
			if (depth > 5 || value === null || value === undefined) return;
			if (typeof value === 'string') { if (/^https?:\/\//i.test(value)) found.push([key, value]); return; }
			if (Array.isArray(value)) { value.slice(0, 20).forEach((c) => walk(c, key, depth + 1)); return; }
			if (typeof value === 'object') Object.entries(value).forEach(([k, c]) => walk(c, k, depth + 1));
		};
		walk(node, '', 0);
		const usable = allowImages ? found : found.filter(([k, u]) => !/thumb|cover|poster|avatar|image|icon|logo|preview/i.test(k) && !/\.(jpe?g|png|webp|gif)(\?|$)/i.test(u));
		const hit = usable.find(([k, u]) => wantRe.test(k) || wantRe.test(u));
		return (hit || usable[0] || [])[1] || '';
	};
	const flat = (node, max = 10) => {
		const rows = [];
		const walk = (value, prefix, depth) => {
			if (rows.length >= max || value === null || value === undefined) return;
			if (Array.isArray(value)) {
				if (value.length && value.every((e) => typeof e !== 'object')) rows.push([prefix.replace(/[_-]+/g, ' '), clip(value.slice(0, 6).join(', '), 120)]);
				return;
			}
			if (typeof value === 'object') {
				if (depth > 1) return;
				Object.entries(value).forEach(([k, c]) => walk(c, prefix ? `${prefix} ${k}` : k, depth + 1));
				return;
			}
			if (/^https?:\/\//i.test(String(value))) return;
			rows.push([prefix.replace(/[_-]+/g, ' '), clip(value, 160)]);
		};
		walk(node, '', 0);
		return rows.slice(0, max);
	};
	const anyLink = (item) => {
		const direct = pickFirst(item, ['url', 'link', 'href', 'html_url', 'videoUrl', 'video_url', 'share_url', 'webpage_url', 'pin_url']);
		return /^https?:\/\//i.test(direct) ? direct : '';
	};
	const imageLink = (item) => {
		const direct = pickFirst(item, ['image', 'imageUrl', 'image_url', 'original', 'url', 'src', 'link', 'thumbnail']);
		return /^https?:\/\//i.test(direct) ? direct : '';
	};
	const youtubeLink = (item) => {
		const direct = anyLink(item);
		if (direct) return direct;
		const id = pickFirst(item, ['videoId', 'video_id', 'id', 'vid']);
		return /^[\w-]{11}$/.test(id) ? `https://www.youtube.com/watch?v=${id}` : '';
	};

	const resultList = (data, spec, max = 5) => {
		const items = findArray(data)
			.map((item) => (typeof item === 'string' ? { url: item, title: item } : item))
			.filter((item) => item && typeof item === 'object');
		const lines = items.slice(0, max).map((item, index) => {
			const parts = [`${bold(`${index + 1}.`)} ${clip(pickFirst(item, spec.title) || 'Untitled', 90)}`];
			const meta = (spec.meta || []).map(([icon, keys]) => (pickFirst(item, keys) ? `${icon} ${clip(pickFirst(item, keys), 40)}` : '')).filter(Boolean);
			if (meta.length) parts.push(meta.join('  '));
			const description = spec.desc ? pickFirst(item, spec.desc) : '';
			if (description) parts.push(clip(description, 110));
			const url = spec.link(item);
			if (url) parts.push(url);
			return parts.join('\n');
		});
		if (lines.length) return { items, text: lines.join('\n\n') };
		const rows = flat(data, 8).map(([k, v]) => `${bold(k + ':')} ${v}`);
		return { items, text: rows.join('\n') || 'No results found.' };
	};

	const searchCommand = (endpoint, param, usage, title, spec, withImage = false) => async (sock, m) => {
		const query = requireArg(m.args, `${px()}${usage}`);
		const data = await api.site(endpoint, { [param]: query }, { timeout: 45000 });
		const { items, text } = resultList(data.results !== undefined ? data.results : data, spec);
		const first = withImage && items.length ? imageLink(items[0]) : '';
		await send(sock, m, `${card(title, [['Query', clip(query, 80)], ['Results', String(items.length)]])}\n\n${text}`, first || undefined);
	};

	const sendAudioFromUrl = (sock, m, url) =>
		sock.sendMessage(m.chat, { audio: { url }, mimetype: 'audio/mpeg', ...channelInfo() }, { quoted: m });

	const uploadQuotedImage = async (m, usage) => {
		const quoted = requireQuotedImage(m, usage);
		const buffer = await quoted.download();
		const url = await api.uploadImage(buffer, 'image.jpg');
		if (!url.startsWith('https://')) throw new Error('Failed to upload the image.');
		return url;
	};

	const handlers = {
		async ytmp3(sock, m) {
			const link = requireArg(m.args, `${px()}ytmp3 <youtube link>`);
			needHttp(link, 'YouTube link');
			const d = await api.downloadYoutubeAudio(link);
			await send(sock, m, card('YT MP3 DOWNLOADER', [['Title', d.title], ['Duration', duration(d.duration)]]), d.thumbnail);
			await sendAudioFromUrl(sock, m, d.download_url);
		},
		async soundcloud(sock, m) {
			const link = needHttp(requireArg(m.args, `${px()}soundcloud <track link>`), 'SoundCloud link');
			const d = await api.site('soundcloud', { url: link }, { timeout: 90000 });
			if (!d.download_url) throw new Error('No downloadable audio found for that link.');
			await send(sock, m, card('SOUNDCLOUD DOWNLOADER', [['Title', d.title], ['Artist', d.artist]]), d.thumbnail);
			await sendAudioFromUrl(sock, m, d.download_url);
		},
		async pinterest(sock, m) {
			const link = needHttp(requireArg(m.args, `${px()}pinterest <pin link>`), 'Pinterest link');
			const d = await api.site('pinterest', { url: link }, { timeout: 60000 });
			if (!d.download_url) throw new Error('No downloadable media found on that pin.');
			const body = card('PINTEREST DOWNLOADER', [['Title', d.title], ['Type', d.type]]);
			await sendBrandedReply(sock, m, d.type === 'video' ? { video: d.download_url, body } : { image: d.download_url, body });
		},
		async capcut(sock, m) {
			const link = needHttp(requireArg(m.args, `${px()}capcut <template link>`), 'CapCut link');
			const data = await api.site('capcut', { url: link }, { timeout: 60000 });
			const video = deepUrl(data, /video|download|nowm|\.mp4/i);
			if (!video) throw new Error('No downloadable video was found for that template.');
			await sendBrandedReply(sock, m, { video, body: card('CAPCUT DOWNLOADER', [['Title', deepPick(data, ['title', 'name', 'desc', 'description'])]]) });
		},

		async gitstalk(sock, m) {
			const user = requireArg(m.args, `${px()}gitstalk <github username>`);
			const d = await api.site('githubuser', { username: user });
			await send(sock, m, card('GITHUB STALKER', [
				['Username', d.login], ['Name', d.name], ['Bio', d.bio], ['Company', d.company], ['Location', d.location],
				['Blog', d.blog], ['Repos', num(d.public_repos)], ['Followers', num(d.followers)], ['Following', num(d.following)], ['Joined', date(d.created_at)],
			]), d.avatar, buttons(['Open Profile', `https://github.com/${d.login}`]));
		},
		async githubrepo(sock, m) {
			const repo = requireArg(m.args, `${px()}githubrepo <owner/repo>`);
			if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) throw new Error('Use the format owner/repo, for example facebook/react.');
			const d = await api.site('githubrepo', { repo });
			await send(sock, m, card('GITHUB REPOSITORY', [
				['Repo', d.fullName], ['Description', clip(d.description, 200)], ['Stars', num(d.stars)], ['Forks', num(d.forks)],
				['Open Issues', num(d.openIssues)], ['Language', d.language], ['Created', date(d.createdAt)],
			]), undefined, buttons(['Open Repository', d.url]));
		},
		githubsearch: searchCommand('githubsearch', 'query', 'githubsearch <search words>', 'GITHUB SEARCH', {
			title: ['full_name', 'fullName', 'name', 'repo'],
			meta: [['⭐', ['stargazers_count', 'stars', 'stargazers']], ['💻', ['language']]],
			desc: ['description', 'desc'],
			link: anyLink,
		}),
		async ytchannel(sock, m) {
			const channel = requireArg(m.args, `${px()}ytchannel <@handle or link>`);
			const data = await api.site('ytchannel', { channel }, { timeout: 45000 });
			const info = data.result !== undefined ? data.result : data;
			const rows = [
				['Channel', deepPick(info, ['title', 'name', 'channelName', 'channel_title'])],
				['Subscribers', deepPick(info, ['subscribers', 'subscriberCount', 'subscriber_count', 'subs'])],
				['Views', deepPick(info, ['views', 'viewCount', 'view_count', 'totalViews'])],
				['Videos', deepPick(info, ['videos', 'videoCount', 'video_count'])],
				['Joined', deepPick(info, ['joined', 'joinedDate', 'publishedAt', 'created'])],
				['Country', deepPick(info, ['country'])],
			];
			const about = deepPick(info, ['description', 'about', 'bio']);
			const body = card('YOUTUBE CHANNEL STALKER', rows.some((r) => str(r[1])) ? rows : flat(info, 10), about ? clip(about, 300) : '');
			await send(sock, m, body, deepUrl(info, /avatar|profile|logo|thumb|image/i, true) || undefined, buttons(['Open Channel', deepUrl(info, /channel|url|link|youtube/i)]));
		},
		async ytinfo(sock, m) {
			const link = needHttp(requireArg(m.args, `${px()}ytinfo <youtube link>`), 'YouTube link');
			const d = await api.site('youtube', { url: link });
			await send(sock, m, card('YOUTUBE INFO', [['Title', d.title], ['Channel', d.author]]), d.thumbnail, buttons(['Open Channel', d.authorUrl]));
		},
		async wiki(sock, m) {
			const topic = requireArg(m.args, `${px()}wiki <topic>`);
			const d = await api.site('wikipedia', { title: topic });
			await send(sock, m, card('WIKIPEDIA', [['Title', d.title]], clip(d.extract, 900)), d.thumbnail, buttons(['Read More', d.url]));
		},
		async define(sock, m) {
			const word = requireArg(m.args, `${px()}define <word>`);
			const d = await api.site('dictionary', { word });
			const meanings = (d.meanings || []).slice(0, 3).map((meaning) =>
				`${bold(str(meaning.partOfSpeech) || 'meaning')}\n${(meaning.definitions || []).slice(0, 2).map((def, i) => `${i + 1}. ${clip(def, 180)}`).join('\n')}`);
			await send(sock, m, card('DICTIONARY', [['Word', d.word], ['Phonetic', d.phonetic]], meanings.join('\n\n')));
		},
		async anime(sock, m) {
			const title = requireArg(m.args, `${px()}anime <title>`);
			const d = await api.site('anime', { query: title });
			await send(sock, m, card('ANIME INFO', [
				['Title', d.title], ['English', d.titleEnglish], ['Type', d.type], ['Episodes', num(d.episodes)], ['Status', d.status],
				['Score', d.score], ['Year', d.year], ['Genres', (d.genres || []).join(', ')],
			], clip(d.synopsis, 420)), d.image, buttons(['Open Page', d.url]));
		},
		async movie(sock, m) {
			const title = requireArg(m.args, `${px()}movie <title>`);
			const d = await api.site('movie', { query: title });
			await send(sock, m, card('MOVIE INFO', [
				['Title', d.title], ['Rating', d.rating !== undefined && d.rating !== null ? `${Number(d.rating).toFixed(1)}/10` : ''],
				['Release', date(d.releaseDate)], ['Runtime', d.runtimeMinutes ? `${d.runtimeMinutes} min` : ''], ['Genres', (d.genres || []).join(', ')],
			], clip(d.overview, 420)), d.poster || d.backdrop);
		},
		async npm(sock, m) {
			const name = requireArg(m.args, `${px()}npm <package name>`);
			const d = await api.site('npm', { package: name });
			await send(sock, m, card('NPM PACKAGE', [
				['Package', d.name], ['Version', d.version], ['Description', clip(d.description, 200)], ['License', d.license], ['Author', d.author], ['Homepage', d.homepage],
			]), undefined, buttons(['Open on npm', `https://www.npmjs.com/package/${d.name}`]));
		},
		async country(sock, m) {
			const name = requireArg(m.args, `${px()}country <name>`);
			const d = await api.site('country', { name });
			await send(sock, m, card('COUNTRY INFO', [
				['Name', d.name], ['Capital', d.capital], ['Region', d.region], ['Subregion', d.subregion],
				['Population', num(d.population)], ['Currencies', (d.currencies || []).join(', ')],
			]), d.flag);
		},
		async iplookup(sock, m) {
			const ip = requireArg(m.args, `${px()}iplookup <ip address>`);
			const d = await api.site('iplookup', { ip });
			await send(sock, m, card('IP LOOKUP', [
				['IP', d.ip], ['City', d.city], ['Region', d.region], ['Country', d.country], ['Timezone', d.timezone], ['Organization', d.org],
				['Coordinates', d.latitude !== undefined && d.longitude !== undefined ? `${d.latitude}, ${d.longitude}` : ''],
			]));
		},
		async sportsteam(sock, m) {
			const name = requireArg(m.args, `${px()}sportsteam <team name>`);
			const d = await api.site('sportsteam', { name });
			await send(sock, m, card('SPORTS TEAM', [
				['Team', d.name], ['Sport', d.sport], ['League', d.league], ['Country', d.country], ['Stadium', d.stadium], ['Founded', d.founded], ['Website', d.website],
			], clip(d.description, 350)), d.badge);
		},
		async minecraft(sock, m) {
			const address = requireArg(m.args, `${px()}minecraft <server address>`);
			const d = await api.site('minecraft', { address });
			await send(sock, m, card('MINECRAFT SERVER', [
				['Server', d.hostname || address], ['Status', d.online ? 'Online' : 'Offline'], ['Version', d.version],
				['Players', d.online ? `${num(d.playersOnline)}/${num(d.playersMax)}` : ''], ['MOTD', clip(str(d.motd).replace(/§./g, ''), 160)],
			]));
		},
		async holidays(sock, m) {
			const [country, year] = m.args;
			if (!country) throw new Error(`Invalid input.\n\nUsage: ${px()}holidays <country code> [year]`);
			const d = await api.site('holidays', { country: country.toUpperCase(), year: year || new Date().getFullYear() });
			const list = (d.holidays || []).slice(0, 15).map((hd) => `${bold(hd.date)} ${hd.name}`);
			if (!list.length) throw new Error('No holidays found for that country and year.');
			await send(sock, m, card('PUBLIC HOLIDAYS', [['Country', country.toUpperCase()], ['Year', year || new Date().getFullYear()]], list.join('\n')));
		},
		async livescore(sock, m) {
			const data = await api.site('livescore', m.args[0] ? { edition: m.args[0] } : {}, { timeout: 45000 });
			const { text } = resultList(data.matches !== undefined ? data.matches : data, {
				title: ['competition', 'league', 'name', 'title', 'homeTeam'],
				meta: [['⚽', ['score', 'status', 'time']]],
				link: anyLink,
			}, 8);
			await send(sock, m, `${card('LIVE SCORES')}\n\n${text}`);
		},
		async forecast(sock, m) {
			const city = requireArg(m.args, `${px()}forecast <city>`);
			const data = await api.site('forecast', { city }, { timeout: 45000 });
			const days = findArray(data.forecast !== undefined ? data.forecast : data).filter((day) => day && typeof day === 'object');
			const lines = days.slice(0, 7).map((day) => {
				const label = pickFirst(day, ['date', 'day', 'dayName', 'Date', 'dayOfWeek']) || 'Day';
				const detail = Object.entries(day)
					.filter(([k, v]) => k !== 'date' && k !== 'day' && (typeof v === 'string' || typeof v === 'number') && !/^https?:\/\//i.test(String(v)))
					.slice(0, 4).map(([k, v]) => `${k.replace(/[_-]+/g, ' ')} ${v}`).join(' • ');
				return `${bold(label)}\n${clip(detail, 110)}`;
			});
			const text = lines.length ? lines.join('\n\n') : flat(data.forecast !== undefined ? data.forecast : data, 8).map(([k, v]) => `${bold(k + ':')} ${v}`).join('\n') || 'No forecast available.';
			await send(sock, m, `${card('10 DAY FORECAST', [['City', data.city || city]])}\n\n${text}`);
		},
		async crypto(sock, m) {
			const coin = requireArg(m.args, `${px()}crypto <coin name>`);
			const d = await api.site('crypto', { coin });
			await send(sock, m, card('CRYPTO PRICE', [
				['Coin', `${d.name} (${d.symbol})`], ['Price (USD)', d.priceUsd !== undefined ? `$${num(d.priceUsd)}` : ''],
				['Price (NGN)', d.priceNgn !== undefined ? `₦${num(d.priceNgn)}` : ''],
				['24h Change', d.change24hPercent !== undefined ? `${Number(d.change24hPercent).toFixed(2)}%` : ''],
			]), d.thumbnail);
		},
		async currency(sock, m) {
			const parts = m.args.filter(Boolean);
			const amount = /^[\d.,]+$/.test(parts[0] || '') ? parts.shift().replace(/,/g, '') : '1';
			const [from, to] = parts;
			if (!from || !to) throw new Error(`Invalid input.\n\nUsage: ${px()}currency <amount> <from> <to>\nExample: ${px()}currency 100 usd ngn`);
			const d = await api.site('currency', { from, to, amount });
			await send(sock, m, card('CURRENCY CONVERTER', [
				['From', `${num(d.amount)} ${d.from}`], ['To', `${num(d.result)} ${d.to}`], ['Date', d.date],
			]));
		},

		websearch: searchCommand('websearch', 'query', 'websearch <search words>', 'WEB SEARCH', {
			title: ['title', 'name', 'headline'],
			desc: ['snippet', 'description', 'desc', 'text', 'summary'],
			link: anyLink,
		}),
		imagesearch: searchCommand('imagesearch', 'query', 'imagesearch <search words>', 'IMAGE SEARCH', {
			title: ['title', 'name', 'alt', 'description'],
			link: imageLink,
		}, true),
		ytsearch: searchCommand('ytsearch', 'query', 'ytsearch <search words>', 'YOUTUBE SEARCH', {
			title: ['title', 'name'],
			meta: [['👤', ['channel', 'author', 'uploader', 'channelTitle']], ['⏱', ['duration', 'timestamp', 'length']]],
			link: youtubeLink,
		}),
		tiktoksearch: searchCommand('tiktoksearch', 'query', 'tiktoksearch <search words>', 'TIKTOK SEARCH', {
			title: ['title', 'desc', 'description', 'caption'],
			meta: [['👤', ['author', 'nickname', 'username', 'uniqueId']], ['▶️', ['plays', 'play_count', 'views']]],
			link: anyLink,
		}),
		pinterestsearch: searchCommand('pinterestsearch', 'query', 'pinterestsearch <search words>', 'PINTEREST SEARCH', {
			title: ['title', 'grid_title', 'description', 'name'],
			meta: [['👤', ['pinner', 'author', 'username', 'owner']]],
			link: (item) => anyLink(item) || imageLink(item),
		}, true),
		async linkpreview(sock, m) {
			const link = needHttp(requireArg(m.args, `${px()}linkpreview <link>`), 'link');
			const d = await api.site('linkpreview', { url: link });
			await send(sock, m, card('LINK PREVIEW', [['Title', d.title], ['Site', d.siteName]], clip(d.description, 300)), d.image, buttons(['Open Link', d.url || link]));
		},
		async pastquestions(sock, m) {
			const [exam, subject, year, pageToken] = m.args.map((a) => a.toLowerCase());
			const params = {};
			if (exam) params.exam = exam;
			if (subject) params.subject = subject;
			if (year) params.year = year;
			const data = await api.site('pastquestions', params, { timeout: 45000 });
			const items = findArray(data.result).filter((item) => item !== null && item !== undefined);
			const base = `${px()}pastquestions${exam ? ` ${exam}` : ''}${subject ? ` ${subject}` : ''}${year ? ` ${year}` : ''}`;
			if (data.step !== 'questions') {
				const names = items.map((item) => (typeof item === 'object' ? pickFirst(item, ['slug', 'id', 'value', 'name', 'subject', 'year']) : String(item))).filter(Boolean);
				const next = data.step === 'exams' ? `${px()}pastquestions <exam>` : data.step === 'subjects' ? `${base} <subject>` : `${base} <year>`;
				const listing = names.length ? names.map((n) => `▫️ ${n}`).join('\n') : flat(data.result, 10).map(([k, v]) => `${bold(k + ':')} ${v}`).join('\n') || 'Nothing found.';
				await send(sock, m, `${card('PAST QUESTIONS', [['Step', data.step || 'list']])}\n\n${listing}\n\n${bold('Next:')} ${next}`);
				return;
			}
			const perPage = 5;
			const page = Math.max(1, parseInt(pageToken, 10) || 1);
			const totalPages = Math.max(1, Math.ceil(items.length / perPage));
			const slice = items.slice((page - 1) * perPage, page * perPage);
			if (!slice.length) throw new Error('No questions found for that page.');
			const letters = ['A', 'B', 'C', 'D', 'E'];
			const blocks = slice.map((item, index) => {
				const number = (page - 1) * perPage + index + 1;
				const question = typeof item === 'object' ? pickFirst(item, ['question', 'text', 'body', 'title']) : String(item);
				let options = [];
				if (item && Array.isArray(item.options)) {
					options = item.options.map((option, i) => (typeof option === 'object' ? `${pickFirst(option, ['label', 'key', 'id']) || letters[i]}. ${pickFirst(option, ['text', 'value', 'option'])}` : `${letters[i]}. ${option}`));
				} else if (item && item.options && typeof item.options === 'object') {
					options = Object.entries(item.options).map(([k, v]) => `${String(k).toUpperCase()}. ${v}`);
				}
				const answer = typeof item === 'object' ? pickFirst(item, ['answer', 'correct', 'correctAnswer', 'correct_answer', 'right']) : '';
				return `Q${number}. ${question}${options.length ? `\n${options.join('\n')}` : ''}${answer ? `\n✅ Answer: ${answer}` : ''}`;
			});
			const head = card('PAST QUESTIONS', [['Exam', data.exam || exam], ['Subject', data.subject || subject], ['Year', data.year || year], ['Page', `${page}/${totalPages}`]]);
			await send(sock, m, `${head}\n\n${blocks.join('\n\n')}${page < totalPages ? `\n\n${bold('Next page:')} ${base} ${page + 1}` : ''}`);
		},
		async wacheck(sock, m) {
			const number = requireArg(m.args, `${px()}wacheck <number with country code>`).replace(/\D/g, '');
			if (number.length < 7) throw new Error('Please provide a valid phone number with country code.');
			const d = await api.site('wa-check', { number });
			await send(sock, m, card('WHATSAPP CHECK', [['Number', number], ['On WhatsApp', d.exists ? 'Yes' : 'No'], ['JID', d.exists ? d.jid : '']]));
		},

		async translate(sock, m) {
			const [to, ...rest] = m.args;
			const text = rest.join(' ').trim() || str(m.quoted && (m.quoted.text || m.quoted.body));
			if (!to || !text) throw new Error(`Invalid input.\n\nUsage: ${px()}translate <language code> <text>\nExample: ${px()}translate es Good morning`);
			const d = await api.site('translate', { text, to });
			await send(sock, m, card('TRANSLATOR', [['From', d.from], ['To', d.to], ['Original', clip(d.input, 300)]], `${bold('Translation:')} ${clip(d.result, 900)}`));
		},
		async ocr(sock, m) {
			const url = await uploadQuotedImage(m, `Reply to an image with ${px()}ocr`);
			const d = await api.site('ocr', { url }, { timeout: 60000 });
			if (!str(d.text)) throw new Error('No readable text was found in that image.');
			await send(sock, m, card('IMAGE TO TEXT', [['Confidence', d.confidence !== undefined ? `${d.confidence}%` : '']], clip(d.text, 1500)));
		},
		async password(sock, m) {
			const length = Math.min(64, Math.max(4, parseInt(m.args[0], 10) || 16));
			const symbols = /^(symbols|yes|true)$/i.test(m.args[1] || '') ? 'true' : 'false';
			const d = await api.site('password', { length, symbols });
			await send(sock, m, card('PASSWORD GENERATOR', [['Length', d.length], ['Password', d.password]]));
		},
		async hash(sock, m) {
			const algorithms = ['md5', 'sha1', 'sha256', 'sha512'];
			const args = [...m.args];
			const algorithm = algorithms.includes((args[0] || '').toLowerCase()) ? args.shift().toLowerCase() : 'sha256';
			const text = args.join(' ').trim();
			if (!text) throw new Error(`Invalid input.\n\nUsage: ${px()}hash [md5|sha1|sha256|sha512] <text>`);
			const d = await api.sitePost('hash', { text, mode: 'hash', algorithm });
			await send(sock, m, card('HASH GENERATOR', [['Algorithm', d.algorithm], ['Input', clip(d.input, 200)], ['Result', d.result]]));
		},
		async base64(sock, m) {
			const [mode, ...rest] = m.args;
			const text = rest.join(' ').trim();
			if (!/^(encode|decode)$/i.test(mode || '') || !text) throw new Error(`Invalid input.\n\nUsage: ${px()}base64 <encode|decode> <text>`);
			const d = await api.sitePost('hash', { text, mode: `base64${mode.toLowerCase()}` });
			await send(sock, m, card('BASE64', [['Mode', mode.toLowerCase()], ['Result', clip(d.result, 1500)]]));
		},
		async tts(sock, m) {
			const input = requireArg(m.args, `${px()}tts <text> | <voice>`);
			const [text, voice] = input.split(/\s+\|\s+/);
			if (text.length > 1000) throw new Error('Text is too long (1000 character limit).');
			const d = await api.site('tts', { text, voice }, { timeout: 90000 });
			if (!d.download_url) throw new Error('No audio was returned for that text.');
			await send(sock, m, card('TEXT TO SPEECH', [['Voice', d.voice || voice || 'default']]));
			await sendAudioFromUrl(sock, m, d.download_url);
		},
		async summarize(sock, m) {
			const text = m.args.join(' ').trim() || str(m.quoted && (m.quoted.text || m.quoted.body));
			if (!text) throw new Error(`Invalid input.\n\nUsage: ${px()}summarize <text>\nOr reply to a message with ${px()}summarize`);
			const d = await api.sitePost('summarize', { text: text.slice(0, 6000) }, { timeout: 60000 });
			await send(sock, m, card('SUMMARIZER', [], clip(d.summary, 1500)));
		},
		async chart(sock, m) {
			const types = ['bar', 'line', 'pie', 'doughnut', 'radar', 'polarArea'];
			const [type, series, ...titleWords] = m.args;
			const matched = types.find((t) => t.toLowerCase() === String(type || '').toLowerCase());
			const pairs = String(series || '').split(',').map((p) => p.split(':')).filter((p) => p.length === 2 && p[0].trim() && Number.isFinite(Number(p[1])));
			if (!matched || !pairs.length) throw new Error(`Invalid input.\n\nUsage: ${px()}chart <${types.join('|')}> <label:value,label:value> [title]\nExample: ${px()}chart bar Mon:10,Tue:20,Wed:15 Visitors`);
			const d = await api.sitePost('chart', { type: matched, labels: pairs.map((p) => p[0].trim()), data: pairs.map((p) => Number(p[1])), label: titleWords.join(' ') || undefined });
			if (!d.chart_url) throw new Error('Could not build that chart.');
			await sendBrandedReply(sock, m, { image: d.chart_url, body: card('CHART GENERATOR', [['Type', matched], ['Points', String(pairs.length)]]) });
		},
		async ytsummary(sock, m) {
			const link = needHttp(requireArg(m.args, `${px()}ytsummary <youtube link>`), 'YouTube link');
			const data = await api.site('ytsummary', { url: link }, { timeout: 90000 });
			const result = data.result;
			const summary = typeof result === 'string' ? result : deepPick(result, ['summary', 'text', 'content', 'answer', 'description']);
			const title = data.title || deepPick(result, ['title', 'videoTitle', 'name']);
			const body = summary ? clip(summary, 1800) : flat(result, 8).map(([k, v]) => `${bold(k + ':')} ${v}`).join('\n') || 'No summary was returned for this video.';
			await send(sock, m, card('YOUTUBE SUMMARY', [['Title', clip(title, 100)]], body));
		},

		async caption(sock, m) {
			const text = m.args.join(' ').trim();
			if (!text) throw new Error(`Invalid input.\n\nReply to an image with ${px()}caption <text>`);
			const url = await uploadQuotedImage(m, `Reply to an image with ${px()}caption <text>`);
			const image = await api.siteBinary('caption', { image: url, text }, { timeout: 60000 });
			await sendBrandedReply(sock, m, { image, body: card('CAPTION MEME', [['Caption', clip(text, 120)]]) });
		},
		async videogen(sock, m) {
			const prompt = requireArg(m.args, `${px()}videogen <prompt>`);
			if (prompt.length > 500) throw new Error('Prompt is too long (500 character limit).');
			const d = await api.sitePost('videogen', { prompt }, { timeout: 240000 });
			if (!d.video_url) throw new Error('No video was generated.');
			await sendBrandedReply(sock, m, { video: d.video_url, body: card('AI VIDEO GENERATOR', [['Prompt', clip(prompt, 160)]]) });
		},

		async quote(sock, m) {
			const d = await api.site('quote');
			await send(sock, m, card('QUOTE', [], `"${clip(d.quote, 500)}"\n${bold('Author:')} ${d.author || 'Unknown'}`));
		},
		async advice(sock, m) {
			const d = await api.site('advice');
			await send(sock, m, card('ADVICE', [], clip(d.advice, 500)));
		},
		async catfact(sock, m) {
			const d = await api.site('catfact');
			await send(sock, m, card('CAT FACT', [], clip(d.fact, 500)));
		},
		async dog(sock, m) {
			const d = await api.site('dogimage');
			if (!d.imageUrl) throw new Error('No dog picture came back. Try again.');
			await sendBrandedReply(sock, m, { image: d.imageUrl, body: card('DOG PICTURE') });
		},
	};

	const menu = [
		['DOWNLOAD MENU', ['ytmp3 <link>', 'soundcloud <track link>', 'pinterest <pin link>', 'capcut <template link>']],
		['SCRAPE / STALK MENU', [
			'gitstalk <username>', 'githubrepo <owner/repo>', 'githubsearch <query>', 'ytchannel <@handle>', 'ytinfo <link>', 'wiki <topic>',
			'define <word>', 'anime <title>', 'movie <title>', 'npm <package>', 'country <name>', 'iplookup <ip>', 'sportsteam <team>',
			'minecraft <server>', 'holidays <country> [year]', 'livescore', 'forecast <city>', 'crypto <coin>', 'currency <amount> <from> <to>',
			'websearch <query>', 'imagesearch <query>', 'ytsearch <query>', 'tiktoksearch <query>', 'pinterestsearch <query>', 'linkpreview <link>',
			'pastquestions [exam] [subject] [year]', 'wacheck <number>',
		]],
		['TOOLS MENU', ['translate <code> <text>', 'ocr (reply to image)', 'password [length]', 'hash [algo] <text>', 'base64 <encode|decode> <text>', 'tts <text>', 'summarize <text>', 'chart <type> <data>', 'ytsummary <link>']],
		['CREATIVE MENU', ['caption <text> (reply to image)']],
		['AI MENU', ['videogen <prompt>']],
		['FUN MENU', ['quote', 'advice', 'catfact', 'dog']],
	];

	const addToMenu = (sections) => {
		for (const [title, commands] of menu) {
			const existing = sections.find((s) => s.title === title);
			if (existing) existing.commands.push(...commands);
			else sections.push({ title, commands: [...commands] });
		}
		return sections;
	};

	return { handlers, menu, addToMenu };
};
