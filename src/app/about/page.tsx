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
            🎯 Our Mission (사이트 운영 목적)
          </h2>
          <p>
            우리의 미션은 단순합니다: <strong>뉴포트 뉴스 주민들에게 가장 유익하고 시의적절한 생활 정보와 지역 소식을 빠짐없이 전달하는 것</strong>입니다. 
            행사, 혜택, 공공 서비스 등 일상에 꼭 필요한 정보를 누구나 쉽게 찾아볼 수 있는 디지털 허브를 지향합니다.
          </p>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            📊 Data Sources (데이터 출처)
          </h2>
          <p className="mb-4">
            우리는 정보의 정확성과 신뢰성을 최우선으로 합니다. 이를 위해 검증된 공식 기관의 데이터를 활용합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>City of Newport News Open Data Portal:</strong> 도시 운영 전반에 관한 최신 데이터</li>
            <li><strong>Virginia.gov:</strong> 버지니아 주 정부의 공식 서비스 및 혜택 정보</li>
            <li><strong>National Park Service (NPS):</strong> 지역 공원 및 역사 유적지 정보</li>
          </ul>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            🤖 How It Works (콘텐츠 생성 방식)
          </h2>
          <p>
            Newport News Local Hub는 최신 <strong>인공지능(AI) 기술</strong>을 활용하여 방대한 공공데이터를 실시간으로 분석합니다. 
            단순히 정보를 나열하는 것에 그치지 않고, 우리 지역 주민들이 읽기 쉽고 이해하기 편하도록 친절한 말투로 재구성하여 제공합니다. 
            모든 AI 생성 콘텐츠는 일관된 가이드라인에 따라 관리됩니다.
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
