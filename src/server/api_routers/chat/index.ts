import { google } from "@ai-sdk/google";
import { Readable } from "stream"
import { streamText } from "ai";
import { getSystemPrompt, updateChatHistory } from "@/server/serverUtil";
import Elysia from "elysia";
import { hooshbaan } from "./hooshbaan";
import { botAuthGuard } from "./botAuthGuard";
import { chatGaurd } from "./chatGuard";
import { sessionChatRouter } from "./sessionChat";
import { cors } from '@elysiajs/cors'
import { getFakeStream } from "~/server/fakter";

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

    // const result = streamText({
    //   model: google("gemini-2.5-flash"),
    //   system: getSystemPrompt(bot),
    //   messages: body.messages,
    // })

    // return result.toDataStreamResponse()


    const lastQ = body.messages.at(-1)?.content || ""
    const stream = getFakeStream(1000, 1000)
    const userIp = "1111.1111.1111.1111"

    updateChatHistory([
      {role: "user", content: lastQ, timestamp: new Date()},
      {role: "assistant", content: "response is this", timestamp: new Date()},
    ], bot.id, userIp)

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain' }
    })
  }
);

