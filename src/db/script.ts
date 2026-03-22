import { db } from "./db";
import { adminsTable, chatbot_history_table, chatbotTable, planTable, ticketTable } from "./schema";

await db.update(chatbot_history_table).set({
  botId: 3,
})
