# 프로젝트: Newport News Local Hub (우리 동네 생활 정보 & 수익화 웹사이트)

## 목표
- 뉴포트 뉴스(Newport News) 및 Hampton Roads 지역의 이벤트, 시정 소식, 로컬 혜택을 자동 수집.
- AI(Gemini)를 활용해 현지 주민들에게 유용한 블로그 포스팅을 매일 자동 발행.
- Google AdSense + Amazon Associates(미국)를 결합한 달러 수익 창출 자동화 사이트 구축.

## 기술 스택
- Next.js (App Router) + TypeScript + Tailwind CSS
- Gemini API (현지 뉴스 요약 및 블로그 포스트 생성)
- Newport News City Official RSS/API (시정 소식)
- Virginia Open Data Portal API (지역 통계 및 공공 정보)
- Eventbrite API 또는 전문 뉴스 RSS/API(지역 행사 정보)
- GitHub Actions (미국 동부 시간 기준 매일 자동 실행)
- Cloudflare Pages (글로벌 속도 및 보안 최적화)

## 페이지 구성 (Localization)
1. Main Page: "What's Happening in Newport News" - 이번 주 이벤트, 날씨, 주요 뉴스 카드.
2. Event Detail: 각 행사 및 지역 뉴스 상세 페이지 (SEO 최적화).
3. Local Guides (Blog): AI가 작성한 '뉴포트 뉴스에서 주말에 가볼 만한 곳', '지역 맛집 가이드' 등.
4. Resources: 버지니아주 세금 감면 혜택, 지역 커뮤니티 지원 프로그램 정보.

## 수익화 전략 (Monetization)
- Google AdSense: 미국 타겟 광고를 메인 및 본문에 배치.
- Amazon Associates: 블로그 글 주제와 관련된 상품 추천 (예: 캠핑지 소개 글 하단에 캠핑 장비 링크).
- Local Partnership: 추후 지역 비즈니스 홍보 섹션 마련.

## 자동화 프로세스 (GitHub Actions)
매일 아침 7시 (EST, 미국 동부 표준시) 자동 실행:
1. 로컬 RSS 및 Virginia Open Data에서 최신 데이터 수집.
2. Gemini AI를 이용해 "Local Resident"의 톤앤매너로 영어 블로그 작성.
3. 이미지 생성 또는 Unsplash API를 통한 관련 이미지 매칭.
4. Git 커밋 & Cloudflare Pages 자동 빌드/배포.

## 환경변수 (나중에 .env.local에 저장)
- GEMINI_API_KEY
- EVENTBRITE_API_KEY (또는 News API Key)
- NEXT_PUBLIC_ADSENSE_ID
- AMAZON_ASSOCIATE_ID
- NEXT_PUBLIC_GA4_ID (Google Analytics 6)
