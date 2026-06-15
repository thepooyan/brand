import { useParams } from '@solidjs/router';
import { and, eq } from 'drizzle-orm';
import { db } from '~/db/db';
import { chatbot_messager_table } from '~/db/schema';
import { message, timedMessage } from '~/db/constants';
import { userPermissions } from '~/sections/plan';
import { decrementMessageCount } from '~/sections/planServer';
import { replyWithAI } from '~/server/actions';
import { hashToken, updateChatHistory } from '~/server/serverUtil';
import { telegram } from '~/server/telegram';

interface telegramEvent {
  update_id: number,
  message: {
    message_id: number,
    from: {
      id: number,
      is_bot: boolean,
      first_name: string,
      username: string,
      language_code: string
    },
    chat: {
      id: number,
      first_name: string,
      username: string,
      type: string
    },
    date: number,
    text: string
  }
}
export const POST = async ({request}:{request: Request}) => {
  let body:telegramEvent = await request.json()
  const {bot_token} = useParams()

  if (body.message.from.is_bot) return
  if (!bot_token) return

  const msg = body.message.text
  const chat_id = body.message.from.id

  const result = await getChatHistory(bot_token, chat_id)

  if (result === "404") return
  if (result === "payment") return

  const {history, botId} = result


  const response = await replyWithAI(msg, history)
  const qa:timedMessage[] = [
    {role: "user", content: msg, timestamp: new Date()},
    {role: "assistant", content: response, timestamp: new Date()},
  ]

  await Promise.all([
    pushChatHistory(bot_token, chat_id, msg, response),
    updateChatHistory(qa, botId, String(body.message.from.id), "telegram"),
    telegram.send(bot_token, response, String(chat_id))
  ])

  return "ok"
}

const getChatHistory = async (bot_token: string, chat_id:number):Promise<{history: message[], botId: number} | "404" | "payment"> => {
  return await db.transaction(async ctx => {
    const bot = await ctx.query.chatbotTable.findFirst({
      where: (tbl => eq(tbl.current_token, hashToken(bot_token))),
      with: {user: {with: {current_plans: true, bots: true}}}
    })
    if (!bot) return "404"

    const permissions = userPermissions(bot.user)
    if (!permissions.message) return "payment"
    if (!permissions.telegram) return "payment"

    let ok = await decrementMessageCount(bot.user, ctx)
    if (!ok) return "payment"

    let history = await db.query.chatbot_messager_table.findFirst({
      where: (tbl => and(
        eq(tbl.chat_id, chat_id),
        eq(tbl.bot_id, bot.id ),
      ))
    })
    if (!history) return {history: [], botId: bot.id}
    return {history: history.history, botId: bot.id}
  })
}

const limitArray = (arr: any[], limit: number) => {
  if (arr.length > limit) {
    arr = arr.slice(arr.length - limit)
  }
  return arr
}

const pushChatHistory = async (bot_id: string, chat_id:number, message: string, reply: string) => {
  db.transaction(async ctx => {

    let old = await ctx.query.chatbot_messager_table.findFirst({
      where: (tbl => and(
        eq(tbl.chat_id, chat_id),
        eq(tbl.bot_id, parseInt(bot_id)),
      ))
    })

    if (old) {
      await ctx.update(chatbot_messager_table).set({
        history: limitArray([
          ...old.history,
          {role: "user", content: message},
          {role: "assistant", content: reply},
        ], 20)
      })
      .where(eq(chatbot_messager_table.id, old.id))

    } else {
      await ctx.insert(chatbot_messager_table).values({
        chat_id: chat_id,
        bot_id: parseInt(bot_id),
        history: [
          {role: "user", content: message},
          {role: "assistant", content: reply},
        ]
      })
    }

  })
}
