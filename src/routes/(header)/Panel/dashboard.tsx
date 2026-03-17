import { createAsync, query, redirect } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { Show } from "solid-js"
import TA from "~/components/parts/TA"
import { Button } from "~/components/ui/button"
import { db } from "~/db/db"
import { clearAuthSession, getAuthSession } from "~/lib/session"
import { calcMessageCount, calcMessagePercent, cn, daysRemaining } from "~/lib/utils"
import { findPlanName } from "~/sections/plan"

const queryUserPlan = query(async() => {
  "use server"
  let user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/Panel/dashboard")

  const dbUser = await db.query.usersTable.findFirst({
    where: (tbl => eq(tbl.id, user.id)),
    with: {current_plan: true}
  })

  if (!dbUser) {
    clearAuthSession()
    throw redirect("/Login")
  }

  return dbUser.current_plan
}, "userPlan")

const dashboard = () => {

  const planData = createAsync(() => queryUserPlan())

  const cont = "border-1 border-border rounded-lg p-4 bg-card"

  const days = () => {
    const plan = planData()
    if (!plan || !plan.expirationDate) return null

    return daysRemaining(plan.expirationDate)
  }

  return (
    <div class="grid grid-cols-2 gap-3">
      <Show when={planData()}>
        {presentPlan => <>

      <div class={cn(cont, "flex justify-between flex-col")}>
        <h3 class="text-xl font-bold">
          تعداد پیام باقی مانده: 
        </h3>
        <div class="mb-5">
          <p class="text-left text-sm mb-1">
            {presentPlan().remainingMessages} از {calcMessageCount(presentPlan())}
          </p>
          <div class="h-1 w-full bg-muted rounded-lg overflow-hidden  ">
            <div class={`bg-primary h-full`}
              style={{width: calcMessagePercent(presentPlan()) + "%"}}>
            </div>
          </div>
        </div>
      </div>

      <div class={cont}>
        <h3 class="text-xl font-bold">
          پلن فعلی شما: 
        </h3>
        <p class="text-sm mt-1">
          {findPlanName(presentPlan())}
        </p>
        <p class="text-sm mt-1">
          تعداد ربات: {presentPlan().botCount} عدد
        </p>
        <Button as={TA} href="/pricing" class="mr-auto block w-max">
          مشاهده پلن ها
        </Button>
      </div>

      <div class={cont}>
        <h3 class="text-xl font-bold">
          تاریخ انقضا: 
        </h3>
        <p class="text-sm mt-2">
          {presentPlan().expirationDate?.toLocaleString("fa", {day: "numeric", month: "numeric", year: "numeric"}) || "نامحدود"}
          <br/>
          <Show when={days()}>
            {s => s() > 0 ? `${s()} روز باقی مانده` : `تاریخ انقضا شما سپری شده` }
          </Show>
        </p>
        <Button class="mr-auto block w-max">
          تمدید پلن
        </Button>
      </div>
        </>}
      </Show>
    </div>
  )
}

export default dashboard
