import { eq, sql } from "drizzle-orm"
import { db } from "~/db/db"
import { UserRelations } from "~/db/relationQueries"
import { DB_Plan, planTable, User } from "~/db/schema"


type presentUser = User & {current_plan: DB_Plan}
export type apiError = {status: number, msg: string}

type success = {ok: true, presentUser: presentUser }
type fail = {ok: false, error: apiError}

type returnType = success | fail

export const isChatAllowed = (user: UserRelations | undefined):returnType => {
  if (!user) return {ok: false, error:  {status: 401, msg: "کاربر احراز هویت نشده است"} }

  const plan = user.current_plan
  if (!plan) return {ok: false, error: {status: 403, msg: "طرح فعالی برای شما وجود ندارد"}}

  let remaining = plan.remainingMessages
  if (remaining <= 0) return {ok: false, error: {status: 402, msg: "محدودیت پیام های شما به پایان رسیده"}}

  if (new Date() > plan.expirationDate) return {ok: false, error: {status: 402, msg: "طرح شما منقضی شده است"}}

  return {
    presentUser: {
      ...user,
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
