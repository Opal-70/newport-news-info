import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

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

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
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

export function getPostData(slug: string): PostData | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
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
