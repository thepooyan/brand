import { eq, inArray, lt, sql } from "drizzle-orm"
import { db, dbCtx } from "~/db/db"
import { planTable, User_Plan } from "~/db/schema"
import { convertPlanToDTO, findAvailavlePlanForDecrement, freePlan } from "./plan"

export const newFreePlan = async (user_id: number) => {
  const [inserted] = await db.insert(planTable).values(
    convertPlanToDTO(freePlan, user_id, 1)
  ).returning()
  return inserted
}

export const decrementMessageCount = async (user: User_Plan, ctx: dbCtx) => {
  await cleanExpiredPlans(ctx)
  if (user.current_plans.length === 0) return false
  let soonestPlan = findAvailavlePlanForDecrement(user.current_plans)
  if (!soonestPlan) return false
  let [updated] = await ctx.update(planTable).set({
    remainingMessages: sql`${planTable.remainingMessages} - 1`
  }).where(
      eq(planTable.id, soonestPlan.id)
    ).returning()
  if (updated.remainingMessages === 0) {
    await ctx.delete(planTable).where(eq(planTable.id, updated.id))
  }
  return true
}

export const cleanExpiredPlans = async (ctx: dbCtx) => {
  let expired = await ctx.query.planTable.findMany({
    where: lt(planTable.expirationDate, new Date())
  })
  await ctx.delete(planTable).where(inArray(planTable.id, expired.map(i => i.id)))
}
