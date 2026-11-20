const Module = require('module');
const path = require('path');
const realFs = require('fs');

const DisconnectReason = { connectionClosed: 428, connectionLost: 408, connectionReplaced: 440, timedOut: 408, loggedOut: 401, badSession: 500, restartRequired: 515, multideviceMismatch: 411, forbidden: 403, unavailableService: 503 };

function createFakeSocket(id, options, registered) {
	const handlers = {};
	const calls = [];
	const record = (name, args) => { calls.push({ name, args }); };
	const sock = {
		id,
		options,
		calls,
		ended: false,
		loggedOut: false,
		listenersRemoved: false,
		user: { id: '2349000000000:1@s.whatsapp.net' },
		authState: { creds: { registered } },
		ev: {
			on(event, fn) { (handlers[event] = handlers[event] || []).push(fn); },
			removeAllListeners() { sock.listenersRemoved = true; for (const k of Object.keys(handlers)) delete handlers[k]; },
		},
		decodeJid: (jid) => String(jid).replace(/:\d+@/, '@'),
		requestPairingCode: async (phone) => { record('requestPairingCode', [phone]); return 'ABCD1234'; },
		end: () => { sock.ended = true; record('end', []); },
		logout: async () => { sock.loggedOut = true; record('logout', []); },
		sendMessage: async (jid, content) => { record('sendMessage', [jid, content]); return {}; },
		newsletterMetadata: async (type, code) => { record('newsletterMetadata', [type, code]); return { id: `${code}@newsletter`, name: `Channel ${code}` }; },
		newsletterFollow: async (jid) => { record('newsletterFollow', [jid]); },
		newsletterReactMessage: async (jid, serverId, emoji) => { record('newsletterReactMessage', [jid, serverId, emoji]); },
		updateProfileName: async (name) => { record('updateProfileName', [name]); },
		emit: async (event, payload) => { for (const fn of [...(handlers[event] || [])]) await fn(payload); },
		hasHandler: (event) => Boolean((handlers[event] || []).length),
		count: (name) => calls.filter((c) => c.name === name).length,
	};
	return sock;
}

async function loadBot({ env = {}, registered = false, random = 0 } = {}) {
	const regState = { value: registered };
	const clock = { now: 0, seq: 0, timers: [] };
	const sockets = [];
	const logs = { log: [], warn: [], error: [] };
	const removed = [];
	const messagesUpsertCalls = [];
	const watchers = [];
	const exits = [];

	const saved = {
		env: { ...process.env },
		setTimeout: global.setTimeout, clearTimeout: global.clearTimeout, setInterval: global.setInterval, clearInterval: global.clearInterval,
		now: Date.now, random: Math.random, console: { log: console.log, warn: console.warn, error: console.error },
		on: process.on, exit: process.exit, load: Module._load,
	};

	for (const key of ['PHONE_NUMBER', 'MONGODB_URI', 'SESSION_MONGO_URI', 'SESSION_PATH', 'SELF_URL', 'RENDER', 'MARK_ONLINE', 'SET_PROFILE_NAME', 'AUTO_FOLLOW_CHANNELS', 'POST_LINK_DELAY_MS', 'ES_TEAMS_API_KEY', 'PORT']) delete process.env[key];
	Object.assign(process.env, env);

	const schedule = (fn, ms, args, repeat) => {
		const id = ++clock.seq;
		clock.timers.push({ id, at: clock.now + (Number(ms) || 0), fn, args, repeat: repeat ? Number(ms) || 1 : 0 });
		return id;
	};
	global.setTimeout = (fn, ms, ...args) => schedule(fn, ms, args, false);
	global.setInterval = (fn, ms, ...args) => schedule(fn, ms, args, true);
	global.clearTimeout = global.clearInterval = (id) => { clock.timers = clock.timers.filter((t) => t.id !== id); };
	Date.now = () => 1700000000000 + clock.now;
	Math.random = () => random;
	console.log = (...a) => logs.log.push(a.map(String).join(' '));
	console.warn = (...a) => logs.warn.push(a.map(String).join(' '));
	console.error = (...a) => logs.error.push(a.map(String).join(' '));
	process.on = function (event, fn) { return event === 'unhandledRejection' || event === 'uncaughtException' ? process : saved.on.call(process, event, fn); };
	process.exit = (code) => { exits.push(code); };

	const chalkProxy = new Proxy(function () {}, { get: () => chalkProxy, apply: (_, __, args) => String(args[0]) });
	const fakeFs = new Proxy(realFs, {
		get(target, prop) {
			if (prop === 'watchFile') return (file, cb) => watchers.push({ file, cb });
			if (prop === 'unwatchFile') return () => {};
			if (prop === 'rmSync') return (p, o) => { removed.push(p); return target.rmSync(p, o); };
			return target[prop];
		},
	});
	const fakeHttp = { createServer: () => ({ on() {}, listen(port, host, cb) { if (cb) cb(); }, address: () => ({ port: 1234 }) }) };
	const stubs = {
		fs: fakeFs,
		http: fakeHttp,
		pino: Object.assign(() => ({ child: () => ({}) }), {}),
		chalk: chalkProxy,
		figlet: { textSync: () => 'ES TEAMS' },
		readline: { createInterface: () => ({ question() {}, on() {} }) },
		'file-type': {},
		'@hapi/boom': { Boom: class { constructor(err) { this.output = { statusCode: err && err.output ? err.output.statusCode : 500 }; } } },
		'node-cache': class { get() {} set() {} },
		'awesome-phonenumber': (num) => ({ isValid: () => /^\+\d{8,15}$/.test(num) }),
		axios: { get: async () => ({ data: {} }), post: async () => ({ data: {} }) },
		'@whiskeysockets/baileys': {
			default: (options) => { const s = createFakeSocket(sockets.length + 1, options, regState.value); sockets.push(s); return s; },
			useMultiFileAuthState: async () => ({ state: { creds: { registered: regState.value }, keys: {} }, saveCreds: () => {} }),
			Browsers: { windows: (b) => ['Windows', b, '10.0.22631'] },
			DisconnectReason,
			fetchLatestBaileysVersion: async () => ({ version: [2, 3000, 1], isLatest: true }),
			makeCacheableSignalKeyStore: (keys) => keys,
			jidNormalizedUser: (j) => j,
			proto: {},
			getAggregateVotesInPollMessage: () => ({}),
		},
		'./settings': () => {},
		'./lib/store': { makeInMemoryStore: () => ({ bind() {}, loadMessage: async () => null, contacts: {} }) },
		'./lib/mongoAuthState': { useMongoAuthState: async () => ({ state: { creds: { registered: regState.value }, keys: {} }, saveCreds: () => {} }), clearMongoAuthState: async (...a) => { removed.push(['mongo', ...a]); } },
		'./lib/channelBadge': { patchSendMessage: () => {} },
		'./src/database': class { async read() { return { settings: {}, users: {}, groups: {} }; } async write() {} },
		'./src/message': { GroupUpdate: async () => {}, GroupParticipantsUpdate: async () => {}, MessagesUpsert: async (...a) => { messagesUpsertCalls.push(a); }, Solving: async () => {} },
		'./lib/exif': {},
		'./lib/function': { isUrl: () => true, generateMessageTag: () => 'T', getBuffer: async () => Buffer.alloc(1), getSizeMedia: async () => 1, fetchJson: async () => ({}), await: async () => {}, sleep: async () => {} },
	};
	const hadGlobals = {};
	for (const [k, v] of Object.entries({ wagc2: 'https://whatsapp.com/channel/0029VaoYmHz9MF98STZg4w1h', ownername: 'Owner', botname: 'ES TEAMS V1', xprefix: '.', botImage: 'https://img.test/bot.jpg', owner: ['2349000000000'], db: undefined })) { hadGlobals[k] = global[k]; if (v !== undefined) global[k] = v; }
	global.channelJid = undefined;
	delete global.db;

	Module._load = function (request, parent, isMain) {
		if (request === './settings') return stubs['./settings'];
		if (Object.prototype.hasOwnProperty.call(stubs, request)) return stubs[request];
		return saved.load.apply(this, arguments);
	};

	const indexPath = path.join(__dirname, '..', '..', 'index.js');
	const cwd = process.cwd();
	process.chdir(path.join(__dirname, '..', '..'));
	delete require.cache[require.resolve(indexPath)];
	require(indexPath);
	process.chdir(cwd);

	const tick = async () => { for (let i = 0; i < 12; i++) await new Promise((resolve) => setImmediate(resolve)); };
	const advance = async (ms) => {
		const target = clock.now + ms;
		await tick();
		for (;;) {
			const due = clock.timers.filter((t) => t.at <= target).sort((a, b) => a.at - b.at || a.id - b.id)[0];
			if (!due) break;
			clock.now = due.at;
			if (due.repeat) due.at = clock.now + due.repeat; else clock.timers = clock.timers.filter((t) => t.id !== due.id);
			try {
				const result = due.fn(...(due.args || []));
				if (result && typeof result.catch === 'function') result.catch((e) => logs.error.push('timer rejected: ' + e.message));
			} catch (e) { logs.error.push('timer threw: ' + e.message); }
			await tick();
		}
		clock.now = target;
		await tick();
	};

	const api = {
		setRegistered: (v) => { regState.value = v; },
		sockets, logs, removed, watchers, exits, messagesUpsertCalls, clock, advance, tick,
		get last() { return sockets[sockets.length - 1]; },
		allLogs: () => [...logs.log, ...logs.warn, ...logs.error].join('\n'),
		restore() {
			Module._load = saved.load;
			global.setTimeout = saved.setTimeout; global.clearTimeout = saved.clearTimeout; global.setInterval = saved.setInterval; global.clearInterval = saved.clearInterval;
			Date.now = saved.now; Math.random = saved.random;
			console.log = saved.console.log; console.warn = saved.console.warn; console.error = saved.console.error;
			process.on = saved.on; process.exit = saved.exit;
			for (const k of Object.keys(process.env)) if (!(k in saved.env)) delete process.env[k];
			Object.assign(process.env, saved.env);
			for (const [k, v] of Object.entries(hadGlobals)) { if (v === undefined) delete global[k]; else global[k] = v; }
			delete global.db;
		},
	};
	await advance(0);
	return api;
}

const closeEvent = (statusCode) => ({ connection: 'close', lastDisconnect: { error: { output: { statusCode } } } });

module.exports = { loadBot, closeEvent, DisconnectReason };
