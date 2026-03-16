"use server"

import { db } from "~/db/db"
import { generateToken } from "./serverUtil"
import { eq } from "drizzle-orm"
import { chatbotTable } from "~/db/schema"
import { ActionResponse } from "~/lib/actionAbstraction"
import { safe } from "~/lib/utils"

export const getNewToken = async (id: number):ActionResponse<string> => {
  const newToken = generateToken()
  const data = await safe(
    db.update(chatbotTable).set({current_token: newToken}).where(eq(chatbotTable.id, id))
  )
  if (data.ok) {
    return {ok: true, data: newToken}
  }
  return {ok: false, msg: "تولید توکن موفقیت آمیز نبود. لطفا مجددا تلاش کنید"}
}
