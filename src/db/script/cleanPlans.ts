import { db } from "../db";
import { planTable } from "../schema";

await db.delete(planTable)
