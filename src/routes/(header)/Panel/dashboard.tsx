import { createAsync, query, redirect } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { TbOutlineMoodSad } from "solid-icons/tb"
import { For, Show } from "solid-js"
import TA from "~/components/parts/TA"
import PlanDashboard from "~/components/plan/plan-dashboard"
import { Button } from "~/components/ui/button"
import { db } from "~/db/db"
import { panelPageMarker } from "~/lib/routeChangeTransition"
import { clearAuthSession, getAuthSession } from "~/lib/session"

const queryUserPlan = query(async() => {
  "use server"
  let user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/Panel/dashboard")

  const dbUser = await db.query.usersTable.findFirst({
    where: (tbl => eq(tbl.id, user.id)),
    with: {current_plans: true}
  })

  if (!dbUser) {
    clearAuthSession()
    throw redirect("/Login?back=/Panel/dashboard")
  }

  return dbUser.current_plans
}, "userPlan")

const dashboard = () => {

  const planData = createAsync(() => queryUserPlan())

  return (
    <div {...panelPageMarker()} class="h-full">
      <Show when={planData()?.length === 0}>
        <div class="center h-full gap-1 text-muted-foreground">
          <TbOutlineMoodSad size={40}/>
          شما پلن فعالی ندارید...
          <Button class="mt-2" as={TA} href="/pricing">
            همین حالا بخرید!
          </Button>
        </div>
      </Show>
      <Show when={planData()}>
        {presentPlan => <div class="grid grid-cols-2 gap-4 w-max m-auto">
          <For each={presentPlan()}>
            {i => <PlanDashboard plan={() => i}/>}
          </For>
        
        </div>}
      </Show>
    </div>
  )
}

export default dashboard
