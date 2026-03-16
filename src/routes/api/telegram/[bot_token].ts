import { useParams } from '@solidjs/router';
import { and, eq } from 'drizzle-orm';
import { db } from '~/db/db';
import { chatbot_history_table, chatbotTable, planTable } from '~/db/schema';
import { message } from '~/lib/chatUtil';
import { doesPlanHaveTelegram } from '~/sections/plan';
import { replyWithAI } from '~/server/actions';
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

  const msg = body.message.text
  const chat_id = body.message.from.id

  const history = await getChatHistory(bot_token, chat_id)

  if (history === "404") return
  if (history === "payment") return

  const response = await replyWithAI(msg, history)

  await Promise.all([
    pushChatHistory(bot_token, chat_id, msg, response),
    telegram.send(bot_token, response, String(chat_id))
  ])

  return "ok"
}

const getChatHistory = async (bot_token: string, chat_id:number):Promise<message[] | "404" | "payment"> => {
  return await db.transaction(async ctx => {
    const bot = await ctx.query.chatbotTable.findFirst({
      where: (tbl => eq(tbl.current_token, bot_token)),
      with: {user: {with: {current_plan: true}}}
    })
    if (!bot) return "404"
    const plan = bot.user.current_plan
    if (!plan) return "payment"
    if (!doesPlanHaveTelegram(plan.plan_id)) return "payment"
    if (plan.messageCount !> 0) return "payment"

    await ctx.update(planTable).set({remainingMessages: plan.remainingMessages - 1}).where(
      eq(planTable.id, plan.id)
    )

    let history = await db.query.chatbot_history_table.findFirst({
      where: (tbl => and(
        eq(tbl.chat_id, chat_id),
        eq(tbl.bot_id, bot.id ),
      ))
    })
    if (!history) return []
    return history.history
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

    let old = await ctx.query.chatbot_history_table.findFirst({
      where: (tbl => and(
        eq(tbl.chat_id, chat_id),
        eq(tbl.bot_id, parseInt(bot_id)),
      ))
    })

    if (old) {
      await ctx.update(chatbot_history_table).set({
        history: limitArray([
          ...old.history,
          {role: "user", content: message},
          {role: "assistant", content: reply},
        ], 20)
      })
      .where(eq(chatbot_history_table.id, old.id))

    } else {
      await ctx.insert(chatbot_history_table).values({
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
