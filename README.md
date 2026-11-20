<div align="center">

<img src="https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg" width="220" alt="ES TEAMS V1"/>

<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=EB+Garamond&weight=800&size=30&duration=4000&pause=1000&color=25D366&center=true&vCenter=true&random=false&width=460&lines=%E2%9D%84+ES+TEAMS+V1+%E2%9D%84;MULTI-DEVICE+WHATSAPP+BOT;DEVELOPED+BY+ES+TEAMS+TECH" alt="ES TEAMS V1"/></a>

<p>
<img src="https://profile-counter.glitch.me/es-teams-v1-repo/count.svg" alt="Visitor Count"/>
</p>

<p>
<a href="https://github.com/paskito002/followers"><img title="Followers" src="https://img.shields.io/github/followers/paskito002?color=25D366&style=for-the-badge&logo=github&logoColor=white&labelColor=0b141a"/></a>
<a href="https://github.com/paskito002/ES_TEAMS-V1/stargazers"><img title="Stars" src="https://img.shields.io/github/stars/paskito002/ES_TEAMS-V1?color=25D366&style=for-the-badge&logo=github&logoColor=white&labelColor=0b141a"/></a>
<a href="https://github.com/paskito002/ES_TEAMS-V1/network/members"><img title="Forks" src="https://img.shields.io/github/forks/paskito002/ES_TEAMS-V1?color=25D366&style=for-the-badge&logo=github&logoColor=white&labelColor=0b141a"/></a>
<a href="https://github.com/paskito002/ES_TEAMS-V1/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/paskito002/ES_TEAMS-V1?color=25D366&style=for-the-badge&logo=github&logoColor=white&labelColor=0b141a"/></a>
<a href="https://github.com/paskito002/ES_TEAMS-V1"><img title="Repo Size" src="https://img.shields.io/github/repo-size/paskito002/ES_TEAMS-V1?color=25D366&style=for-the-badge&logo=github&logoColor=white&labelColor=0b141a"/></a>
</p>

</div>

<br/>

<div align="center">

### ❄️ ES TEAMS V1 — a fast, fully-loaded multi-device WhatsApp bot ❄️

Downloaders • Group tools • AI • Media & fun commands — all wrapped in a clean, snowflake-themed menu, with every reply carrying the official ES TEAMS channel badge.

**Type `.menu` to see everything it can do.**

</div>

<br/>

## 🚀 Deployment Methods

<div align="center">

<a href="https://github.com/paskito002/ES_TEAMS-V1/fork" target="_blank">
  <img alt="Fork This Repo" src="https://img.shields.io/badge/①_FORK_THIS_REPO-0b141a?style=for-the-badge&logo=git&logoColor=25D366"/>
</a>

<br/><br/>

<a href="https://render.com" target="_blank">
  <img alt="Deploy on Render" src="https://img.shields.io/badge/②_DEPLOY_ON_RENDER-0b141a?style=for-the-badge&logo=render&logoColor=46E3B7"/>
</a>
&nbsp;
<a href="https://esteamstv.devs.surf" target="_blank">
  <img alt="Deploy on ES TEAMS TV" src="https://img.shields.io/badge/②_DEPLOY_ON_ES_TEAMS_TV-0b141a?style=for-the-badge&logo=television&logoColor=25D366"/>
</a>

<br/><br/>

<a href="https://youtu.be/MGsAvTYV23w" target="_blank">
  <img alt="Watch Deployment Video" src="https://img.shields.io/badge/▶_WATCH_DEPLOYMENT_VIDEO-FF0000?style=for-the-badge&logo=youtube&logoColor=white"/>
</a>

</div>

<br/>

## ⚙️ Configuration

<div align="center">
<img alt="env" src="https://img.shields.io/badge/.env-0b141a?style=for-the-badge&logo=gnubash&logoColor=25D366"/>
</div>

<br/>

Only `ES_TEAMS_API_KEY` is needed for the API-powered commands (see **🔑 ES Teams TV API key** below). Every other variable is **optional** — the bot boots with none of them set (QR login, session resets on every restart — please read the linking-safety notes before running it that way). Set them in your host's environment variables panel (Render → *Environment*), or in a local `.env` file if running on your own machine.

```bash
┌──(es-teams-v1)──[ ENVIRONMENT ]
│
├─ ES_TEAMS_API_KEY      = estv_your_key_here
├─ PHONE_NUMBER          = 2349037524605
├─ SELF_URL              = https://your-app.onrender.com
├─ SESSION_PATH          = /opt/render/project/data/ES_TEAMS-SESSION
├─ MONGODB_URI           = mongodb+srv://user:pass@cluster.mongodb.net/dbname
├─ RENDER_DEPLOY_HOOK_URL = https://api.render.com/deploy/srv-xxxxx?key=yyyy
├─ SET_PROFILE_NAME      = false
├─ AUTO_FOLLOW_CHANNELS  = true
├─ POST_LINK_DELAY_MS    = 180000
├─ MARK_ONLINE           = false
├─ UPDATE_REPO           = paskito002/ES_TEAMS-V1
└─ UPDATE_BRANCH         = main
```

| Variable | Required | What it does |
|---|:---:|---|
| `ES_TEAMS_API_KEY` | ✅ for API commands | **Your own** ES Teams TV Developer API key. Create it at <https://esteamstv.devs.surf/developers/api>. Without it, commands that use the API reply with these setup instructions and everything else keeps working. Never share or commit it. |
| `PHONE_NUMBER` | ❌ | Your WhatsApp number, digits only with country code, no `+` (e.g. `2349037524605`). Set it to log in via **pairing code**. Leave blank to log in by **scanning a QR code** instead. |
| `SELF_URL` | ❌ | This deployed service's own public URL. When set, the bot pings itself every 5 minutes so free-tier hosts don't spin the service down from inactivity. |
| `SESSION_PATH` | ❌ | Folder to store the WhatsApp session in. Only needed if you attached a **persistent disk** — set this to that disk's exact mount path so your login survives restarts. |
| `MONGODB_URI` | ❌ | Alternative to `SESSION_PATH` — stores the session in MongoDB instead of a disk. **This is the one that actually survives a Render redeploy** (a redeploy is a brand new container — local disk and process memory are both wiped either way). Use one or the other, not both. |
| `RENDER_DEPLOY_HOOK_URL` | ❌ | Only relevant on Render. Lets the bot owner trigger a *real* redeploy from inside WhatsApp by typing `.restart`. Get it from your Render service → *Settings* → *Deploy Hook*. |
| `UPDATE_REPO` / `UPDATE_BRANCH` | ❌ | Which GitHub repo/branch the bot checks against to know if it's out of date. Defaults to this repo's `main`. Only override if you maintain your own fork and want the bot to compare against that instead. |
| `SET_PROFILE_NAME` | ❌ | Set to `true` to let the bot rename your WhatsApp profile to *ES TEAMS V1* a few minutes after connecting. **Off by default** (it used to happen automatically seconds after linking). |
| `AUTO_FOLLOW_CHANNELS` | ❌ | The bot follows the ES TEAMS WhatsApp channels after connecting. On by default, but it now waits `POST_LINK_DELAY_MS` first. Set to `false` to turn it off. |
| `POST_LINK_DELAY_MS` | ❌ | How long to wait after connecting before channel follows (and the optional profile rename). Default `180000` (3 minutes). |
| `MARK_ONLINE` | ❌ | Set to `true` to mark the account online the moment the bot connects. **Off by default.** |
| `ES_TEAMS_API_BASE_URL` | ❌ | Advanced. Overrides `https://esteamstv.devs.surf` (only for testing against your own copy of the API). |

> ⚠️ Leaving `SESSION_PATH` and `MONGODB_URI` blank still *works*, but the bot then forgets its login on every restart or redeploy and has to be linked again each time. **Repeated link attempts are the most common reason WhatsApp restricts a number**, so on any host whose disk is wiped on restart, set `MONGODB_URI` (or attach a persistent disk/volume). The bot prints a warning at startup when no persistent storage is configured.

<br/>

### 🔑 ES Teams TV API key (required for API commands)

Most downloader, search, lookup and tool commands call the **ES Teams TV Developer API**. **Every person who runs this bot uses their own key** — none is bundled, and the key is only ever read from an environment variable.

1. Open **<https://esteamstv.devs.surf/developers/api>** and sign in.
2. Create an API key (it starts with `estv_`) and copy it.
3. Add it to your host as the environment variable **`ES_TEAMS_API_KEY`** (steps for Render and Railway are below).
4. Restart / redeploy the bot, then send `.joke` — a joke means the key works. If the startup log still says `ES_TEAMS_API_KEY is not set`, the variable did not reach the service.

**Good to know**

- The key is sent only in the `x-api-key` header, over HTTPS, to `esteamstv.devs.surf`. It is never put in a URL, a reply or the logs.
- If a key leaks, revoke it on the same page and create a new one.
- Keys have per-second and monthly request limits. When one is reached the bot tells the user (including the plan/usage page) instead of failing silently.
- `.shazam`, `.flux` and `.videogen` need a **Pro or Max** plan. If your plan doesn't include them, `.shazam` and `.flux` fall back to the older public servers they used before; `.videogen` shows the upgrade message.
- Images for `.removebg`, `.imgscan`, `.shazam`, `.ocr` and `.caption` are first uploaded to a public file host (uguu.se) to get a link the API can read, because the API has no upload endpoint. Don't send private pictures to those commands.

<br/>

### 🧭 Hosting guides

#### Render (the platform this bot has been deployed on)

1. Create a **Web Service** from your fork of this repo (Docker or Node both work).
2. Open the service → **Environment** and add `ES_TEAMS_API_KEY`, `PHONE_NUMBER` and **`MONGODB_URI`** (or attach a persistent disk and set `SESSION_PATH` to its mount path).
3. Optional on Render: `SELF_URL` (keeps the free tier awake, see below) and `RENDER_DEPLOY_HOOK_URL` (for `.restart`).
4. Deploy, open **Logs**, and enter the pairing code in WhatsApp → *Linked devices* within a minute.

#### Railway

The bot's code is host-independent — it listens on the `PORT` Railway provides, reads everything from environment variables, and Railway can build the included `Dockerfile`. **This bot has only been run on Render; Railway support below comes from the code, and I have not verified it on a live Railway deployment.**

1. In Railway: **New Project → Deploy from GitHub repo** and pick your fork. Railway builds the included `Dockerfile`.
2. Open the service → **Variables** and add `ES_TEAMS_API_KEY` and `PHONE_NUMBER`.
3. Keep the session so you only link **once** — choose one:
   - **Volume (recommended on Railway):** add a **Volume** to the service. The bot detects Railway's `RAILWAY_VOLUME_MOUNT_PATH` automatically and stores the session in `<volume>/ES_TEAMS-SESSION`. (Setting `SESSION_PATH` yourself overrides this.)
   - **MongoDB:** set `MONGODB_URI` instead.
4. Deploy, open **Deploy Logs**, and enter the pairing code in WhatsApp within a minute.

| Feature | Render | Railway |
|---|:---:|:---:|
| Bot connects and runs commands | ✅ | ✅ (host-independent code) |
| Session in MongoDB (`MONGODB_URI`) | ✅ | ✅ |
| Session on a persistent disk | ✅ via `SESSION_PATH` | ✅ automatic via volume, or `SESSION_PATH` |
| `SELF_URL` self-ping | used (free tier sleeps) | not needed — skipped automatically unless you set it |
| `.restart` | real redeploy (needs `RENDER_DEPLOY_HOOK_URL`) | restarts the bot process only (no redeploy hook support) |
| "You're out of date" notices | ✅ | inactive (reads Render's `RENDER_GIT_COMMIT`) |
| `Procfile` (pm2) | n/a | not used — Railway builds the `Dockerfile` |

<br/>

### 🛡️ Linking safely (why numbers were getting banned)

People reported numbers being banned right when they linked. Reading the connection code, these were real causes — all fixed in this version:

| What the bot used to do | What it does now |
|---|---|
| Asked for a pairing code on a blind 3-second timer, and again after **every** disconnect before linking finished | Asks only when WhatsApp signals it is ready, **one code per connection**, at least 90 seconds apart, **never more than 3 per run** |
| Reconnected instantly after almost any disconnect | Waits with growing delays (5 s → 5 min max); the process supervisor (`start.js`) also backs off |
| **Logged the device out** when a second instance connected (any overlapping deploy) | Never logs out. Waits, retries a few times, then stops and tells you to keep only one copy running |
| Retried forever after a `403` from WhatsApp | Stops and tells you to check the number |
| Kept retrying with dead credentials after being logged out | Clears the dead session and stops; one manual restart gives a fresh pairing code |
| Ran channel lookups, 2 channel follows, a profile rename and a message within seconds of connecting | Only a single message after ~20 s; channel badge lookup after ~30 s; follows after `POST_LINK_DELAY_MS`; profile rename is **opt-in** |
| Forced "online" presence on connect | Off unless `MARK_ONLINE=true` |
| Could open a second connection if `index.js` changed on disk | Restarts the process cleanly instead |

**What you should do too** — the code can't fix these:

- **Link once, then keep the session** (`MONGODB_URI` or a volume). Redeploying without a saved session means linking again every time.
- **Run exactly one copy per number.** Don't run it on your PC and a host at the same time, and avoid overlapping deploys.
- **If you see `Pairing-code limit reached`, stop.** Wait at least an hour before trying again instead of restarting repeatedly.
- **Use a spare number you can afford to lose.** No unofficial WhatsApp client can promise it won't be restricted — WhatsApp can flag automated accounts, and servers in data centers are looked at more closely than phones. These changes lower the risk; they cannot remove it.

<br/>

### ⏰ Actually staying online 24/7

Two separate things put a bot to sleep, and they need different fixes.

**1. The host spins the service down.** On Render's free tier a web service sleeps after ~15 minutes with no inbound traffic. The bot self-pings every 4 minutes to prevent this — but a self-ping **cannot wake an instance that has already gone to sleep**, because the sleeping process is the thing doing the pinging. The moment it sleeps for any reason (a deploy, a host restart, a brief network gap), nothing brings it back until someone opens the URL.

The reliable fix is an **external** pinger:

1. Set `SELF_URL` to your service's public URL. Check the logs — if you see `<-- LOCALHOST ONLY` next to the ping line, it is **not** set correctly and is doing nothing useful.
2. Create a free monitor at [UptimeRobot](https://uptimerobot.com) or [cron-job.org] pointed at that same URL, on a 5-minute interval.

That external hit both keeps the service awake *and* wakes it if it ever does sleep. The only way to remove the problem entirely rather than work around it is a paid instance, which never sleeps.

**2. The WhatsApp session gets dropped.** If the session isn't stored somewhere permanent, every restart loses the login and demands a new pairing code. Set `MONGODB_URI` — it is the only option here that survives a redeploy, because a redeploy replaces the whole container (local disk included). The bot also now retries transient bad-session errors several times before giving up and asking to re-pair, so a brief server-side hiccup no longer costs you the login.

<br/>

### 🔔 Getting update notices without forced redeploys

By default, Render redeploys your service automatically the moment this repo changes, which drops your WhatsApp connection without warning. If you'd rather control *when* that happens:

1. Set `RENDER_DEPLOY_HOOK_URL` (see table above).
2. In your Render service → *Settings* → *Build & Deploy*, turn **Auto-Deploy** off.
3. When new code lands, the bot checks GitHub periodically (every few hours, and once on connect) and, if it's running an older commit than `UPDATE_REPO`/`UPDATE_BRANCH`, DMs the bot owner: *"Your ES TEAMS V1 is out of date. Type .restart to get the latest version and relink."*
4. Typing `.restart` (owner only) hits the deploy hook and triggers a real Render redeploy on your own schedule.

This detection only runs on Render (it reads Render's own `RENDER_GIT_COMMIT` variable), so it's silently inactive on any other host.

<br/>

## 📚 Commands

The menu (`.menu`) lists every command and counts them automatically — this version has **130 commands** (46 new, all 84 originals kept in the same order).

### ✨ New API commands (46)

All of these call the ES Teams TV Developer API with your `ES_TEAMS_API_KEY`.

**Download Menu** (4 new)

| Command | What it does |
|---|---|
| `.ytmp3 <link>` | YouTube link to MP3 audio |
| `.soundcloud <track link>` | SoundCloud track to MP3 |
| `.pinterest <pin link>` | Download a Pinterest image or video |
| `.capcut <template link>` | Download a CapCut template video |

**Scrape / Stalk Menu** (27 new)

| Command | What it does |
|---|---|
| `.gitstalk <username>` | GitHub profile lookup |
| `.githubrepo <owner/repo>` | GitHub repository details |
| `.githubsearch <query>` | Search GitHub repositories |
| `.ytchannel <@handle>` | YouTube channel stats |
| `.ytinfo <link>` | YouTube video details |
| `.wiki <topic>` | Wikipedia summary |
| `.define <word>` | Dictionary definition |
| `.anime <title>` | Anime details |
| `.movie <title>` | Movie details |
| `.npm <package>` | npm package details |
| `.country <name>` | Country facts and flag |
| `.iplookup <ip>` | IP address location and network |
| `.sportsteam <team>` | Sports team profile |
| `.minecraft <server>` | Minecraft server status |
| `.holidays <country> [year]` | Public holidays for a country |
| `.livescore` | Live football scores |
| `.forecast <city>` | 10-day weather forecast |
| `.crypto <coin>` | Live coin price (USD and NGN) |
| `.currency <amount> <from> <to>` | Currency converter |
| `.websearch <query>` | Web search |
| `.imagesearch <query>` | Image search |
| `.ytsearch <query>` | YouTube search |
| `.tiktoksearch <query>` | TikTok search |
| `.pinterestsearch <query>` | Pinterest search |
| `.linkpreview <link>` | Preview any link |
| `.pastquestions [exam] [subject] [year]` | JAMB / WAEC / NECO past questions |
| `.wacheck <number>` | Is a number on WhatsApp? |

**Tools Menu** (9 new)

| Command | What it does |
|---|---|
| `.translate <code> <text>` | Translate text |
| `.ocr (reply to image)` | Read text from an image |
| `.password [length]` | Strong password generator |
| `.hash [algo] <text>` | md5 / sha1 / sha256 / sha512 hash |
| `.base64 <encode|decode> <text>` | Base64 encode or decode |
| `.tts <text>` | Text to speech (MP3) |
| `.summarize <text>` | Summarize text |
| `.chart <type> <data>` | Build a chart image |
| `.ytsummary <link>` | Summarize a YouTube video |

**Creative Menu** (1 new)

| Command | What it does |
|---|---|
| `.caption <text> (reply to image)` | Add a meme caption to an image |

**Ai Menu** (1 new)

| Command | What it does |
|---|---|
| `.videogen <prompt>` | AI video from a prompt (Pro/Max) |

**Fun Menu** (4 new)

| Command | What it does |
|---|---|
| `.quote` | Random quote |
| `.advice` | Random advice |
| `.catfact` | Random cat fact |
| `.dog` | Random dog picture |

### ♻️ Existing commands that now use the ES Teams TV API

`tiktok`, `facebook`, `instagram`, `twitter`, `ytmp4`, `play`, `video`, `spotify`, `apk`, `gdrive`, `webdl`, `lyrics`, `weather`, `technews`, `ttstalk`, `igstalk`, `gpt`, `removebg`, `qr`, `tinyurl`, `ssweb`, `flux`, `write`, `shazam`, `joke`, `quran`, `bible`, `tempmail`, `checkmail`, `imgscan`, `trivia`.

A few answers look different because the API returns different data: `apk` now opens the app's download page, `webdl` reports the final link, type and size, `weather` shows temperature, wind and condition, `technews` lists the top stories, and `quran` takes `surah:ayah` (e.g. `.quran 2:255`; a plain surah number shows its first verse). TikTok photo posts and Instagram pictures are now sent as images.

### 🔌 Commands that keep their original public sources

`logo`, `jail`, `wasted`, `triggered`, `scanqr`, `horoscope` and `trend` (CoinGecko) have no equivalent in the ES Teams TV API, so they still use the same free public services as before and need no key. Their uptime depends on those third-party services, and I could not confirm they are still online.

<br/>

## 🧪 Testing

```bash
npm test                                   # offline tests: no key, no WhatsApp, no internet needed
ES_TEAMS_API_KEY=estv_your_key npm run test:apis   # live check of your key and every integrated endpoint
```

`npm run test:apis` prints `PASS` / `FAIL` / `SKIP` per endpoint (`SKIP` = needs a Pro or Max plan) and never prints your key.

### 🔓 Readable source

`index.js` and `ES_TEAMS-V1.js` are plain, readable source in this version (they were obfuscated before). To publish an obfuscated copy again without losing the readable one: `npm install --no-save javascript-obfuscator`, then `node scripts/obfuscate.js ES_TEAMS-V1.js ES_TEAMS-V1.obfuscated.js` (the second argument keeps it from overwriting your source).

<br/>

## ⚠️ Disclaimer

- ES TEAMS V1 is **not made by WhatsApp Inc.** Misusing the bot may get your WhatsApp account **banned** — use it at your own risk.
- ES TEAMS V1 is not openly licensed for free redistribution or resale — please don't clone or rebrand it without permission from ES TEAMS TECH.

<br/>

<div align="center">

#### ES TEAMS V1 Profile Views 🧚
<img src="https://profile-counter.glitch.me/paskito002/count.svg" alt="Visitor Count"/>

</div>

<br/>

## 🤝 CONNECT WITH ES TEAMS

<div align="center">

<a href="https://wa.me/2349037524605"><img src="https://img.shields.io/badge/Contact_ES_TEAMS-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/></a>
<a href="https://whatsapp.com/channel/0029VatAyCwFy72JdZXFPm29"><img src="https://img.shields.io/badge/Join_Official_Channel-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/></a>
<a href="https://t.me/examsolutionteam"><img src="https://img.shields.io/badge/Telegram-0088cc?style=for-the-badge&logo=telegram&logoColor=white"/></a>
<a href="https://youtube.com/@esteams"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white"/></a>

</div>

- [🧑‍💻 Follow ES TEAMS on WhatsApp Channel](https://whatsapp.com/channel/0029VatAyCwFy72JdZXFPm29)
- [🧑‍💻 Follow ES TEAMS TECH on YouTube](https://youtube.com/@esteams)

<br/>

<div align="center">

<a href="https://whatsapp.com/channel/0029VatAyCwFy72JdZXFPm29">
<img src="https://raw.githubusercontent.com/Neeraj-x0/Neeraj-x0/main/photos/suddidina-join-whatsapp.png" alt="Join WhatsApp Channel"/>
</a>

</div>
