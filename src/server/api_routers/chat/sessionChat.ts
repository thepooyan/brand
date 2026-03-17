import Elysia from "elysia";
import { chatGaurd } from "./chatGuard";
import { getAuthSession } from "~/lib/session";
import { db } from "~/db/db";
import { Chatbot, chatbotTable, usersTable } from "~/db/schema";
import { and, eq } from "drizzle-orm";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { decrementMessageCount, isChatAllowed } from "~/server/botUtil";
import { getFakeStream } from "~/server/fakter";
import { ApiResponse } from "~/lib/actionAbstraction";

export const sessionChatRouter = new Elysia({ prefix: "/session" })
.use(chatGaurd)
.post("/:botId", async ({ body, status, params: {botId} }) => {

  const auth = await getAuthSession()
  if (!auth) return status(401)

  const res = await getUserBot(auth.id.toString(), botId)
  if (!res.ok)
    return status(res.status, {errorMessage: res.msg})


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

const getUserBot = async (userId: string, botId: string ):Promise<ApiResponse<Chatbot>> => {

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, parseInt(userId)),
    with: {current_plan: true}
  })

  let res = isChatAllowed(user)
  if (!res.ok) {
    return res
  }

  const bot = await db.query.chatbotTable.findFirst({
    where: and(
        eq(chatbotTable.userId, parseInt(userId)),
        eq(chatbotTable.id, parseInt(botId))
    )
  })

  if (!bot) return {ok:false, status: 404, msg: "ربات مورد نظر یافت نشد"}

  await decrementMessageCount(res.data.current_plan)

  return {ok: true, data: bot}
}
