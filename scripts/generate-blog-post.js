const fs = require('fs');
const path = require('path');

/**
 * 블로그 글 자동 생성 스크립트
 * public/data/local-info.json의 최신 항목을 바탕으로 Gemini AI를 사용하여
 * src/content/posts/ 폴더에 마크다운 블로그 포스트를 생성합니다.
 */
async function generateBlogPost() {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.error("환경변수 GEMINI_API_KEY가 설정되지 않았습니다.");
    return;
  }

  try {
    // [1단계] 최신 데이터 확인
    const localInfoPath = path.join(process.cwd(), 'public/data/local-info.json');
    if (!fs.existsSync(localInfoPath)) {
      console.error("데이터 파일이 존재하지 않습니다.");
      return;
    }

    const localInfo = JSON.parse(fs.readFileSync(localInfoPath, 'utf8'));
    const allItems = [...localInfo.events, ...localInfo.benefits];
    
    if (allItems.length === 0) {
      console.log("처리할 데이터가 없습니다.");
      return;
    }

    // 최신 항목 (가장 마지막 항목)
    const latestItem = allItems[allItems.length - 1];
    const itemName = latestItem.name;

    // 중복 확인: src/content/blog 및 src/content/guides 폴더 내 파일 내용 확인
    const contentDirs = [
      path.join(process.cwd(), 'src/content/blog'),
      path.join(process.cwd(), 'src/content/guides')
    ];
    
    let isDuplicate = false;

    for (const dir of contentDirs) {
      if (!fs.existsSync(dir)) continue;
      
      const existingPosts = fs.readdirSync(dir);
      for (const file of existingPosts) {
        if (file.endsWith('.md')) {
          const content = fs.readFileSync(path.join(dir, file), 'utf8');
          if (content.includes(itemName)) {
            isDuplicate = true;
            break;
          }
        }
      }
      if (isDuplicate) break;
    }

    if (isDuplicate) {
      console.log("이미 작성된 글입니다");
      return;
    }

    // [2단계] Gemini AI로 블로그 글 생성
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const prompt = `You are a friendly and professional local blogger for Newport News, Virginia. Your goal is to write helpful community updates for local residents. Based on the provided public data, write a blog post in English.
    
Information: ${JSON.stringify(latestItem)}

## Output Requirements (Strictly in English):
1. Title: Engaging and friendly for Newport News residents.
2. Summary: One-line summary of the core information.
3. Body: At least 800 characters, insightful and community-focused. Include 3 reasons why locals should care, tips for visiting/using the service, and a friendly closing.
4. Format: Strictly use the following markdown structure without any extra commentary.

---
title: (Your English Title)
date: ${new Date().toISOString().split('T')[0]}
summary: (Your English Summary)
category: Local Info
tags: [NewportNews, Virginia, LocalEvents]
link: ${latestItem.link || latestItem.url || ""}
---

---

(Body Content: Engaging and strictly in English.)

At the very end, include a line: FILENAME: YYYY-MM-DD-short-english-keyword`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API 에러:", JSON.stringify(data.error, null, 2));
      return;
    }

    if (!data.candidates || !data.candidates[0]) {
      throw new Error("Gemini API 응답이 올바르지 않습니다.");
    }

    let fullText = data.candidates[0].content.parts[0].text;

    // 마크다운 코드 블록 제거 및 불필요한 텍스트 정리
    fullText = fullText.replace(/```markdown|```/g, '').trim();

    // FILENAME 추출
    const fileNameMatch = fullText.match(/FILENAME:\s*(\d{4}-\d{2}-\d{2}-[\w-]+)/);
    let fileName = "";
    let finalContent = fullText;

    if (fileNameMatch) {
      fileName = fileNameMatch[1] + ".md";
      // 본문에서 FILENAME 줄 제거
      finalContent = fullText.replace(/FILENAME:\s*(\d{4}-\d{2}-\d{2}-[\w-]+)/, '').trim();
    } else {
      // 파일명이 없으면 오늘 날짜와 기본 키워드 사용
      const dateStr = new Date().toISOString().split('T')[0];
      fileName = `${dateStr}-local-update.md`;
    }

    // [3단계] 파일 저장 (기본 목적지는 blog 폴더)
    const blogDir = path.join(process.cwd(), 'src/content/blog');
    const filePath = path.join(blogDir, fileName);
    fs.writeFileSync(filePath, finalContent, 'utf8');
    
    console.log(`성공적으로 생성됨: ${fileName}`);

  } catch (error) {
    console.error("에러 발생:", error);
  }
}

generateBlogPost();
