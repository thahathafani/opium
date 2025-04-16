import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseGeminiResponse } from "@/lib/parser";


if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const text = response.text();
const project = parseGeminiResponse(text);

export async function POST(req) {
  const { engineered, rawPrompt } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(engineered);
  const response = await result.response;
  const text = response.text();

  // TODO: Parse the structured JSON from Gemini to usable format
  // Save to Supabase or forward to UI

  // For now, just return it to frontend
return NextResponse.json({ status: "ok", project });
}