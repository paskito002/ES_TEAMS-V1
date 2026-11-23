'use strict';

const MESSAGE_STORE_LIMIT = 1500;

function messageJidAliases(jids, normalizeJid = (jid) => jid) {
	const aliases = new Set();
	for (const jid of jids || []) {
		if (typeof jid !== 'string' || !jid) continue;
		aliases.add(jid);
		aliases.add(jid.replace(/:\d+(?=@)/, ''));
		try {
			const normalized = normalizeJid(jid);
			if (normalized) {
				aliases.add(normalized);
				aliases.add(normalized.replace(/:\d+(?=@)/, ''));
			}
		} catch {}
	}
	return aliases;
}

function rememberWAMessage(store, message, { limit = MESSAGE_STORE_LIMIT, normalizeJid } = {}) {
	const id = message?.key?.id;
	if (!(store instanceof Map) || !id || !message.message || typeof message.message !== 'object') return false;
	const jids = messageJidAliases([message.key.remoteJid, message.key.remoteJidAlt], normalizeJid);
	store.delete(id);
	store.set(id, { message: message.message, jids });
	while (store.size > limit) store.delete(store.keys().next().value);
	return true;
}

function getStoredWAMessage(store, key, { normalizeJid } = {}) {
	const id = key?.id;
	const entry = id && store instanceof Map ? store.get(id) : null;
	if (!entry) return undefined;
	const requestedJids = messageJidAliases([key.remoteJid, key.remoteJidAlt], normalizeJid);
	if (requestedJids.size && entry.jids.size && ![...requestedJids].some((jid) => entry.jids.has(jid))) return undefined;
	store.delete(id);
	store.set(id, entry);
	return entry.message;
}

module.exports = {
	MESSAGE_STORE_LIMIT,
	messageJidAliases,
	rememberWAMessage,
	getStoredWAMessage,
};
