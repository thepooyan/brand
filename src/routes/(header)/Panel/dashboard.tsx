import { createAsync, query, redirect } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { For, Show } from "solid-js"
import PlanDashboard from "~/components/plan/plan-dashboard"
import { db } from "~/db/db"
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
    <Show when={planData()}>
      {presentPlan => <For each={presentPlan()}>
        {i => <PlanDashboard plan={() => i}/>}
        </For>
      }
    </Show>
  )
}

export default dashboard
