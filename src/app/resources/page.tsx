export default function ResourcesPage() {
  const resources = [
    {
      title: "Virginia Tax Relief",
      description: "Information on property tax exemptions for veterans and elderly residents in Newport News.",
      link: "https://www.nnva.gov/734/Tax-Relief-Deferral-Exemption-Abatement",
      icon: "⚖️"
    },
    {
      title: "Community Assistance",
      description: "Local food banks, housing support, and emergency services available in the Peninsula area.",
      link: "https://www.nnva.gov/human-services",
      icon: "🤝"
    },
    {
      title: "Business Development",
      description: "Resources for starting or growing a business in Newport News, including grants and permits.",
      link: "https://www.nnva.gov/development",
      icon: "💼"
    }
  ];

  return (
    <div className="bg-slate-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Community <span className="text-blue-600">Resources</span></h1>
          <p className="text-slate-500 text-xl max-w-2xl">
            Essential information and support programs provided by the City of Newport News and the Commonwealth of Virginia.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((res) => (
            <div key={res.title} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col items-start">
              <span className="text-4xl mb-6">{res.icon}</span>
              <h3 className="text-2xl font-bold mb-3">{res.title}</h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                {res.description}
              </p>
              <a href={res.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center font-bold text-blue-600 hover:gap-2 transition-all">
                Access Resource <span>→</span>
              </a>
            </div>
          ))}
        </div>

        {/* Ad Slot Mockup */}
        <div className="mt-20 bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-inner">
          <p className="text-xs font-bold text-slate-300 uppercase mb-4 tracking-widest">Sponsored Information</p>
          <div className="text-slate-400 italic text-sm">
            Interested in promoting your local service? Contact us for partnership opportunities.
          </div>
        </div>
      </div>
    </div>
  );
}
