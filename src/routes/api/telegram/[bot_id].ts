import { useParams } from '@solidjs/router';
import { and, eq } from 'drizzle-orm';
import Message from '~/components/parts/chat/Message';
import { db } from '~/db/db';
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

  await telegram.send(bot_id, response, String(chat_id))

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
