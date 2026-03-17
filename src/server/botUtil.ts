import { UserRelations } from "~/db/relationQueries"


export type apiError = {status: number, msg: string}
export const isChatAllowed = (user: UserRelations | undefined):apiError | true => {
  if (!user) return {status: 401, msg: "کاربر احراز هویت نشده است"}

  const plan = user.current_plan
  if (!plan) return {status: 403, msg: "طرح فعالی برای شما وجود ندارد"}

  let remaining = plan.remainingMessages
  if (remaining <= 0) return {status: 402, msg: "محدودیت پیام های شما به پایان رسیده"}

  if (new Date() > plan.expirationDate) return {status: 402, msg: "طرح شما منقضی شده است"}

  return true
}
