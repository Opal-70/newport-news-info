import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * AI를 사용하여 지역 블로그 포스팅을 생성합니다.
 * @param newsItems 수집된 뉴스/이벤트 정보
 * @returns 생성된 블로그 포스트 내용
 */
export async function generateBlogPost(newsItems: any[]) {
  const prompt = `
    You are a friendly local resident of Newport News, Virginia. 
    Based on the following news and events, write a helpful and engaging blog post for the community.
    The tone should be warm, informative, and "local."
    Use Markdown formatting. 
    Include a catchy title.
    
    News/Events Context:
    ${JSON.stringify(newsItems)}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}
