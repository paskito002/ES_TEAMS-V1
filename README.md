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

All variables below are **optional** — the bot boots fine with none of them set (QR login, session resets on every restart). Set them in your host's environment variables panel (Render → *Environment*), or in a local `.env` file if running on your own machine.

```bash
┌──(es-teams-v1)──[ ENVIRONMENT ]
│
├─ PHONE_NUMBER          = 2349037524605
├─ SELF_URL              = https://your-app.onrender.com
├─ SESSION_PATH          = /opt/render/project/data/ES_TEAMS-SESSION
├─ MONGODB_URI           = mongodb+srv://user:pass@cluster.mongodb.net/dbname
├─ RENDER_DEPLOY_HOOK_URL = https://api.render.com/deploy/srv-xxxxx?key=yyyy
├─ UPDATE_REPO           = paskito002/ES_TEAMS-V1
└─ UPDATE_BRANCH         = main
```

| Variable | Required | What it does |
|---|:---:|---|
| `PHONE_NUMBER` | ❌ | Your WhatsApp number, digits only with country code, no `+` (e.g. `2349037524605`). Set it to log in via **pairing code**. Leave blank to log in by **scanning a QR code** instead. |
| `SELF_URL` | ❌ | This deployed service's own public URL. When set, the bot pings itself every 5 minutes so free-tier hosts don't spin the service down from inactivity. |
| `SESSION_PATH` | ❌ | Folder to store the WhatsApp session in. Only needed if you attached a **persistent disk** — set this to that disk's exact mount path so your login survives restarts. |
| `MONGODB_URI` | ❌ | Alternative to `SESSION_PATH` — stores the session in MongoDB instead of a disk. **This is the one that actually survives a Render redeploy** (a redeploy is a brand new container — local disk and process memory are both wiped either way). Use one or the other, not both. |
| `RENDER_DEPLOY_HOOK_URL` | ❌ | Only relevant on Render. Lets the bot owner trigger a *real* redeploy from inside WhatsApp by typing `.restart`. Get it from your Render service → *Settings* → *Deploy Hook*. |
| `UPDATE_REPO` / `UPDATE_BRANCH` | ❌ | Which GitHub repo/branch the bot checks against to know if it's out of date. Defaults to this repo's `main`. Only override if you maintain your own fork and want the bot to compare against that instead. |

> 💡 Leaving `SESSION_PATH` and `MONGODB_URI` blank is fine — the bot just won't remember its login across restarts, so you'll need to re-pair each time it redeploys.

<br/>

### 🔔 Getting update notices without forced redeploys

By default, Render redeploys your service automatically the moment this repo changes, which drops your WhatsApp connection without warning. If you'd rather control *when* that happens:

1. Set `RENDER_DEPLOY_HOOK_URL` (see table above).
2. In your Render service → *Settings* → *Build & Deploy*, turn **Auto-Deploy** off.
3. When new code lands, the bot checks GitHub periodically (every few hours, and once on connect) and, if it's running an older commit than `UPDATE_REPO`/`UPDATE_BRANCH`, DMs the bot owner: *"Your ES TEAMS V1 is out of date. Type .restart to get the latest version and relink."*
4. Typing `.restart` (owner only) hits the deploy hook and triggers a real Render redeploy on your own schedule.

This detection only runs on Render (it reads Render's own `RENDER_GIT_COMMIT` variable), so it's silently inactive on any other host.

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
