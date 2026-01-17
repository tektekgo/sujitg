# Notion Integration Setup

This guide walks through setting up a Notion integration for the blog publishing pipeline.

## Overview

The integration allows GitHub Actions (or n8n) to:
- Read articles from your Notion database
- Update article status after publishing
- Sync content to your portfolio site

## Step 1: Create the Integration

1. **Go to:** https://www.notion.so/my-integrations

2. **Click:** "+ New integration"

3. **Fill in:**

   | Field | Value |
   |-------|-------|
   | Name | `Blog Publisher` (or whatever you like) |
   | Associated workspace | Select your main workspace |
   | Type | Internal (default) |

4. **Click:** "Submit"

5. **Copy the "Internal Integration Secret"** - starts with `ntn_` or `secret_`

   > **Important:** Save this somewhere secure (you'll need it for GitHub Secrets later)

## Step 2: Set Capabilities

On the integration page, go to **Capabilities** and ensure:

| Capability | Setting |
|------------|---------|
| Read content | Yes |
| Update content | Yes |
| Insert content | Yes (optional, but useful) |
| Read user information | No (not needed) |

Click **Save changes**.

## Step 3: Create the Articles Database

In your Notion workspace:

1. Create a new **Full page database** (not inline)
2. Name it: `Articles` or `Blog Posts`

3. **Add these properties** (click + in the header):

| Property Name | Type | Options/Notes |
|---------------|------|---------------|
| `Title` | Title | (default, already exists) |
| `Slug` | Text | URL-friendly ID |
| `Category` | Select | Add: AI, Automation, Cloud, Leadership, Innovation |
| `Excerpt` | Text | Short description |
| `ReadTime` | Text | e.g., "5 min read" |
| `Status` | Select | Add: Draft, Review, Ready to Publish, Published |
| `PublishTo` | Multi-select | Add: Medium, Site |
| `MediumURL` | URL | (leave empty, filled by automation) |
| `PublishedDate` | Date | (leave empty, filled by automation) |

## Step 4: Share Database with Integration

1. Open your Articles database
2. Click **"..."** (top right) → **"Connections"**
3. Search for **"Blog Publisher"** (your integration name)
4. Click to add it

You should see a confirmation that the integration now has access.

## Step 5: Get the Database ID

You'll need this for the GitHub Action.

1. Open your database in Notion (full page view)
2. Look at the URL:
   ```
   https://www.notion.so/yourworkspace/abc123def456...?v=...
                                        └──────────────┘
                                        This is your Database ID
   ```
3. Copy the **32-character ID** (before the `?v=`)

## What You Should Have Now

After completing these steps, you should have:

- [ ] Integration Secret: `ntn_xxxxxxxxxxxx` or `secret_xxxxxxxxxxxx`
- [ ] Database ID: `abc123def456...` (32 chars)

## Next Steps

See [github-actions-setup.md](./github-actions-setup.md) for configuring the publishing workflow.

## Notion API Scope Reference

| Level | What happens |
|-------|--------------|
| **Account level** | Integrations are created in the Developer Portal, tied to your account |
| **Workspace level** | Each integration must be installed into specific workspaces |
| **Page/Database level** | You must explicitly share each page or database with the integration |

The integration will **only** see databases/pages you explicitly share with it - nothing else in your workspace.
