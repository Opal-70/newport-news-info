import Link from "next/link";
import { notFound } from "next/navigation";
import localInfo from "../../../../public/data/local-info.json";

interface LocalItem {
  id: string;
  name: string;
  category: string;
  date: string;
  location: string;
  target: string;
  description: string;
  link: string;
}

export async function generateStaticParams() {
  const allItems = [...localInfo.events, ...localInfo.benefits];
  return allItems.map((item) => ({
    id: item.id,
  }));
}

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const allItems = [...localInfo.events, ...localInfo.benefits] as LocalItem[];
  const item = allItems.find((i) => i.id === id);

  if (!item) return notFound();

  return (
    <div className="min-h-screen bg-white pb-32 selection:bg-oyster-navy selection:text-white">
      {/* Top Banner Accent */}
      <div className="h-1 bg-oyster-gold"></div>

      <main className="max-w-6xl mx-auto px-6 sm:px-12 pt-32">
        {/* Breadcrumbs - Clean & Minimal */}
        <nav className="flex items-center text-[10px] font-display font-bold uppercase tracking-[0.3em] text-gray-400 mb-20 border-b border-gray-100 pb-8">
          <Link href="/" className="hover:text-oyster-navy transition-colors">Home</Link>
          <span className="mx-6 text-gray-200">/</span>
          <span className="text-gray-400">{item.category}</span>
          <span className="mx-6 text-gray-200">/</span>
          <span className="text-oyster-navy italic">{item.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Main Content Column */}
          <div className="lg:col-span-7">
            <header className="mb-20">
              <span className="inline-block text-oyster-gold font-display font-bold text-[10px] uppercase tracking-[0.4em] mb-10">
                Community Directory / {item.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-oyster-navy leading-[1.1] tracking-tight uppercase mb-12">
                {item.name}
              </h1>
              <div className="flex items-center gap-6 text-gray-400 font-light italic">
                <span className="w-10 h-[1px] bg-oyster-gold"></span>
                <p className="text-xs uppercase tracking-widest">Verified Municipal Data</p>
                <span className="text-gray-200">|</span>
                <p className="text-xs uppercase tracking-widest">Public Record</p>
              </div>
            </header>

            {/* Ad Space (Top-Article) */}
            <div className="bg-oyster-gray border border-gray-100 p-4 mb-20">
              <div className="h-20 flex flex-col items-center justify-center text-gray-300 font-display font-medium italic text-[10px] uppercase tracking-widest border border-dashed border-gray-200">
                Google AdSense - Minimalist Placement
              </div>
            </div>

            <article className="prose prose-slate prose-lg max-w-none">
              <p className="text-2xl text-gray-600 font-light leading-relaxed mb-12 italic border-l-4 border-oyster-gold pl-10">
                {item.description}
              </p>
              <div className="h-px bg-gray-100 my-16"></div>
              <p className="text-gray-500 leading-relaxed font-light text-lg">
                This {item.category.toLowerCase()} is part of the ongoing commitment by the City of Newport News to provide comprehensive community support and cultural enrichment. For complete details, including registration requirements and specific departmental contacts, please proceed to the primary official portal linked below.
              </p>
            </article>

            {/* Ad Space (Bottom-Article) */}
            <div className="bg-white border-y border-gray-100 py-16 mt-20 mb-20">
              <div className="h-48 flex flex-col items-center justify-center text-gray-200 font-display font-medium italic text-[10px] uppercase tracking-widest border border-dashed border-gray-200">
                Google AdSense - Billboard Display
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 items-center">
              <a href={item.link} className="w-full sm:w-auto bg-oyster-navy text-white text-center px-16 py-6 font-display font-bold text-xs uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl shadow-oyster-navy/10">
                Official Access Site →
              </a>
              <Link href="/" className="text-gray-400 font-display font-bold text-[10px] uppercase tracking-[0.3em] hover:text-oyster-navy transition-colors border-b border-gray-100 pb-1">
                Return to Directory
              </Link>
            </div>
          </div>

          {/* Sidebar Column - Refined & Sharp */}
          <div className="lg:col-span-5 self-start sticky top-40 bg-oyster-gray p-16 border border-gray-100">
            <h4 className="text-[10px] font-display font-bold text-oyster-navy uppercase tracking-[0.4em] mb-12 border-b border-gray-200 pb-6 italic">
              Record Summary
            </h4>
            <div className="space-y-12">
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-oyster-gold uppercase tracking-[0.3em]">Date of Occurrence</p>
                <p className="text-xl font-display font-bold text-oyster-navy uppercase tracking-tight">{item.date}</p>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-oyster-gold uppercase tracking-[0.3em]">Primary Location</p>
                <p className="text-xl font-display font-bold text-oyster-navy uppercase tracking-tight">{item.location}</p>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-oyster-gold uppercase tracking-[0.3em]">Target Registry</p>
                <p className="text-xl font-display font-bold text-oyster-navy uppercase tracking-tight">{item.target}</p>
              </div>
              
              {/* Sidebar Ad */}
              <div className="pt-16 border-t border-gray-200">
                <div className="bg-white h-80 flex flex-col items-center justify-center text-gray-200 font-display font-medium italic text-[10px] uppercase tracking-widest border border-dashed border-gray-200 text-center p-8 leading-relaxed">
                  Google AdSense<br />
                  Professional Sidebar Unit
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
