"use server"

import { db } from "~/db/db"
import { generateToken, hashToken } from "./serverUtil"
import { eq } from "drizzle-orm"
import { chatbotTable } from "~/db/schema"
import {  Fetch, fetchSuccess } from "~/lib/actionAbstraction"
import { safeDb2 } from "~/lib/utils"

export const getNewToken = async (id: number):Fetch<string> => {
  const newToken = generateToken()
  const data = await safeDb2(
    db.update(chatbotTable).set({current_token: hashToken(newToken)}).where(eq(chatbotTable.id, id))
  )
  if (data.ok) {
    return fetchSuccess(newToken)
  }
  return data
}
