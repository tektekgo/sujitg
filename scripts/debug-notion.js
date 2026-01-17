/**
 * Debug script to see what Notion returns
 */

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function debug() {
  console.log('🔍 Debugging Notion connection...\n');
  console.log('Database ID:', NOTION_DATABASE_ID);
  console.log('API Key:', NOTION_API_KEY ? '✅ Set (hidden)' : '❌ Missing');
  console.log('\n---\n');

  // First, let's query WITHOUT any filter to see all posts
  const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}) // No filter - get everything
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('❌ API Error:', response.status, error);
    return;
  }

  const data = await response.json();
  console.log(`📊 Total rows in database: ${data.results.length}\n`);

  // Show each row's properties
  for (const page of data.results) {
    console.log('---');
    console.log('Page ID:', page.id);

    // List all properties and their values
    for (const [key, value] of Object.entries(page.properties)) {
      let displayValue = '';

      switch (value.type) {
        case 'title':
          displayValue = value.title?.[0]?.plain_text || '(empty)';
          break;
        case 'rich_text':
          displayValue = value.rich_text?.[0]?.plain_text || '(empty)';
          break;
        case 'select':
          displayValue = value.select?.name || '(empty)';
          break;
        case 'multi_select':
          displayValue = value.multi_select?.map(s => s.name).join(', ') || '(empty)';
          break;
        case 'url':
          displayValue = value.url || '(empty)';
          break;
        case 'date':
          displayValue = value.date?.start || '(empty)';
          break;
        default:
          displayValue = `(${value.type})`;
      }

      console.log(`  ${key}: ${displayValue}`);
    }
  }
}

debug().catch(console.error);
