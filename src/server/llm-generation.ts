"use server"

import { LanguageOptions, LanguageValue, ResponseLengthOptions, ResponseLengthValue, ToneOptions, ToneValue } from "~/server/llmUtil"

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
