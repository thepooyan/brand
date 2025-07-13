"use server"

import { db } from "~/db/db"
import { adminsTable } from "~/db/schema"

export const sendTelegramMessage = async (text: string) => {

  const token = process.env.BOT
  let admins = await db.select().from(adminsTable)
  const url = `https://api.telegram.org/bot${token}/sendMessage`

  const send = async (t: string, id: string) => {
     fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: id, text: t }),
    })
  }

  admins.forEach(a => send(text, a.chat_id))
}

