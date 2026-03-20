import Elysia from "elysia";
import { botAuthGuard } from "../chat/botAuthGuard";

export const getPublicSettings = new Elysia({ prefix: "/getPublicSetting" })
.use(botAuthGuard)
.get("/", 
  async ({ bot }) => {
    return {
      color: bot.color,
      color_foreground: bot.color_foreground,
      logo: bot.logo,
      greeting: bot.greeting,
      suggestedQuestions: bot.suggestedQuestions,
      floatingMessage: bot.floatingMessage,
      botName: bot.botName
    }
  }
)
