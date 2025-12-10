import Elysia from "elysia";
import prompt from "~/data/llm-prompt.json"
import { chatGaurd } from "./chatGuard";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const hooshbaan = (app: Elysia) => {
  return app
    .use(chatGaurd)
    .post("/hooshbaan", ({body}) => {

      const result = streamText({
        model: google('gemini-2.5-flash'),
        system: prompt.website,
        messages: body.messages,
      });

      return result.toDataStreamResponse()
    })
}
