import { eq } from "drizzle-orm";
import Elysia from "elysia";
import z from "zod";
import { db } from "~/db/db";
import { tokenLength } from "~/db/schema";
import { isChatAllowed } from "~/server/botUtil";
import { hashToken } from "~/server/serverUtil";

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
  const token = headers.token
  if (!token) return status(400, {errorMessage: "توکنی از سمت کاربر یافت نشد"})

  const bot = await getBot(token);
  if (!bot) return status(404, {errorMessage: "ربات یافت نشد"});

  // i need user ip here
  const res = await isChatAllowed(bot, "192.168.2.3")
  if (!res.ok) return status(res.status, {errorMessage: res.msg} )

  return {bot: bot}
})

const getBot = (token: string) => {
  return db.query.chatbotTable.findFirst({
    where: (tbl) => eq(tbl.current_token, hashToken(token)),
    with: {user: {with: {current_plan: true}}}
  });
};
