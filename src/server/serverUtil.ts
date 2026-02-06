"use server"
import { adminsTable, chatbotTable, tokenLength } from "~/db/schema";
import crypto from 'node:crypto'
import { LlmBuilder } from "./llm-generation";
import { LanguageValue, ResponseLengthValue } from "~/lib/planUtil"
import {ToneValue} from "~/lib/planUtil"

import { db } from "~/db/db";
import { eq } from "drizzle-orm";
import { ROLES } from "~/lib/session";
import { ErrorMessage } from "~/lib/const";

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
    return {ok:false, msg: ErrorMessage.unknown}
  }
}

export const compareEpochTime = (then: number) => {
  const now = Math.floor(Date.now())
  if (now - then > 60_000) return false
  return true
}

export const getSystemPrompt = (bot: typeof chatbotTable.$inferSelect):string => {
  return new LlmBuilder()
  .setName(bot.botName)
  .setBusinessName(bot.businessName)
  .setTone(bot.tone as ToneValue)
  .setLanguage(bot.language as LanguageValue)
  .setResponseLength(bot.maxResponseLength as ResponseLengthValue)
  .setTrainingText(bot.trainingText)
  .buildPrompt()
}

export const isNumberAdmin = async (num: string) => {
  return (await db.select().from(adminsTable).where(eq(adminsTable.number, num)).limit(1)).length > 0;
}

export const findoutRole = async (num: string) => {
  let a = await isNumberAdmin(num)
  return a ? ROLES.ADMIN : ROLES.USER
}

export const generateToken = () => {
  return crypto.randomBytes(tokenLength/2).toString('hex')
} 
