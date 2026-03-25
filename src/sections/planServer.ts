import { eq, sql } from "drizzle-orm"
import { db, dbCtx } from "~/db/db"
import { planTable, User_Plan } from "~/db/schema"
import { daysFromNow, findAvailavlePlan, freePlan } from "./plan"

export const newFreePlan = async (user_id: number) => {
  const [inserted] = await db.insert(planTable).values({
    plan_id: freePlan.id,
    remainingMessages: freePlan.messageCount,
    user_id: user_id,
    boughtDate: new Date(),
    expirationDate: daysFromNow(90),
  }).returning()
  return inserted
}

export const decrementMessageCount = async (user: User_Plan, ctx?: dbCtx) => {
  const dbctx = ctx ? ctx : db
  if (user.current_plans.length === 0) return false
  let soonestPlan = findAvailavlePlan(user.current_plans)
  if (!soonestPlan) return false
  await dbctx.update(planTable).set({
    remainingMessages: sql`${planTable.remainingMessages} - 1`
  }).where(
      eq(planTable.id, soonestPlan.id)
    )
  return true
}
