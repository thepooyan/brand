"use server"
import { adminsTable, chatbot_history_table, chatbotTable, tokenLength } from "~/db/schema";
import crypto from 'node:crypto'
import { LlmBuilder } from "./llm-generation";
import { LanguageValue, ResponseLengthValue, ToneValue } from "~/server/llmUtil"
import { db } from "~/db/db";
import { and, eq } from "drizzle-orm";
import { getAuthSession, ROLES } from "~/lib/session";
import { ErrorMessage } from "~/lib/const";
import { chat_sources, timedMessage } from "~/db/constants";
import { nicknameFromIP } from "~/lib/nicknameGenerator";
import { Fetch, fetchRedirect, transactionRedirect } from "~/lib/actionAbstraction";
import { safeDb } from "~/lib/utils";
import { ResultSet } from "@libsql/client";
import { isServer } from "solid-js/web";

export type serverUtilType =
<TArgs extends any[], TResult>
(fn: (...args: TArgs) => TResult) =>
(...args: TArgs) => TResult;

export const serverUtil:serverUtilType = (fn) => (...args) => {
  if (isServer === false) throw new Error("Can't use server util in client code.")
  return fn(...args);
};

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

export const isAdminLoggedIn = async () => {
  let user = await getAuthSession()
  return user?.role === ROLES.ADMIN
}


export const updateChatHistory =
async (QandA: timedMessage[], botId: number, userIP: string, from: typeof chat_sources[number])
:Fetch<ResultSet> => {
  "use server"
  return await safeDb(
      db.transaction(async ctx => {
        let already = await ctx.query.chatbot_history_table.findFirst({ 
          where: (tbl => and(
            eq(tbl.userIP, userIP),
            eq(tbl.botId, botId),
            eq(tbl.source, from)
          ))
        })

        if (!already) {
          return ctx.insert(chatbot_history_table).values({
            botId: botId,
            userIP: userIP,
            source: from,
            messages: QandA,
            nickname: await nicknameFromIP(userIP)
          })
        }

        return ctx.update(chatbot_history_table).set({
          messages: [...already.messages, ...QandA]
        }).where(eq(chatbot_history_table.id, already.id))
    })
  )
}

export function hashToken(token: string): string {
  return crypto
    .createHash("sha256")
    .update(token, "utf8")
    .digest("hex");
}

export const loginRedirectTran = () => transactionRedirect("/Login", true)
export const loginRedirectFetch = () => fetchRedirect("/Login", true)
