'use strict';

const CHANNEL_INVITE_URL = /https?:\/\/chat\.whatsapp\.com\/[^\s]+/i;

function normalizeChannelJid(value) {
	const raw = String(value || '').trim().replace(/^['"`]+|['"`]+$/g, '');
	const match = raw.match(/(\d{5,25})@newsletter$/i);
	return match ? `${match[1]}@newsletter` : '';
}

function channelInviteCode() {
	return String(global.wagc2 || '').split('/channel/')[1]?.split(/[?#/\s]/)[0] || '';
}

async function resolveChannelJid(sock) {
	if (global.channelJid) return global.channelJid;
	const configuredJid = normalizeChannelJid(process.env.WHATSAPP_CHANNEL_JID);
	if (configuredJid) {
		global.channelJid = configuredJid;
		return configuredJid;
	}
	const invite = channelInviteCode();
	if (!invite || typeof sock.newsletterMetadata !== 'function') return null;
	const metadata = await sock.newsletterMetadata('invite', invite);
	if (!metadata?.id) return null;
	global.channelJid = metadata.id;
	global.channelName = metadata.name || metadata.thread_metadata?.name?.text || global.ownername;
	return metadata.id;
}

function stripChannelInvite(text) {
	return String(text || '').replace(CHANNEL_INVITE_URL, '').replace(/\s{2,}/g, ' ').trim();
}

async function postToChannel(sock, { text, media, mimetype, caption } = {}) {
	const jid = await resolveChannelJid(sock);
	if (!jid) throw new Error('The WhatsApp channel is not available yet. Set WHATSAPP_CHANNEL_JID or wait for channel metadata to load.');
	const body = media
		? { [String(mimetype || '').startsWith('video/') ? 'video' : 'image']: media, ...(caption ? { caption } : {}) }
		: { text: String(text || '') };
	if (!body.text && !body.image && !body.video) throw new Error('Add text or reply to an image/video.');
	return sock.sendMessage(jid, body, { skipChannelBadge: true });
}

module.exports = { postToChannel, resolveChannelJid, stripChannelInvite, normalizeChannelJid };
