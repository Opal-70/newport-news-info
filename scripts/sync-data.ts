import fs from 'fs';
import path from 'path';
import { fetchAllData } from '../src/lib/data-fetcher';
import { generateBlogPost } from '../src/lib/gemini';

async function sync() {
  console.log('--- Starting Data Sync ---');

  // 1. Fetch News & Events
  const rawData = await fetchAllData();
  const dataPath = path.join(process.cwd(), 'src/data');
  if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath, { recursive: true });

  fs.writeFileSync(
    path.join(dataPath, 'latest-news.json'),
    JSON.stringify(rawData, null, 2)
  );
  console.log(`Fetched ${rawData.length} items.`);

  // 2. Generate Daily Blog Post (if enough data)
  if (rawData.length > 0) {
    console.log('Generating daily blog post with Gemini...');
    const blogContent = await generateBlogPost(rawData.slice(0, 5));
    if (blogContent) {
      const blogData = {
        date: new Date().toISOString(),
        title: "Daily Newport News Update",
        content: blogContent,
        slug: `update-${new Date().toISOString().split('T')[0]}`
      };
      
      const blogPath = path.join(dataPath, 'daily-blog.json');
      fs.writeFileSync(blogPath, JSON.stringify(blogData, null, 2));
      console.log('Blog post generated and saved.');
    }
  }

  console.log('--- Sync Complete ---');
}

sync().catch(console.error);
