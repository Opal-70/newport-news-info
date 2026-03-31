import fs from 'fs';
import path from 'path';
import { fetchAllData } from '../src/lib/data-fetcher';
import { generateBlogPost } from '../src/lib/gemini';

async function sync() {
  console.log('--- Starting Data Sync ---');

  const localInfoPath = path.join(process.cwd(), 'public/data/local-info.json');
  let localInfo: { events: any[], benefits: any[] } = { events: [], benefits: [] };
  
  if (fs.existsSync(localInfoPath)) {
    localInfo = JSON.parse(fs.readFileSync(localInfoPath, 'utf8'));
  }

  // 1. Fetch News & Events from RSS
  const rawData = await fetchAllData();
  console.log(`Fetched ${rawData.length} items from RSS.`);

  // Update "events" if source is CITY_EVENTS
  const newEvents = rawData
    .filter(item => item.source === 'CITY_EVENTS' || item.source === 'CITY_NEWS')
    .map(item => ({
      id: String(item.id),
      name: item.title,
      category: item.source === 'CITY_EVENTS' ? 'Events' : 'Local News',
      date: item.date ? new Date(item.date).toLocaleDateString() : 'Ongoing',
      location: 'Newport News, VA',
      description: item.content || '',
      link: item.link
    }));

  // Simple merge logic: avoid duplicates by ID
  const existingEventIds = new Set(localInfo.events.map((e: any) => e.id));
  newEvents.forEach(event => {
    if (!existingEventIds.has(event.id)) {
      localInfo.events.unshift(event);
    }
  });

  // Keep events list manageable (e.g., top 15)
  localInfo.events = localInfo.events.slice(0, 15);

  fs.writeFileSync(localInfoPath, JSON.stringify(localInfo, null, 2));
  console.log('Updated public/data/local-info.json');

  // 2. Generate Daily Blog Post (if enough data)
  if (rawData.length > 0) {
    console.log('Generating daily blog post with Gemini...');
    const blogBody = await generateBlogPost(rawData.slice(0, 5));
    if (blogBody) {
      const dateStr = new Date().toISOString().split('T')[0];
      const slug = `daily-update-${dateStr}`;
      const title = `Newport News Daily Update: ${new Date().toLocaleDateString()}`;
      
      const blogContent = `---
title: ${title}
date: ${dateStr}
summary: Latest community news and events for Newport News.
category: Daily Update
tags: [NewportNews, LocalNews, Events]
---

${blogBody}
`;
      
      const blogDir = path.join(process.cwd(), 'src/content/blog');
      if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
      
      const blogFilePath = path.join(blogDir, `${slug}.md`);
      fs.writeFileSync(blogFilePath, blogContent);
      console.log(`Blog post saved to ${blogFilePath}`);
    }
  }

  console.log('--- Sync Complete ---');
}

sync().catch(console.error);
