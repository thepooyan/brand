import { allFeatures, PlanDefinition } from "~/sections/plan"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { For } from "solid-js"
import { FiCheck, FiX } from "solid-icons/fi"
import { cn, seprateByComma } from "~/lib/utils"
import { selectedMounth } from "./plan-signal"

interface p {
  plan: PlanDefinition
}
const PlanCardVertical = ({plan}:p) => {

  return (
    <Card class={cn("col-span-full flex justify-between")}>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{selectedMounth().toLocaleString("fa-IR")} ماهه</CardDescription>

        <div class="text-muted-foreground mt-auto text-sm">
          <p class="flex justify-between gap-4">
            <span>تعداد پیام:</span>
            <span>{seprateByComma(plan.messageCount)} عدد</span>
          </p>
          <p class="flex justify-between gap-4">
            <span>تعداد ربات:</span>
            <span>{seprateByComma(plan.botCount)} عدد</span>
          </p>
        </div>
      
      </CardHeader>
      <CardContent class="pt-8 flex flex-col h-35 flex-wrap gap-x-4 w-7/10">
        <For each={allFeatures}>
          {f => <p class="flex gap-2 items-center">
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
      </CardContent>
    </Card>
  )
}

const Yes = () => <FiCheck class="text-green-500"/>
const No = () => <FiX class="text-destructive"/>

export default PlanCardVertical
