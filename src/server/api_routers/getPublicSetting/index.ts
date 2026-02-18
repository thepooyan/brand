import Elysia from "elysia";
import { botAuthGuard } from "../chat/botAuthGuard";

export const getPublicSettings = new Elysia({ prefix: "/getPublicSetting" })
.use(botAuthGuard)
.get("/", 
  async ({ bot }) => {
    return { color: bot.chatbot.color }
  }
)
