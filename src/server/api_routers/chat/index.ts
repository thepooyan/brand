import { google } from "@ai-sdk/google";
import { Readable } from "stream"
import { streamText } from "ai";
import { getSystemPrompt } from "@/server/serverUtil";
import Elysia from "elysia";
import { hooshbaan } from "./hooshbaan";
import { botAuthGuard } from "./botAuthGuard";
import { chatGaurd } from "./chatGuard";
import { sessionChatRouter } from "./sessionChat";
import { cors } from '@elysiajs/cors'

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

  const encoder = new TextEncoder()

const stream = new ReadableStream({
  start(controller) {
    controller.enqueue(encoder.encode('0: Hello '))
    controller.enqueue(encoder.encode('world!\n'))
    controller.close()
  }
})

return new Response(stream, {
  headers: { 'Content-Type': 'text/plain' }
})
}
);

