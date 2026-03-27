import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category?: string;
  tags?: string[];
  content: string;
  link?: string;
}

export function getSortedPostsData(contentType: 'blog' | 'guides' = 'blog'): PostData[] {
  const contentDirectory = path.join(process.cwd(), `src/content/${contentType}`);
  
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const matterResult = matter(fileContents);
      
      let date = matterResult.data?.date;
      if (date instanceof Date) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        date = `${yyyy}-${mm}-${dd}`;
      } else if (!date) {
        date = '';
      }

      return {
        slug,
        title: matterResult.data.title || '',
        date: date,
        summary: matterResult.data.summary || '',
        category: matterResult.data.category || '',
        tags: matterResult.data.tags || [],
        content: matterResult.content,
        link: matterResult.data.link || ''
      } as PostData;
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostData(slug: string, contentType: 'blog' | 'guides' = 'blog'): PostData | null {
  const contentDirectory = path.join(process.cwd(), `src/content/${contentType}`);
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  
  let date = matterResult.data?.date;
  if (date instanceof Date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    date = `${yyyy}-${mm}-${dd}`;
  } else if (!date) {
    date = '';
  }

  return {
    slug,
    title: matterResult.data.title || '',
    date: date,
    summary: matterResult.data.summary || '',
    category: matterResult.data.category || '',
    tags: matterResult.data.tags || [],
    content: matterResult.content,
    link: matterResult.data.link || ''
  } as PostData;
}
