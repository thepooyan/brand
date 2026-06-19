import { allPlans, freePlan, } from "~/sections/plan"
import { For } from "solid-js"
import PlanCard from "~/components/plan/plan-card"
import PlanSidebar from "~/components/plan/plan-sidebar"
import { H3 } from "~/components/prose/prose-item"
import PlanCardVertical from "~/components/plan/plan-card-vertical"

const plans = () => {
  return (
    <div class="container">
      <h1 class="text-3xl mb-10 mt-10 font-bold text-center">قیمت‌ها</h1>

      <div class="flex justify-between">
        <H3>چت‌بات هوش مصنوعی:</H3>

        {/*<div class="flex gap-2 items-center">
          <Muted>
            انتخاب مدت دوره:
          </Muted>
          <div class="w-50">
            <MounthSelectDropdown/>
          </div>
        </div>*/}

      </div>
      <div class="grid grid-cols-3 gap-3 p-5">
        <PlanCardVertical plan={freePlan}/>
        <For each={allPlans}>
          {p => <PlanCard plan={p} vertical={p.id === "free"}/>}
        </For>
      </div>
      <PlanSidebar/>
    </div>
  )
}

export default plans
