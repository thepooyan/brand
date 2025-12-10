import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "~/db/db";
import { tokenLength } from "~/db/schema";
import { getSystemPrompt } from "@/server/serverUtil";
import Elysia from "elysia";
import { hooshbaan } from "./hooshbaan";

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

const AuthorizationHeader = z.object({
  authorization: z
    .string()
    .toLowerCase()
    .startsWith("bearer ")
    .length(tokenLength + 7)
})
.transform(val => ({token: val.authorization.slice(7)}))

export const chatRoute = new Elysia({ prefix: "/chat" })
.guard({
  schema: "standalone",
  body: chatRequestSchema,
})
.use(hooshbaan)
.guard({
  schema: "standalone",
  headers: AuthorizationHeader,
})
.resolve(async ({headers, status}) => {
  const bot = await getBot(headers.token);
  if (!bot) return status(403);
  return {bot: bot}
})
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

const getBot = (token: string) => {
  return db.query.chatbot_status.findFirst({
    where: (a) => eq(a.current_token, token),
    with: { chatbot: true },
  });
};
