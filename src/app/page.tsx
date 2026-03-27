"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";

interface LocalItem {
  id: string;
  name: string;
  category: string;
  date: string;
  location: string;
  description: string;
  link: string;
}

interface LocalData {
  events: LocalItem[];
  benefits: LocalItem[];
}

export default function HomePage() {
  const [data, setData] = useState<LocalData | null>(null);

  useEffect(() => {
    fetch("/data/local-info.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-oyster-navy selection:text-white">
      {/* Header - Clean, Sticky, White */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 py-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between h-16 items-center">
          <Link href="/" className="text-xl sm:text-2xl font-display font-bold text-oyster-navy tracking-widest uppercase">
            Newport News <span className="font-light text-gray-400">Hub</span>
          </Link>
          <nav className="hidden md:flex space-x-12 font-display font-medium text-xs uppercase tracking-[0.2em] text-gray-500">
            <Link href="/" className="text-oyster-navy border-b border-oyster-navy pb-1">Home</Link>
            <Link href="#events" className="hover:text-oyster-navy transition-colors">Events</Link>
            <Link href="#benefits" className="hover:text-oyster-navy transition-colors">Resources</Link>
            <Link href="/guides" className="hover:text-oyster-navy transition-colors">Connect</Link>
          </nav>
          <div className="flex items-center gap-6">
            <button className="text-xs font-display font-bold uppercase tracking-widest border-b-2 border-oyster-gold pb-1 text-oyster-navy hover:text-oyster-gold transition-colors">
              Join Newsletter
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Minimalist, Wide Spacing */}
      <section className="bg-white pt-32 pb-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-oyster-gold font-display font-bold text-xs uppercase tracking-[0.4em] mb-10">
            Living the Coastal Lifestyle
          </span>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-oyster-navy mb-12 tracking-tight leading-[1.1]">
            Experience Life at <br />
            Newport News
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-16 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Discover the essential guide to community events, local resources, and professional insights in the heart of Virginia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href="#events" className="w-full sm:w-auto bg-oyster-navy text-white px-12 py-5 font-display font-bold text-xs uppercase tracking-[0.3em] hover:bg-black transition-all">
              Discover Events
            </Link>
            <Link href="#benefits" className="w-full sm:w-auto border border-gray-200 text-oyster-navy px-12 py-5 font-display font-bold text-xs uppercase tracking-[0.3em] hover:bg-gray-50 transition-all">
              Local Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section - Light Gray Background */}
      <section id="events" className="bg-oyster-gray py-40 px-6">
        <main className="max-w-7xl mx-auto px-6 sm:px-12">
          {/* Ad Space (Top) */}
          <div className="mb-24 flex flex-col items-center">
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-4">Advertisement</span>
            <div className="w-full max-w-5xl h-24 bg-white border border-gray-100 flex items-center justify-center text-gray-400 font-display font-medium italic text-xs tracking-widest">
              Google AdSense - Minimalist Leaderboard
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-gray-200 pb-12">
            <div>
              <h2 className="text-4xl font-display font-bold text-oyster-navy tracking-tight uppercase mb-4">Event Calendar</h2>
              <p className="text-gray-400 font-light tracking-wide italic">Handpicked community experiences in Newport News.</p>
            </div>
            <Link href="#" className="font-display font-bold text-xs text-oyster-navy border-b-2 border-oyster-gold pb-1 uppercase tracking-[0.3em] hover:text-oyster-gold transition-colors">
              View Entire Calendar
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {data?.events.map((event, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col h-full group">
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-oyster-navy text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {event.category}
                  </span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{event.date}</p>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight group-hover:text-oyster-navy transition-colors">
                  {event.name}
                </h3>
                <p className="text-base text-gray-600 mb-8 leading-relaxed font-normal line-clamp-3 flex-grow">
                  {event.description}
                </p>
                <div className="mt-auto border-t border-gray-100 pt-6">
                  <Link href={`/events/${event.id}`} className="inline-flex items-center font-bold text-xs text-oyster-navy hover:text-oyster-gold transition-colors uppercase tracking-widest">
                    Details <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>

      {/* Ad Space (Middle) */}
      <section className="bg-white py-12 text-center px-6">
        <AdBanner dataAdSlot="home_page_middle" />
      </section>

      {/* Resources Section - White Background */}
      <section id="benefits" className="bg-white py-40 px-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          {/* JSON-LD for Events and Benefits */}
          {data && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify([
                  ...data.events.map(event => ({
                    "@context": "https://schema.org",
                    "@type": "Event",
                    "name": event.name,
                    "startDate": event.date,
                    "location": {
                      "@type": "Place",
                      "name": event.location,
                      "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Newport News",
                        "addressRegion": "VA"
                      }
                    },
                    "description": event.description
                  })),
                  ...data.benefits.map(benefit => ({
                    "@context": "https://schema.org",
                    "@type": "GovernmentService",
                    "name": benefit.name,
                    "description": benefit.description,
                    "provider": {
                      "@type": "GovernmentOrganization",
                      "name": "City of Newport News"
                    }
                  }))
                ])
              }}
            />
          )}

          <div className="text-center mb-24">
            <h2 className="text-4xl font-display font-bold text-oyster-navy tracking-tight uppercase mb-6">Local Benefits & Programs</h2>
            <div className="w-20 h-1 bg-oyster-gold mx-auto mb-8"></div>
            <p className="text-gray-400 font-light max-w-xl mx-auto italic tracking-wide">
              Official assistance programs and community relief initiatives for Newport News residents.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {data?.benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col h-full group">
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-oyster-gold/20 text-oyster-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {benefit.category}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight group-hover:text-oyster-gold transition-colors">
                  {benefit.name}
                </h3>
                <p className="text-base text-gray-600 mb-8 leading-relaxed font-normal line-clamp-3 flex-grow">
                  {benefit.description}
                </p>
                <div className="mt-auto border-t border-gray-100 pt-6">
                  <Link href={`/events/${benefit.id}`} className="inline-flex items-center font-bold text-xs text-oyster-gold hover:text-oyster-navy transition-colors uppercase tracking-widest">
                    Request Information <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Dark, Professional */}
      <footer className="bg-oyster-navy text-gray-400 py-32 px-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
            <div className="md:col-span-2">
              <h3 className="text-white text-3xl font-display font-bold mb-10 uppercase tracking-widest flex items-center gap-4">
                NN <span className="w-8 h-[2px] bg-oyster-gold"></span> HUB
              </h3>
              <p className="text-lg leading-relaxed max-w-sm font-light italic mb-10">
                A sophisticated digital portal dedicated to the growth and community of Newport News, Virginia.
              </p>
            </div>
            <div>
              <h4 className="text-white font-display font-bold mb-10 uppercase tracking-widest text-[10px]">Directory</h4>
              <ul className="space-y-6 font-medium text-xs uppercase tracking-widest">
                <li><Link href="/" className="hover:text-oyster-gold transition-colors">Calendar</Link></li>
                <li><Link href="#events" className="hover:text-oyster-gold transition-colors">Local Guides</Link></li>
                <li><Link href="#benefits" className="hover:text-oyster-gold transition-colors">Resources</Link></li>
                <li><Link href="/guides" className="hover:text-oyster-gold transition-colors">City Council</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-display font-bold mb-10 uppercase tracking-widest text-[10px]">Data Portal</h4>
              <p className="text-xs italic font-light leading-loose tracking-wide">
                Proudly sourcing from Newport News Municipal Data & Virginia Open Portals. All rights reserved 2026.
              </p>
            </div>
          </div>
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">
            <p>© Newport News Local Hub. Professional Series.</p>
            <div className="flex gap-12">
              <Link href="#" className="hover:text-white transition-colors">Legal</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
