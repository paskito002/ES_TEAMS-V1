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

const UNBADGEABLE_KEYS = ['delete', 'react', 'poll', 'sticker', 'contacts'];

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
