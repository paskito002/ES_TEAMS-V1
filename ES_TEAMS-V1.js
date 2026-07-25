const { runtime } = require('./lib/function');

const commands = {
	async menu(XliconBotInc, m) {
		const list = Object.keys(commands).map((name) => `${global.xprefix}${name}`).join('\n');
		await m.reply(`${global.botname}\n\nAvailable commands:\n${list}`);
	},
	async ping(XliconBotInc, m) {
		const start = Date.now();
		const sent = await m.reply('Pinging...');
		const speed = Date.now() - start;
		await XliconBotInc.sendMessage(m.chat, { text: `🏓 Pong! ${speed}ms`, edit: sent.key });
	},
	async runtime(XliconBotInc, m) {
		await m.reply(`Bot has been running for ${runtime(process.uptime())}`);
	},
};

module.exports = async (XliconBotInc, m) => {
	if (!m.body || m.prefix !== global.xprefix) return;
	const command = m.command?.toLowerCase();
	const handler = commands[command];
	if (!handler) return;
	try {
		await handler(XliconBotInc, m);
	} catch (e) {
		console.error(`Command "${command}" failed:`, e);
	}
};
