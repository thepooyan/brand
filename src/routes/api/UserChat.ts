import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { and, eq } from 'drizzle-orm';
import { db } from '~/db/db';
import { chatbot } from '~/db/schema';
import { getSystemPrompt } from '~/server/util';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST({request}:{request: Request}) {
  const { messages, userId, botId } = await request.json();

  const bot = await getUserBot(userId, botId)

  if (!bot)
    return new Response("Not found", {status: 404})

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: getSystemPrompt(bot),
    messages,
  });

  return result.toDataStreamResponse()
}

const getUserBot = async (userId:string, botId:string) => {
  return (await db.select()
    .from(chatbot)
    .where(
      and(
        eq(chatbot.userId, parseInt(userId)), 
        eq(chatbot.id, parseInt(botId))
      )
    )).at(0)
}
