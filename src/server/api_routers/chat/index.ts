import { updateChatHistory } from "@/server/serverUtil";
import Elysia from "elysia";
import { hooshbaan } from "./hooshbaan";
import { botAuthGuard } from "./botAuthGuard";
import { chatGaurd } from "./chatGuard";
import { sessionChatRouter } from "./sessionChat";
import { cors } from '@elysiajs/cors'
// import { getFakeStream } from "~/server/fakter";
import { talk_to_bot } from "~/server/llmUtil";

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
  async ({ body, bot }) => {

    const lastQ = body.messages.at(-1)?.content || ""

      // const ip =
      //       request.headers.get('x-forwarded-for') ??
      //       request.headers.get('x-real-ip') ??
      //       request.headers.get('cf-connecting-ip') ?? // Cloudflare
      //       ""

    const userIp = "1111"

    await updateChatHistory([
      {role: "user", content: lastQ, timestamp: new Date()},
      {role: "assistant", content: "response is this", timestamp: new Date()},
    ], bot.id, userIp, body.from)

    const result = talk_to_bot(bot)(body.messages)

    return result.toTextStreamResponse()

    // const stream = getFakeStream(1000, 1000)
    // return new Response(stream, {
    //   headers: { 'Content-Type': 'text/plain' }
    // })
  }
);

