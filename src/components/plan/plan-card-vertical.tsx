import { allFeatures, PlanDefinition } from "~/sections/plan"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { For, Show } from "solid-js"
import { Button } from "../ui/button"
import { FiCheck, FiX } from "solid-icons/fi"
import { cn, seprateByComma } from "~/lib/utils"
import { selectedMounth, selectedPlan, setSelectedPlan } from "./plan-signal"

interface p {
  plan: PlanDefinition
  vertical?: boolean
}
const PlanCard = ({plan, vertical}:p) => {

  const handleClick = async () => {
    setSelectedPlan(plan)
  }

  return (
    <Card class={cn(vertical && "col-span-full flex ")}>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{selectedMounth().toLocaleString("fa-IR")} ماهه</CardDescription>
      </CardHeader>
      <CardContent class={cn(vertical && "pt-8 flex flex-col h-40 flex-wrap gap-x-4")}>
        <For each={allFeatures}>
          {f => <p class="flex gap-2">
            {
              plan.features.includes(f)
              &&
              <Yes/>
              ||
              <No/>
            }
            {f}
          </p>}
        </For>
        <br/>
        <p class="flex justify-between">
          <span>تعداد پیام:</span>
          <span>{seprateByComma(plan.messageCount)} عدد</span>
        </p>
        <p class="flex justify-between">
          <span>تعداد ربات:</span>
          <span>{seprateByComma(plan.botCount)} عدد</span>
        </p>
      </CardContent>
      <CardFooter class={cn(
        "items-start justify-end flex-col gap-2 mt-auto",
        vertical && "mr-auto w-60"
      )}>
        <p>
          قیمت: <Show when={plan.mounthlyPrice === 0}>
            رایگان
          </Show>
          <Show when={plan.mounthlyPrice !== 0}>
            {seprateByComma(plan.mounthlyPrice * 1000 * selectedMounth())} تومان
          </Show>
        </p>
        
        <Show when={selectedPlan()?.id !== plan.id}
          fallback={<Button class="w-full bg-success text-success-foreground hover:bg-success/80">انتخاب شده</Button>}
        >
          <Button class="text-center w-full"
            disabled={plan.mounthlyPrice === 0}
            onclick={handleClick}
          >انتخاب</Button>
        </Show>
      </CardFooter>
    </Card>
  )
}

const Yes = () => <FiCheck class="text-green-500"/>
const No = () => <FiX class="text-destructive"/>

export default PlanCard
