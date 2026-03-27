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
  target?: string;
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
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-900 tracking-tight">
            Newport News <span className="text-blue-600">Hub</span>
          </Link>
          <nav className="hidden md:flex space-x-8 font-medium text-sm text-slate-600">
            <Link href="/" className="text-blue-700 font-bold">Home</Link>
            <Link href="/blog" className="hover:text-blue-700 transition-colors">Blog</Link>
            <Link href="/guides" className="hover:text-blue-700 transition-colors">Local Guides</Link>
            <Link href="#resources" className="hover:text-blue-700 transition-colors">Resources</Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        
        {/* Ad Space (Top) */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-4xl h-24 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm shadow-sm">
            Google AdSense - Banner Advertisement
          </div>
        </div>

        {/* Hero Welcome (Compact) */}
        <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Welcome to Newport News Hub
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Your essential guide to community events, local resources, and the best of the Virginia Peninsula.
          </p>
        </section>

        {/* Events Section - "Seongnam Style" */}
        <section id="events" className="rounded-2xl shadow-sm border border-slate-200 bg-white overflow-hidden">
          {/* Blue Header Strip */}
          <div className="flex justify-between items-center bg-blue-700 text-white px-6 py-4">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">📅</span> Community Events
            </h2>
            <Link href="/events" className="text-sm font-medium text-blue-100 hover:text-white hover:underline transition-all flex items-center gap-1">
              View All <span>→</span>
            </Link>
          </div>
          
          {/* Content Body */}
          <div className="p-6 bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.events.map((event, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-100 p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">
                      {event.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">
                    {event.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="mt-auto border-t border-slate-50 pt-4">
                    <Link href={`/events/${event.id}`} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                      Details <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ad Space (Middle) */}
        <section className="flex justify-center my-12">
          <AdBanner dataAdSlot="home_page_middle" />
        </section>

        {/* Resources Section - "Seongnam Style" */}
        <section id="resources" className="rounded-2xl shadow-sm border border-slate-200 bg-white overflow-hidden">
          {/* Blue Header Strip */}
          <div className="flex justify-between items-center bg-sky-700 text-white px-6 py-4">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">💡</span> Local Resources & Benefits
            </h2>
            <Link href="/resources" className="text-sm font-medium text-sky-100 hover:text-white hover:underline transition-all flex items-center gap-1">
              View All <span>→</span>
            </Link>
          </div>
          
          {/* Content Body */}
          <div className="p-6 bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data?.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-100 p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-xs font-bold">
                      {benefit.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{benefit.target}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {benefit.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {benefit.description}
                  </p>
                  <div className="mt-auto border-t border-slate-50 pt-4">
                    <Link href={`/events/${benefit.id}`} className="text-sm font-bold text-sky-600 hover:text-sky-800 transition-colors flex items-center gap-1">
                      Request Information <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Newport News Hub</h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Providing essential community updates, practical guides, and local resources for the modern resident.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Updates</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Local Guides</Link></li>
              <li><Link href="#resources" className="hover:text-white transition-colors">Community Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><p className="pt-4 text-xs">© 2026 NNHub. All rights reserved.</p></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Structured Data */}
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
    </div>
  );
}

