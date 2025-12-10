import Elysia from "elysia";
import z from "zod";
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
  schema: "standalone",
  headers: AuthorizationHeader,
})
