"use server"

import { generateToken } from "./serverUtil"

export const plansEnum = {
  free: "free"
} as const

export const PlanOptions = {
  free: {
    value: plansEnum.free,
    label: "رایگان",
    description: "پلن رایگان هوشبان، برای تست ساخت ربات!",
    time: 7,
    messages: 10
  }
} as const

type PlanKey = keyof typeof PlanOptions
type Plan = (typeof PlanOptions)[PlanKey]

const daysFromNow = (days: number) => {
  let date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

export const newPlan =(id: number, plan: Plan) => ({
    plan: plan.value,
    messageCount: plan.messages,
    remainingMessages: plan.messages,
    expirationDate: daysFromNow(plan.time),
    id: id,
    current_token: generateToken()
})

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

export type ToneValue = keyof typeof ToneOptions

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


export class LlmBuilder {
  private name!: string
  private businessName!: string
  private tone?: ToneValue
  private language?: LanguageValue
  private responseLength?: ResponseLengthValue
  private trainingText!: string

  setName(name: string) {
    this.name = name
    return this
  }

  setBusinessName(businessName: string) {
    this.businessName = businessName
    return this
  }

  setTone(tone: ToneValue) {
    this.tone = tone
    return this
  }

  setLanguage(language: LanguageValue) {
    this.language = language
    return this
  }

  setResponseLength(responseLength: ResponseLengthValue) {
    this.responseLength = responseLength
    return this
  }

  setTrainingText(trainingText: string) {
    this.trainingText = trainingText
    return this
  }

  buildPrompt(): string {
    if (!this.name || !this.businessName || !this.trainingText)
      throw new Error("Missing required fields")

    const tonePrompt = this.tone ? ToneOptions[this.tone].llmPrompt : ""
    const languagePrompt = this.language ? LanguageOptions[this.language].llmPrompt : ""
    const lengthPrompt = this.responseLength ? ResponseLengthOptions[this.responseLength].llmPrompt : ""

    return [
      `شخصیت شما ${this.name} است، نماینده‌ی برند ${this.businessName}.`,
      tonePrompt,
      languagePrompt,
      lengthPrompt,
      `آموزش: ${this.trainingText}`
    ].filter(Boolean).join("\n")
  }
}
