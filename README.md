<div align="center">
  <img src="https://i.ibb.co/qCTXK9p/ES-TEAMS-V1.jpg" width="136" alt="ES TEAMS V1 logo" />
  <h1>ES TEAMS V1</h1>
  <p><strong>A multi-device WhatsApp bot built with Node.js and Baileys.</strong></p>
  <p>
    <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&amp;weight=500&amp;size=20&amp;duration=3200&amp;pause=900&amp;color=25D366&amp;center=true&amp;vCenter=true&amp;width=620&amp;lines=Multi-device+WhatsApp+automation;Node.js+24+%2B+Baileys;Media%2C+search%2C+group+tools+and+more" alt="Animated text: multi-device WhatsApp automation, Node.js 24 and Baileys, media, search, group tools and more" /></a>
  </p>
  <p>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-24.x-339933?logo=node.js&amp;logoColor=white" alt="Node.js 24.x" /></a>
    <a href="https://github.com/WhiskeySockets/Baileys"><img src="https://img.shields.io/badge/Baileys-7.0.0--rc13-25D366?logo=whatsapp&amp;logoColor=white" alt="Baileys 7.0.0 rc13" /></a>
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

ES TEAMS V1 connects to WhatsApp using the multi-device protocol and provides download, search, group-management, AI, media, and utility commands. API-backed features use the ES Teams TV Developer API. The bot can start without an API key, but API-backed commands require one.

Send `.menu` in the bot chat to see the current command list. The default command prefix is `.`.

## Features

- QR-code login or pairing-code login.
- Group administration and moderation tools.
- Media downloads, search, lookups, and creative commands.
- Optional API integration with quota and plan error messages.
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

Set variables in your shell or hosting provider. This project does not automatically load a local `.env` file.

```bash
export ES_TEAMS_API_KEY="estv_your_key_here"  # required for API-backed commands
# Optional: digits only with country code; omit for QR-code login.
export PHONE_NUMBER="2349037524605"
npm start
```

When `PHONE_NUMBER` is set to a valid number, the bot requests a pairing code when WhatsApp is ready. If it is blank, the bot uses QR-code login. Keep the terminal available during first-time setup.

## API access

Create a personal key at the [ES Teams TV Developer Portal](https://esteamstv.devs.surf/developers/api). Web-service deployments can set it as `ES_TEAMS_API_KEY`; VPS-panel deployments can enter it in `settings.js` as `global.users.esteams_apikey`. Each operator should use their own key. Never commit a real key or paste it into a public issue.

The key is sent to the API in the `x-api-key` header. Some premium image and video features may require a Pro or Max plan. Certain image-analysis commands upload media to a public file host so the API can access it; do not use those commands with private images.

## Configuration

Environment variables take priority when present. For a VPS panel without a separate environment-variable screen, the bot can read the phone number and API key from `settings.js` instead.

- `ES_TEAMS_API_KEY` or `global.users.esteams_apikey` — key for API-backed commands.
- `PHONE_NUMBER` or `global.user.phonenumber` — optional WhatsApp number in digits-only international format. Leave it blank to use QR-code login.
- `MONGODB_URI` — optional MongoDB session storage, useful when the host's local filesystem is temporary.
- `SESSION_PATH` — optional session directory. Point it at persistent storage if the host's application folder is cleared during redeploys.
- `SELF_URL` — optional public URL used by the self-ping on hosts that suspend idle services. It cannot wake a process that is already stopped.

Additional options include `AUTO_FOLLOW_CHANNELS` (default `true`), `SET_PROFILE_NAME` (default `false`), `POST_LINK_DELAY_MS` (default `180000` milliseconds), `MARK_ONLINE` (default `false`), `RENDER_DEPLOY_HOOK_URL` for the owner-only Render `.restart` action, and `ES_TEAMS_API_BASE_URL` for development or testing.

## WEB SERVICE DEPLOYMENT

Use the hosting provider's environment or variables panel for `ES_TEAMS_API_KEY` and, if using pairing-code login, `PHONE_NUMBER`. Add persistent storage with `SESSION_PATH` or use `MONGODB_URI` to retain the WhatsApp session. The repository includes a root Dockerfile; select Docker as the service runtime when you want to use it.

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

All three platforms provide `PORT`; the bot listens on it automatically. Run only one instance per WhatsApp account. Without persistent session storage, a restart or redeploy may require linking again.

## VPS PANEL DEPLOYMENT

This method is for VPS panels that let you deploy or run the repository but do not provide a separate environment-variable screen. The phone number and API key are read directly from the bot's `settings.js` file.

1. Deploy or upload this repository to the VPS panel. Use Node.js 24.x and set the start command to `npm start`.
2. Open `settings.js` in the panel's file editor. Edit the existing blank values near the top of the file:

   ```js
   global.user = {
     phonenumber: "2349037524605", // optional; leave blank to use QR login
   };
   global.users = {
     esteams_apikey: "estv_your_key_here", // required only for API-backed commands
   };
   ```

3. Save the file and restart the bot. Read the panel's console/logs for the pairing code or QR login instructions.
4. Keep `ES_TEAMS-SESSION` on persistent VPS storage. If the panel replaces the application directory on redeploy, configure `SESSION_PATH` to a persistent directory or use MongoDB if the panel supports `MONGODB_URI`.

The settings file is plain text. Do not commit real phone numbers or API keys to GitHub, especially in a public repository. Configure them only in the VPS's local copy, restrict access to the panel and server files, and keep a secure backup. A later Git pull or redeploy may replace local edits to `settings.js`, so reapply your private values if the panel overwrites the file.

If both sources are set, the environment variable takes priority over the matching `settings.js` value. The environment-based web-service setup therefore continues to work unchanged.

## Commands

The full list is available in the bot's `.menu`. Examples include:

- **Media:** `.tiktok`, `.ytmp4`, `.ytmp3`, `.spotify`, `.soundcloud`, `.pinterest`
- **Search and information:** `.weather`, `.websearch`, `.imagesearch`, `.wiki`, `.githubsearch`, `.crypto`
- **Group tools:** `.kick`, `.promote`, `.tagall`, `.antilink`, `.welcome`
- **Creative and AI:** `.flux`, `.videogen`, `.caption`, `.tts`, `.summarize`
- **Utilities and fun:** `.qr`, `.trivia`, `.quran`, `.bible`, `.translate`

Some legacy commands use their original public services. Their availability depends on those third-party services.

## Connection and account safety

- Run exactly one instance connected to a WhatsApp account. Overlapping instances can invalidate a session.
- Keep the session on persistent storage so a redeploy does not force a new login.
- Pairing attempts are rate-limited. If WhatsApp reports a pairing limit, stop retrying and wait before attempting again.
- No unofficial WhatsApp client can guarantee that an account will never be restricted. Use a number you control and follow WhatsApp's terms.

## Tests

Run the offline test suite with:

```bash
npm test
```

For live API checks, configure `ES_TEAMS_API_KEY` in the environment or `global.users.esteams_apikey` in `settings.js`, then run:

```bash
npm run test:apis
```

The live checks contact the Developer API. Some plan-specific endpoints may be skipped when the key does not have the required plan.

## Support and project notice

For API keys and plan information, use the [Developer Portal](https://esteamstv.devs.surf/developers/api). For project updates, visit the [WhatsApp channel](https://whatsapp.com/channel/0029VatAyCwFy72JdZXFPm29) or [ES TEAMS on YouTube](https://youtube.com/@esteams). You can also open an issue in this repository.

ES TEAMS V1 is not an official WhatsApp or Meta product. Redistribution, resale, or rebranding requires permission from ES TEAMS TECH.
