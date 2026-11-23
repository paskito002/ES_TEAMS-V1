<div align="center">
  <img src="https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg" width="136" alt="ES TEAMS V1 logo" />
  <h1>ES TEAMS V1</h1>
  <p><strong>A multi-device WhatsApp bot built with Node.js and Baileys.</strong></p>
  <p>
    <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&amp;weight=500&amp;size=20&amp;duration=3200&amp;pause=900&amp;color=25D366&amp;center=true&amp;vCenter=true&amp;width=620&amp;lines=Multi-device+WhatsApp+automation;Node.js+24+%2B+Baileys;Media%2C+search%2C+group+tools+and+more" alt="Animated text: multi-device WhatsApp automation, Node.js 24 and Baileys, media, search, group tools and more" /></a>
  </p>
  <p>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-24.x-339933?logo=node.js&amp;logoColor=white" alt="Node.js 24.x" /></a>
    <a href="https://github.com/WhiskeySockets/Baileys"><img src="https://img.shields.io/badge/Baileys-7.0.0--rc14-25D366?logo=whatsapp&amp;logoColor=white" alt="Baileys 7.0.0 rc14" /></a>
    <a href="https://github.com/paskito002/ES_TEAMS-V1/stargazers"><img src="https://img.shields.io/github/stars/paskito002/ES_TEAMS-V1?style=flat&amp;logo=github" alt="GitHub stars" /></a>
  </p>
  <p>
    <a href="https://esteamstv.devs.surf/developers/api">Developer API</a> ·
    <a href="https://whatsapp.com/channel/0029VatAyCwFy72JdZXFPm29">WhatsApp channel</a> ·
    <a href="https://youtu.be/MGsAvTYV23w">Deployment walkthrough</a>
  </p>
</div>

> **Important:** This project is an unofficial WhatsApp client built on Baileys. It is not affiliated with or endorsed by WhatsApp or Meta. Automated or unsupported use can put an account at risk; use responsibly and only with an account you control.

## About

ES TEAMS V1 connects to WhatsApp using the multi-device protocol and provides download, search, group-management, AI, media, and utility commands. API-backed features use the ES Teams TV Developer API; the bot can still start without an API key, but those commands will not be available.

Send `.menu` in the bot chat to see the current command list. The default command prefix is `.`.

## Features

- QR-code login or pairing-code login.
- Group administration and moderation tools.
- Media downloads, search, lookups, and creative commands.
- Owner-only View Once saver (`.vv`, `.vo`, `.viewonce`) with a custom command option and `.rvo` reset.
- Optional API integration with clear quota and plan error messages.
- Persistent sessions through a disk/volume or MongoDB.
- Reconnect backoff and pairing safeguards to reduce repeated login attempts.

## Run locally

### Requirements

Use Node.js 24.x and npm. The repository includes a Dockerfile with FFmpeg, ImageMagick, and WebP utilities for deployments that need the bot's media features.

```bash
git clone https://github.com/paskito002/ES_TEAMS-V1.git
cd ES_TEAMS-V1
npm ci
```

Set environment variables in your shell or hosting provider. This project does not automatically load a local `.env` file.

```bash
export ES_TEAMS_API_KEY="estv_your_key_here"  # needed for API-backed commands
# Optional: digits only with country code; omit it to use QR-code login.
export PHONE_NUMBER="2349037524605"
npm start
```

If `PHONE_NUMBER` is set to a valid number, the bot requests a pairing code when WhatsApp is ready. If it is omitted, the bot uses QR-code login. Keep the terminal available during first-time setup.

## API access

Create a personal key at the [ES Teams TV Developer Portal](https://esteamstv.devs.surf/developers/api), add it as `ES_TEAMS_API_KEY`, and restart the bot. Each operator should use their own key. Never commit the key or paste it into public issues.

The key is sent to the API in the `x-api-key` header. Some premium image and video features may require a Pro or Max plan. Certain image-analysis commands upload media to a public file host so the API can access it; do not use those commands with private images.

## Configuration

Set these in your hosting provider's environment or variables panel:

- `ES_TEAMS_API_KEY` — required for API-backed commands; create a key in the developer portal.
- `PHONE_NUMBER` — optional WhatsApp number in digits-only international format. Omit it to use QR login.
- `MONGODB_URI` — use MongoDB for session storage, particularly when the host's local filesystem is temporary.
- `SESSION_PATH` — session directory. Set this to the mount path of a persistent disk or volume. Choose this **or** `MONGODB_URI`.
- `SELF_URL` — optional public URL used by the self-ping on hosts that suspend idle services. It cannot wake a process that is already stopped.

Other optional controls:

- `AUTO_FOLLOW_CHANNELS` defaults to `true`; set it to `false` to disable channel follows.
- `SET_PROFILE_NAME` defaults to `false`; set it to `true` to allow the bot to update the WhatsApp profile name after connecting.
- `POST_LINK_DELAY_MS` controls the delay before post-link actions; the default is `180000` (3 minutes).
- `MARK_ONLINE` defaults to `false`.
- `WHATSAPP_BUSINESS_ACCOUNT` defaults to `false`. Set it only when your installed Baileys build exports `Browsers.SMB_ANDROID`; the published rc14 package does not include that preset, so the bot will stop with a clear startup error rather than silently use the wrong business identity.
- `RENDER_DEPLOY_HOOK_URL` enables the owner-only `.restart` deploy action on Render.
- `ES_TEAMS_API_BASE_URL` overrides the API base URL for development or testing.

## Deploy

The repository root contains a Dockerfile. Select the Docker runtime where the host supports it; adding a Dockerfile does not automatically change an existing service's runtime.

### Render

For a Docker Web Service, select **Docker** and use the root `Dockerfile`. For the native Node runtime, use `npm ci` as the build command and `npm start` as the start command. Attach a persistent disk and set `SESSION_PATH` to its mount directory, or use `MONGODB_URI`. See [Render's Docker deployment guide](https://render.com/docs/docker).

### Railway

Deploy from this GitHub repository. Railway can build from the root Dockerfile. Attach a Volume to preserve the WhatsApp session; the app uses `RAILWAY_VOLUME_MOUNT_PATH` automatically. Use `MONGODB_URI` instead if you prefer MongoDB-backed sessions. See [Railway's Dockerfile guide](https://docs.railway.com/builds/dockerfiles).

### Heroku

The included `heroku.yml` builds the Dockerfile. Set the app stack to `container` before deploying, for example:

```bash
heroku stack:set container -a YOUR_APP_NAME
```

Add `ES_TEAMS_API_KEY` and any login settings as config vars. Heroku's local filesystem is not persistent, so use `MONGODB_URI` to keep the session between restarts. See [Heroku's container deployment guide](https://devcenter.heroku.com/articles/build-docker-images-heroku-yml).

All hosts provide `PORT`; the bot listens on it automatically. Run only one instance per WhatsApp account. Without persistent session storage, a restart or redeploy may require linking again.

## Commands

The full list is available in the bot's `.menu`. Examples include:

- **Media:** `.tiktok`, `.ytmp4`, `.ytmp3`, `.spotify`, `.soundcloud`, `.pinterest`, `.vv`, `.vo`, `.viewonce`, `.setvvcmd`, `.rvo`
- **Search and information:** `.weather`, `.websearch`, `.imagesearch`, `.wiki`, `.githubsearch`, `.crypto`
- **Group tools:** `.kick`, `.promote`, `.tagall`, `.antilink`, `.welcome`
- **Creative and AI:** `.flux`, `.videogen`, `.caption`, `.tts`, `.summarize`
- **Utilities and fun:** `.qr`, `.trivia`, `.quran`, `.bible`, `.translate`

Some legacy commands use their original public services. Their availability depends on those third-party services.

### View Once saver

Reply to a View Once photo, video, or voice note with `.vv` (or `.vo` / `.viewonce`). This command is restricted to the bot account owner and sends the received media to that session's own DM. Use `.setvvcmd save` to make `.save` the main command; `.rvo` resets it to `.vv`. The bot keeps a bounded cache of up to 1,500 recent messages per auth session so it can recover the original message when a quote contains only a stub. The cache is in memory and does not survive a process restart. Downloads are limited to 32 MB.

The saver only works when WhatsApp delivers the original media payload and usable media keys to this linked device. If WhatsApp supplies only an empty stub or the bot was offline, there is no payload for Baileys to recover. The published Baileys rc14 package includes `Browsers.android('13')` for registered personal-account sessions, but does not export `Browsers.SMB_ANDROID`; business-account linking with that identity requires a separately patched Baileys build.

## Connection and account safety

- Keep exactly one running instance connected to a WhatsApp account. Overlapping instances can invalidate a session.
- Store the session on a persistent disk/volume or in MongoDB so a redeploy does not force a new login.
- Pairing attempts are rate-limited. If WhatsApp reports a pairing limit, stop retrying and wait before attempting again.
- No unofficial WhatsApp client can guarantee that an account will never be restricted. Use a number you control and follow WhatsApp's terms.

## Tests

Run the offline test suite with:

```bash
npm test
```

To run live API checks, provide a valid key:

```bash
ES_TEAMS_API_KEY="estv_your_key_here" npm run test:apis
```

The live checks contact the Developer API. Some plan-specific endpoints may be skipped when the key does not have the required plan.

## Support and project notice

For API keys and plan information, use the [Developer Portal](https://esteamstv.devs.surf/developers/api). For project updates, visit the [WhatsApp channel](https://whatsapp.com/channel/0029VatAyCwFy72JdZXFPm29) or [ES TEAMS on YouTube](https://youtube.com/@esteams). You can also open an issue in this repository.

ES TEAMS V1 is not an official WhatsApp or Meta product. Redistribution, resale, or rebranding requires permission from ES TEAMS TECH.
