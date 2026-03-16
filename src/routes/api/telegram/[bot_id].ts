import { useParams } from '@solidjs/router';
import { and, eq } from 'drizzle-orm';
import Message from '~/components/parts/chat/Message';
import { db } from '~/db/db';
import { chatbot_history_table } from '~/db/schema';
import { message } from '~/lib/chatUtil';
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
  const {bot_id} = useParams()

  if (body.message.from.is_bot) return

  const msg = body.message.text
  const chat_id = body.message.from.id

  const history = await getChatHistory(bot_id, chat_id)

  const response = await replyWithAI(msg, history)

  await Promise.all([
    pushChatHistory(bot_id, chat_id, msg, response),
    telegram.send(bot_id, response, String(chat_id))
  ])

  return "ok"
}

const getChatHistory = async (bot_id: string, chat_id:number):Promise<message[]> => {
  let a = await db.query.chatbot_history_table.findFirst({
    where: (tbl => and(
      eq(tbl.chat_id, chat_id),
      eq(tbl.bot_id, parseInt(bot_id)),
    ))
  })
  if (!a) return []
  return a.history
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
        history: [
          ...old.history,
          {role: "user", content: message},
          {role: "assistant", content: reply},
        ]
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
