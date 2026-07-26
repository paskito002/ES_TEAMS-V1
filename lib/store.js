/*
 * Minimal in-memory store replacement.
 * @whiskeysockets/baileys removed `makeInMemoryStore` from the package,
 * so this provides just enough (contacts + message cache) for the bot
 * to keep working: getName() lookups and quoted-message resolution.
 */
const MAX_MESSAGES_PER_CHAT = 100;

function makeInMemoryStore() {
	const contacts = {};
	const messages = new Map();

	function upsertContact(contact) {
		if (!contact || !contact.id) return;
		contacts[contact.id] = { ...contacts[contact.id], ...contact };
	}

	function cacheMessage(msg) {
		if (!msg?.key?.remoteJid || !msg.key.id) return;
		let chatMessages = messages.get(msg.key.remoteJid);
		if (!chatMessages) {
			chatMessages = new Map();
			messages.set(msg.key.remoteJid, chatMessages);
		}
		chatMessages.set(msg.key.id, msg);
		if (chatMessages.size > MAX_MESSAGES_PER_CHAT) {
			const oldestKey = chatMessages.keys().next().value;
			chatMessages.delete(oldestKey);
		}
	}

	function bind(ev) {
		ev.on('contacts.upsert', (updates) => updates.forEach(upsertContact));
		ev.on('contacts.update', (updates) => updates.forEach(upsertContact));
		ev.on('groups.upsert', (updates) => updates.forEach((g) => upsertContact({ id: g.id, name: g.subject, subject: g.subject })));
		ev.on('groups.update', (updates) => updates.forEach((g) => upsertContact({ id: g.id, name: g.subject, subject: g.subject })));
		ev.on('messages.upsert', ({ messages: msgs }) => msgs.forEach(cacheMessage));
	}

	function loadMessage(jid, id) {
		return messages.get(jid)?.get(id);
	}

	return { contacts, bind, loadMessage };
}

module.exports = { makeInMemoryStore };
