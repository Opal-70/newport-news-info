import Link from 'next/link';

// Sample blog data (to be replaced by daily-blog.json)
const sampleBlogs = [
  {
    slug: 'weekend-gems',
    title: 'Weekend in Newport News: 5 Hidden Gems',
    date: 'March 21, 2026',
    excerpt: 'Discover the quiet spots along the Noland Trail and the best coffee shop you\'ve never heard of.',
    category: 'Lifestyle'
  },
  {
    slug: 'tax-saving-tips',
    title: 'Virginia Tax Season: What Local Residents Need to Know',
    date: 'March 18, 2026',
    excerpt: 'Save more this year with these specific deductions available to Newport News homeowners.',
    category: 'Finance'
  }
];

export default function GuidesPage() {
  return (
    <div className="bg-white min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Local <span className="text-blue-600 font-serif italic text-5xl">Guides</span></h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Daily insights, hidden gems, and useful tips written by our AI resident scout.
          </p>
        </header>

        <div className="space-y-12">
          {sampleBlogs.map((blog) => (
            <Link href={`/guides/${blog.slug}`} key={blog.slug} className="group block">
              <article className="border-b border-slate-100 pb-12 hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-widest text-blue-600">
                  <span>{blog.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400 font-normal">{blog.date}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{blog.title}</h2>
                <p className="text-slate-600 leading-relaxed text-lg mb-6">
                  {blog.excerpt}
                </p>
                <span className="text-blue-600 font-bold flex items-center gap-2">
                  Keep reading <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </article>
            </Link>
          ))}
        </div>

        {/* Amazon Associates Mockup Section */}
        <div className="mt-20 p-8 rounded-3xl bg-slate-50 border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase mb-6 text-center tracking-widest">Recommended Gear (Amazon Associates)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">🎒</div>
              <div>
                <p className="font-bold text-sm">Lightweight Daypack</p>
                <p className="text-xs text-blue-600 font-bold">$45.99 - Buy Now</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">📷</div>
              <div>
                <p className="font-bold text-sm">Compact Travel Camera</p>
                <p className="text-xs text-blue-600 font-bold">$349.00 - Buy Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
