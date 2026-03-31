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

  // Simple merge logic: avoid duplicates by ID or Title
  const existingEventIds = new Set(localInfo.events.map((e: any) => e.id));
  const existingEventNames = new Set(localInfo.events.map((e: any) => e.name));
  const existingBenefitNames = new Set(localInfo.benefits.map((b: any) => b.name));

  newEvents.forEach(event => {
    if (!existingEventIds.has(event.id) && !existingEventNames.has(event.name) && !existingBenefitNames.has(event.name)) {
      localInfo.events.unshift(event);
    } else {
      console.log(`Skipping data entry: "${event.name}" already exists in local-info.json.`);
    }
  });

  // Keep events list manageable (e.g., top 15)
  localInfo.events = localInfo.events.slice(0, 15);

  fs.writeFileSync(localInfoPath, JSON.stringify(localInfo, null, 2));
  console.log('Updated public/data/local-info.json');

  // 2. Generate Daily Blog Post (if enough data)
  if (rawData.length > 0) {
    const latestItem = rawData[0];
    const itemName = latestItem.title;
    
    // Check for duplicates in blog posts (Titles)
    const blogDir = path.join(process.cwd(), 'src/content/blog');
    const existingBlogFiles = fs.existsSync(blogDir) ? fs.readdirSync(blogDir) : [];
    let isAlreadyBlogged = false;
    
    for (const file of existingBlogFiles) {
      if (file.endsWith('.md')) {
        const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
        // Check if title or ID is in the content
        if (content.includes(itemName) || (latestItem.id && content.includes(String(latestItem.id)))) {
          isAlreadyBlogged = true;
          break;
        }
      }
    }

    if (isAlreadyBlogged) {
      console.log(`Skipping blog generation: "${itemName}" is already published.`);
    } else {
      console.log(`Generating daily blog post for: "${itemName}"...`);
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
        
        if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
        
        const blogFilePath = path.join(blogDir, `${slug}.md`);
        fs.writeFileSync(blogFilePath, blogContent);
        console.log(`Blog post saved to ${blogFilePath}`);
      }
    }
  }

  console.log('--- Sync Complete ---');
}

sync().catch(console.error);
