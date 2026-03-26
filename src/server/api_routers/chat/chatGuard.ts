import Elysia from "elysia";
import z from "zod";

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .min(1),
  from: z.enum(["widget", "api", "website"]).default("api")
});

export type Message = z.infer<typeof chatRequestSchema>["messages"][number]

export const chatGaurd = new Elysia()
.guard({
  as: "scoped",
  schema: "standalone",
  body: chatRequestSchema,
})
