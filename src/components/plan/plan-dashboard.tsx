import { DB_Plan } from "~/db/schema"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Accessor, ParentProps, Show } from "solid-js"
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
    <Card class="w-xl m-auto">
      <CardHeader class="relative">
        <CardTitle>پلن فعلی شما</CardTitle>
        <CardDescription>{findPlanName(plan())}</CardDescription>
        <Button
          as={TA} href="/pricing" class="absolute left-5"
        >
          ارتقا پلن
        </Button>
      </CardHeader>
      <CardContent class="">
        <div class="grid grid-cols-2 mb-10 mt-5">

          <div>
            <Title>مشخصات:</Title>
            <Text>
              تعداد ربات: {plan().botCount} عدد
            </Text>
            <Text>
              اتصال به تلگرام: 
              {doesPlanHaveTelegram(plan().plan_id) ? <>بله <FiCheck class="text-green-500"/></> : <>خیر <FiX class="text-destructive"/></>}
            </Text>
          </div>

          <div>
            <Title>
              تاریخ انقضا: 
            </Title>
            <Text>
              {plan().expirationDate?.toLocaleString("fa", {day: "numeric", month: "numeric", year: "numeric"}) || "نامحدود"}
              <br/>
              <Show when={days()}>
                {s => s() > 0 ? `${s()} روز باقی مانده` : `تاریخ انقضا شما سپری شده` }
              </Show>
            </Text>
          </div>

        </div>

        <div>
          <Title>
            تعداد پیام باقی مانده: 
          </Title>
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

      </CardContent>
    </Card>
  )
}

const Title = ({children}:ParentProps) => <h3
  class="font-bold text-lg"
>
  {children}
</h3>

const Text = ({children}:ParentProps) => <p
  class="text-muted-foreground flex items-center gap-1"
>
  {children}
</p>

export default PlanDashboard
