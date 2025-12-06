import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "~/db/db";
import { tokenLength } from "~/db/schema";
import { getSystemPrompt } from "../serverUtil";
import Elysia from "elysia";

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
      }),
    )
    .min(1),
});

const AuthorizationHeader = z.object({
  authorization: z
    .string()
    .toLowerCase()
    .startsWith("bearer ")
    .length(tokenLength + 7)
})
.transform(val => ({token: val.authorization.slice(7)}))

export const chatRoute = new Elysia({ prefix: "/chat" }).post( "/",
  async ({ body, headers, status}) => {

    const bot = await getBot(headers.token);
    if (!bot) return status(403);

    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: getSystemPrompt(bot.chatbot),
      messages: body.messages,
    })

    return result.toDataStreamResponse()
  },
  {
    body: chatRequestSchema,
    headers: AuthorizationHeader,
  },
);

const getBot = (token: string) => {
  return db.query.chatbot_status.findFirst({
    where: (a) => eq(a.current_token, token),
    with: { chatbot: true },
  });
};
