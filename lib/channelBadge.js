// "Forwarded from channel" badge -- a chip WhatsApp renders on top of an ordinary
// message, not a tappable button. Requires a real, followed channel JID or WhatsApp
// hides it, so it resolves to nothing until global.channelJid is set (index.js sets it
// once the bot follows global.wagc2 after connecting).
function getChannelBadge() {
	if (!global.channelJid) return null;
	return {
		forwardingScore: 999,
		isForwarded: true,
		forwardedNewsletterMessageInfo: {
			newsletterJid: global.channelJid,
			newsletterName: global.channelName || global.ownername,
			serverMessageId: -1,
		},
	};
}

function channelInfo() {
	const badge = getChannelBadge();
	return badge ? { contextInfo: badge } : {};
}

// Message kinds where a contextInfo badge either can't render (delete/react are control
// messages with no visible body) or risks the send failing outright (poll/sticker/contacts
// use specialized WhatsApp UI that doesn't reliably accept an arbitrary contextInfo).
const UNBADGEABLE_KEYS = ['delete', 'react', 'poll', 'sticker', 'contacts'];

// Patches Esteams.sendMessage so every outbound message -- from any file, present or
// future -- carries the channel badge automatically, merged alongside whatever
// contextInfo (mentions, ad-reply cards, etc.) the caller already set.
function patchSendMessage(Esteams) {
	const rawSendMessage = Esteams.sendMessage.bind(Esteams);
	Esteams.sendMessage = (jid, content = {}, options) => {
		const badge = getChannelBadge();
		if (!badge || UNBADGEABLE_KEYS.some((key) => content[key])) {
			return rawSendMessage(jid, content, options);
		}
		return rawSendMessage(jid, { ...content, contextInfo: { ...badge, ...content.contextInfo } }, options);
	};
}

module.exports = { channelInfo, patchSendMessage };
