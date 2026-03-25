//@ts-nocheck
import { cleanExpiredPlans } from "~/sections/planServer";
import { db } from "../db";
import { planTable } from "../schema";


await cleanExpiredPlans()

// await db.delete(planTable)
