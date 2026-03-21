import Parser from 'rss-parser';

const parser = new Parser();

export const RSS_SOURCES = {
  CITY_NEWS: 'https://www.nnva.gov/RSSFeed.aspx?ModID=1&CID=All-0',
  CITY_EVENTS: 'https://www.nnva.gov/RSSFeed.aspx?ModID=58&CID=All-0', // Verified common ID for events
  LOCAL_WAVY: 'https://www.wavy.com/news/local-news/newport-news/feed/',
};

export async function fetchAllData() {
  const results: any[] = [];

  for (const [key, url] of Object.entries(RSS_SOURCES)) {
    try {
      const feed = await parser.parseURL(url);
      results.push(...feed.items.map(item => ({
        id: item.guid || item.link,
        title: item.title,
        link: item.link,
        date: item.pubDate,
        content: item.contentSnippet,
        source: key
      })));
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
    }
  }

  return results;
}
