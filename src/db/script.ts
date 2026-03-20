import { db } from "./db";
import { adminsTable, chatbotTable, planTable, ticketTable } from "./schema";

await db.update(chatbotTable).set({floatingMessage: {msg: "سوال خود را از دستیار هوشمند بپرسید!", active: true}})
