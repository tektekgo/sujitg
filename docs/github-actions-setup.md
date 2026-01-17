# GitHub Actions Setup - Notion Sync

This guide explains how the Notion → Site sync works via GitHub Actions.

## Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     Notion      │     │  GitHub Action  │     │   Your Site     │
│                 │     │                 │     │                 │
│ Status: Ready   │────▶│ 1. Fetch posts  │────▶│ blogPosts.json  │
│ to Publish      │     │ 2. Update JSON  │     │ updated         │
│                 │     │ 3. Commit/push  │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Files Created

| File | Purpose |
|------|---------|
| `.github/workflows/sync-notion.yml` | GitHub Action workflow |
| `scripts/sync-notion.js` | Script that fetches from Notion API |
| `src/data/blogPosts.json` | Blog posts data (synced from Notion) |

## GitHub Secrets Required

Add these in your repo: **Settings → Secrets → Actions**

| Secret | Description |
|--------|-------------|
| `NOTION_API_KEY` | Your Notion integration token (`ntn_...` or `secret_...`) |
| `NOTION_DATABASE_ID` | Your Notion database ID (32 characters) |

## How to Use

### Manual Trigger

1. Go to your repo on GitHub
2. Click **Actions** tab
3. Select **"Sync Notion Articles"** workflow
4. Click **"Run workflow"**

### Automatic Trigger (Optional)

To enable daily automatic sync, edit `.github/workflows/sync-notion.yml` and uncomment:

```yaml
schedule:
  - cron: '0 9 * * *'  # Runs daily at 9 AM UTC
```

## Workflow: Publishing an Article

1. **Write** your article in Notion
2. **Fill in** all properties (Title, Slug, Category, Excerpt, ReadTime)
3. **Set Status** to "Ready to Publish"
4. **Run** the GitHub Action (manual or wait for schedule)
5. **Done!** The article appears on your site

The workflow will:
- Fetch all posts with Status = "Ready to Publish" or "Published"
- Convert them to blog post format
- Update `blogPosts.json`
- Commit and push changes
- Mark "Ready to Publish" posts as "Published" in Notion

## Notion Database Properties

Your Notion database should have these properties:

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| Title | Title | Yes | Article title |
| Slug | Text | Yes | URL-friendly ID (e.g., `my-article-2024`) |
| Category | Select | Yes | AI, Automation, Cloud, Leadership, Innovation |
| Excerpt | Text | Yes | Short description for card |
| ReadTime | Text | No | e.g., "5 min read" (defaults to "5 min read") |
| Status | Select | Yes | Draft, Review, Ready to Publish, Published |
| PublishedDate | Date | No | Auto-filled when published |
| Link | URL | No | External link (if article is hosted elsewhere) |

## Local Testing

You can test the sync script locally:

```bash
# Set environment variables
export NOTION_API_KEY="your_key_here"
export NOTION_DATABASE_ID="your_database_id"

# Run the script
node scripts/sync-notion.js
```

## Troubleshooting

### "Notion API error: 401"
- Check that your `NOTION_API_KEY` is correct
- Ensure the integration is still active at notion.so/my-integrations

### "Notion API error: 404"
- Check that your `NOTION_DATABASE_ID` is correct
- Ensure the database is shared with your integration

### No posts appearing
- Verify posts have Status = "Ready to Publish" or "Published"
- Check the Action logs in GitHub for errors

### Changes not showing on site
- The site needs to rebuild after `blogPosts.json` changes
- If using Lovable.dev, it should auto-deploy on push
- Check if the commit was successful in the repo

## Manual vs Notion Posts

The system supports two types of posts:

- **`source: "notion"`** - Synced from Notion, can be updated by sync
- **`source: "manual"`** - Added directly to JSON, preserved during sync

Manual posts are never deleted or modified by the sync process.
