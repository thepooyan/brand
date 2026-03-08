import { db } from "./db";
import { chatbotStatusTable } from "./schema";

await db.update(chatbotStatusTable).set({remainingMessages: 0})
