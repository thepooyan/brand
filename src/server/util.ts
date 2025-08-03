import { chatbot } from "~/db/schema";
import { LanguageValue, LlmBuilder, ResponseLengthValue, ToneValue } from "./llm-generation";

type ErrorResponse = { ok: false; msg: string }
type SuccessResponse<T> = T extends void ? { ok: true } : { ok: true; data: T }
export type Response<T = void> = Promise<SuccessResponse<T> | ErrorResponse>

export const validatePhone = (phone: string) => {
  if (phone.length !== 11) return false
  return true
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const warpResponse = async <T>(fn: ()=>Promise<Response<T>>):Response<T> => {
  try {
    let a = await fn()
    return a
  } catch(e) {
    console.log(e)
    return {ok:false, msg: "مشکلی پیش آمده، لطفا مجددا تلاش کنید"}
  }
}

export const compareEpochTime = (then: number) => {
  const now = Math.floor(Date.now())
  if (now - then > 60_000) return false
  return true
}

export const getSystemPrompt = (bot: typeof chatbot.$inferSelect):string => {
  return new LlmBuilder()
  .setName(bot.botName)
  .setBusinessName(bot.businessName)
  .setTone(bot.tone as ToneValue)
  .setLanguage(bot.language as LanguageValue)
  .setResponseLength(bot.maxResponseLength as ResponseLengthValue)
  .setTrainingText(bot.trainingText)
  .buildPrompt()
}
