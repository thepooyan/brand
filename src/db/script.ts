import { db } from "./db";
import { adminsTable, planTable, ticketTable } from "./schema";

await db.insert(adminsTable).values({
  number: "09027766926",
  chat_id: ""
})
