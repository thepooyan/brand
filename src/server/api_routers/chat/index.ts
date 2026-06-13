import { updateChatHistory } from "@/server/serverUtil";
import Elysia from "elysia";
import { hooshbaan } from "./hooshbaan";
import { botAuthGuard } from "./botAuthGuard";
import { chatGaurd } from "./chatGuard";
import { sessionChatRouter } from "./sessionChat";
import { cors } from '@elysiajs/cors'
// import { getFakeStream } from "~/server/fakter";
import { talk_to_bot } from "~/server/llmUtil";
import { OnFinishEvent } from "ai";
import { getIp } from "./apiUtil";

export const chatRoute = new Elysia({ prefix: "/chat" })
.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}))
.options("/*", () => new Response(null, { status: 204 }))
.use(chatGaurd)
.use(sessionChatRouter)
.use(hooshbaan)
.use(botAuthGuard)
.post( "/",
  async ({ body, bot, status, request }) => {

    const lastQ = body.messages.at(-1)?.content || ""

    const ip = getIp(request)

    const handleFinish = async (e: OnFinishEvent) => {
      await updateChatHistory([
        {role: "user", content: lastQ, timestamp: new Date()},
        {role: "assistant", content: e.text, timestamp: new Date()},
      ], bot.id, ip, body.from)
    }

    try {
      const result = talk_to_bot(bot, handleFinish)(body.messages)
      return result.toTextStreamResponse()
    } catch (e) {
      console.log(e)
      return status("Request Timeout", {errorMessage: "ارتباط با سرور هوش مصنوعی برقرار نشد. لطفا مجددا تلاش کنید."})
    }

    // const stream = getFakeStream(1000, 1000)
    // return new Response(stream, {
    //   headers: { 'Content-Type': 'text/plain' }
    // })
  }
);

