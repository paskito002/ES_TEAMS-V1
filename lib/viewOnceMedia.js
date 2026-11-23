'use strict';

const MAX_MEDIA_BYTES = 32 * 1024 * 1024;
const ACTIVE_DOWNLOADS = new WeakSet();
const COMMAND_ALIASES = new Set(['vv', 'vo', 'viewonce']);
const MEDIA_TYPES = {
	imageMessage: { kind: 'image', mimePrefix: 'image/' },
	videoMessage: { kind: 'video', mimePrefix: 'video/' },
	audioMessage: { kind: 'audio', mimePrefix: 'audio/' },
};
const WRAPPER_KEYS = [
	'ephemeralMessage',
	'documentWithCaptionMessage',
	'editedMessage',
	'associatedChildMessage',
	'deviceSentMessage',
	'groupStatusMessage',
	'groupStatusMessageV2',
];

function unwrapMediaMessage(message, maxDepth = 8) {
	let current = message;
	let viewOnce = false;
	const seen = new Set();
	for (let depth = 0; depth <= maxDepth; depth++) {
		if (!current || typeof current !== 'object' || Array.isArray(current) || seen.has(current)) break;
		seen.add(current);
		const viewOnceEntry = Object.entries(current).find(([key, value]) => /^viewOnceMessage/i.test(key) && value?.message);
		if (viewOnceEntry) {
			viewOnce = true;
			current = viewOnceEntry[1].message;
			continue;
		}
		const wrapperEntry = WRAPPER_KEYS.map((key) => [key, current[key]]).find(([, value]) => value?.message);
		if (wrapperEntry) {
			current = wrapperEntry[1].message;
			continue;
		}
		for (const [messageType, definition] of Object.entries(MEDIA_TYPES)) {
			const media = current[messageType];
			if (!media || typeof media !== 'object') continue;
			if (media.viewOnce === true) viewOnce = true;
			const mime = typeof media.mimetype === 'string' ? media.mimetype.toLowerCase() : '';
			if (!mime.startsWith(definition.mimePrefix)) return { status: viewOnce ? 'view-once' : 'unsupported', viewOnce, message: current };
			return {
				status: viewOnce ? 'view-once' : 'media',
				viewOnce,
				...definition,
				mime,
				media,
				messageType,
				message: current,
			};
		}
		return { status: viewOnce ? 'view-once' : 'unsupported', viewOnce, message: current };
	}
	return { status: viewOnce ? 'view-once' : 'unsupported', viewOnce, message: current };
}

function inspectMediaMessage(message) {
	return unwrapMediaMessage(message);
}

function getRawQuotedMessage(message) {
	const fromSerializedContent = message?.msg?.contextInfo?.quotedMessage;
	if (fromSerializedContent) return fromSerializedContent;
	for (const content of Object.values(message?.message || {})) {
		const quoted = content?.contextInfo?.quotedMessage;
		if (quoted) return quoted;
	}
	return null;
}

function getConfiguredCommand(settings) {
	const configured = typeof settings?.viewOnceCommand === 'string' ? settings.viewOnceCommand.toLowerCase() : '';
	return /^[a-z][a-z0-9_-]{0,31}$/.test(configured) ? configured : 'vv';
}

function resolveCommandAction(command, configuredCommand) {
	const normalized = String(command || '').toLowerCase();
	if (COMMAND_ALIASES.has(normalized) || normalized === configuredCommand) return 'media';
	if (normalized === 'rvo') return 'reset';
	if (normalized === 'setvvcmd' || normalized === 'setvv' || normalized === 'vvcommand') return 'configure';
	return null;
}

function normalizeConfiguredCommand(value) {
	const normalized = String(value || '').trim().replace(/^\./, '').toLowerCase();
	if (normalized === 'reset' || normalized === 'default' || normalized === 'vv') return 'vv';
	if (!normalized || !/^[a-z][a-z0-9_-]{0,31}$/.test(normalized)) {
		throw new Error('Choose a command name using 1–32 letters, numbers, underscores or hyphens; it must start with a letter.');
	}
	return normalized;
}

async function collectBoundedStream(stream, maxBytes) {
	if (!stream || typeof stream[Symbol.asyncIterator] !== 'function') throw new Error('Baileys returned an invalid media stream.');
	const chunks = [];
	let totalBytes = 0;
	try {
		for await (const chunk of stream) {
			const part = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
			totalBytes += part.length;
			if (totalBytes > maxBytes) {
				const error = new Error(`Media exceeds the ${Math.floor(maxBytes / (1024 * 1024))} MB processing limit.`);
				error.code = 'MEDIA_TOO_LARGE';
				throw error;
			}
			chunks.push(part);
		}
	} finally {
		if (typeof stream.destroy === 'function' && !stream.destroyed) stream.destroy();
	}
	if (totalBytes === 0) throw new Error('Baileys returned an empty media stream.');
	return Buffer.concat(chunks, totalBytes);
}

async function downloadQuotedMedia({ sock, rawMessage, quoteKey, downloadMediaMessage, downloadContentFromMessage, maxBytes = MAX_MEDIA_BYTES }) {
	if (!sock || typeof sock !== 'object') throw new Error('The WhatsApp session is not available.');
	if (!rawMessage || !quoteKey?.id || !quoteKey?.remoteJid) throw new Error('The quoted message is incomplete or unavailable.');
	if (typeof downloadMediaMessage !== 'function') throw new Error('Baileys media downloads are unavailable in this runtime.');
	const descriptor = inspectMediaMessage(rawMessage);
	if (!['media', 'view-once'].includes(descriptor.status) || !descriptor.media) {
		throw new Error('The quoted message does not contain a supported image, video, or audio payload.');
	}
	if (ACTIVE_DOWNLOADS.has(sock)) {
		const error = new Error('A media download is already in progress for this WhatsApp session. Try again when it finishes.');
		error.code = 'MEDIA_BUSY';
		throw error;
	}

	ACTIVE_DOWNLOADS.add(sock);
	let stream;
	try {
		const message = { key: quoteKey, message: rawMessage };
		try {
			stream = await downloadMediaMessage(message, 'stream', {}, {
				logger: { info() {} },
				reuploadRequest: async (expiredMessage) => {
					if (typeof sock.updateMediaMessage !== 'function') {
						throw new Error('The WhatsApp session cannot request a media reupload.');
					}
					return sock.updateMediaMessage(expiredMessage);
				},
			});
			return await collectBoundedStream(stream, maxBytes);
		} catch (primaryError) {
			if (primaryError?.code === 'MEDIA_TOO_LARGE' || typeof downloadContentFromMessage !== 'function') throw primaryError;
			try {
				stream = await downloadContentFromMessage(descriptor.media, descriptor.kind);
				return await collectBoundedStream(stream, maxBytes);
			} catch (fallbackError) {
				if (fallbackError?.code === 'MEDIA_TOO_LARGE') throw fallbackError;
				const error = new Error(`Baileys media download failed: ${primaryError?.message || primaryError}; direct media fallback failed: ${fallbackError?.message || fallbackError}`);
				error.cause = fallbackError;
				throw error;
			}
		}
	} finally {
		if (stream && typeof stream.destroy === 'function' && !stream.destroyed) stream.destroy();
		ACTIVE_DOWNLOADS.delete(sock);
	}
}

module.exports = {
	MAX_MEDIA_BYTES,
	inspectMediaMessage,
	unwrapMediaMessage,
	getRawQuotedMessage,
	getConfiguredCommand,
	resolveCommandAction,
	normalizeConfiguredCommand,
	downloadQuotedMedia,
};
