import { PlanInstance } from "~/db/schema"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Accessor, ParentProps, Show } from "solid-js"
import { doesPlanIncludeFeature, findPlanName, getPlan, planFeatures } from "~/sections/plan"
import { Button } from "../ui/button"
import { calcMessageCount, calcMessagePercent, daysRemaining } from "~/lib/utils"
import TA from "../parts/TA"
import { FiCheck, FiTrendingUp, FiX } from "solid-icons/fi"

interface p {
  plan: Accessor<PlanInstance>
}
const PlanDashboard = ({plan}:p) => {

  const days = () => {
    const p = plan()
    if (!p || !p.expirationDate) return null

    return daysRemaining(p.expirationDate)
  }

  return (
    <div class="flex justify-center items-center">
    <Card class="w-xl m-auto">
      <CardHeader class="relative">
        <CardTitle>پلن فعال</CardTitle>
        <CardDescription>{findPlanName(plan())}</CardDescription>
        <Button
          as={TA} href="/pricing" class="absolute left-5"
          variant="secondary"
        >
          ارتقا پلن
          <FiTrendingUp class="text-green-500"/>
        </Button>
      </CardHeader>
      <CardContent class="">
        <div class="grid grid-cols-2 mb-10 mt-5">

          <div>
            <Title>مشخصات:</Title>
            <Text>
              تعداد ربات: {getPlan(plan()).botCount} عدد
            </Text>
            <Text>
              اتصال به تلگرام: 
              {doesPlanIncludeFeature(plan().plan_id, planFeatures.telegram) ? <>بله <FiCheck class="text-green-500"/></> : <>خیر <FiX class="text-destructive"/></>}
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
    </div>
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
