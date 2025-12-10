import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import z from "zod";
import { getSystemPrompt } from "@/server/serverUtil";
import Elysia from "elysia";
import { hooshbaan } from "./hooshbaan";
import { botAuthGuard } from "./botAuthGuard";

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .min(1),
});

export const chatRoute = new Elysia({ prefix: "/chat" })
.guard({
  schema: "standalone",
  body: chatRequestSchema,
})
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

