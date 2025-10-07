import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("NEXT_PUBLIC_GEMINI_API_KEY environment variable not set. Using a placeholder. Please set your API key for the demo to work.");
}

const genAI = new GoogleGenerativeAI(apiKey || "YOUR_API_KEY_HERE");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function translateAndExplain(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Error: ${error.message}. Make sure your API key is configured correctly.`;
    }
    return "An unknown error occurred while contacting the AI model.";
  }
}
