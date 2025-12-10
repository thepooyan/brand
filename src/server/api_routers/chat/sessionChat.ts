import Elysia from "elysia";
import { chatGaurd } from "./chatGuard";
import { getAuthSession } from "~/lib/session";
import { db } from "~/db/db";
import { chatbot, chatbot_status } from "~/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { getSystemPrompt } from "~/server/serverUtil";

export const sessionChatRouter = new Elysia({ prefix: "/session" })
.use(chatGaurd)
.post("/:botId", async ({ body, status, params: {botId} }) => {

  const auth = await getAuthSession()
  if (!auth) return status(401)

  const bot = await getUserBot(auth.id.toString(), botId)
  switch (bot) {
    case "404":
      return status(404)
    case "empty":
      return status(402)
  }

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: getSystemPrompt(bot),
      messages: body.messages,
    })

    return result.toDataStreamResponse()
},
)

const getUserBot = async (userId: string, botId: string ) => {
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

  await db.update(chatbot_status)
    .set({
      remainingMessages: sql`${chatbot_status.remainingMessages} - 1`
    })
    .where(eq(chatbot_status.id, bot.chatbot.id))

  return bot.chatbot
}
