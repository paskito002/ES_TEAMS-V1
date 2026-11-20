const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { loadBot, closeEvent, DisconnectReason } = require('./helpers/fakeBaileysHarness');

const PHONE = '2349037524605';
const bots = [];
const boot = async (options) => { const bot = await loadBot(options); bots.push(bot); return bot; };
test.afterEach(() => { while (bots.length) bots.pop().restore(); });

const SEC = 1000;
const MIN = 60 * SEC;

test('VPS panel settings.js phone number enables pairing-code login without PHONE_NUMBER env', async () => {
	const bot = await boot({ settings: { user: { phonenumber: PHONE } } });
	await bot.last.emit('connection.update', { qr: 'panel-ref' });
	assert.deepEqual(bot.last.calls.find((c) => c.name === 'requestPairingCode').args, [PHONE]);
});

test('the pairing code is requested only when WhatsApp signals it is ready, never on a blind timer', async () => {
	const bot = await boot({ env: { PHONE_NUMBER: PHONE }, settings: { user: { phonenumber: '2348012345678' } } });
	assert.equal(bot.sockets.length, 1);
	await bot.advance(30 * SEC);
	assert.equal(bot.last.count('requestPairingCode'), 0, 'must wait for the qr signal');
	await bot.last.emit('connection.update', { qr: 'ref' });
	assert.equal(bot.last.count('requestPairingCode'), 1);
	assert.deepEqual(bot.last.calls.find((c) => c.name === 'requestPairingCode').args, [PHONE]);
	await bot.last.emit('connection.update', { qr: 'ref2' });
	assert.equal(bot.last.count('requestPairingCode'), 1, 'one code per socket');
});

test('pairing requests are rate limited across reconnects and stop after three', async () => {
	const bot = await boot({ env: { PHONE_NUMBER: PHONE } });
	const requested = () => bot.sockets.reduce((n, s) => n + s.count('requestPairingCode'), 0);
	await bot.last.emit('connection.update', { qr: '1' });
	assert.equal(requested(), 1);

	await bot.last.emit('connection.update', closeEvent(DisconnectReason.connectionClosed));
	await bot.advance(10 * SEC);
	assert.equal(bot.sockets.length, 2);
	await bot.last.emit('connection.update', { qr: '2' });
	assert.equal(requested(), 1, 'a second code within 90s is refused');

	await bot.last.emit('connection.update', closeEvent(DisconnectReason.connectionClosed));
	await bot.advance(2 * MIN);
	assert.equal(bot.sockets.length, 3);
	await bot.last.emit('connection.update', { qr: '3' });
	assert.equal(requested(), 2, 'allowed again once 90s have passed');

	for (let i = 0; i < 3; i++) {
		await bot.last.emit('connection.update', closeEvent(DisconnectReason.connectionClosed));
		await bot.advance(6 * MIN);
		await bot.last.emit('connection.update', { qr: 'again' });
	}
	assert.equal(requested(), 3, 'never more than three codes in one run');
	assert.match(bot.allLogs(), /Pairing-code limit reached/);
});

test('reconnects back off instead of hammering WhatsApp, and old sockets are retired', async () => {
	const bot = await boot({ registered: true });
	const first = bot.last;
	const gaps = [];
	for (let i = 0; i < 4; i++) {
		const before = bot.sockets.length;
		const started = bot.clock.now;
		await bot.last.emit('connection.update', closeEvent(DisconnectReason.connectionClosed));
		await bot.advance(1 * SEC);
		assert.equal(bot.sockets.length, before, 'no immediate reconnect');
		let waited = 1 * SEC;
		while (bot.sockets.length === before && waited < 10 * MIN) { await bot.advance(1 * SEC); waited += 1 * SEC; }
		gaps.push(bot.clock.now - started);
	}
	assert.deepEqual(gaps, [5 * SEC, 10 * SEC, 20 * SEC, 40 * SEC]);
	assert.ok(first.listenersRemoved && first.ended, 'the first socket was retired');
	assert.equal(bot.sockets.filter((s) => !s.ended).length, 1, 'exactly one live socket');
});

test('a successful connection resets the backoff', async () => {
	const bot = await boot({ registered: true });
	await bot.last.emit('connection.update', closeEvent(DisconnectReason.connectionClosed));
	await bot.advance(6 * SEC);
	await bot.last.emit('connection.update', closeEvent(DisconnectReason.connectionClosed));
	await bot.advance(11 * SEC);
	assert.equal(bot.sockets.length, 3);
	await bot.last.emit('connection.update', { connection: 'open' });
	const started = bot.clock.now;
	await bot.last.emit('connection.update', closeEvent(DisconnectReason.connectionClosed));
	let waited = 0;
	const before = bot.sockets.length;
	while (bot.sockets.length === before && waited < MIN) { await bot.advance(1 * SEC); waited += SEC; }
	assert.equal(bot.clock.now - started, 5 * SEC);
});

test('the restart that follows a successful link is quick and not treated as a failure', async () => {
	const bot = await boot({ env: { PHONE_NUMBER: PHONE } });
	bot.setRegistered(true);
	await bot.last.emit('connection.update', closeEvent(DisconnectReason.restartRequired));
	await bot.advance(2 * SEC);
	assert.equal(bot.sockets.length, 2);
	assert.equal(bot.sockets.reduce((n, s) => n + s.count('requestPairingCode'), 0), 0);
});

test('a replaced session is never logged out, and the bot stops after repeated takeovers', async () => {
	const bot = await boot({ registered: true });
	for (let i = 0; i < 3; i++) {
		await bot.last.emit('connection.update', closeEvent(DisconnectReason.connectionReplaced));
		await bot.advance(30 * SEC);
		assert.equal(bot.sockets.length, i + 1, 'waits before retrying');
		await bot.advance(40 * SEC);
		assert.equal(bot.sockets.length, i + 2);
	}
	await bot.last.emit('connection.update', closeEvent(DisconnectReason.connectionReplaced));
	await bot.advance(10 * MIN);
	assert.equal(bot.sockets.length, 4, 'no further sockets after the limit');
	assert.ok(bot.sockets.every((s) => s.count('logout') === 0), 'logout must never be called');
	assert.match(bot.allLogs(), /Another instance keeps taking over/);
});

test('logged out: the dead session is cleared and the bot does not retry on its own', async () => {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wa-session-'));
	fs.writeFileSync(path.join(dir, 'creds.json'), '{}');
	const bot = await boot({ registered: true, env: { SESSION_PATH: dir } });
	await bot.last.emit('connection.update', closeEvent(DisconnectReason.loggedOut));
	await bot.advance(2 * 60 * MIN);
	assert.equal(bot.sockets.length, 1);
	assert.ok(bot.removed.includes(dir));
	assert.equal(fs.existsSync(dir), false);
	assert.match(bot.allLogs(), /logged out from WhatsApp/);
});

test('a 403 from WhatsApp stops all retries', async () => {
	const bot = await boot({ registered: true });
	await bot.last.emit('connection.update', closeEvent(DisconnectReason.forbidden));
	await bot.advance(60 * MIN);
	assert.equal(bot.sockets.length, 1);
	assert.match(bot.allLogs(), /may be restricted or banned/);
});

test('repeated bad sessions retry with backoff, then clear the session once and wait before a new link', async () => {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wa-session-'));
	const bot = await boot({ registered: true, env: { SESSION_PATH: dir } });
	for (let i = 0; i < 4; i++) {
		await bot.last.emit('connection.update', closeEvent(DisconnectReason.badSession));
		await bot.advance(2 * MIN);
	}
	assert.equal(bot.sockets.length, 5);
	assert.equal(bot.removed.length, 0, 'not wiped during the first retries');
	await bot.last.emit('connection.update', closeEvent(DisconnectReason.badSession));
	await bot.advance(10 * SEC);
	assert.equal(bot.removed.length, 1);
	assert.equal(bot.sockets.length, 5, 'waits before starting the fresh link');
	await bot.advance(90 * SEC);
	assert.equal(bot.sockets.length, 6);
});

test('after connecting, nothing risky happens at once: actions are delayed and spread out', async () => {
	const bot = await boot({ registered: true });
	await bot.last.emit('connection.update', { connection: 'open' });
	await bot.advance(5 * SEC);
	const sock = bot.last;
	for (const name of ['newsletterMetadata', 'newsletterFollow', 'updateProfileName', 'sendMessage']) assert.equal(sock.count(name), 0, `${name} must not fire immediately`);

	await bot.advance(25 * SEC);
	assert.equal(sock.count('sendMessage'), 1, 'connected message after ~20s');
	await bot.advance(20 * SEC);
	assert.equal(sock.count('newsletterMetadata'), 1, 'one read-only lookup for the channel badge');
	assert.equal(sock.count('newsletterFollow'), 0);
	assert.equal(global.channelJid, '0029VaoYmHz9MF98STZg4w1h@newsletter');

	await bot.advance(2 * MIN);
	assert.equal(sock.count('newsletterFollow'), 0, 'follows still waiting for the three-minute delay');
	await bot.advance(MIN);
	assert.equal(sock.count('newsletterFollow'), 2);
	assert.equal(sock.count('updateProfileName'), 0, 'the profile name is never changed unless asked for');
});

test('profile renaming and channel following can be switched on or off', async () => {
	let bot = await boot({ registered: true, env: { SET_PROFILE_NAME: 'true', POST_LINK_DELAY_MS: '60000' } });
	await bot.last.emit('connection.update', { connection: 'open' });
	await bot.advance(3 * MIN);
	assert.equal(bot.last.count('updateProfileName'), 1);
	bot.restore(); bots.pop();
	bot = await boot({ registered: true, env: { AUTO_FOLLOW_CHANNELS: 'false' } });
	await bot.last.emit('connection.update', { connection: 'open' });
	await bot.advance(10 * MIN);
	assert.equal(bot.last.count('newsletterFollow'), 0);
});

test('reconnecting does not repeat the one-time post-link actions', async () => {
	const bot = await boot({ registered: true, env: { POST_LINK_DELAY_MS: '60000' } });
	await bot.last.emit('connection.update', { connection: 'open' });
	await bot.advance(2 * MIN);
	const total = () => bot.sockets.reduce((n, s) => n + s.count('newsletterFollow') + s.count('sendMessage'), 0);
	const before = total();
	assert.ok(before > 0);
	await bot.last.emit('connection.update', closeEvent(DisconnectReason.connectionClosed));
	await bot.advance(10 * SEC);
	await bot.last.emit('connection.update', { connection: 'open' });
	await bot.advance(10 * MIN);
	assert.equal(total(), before);
});

test('events from a retired socket are ignored and cannot start a second connection', async () => {
	const bot = await boot({ registered: true });
	const first = bot.last;
	await first.emit('connection.update', closeEvent(DisconnectReason.connectionClosed));
	await bot.advance(10 * SEC);
	assert.equal(bot.sockets.length, 2);
	await first.emit('connection.update', closeEvent(DisconnectReason.connectionClosed));
	await bot.advance(10 * MIN);
	assert.equal(bot.sockets.length, 2);
});

test('online presence is not forced on connect unless requested', async () => {
	let bot = await boot({ registered: true });
	assert.equal(bot.last.options.markOnlineOnConnect, false);
	bot.restore(); bots.pop();
	bot = await boot({ registered: true, env: { MARK_ONLINE: 'true' } });
	assert.equal(bot.last.options.markOnlineOnConnect, true);
});

test('changing index.js restarts the process cleanly instead of loading a second connection', async () => {
	const bot = await boot({ registered: true });
	assert.equal(bot.watchers.length, 1);
	bot.watchers[0].cb();
	await bot.advance(1 * SEC);
	assert.deepEqual(bot.exits, [0]);
	assert.equal(bot.sockets.length, 1);
});

test('channel post reactions are slightly delayed and normal messages still reach the handler', async () => {
	const bot = await boot({ registered: true });
	const sock = bot.last;
	await sock.emit('messages.upsert', { messages: [{ key: { remoteJid: '1203@newsletter', id: 'K1' }, newsletterServerId: '77' }] });
	assert.equal(sock.count('newsletterReactMessage'), 0);
	await bot.advance(6 * SEC);
	assert.equal(sock.count('newsletterReactMessage'), 1);
	assert.equal(bot.messagesUpsertCalls.length, 1);
});

test('startup tells the owner what is missing and how to fix it', async () => {
	const bot = await boot({ registered: true });
	const text = bot.allLogs();
	assert.match(text, /ES_TEAMS_API_KEY is not set/);
	assert.match(text, /https:\/\/esteamstv\.devs\.surf\/developers\/api/);
	assert.match(text, /No persistent session storage is configured/);
	bot.restore(); bots.pop();
	const configured = await boot({ registered: true, env: { ES_TEAMS_API_KEY: 'estv_x', MONGODB_URI: 'mongodb://x' } });
	assert.doesNotMatch(configured.allLogs(), /ES_TEAMS_API_KEY is not set|No persistent session storage/);
	assert.ok(!configured.allLogs().includes('estv_x'));
	const panelConfigured = await boot({ registered: true, env: { MONGODB_URI: 'mongodb://x' }, settings: { users: { esteams_apikey: 'estv_panel_key' } } });
	assert.doesNotMatch(panelConfigured.allLogs(), /ES_TEAMS_API_KEY is not set/);
	assert.ok(!panelConfigured.allLogs().includes('estv_panel_key'));
});

test('self-ping is skipped on hosts that do not sleep, and kept on Render', async () => {
	let bot = await boot({ registered: true });
	assert.equal(bot.clock.timers.filter((t) => t.repeat === 4 * MIN).length, 0);
	assert.doesNotMatch(bot.allLogs(), /SELF_URL is not set/);
	bot.restore(); bots.pop();
	bot = await boot({ registered: true, env: { RENDER: 'true' } });
	assert.equal(bot.clock.timers.filter((t) => t.repeat === 4 * MIN).length, 1);
	assert.match(bot.allLogs(), /SELF_URL is not set/);
});

test('a Railway volume is used for the session automatically and counts as persistent storage', async () => {
	const bot = await boot({ registered: true, env: { RAILWAY_VOLUME_MOUNT_PATH: '/data' } });
	const text = bot.allLogs();
	assert.match(text, /local folder at "\/data\/ES_TEAMS-SESSION"/);
	assert.doesNotMatch(text, /No persistent session storage is configured/);
	bot.restore(); bots.pop();
	const explicit = await boot({ registered: true, env: { RAILWAY_VOLUME_MOUNT_PATH: '/data', SESSION_PATH: '/custom/session' } });
	assert.match(explicit.allLogs(), /local folder at "\/custom\/session"/);
});
