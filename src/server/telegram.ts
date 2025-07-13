"use server"

import { db } from "~/db/db"
import { adminsTable } from "~/db/schema"

const getadminToken = () => process.env.ADMIN_BOT!
const getsupportToken = () => process.env.SUPPORT_BOT!

const send = (token: string, text: string, chat_id: string) => {
  const url = `https://api.telegram.org/bot${token}/sendMessage`
   return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id, text }),
  })
}

const sendToAdmin = async (text: string) => {
  let admins = await db.select().from(adminsTable)
  admins.forEach(a => send(getadminToken(), text, a.chat_id))
}

const sendToSupport = (text: string, chat_id: string) => {
  return send(getsupportToken(), text, chat_id)
}

export const telegram = {
  admin: {
    send: sendToAdmin
  },
  support: {
    send: sendToSupport
  }
}
