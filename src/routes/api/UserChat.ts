import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { and, eq, sql } from 'drizzle-orm';
import z from 'zod';
import { db } from '~/db/db';
import { chatbot, chatbot_status } from '~/db/schema';
import { getSystemPrompt } from '~/server/serverUtil';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const requestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant", "system"]), //"user" | "assistant" | "system",
    content: z.string()
  })),
  botId: z.string(),
  userId: z.string(),
  token: z.string(),
})
export async function POST({request}:{request: Request}) {
  const req = await request.json();
  let parsed = requestSchema.safeParse(req)

  if (!parsed.success)
    return new Response("Bad request", {status: 400})

  const {userId, botId, token, messages} = parsed.data

  const bot = await getUserBot(userId, botId, token)

  if (bot === "404")
    return new Response("Not found", {status: 404})

  if (bot === "empty")
    return new Response("No credit left", {status: 402})

  if (bot === "401")
    return new Response("Failed authentication", {status: 401})

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: getSystemPrompt(bot),
    messages,
  });

  return result.toDataStreamResponse()
}

const getUserBot = async (userId: string, botId: string, token: string) => {
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
  if (!bot.chatbot_status) return "404"

  let remaining = bot.chatbot_status.remainingMessages
  if (remaining <= 0) return "empty"

  const dbToken = bot.chatbot_status.current_token
  if (token !== dbToken) return "401"

  await db.update(chatbot_status)
    .set({
      remainingMessages: sql`${chatbot_status.remainingMessages} - 1`
    })
    .where(eq(chatbot_status.id, bot.chatbot.id))

  return bot.chatbot
}

