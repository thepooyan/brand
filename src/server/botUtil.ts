import { eq, sql } from "drizzle-orm"
import { db } from "~/db/db"
import { Chatbot, DB_Plan, planTable, User } from "~/db/schema"
import { ApiResponse } from "~/lib/actionAbstraction"

type presentUser = User & {current_plan: DB_Plan}

type botWithRelations = Chatbot & {
  user: User & {current_plan: DB_Plan}
}
export const isChatAllowed = (bot: botWithRelations):ApiResponse<presentUser> => {
  if (!bot) return {ok: false, status: 401, msg: "کاربر احراز هویت نشده است"}

  const plan = bot.user.current_plan
  if (!plan) return {ok: false, status: 403, msg: "طرح فعالی برای شما وجود ندارد"}

  let remaining = plan.remainingMessages
  if (remaining <= 0) return {ok: false, status: 402, msg: "محدودیت پیام های شما به پایان رسیده"}

  if (plan.expirationDate)
  if (new Date() > plan.expirationDate) return {ok: false, status: 402, msg: "طرح شما منقضی شده است"}

  return {
    data: {
      ...bot.user,
      current_plan: plan
    },
    ok: true
  }
}

export const decrementMessageCount = async (plan: DB_Plan) => {
  await db.update(planTable)
    .set({
      remainingMessages: sql`${planTable.remainingMessages} - 1`
    })
    .where(eq(planTable.id, plan.id ))
}
