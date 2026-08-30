# unreciprocated

**Who isn't following you back?** A frontend-only tool that reads your official Instagram export, compares followers and following, and lists accounts you follow that don't follow you — all in your browser. Nothing is uploaded.

## What it does

| Route | Purpose |
| --- | --- |
| `/` | Landing — hero, what you get, how it works, export guide |
| `/check` | Upload ZIP or folder → compare → searchable results with profile links |

## Privacy

- Runs entirely in your browser
- No login, no server, no scraping
- Uses JSON from Meta's **Download your information** export only
- Export **Connections only** with **All time** selected — partial date ranges produce incomplete lists and wrong results

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build

```bash
cd frontend
npm run build
npm run preview   # optional — preview production build
```

## Deploy (Vercel)

1. Import this repo on [Vercel](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Framework preset: **Vite** (build: `npm run build`, output: `dist`)

If `/check` 404s on refresh, add `frontend/vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Project structure

```
frontend/
├── src/
│   ├── App.jsx                 # Routes: /, /check
│   ├── context/ExportDataContext.jsx
│   ├── pages/LandingPage.jsx, CheckPage.jsx
│   ├── components/ExportPicker, ResultsSummary, ResultsList
│   ├── components/landing/     # Landing sections
│   └── utils/
│       ├── exportIngest.js     # ZIP/folder ingest (fflate)
│       ├── discoverConnections.js
│       ├── parseConnections.js
│       ├── compareFollows.js
│       └── loadConnectionsAnalysis.js
└── package.json
```

## How it works

1. User uploads Instagram export (`.zip` or unzipped folder)
2. App finds `followers_and_following/following.json` and `followers_*.json`
3. Parses usernames from both JSON formats Meta uses
4. Computes `following − followers` (accounts you follow who aren't in your followers list)
5. Renders a read-only list with links to `instagram.com/{username}`

Compare logic supports a second direction (`YOU_DONT_FOLLOW_BACK`) for future use; the UI currently shows **not following back** only.

## Related projects

- **[ig-wrapped](../ig-wrapped/)** — Instagram Wrapped-style story cards from the same export format (sibling app, shared design family)

## License

Private side project. All rights reserved unless otherwise noted.
