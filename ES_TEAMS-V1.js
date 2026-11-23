const os = require("os"), axios = require("axios"), crypto = require("crypto"), moment = require("moment-timezone"), { downloadMediaMessage, downloadContentFromMessage, generateWAMessageContent, generateWAMessageFromContent, getUrlInfo } = require("@whiskeysockets/baileys"), { runtime } = require("./lib/function"), { imageToWebp, videoToWebp, addExif } = require("./lib/exif"), { channelInfo } = require("./lib/channelBadge"), { inspectMediaMessage, getRawQuotedMessage, getConfiguredCommand, resolveCommandAction, normalizeConfiguredCommand, downloadQuotedMedia } = require("./lib/viewOnceMedia"), api = require("./lib/esteamsApi");
const { getStoredWAMessage } = require("./lib/viewOnceMessageStore");
function bold(_0x18e71b) {
  return String(_0x18e71b).replace(/[A-Za-z0-9]/g, (_0x52d236) => {
    {
      const _0x2ac432 = _0x52d236.codePointAt(0);
      if (_0x2ac432 >= 65 && _0x2ac432 <= 90) return String.fromCodePoint(_0x2ac432 + 120211);
      if (_0x2ac432 >= 97 && _0x2ac432 <= 122) return String.fromCodePoint(_0x2ac432 + 120205);
      if (_0x2ac432 >= 48 && _0x2ac432 <= 57) return String.fromCodePoint(_0x2ac432 + 120764);
      return _0x52d236;
    }
  });
}
function boldSerif(_0x12b91c) {
  return String(_0x12b91c).replace(/[A-Za-z0-9]/g, (_0x131918) => {
    const _0x58de8a = _0x131918.codePointAt(0);
    if (_0x58de8a >= 65 && _0x58de8a <= 90) return String.fromCodePoint(_0x58de8a + 119743);
    if (_0x58de8a >= 97 && _0x58de8a <= 122) return String.fromCodePoint(_0x58de8a + 119737);
    if (_0x58de8a >= 48 && _0x58de8a <= 57) return String.fromCodePoint(_0x58de8a + 120734);
    return _0x131918;
  });
}
function linkLine(_0x2a8e46, _0x5f31d6) {
  return "\u{1F517} " + _0x2a8e46 + ": " + _0x5f31d6;
}
async function sendBrandedReply(_0x14a299, _0x2301df, { image: _0x43351b, video: _0x4eae60, body: _0x5a5693, extraButtons = [] }) {
  const _0x20c218 = extraButtons.map((_0x5e4546) => linkLine(_0x5e4546.displayText, _0x5e4546.url)), _0x27f118 = _0x20c218.length ? _0x5a5693 + "\n\n" + _0x20c218.join("\n") : _0x5a5693;
  if (_0x4eae60) return _0x14a299.sendMessage(_0x2301df.chat, { video: Buffer.isBuffer(_0x4eae60) ? _0x4eae60 : { url: _0x4eae60 }, caption: _0x27f118, ...channelInfo() }, { quoted: _0x2301df });
  if (_0x43351b) return _0x14a299.sendMessage(_0x2301df.chat, { image: Buffer.isBuffer(_0x43351b) ? _0x43351b : { url: _0x43351b }, caption: _0x27f118, ...channelInfo() }, { quoted: _0x2301df });
  return _0x14a299.sendMessage(_0x2301df.chat, { text: _0x27f118, ...channelInfo() }, { quoted: _0x2301df });
}
const requireArg = (_0x10f7da, _0x186540) => {
  const _0x41f2da = _0x10f7da.join(" ").trim();
  if (!_0x41f2da) throw new Error("Invalid input.\n\nUsage: " + _0x186540);
  return _0x41f2da;
}, groupMetadataCache = /* @__PURE__ */ new Map(), GROUP_METADATA_TTL_MS = 3e4;
async function getGroupMetadata(_0x5c7f9b, _0x5064ca) {
  const _0x3a8946 = groupMetadataCache.get(_0x5064ca);
  if (_0x3a8946 && Date.now() - _0x3a8946.time < GROUP_METADATA_TTL_MS) return _0x3a8946.data;
  const _0x27df17 = await _0x5c7f9b.groupMetadata(_0x5064ca);
  return groupMetadataCache.set(_0x5064ca, { data: _0x27df17, time: Date.now() }), _0x27df17;
}
const matchesAnyIdentity = (_0x886a0, _0xee40d7) => _0xee40d7.includes(_0x886a0.id) || _0xee40d7.includes(_0x886a0.lid) || _0xee40d7.includes(_0x886a0.phoneNumber);
function isBotGroupAdmin(_0x8ea23b, _0x582dc1) {
  const _0x4223f4 = [_0x8ea23b.user?.id, _0x8ea23b.user?.lid, _0x8ea23b.user?.phoneNumber, _0x8ea23b.authState?.creds?.me?.id, _0x8ea23b.authState?.creds?.me?.lid, _0x8ea23b.authState?.creds?.me?.phoneNumber].filter(Boolean), _0xa56af9 = _0x582dc1.participants.find((_0x4e25a3) => matchesAnyIdentity(_0x4e25a3, _0x4223f4));
  return !_0xa56af9 || _0xa56af9.admin === "admin" || _0xa56af9.admin === "superadmin";
}
async function requireGroupAdmin(_0x3d62cd, _0x46c879) {
  if (!_0x46c879.isGroup) throw new Error("This command can only be used in a group.");
  const _0x24c85f = await getGroupMetadata(_0x3d62cd, _0x46c879.chat), _0x11fd7d = [_0x46c879.sender, _0x46c879.key?.participant, _0x46c879.key?.participantAlt].filter(Boolean), _0x261aa3 = _0x24c85f.participants.find((_0x306f9f) => matchesAnyIdentity(_0x306f9f, _0x11fd7d)), _0x4d7f2a = _0x261aa3 && (_0x261aa3.admin === "admin" || _0x261aa3.admin === "superadmin");
  if (!_0x4d7f2a) throw new Error("This command is for group admins only.");
  if (!isBotGroupAdmin(_0x3d62cd, _0x24c85f)) throw new Error("I need to be an admin in this group to do that.");
  return _0x24c85f;
}
const resolveTarget = (_0x45f0ed) => {
  const _0x1491b9 = _0x45f0ed.args.join("").replace(/\D/g, "");
  return _0x1491b9 ? _0x1491b9 + "@s.whatsapp.net" : _0x45f0ed.quoted?.sender;
}, requireQuotedImage = (_0x4897a5, _0x5a04a8) => {
  if (!_0x4897a5.quoted || !_0x4897a5.quoted.isMedia || !/image/i.test(_0x4897a5.quoted.mime || "")) throw new Error("Invalid input.\n\n" + _0x5a04a8);
  return _0x4897a5.quoted;
}, MENU_SECTIONS = [{ title: "DOWNLOAD MENU", commands: ["tiktok <link>", "facebook <link>", "instagram <link>", "twitter <link>", "ytmp4 <link>", "spotify <track link>", "play <song name>", "video <title>", "apk <app name>", "gdrive <link>", "webdl <link>"] }, { title: "GROUP MENU", commands: ["kick <number>", "promote <number>", "demote <number>", "tagall <text>", "hidetag <text>", "linkgroup", "resetlink", "setgcname <name>", "setgcdesc <desc>", "setgcpp (reply image)", "listadmin", "group open|close", "welcome on|off", "antilink on|off", "antibadword on|off", "mute <number>", "unmute <number>", "warn <number> [reason]", "warnings <number>", "resetwarn <number>", "groupinfo", "gcstatus <text> (reply image/video)", "leave", "delete (reply)"] }, { title: "SCRAPE / STALK MENU", commands: ["lyrics <song name>", "weather <city>", "technews", "ttstalk <username>", "igstalk <username>"] }, { title: "TOOLS MENU", commands: ["qr <text>", "tinyurl <link>", "removebg (reply image)", "ssweb <link>"] }, { title: "CREATIVE MENU", commands: ["flux <prompt>", "write <text>", "logo <header>|<subtitle>"] }, { title: "AI MENU", commands: ["gpt <question>"] }, { title: "MEDIA MENU", commands: ["sticker (reply image/video)", "shazam (reply audio/video)", "vv (owner-only View Once photo/video/audio saver; requires media delivered to this device)", "vo (alias)", "viewonce (alias)", "setvvcmd <name>", "rvo (reset command to vv)", "wasted (reply image)", "triggered (reply image)"] }, { title: "FUN MENU", commands: ["joke", "quran <surah#>", "bible <e.g. John 3:16>", "trend", "jid", "info <number>", "jail (reply image)", "poll <question>|<options>", "chatbot on|off", "horoscope <sign>"] }, { title: "GAMES MENU", commands: ["trivia", "riddle", "8ball <question>", "truth", "dare", "ship @user1 @user2"] }, { title: "LEVEL MENU", commands: ["levelup on|off", "level <number>", "leaderboard", "daily", "streak <number>"] }, { title: "UTILITY MENU", commands: ["tempmail", "checkmail <key>", "imgscan (reply image)", "scanqr (reply image)", "sysinfo"] }, { title: "USER MENU", commands: ["ping", "runtime"] }, { title: "OWNER MENU", commands: ["public on|off", "restart", "pp (in DM)"] }];
function ramBar(_0x5be909 = 12) {
  const _0x1902db = os.totalmem(), _0x4081d4 = os.freemem(), _0xab6bce = Math.round((_0x1902db - _0x4081d4) / _0x1902db * 100), _0x57c764 = Math.round(_0xab6bce / 100 * _0x5be909);
  return "" + "\u2588".repeat(_0x57c764) + "\u2591".repeat(_0x5be909 - _0x57c764) + " " + _0xab6bce + "%";
}
function boxSection(_0x9e8928, _0x3a17bb) {
  const _0x4f28ac = _0x3a17bb.map((_0x108d4e) => "\u2503 " + boldSerif(global.xprefix + _0x108d4e) + " \u25C1\uFE0F\u2744\uFE0F\u{1F577}\uFE0F").join("\n");
  return "\u256D\u2501\u2501\u2501\u2744\uFE0F\u3010 " + bold(_0x9e8928) + " \u3011\u2744\uFE0F\u2501\u2501\u2501\u256E\n" + _0x4f28ac + "\n\u2570\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u256F";
}
function buildMenu() {
  const _0xef4ffa = moment().tz("Africa/Lagos"), _0x122891 = MENU_SECTIONS.reduce((_0x457127, _0x386e4e) => _0x457127 + _0x386e4e.commands.length, 0), _0x47cbf5 = ["\u256D\u2501\u2501\u2501\u2501\u2501\u2744\uFE0F\u3010 " + bold("ES TEAMS V1") + " \u3011\u2744\uFE0F\u2501\u2501\u2501\u2501\u2501\u256E", "\u2503 \u2741\uFE0F Owner : " + global.ownername, "\u2503 \u2741\uFE0F Date : " + _0xef4ffa.format("DD MMMM YYYY"), "\u2503 \u2741\uFE0F Time : " + _0xef4ffa.format("hh:mm:ss a"), "\u2503 \u2741\uFE0F Commands : " + _0x122891, "\u2503 \u2741\uFE0F Prefix : " + global.xprefix, "\u2503 \u2741\uFE0F Ram : " + ramBar(), "\u2570\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u256F"].join("\n"), _0x1649ce = MENU_SECTIONS.map((_0x4ee3d2) => boxSection(_0x4ee3d2.title, _0x4ee3d2.commands)).join("\n");
  return _0x47cbf5 + "\n" + _0x1649ce;
}
const GROUP_INVITE_LINK = /(?:https?:\/\/)?chat\.whatsapp\.com\/[a-zA-Z0-9]+/i;
function stripInviteLink(_0xf869c1, _0x42d39e) {
  const _0x2307a1 = _0x42d39e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return _0xf869c1.replace(new RegExp("\\s*,?\\s*" + _0x2307a1 + "\\s*,?\\s*"), " ").replace(/\s{2,}/g, " ").replace(/^[\s,]+|[\s,]+$/g, "").trim();
}
async function enforceAntilink(_0x3dce19, _0x4c37b6) {
  if (!_0x4c37b6.isGroup || _0x4c37b6.fromMe || !_0x4c37b6.body || !GROUP_INVITE_LINK.test(_0x4c37b6.body)) return;
  if (!global.db.groups[_0x4c37b6.chat]?.antilink) return;
  try {
    {
      const _0x1f78cc = await getGroupMetadata(_0x3dce19, _0x4c37b6.chat), _0x8e9a81 = _0x1f78cc.participants.find((_0x5c361f) => _0x5c361f.id === _0x4c37b6.sender);
      if (_0x8e9a81?.admin) return;
      await _0x3dce19.sendMessage(_0x4c37b6.chat, { delete: _0x4c37b6.key }), await _0x3dce19.groupParticipantsUpdate(_0x4c37b6.chat, [_0x4c37b6.sender], "remove"), await _0x3dce19.sendMessage(_0x4c37b6.chat, { text: bold("ES TEAMS V1 ANTILINK") + "\n\n\u{1F6AB} @" + _0x4c37b6.sender.split("@")[0] + " was removed for sending a group invite link.", mentions: [_0x4c37b6.sender], ...channelInfo() });
    }
  } catch (_0x43159f) {
    console.error("Antilink enforcement failed:", _0x43159f.message || _0x43159f);
  }
}
async function handleChatbotReply(_0x27dc11, _0x41562a) {
  if (_0x41562a.fromMe || !_0x41562a.body || _0x41562a.prefix === global.xprefix) return;
  if (!global.db.groups[_0x41562a.chat]?.chatbot) return;
  try {
    {
      const _0x56003c = await api.askGpt(_0x41562a.body);
      await _0x41562a.reply(_0x56003c);
    }
  } catch (_0x33bac2) {
    console.error("Chatbot auto-reply failed:", _0x33bac2.message || _0x33bac2);
  }
}
function xpForLevel(_0x250927) {
  return 20 * _0x250927 * _0x250927;
}
function levelFromXp(_0x2a4158) {
  let _0x12a79d = 0;
  while (xpForLevel(_0x12a79d + 1) <= _0x2a4158) _0x12a79d++;
  return _0x12a79d;
}
async function addXp(_0x52e181, _0x136d97, _0x1ef76f) {
  global.db.groups[_0x52e181.chat] = global.db.groups[_0x52e181.chat] || {};
  const _0x11fe14 = global.db.groups[_0x52e181.chat];
  _0x11fe14.xp = _0x11fe14.xp || {};
  const _0x3b3fc8 = levelFromXp(_0x11fe14.xp[_0x136d97] || 0);
  _0x11fe14.xp[_0x136d97] = (_0x11fe14.xp[_0x136d97] || 0) + _0x1ef76f;
  const _0x167ccb = levelFromXp(_0x11fe14.xp[_0x136d97]);
  if (_0x167ccb > _0x3b3fc8 && _0x11fe14.levelup) {
    try {
      await _0x52e181.reply(bold("ES TEAMS V1 LEVEL UP") + "\n\n\u{1F389} @" + _0x136d97.split("@")[0] + " leveled up to " + bold("Level " + _0x167ccb) + "!");
    } catch (_0x17323a) {
      console.error("Level-up announcement failed:", _0x17323a.message || _0x17323a);
    }
  }
}
async function awardPassiveXp(_0xe22a2f, _0x395a42) {
  if (!_0x395a42.isGroup || _0x395a42.fromMe || !_0x395a42.body || _0x395a42.prefix === global.xprefix) return;
  if (!global.db.groups[_0x395a42.chat]?.levelup) return;
  global.db.groups[_0x395a42.chat] = global.db.groups[_0x395a42.chat] || {};
  const _0x518703 = global.db.groups[_0x395a42.chat];
  _0x518703.lastXpAt = _0x518703.lastXpAt || {};
  const _0x3bfb84 = Date.now();
  if (_0x3bfb84 - (_0x518703.lastXpAt[_0x395a42.sender] || 0) < 6e4) return;
  _0x518703.lastXpAt[_0x395a42.sender] = _0x3bfb84, await addXp(_0x395a42, _0x395a42.sender, 5 + Math.floor(Math.random() * 11));
}
const EIGHT_BALL_ANSWERS = ["Yes, definitely.", "It is certain.", "Without a doubt.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."], TRUTH_QUESTIONS = ["What's the most embarrassing thing you've ever done?", "Who was your first crush?", "What's a secret you've never told anyone here?", "What's the biggest lie you've ever told?", "What's your most irrational fear?", "Have you ever cheated on a test?", "What's the weirdest dream you've had?", "Who in this chat would you trust with a secret?", "What's your most used emoji and why?", "What's something you pretend to like but actually hate?"], DARE_PROMPTS = ["Send the last photo in your gallery.", "Type with your elbows for your next message.", "Send a voice note singing your favorite song.", "Change your profile picture to something silly for 1 hour.", "Reply using only emojis for your next 3 messages.", "Post the least embarrassing line of your recent search history.", "Do 10 push-ups right now and confirm here.", "Send a compliment to the last person you texted.", "Text someone in this chat asking what today's date is, out of nowhere.", "Describe your last meal using only sound effects."], RIDDLES = [{ q: "The more you take, the more you leave behind. What am I?", a: "footsteps" }, { q: "What has keys but no locks, space but no room, and you can enter but not go inside?", a: "a keyboard" }, { q: "What has to be broken before you can use it?", a: "an egg" }, { q: "I speak without a mouth and hear without ears. What am I?", a: "an echo" }, { q: "What gets wetter as it dries?", a: "a towel" }, { q: "What has a neck but no head?", a: "a bottle" }, { q: "What can travel around the world while staying in a corner?", a: "a stamp" }, { q: "What has one eye but cannot see?", a: "a needle" }, { q: "What month of the year has 28 days?", a: "all of them" }, { q: "What is full of holes but still holds water?", a: "a sponge" }, { q: "What comes down but never goes up?", a: "rain" }, { q: "What has hands but can't clap?", a: "a clock" }, { q: "What can you catch but not throw?", a: "a cold" }, { q: "What has a thumb and four fingers but is not alive?", a: "a glove" }, { q: "What runs but never walks, has a mouth but never talks?", a: "a river" }], pendingGuessGames = /* @__PURE__ */ new Map();
async function handlePendingGuess(_0x1b6837, _0x2aa95b) {
  if (_0x2aa95b.fromMe || !_0x2aa95b.body || _0x2aa95b.prefix === global.xprefix) return;
  const _0xdbb92e = pendingGuessGames.get(_0x2aa95b.chat);
  if (!_0xdbb92e) return;
  const _0x50b282 = (_0x5adbc6) => String(_0x5adbc6).trim().toLowerCase().replace(/^(a|an|the)\s+/, "").replace(/[^\w\s]/g, "");
  if (_0x50b282(_0x2aa95b.body) !== _0x50b282(_0xdbb92e.answer)) return;
  pendingGuessGames.delete(_0x2aa95b.chat);
  try {
    {
      await _0x2aa95b.reply(bold("ES TEAMS V1 GAME RESULT") + "\n\n\u{1F389} @" + _0x2aa95b.sender.split("@")[0] + ' got it right! The answer was "' + _0xdbb92e.answer + '".');
      if (_0x2aa95b.isGroup) await addXp(_0x2aa95b, _0x2aa95b.sender, 25);
    }
  } catch (_0x25d6a7) {
    console.error("Failed to announce guess-game winner:", _0x25d6a7.message || _0x25d6a7);
  }
}
async function enforceMute(_0x5188ac, _0x751d80) {
  if (!_0x751d80.isGroup || _0x751d80.fromMe || !_0x751d80.body) return;
  if (!global.db.groups[_0x751d80.chat]?.mutedUsers?.[_0x751d80.sender]) return;
  try {
    await _0x5188ac.sendMessage(_0x751d80.chat, { delete: _0x751d80.key });
  } catch (_0x3f16b8) {
    console.error("Mute enforcement failed:", _0x3f16b8.message || _0x3f16b8);
  }
}
const BAD_WORDS = ["fuck", "shit", "bitch", "asshole", "bastard", "nigger", "cunt", "whore", "slut", "dick", "pussy"];
async function enforceAntibadword(_0x33c4bf, _0x3df652) {
  if (!_0x3df652.isGroup || _0x3df652.fromMe || !_0x3df652.body) return;
  if (!global.db.groups[_0x3df652.chat]?.antibadword) return;
  if (!BAD_WORDS.some((_0x2aa162) => new RegExp("\\b" + _0x2aa162 + "\\b", "i").test(_0x3df652.body))) return;
  try {
    const _0x2c70d0 = await getGroupMetadata(_0x33c4bf, _0x3df652.chat), _0x4c7eb9 = _0x2c70d0.participants.find((_0x3bb927) => _0x3bb927.id === _0x3df652.sender);
    if (_0x4c7eb9?.admin) return;
    await _0x33c4bf.sendMessage(_0x3df652.chat, { delete: _0x3df652.key }), await _0x33c4bf.sendMessage(_0x3df652.chat, { text: bold("ES TEAMS V1 ANTIBADWORD") + "\n\n\u{1F92C} @" + _0x3df652.sender.split("@")[0] + ", please avoid profanity in this group.", mentions: [_0x3df652.sender], ...channelInfo() });
  } catch (_0x191fde) {
    console.error("Antibadword enforcement failed:", _0x191fde.message || _0x191fde);
  }
}
const react = (_0x335d05, _0x5d5267, _0x4ed39f) => _0x335d05.sendMessage(_0x5d5267.chat, { react: { text: _0x4ed39f, key: _0x5d5267.key } }).catch(() => {
});
async function handleProfilePic(_0x545aeb, _0x39d8a0) {
  if (!_0x39d8a0.fromMe || _0x39d8a0.isGroup || _0x39d8a0.prefix !== global.xprefix || _0x39d8a0.command?.toLowerCase() !== "pp") return false;
  const _0x1dda9f = _0x39d8a0.mentionedJid?.[0] || _0x39d8a0.quoted && _0x39d8a0.quoted.sender || _0x39d8a0.chat;
  try {
    react(_0x545aeb, _0x39d8a0, "\u23F3");
    const _0x3befc9 = await _0x545aeb.profilePictureUrl(_0x1dda9f, "image"), _0x2ad0e5 = _0x545aeb.decodeJid(_0x545aeb.user.id);
    await _0x545aeb.sendMessage(_0x2ad0e5, { image: { url: _0x3befc9 }, caption: bold("ES TEAMS V1 PROFILE PICTURE") + "\n\n@" + _0x1dda9f.split("@")[0], mentions: [_0x1dda9f], ...channelInfo() }), react(_0x545aeb, _0x39d8a0, "\u2705");
  } catch (_0x55b9d8) {
    react(_0x545aeb, _0x39d8a0, "");
  }
  return true;
}
const extraCommands = require("./lib/esteamsCommands")({ api, bold, sendBrandedReply, requireArg, requireQuotedImage, channelInfo });
extraCommands.addToMenu(MENU_SECTIONS);
const RESERVED_VIEW_ONCE_COMMANDS = new Set(["menu", "start", "sticker", "shazam", "wasted", "triggered", "pp", "public", "restart", "vv", "vo", "viewonce", "rvo", "setvvcmd", "setvv", "vvcommand"]);
function isReservedViewOnceCommand(name) {
  if (RESERVED_VIEW_ONCE_COMMANDS.has(name) || Object.prototype.hasOwnProperty.call(extraCommands.handlers, name)) return true;
  return MENU_SECTIONS.some((section) => section.commands.some((entry) => entry.trim().split(/[\s<|(]/, 1)[0].toLowerCase() === name));
}
async function handleOwnerMediaCommand(sock, m, command) {
  const sessionJid = sock.decodeJid ? sock.decodeJid(sock.user?.id) : sock.user?.id;
  if (!sessionJid || !global.db) return false;
  global.db.settings = global.db.settings || {};
  const settings = global.db.settings[sessionJid] = global.db.settings[sessionJid] || {};
  const action = resolveCommandAction(command, getConfiguredCommand(settings));
  if (!action) return false;
  if (!m.fromMe || !m.key?.fromMe) throw new Error("Only the bot account owner can use this media command.");

  if (action === "configure") {
    if (!m.args?.[0]) throw new Error("Usage: " + global.xprefix + "setvvcmd <name> (or " + global.xprefix + "setvvcmd reset)");
    const customCommand = normalizeConfiguredCommand(m.args[0]);
    if (customCommand !== "vv" && isReservedViewOnceCommand(customCommand)) {
      throw new Error("That command name is already used by another bot command. Choose a different name.");
    }
    settings.viewOnceCommand = customCommand;
    await m.reply("✅ The media command is now " + global.xprefix + customCommand + ". Use " + global.xprefix + "rvo to reset it to " + global.xprefix + "vv.");
    return true;
  }

  if (action === "reset") {
    settings.viewOnceCommand = "vv";
    await m.reply("✅ The media command has been reset to " + global.xprefix + "vv.");
    return true;
  }

  const contexts = [m.msg?.contextInfo, ...Object.values(m.message || {}).map((content) => content?.contextInfo)];
  const ctx = contexts.find((context) => context?.stanzaId) || {};
  const rawQuotedMessage = getRawQuotedMessage(m);
  const quotedKey = m.quoted?.key || {};
  const quoteKey = {
    ...quotedKey,
    remoteJid: ctx.remoteJid || quotedKey.remoteJid || m.chat,
    id: ctx.stanzaId || quotedKey.id || m.quoted?.id,
    ...(ctx.participant || quotedKey.participant ? { participant: ctx.participant || quotedKey.participant } : {}),
    ...(m.key?.remoteJidAlt || quotedKey.remoteJidAlt ? { remoteJidAlt: m.key?.remoteJidAlt || quotedKey.remoteJidAlt } : {}),
  };
  if (!quoteKey.id || !quoteKey.remoteJid) {
    await sock.sendMessage(sessionJid, { text: "ℹ️ Reply to the View Once photo, video, or voice note with " + global.xprefix + getConfiguredCommand(settings) + ". The bot must have received the original media payload." }).catch(() => {});
    return true;
  }

  const storedMessage = getStoredWAMessage(sock.__viewOnceMessageStore, quoteKey);
  const vvSources = [["original copy", storedMessage], ["quoted copy", rawQuotedMessage]].filter(([, message]) => message);
  const vvNotes = [];
  if (!vvSources.length) vvNotes.push("No message copy is available. The bot may have been offline, the message may have been evicted from the bounded cache, or WhatsApp may have delivered only a stub.");

  let vvBuffer = null;
  let vvFound = null;
  for (const [label, source] of vvSources) {
    const descriptor = inspectMediaMessage(source);
    if (!descriptor.media || !["media", "view-once"].includes(descriptor.status)) {
      vvNotes.push(label + ": no supported image, video, or audio payload");
      continue;
    }
    vvNotes.push(label + ": " + descriptor.kind + (descriptor.viewOnce ? " (view-once)" : "") + ", mediaKey " + (descriptor.media.mediaKey ? "yes" : "no") + ", directPath " + (descriptor.media.directPath ? "yes" : "no"));
    try {
      vvBuffer = await downloadQuotedMedia({
        sock,
        rawMessage: source,
        quoteKey,
        downloadMediaMessage,
        downloadContentFromMessage,
      });
      vvFound = descriptor;
      break;
    } catch (error) {
      vvNotes.push(label + " download error: " + (error?.message || error));
      vvBuffer = null;
    }
  }
  if (!vvFound || !Buffer.isBuffer(vvBuffer) || !vvBuffer.length) {
    const details = vvNotes.join("\n") || "No supported media payload was found.";
    await sock.sendMessage(sessionJid, { text: "❌ " + global.xprefix + getConfiguredCommand(settings) + " failed\nChat: " + String(m.chat || "").split("@")[0] + "\n" + details + "\n\nWhatsApp may not provide View Once media to this linked device. If no media payload was delivered, Baileys cannot recover it." }).catch(() => {});
    return true;
  }

  const caption = "🔓 View Once saved\n💬 Chat: " + String(m.chat || "").split("@")[0] +
    (ctx.participant ? "\n👤 Sender: " + String(ctx.participant).split("@")[0].split(":")[0] : "") +
    (vvFound.media.caption ? "\n📝 " + String(vvFound.media.caption).slice(0, 1024) : "");
  if (vvFound.kind === "image") {
    await sock.sendMessage(sessionJid, { image: vvBuffer, caption, mimetype: vvFound.media.mimetype || "image/jpeg" });
  } else if (vvFound.kind === "video") {
    await sock.sendMessage(sessionJid, { video: vvBuffer, caption, mimetype: vvFound.media.mimetype || "video/mp4" });
  } else {
    await sock.sendMessage(sessionJid, { audio: vvBuffer, mimetype: vvFound.media.mimetype || "audio/ogg; codecs=opus", ptt: !!vvFound.media.ptt });
    await sock.sendMessage(sessionJid, { text: caption });
  }
  await m.reply("✅ The " + (vvFound.viewOnce ? "View Once " : "") + vvFound.kind + " was sent to this bot session's DM.");
  return true;
}
module.exports = async (sock, m) => {
  const _0x880b9e = m.reply.bind(m);
  m.reply = (_0x3dfca8, _0x46e311 = {}) => _0x880b9e(_0x3dfca8, { ...channelInfo(), ..._0x46e311 }), await enforceAntilink(sock, m), await enforceMute(sock, m), await enforceAntibadword(sock, m), await handleChatbotReply(sock, m), await handlePendingGuess(sock, m), await awardPassiveXp(sock, m);
  if (await handleProfilePic(sock, m)) return;
  if (!m.body || m.prefix !== global.xprefix) return;
  const command = m.command?.toLowerCase();
  react(sock, m, "\u23F3");
  const plainReply = m.reply;
  m.reply = (text, options = {}) => plainReply(typeof text === "string" && !text.includes(bold("ES TEAMS V1")) ? bold("ES TEAMS V1 " + String(command).toUpperCase()) + "\n\n" + text : text, options);
  try {
    if (await handleOwnerMediaCommand(sock, m, command)) {
      await react(sock, m, "\u2705");
      return;
    }
    switch (command) {
      case "menu":
      case "start": {
        await sendBrandedReply(sock, m, { image: global.botImage, body: buildMenu() });
        break;
      }
      case "ping": {
        const started = Date.now();
        await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 PING") + "\n\n" + bold("Speed:") + " " + (Date.now() - started) + "ms" });
        break;
      }
      case "runtime": {
        await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 RUNTIME") + "\n\n" + bold("Uptime:") + " " + runtime(process.uptime()) });
        break;
      }
      case "tiktok": {
        const link = requireArg(m.args, global.xprefix + "tiktok <video link>");
        const result = await api.downloadTiktok(link);
        const body = bold("ES TEAMS V1 TIKTOK DOWNLOADER") + "\n\n" + bold("Author:") + " " + (result.author || "Unknown") + "\n" + bold("Description:") + " " + (result.description || "No description");
        if (result.video) {
          await sendBrandedReply(sock, m, { video: result.video, body });
        } else {
          await sendBrandedReply(sock, m, { image: result.images[0], body: body + "\n" + bold("Photos:") + " " + result.images.length });
          for (const image of result.images.slice(1, 10)) await sock.sendMessage(m.chat, { image: { url: image }, ...channelInfo() }, { quoted: m });
        }
        break;
      }
      case "facebook": {
        const link = requireArg(m.args, global.xprefix + "facebook <video link>");
        const { videoUrl, title } = await api.downloadFacebook(link);
        await sendBrandedReply(sock, m, { video: videoUrl, body: bold("ES TEAMS V1 FACEBOOK DOWNLOADER") + (title ? "\n\n" + bold("Title:") + " " + title : "") });
        break;
      }
      case "instagram": {
        const link = requireArg(m.args, global.xprefix + "instagram <reel/post link>");
        const { videoUrl, imageUrl, caption } = await api.downloadInstagram(link);
        const body = bold("ES TEAMS V1 INSTAGRAM DOWNLOADER") + (caption ? "\n\n" + bold("Caption:") + " " + String(caption).slice(0, 500) : "");
        await sendBrandedReply(sock, m, videoUrl ? { video: videoUrl, body } : { image: imageUrl, body });
        break;
      }
      case "twitter": {
        const link = requireArg(m.args, global.xprefix + "twitter <tweet link>");
        const { videoUrl, text } = await api.downloadTwitter(link);
        await sendBrandedReply(sock, m, { video: videoUrl, body: bold("ES TEAMS V1 TWITTER DOWNLOADER") + (text ? "\n\n" + bold("Tweet:") + " " + String(text).slice(0, 400) : "") });
        break;
      }
      case "ytmp4": {
        {
          const _0x5914d5 = requireArg(m.args, global.xprefix + "ytmp4 <youtube link>"), _0x340dc8 = await api.downloadYoutube(_0x5914d5), _0x18d212 = bold("ES TEAMS V1 YOUTUBE DOWNLOADER") + "\n\n" + bold("Title:") + " " + _0x340dc8.title + "\n" + bold("Quality:") + " " + _0x340dc8.quality;
          await sendBrandedReply(sock, m, { video: _0x340dc8.download_url, body: _0x18d212 });
          break;
        }
      }
      case "spotify": {
        const link = requireArg(m.args, global.xprefix + "spotify <spotify track link>");
        if (!link.startsWith("https://open.spotify.com/track/")) throw new Error("Please provide a valid Spotify track link.");
        const track = await api.downloadSpotify(link);
        const body = bold("ES TEAMS V1 SPOTIFY DOWNLOADER") + "\n\n" + bold("Title:") + " " + track.title + "\n" + bold("Artist:") + " " + (track.channel || "Unknown");
        await sendBrandedReply(sock, m, { image: track.thumbnail || global.botImage, body, extraButtons: [{ displayText: "Download Now", url: track.DownloadLink }] });
        break;
      }
      case "play": {
        {
          const _0x34f2fa = requireArg(m.args, global.xprefix + "play <song name>"), _0x471af3 = await api.downloadSong(_0x34f2fa);
          await sendBrandedReply(sock, m, { image: _0x471af3.thumbnail || global.botImage, body: bold("ES TEAMS V1 MUSIC DOWNLOADER") + "\n\n" + bold("Title:") + " " + _0x471af3.title }), await sock.sendMessage(m.chat, { audio: { url: _0x471af3.audio.download_url }, mimetype: "audio/mpeg", ...channelInfo() }, { quoted: m });
          break;
        }
      }
      case "video": {
        const _0x1a39e6 = requireArg(m.args, global.xprefix + "video <title>"), _0x4bc588 = await api.downloadVideoSong(_0x1a39e6);
        await sendBrandedReply(sock, m, { image: _0x4bc588.thumbnail || global.botImage, body: bold("ES TEAMS V1 VIDEO DOWNLOADER") + "\n\n" + bold("Title:") + " " + _0x4bc588.title }), await sock.sendMessage(m.chat, { video: { url: _0x4bc588.videoUrl }, mimetype: "video/mp4", ...channelInfo() }, { quoted: m });
        break;
      }
      case "apk": {
        const name = requireArg(m.args, global.xprefix + "apk <app name>");
        const app = await api.downloadApk(name);
        const body = bold("ES TEAMS V1 APK DOWNLOADER") + "\n\n" + bold("App Name:") + " " + app.apk_name;
        await sendBrandedReply(sock, m, { image: app.thumbnail || global.botImage, body, extraButtons: [{ displayText: "Open Download Page", url: app.download_link }] });
        break;
      }
      case "gdrive": {
        const link = requireArg(m.args, global.xprefix + "gdrive <google drive link>");
        const file = await api.downloadGdrive(link);
        const body = bold("ES TEAMS V1 GOOGLE DRIVE") + "\n\n" + bold("Name:") + " " + file.name + "\n" + bold("Size:") + " " + file.size + (file.mimeType ? "\n" + bold("Type:") + " " + file.mimeType : "");
        await sendBrandedReply(sock, m, { image: file.thumbnail || global.botImage, body, extraButtons: [{ displayText: "Download File", url: file.download_link }] });
        break;
      }
      case "webdl": {
        const link = requireArg(m.args, global.xprefix + "webdl <website url>");
        const result = await api.downloadWebsite(link);
        const body = bold("ES TEAMS V1 WEBSITE DOWNLOADER") + (result.contentType ? "\n\n" + bold("Type:") + " " + result.contentType : "") + "\n" + bold("Size:") + " " + result.size;
        await sendBrandedReply(sock, m, { image: global.botImage, body, extraButtons: [{ displayText: "Download", url: result.downloadUrl }] });
        break;
      }
      case "lyrics": {
        {
          const _0x581da2 = requireArg(m.args, global.xprefix + "lyrics <song name>"), { artist: _0x4d7379, title: _0x5d487d, lyrics: _0x3aa6e4 } = await api.getLyrics(_0x581da2), _0x669008 = _0x3aa6e4.length > 1500 ? _0x3aa6e4.slice(0, 1500) + "\n\n...(truncated)" : _0x3aa6e4, _0x70d785 = bold("ES TEAMS V1 LYRICS") + "\n\n" + bold("Artist:") + " " + _0x4d7379 + "\n" + bold("Title:") + " " + _0x5d487d + "\n\n" + _0x669008;
          await sendBrandedReply(sock, m, { image: global.botImage, body: _0x70d785 });
          break;
        }
      }
      case "weather": {
        const city = requireArg(m.args, global.xprefix + "weather <city>");
        const weather = await api.getWeather(city);
        const body = bold("ES TEAMS V1 WEATHER") + "\n\n" + bold("Location:") + " " + weather.location + "\n" + bold("Condition:") + " " + weather.condition + "\n" + bold("Temperature:") + " " + weather.temperature_c + "\xB0C\n" + bold("Wind Speed:") + " " + weather.windspeed_kmh + " km/h" + (weather.observed_at ? "\n" + bold("Observed:") + " " + String(weather.observed_at).replace("T", " ") : "");
        await sendBrandedReply(sock, m, { image: global.botImage, body });
        break;
      }
      case "technews": {
        const stories = await api.getTechNews(5);
        const list = stories.map((story, index) => bold(String(index + 1) + ". ") + story.title + "\n" + bold("Score:") + " " + story.score + (story.author ? "  " + bold("By:") + " " + story.author : "") + "\n" + story.url).join("\n\n");
        await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 TECH NEWS") + "\n\n" + list });
        break;
      }
      case "ttstalk": {
        const username = requireArg(m.args, global.xprefix + "ttstalk <username>");
        const { user, stats } = await api.tiktokStalk(username);
        const body = bold("ES TEAMS V1 TIKTOK STALKER") + "\n\n" + bold("Username:") + " " + user.uniqueId + "\n" + bold("Nickname:") + " " + user.nickname + "\n" + bold("Verified:") + " " + (user.verified ? "Yes" : "No") + "\n" + bold("Followers:") + " " + stats.followerCount.toLocaleString() + "\n" + bold("Following:") + " " + stats.followingCount.toLocaleString() + "\n" + bold("Likes:") + " " + stats.heartCount.toLocaleString() + "\n" + bold("Videos:") + " " + stats.videoCount.toLocaleString() + (user.bio ? "\n" + bold("Bio:") + " " + user.bio : "");
        await sendBrandedReply(sock, m, { image: user.avatarLarger || global.botImage, body });
        break;
      }
      case "igstalk": {
        const username = requireArg(m.args, global.xprefix + "igstalk <username>");
        const profile = await api.igStalk(username);
        const body = bold("ES TEAMS V1 INSTAGRAM STALKER") + "\n\n" + bold("Username:") + " " + profile.username + (profile.name ? "\n" + bold("Name:") + " " + profile.name : "") + (profile.bio ? "\n" + bold("Bio:") + " " + profile.bio : "");
        await sendBrandedReply(sock, m, { image: profile.avatar || global.botImage, body });
        break;
      }
      case "qr": {
        {
          const _0x330c23 = requireArg(m.args, global.xprefix + "qr <text or link>"), _0x3d5de = await api.generateQr(_0x330c23);
          await sendBrandedReply(sock, m, { image: _0x3d5de, body: bold("ES TEAMS V1 QR CODE") });
          break;
        }
      }
      case "tinyurl": {
        const _0x2edc47 = requireArg(m.args, global.xprefix + "tinyurl <link>"), _0x995f7f = await api.shortenUrl(_0x2edc47);
        await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 URL SHORTENER") + "\n\n" + _0x995f7f });
        break;
      }
      case "removebg": {
        const _0x4486a2 = requireQuotedImage(m, "Reply to an image with " + global.xprefix + "removebg"), _0x2109af = await _0x4486a2.download(), _0x226bbc = await api.uploadImage(_0x2109af, "image.jpg");
        if (!_0x226bbc.startsWith("https://")) throw new Error("Failed to upload the image.");
        const _0x200bc9 = await api.removeBg(_0x226bbc);
        await sendBrandedReply(sock, m, { image: _0x200bc9, body: bold("ES TEAMS V1 BACKGROUND REMOVER") });
        break;
      }
      case "ssweb": {
        const _0x318ee9 = requireArg(m.args, global.xprefix + "ssweb <website url>");
        if (!_0x318ee9.startsWith("http")) throw new Error("Please provide a valid website URL.");
        const _0x1c922c = await api.screenshotWebsite(_0x318ee9);
        await sendBrandedReply(sock, m, { image: _0x1c922c, body: bold("ES TEAMS V1 WEBSITE SCREENSHOT") });
        break;
      }
      case "flux": {
        {
          const _0x49aacf = requireArg(m.args, global.xprefix + "flux <image prompt>"), _0x43a322 = await api.generateFlux(_0x49aacf);
          await sendBrandedReply(sock, m, { image: _0x43a322, body: bold("ES TEAMS V1 AI IMAGE GENERATOR") });
          break;
        }
      }
      case "write": {
        const text = requireArg(m.args, global.xprefix + "write <your text>");
        const image = await api.generateBookQuote(text);
        await sendBrandedReply(sock, m, { image, body: bold("ES TEAMS V1 BOOK WRITER") });
        break;
      }
      case "logo": {
        {
          const _0x4fc4a7 = requireArg(m.args, global.xprefix + "logo <header> | <subtitle>"), [_0x15b8d7, _0x31093a = ""] = _0x4fc4a7.split("|").map((_0x2f9c0c) => _0x2f9c0c.trim());
          if (!_0x15b8d7) throw new Error("Invalid input.\n\nUsage: " + global.xprefix + "logo <header> | <subtitle>");
          let _0x21773f = "https://i.pinimg.com/736x/2f/9c/95/2f9c955cbc2dc6038b4d8a6f23271771.jpg";
          if (m.quoted && m.quoted.isMedia && /image/i.test(m.quoted.mime || "")) {
            {
              const _0x2a2aa8 = await m.quoted.download(), _0x4c1d6f = await api.uploadImage(_0x2a2aa8, "bg.jpg");
              if (_0x4c1d6f.startsWith("https://")) _0x21773f = _0x4c1d6f;
            }
          }
          const _0x2c263d = await api.generateLogo(_0x21773f, _0x15b8d7, _0x31093a || "ES TEAMS TECH");
          await sendBrandedReply(sock, m, { image: _0x2c263d, body: bold("ES TEAMS V1 LOGO MAKER") });
          break;
        }
      }
      case "gpt": {
        const _0x15e307 = requireArg(m.args, global.xprefix + "gpt <question>"), _0x32b19b = await api.askGpt(_0x15e307);
        await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 AI") + "\n\n" + _0x32b19b });
        break;
      }
      case "sticker": {
        const _0x53cc6c = m.quoted && m.quoted.isMedia ? m.quoted : m.isMedia ? m : null;
        if (!_0x53cc6c || !/image|video/i.test(_0x53cc6c.mime || "")) throw new Error("Reply to an image or video with " + global.xprefix + "sticker");
        const _0x262326 = await _0x53cc6c.download(), _0x51d19f = /video/i.test(_0x53cc6c.mime) ? await videoToWebp(_0x262326) : await imageToWebp(_0x262326), _0x2f426c = await addExif(_0x51d19f, global.packname, global.author);
        await sock.sendMessage(m.chat, { sticker: _0x2f426c }, { quoted: m });
        break;
      }
      case "shazam": {
        const media = m.quoted && m.quoted.isMedia ? m.quoted : m.isMedia ? m : null;
        if (!media || !/audio|video/i.test(media.mime || "")) throw new Error("Reply to an audio or video with " + global.xprefix + "shazam");
        const buffer = await media.download();
        const song = await api.recognizeSong(buffer, /video/i.test(media.mime) ? "clip.mp4" : "clip.mp3");
        const body = bold("ES TEAMS V1 SHAZAM") + "\n\n" + bold("Song:") + " " + song.title + "\n" + bold("Artist:") + " " + song.artist + "\n" + bold("Album:") + " " + (song.album || "Unknown") + (song.releaseDate ? "\n" + bold("Released:") + " " + song.releaseDate : "");
        const extraButtons = [];
        if (song.spotifyUrl) extraButtons.push({ displayText: "Spotify", url: song.spotifyUrl });
        if (song.appleMusicUrl) extraButtons.push({ displayText: "Apple Music", url: song.appleMusicUrl });
        if (song.songLink) extraButtons.push({ displayText: "More Links", url: song.songLink });
        await sendBrandedReply(sock, m, { image: song.image || global.botImage, body, extraButtons });
        break;
      }
      case "wasted": {
        const _0x2ab2a3 = requireQuotedImage(m, "Reply to an image with " + global.xprefix + "wasted"), _0x1a4360 = await _0x2ab2a3.download(), _0x213ed8 = await api.uploadImage(_0x1a4360, "image.jpg");
        if (!_0x213ed8.startsWith("https://")) throw new Error("Failed to upload the image.");
        const _0x23ee71 = await api.applyCanvasEffect("wasted", _0x213ed8);
        await sendBrandedReply(sock, m, { image: _0x23ee71, body: bold("ES TEAMS V1 WASTED") });
        break;
      }
      case "triggered": {
        const _0x429cad = requireQuotedImage(m, "Reply to an image with " + global.xprefix + "triggered"), _0x4ba6a6 = await _0x429cad.download(), _0x303bef = await api.uploadImage(_0x4ba6a6, "image.jpg");
        if (!_0x303bef.startsWith("https://")) throw new Error("Failed to upload the image.");
        const _0x101f49 = await api.applyCanvasEffect("triggered", _0x303bef);
        await sendBrandedReply(sock, m, { image: _0x101f49, body: bold("ES TEAMS V1 TRIGGERED") });
        break;
      }
      case "joke": {
        const { joke } = await api.getJoke();
        await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 JOKE") + "\n\n\u{1F602} " + joke });
        break;
      }
      case "quran": {
        const reference = requireArg(m.args, global.xprefix + "quran <surah number 1-114 or surah:ayah, e.g. 2:255>");
        const verse = await api.getQuran(reference);
        const body = bold("ES TEAMS V1 QURAN READER") + "\n\n" + bold("Surah:") + " " + (verse.surah || verse.reference) + "\n" + bold("Verse:") + " " + verse.reference + "\n\n" + String(verse.text).trim();
        await sendBrandedReply(sock, m, { image: global.botImage, body });
        break;
      }
      case "bible": {
        const reference = requireArg(m.args, global.xprefix + "bible <e.g. John 3:16>");
        const passage = await api.getBible(reference);
        const body = bold("ES TEAMS V1 BIBLE READER") + "\n\n" + bold("Passage:") + " " + passage.reference + (passage.translation ? "\n" + bold("Translation:") + " " + passage.translation : "") + "\n\n" + passage.text.trim();
        await sendBrandedReply(sock, m, { image: global.botImage, body });
        break;
      }
      case "horoscope": {
        {
          const _0x265699 = requireArg(m.args, global.xprefix + "horoscope <sign, e.g. aries>").toLowerCase(), _0x2fde19 = await api.getHoroscope(_0x265699), _0x55cdf4 = bold("ES TEAMS V1 HOROSCOPE") + "\n\n" + bold("Sign:") + " " + _0x2fde19.sign + "\n" + bold("Date:") + " " + _0x2fde19.date + "\n\n" + _0x2fde19.horoscope;
          await sendBrandedReply(sock, m, { image: global.botImage, body: _0x55cdf4 });
          break;
        }
      }
      case "trend": {
        {
          const _0x58927f = await api.getTrendingCoins(), _0x45fbab = bold("ES TEAMS V1 CRYPTO TRENDS") + "\n\nTop trending coins (24h):\n\n" + _0x58927f.map((_0x3a7e90) => _0x3a7e90.rank + ". " + _0x3a7e90.name + " (" + _0x3a7e90.symbol + ")\n\u{1F4B0} " + _0x3a7e90.price + "  \u{1F4CA} " + _0x3a7e90.change24h + "  \u{1F3C5} " + _0x3a7e90.marketRank).join("\n\n");
          await sendBrandedReply(sock, m, { image: global.botImage, body: _0x45fbab });
          break;
        }
      }
      case "jid": {
        const target = resolveTarget(m) || m.chat;
        await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 JID") + "\n\n" + bold("JID:") + " " + target });
        break;
      }
      case "info": {
        {
          const _0x272a07 = resolveTarget(m);
          if (!_0x272a07) throw new Error("Usage: " + global.xprefix + "info <number> (or reply to their message)");
          const _0x559142 = await sock.getName(_0x272a07);
          let _0xd0926d = "Not available";
          try {
            const _0x8151f9 = await sock.fetchStatus(_0x272a07);
            if (_0x8151f9?.status) _0xd0926d = _0x8151f9.status;
          } catch {
          }
          let _0x171561 = global.botImage;
          try {
            _0x171561 = await sock.profilePictureUrl(_0x272a07, "image");
          } catch {
          }
          const _0x3e5614 = bold("ES TEAMS V1 USER INFO") + "\n\n" + bold("Name:") + " " + _0x559142 + "\n" + bold("Number:") + " +" + _0x272a07.split("@")[0] + "\n" + bold("About:") + " " + _0xd0926d;
          await sendBrandedReply(sock, m, { image: _0x171561, body: _0x3e5614 });
          break;
        }
      }
      case "sysinfo": {
        {
          const _0x19a6e0 = os.totalmem(), _0x1b7642 = os.freemem(), _0x3cb9c6 = Math.round((_0x19a6e0 - _0x1b7642) / _0x19a6e0 * 100), _0x8fa9d3 = Math.min(Math.round(os.loadavg()[0] / os.cpus().length * 100), 100), _0x3362a7 = (_0x4053fa, _0x178fea = 12) => "\u2588".repeat(Math.round(_0x4053fa / 100 * _0x178fea)) + "\u2591".repeat(_0x178fea - Math.round(_0x4053fa / 100 * _0x178fea)), _0x26e558 = bold("ES TEAMS V1 SYSTEM INFO") + "\n\n\u{1F4BE} RAM: " + _0x3362a7(_0x3cb9c6) + " " + _0x3cb9c6 + "%\n\u26A1 CPU: " + _0x3362a7(_0x8fa9d3) + " " + _0x8fa9d3 + "%\n\u23F1 " + bold("Uptime:") + " " + runtime(process.uptime());
          await sendBrandedReply(sock, m, { image: global.botImage, body: _0x26e558 });
          break;
        }
      }
      case "tempmail": {
        const inbox = await api.createTempMail();
        const body = bold("ES TEAMS V1 TEMP MAIL") + "\n\n" + bold("Email:") + " " + inbox.email + "\n" + bold("Mail Key:") + " " + inbox.session_id + "\n\nUse " + global.xprefix + "checkmail " + inbox.session_id + " to check the inbox.";
        await sendBrandedReply(sock, m, { image: global.botImage, body });
        break;
      }
      case "checkmail": {
        const _0x1471cc = requireArg(m.args, global.xprefix + "checkmail <mail key>"), _0x10c054 = await api.checkTempMail(_0x1471cc), _0xe09fc = _0x10c054.slice(0, 5).map((_0x3c1715, _0x13c50) => bold("Mail " + (_0x13c50 + 1)) + "\n" + bold("From:") + " " + _0x3c1715.fromAddr + "\n" + bold("Subject:") + " " + _0x3c1715.headerSubject + "\n\n" + _0x3c1715.text).join("\n\n\u2014\u2014\u2014\n\n");
        await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 MAIL INBOX") + "\n\n" + _0xe09fc });
        break;
      }
      case "imgscan": {
        {
          const _0x42e99e = requireQuotedImage(m, "Reply to an image with " + global.xprefix + "imgscan"), _0xf3d41a = await _0x42e99e.download(), _0x4a9981 = await api.uploadImage(_0xf3d41a, "image.jpg");
          if (!_0x4a9981.startsWith("https://")) throw new Error("Failed to upload the image.");
          const _0x3135d0 = await api.scanImage(_0x4a9981);
          await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 IMAGE SCANNER") + "\n\n" + _0x3135d0 });
          break;
        }
      }
      case "scanqr": {
        const _0x3da814 = requireQuotedImage(m, "Reply to an image containing a QR code with " + global.xprefix + "scanqr"), _0x2c598b = await _0x3da814.download(), _0x3291c8 = await api.uploadImage(_0x2c598b, "qr.jpg");
        if (!_0x3291c8.startsWith("https://")) throw new Error("Failed to upload the image.");
        const _0x1c9dec = await api.readQrFromImage(_0x3291c8);
        await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 QR READER") + "\n\n" + _0x1c9dec });
        break;
      }
      case "jail": {
        {
          const _0x4dfbaf = requireQuotedImage(m, "Reply to an image with " + global.xprefix + "jail"), _0x3911b9 = await _0x4dfbaf.download(), _0x34f3cb = await api.uploadImage(_0x3911b9, "image.jpg");
          if (!_0x34f3cb.startsWith("https://")) throw new Error("Failed to upload the image.");
          const _0xdafb56 = await api.applyJailFilter(_0x34f3cb);
          await sendBrandedReply(sock, m, { image: _0xdafb56, body: bold("ES TEAMS V1 JAIL FILTER") });
          break;
        }
      }
      case "poll": {
        const _0x87020 = requireArg(m.args, global.xprefix + "poll <question> | <option1, option2, ...>"), [_0x11acc3, _0x21d64a] = _0x87020.split("|").map((_0x1805d8) => _0x1805d8.trim()), _0xb6e2a = (_0x21d64a || "").split(",").map((_0x1c39c4) => _0x1c39c4.trim()).filter(Boolean);
        if (!_0x11acc3 || _0xb6e2a.length < 2) throw new Error("Usage: " + global.xprefix + "poll <question> | <option1, option2, ...>\n\nAt least 2 options are required.");
        await sock.sendPoll(m.chat, _0x11acc3, _0xb6e2a);
        break;
      }
      case "chatbot": {
        if (m.isGroup) await requireGroupAdmin(sock, m);
        const _0x310011 = m.args[0]?.toLowerCase();
        global.db.groups[m.chat] = global.db.groups[m.chat] || {};
        if (_0x310011 === "on") global.db.groups[m.chat].chatbot = true, await m.reply("\u2705 Chatbot mode enabled \u2014 I will reply to messages here using AI.");
        else {
          if (_0x310011 === "off") global.db.groups[m.chat].chatbot = false, await m.reply("\u2705 Chatbot mode disabled.");
          else throw new Error("Usage: " + global.xprefix + "chatbot on | " + global.xprefix + "chatbot off");
        }
        break;
      }
      case "trivia": {
        {
          const _0x46a68d = await api.getTrivia(), _0x8c567a = _0x46a68d.options.map((_0x36b54c, _0x2c2014) => String.fromCharCode(65 + _0x2c2014) + ". " + _0x36b54c).join("\n"), _0x3b3484 = bold("ES TEAMS V1 TRIVIA") + "\n\n" + bold("Category:") + " " + _0x46a68d.category + "\n\n" + _0x46a68d.question + "\n\n" + _0x8c567a + "\n\n\u23F3 30 seconds \u2014 reply with the answer!";
          pendingGuessGames.set(m.chat, { answer: _0x46a68d.answer }), await sendBrandedReply(sock, m, { image: global.botImage, body: _0x3b3484 }), setTimeout(async () => {
            if (pendingGuessGames.get(m.chat)?.answer === _0x46a68d.answer) {
              pendingGuessGames.delete(m.chat), await m.reply("\u231B Time's up! The correct answer was: " + bold(_0x46a68d.answer)).catch(() => {
              });
            }
          }, 3e4);
          break;
        }
      }
      case "riddle": {
        const _0x377a42 = RIDDLES[Math.floor(Math.random() * RIDDLES.length)];
        pendingGuessGames.set(m.chat, { answer: _0x377a42.a }), await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 RIDDLE") + "\n\n\u{1F9E9} " + _0x377a42.q + "\n\n\u23F3 60 seconds \u2014 reply with your answer!" }), setTimeout((async () => {
          {
            if (pendingGuessGames.get(m.chat)?.answer === _0x377a42.a) {
              pendingGuessGames.delete(m.chat), await m.reply("\u231B Time's up! The answer was: " + bold(_0x377a42.a)).catch(() => {
              });
            }
          }
        }), 6e4);
        break;
      }
      case "8ball": {
        const question = requireArg(m.args, global.xprefix + "8ball <question>");
        const answer = EIGHT_BALL_ANSWERS[Math.floor(Math.random() * EIGHT_BALL_ANSWERS.length)];
        await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 MAGIC 8 BALL") + "\n\n\u{1F3B1} " + bold("Question:") + " " + question + "\n" + bold("Answer:") + " " + answer });
        break;
      }
      case "truth": {
        const question = TRUTH_QUESTIONS[Math.floor(Math.random() * TRUTH_QUESTIONS.length)];
        await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 TRUTH") + "\n\n\u{1F633} " + question });
        break;
      }
      case "dare": {
        const prompt = DARE_PROMPTS[Math.floor(Math.random() * DARE_PROMPTS.length)];
        await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 DARE") + "\n\n\u{1F525} " + prompt });
        break;
      }
      case "ship": {
        if (!m.isGroup) throw new Error("This command can only be used in a group.");
        const mentioned = m.mentionedJid || [];
        let first, second;
        if (mentioned.length >= 2) [first, second] = mentioned;
        else if (mentioned.length === 1) {
          first = m.sender;
          second = mentioned[0];
        } else throw new Error("Usage: " + global.xprefix + "ship @user1 @user2");
        const percent = Math.floor(Math.random() * 101), filled = Math.round(percent / 10), meter = "\u2588".repeat(filled) + "\u2591".repeat(10 - filled);
        await sock.sendMessage(m.chat, { text: bold("ES TEAMS V1 SHIP") + "\n\n\u{1F498} @" + first.split("@")[0] + " + @" + second.split("@")[0] + "\n\n" + bold("Match:") + " " + meter + " " + percent + "%", mentions: [first, second], ...channelInfo() }, { quoted: m });
        break;
      }
      case "level":
      case "rank": {
        {
          if (!m.isGroup) throw new Error("This command can only be used in a group.");
          const _0x265d27 = resolveTarget(m) || m.sender, _0x520f7b = global.db.groups[m.chat]?.xp || {}, _0x2f40ee = _0x520f7b[_0x265d27] || 0, _0x524036 = levelFromXp(_0x2f40ee), _0x21a1ee = xpForLevel(_0x524036 + 1), _0x2c1658 = Object.entries(_0x520f7b).sort((_0x3263e0, _0x356fc9) => _0x356fc9[1] - _0x3263e0[1]), _0x196caa = _0x2c1658.findIndex(([_0xf8326f]) => _0xf8326f === _0x265d27) + 1 || _0x2c1658.length + 1;
          await m.reply(bold("ES TEAMS V1 LEVEL") + "\n\n" + bold("User:") + " @" + _0x265d27.split("@")[0] + "\n" + bold("Level:") + " " + _0x524036 + "\n" + bold("XP:") + " " + _0x2f40ee + " / " + _0x21a1ee + "\n" + bold("Rank:") + " #" + _0x196caa + " in this group");
          break;
        }
      }
      case "leaderboard":
      case "top": {
        if (!m.isGroup) throw new Error("This command can only be used in a group.");
        const _0x2f756d = global.db.groups[m.chat]?.xp || {}, _0x317e6d = Object.entries(_0x2f756d).sort((_0x452852, _0x32696f) => _0x32696f[1] - _0x452852[1]).slice(0, 10);
        if (!_0x317e6d.length) throw new Error("No chat activity tracked yet in this group.");
        const _0x523deb = _0x317e6d.map(([_0x4b62b4, _0x40a8d0], _0x2ba4f2) => _0x2ba4f2 + 1 + ". @" + _0x4b62b4.split("@")[0] + " \u2014 Level " + levelFromXp(_0x40a8d0) + " (" + _0x40a8d0 + " XP)");
        await m.reply(bold("ES TEAMS V1 LEADERBOARD") + "\n\n" + _0x523deb.join("\n"));
        break;
      }
      case "daily": {
        global.db.users[m.sender] = global.db.users[m.sender] || {};
        const user = global.db.users[m.sender], now = Date.now(), hoursSince = (now - (user.lastDaily || 0)) / 36e5;
        if (hoursSince < 24) throw new Error("You already claimed today. Try again in about " + Math.ceil(24 - hoursSince) + "h.");
        user.streak = hoursSince <= 48 ? (user.streak || 0) + 1 : 1, user.lastDaily = now;
        const bonus = 20 + user.streak * 5;
        if (m.isGroup) await addXp(m, m.sender, bonus);
        await sendBrandedReply(sock, m, { image: global.botImage, body: bold("ES TEAMS V1 DAILY REWARD") + "\n\n\u{1F381} " + bold("Daily claimed!") + "\n" + bold("Streak:") + " " + user.streak + " day" + (user.streak === 1 ? "" : "s") + "\n" + bold("Bonus:") + " +" + bonus + " XP" + (m.isGroup ? "" : "\n\n(claim inside a group to add it to a leaderboard)") });
        break;
      }
      case "streak": {
        const target = resolveTarget(m) || m.sender, user = global.db.users[target] || {}, days = user.streak || 0;
        await sock.sendMessage(m.chat, { text: bold("ES TEAMS V1 STREAK") + "\n\n\u{1F525} @" + target.split("@")[0] + bold("'s streak:") + " " + days + " day" + (days === 1 ? "" : "s"), mentions: [target], ...channelInfo() }, { quoted: m });
        break;
      }
      case "kick": {
        await requireGroupAdmin(sock, m);
        const _0x14452b = resolveTarget(m);
        if (!_0x14452b) throw new Error("Usage: " + global.xprefix + "kick <number> (or reply to their message)");
        await sock.groupParticipantsUpdate(m.chat, [_0x14452b], "remove"), await m.reply("\u2705 User removed from the group.");
        break;
      }
      case "promote": {
        await requireGroupAdmin(sock, m);
        const _0x294641 = resolveTarget(m);
        if (!_0x294641) throw new Error("Usage: " + global.xprefix + "promote <number> (or reply to their message)");
        await sock.groupParticipantsUpdate(m.chat, [_0x294641], "promote"), await m.reply("\u2705 User promoted to admin.");
        break;
      }
      case "demote": {
        await requireGroupAdmin(sock, m);
        const _0x168c49 = resolveTarget(m);
        if (!_0x168c49) throw new Error("Usage: " + global.xprefix + "demote <number> (or reply to their message)");
        await sock.groupParticipantsUpdate(m.chat, [_0x168c49], "demote"), await m.reply("\u2705 User demoted from admin.");
        break;
      }
      case "tagall": {
        {
          if (!m.isGroup) throw new Error("This command can only be used in a group.");
          const _0x3dceee = await getGroupMetadata(sock, m.chat), _0x572f59 = m.args.join(" ").trim(), _0x1fc8b2 = _0x3dceee.participants.map((_0x35c76e) => "@" + _0x35c76e.id.split("@")[0]).join(" ");
          await sock.sendMessage(m.chat, { text: bold("Tag All") + "\n\n" + _0x572f59 + "\n\n" + _0x1fc8b2, mentions: _0x3dceee.participants.map((_0x233b07) => _0x233b07.id), ...channelInfo() }, { quoted: m });
          break;
        }
      }
      case "hidetag": {
        await requireGroupAdmin(sock, m);
        const _0x303d72 = await getGroupMetadata(sock, m.chat), _0x61bcd5 = m.args.join(" ").trim() || "\u200B";
        await sock.sendMessage(m.chat, { text: _0x61bcd5, mentions: _0x303d72.participants.map((_0x22d2c5) => _0x22d2c5.id), ...channelInfo() }, { quoted: m });
        break;
      }
      case "linkgroup": {
        await requireGroupAdmin(sock, m);
        const _0x3a2282 = await sock.groupInviteCode(m.chat);
        await m.reply("\u{1F517} https://chat.whatsapp.com/" + _0x3a2282);
        break;
      }
      case "resetlink": {
        await requireGroupAdmin(sock, m);
        const _0x36929d = await sock.groupRevokeInvite(m.chat);
        await m.reply("\u{1F517} New link: https://chat.whatsapp.com/" + _0x36929d);
        break;
      }
      case "setgcname": {
        await requireGroupAdmin(sock, m);
        const _0x481e6d = requireArg(m.args, global.xprefix + "setgcname <new name>");
        await sock.groupUpdateSubject(m.chat, _0x481e6d), await m.reply("\u2705 Group name updated.");
        break;
      }
      case "setgcdesc": {
        await requireGroupAdmin(sock, m);
        const _0x26dc97 = requireArg(m.args, global.xprefix + "setgcdesc <new description>");
        await sock.groupUpdateDescription(m.chat, _0x26dc97), await m.reply("\u2705 Group description updated.");
        break;
      }
      case "setgcpp": {
        await requireGroupAdmin(sock, m);
        const _0x2c8012 = requireQuotedImage(m, "Reply to an image with " + global.xprefix + "setgcpp"), _0x3f2a8 = await _0x2c8012.download();
        await sock.updateProfilePicture(m.chat, _0x3f2a8), await m.reply("\u2705 Group picture updated.");
        break;
      }
      case "listadmin": {
        const _0x502f31 = await requireGroupAdmin(sock, m), _0xc86934 = _0x502f31.participants.filter((_0x32b898) => _0x32b898.admin), _0x58f858 = bold("GROUP ADMINS") + "\n\n" + _0xc86934.map((_0x5815c6) => "\u2022 @" + _0x5815c6.id.split("@")[0]).join("\n");
        await sock.sendMessage(m.chat, { text: _0x58f858, mentions: _0xc86934.map((_0x5cd0b9) => _0x5cd0b9.id), ...channelInfo() }, { quoted: m });
        break;
      }
      case "group": {
        const _0x40e73f = await requireGroupAdmin(sock, m), _0x43d27c = m.args[0]?.toLowerCase();
        if (_0x43d27c === "close") await sock.groupSettingUpdate(m.chat, "announcement"), await m.reply("\u{1F512} Group closed \u2014 only admins can send messages.");
        else {
          if (_0x43d27c === "open") await sock.groupSettingUpdate(m.chat, "not_announcement"), await m.reply("\u{1F513} Group opened \u2014 everyone can send messages.");
          else throw new Error("Usage: " + global.xprefix + "group open | " + global.xprefix + "group close");
        }
        break;
      }
      case "welcome": {
        await requireGroupAdmin(sock, m);
        const _0x23a3a3 = m.args[0]?.toLowerCase();
        global.db.groups[m.chat] = global.db.groups[m.chat] || {};
        if (_0x23a3a3 === "on") global.db.groups[m.chat].welcome = true, await m.reply("\u2705 Welcome/goodbye messages enabled.");
        else {
          if (_0x23a3a3 === "off") global.db.groups[m.chat].welcome = false, await m.reply("\u2705 Welcome/goodbye messages disabled.");
          else throw new Error("Usage: " + global.xprefix + "welcome on | " + global.xprefix + "welcome off");
        }
        break;
      }
      case "antilink": {
        await requireGroupAdmin(sock, m);
        const _0x2e62ab = m.args[0]?.toLowerCase();
        global.db.groups[m.chat] = global.db.groups[m.chat] || {};
        if (_0x2e62ab === "on") global.db.groups[m.chat].antilink = true, await m.reply("\u2705 Anti-link enabled \u2014 non-admins posting group invite links will be removed.");
        else {
          if (_0x2e62ab === "off") global.db.groups[m.chat].antilink = false, await m.reply("\u2705 Anti-link disabled.");
          else throw new Error("Usage: " + global.xprefix + "antilink on | " + global.xprefix + "antilink off");
        }
        break;
      }
      case "mute": {
        await requireGroupAdmin(sock, m);
        const _0x34149c = resolveTarget(m);
        if (!_0x34149c) throw new Error("Usage: " + global.xprefix + "mute <number> (or reply to their message)");
        global.db.groups[m.chat] = global.db.groups[m.chat] || {}, global.db.groups[m.chat].mutedUsers = global.db.groups[m.chat].mutedUsers || {}, global.db.groups[m.chat].mutedUsers[_0x34149c] = true, await m.reply("\u{1F507} @" + _0x34149c.split("@")[0] + " has been muted in this group.");
        break;
      }
      case "unmute": {
        await requireGroupAdmin(sock, m);
        const _0x62a218 = resolveTarget(m);
        if (!_0x62a218) throw new Error("Usage: " + global.xprefix + "unmute <number> (or reply to their message)");
        if (global.db.groups[m.chat]?.mutedUsers) delete global.db.groups[m.chat].mutedUsers[_0x62a218];
        await m.reply("\u{1F50A} @" + _0x62a218.split("@")[0] + " has been unmuted.");
        break;
      }
      case "warn": {
        await requireGroupAdmin(sock, m);
        const _0x597a25 = resolveTarget(m);
        if (!_0x597a25) throw new Error("Usage: " + global.xprefix + "warn <number> [reason] (or reply to their message)");
        global.db.groups[m.chat] = global.db.groups[m.chat] || {}, global.db.groups[m.chat].warnings = global.db.groups[m.chat].warnings || {};
        const _0x5a2523 = (global.db.groups[m.chat].warnings[_0x597a25] || 0) + 1, _0x247453 = m.args.filter((_0x30c4ec) => !/^\d+$/.test(_0x30c4ec)).join(" ") || "No reason given";
        _0x5a2523 >= 3 ? (global.db.groups[m.chat].warnings[_0x597a25] = 0, await m.reply("\u26A0\uFE0F @" + _0x597a25.split("@")[0] + " reached 3 warnings and has been removed.\n" + bold("Reason:") + " " + _0x247453), await sock.groupParticipantsUpdate(m.chat, [_0x597a25], "remove")) : (global.db.groups[m.chat].warnings[_0x597a25] = _0x5a2523, await m.reply("\u26A0\uFE0F @" + _0x597a25.split("@")[0] + " has been warned (" + _0x5a2523 + "/3).\n" + bold("Reason:") + " " + _0x247453));
        break;
      }
      case "warnings": {
        if (!m.isGroup) throw new Error("This command can only be used in a group.");
        const _0x23a8d7 = resolveTarget(m) || m.sender, _0x14ee94 = global.db.groups[m.chat]?.warnings?.[_0x23a8d7] || 0;
        await m.reply("\u26A0\uFE0F @" + _0x23a8d7.split("@")[0] + " has " + _0x14ee94 + "/3 warnings.");
        break;
      }
      case "resetwarn": {
        await requireGroupAdmin(sock, m);
        const _0x4caca8 = resolveTarget(m);
        if (!_0x4caca8) throw new Error("Usage: " + global.xprefix + "resetwarn <number> (or reply to their message)");
        if (global.db.groups[m.chat]?.warnings) global.db.groups[m.chat].warnings[_0x4caca8] = 0;
        await m.reply("\u2705 Warnings reset for @" + _0x4caca8.split("@")[0] + ".");
        break;
      }
      case "antibadword": {
        await requireGroupAdmin(sock, m);
        const _0x1e0e03 = m.args[0]?.toLowerCase();
        global.db.groups[m.chat] = global.db.groups[m.chat] || {};
        if (_0x1e0e03 === "on") global.db.groups[m.chat].antibadword = true, await m.reply("\u2705 Anti-badword enabled \u2014 messages with profanity will be removed.");
        else {
          if (_0x1e0e03 === "off") global.db.groups[m.chat].antibadword = false, await m.reply("\u2705 Anti-badword disabled.");
          else throw new Error("Usage: " + global.xprefix + "antibadword on | " + global.xprefix + "antibadword off");
        }
        break;
      }
      case "levelup": {
        await requireGroupAdmin(sock, m);
        const _0x1964b = m.args[0]?.toLowerCase();
        global.db.groups[m.chat] = global.db.groups[m.chat] || {};
        if (_0x1964b === "on") global.db.groups[m.chat].levelup = true, await m.reply("\u2705 Leveling enabled here \u2014 I will track XP and announce level-ups in this group.");
        else {
          if (_0x1964b === "off") global.db.groups[m.chat].levelup = false, await m.reply("\u2705 Leveling disabled here \u2014 no more XP tracking or level-up announcements in this group.");
          else {
            const _0x10eef8 = global.db.groups[m.chat].levelup ? "ON" : "OFF";
            throw new Error("Leveling is currently " + _0x10eef8 + " in this group.\n\nUsage: " + global.xprefix + "levelup on | " + global.xprefix + "levelup off");
          }
        }
        break;
      }
      case "groupinfo": {
        if (!m.isGroup) throw new Error("This command can only be used in a group.");
        const _0x10d1d9 = await getGroupMetadata(sock, m.chat), _0x2ee517 = _0x10d1d9.participants.filter((_0x4b9728) => _0x4b9728.admin).length, _0x882360 = _0x10d1d9.creation ? new Date(_0x10d1d9.creation * 1e3).toDateString() : "Unknown", _0x61d88b = bold("ES TEAMS V1 GROUP INFO") + "\n\n" + bold("Name:") + " " + _0x10d1d9.subject + "\n" + bold("Description:") + " " + (_0x10d1d9.desc || "None") + "\n" + bold("Members:") + " " + _0x10d1d9.participants.length + "\n" + bold("Admins:") + " " + _0x2ee517 + "\n" + bold("Created:") + " " + _0x882360;
        await sendBrandedReply(sock, m, { image: global.botImage, body: _0x61d88b });
        break;
      }
      case "leave": {
        await requireGroupAdmin(sock, m), await m.reply("\u{1F44B} Goodbye!"), await sock.groupLeave(m.chat);
        break;
      }
      case "delete": {
        await requireGroupAdmin(sock, m);
        if (!m.quoted) throw new Error("Reply to a message with " + global.xprefix + "delete to delete it.");
        await sock.sendMessage(m.chat, { delete: m.quoted.key });
        break;
      }
      case "gcstatus": {
        const _0x288cd4 = "Usage: reply to a photo/video (optional) with " + global.xprefix + "gcstatus <text> inside the group, or from a DM: " + global.xprefix + "gcstatus <text>, https://chat.whatsapp.com/XXXX", _0x2647c4 = requireArg(m.args, _0x288cd4), _0x2d3489 = _0x2647c4.match(GROUP_INVITE_LINK);
        let _0x35b664, _0x9eb7ad;
        if (_0x2d3489) {
          const _0x1a2a07 = _0x2d3489[0].split("chat.whatsapp.com/")[1];
          _0x9eb7ad = stripInviteLink(_0x2647c4, _0x2d3489[0]);
          if (!_0x9eb7ad) throw new Error(_0x288cd4);
          let _0x330552;
          try {
            _0x330552 = await sock.groupGetInviteInfo(_0x1a2a07);
          } catch (_0x11e686) {
            throw new Error("That group invite link looks invalid or expired.");
          }
          _0x35b664 = _0x330552.id;
        } else {
          if (!m.isGroup) throw new Error(_0x288cd4);
          _0x35b664 = m.chat, _0x9eb7ad = _0x2647c4;
        }
        let _0x1872ef;
        try {
          _0x1872ef = await getGroupMetadata(sock, _0x35b664);
        } catch (_0x1be84d) {
          throw new Error("I'm not in that group yet -- add me to the group first, then try again.");
        }
        if (!isBotGroupAdmin(sock, _0x1872ef)) throw new Error("I need to be an admin in that group to post a group status.");
        const _0x3d234c = m.quoted && m.quoted.isMedia ? m.quoted : m.isMedia ? m : null;
        let _0xeb1c2c;
        if (_0x3d234c && /image|video/i.test(_0x3d234c.mime || "")) {
          const _0x3b989b = await _0x3d234c.download(), _0x406c6a = /video/i.test(_0x3d234c.mime) ? "video" : "image";
          _0xeb1c2c = { [_0x406c6a]: _0x3b989b, caption: _0x9eb7ad };
        } else _0xeb1c2c = { text: _0x9eb7ad };
        const _0x11ddce = await generateWAMessageContent(_0xeb1c2c, { upload: sock.waUploadToServer, getUrlInfo: (_0x325f2b) => getUrlInfo(_0x325f2b, { thumbnailWidth: 192, fetchOpts: { timeout: 3e3 }, uploadImage: sock.waUploadToServer }) }), _0x47a9d0 = crypto.randomBytes(32), _0x1c93da = { messageContextInfo: { messageSecret: _0x47a9d0 }, groupStatusMessageV2: { message: { ..._0x11ddce, messageContextInfo: { messageSecret: _0x47a9d0 } } } }, _0x3a322f = generateWAMessageFromContent(_0x35b664, _0x1c93da, {});
        await sock.relayMessage(_0x35b664, _0x3a322f.message, { messageId: _0x3a322f.key.id, additionalAttributes: { type: "text" } }), await m.reply("\u2705 Group status posted to " + _0x1872ef.subject + ".");
        break;
      }
      case "public": {
        if (!m.fromMe) throw new Error("Only the bot account owner can control this setting.");
        const _0x1f30f7 = (m.args[0] || "").toLowerCase();
        if (_0x1f30f7 !== "on" && _0x1f30f7 !== "off") throw new Error("Usage: " + global.xprefix + "public on | " + global.xprefix + "public off");
        const _0x51a138 = sock.decodeJid(sock.user.id);
        global.db.settings[_0x51a138] = global.db.settings[_0x51a138] || {}, global.db.settings[_0x51a138].public = _0x1f30f7 === "on", sock.public = _0x1f30f7 === "on", await m.reply(_0x1f30f7 === "on" ? "\u2705 Public mode is ON -- everyone can use my commands now." : "\u{1F512} Public mode is OFF -- only the bot account owner can use my commands now.");
        break;
      }
      case "restart": {
        if (!m.fromMe) throw new Error("Only the bot account owner can use this.");
        const _0x3d2f64 = process.env.RENDER_DEPLOY_HOOK_URL;
        _0x3d2f64 ? (await m.reply("\u{1F504} Triggering a fresh redeploy on Render -- this can take a couple of minutes, and I will reconnect on my own once it is done."), await axios.get(_0x3d2f64, { timeout: 15e3 })) : (await m.reply("\u26A0\uFE0F RENDER_DEPLOY_HOOK_URL is not set, so I cannot trigger a real Render redeploy from here. Restarting the bot process instead."), process.exit(0));
        break;
      }
      default: {
        const run = extraCommands.handlers[command];
        if (!run) {
          await react(sock, m, "");
          return;
        }
        await run(sock, m);
        break;
      }
    }
    await react(sock, m, "\u2705");
  } catch (_0x2ec8c3) {
    await react(sock, m, "\u274C");
    const reason = _0x2ec8c3.message || "Something went wrong. Please try again later.";
    const isUsage = /^(Invalid input\.|Usage:)/.test(reason);
    await plainReply(bold("ES TEAMS V1 " + (isUsage ? "INVALID FORMAT" : "ERROR")) + "\n\n\u274C " + reason).catch(() => {
    });
    console.error('Command "' + command + '" failed:', _0x2ec8c3 && _0x2ec8c3.stack ? _0x2ec8c3.stack : _0x2ec8c3);
  }
};
