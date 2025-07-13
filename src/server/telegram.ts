"use server"

import { db } from "~/db/db"
import { adminsTable } from "~/db/schema"

const adminToken = process.env.ADMIN_BOT ?? (() => { throw new Error('Missing ADMIN_BOT') })()
const supportToken = process.env.SUPPORT_BOT ?? (() => { throw new Error('Missing SUPPORT_BOT') })()

const send = async (token: string, text: string, chat_id: string | number) => {
  const url = `https://api.telegram.org/bot${token}/sendMessage`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id, text }),
  })

  if (!res.ok) {
    console.error(`Telegram error: ${res.statusText}`, await res.text())
  }

  return res
}

const sendToAdmin = async (text: string) => {
  let admins = await db.select().from(adminsTable)
  await Promise.all(admins.map(a => send(adminToken, text, a.chat_id)))
}

const sendToSupport = (text: string, chat_id: string | number) => {
  return send(supportToken, text, chat_id)
}

export const telegram = {
  admin: { send: sendToAdmin },
  support: { send: sendToSupport },
}
