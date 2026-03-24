import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-blue-900 border-b pb-4">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">아직 작성된 블로그 글이 없습니다.</p>
      ) : (
        <div className="grid gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                <h2 className="text-2xl font-bold text-slate-800 hover:text-blue-900 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <time className="text-sm text-slate-500">{post.date}</time>
              </div>
              <p className="text-slate-600 mb-4">{post.summary}</p>
              <div className="flex gap-2 text-sm">
                {post.category && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
