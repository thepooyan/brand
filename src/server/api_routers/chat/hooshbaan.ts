import Elysia from "elysia";
import prompt from "~/data/llm-prompt.json"
import { chatGaurd } from "./chatGuard";
import { getFakeStream } from "~/server/fakter";
import { chat } from "~/server/llmUtil";

export const hooshbaan = (app: Elysia) => {
  return app
    .use(chatGaurd)
    .post("/hooshbaan", ({body}) => {
      const result = chat(body.messages, prompt.website)
      return result.toTextStreamResponse()

      const stream = getFakeStream(1000, 1000)
      return new Response(stream, {
        headers: { 'Content-Type': 'text/plain' }
      })
    })
}
