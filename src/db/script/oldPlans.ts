import { db } from "../db";
import { planTable } from "../schema";

let t = new Date()

let b = new Date(t.setMonth(t.getMonth() - 1))

await db.update(planTable).set({expirationDate: b})
