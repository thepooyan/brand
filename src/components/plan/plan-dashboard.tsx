import { PlanInstance, planTable } from "~/db/schema"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Accessor, createSignal, For, ParentProps, Show } from "solid-js"
import { allFeatures, doesPlanIncludeFeature, findPlanName, getPlan } from "~/sections/plan"
import { Button } from "../ui/button"
import { calcMessageCount, calcMessagePercent, cn, daysRemaining, safeDbTransaction } from "~/lib/utils"
import TA from "../parts/TA"
import { FiTrendingUp } from "solid-icons/fi"
import { AiFillWarning } from "solid-icons/ai"
import { Badge } from "../ui/badge"
import Check from "../ui/check"
import X from "../ui/x"
import { db } from "~/db/db"
import { eq } from "drizzle-orm"
import { useTransaction } from "~/lib/actionAbstraction"

interface p {
  plan: Accessor<PlanInstance>
}
const PlanDashboard = ({plan}:p) => {

  const days = () => {
    const p = plan()
    return daysRemaining(p.expirationDate)
  }
  const expired = () => days() <= 0
  const [loading, setLoading] = createSignal(false)
  
  const {callTransaction} = useTransaction()
  const handleClean = () => {
    const planId = plan().id
    callTransaction(
      cleanExpiredPlan(planId),
      {revalidate: "userPlan", loadingSignal: setLoading, noModal: true}
    )
  }

  return (
    <div class="flex justify-center items-center w-lg">
    <Card class={cn("m-auto", loading() && "opacity-30 pointer-events-none")}>
      <CardHeader class="relative">
        <CardTitle>
          {expired() ?
            <div class="text-muted-foreground flex gap-2">
                <AiFillWarning class="text-orange-500"/>
              پلن منقضی شده
            </div>
            :
            <>پلن فعال</>
          }
        </CardTitle>
        <CardDescription>{findPlanName(plan())}</CardDescription>
        <Show when={expired()}>
          <Button
            class="absolute left-5" variant="secondary"
            onclick={handleClean}
          >
            پاک کردن
            <X/>
          </Button>
        </Show>
        <Show when={!expired()}>
          <Button
            as={TA} href="/pricing" class="absolute left-5"
            variant="secondary"
          >
            ارتقا پلن
            <FiTrendingUp class="text-green-500"/>
          </Button>
        </Show>
      </CardHeader>
      <CardContent class="">
        <div class="grid grid-cols-2 mb-10 mt-5">

          <div>
            <Title>مشخصات:</Title>
            <Text>
              تعداد ربات: {getPlan(plan()).botCount} عدد
            </Text>
            <Text>
                پایگاه دانش: {getPlan(plan()).knowledgeBase}
            </Text>
          </div>


          <div>
            <Title>
              تاریخ انقضا: 
            </Title>
            <Text>
              {plan().expirationDate.toLocaleString("fa", {day: "numeric", month: "numeric", year: "numeric"}) || "نامحدود"}
              <br/>
              <Show when={days()}>
                {s => s() > 0 ? `${s()} روز باقی مانده` : `تاریخ انقضا شما سپری شده` }
              </Show>
            </Text>
          </div>

          <div class="flex flex-wrap gap-1 col-span-2 mt-5">
            <For each={allFeatures}>
              {f => <Badge class="flex gap-1 font-normal" variant="secondary"
                >
                  {doesPlanIncludeFeature(plan().plan_id, f) ? <Check/> : <X/>}
                  {f}
                </Badge>
              }
            </For>
          </div>
            
        </div>

        <div class={cn(expired() && "opacity-30")}>
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

const cleanExpiredPlan = (planId: number) => {
  "use server"
  return safeDbTransaction(
    db.delete(planTable).where(eq(planTable.id, planId))
  )
}

export default PlanDashboard
