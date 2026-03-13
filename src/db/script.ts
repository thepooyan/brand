import { db } from "./db";
import { adminsTable, ticketTable } from "./schema";

await db.delete(ticketTable)

await db.insert(adminsTable).values({
  number: "09027766926",
  chat_id: "0000"
})
