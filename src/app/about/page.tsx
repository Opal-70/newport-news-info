import React from 'react';

export const metadata = {
  title: "About Us | Newport News Local Hub",
  description: "Learn about our mission to provide helpful local information for Newport News residents using open data and AI.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">About Newport News Local Hub</h1>
        <p className="text-xl text-slate-600">Connecting our community through data and technology.</p>
      </header>

      <div className="space-y-12 text-slate-700 leading-relaxed">
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            🎯 Our Mission
          </h2>
          <p>
            Our mission is simple: <strong>to provide Newport News residents with the most useful and timely local information and community news.</strong> 
            We strive to be a digital hub where anyone can easily discover essential information about local events, benefits, and public services in their daily lives.
          </p>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            📊 Data Sources
          </h2>
          <p className="mb-4">
            We prioritize accuracy and reliability. To achieve this, we utilize data from verified official agencies:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>City of Newport News Open Data Portal:</strong> Up-to-date data on city operations</li>
            <li><strong>Virginia.gov:</strong> Official service and benefit information from the Commonwealth of Virginia</li>
            <li><strong>National Park Service (NPS):</strong> Information on local parks and historical sites</li>
          </ul>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            🤖 How It Works
          </h2>
          <p>
            Newport News Local Hub uses advanced <strong>Artificial Intelligence (AI) technology</strong> to analyze vast amounts of public data. 
            Beyond simply listing facts, we reorganize the information in a friendly and easy-to-read format for our neighbors. 
            All AI-generated content is managed according to strict editorial guidelines.
          </p>
        </section>

        <footer className="text-center pt-8 border-t border-slate-200 mt-12">
          <p className="text-slate-500 text-sm">
            Interested in learning more? <a href="/" className="text-blue-600 hover:underline font-semibold">Back to Home</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
