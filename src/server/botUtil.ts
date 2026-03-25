import { eq, sql } from "drizzle-orm"
import { db, dbCtx } from "~/db/db"
import { Chatbot, PlanInstance, planTable, User, User_Plan } from "~/db/schema"
import { ApiResponse } from "~/lib/actionAbstraction"

type presentUser = User & {current_plan: PlanInstance}

type botWithRelations = Chatbot & {
  user: User & {current_plan: PlanInstance}
}
export const isChatAllowed = async (bot: botWithRelations, recieverIP?: string):Promise<ApiResponse<presentUser>> => {

  if (!bot) return {ok: false, status: 401, msg: "کاربر احراز هویت نشده است"}

  const plan = bot.user.current_plan
  if (!plan) return {ok: false, status: 403, msg: "طرح فعالی برای شما وجود ندارد"}

  let remaining = plan.remainingMessages
  if (remaining <= 0) return {ok: false, status: 402, msg: "محدودیت پیام های شما به پایان رسیده"}

  if (plan.expirationDate)
  if (new Date() > plan.expirationDate) return {ok: false, status: 402, msg: "طرح شما منقضی شده است"}

  if (bot.limitation && recieverIP) {
    let history = await db.query.chatbot_history_table.findMany({
      where: (tbl => eq(tbl.userIP, recieverIP))
    })
    let total = history.map(a => a.messages.length).reduce((p,c) => p+c)
    if (total >= bot.limitation) return {ok: false, status: 402, msg: "متاسفانه محدودیت پاسخدهی ربات به پایان رسیده"}
  }

  return {
    data: {
      ...bot.user,
      current_plan: plan
    },
    ok: true
  }
}

const findSoonestExpiringPlan = (plans: PlanInstance[]): PlanInstance | null => {
  if (!plans || plans.length === 0) {
    return null;
  }

  let soonestPlan: PlanInstance | null = null;

  for (const plan of plans) {
    if (plan.expirationDate === null) return plan
    if (isNaN(plan.expirationDate.getTime())) { 
      console.warn(`Warning: Plan with ID ${plan.id} has an invalid expiration date. Skipping.`);
      continue
    }
    if (soonestPlan === null || plan.expirationDate < soonestPlan.expirationDate!) {
      soonestPlan = plan;
    }
  }

  return soonestPlan;
}

export const decrementMessageCount = async (user: User_Plan, ctx?: dbCtx) => {
  const dbctx = ctx ? ctx : db
  if (user.current_plans.length === 0) return false
  let soonestPlan = findSoonestExpiringPlan(user.current_plans)
  if (!soonestPlan) return false
  await dbctx.update(planTable).set({
    remainingMessages: sql`${planTable.remainingMessages} - 1`
  }).where(
      eq(planTable.id, soonestPlan.id)
    )
  return true
}
