import { db } from "./db";
import { ticketTable } from "./schema";

await db.delete(ticketTable)
