"use server"

import { db } from "~/db/db"
import { generateToken } from "./serverUtil"
import { chatbotStatusTable } from "~/db/schema"
import { eq } from "drizzle-orm"

type success<T = void> = T extends void ? {ok: true} : {ok: true, data: T}
type fail = {ok: false, msg: string}

export type ActionResult<T = void> = Promise<success<T> | fail>

type Ok<T> = { ok: true; data: T }
type Err = { ok: false; error: string }
type Result<T> = Ok<T> | Err

async function safe<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    const data = await fn()
    return { ok: true, data }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    console.log(message)
    return { ok: false, error: message }
  }
}



export const getNewToken = async (id: number):ActionResult<string> => {
  const newToken = generateToken()
  const data = await safe(
    async () => await db.update(chatbotStatusTable).set({current_token: newToken}).where(eq(chatbotStatusTable.id, id))
  )
  if (data.ok) {
    return {ok: true, data: newToken}
  }
  return {ok: false, msg: "تولید توکن موفقیت آمیز نبود. لطفا مجددا تلاش کنید"}
}
