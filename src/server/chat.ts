"use server"
import OpenAI from "openai"
import sp from "./systemPrompt.json" 

type role = {role: "system", content: string}
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const proccessQuestion = async (q: string) => {

  const completion = await openai.chat.completions.create({
    model: "gemini-1.5-flash",
    messages: [
      sp as role,
      {role: "user", content: q}
    ]
  })
  return completion.choices[0]?.message?.content || ""
}
