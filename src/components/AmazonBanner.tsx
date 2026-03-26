"use client";

import React from 'react';

const AmazonBanner = () => {
  const affiliateId = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_ID;

  // ID가 없거나 기본값인 경우 렌더링하지 않음
  if (!affiliateId || affiliateId === "나중에_입력") {
    return null;
  }

  return (
    <div className="w-full my-12 text-center">
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-8 transition-all hover:shadow-md">
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-4 block">Recommended for You</span>
        
        {/* Amazon Affiliate Content Placeholder */}
        {/* 실제 어소시에이트 배너 연동 시 아래 영역에 스크립트나 iframe을 삽입합니다. */}
        <div className="mx-auto max-w-[728px] h-[90px] bg-white border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-xs italic">
          Amazon Associates Content Box ({affiliateId})
        </div>
        
        <p className="mt-4 text-[10px] text-slate-400">
          As an Amazon Associate, we earn from qualifying purchases.
        </p>
      </div>
    </div>
  );
};

export default AmazonBanner;
