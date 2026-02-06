"use server"

import { eq } from "drizzle-orm"
import { db } from "~/db/db"
import { chatbotTable, I_Bot } from "~/db/schema"
import { Response } from "./serverUtil"
import { ErrorMessage } from "~/lib/const"

export const editBot = async (newBot: I_Bot):Promise<Response> => {
  try {
    await db.update(chatbotTable).set({...newBot}).where(
      eq(chatbotTable.id, newBot.id)
    )
    return {ok: true}
  } catch (e) {
    if (e instanceof Error) {
      return { ok: false, msg: e.message }
    }
    return { ok: false, msg: ErrorMessage.unknown }
  }
}
