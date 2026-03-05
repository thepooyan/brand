import axios from "axios"
import { db } from "~/db/db"
import { adminsTable } from "~/db/schema"
import { isProd, privateEnv } from "./env/private-env"
import "@/lib/server-only"

const adminToken = privateEnv.ADMIN_BOT 
const supportToken = privateEnv.SUPPORT_BOT 

const send = async (botToken: string, text: string, chat_id: string | number) => {
  if (!isProd) return
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`
  const res = await axios.post(url, { chat_id, text })

  if (res.status !== 200) {
    console.error(`Telegram error: ${res.statusText}`, await res.data)
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
