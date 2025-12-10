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
});

export const chatGaurd = new Elysia()
.guard({
  as: "scoped",
  schema: "standalone",
  body: chatRequestSchema,
})
