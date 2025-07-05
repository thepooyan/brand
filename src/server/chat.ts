"use server"
import OpenAI from "openai"
import sp from "./systemPrompt.json" 
import { folan } from "~/components/pages/Chatbot"

type role = {role: "system", content: string}

export const proccessConversation = async (conver: folan[]) => {
  try {

    const openai = new OpenAI({
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
      apiKey: process.env.GEMINI_API_KEY!,
    });
    const completion = await openai.chat.completions.create({
      model: "gemini-1.5-flash",
      messages: [
        sp as role,
        ...conver,
      ]
    })
    return completion.choices[0]?.message

  } catch(e) {
    console.log(e)
    return null
  }
}
