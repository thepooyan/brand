import { db } from "./db";
import { adminsTable, chatbotTable, planTable, ticketTable } from "./schema";

await db.update(chatbotTable).set({logo: null})
