import Elysia from "elysia";
import { chatGaurd } from "./chatGuard";
import { getAuthSession } from "~/lib/session";
import { db } from "~/db/db";
import { Chatbot, chatbotTable, planTable, usersTable } from "~/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { apiError, decrementMessageCount, isChatAllowed } from "~/server/botUtil";
import { getFakeStream } from "~/server/fakter";

export const sessionChatRouter = new Elysia({ prefix: "/session" })
.use(chatGaurd)
.post("/:botId", async ({ body, status, params: {botId} }) => {

  const auth = await getAuthSession()
  if (!auth) return status(401)

  const bot = await getUserBot(auth.id.toString(), botId)
  if (typeof bot === "number")
    return status(bot)


    // const result = streamText({
    //   model: google("gemini-2.5-flash"),
    //   system: getSystemPrompt(bot),
    //   messages: body.messages,
    // })
    //
    // return result.toDataStreamResponse()
    const stream = getFakeStream(1000, 1000)

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain' }
    })
},
)

const getUserBot = async (userId: string, botId: string ) => {

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, parseInt(userId)),
    with: {current_plan: true}
  })

  let persission = isChatAllowed(user)
  if (persission !== true) {
    return persission.status
  }

  const bot = await db.query.chatbotTable.findFirst({
    where: and(
        eq(chatbotTable.userId, parseInt(userId)),
        eq(chatbotTable.id, parseInt(botId))
    )
  })

  // if (!bot) return {status: 404, msg: "ربات مورد نظر یافت نشد"}
  if (!bot) return 404

  await decrementMessageCount(user!.current_plan!)

  return bot
}
