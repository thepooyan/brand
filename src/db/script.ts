import { db } from "./db";
import { adminsTable, chatbot_history_table, chatbotTable, planTable, ticketTable } from "./schema";

await db.insert(chatbot_history_table).values({
  botId: 4,
  userIP: "332211",
  messages: [
    {role: "assistant", content: "hi how are you", timestamp: new Date()},
    {role: "user", content: "hi you are", timestamp: new Date()},
    {role: "assistant", content: "hi fucking bitch", timestamp: new Date()},
    {role: "user", content: "hi", timestamp: new Date()},
  ]
})
