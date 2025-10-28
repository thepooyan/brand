import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '~/db/db';
import { chatbot, chatbot_status } from '~/db/schema';
import { getSystemPrompt } from '~/server/serverUtil';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST({request}:{request: Request}) {
  const { messages, userId, botId } = await request.json();

  const bot = await getUserBot(userId, botId)

  if (bot === "404")
    return new Response("Not found", {status: 404})

  if (bot === "empty")
    return new Response("No credit left", {status: 402})

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: getSystemPrompt(bot),
    messages,
  });

  return result.toDataStreamResponse()
}

const getUserBot = async (userId: string, botId: string) => {
  const bot = (await db.select()
    .from(chatbot)
    .leftJoin(chatbot_status, eq(chatbot.id, chatbot_status.id))
    .where(
      and(
        eq(chatbot.userId, parseInt(userId)),
        eq(chatbot.id, parseInt(botId))
      )
    )).at(0)

  if (!bot) return "404"

  let remaining = bot.chatbot_status?.remainingMessages!
  if (remaining <= 0) return "empty"

  await db.update(chatbot_status)
    .set({
      remainingMessages: sql`${chatbot_status.remainingMessages} - 1`
    })
    .where(eq(chatbot_status.id, bot.chatbot.id))

  return bot.chatbot
}

