import { db } from "./db";
import { adminsTable, planTable, ticketTable } from "./schema";

await db.delete(ticketTable)

await db.update(planTable).set({
  expirationDate: null
})
