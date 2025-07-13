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

  if (body.message.from.is_bot) return

  const msg = body.message.text
  const chat_id = body.message.from.id

  const response = await replyWithAI(msg)

  await telegram.support.send(response, String(chat_id))
  return "ok"
}
