export type ToneValue = keyof typeof ToneOptions
import { getSystemPrompt } from "@/server/serverUtil";
import { privateEnv } from "~/server/env/private-env";
// import { google } from "@ai-sdk/google";
import { createOpenAI } from '@ai-sdk/openai';
import { ModelMessage, streamText, generateText } from "ai";
import { ChatbotRelations } from "~/db/schema";

export const ToneOptions = {
  formal: {
    label: "رسمی",
    description: "مناسب برای کسب‌وکارهای جدی و حرفه‌ای",
    llmPrompt: "پاسخ را به صورت رسمی و محترمانه بنویس."
  },
  friendly: {
    label: "دوستانه",
    description: "صمیمی و گرم برای ارتباط نزدیک با مشتریان",
    llmPrompt: "پاسخ را به شکل دوستانه و صمیمی بنویس."
  },
  professional: {
    label: "حرفه‌ای",
    description: "متعادل بین رسمی و دوستانه",
    llmPrompt: "پاسخ را با لحنی حرفه‌ای و قابل اعتماد بنویس."
  },
  enthusiastic: {
    label: "پرانرژی",
    description: "مثبت و انگیزه‌بخش",
    llmPrompt: "پاسخ را با انرژی بالا و لحن مثبت بنویس."
  },
  helpful: {
    label: "کمک‌کننده",
    description: "متمرکز بر حل مشکل و راهنمایی",
    llmPrompt: "پاسخ را با تمرکز بر کمک‌رسانی و راهنمایی بنویس."
  }
} as const

const isToneKey = (value: string): value is ToneValue =>
  value in ToneOptions

export const getToneValue = (str: string) => {
  if (isToneKey(str)) {
    return ToneOptions[str]
  }
  return null
}

export const getToneKeyByLabel = (label: string): ToneValue | null => {
  for (const key of Object.keys(ToneOptions) as ToneValue[]) {
    if (ToneOptions[key].label === label) {
      return key
    }
  }
  return null
}

export const LanguageOptions = {
  persian: {
    label: "فارسی",
    flag: "🇮🇷",
    llmPrompt: "پاسخ را فقط به زبان فارسی بنویس."
  },
  english: {
    label: "انگلیسی",
    flag: "🇺🇸",
    llmPrompt: "Write the response only in English."
  },
  bilingual: {
    label: "دوزبانه (فارسی + انگلیسی)",
    flag: "🌐",
    llmPrompt: "پاسخ را ابتدا به فارسی و سپس به انگلیسی نیز بنویس."
  }
} as const

export type LanguageValue = keyof typeof LanguageOptions

export const ResponseLengthOptions = {
  short: {
    label: "کوتاه",
    description: "۱-۲ جمله (تا ۵۰ کلمه)",
    llmPrompt: "پاسخ را در ۱ تا ۲ جمله (حداکثر ۵۰ کلمه) بنویس."
  },
  medium: {
    label: "متوسط",
    description: "۲-۴ جمله (۵۰-۱۰۰ کلمه)",
    llmPrompt: "پاسخ را در ۲ تا ۴ جمله (حدود ۵۰ تا ۱۰۰ کلمه) بنویس."
  },
  long: {
    label: "بلند",
    description: "۴-۶ جمله (۱۰۰-۲۰۰ کلمه)",
    llmPrompt: "پاسخ را در ۴ تا ۶ جمله (بین ۱۰۰ تا ۲۰۰ کلمه) بنویس."
  },
  detailed: {
    label: "تفصیلی",
    description: "بیش از ۶ جمله (۲۰۰+ کلمه)",
    llmPrompt: "پاسخ را به‌صورت کامل، بیش از ۶ جمله و بالای ۲۰۰ کلمه بنویس."
  }
} as const

export type ResponseLengthValue = keyof typeof ResponseLengthOptions

const isLanguageKey = (value: string): value is LanguageValue =>
  value in LanguageOptions

export const getLanguageValue = (str: string) => {
  if (isLanguageKey(str)) return LanguageOptions[str]
  return null
}

export const getLanguageKeyByLabel = (label: string): LanguageValue | null => {
  for (const key of Object.keys(LanguageOptions) as LanguageValue[]) {
    if (LanguageOptions[key].label === label) return key
  }
  return null
}

const isResponseLengthKey = (value: string): value is ResponseLengthValue =>
  value in ResponseLengthOptions

export const getResponseLengthValue = (str: string) => {
  if (isResponseLengthKey(str)) return ResponseLengthOptions[str]
  return null
}

export const getResponseLengthKeyByLabel = (label: string): ResponseLengthValue | null => {
  for (const key of Object.keys(ResponseLengthOptions) as ResponseLengthValue[]) {
    if (ResponseLengthOptions[key].label === label) return key
  }
  return null
}

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
