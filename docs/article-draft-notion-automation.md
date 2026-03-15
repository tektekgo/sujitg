# Building a Notion-to-Website Publishing Pipeline with GitHub Actions

*How I automated my blog publishing workflow using Notion as a CMS, GitHub Actions for orchestration, and React for rendering.*

---

## The Problem

As someone who writes about technology leadership and digital transformation, I wanted a frictionless way to publish articles. The typical workflow felt fragmented:

- Write in Google Docs or Word
- Copy to Medium or LinkedIn
- Manually update my portfolio website
- Repeat for every article

I wanted a **single source of truth** where I could write once and publish everywhere—or at least to my own website automatically.

**My requirements were simple:**
1. Write in a tool I already use (Notion)
2. Set a status to "Ready to Publish" and walk away
3. Have the article appear on my website automatically
4. Support both native articles and links to external posts (Medium, LinkedIn)

---

## The Solution Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     Notion      │     │  GitHub Action  │     │   Portfolio     │
│   (Write here)  │────▶│  (Weekly sync)  │────▶│   Website       │
│                 │     │                 │     │                 │
│ Status: Ready   │     │ • Fetch posts   │     │ • Renders full  │
│ to Publish      │     │ • Pull content  │     │   articles      │
│                 │     │ • Commit to repo│     │ • Auto rebuilds │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

The beauty of this approach:
- **No database needed** — content is stored as JSON in the repo
- **No server costs** — GitHub Actions free tier is more than enough
- **Version controlled** — every article change is a git commit
- **Fast** — static site, content is pre-fetched at build time

---

## Setting Up Notion as a CMS

### The Database Structure

I created a simple Notion database called "Articles" with these properties:

| Property | Type | Purpose |
|----------|------|---------|
| Title | Title | Article headline |
| Slug | Text | URL-friendly ID (`my-article-name`) |
| Category | Select | AI, Automation, Cloud, Leadership |
| Excerpt | Text | Short description for article cards |
| ReadTime | Text | "5 min read" |
| Status | Select | Draft, Ready to Publish, Published |
| Link | URL | External link (for Medium/LinkedIn posts) |

The key insight: **each database row is a full page**. The properties are metadata; the page content below is the actual article.

### Creating the Integration

1. Go to [notion.so/my-integrations](https://notion.so/my-integrations)
2. Create a new internal integration
3. Grant it read and update permissions
4. Share your Articles database with the integration

You'll get an API key (starts with `ntn_` or `secret_`) and need your database ID from the URL.

---

## The Sync Script

The heart of the system is a Node.js script that:
1. Fetches articles from Notion with status "Ready to Publish" or "Published"
2. Pulls the full page content (blocks)
3. Saves everything as JSON files
4. Updates the article status in Notion

### Fetching the Database

```javascript
async function fetchNotionDatabase() {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          or: [
            { property: 'Status', select: { equals: 'Published' } },
            { property: 'Status', select: { equals: 'Ready to Publish' } }
          ]
        }
      })
    }
  );
  return response.json();
}
```

### Fetching Page Content

Notion stores content as "blocks" — paragraphs, headings, lists, images, etc. Each block has a type and content.

```javascript
async function fetchPageBlocks(pageId) {
  const blocks = [];
  let cursor = undefined;

  do {
    const response = await fetch(
      `https://api.notion.com/v1/blocks/${pageId}/children${cursor ? `?start_cursor=${cursor}` : ''}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Notion-Version': '2022-06-28',
        },
      }
    );
    const data = await response.json();
    blocks.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return blocks;
}
```

### Transforming to Blog Post Format

```javascript
function notionPageToBlogPost(page) {
  const title = getPropertyValue(page, 'Title', 'title');
  const slug = getPropertyValue(page, 'Slug', 'rich_text') ||
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return {
    id: slug,
    category: getPropertyValue(page, 'Category', 'select'),
    title: title,
    excerpt: getPropertyValue(page, 'Excerpt', 'rich_text'),
    readTime: getPropertyValue(page, 'ReadTime', 'rich_text'),
    link: getPropertyValue(page, 'Link', 'url'),  // null for native articles
    hasContent: true,
    source: 'notion'
  };
}
```

The script outputs two things:
- `blogPosts.json` — metadata for all articles
- `articles/{slug}.json` — full content for each native article

---

## GitHub Actions Workflow

The workflow runs on a schedule (weekly) and can be triggered manually.

```yaml
name: Sync Notion Articles

on:
  workflow_dispatch:  # Manual trigger
  schedule:
    - cron: '0 9 * * 0'  # Every Sunday at 9 AM UTC

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Sync from Notion
        env:
          NOTION_API_KEY: ${{ secrets.NOTION_API_KEY }}
          NOTION_DATABASE_ID: ${{ secrets.NOTION_DATABASE_ID }}
        run: node scripts/sync-notion.js

      - name: Commit and push changes
        run: |
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git config user.name "github-actions[bot]"
          git add src/data/
          git diff --staged --quiet || git commit -m "Sync articles from Notion"
          git push
```

**Cost:** Nearly zero. A sync takes ~30 seconds. Weekly = ~2 minutes/month. GitHub's free tier gives you 2,000 minutes.

---

## Rendering Notion Blocks in React

Notion content is structured as blocks. Here's a simplified renderer:

```tsx
function NotionBlock({ block }) {
  const { type } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return <p>{renderRichText(value.rich_text)}</p>;

    case 'heading_1':
      return <h1>{renderRichText(value.rich_text)}</h1>;

    case 'heading_2':
      return <h2>{renderRichText(value.rich_text)}</h2>;

    case 'bulleted_list_item':
      return <li>{renderRichText(value.rich_text)}</li>;

    case 'code':
      return (
        <pre>
          <code>{renderRichText(value.rich_text)}</code>
        </pre>
      );

    case 'image':
      const src = value.type === 'external'
        ? value.external.url
        : value.file.url;
      return <img src={src} alt="" />;

    case 'quote':
      return <blockquote>{renderRichText(value.rich_text)}</blockquote>;

    default:
      return null;
  }
}
```

The `renderRichText` function handles inline formatting (bold, italic, links, code).

---

## Supporting Both Native and External Articles

A key design decision: the same system handles both:

- **Native articles** (written in Notion, rendered on site) → `link` is null, `hasContent` is true
- **External articles** (published on Medium/LinkedIn) → `link` points to the external URL

In the UI:
```tsx
{post.link ? (
  <a href={post.link} target="_blank">Read on Medium</a>
) : post.hasContent ? (
  <Link to={`/blog/${post.id}`}>Read Article</Link>
) : (
  <span>Coming Soon</span>
)}
```

This means I can mix my own articles with links to Medium posts, all managed from the same Notion database.

---

## Lessons Learned

### 1. Notion Image URLs Expire

If you upload images directly to Notion, the URLs expire after about an hour. For permanent images, use an external host:
- Upload to Cloudinary, Imgur, or similar
- Paste the external URL in Notion
- These URLs never expire

### 2. Status Field Casing Matters

My script looked for "Ready to Publish" but Notion had "Ready To Publish" (capital T). Exact string matching caught me off guard. Either normalize in code or be consistent in Notion.

### 3. Keep Manual and Synced Posts Separate

I mark posts with a `source` field:
- `source: "notion"` — managed by the sync
- `source: "manual"` — legacy posts, never touched by sync

This prevents the automation from deleting articles I added before building this system.

### 4. The GitHub Actions Free Tier is Generous

I was worried about costs. In practice:
- Sync runs once a week
- Takes ~30 seconds
- Monthly usage: ~2 minutes
- Free tier: 2,000 minutes

I'll never hit the limit with this use case.

---

## The Final Workflow

My publishing workflow is now:

1. **Write** the article in Notion (my daily tool anyway)
2. **Fill in** the metadata (title, slug, category, excerpt)
3. **Set status** to "Ready to Publish"
4. **Done** — the weekly sync picks it up, or I trigger it manually if urgent

No copying, no pasting, no manual updates. Write once, publish automatically.

---

## What's Next?

Future enhancements I'm considering:
- **n8n integration** — for more complex workflows (Slack notifications, draft previews)
- **Reading time calculation** — auto-generate from content length
- **SEO metadata** — auto-generate meta descriptions from excerpts

But honestly? The current system does exactly what I need. Sometimes the best automation is the simplest one that actually works.

---

*This article was written in Notion and automatically published to my website using the system described above. Meta, I know.*

---

## Resources

- [Notion API Documentation](https://developers.notion.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- Source code available on request

---

**Tags:** Automation, Notion, GitHub Actions, React, Publishing
**Category:** Automation
**Read Time:** 8 min read
