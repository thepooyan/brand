import { eq } from "drizzle-orm"
import { db } from "~/db/db"
import { Chatbot, PlanInstance, User, User_Plan } from "~/db/schema"
import { ApiResponse } from "~/lib/actionAbstraction"
import { userPermissions } from "~/sections/plan"

type presentUser = User & {current_plans: PlanInstance[]}

type botWithRelations = Chatbot & {
  user: User_Plan
}
export const isChatAllowed = async (bot: botWithRelations, recieverIP?: string):Promise<ApiResponse<presentUser>> => {

  if (!bot) return {ok: false, status: 401, msg: "کاربر احراز هویت نشده است"}

  const plans = bot.user.current_plans
  if (plans.length === 0) return {ok: false, status: 403, msg: "طرح فعالی برای شما وجود ندارد"}

  const {message, expired} = userPermissions({...bot.user, bots: [bot]})

  if (!message) return {ok: false, status: 402, msg: "محدودیت پیام های شما به پایان رسیده"}

  if (expired) return {ok: false, status: 402, msg: "طرح شما منقضی شده است"}

  if (bot.limitation && recieverIP) {
    let history = await db.query.chatbot_history_table.findMany({
      where: (tbl => eq(tbl.userIP, recieverIP))
    })
    let total = history.map(a => a.messages.length).reduce((p,c) => p+c, 0)
    if (total >= bot.limitation) return {ok: false, status: 402, msg: "متاسفانه محدودیت پاسخدهی ربات به پایان رسیده"}
  }

  return {
    data: {
      ...bot.user,
      current_plans: plans
    },
    ok: true
  }
}

