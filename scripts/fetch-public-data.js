const fs = require('fs');
const path = require('path');

/**
 * 전보 수집 및 Gemini AI 가공 스크립트 (뉴포트 뉴스 지역화 버전)
 * 미국 국립공원 서비스(NPS) API에서 버지니아주 데이터를 가져와 
 * 뉴포트 뉴스 및 요크타운 정보를 우선 필터링하고,
 * Gemini AI를 통해 영문/한글 혼용 형식으로 local-info.json에 저장합니다.
 */
async function fetchPublicData() {
  // 환경변수 사용
  const PUBLIC_DATA_API_KEY = process.env.PUBLIC_DATA_API_KEY;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!PUBLIC_DATA_API_KEY || !GEMINI_API_KEY) {
    console.error("환경변수(PUBLIC_DATA_API_KEY 또는 GEMINI_API_KEY)가 설정되지 않았습니다.");
    return;
  }

  try {
    // [1단계] 미국 국립공원 서비스(NPS) API에서 데이터 가져오기
    // 엔드포인트: https://developer.nps.gov/api/v1/parks
    const url = `https://developer.nps.gov/api/v1/parks?stateCode=VA&limit=10&api_key=${PUBLIC_DATA_API_KEY}`;
    const response = await fetch(url);
    const result = await response.json();

    if (!result.data || result.data.length === 0) {
      console.log("데이터를 가져오지 못했습니다.");
      return;
    }

    // 필터링 규칙 변경: "Newport News" 또는 "Yorktown" 키워드 포함 항목 우선
    let filtered = result.data.filter(item => 
      (item.fullName && (item.fullName.includes("Newport News") || item.fullName.includes("Yorktown"))) || 
      (item.description && (item.description.includes("Newport News") || item.description.includes("Yorktown")))
    );

    // 해당 키워드가 없으면 전체 데이터 사용
    if (filtered.length === 0) {
      filtered = result.data;
    }

    // [2단계] 기존 데이터와 비교
    const localInfoPath = path.join(process.cwd(), 'public/data/local-info.json');
    const localInfo = JSON.parse(fs.readFileSync(localInfoPath, 'utf8'));
    
    const existingNames = new Set([
      ...localInfo.events.map(e => e.name),
      ...localInfo.benefits.map(b => b.name)
    ]);

    // 이미 존재하는 항목 제외
    const newItemCandidates = filtered.filter(item => !existingNames.has(item.fullName));

    if (newItemCandidates.length === 0) {
      console.log("새로운 데이터가 없습니다");
      return;
    }

    // 새로운 항목 중 첫 번째 것 하나만 처리
    const itemToProcess = newItemCandidates[0];

    // [3단계] Gemini AI로 새 항목 1개만 가공
    // 버지니아주 공공데이터를 영문/한글 혼용 블로그 형식으로 변환 요청
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${GEMINI_API_KEY}`;
    
    const prompt = `버지니아주 공공데이터 1건을 분석해서 영문/한글 혼용 JSON 객체로 변환해줘. 
형식: {id: 숫자, name: '영문명 | 한글명', category: 'Park' 또는 'Event', startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD', location: '도시명, VA', target: '대상층', summary: '영문 요약 | 한글 요약', link: '상세URL'}
category는 공원이면 'Park', 특정 행사면 'Event'로 분류해.
startDate가 없으면 오늘 날짜, endDate가 없으면 '상시(Ongoing)'로 넣어.
summary는 한국어와 영어를 같이 넣어줘.
반드시 JSON 객체만 출력해. 다른 텍스트 없이.

데이터: ${JSON.stringify(itemToProcess)}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const geminiData = await geminiResponse.json();
    
    if (!geminiData.candidates || !geminiData.candidates[0]) {
      throw new Error("Gemini API 응답이 올바르지 않습니다.");
    }

    let text = geminiData.candidates[0].content.parts[0].text;
    
    // JSON 부분만 파싱 (마크다운 코드블록 제거)
    text = text.replace(/```json|```/g, '').trim();
    const processedItem = JSON.parse(text);

    // [4단계] 기존 데이터에 추가
    // 기존 local-info.json의 형식(Events 또는 Local Benefits/Resources)에 맞게 변환하여 저장
    const mappedItem = {
      id: `nps-${Date.now()}`,
      name: processedItem.name,
      category: processedItem.category === 'Event' ? 'Events' : 'Resources',
      date: processedItem.startDate === processedItem.endDate || processedItem.endDate.includes('Ongoing') 
             ? (processedItem.startDate || 'Ongoing') 
             : `${processedItem.startDate} ~ ${processedItem.endDate}`,
      location: processedItem.location,
      target: processedItem.target || "Everyone",
      description: processedItem.summary,
      link: processedItem.link || itemToProcess.url || "#"
    };

    if (processedItem.category === 'Event') {
      localInfo.events.push(mappedItem);
    } else {
      localInfo.benefits.push(mappedItem);
    }

    fs.writeFileSync(localInfoPath, JSON.stringify(localInfo, null, 2), 'utf8');
    console.log(`성공적으로 추가됨: ${mappedItem.name}`);

  } catch (error) {
    console.error("에러 발생:", error);
    // 에러 발생 시 기존 파일 유지
  }
}

fetchPublicData();
