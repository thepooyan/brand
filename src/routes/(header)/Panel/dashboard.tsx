import { createAsync, query, redirect } from "@solidjs/router"
import { eq } from "drizzle-orm"
import TA from "~/components/parts/TA"
import { Button } from "~/components/ui/button"
import { db } from "~/db/db"
import { clearAuthSession, getAuthSession } from "~/lib/session"

const queryUserPlan = query(async() => {
  "use server"
  let user = await getAuthSession()
  if (!user) throw redirect("/Login")

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
      {JSON.stringify(planData())}

      <div class={cont}>
        <h3 class="text-xl font-bold">
          تعداد پیام باقی مانده: 
        </h3>
        <p class="text-left text-sm mb-1">
          ۲۰ از ۱۰۰
        </p>
        <div class="h-1 w-full bg-muted rounded-lg overflow-hidden  ">
          <div class="w-[20%] bg-primary h-full">
          </div>
        </div>
      </div>

      <div class={cont}>
        <h3 class="text-xl font-bold">
          پلن فعلی شما: 
        </h3>
        <p class="text-sm mt-1">
          پلن رایگان 
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
          10/2/1402
          <br/>
          ۲۳ روز باقی مانده
        </p>
        <Button class="mr-auto block w-max">
          تمدید پلن
        </Button>
      </div>
    </div>
  )
}

export default dashboard
