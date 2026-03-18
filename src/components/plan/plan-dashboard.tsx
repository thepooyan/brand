import { DB_Plan } from "~/db/schema"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Accessor, Show } from "solid-js"
import { doesPlanHaveTelegram, findPlanName } from "~/sections/plan"
import { Button } from "../ui/button"
import { calcMessageCount, calcMessagePercent, daysRemaining } from "~/lib/utils"
import TA from "../parts/TA"
import { FiCheck, FiX } from "solid-icons/fi"

interface p {
  plan: Accessor<DB_Plan>
}
const PlanDashboard = ({plan}:p) => {

  const days = () => {
    const p = plan()
    if (!p || !p.expirationDate) return null

    return daysRemaining(p.expirationDate)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>پلن فعلی شما</CardTitle>
        <CardDescription>{findPlanName(plan())}</CardDescription>
      </CardHeader>
      <CardContent class="grid grid-cols-2 gap-10">
        <div>

          <h3 class="text-lg font-bold">
            تعداد پیام باقی مانده: 
          </h3>
          <div class="mb-5">
            <p class="text-left text-sm mb-1">
              {plan().remainingMessages} از {calcMessageCount(plan())}
            </p>
            <div class="h-1 w-full bg-muted rounded-lg overflow-hidden  ">
              <div class={`bg-primary h-full`}
                style={{width: calcMessagePercent(plan()) + "%"}}>
              </div>
            </div>
          </div>
        </div>
        <div class="tex">
          <p class="">
            تعداد ربات: {plan().botCount} عدد
          </p>
          <p class="flex items-center gap-1">
            اتصال به تلگرام: 
            {doesPlanHaveTelegram(plan().plan_id) ? <>بله <FiCheck class="text-green-500"/></> : <>خیر <FiX class="text-destructive"/></>}
          </p>
        </div>
        <div>
          <h3 class="text-lg font-bold">
            تاریخ انقضا: 
          </h3>
          <p class="text-sm mt-2">
            {plan().expirationDate?.toLocaleString("fa", {day: "numeric", month: "numeric", year: "numeric"}) || "نامحدود"}
            <br/>
            <Show when={days()}>
              {s => s() > 0 ? `${s()} روز باقی مانده` : `تاریخ انقضا شما سپری شده` }
            </Show>
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          as={TA} href="/pricing"
        >ارتقا پلن</Button>
      </CardFooter>
    </Card>
  )
}

export default PlanDashboard
