import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { getSystemPrompt } from "@/server/serverUtil";
import Elysia from "elysia";
import { hooshbaan } from "./hooshbaan";
import { botAuthGuard } from "./botAuthGuard";
import { chatGaurd } from "./chatGuard";
import { sessionChatRouter } from "./sessionChat";
import { cors } from '@elysiajs/cors'

export const chatRoute = new Elysia({ prefix: "/chat" })
.use(
  cors(
    {
      origin: true,
      methods: "*",
      allowedHeaders: "*"
    }
  )
)
.use(chatGaurd)
.use(sessionChatRouter)
.use(hooshbaan)
.use(botAuthGuard)
.post( "/",
  async ({ body, bot }) => {

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: getSystemPrompt(bot.chatbot),
      messages: body.messages,
    })

    return result.toDataStreamResponse()
  }
);

