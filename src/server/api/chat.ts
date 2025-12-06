import { eq } from "drizzle-orm";
import { Context } from "elysia";
import z from "zod";
import { db } from "~/db/db";
import { tokenLength } from "~/db/schema";

export const chatHandler = async ({request, status}:Context) => {

  const auth = request.headers.get("authorization")
  if (!auth) return status(403)
  const valid = await isAuthHeaderValid(auth)
  if (!valid) return status(403)

  return "response";
};

export const chatRequestSchema = {
  body: z.object({
    messages: z.array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
      }),
    ).min(1),
    token: z.string().length(tokenLength),
  }),
};

const isAuthHeaderValid = async (s:string) => {
  const token = s.substring(7)
  if (token.length !== tokenLength) return false

  const target = await db.query.chatbot_status.findFirst({
    where: (a => eq(a.current_token, token))
  })

  return target !== undefined
}
