import Elysia from "elysia";
import { chatGaurd } from "./chatGuard";
import { getAuthSession } from "~/lib/session";
import { db } from "~/db/db";
import { ChatbotRelations, chatbotTable, usersTable } from "~/db/schema";
import { and, eq } from "drizzle-orm";
import { isChatAllowed } from "~/server/botUtil";
// import { getFakeStream } from "~/server/fakter";
import { ApiResponse } from "~/lib/actionAbstraction";
import { updateChatHistory } from "~/server/serverUtil";
import { timedMessage } from "~/db/constants";
import { decrementMessageCount } from "~/sections/planServer";
import { talk_to_bot } from "~/server/llmUtil";
import { OnFinishEvent } from "ai";
import { getIp } from "./apiUtil";

export const sessionChatRouter = new Elysia({ prefix: "/session" })
.use(chatGaurd)
.post("/:botId", async ({ body, status, request , params: {botId} }) => {

  const auth = await getAuthSession()
  if (!auth) return status(401)

  const res = await getUserBot(auth.id.toString(), botId)
  if (!res.ok)
    return status(res.status, {errorMessage: res.msg})

    const handleFinish = async (e: OnFinishEvent) => {
      const lastQ = body.messages.at(-1)?.content || ""
      const qa:timedMessage[] = [
        {role: "user", content: lastQ, timestamp: new Date()},
        {role: "assistant", content: e.text, timestamp: new Date()},
      ]
      await updateChatHistory(qa, res.data.id, getIp(request), "website")
    }

    const stream = talk_to_bot(res.data, handleFinish)(body.messages)
    return stream.toTextStreamResponse()

    // const stream = getFakeStream(100, 100)
    // return new Response(stream, {
    //   headers: { 'Content-Type': 'text/plain' }
    // })
},
)

const getUserBot = async (userId: string, botId: string ):Promise<ApiResponse<ChatbotRelations>> => {

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
      with: {
        trainingData: true,
        user: {
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
