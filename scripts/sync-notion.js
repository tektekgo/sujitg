/**
 * Sync articles from Notion to blogPosts.json
 *
 * Usage:
 *   NOTION_API_KEY=xxx NOTION_DATABASE_ID=xxx node scripts/sync-notion.js
 *
 * Or via GitHub Actions with secrets
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const BLOG_POSTS_PATH = path.join(__dirname, '../src/data/blogPosts.json');
const ARTICLES_DIR = path.join(__dirname, '../src/data/articles');

async function fetchNotionDatabase() {
  const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // Must match Notion select options exactly (see database Status property).
      filter: {
        or: [
          { property: 'Status', select: { equals: 'Published' } },
          { property: 'Status', select: { equals: 'Ready To Publish' } },
        ],
      },
      sorts: [
        { property: 'PublishedDate', direction: 'descending' }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Notion API error: ${response.status} - ${error}`);
  }

  return response.json();
}

async function fetchPageBlocks(pageId) {
  const blocks = [];
  let cursor = undefined;

  do {
    const url = `https://api.notion.com/v1/blocks/${pageId}/children${cursor ? `?start_cursor=${cursor}` : ''}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch blocks: ${response.status} - ${error}`);
    }

    const data = await response.json();
    blocks.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return blocks;
}

async function updateNotionPageStatus(pageId) {
  const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        'Status': { select: { name: 'Published' } },
        'PublishedDate': { date: { start: new Date().toISOString().split('T')[0] } }
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.warn(`Failed to update page ${pageId}: ${error}`);
  }
}

function formatDate(dateString) {
  if (!dateString) {
    const now = new Date();
    return now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/** Notion URL property → trimmed string or null (omit empty). */
function optionalUrl(page, propertyName) {
  const v = getPropertyValue(page, propertyName, 'url');
  if (!v || typeof v !== 'string' || !v.trim()) return null;
  return v.trim();
}

function getPropertyValue(page, propertyName, type) {
  const prop = page.properties[propertyName];
  if (!prop) return null;

  switch (type) {
    case 'title':
      return prop.title?.[0]?.plain_text || '';
    case 'rich_text':
      return prop.rich_text?.[0]?.plain_text || '';
    case 'select':
      return prop.select?.name || '';
    case 'multi_select':
      return prop.multi_select?.map(s => s.name) || [];
    case 'url':
      return prop.url || null;
    case 'date':
      return prop.date?.start || null;
    default:
      return null;
  }
}

function notionPageToBlogPost(page) {
  const title = getPropertyValue(page, 'Title', 'title') || 'Untitled';
  const slug = getPropertyValue(page, 'Slug', 'rich_text') ||
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return {
    id: slug,
    category: getPropertyValue(page, 'Category', 'select') || 'General',
    title: title,
    excerpt: getPropertyValue(page, 'Excerpt', 'rich_text') || '',
    date: formatDate(getPropertyValue(page, 'PublishedDate', 'date')),
    readTime: getPropertyValue(page, 'ReadTime', 'rich_text') || '5 min read',
    link: getPropertyValue(page, 'Link', 'url'),
    // Cross-post URLs (Notion property names must match exactly)
    mediumURL: optionalUrl(page, 'mediumURL'),
    devtoURL: optionalUrl(page, 'devtoURL'),
    substackURL: optionalUrl(page, 'substackURL'),
    linkedinURL: optionalUrl(page, 'linkedinURL'),
    twitterxURL: optionalUrl(page, 'twitterxURL'),
    source: 'notion',
    notionId: page.id
  };
}

async function main() {
  console.log('🔄 Syncing articles from Notion...\n');

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error('❌ Missing NOTION_API_KEY or NOTION_DATABASE_ID environment variables');
    process.exit(1);
  }

  // Ensure articles directory exists
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }

  // Load existing posts
  let existingPosts = [];
  try {
    const data = fs.readFileSync(BLOG_POSTS_PATH, 'utf8');
    existingPosts = JSON.parse(data);
    console.log(`📚 Loaded ${existingPosts.length} existing posts`);
  } catch (err) {
    console.log('📝 No existing posts file, starting fresh');
  }

  // Fetch from Notion
  let notionData;
  try {
    notionData = await fetchNotionDatabase();
    console.log(`📥 Fetched ${notionData.results.length} posts from Notion\n`);
  } catch (err) {
    console.error('❌ Failed to fetch from Notion:', err.message);
    process.exit(1);
  }

  // Convert Notion pages to blog posts and fetch content
  const notionPosts = [];
  for (const page of notionData.results) {
    const post = notionPageToBlogPost(page);
    notionPosts.push(post);

    // Only fetch content for articles without external links
    if (!post.link) {
      console.log(`📄 Fetching content: ${post.title}`);
      try {
        const blocks = await fetchPageBlocks(page.id);
        const contentPath = path.join(ARTICLES_DIR, `${post.id}.json`);
        fs.writeFileSync(contentPath, JSON.stringify(blocks, null, 2));
        post.hasContent = true;
        console.log(`   ✓ Saved ${blocks.length} blocks`);
      } catch (err) {
        console.warn(`   ⚠ Failed to fetch content: ${err.message}`);
        post.hasContent = false;
      }
    }
  }

  // Keep manual posts, replace/add Notion posts
  const manualPosts = existingPosts.filter(p => p.source === 'manual');

  // Update status for newly published posts
  for (const page of notionData.results) {
    const status = getPropertyValue(page, 'Status', 'select');
    if (status === 'Ready To Publish') {
      console.log(`📤 Marking as published: ${getPropertyValue(page, 'Title', 'title')}`);
      await updateNotionPageStatus(page.id);
    }
  }

  // Merge: Notion posts first (newest), then manual posts
  const allPosts = [...notionPosts, ...manualPosts];

  // Write to file
  fs.writeFileSync(BLOG_POSTS_PATH, JSON.stringify(allPosts, null, 2));

  console.log('\n✅ Sync complete!');
  console.log(`   - Notion posts: ${notionPosts.length}`);
  console.log(`   - Manual posts: ${manualPosts.length}`);
  console.log(`   - Total: ${allPosts.length}`);
}

main().catch(err => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});
