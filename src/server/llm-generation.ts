"use server"

import { LanguageOptions, LanguageValue, ResponseLengthOptions, ResponseLengthValue, ToneOptions, ToneValue } from "~/lib/planUtil"
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
