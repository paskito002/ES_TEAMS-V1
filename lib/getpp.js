const axios = require('axios');

const ALIASES = ['getpp', 'pp'];

function cleanNumber(input) {
	return String(input || '').replace(/[^0-9]/g, '');
}

async function handleGetPP(Esteams, m) {
	const command = (m.command || '').toLowerCase();
	if (!ALIASES.includes(command)) return false;

	let targetJid = m.chat;

	if (m.mentionedJid && m.mentionedJid.length) {
		targetJid = m.mentionedJid[0];
	} else if (m.quoted && m.quoted.sender) {
		targetJid = m.quoted.sender;
	} else if (m.args && m.args[0]) {
		const cleanNum = cleanNumber(m.args[0]);
		if (!cleanNum) {
			await m.reply(`❌ Please provide a valid WhatsApp number.\n\nExample: *${m.prefix || '.'}getpp 2349018958092*`);
			return true;
		}
		targetJid = `${cleanNum}@s.whatsapp.net`;
	}

	try {
		const ppUrl = await Esteams.profilePictureUrl(targetJid, 'image').catch(() => null);

		if (!ppUrl) {
			await m.reply(`❌ Could not retrieve profile picture. The user may have their privacy settings set to restrict profile photos, or they don't have one.`);
			return true;
		}

		const response = await axios.get(ppUrl, { responseType: 'arraybuffer' });
		const buffer = Buffer.from(response.data);

		await Esteams.sendMessage(m.chat, {
			image: buffer,
			caption: `📸 *Profile Picture Retrieved!*\n👤 *User:* \`${targetJid.split('@')[0]}\``
		}, { quoted: m });
	} catch (err) {
		console.error('Error fetching profile picture:', err);
		await m.reply('⚠️ Failed to fetch profile picture due to an error.');
	}

	return true;
}

module.exports = { handleGetPP };
