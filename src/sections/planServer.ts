import { eq, sql } from "drizzle-orm"
import { db, dbCtx } from "~/db/db"
import { planTable, User_Plan } from "~/db/schema"
import { convertPlanToDTO, findAvailavlePlanForDecrement, freePlan } from "./plan"

export const newFreePlan = async (user_id: number) => {
  const [inserted] = await db.insert(planTable).values(
    convertPlanToDTO(freePlan, user_id)
  ).returning()
  return inserted
}

export const decrementMessageCount = async (user: User_Plan, ctx?: dbCtx) => {
  const dbctx = ctx ? ctx : db
  if (user.current_plans.length === 0) return false
  let soonestPlan = findAvailavlePlanForDecrement(user.current_plans)
  if (!soonestPlan) return false
  let [updated] = await dbctx.update(planTable).set({
    remainingMessages: sql`${planTable.remainingMessages} - 1`
  }).where(
      eq(planTable.id, soonestPlan.id)
    ).returning()
  if (updated.remainingMessages === 0) {
    await dbctx.delete(planTable).where(eq(planTable.id, updated.id))
  }
  return true
}
