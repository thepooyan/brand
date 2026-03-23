import { db } from "./db";
import { adminsTable, chatbot_history_table, chatbotTable, planTable, ticketTable } from "./schema";

await db.insert(chatbot_history_table).values({
  botId: 3,
  userIP: "33",
  messages: [
    {role: "assistant", content: "hi fucking bitch", timestamp: new Date()},
    {role: "user", content: "hi", timestamp: new Date()},
    {role: "assistant", content: "hi how are you", timestamp: new Date()},
    {role: "user", content: "hi you are", timestamp: new Date()},
  ],
  lastUpdated: new Date(new Date().setFullYear(2020))
})
await db.insert(chatbot_history_table).values({
  botId: 3,
  userIP: "33",
  messages: [
    {role: "assistant", content: "hi fucking bitch", timestamp: new Date()},
    {role: "user", content: "hi", timestamp: new Date()},
    {role: "user", content: "hi you are", timestamp: new Date()},
    {role: "assistant", content: "hi how are you", timestamp: new Date()},
  ],
  lastUpdated: new Date(new Date().setFullYear(2020))
})
await db.insert(chatbot_history_table).values({
  botId: 3,
  userIP: "33",
  messages: [
    {role: "user", content: "hi", timestamp: new Date()},
    {role: "assistant", content: "hi how are you", timestamp: new Date()},
    {role: "user", content: "hi you are", timestamp: new Date()},
    {role: "assistant", content: "hi fucking bitch", timestamp: new Date()},
  ],
  lastUpdated: new Date(new Date().setFullYear(2020))
})
await db.insert(chatbot_history_table).values({
  botId: 3,
  userIP: "22",
  messages: [
    {role: "assistant", content: "hi fucking bitch", timestamp: new Date()},
    {role: "assistant", content: "hi how are you", timestamp: new Date()},
    {role: "user", content: "hi you are", timestamp: new Date()},
    {role: "user", content: "hi", timestamp: new Date()},
  ],
  lastUpdated: new Date(new Date().setMonth(2))
})
await db.insert(chatbot_history_table).values({
  botId: 3,
  userIP: "33",
  messages: [
    {role: "assistant", content: "hi fucking bitch", timestamp: new Date()},
    {role: "user", content: "hi", timestamp: new Date()},
    {role: "assistant", content: "hi how are you", timestamp: new Date()},
    {role: "user", content: "hi you are", timestamp: new Date()},
  ],
  lastUpdated: new Date(new Date())
})
