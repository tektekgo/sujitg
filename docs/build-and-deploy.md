# Build and deploy – sujitg.com

This document is the single source of truth for how the site is built, deployed, and updated.

---

## Overview

| What | Where |
|------|--------|
| **Live site** | [sujitg.com](https://sujitg.com) |
| **Source code** | This GitHub repo (`tektekgo/sujitg`), branch `main` |
| **Hosting** | Vercel (connected to this repo) |
| **Custom domain** | `sujitg.com` is attached to the Vercel project |

**Flow:** Push to `main` → Vercel builds and deploys → sujitg.com updates.

---

## Build process (on Vercel)

When you push to `main`, Vercel automatically:

1. Checks out the repo
2. Runs `npm install`
3. Runs `npm run build` (Vite produces static output in `dist/`)
4. Serves the contents of `dist/` on the edge

No custom build config is required. Vercel detects the project as a Vite app. The only project config is `vercel.json`, which adds SPA rewrites so client-side routing works (all routes serve `index.html`).

---

## Deploy process

- **Trigger:** Any push to the `main` branch (including from GitHub Actions).
- **Who deploys:** Vercel. You do not run a deploy command yourself for production.
- **Preview deployments:** Vercel can create preview URLs for pull requests if enabled in the Vercel project.

To get changes live:

1. Commit and push to `main` (from Cursor, Lovable, or the GitHub UI).
2. Wait for the Vercel deployment to finish (check the Vercel dashboard or the GitHub commit status).
3. sujitg.com will show the new version once the deployment is ready.

---

## Content pipeline (Notion → site)

Blog articles can be updated from Notion without touching code:

1. **Notion:** You write in the Articles database and set status to "Ready to Publish" or "Published".
2. **GitHub Action:** The workflow [`.github/workflows/sync-notion.yml`](../.github/workflows/sync-notion.yml) runs:
   - **On schedule:** Every Sunday at 9:00 UTC
   - **Manually:** GitHub → Actions → "Sync Notion Articles" → Run workflow
3. The workflow runs `node scripts/sync-notion.js`, which fetches from Notion and writes `src/data/blogPosts.json` and `src/data/articles/*.json`.
4. If anything changed, the workflow commits and pushes to `main`.
5. Vercel sees the new push and redeploys → new/changed articles appear on the site.

Secrets required in the repo: `NOTION_API_KEY`, `NOTION_DATABASE_ID` (set in GitHub → Settings → Secrets and variables → Actions).

---

## How Cursor and Lovable fit in

- **Cursor (or any IDE):** You develop locally. Edit code, run `npm run dev`, then commit and push to `main`. Pushing triggers the deploy.
- **Lovable:** You can use [Lovable](https://lovable.dev/projects/21ad1dd9-053f-4ae9-b70d-e36c91624cfa) for design-led changes. Lovable commits to the same GitHub repo. After Lovable pushes, Vercel deploys as usual.

Both workflows use the same repo and the same deploy path: **push to `main` → Vercel**. There is no separate “Lovable publish” step for production; the live site is always driven by this repo and Vercel.

---

## Developer commands reference

Run these from the repo root (with Node.js and npm installed).

| Command | Purpose |
|--------|--------|
| `npm install` | Install dependencies (run after clone or when `package.json` changes). |
| `npm run dev` | Start the Vite dev server (e.g. http://localhost:5173). Use this for local development. |
| `npm run build` | Production build; outputs to `dist/`. Same as what Vercel runs. |
| `npm run preview` | Serve the `dist/` build locally to test the production bundle. |
| `npm run lint` | Run ESLint. |

---

## Checklist: “I changed something, how do I get it live?”

- **Code or content in the repo (components, copy, data files):**  
  Commit and push to `main` → Vercel deploys.

- **Article content only (and you use Notion):**  
  Update Notion and set status to Ready to Publish / Published, then run the “Sync Notion Articles” workflow (or wait for the Sunday run). The sync will push to `main` and Vercel will deploy.

- **Domain or hosting settings:**  
  Change the Vercel project (e.g. domain, env vars) in the [Vercel dashboard](https://vercel.com).

---

## Troubleshooting

- **Site didn’t update after push:**  
  Confirm you pushed to `main`. In Vercel, check that the project is connected to this repo and that the latest deployment succeeded.

- **Build failed on Vercel:**  
  Run `npm run build` locally. Fix any errors (TypeScript, missing deps, etc.), then push again.

- **Notion sync didn’t update the site:**  
  In GitHub Actions, open the last “Sync Notion Articles” run and check the logs. Ensure `NOTION_API_KEY` and `NOTION_DATABASE_ID` are set and that the Notion database is shared with the integration.
