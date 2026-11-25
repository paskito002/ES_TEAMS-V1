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
	if (Esteams.__esTeamsChannelBadgePatched) return Esteams;
	const rawSendMessage = Esteams.sendMessage.bind(Esteams);
	Esteams.sendMessage = (jid, content = {}, options = {}) => {
		const badge = getChannelBadge();
		if (options.skipChannelBadge || !badge || UNBADGEABLE_KEYS.some((key) => content[key])) {
			return rawSendMessage(jid, content, options);
		}
		const contextInfo = content.contextInfo || {};
		return rawSendMessage(jid, { ...content, contextInfo: { ...badge, ...contextInfo } }, options);
	};
	Esteams.__esTeamsChannelBadgePatched = true;
	return Esteams;
}

module.exports = { channelInfo, patchSendMessage };
