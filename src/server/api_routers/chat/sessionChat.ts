import Elysia from "elysia";
import { chatGaurd } from "./chatGuard";
import { getAuthSession } from "~/lib/session";
import { db } from "~/db/db";
import { Chatbot, chatbotTable, usersTable } from "~/db/schema";
import { and, eq } from "drizzle-orm";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { isChatAllowed } from "~/server/botUtil";
import { getFakeStream } from "~/server/fakter";
import { ApiResponse } from "~/lib/actionAbstraction";
import { updateChatHistory } from "~/server/serverUtil";
import { timedMessage } from "~/lib/chatUtil";
import { decrementMessageCount } from "~/sections/planServer";

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
    const stream = getFakeStream(100, 100)

    const lastQ = body.messages.at(-1)?.content || ""
    const qa:timedMessage[] = [
      {role: "user", content: lastQ, timestamp: new Date()},
      {role: "assistant", content: "this is tele res", timestamp: new Date()},
    ]

    await updateChatHistory(qa, res.data.id, "11.22.33.44", "website")

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain' }
    })
},
)

const getUserBot = async (userId: string, botId: string ):Promise<ApiResponse<Chatbot>> => {

  return await db.transaction(async ctx => {

    const user = await ctx.query.usersTable.findFirst({
      where: eq(usersTable.id, parseInt(userId)),
      with: {current_plans: true}
    })

    if (!user) return {ok:false, status: 404, msg: "اکانت مورد نظر یافت نشد"}

    const bot = await ctx.query.chatbotTable.findFirst({
      where: and(
          eq(chatbotTable.userId, parseInt(userId)),
          eq(chatbotTable.id, parseInt(botId))
      ),
      with: {user: {
        with: {current_plans: true}
      }}
    })

    if (!bot) return {ok:false, status: 404, msg: "ربات مورد نظر یافت نشد"}
    let res = await isChatAllowed(bot)
    if (!res.ok) {
      return res
    }

    await decrementMessageCount(bot.user, ctx)

    return {ok: true, data: bot}
  })
}
