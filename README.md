# PvPIndex Documentation (`docs.pvpindex.com`)

User-facing documentation for the PvPIndex platform. Built as a React 19 + Vite 6 + Tailwind 3 SPA so the look and feel matches `apps/web` exactly.

Audiences:

- **server_owner** — installing the plugin, getting an API key, configuration
- **server_mod** — battle replays, watching live, reports, bans
- **server_developer** — public API, signed payloads, rate limits
- **user** — accounts, claiming, ELO, seasons, profile

## Develop

```bash
npm install --legacy-peer-deps
npm run dev          # http://localhost:5175
```

## Build

```bash
npm run build        # → dist/
npm run preview      # serve dist/
```

## Add a documentation page

1. Create the markdown file under [`src/content/<section>/<slug>.md`](src/content). Start with `# Title`.
2. Add a matching entry to [`src/content/nav.ts`](src/content/nav.ts) under the right section. The `file` key must match the markdown filename (without `.md`).
3. The route is automatically `/<section>/<slug>`. Sidebar, Prev/Next, and the `Cmd/Ctrl+K` palette pick it up on the next dev reload / build.

## Deploy

Built and deployed by the root [`Jenkinsfile`](../../Jenkinsfile). Served by an `nginx:alpine` Docker container on `127.0.0.1:3002`, fronted by host nginx via [`deploy/nginx/docs.pvpindex.com.conf`](../../deploy/nginx/docs.pvpindex.com.conf).
