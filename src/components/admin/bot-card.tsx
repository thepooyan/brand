import { Chatbot } from "~/db/schema"
import { Muted } from "../prose/prose-item"

interface p {
  bot: Partial<Chatbot>
}
const BotCard = ({bot}:p) => {
  return (
    <div class="bg-muted rounded-lg p-2 flex justify-between px-4">
      <p>
        <Muted>نام ربات:</Muted> {bot.botName}
      </p>
      <p>
        <Muted>نام بیزنس:</Muted>  {bot.businessName}
      </p>
      <p>
        <Muted>وبسایت:</Muted> {bot.websiteUrl || "ندارد"}
      </p>
    </div>
  )
}

export default BotCard
