import { getSystemPrompt } from "@/server/serverUtil";
import { privateEnv } from "~/server/env/private-env";
// import { google } from "@ai-sdk/google";
import { createOpenAI } from '@ai-sdk/openai';
import { ModelMessage, streamText, generateText } from "ai";
import { ChatbotRelations } from "~/db/schema";

export enum llm_models {
  gemma = "gemma-3-27b-it",
  gpt4o = "gpt-4o",
  deepseek = 'deepseek-v4-flash',
  qwen = 'gapgpt-qwen-3.5',
  gpt4nano = "gpt-4.1-nano",
}

const openai = createOpenAI({
  apiKey: privateEnv.GAPGPT_API_KEY,
  baseURL: privateEnv.GAPGPT_API_URL
});

const currentModel = openai(llm_models.gpt4nano)

export const chatSync = (messages: ModelMessage[], system?: string) => {
  const result = generateText({
    model: currentModel,
    system: system,
    messages: messages,
  });
  return result
}

export const chatStream = (messages: ModelMessage[], system?: string) => {
  const result = streamText({
    model: currentModel,
    system: system,
    messages: messages,
  });
  return result
}

export const talk_to_bot = (bot: ChatbotRelations) => {
  const s = getSystemPrompt(bot)
  return (m: ModelMessage[]) => chatStream(m, s)
}
