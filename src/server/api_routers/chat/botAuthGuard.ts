import { eq } from "drizzle-orm";
import Elysia from "elysia";
import z from "zod";
import { db } from "~/db/db";
import { tokenLength } from "~/db/schema";

const AuthorizationHeader = z.object({
  authorization: z
    .string()
    .toLowerCase()
    .startsWith("bearer ")
    .length(tokenLength + 7)
})
.transform(val => ({token: val.authorization.slice(7)}))

export const botAuthGuard = new Elysia()
.guard({
  as: "scoped",
  schema: "standalone",
  headers: AuthorizationHeader,
})
.resolve({as: "scoped"}, async ({headers, status}) => {
  const bot = await getBot(headers.token || "");
  if (!bot) return status(403);
  return {bot: bot}
})

const getBot = (token: string) => {
  return db.query.chatbotStatusTable.findFirst({
    where: (a) => eq(a.current_token, token),
    with: { chatbot: true },
  });
};
