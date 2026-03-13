import { createAsync, query, redirect } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { Show } from "solid-js"
import TA from "~/components/parts/TA"
import { Button } from "~/components/ui/button"
import { db } from "~/db/db"
import { clearAuthSession, getAuthSession } from "~/lib/session"
import { calcMessageCount, calcMessagePercent, daysRemaining } from "~/lib/utils"
import { findPlanName, freePlan } from "~/sections/plan"

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

  return (
    <div class="container space-y-4">
      <Show when={planData()}>
        {presentPlan => <>

      <div class={cont}>
        <h3 class="text-xl font-bold">
          تعداد پیام باقی مانده: 
        </h3>
        <p class="text-left text-sm mb-1">
          {presentPlan().remainingMessages} از {calcMessageCount(presentPlan())}
        </p>
        <div class="h-1 w-full bg-muted rounded-lg overflow-hidden  ">
          <div class={`w-[${calcMessagePercent(presentPlan())}%] bg-primary h-full`}>
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
        <Button as={TA} href="/plans" class="mr-auto block w-max">
          مشاهده پلن ها
        </Button>
      </div>

      <div class={cont}>
        <h3 class="text-xl font-bold">
          تاریخ انقضا: 
        </h3>
        <p class="text-sm mt-2">
          {presentPlan().expirationDate.toLocaleString("fa", {day: "numeric", month: "numeric", year: "numeric"})}
          <br/>
          {daysRemaining(presentPlan().expirationDate).toLocaleString("fa")}
          روز باقی مانده
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
