# sujitg.com

Personal brand site for Sujit Gangadharan — Fractional CIO & Advisor for Cloud, AI & Transformation. Live at **[sujitg.com](https://sujitg.com)**.

## Tech stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Router** for client-side routing

## Quick start (local development)

```bash
git clone https://github.com/tektekgo/sujitg.git
cd sujitg
npm install
npm run dev
```

Open http://localhost:5173 (or the URL Vite prints). Edit files in `src/`; the dev server reloads automatically.

## Build and deploy

**The live site is built and deployed by Vercel**, not by a manual publish step.

- **Source:** This repo, branch `main`.
- **Trigger:** Push to `main` → Vercel runs `npm install` and `npm run build`, then serves the output.
- **Domain:** sujitg.com is connected to the Vercel project.

For the full picture (Vercel, Notion sync, troubleshooting), see **[docs/build-and-deploy.md](docs/build-and-deploy.md)**.

## Developer commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (local development). |
| `npm run build` | Production build (output in `dist/`). Same as Vercel. |
| `npm run preview` | Serve `dist/` locally to test production build. |
| `npm run lint` | Run ESLint. |

## How you can work on the site

You can use either or both:

1. **Cursor (or another IDE)**  
   Clone the repo, edit code locally, run `npm run dev`, then commit and push to `main`. Pushing triggers a Vercel deploy.

2. **Lovable**  
   Use [Lovable](https://lovable.dev/projects/21ad1dd9-053f-4ae9-b70d-e36c91624cfa) for design-led changes. Lovable commits to this same repo; when it pushes to `main`, Vercel deploys as usual.

There is only one deploy path: **push to `main` → Vercel**. The site is not published via Lovable’s “Publish” for production; that’s handled by Vercel.

## Blog content (Notion)

Articles can be managed in Notion and synced into the repo. A GitHub Action runs the sync (weekly or manually). See [docs/build-and-deploy.md#content-pipeline-notion--site](docs/build-and-deploy.md#content-pipeline-notion--site) and [docs/article-draft-notion-automation.md](docs/article-draft-notion-automation.md).

## Project structure

- `src/` — React app (components, pages, data, assets).
- `scripts/` — Notion sync and other tooling.
- `docs/` — Documentation (build/deploy, brand, articles).
- `vercel.json` — SPA rewrites so client-side routes work on Vercel.
