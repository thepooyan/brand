import { allPlans, } from "~/sections/plan"
import { For } from "solid-js"
import GenerallSelect from "~/components/parts/generall-select"
import PlanCard from "~/components/plan/plan-card"
import PlanSidebar from "~/components/plan/plan-sidebar"
import { H3, Muted } from "~/components/prose/prose-item"
import { selectedMounth, setSelectedMounth } from "~/components/plan/plan-signal"


const plans = () => {
  return (
    <div class="container">
      <h1 class="text-3xl mb-10 mt-10 font-bold text-center">قیمت‌ها</h1>

      <div class="flex justify-between">
        <H3>چت‌بات هوش مصنوعی:</H3>
        <div class="flex gap-2 items-center">
          <Muted>
            انتخاب مدت دوره:
          </Muted>
          <div class="w-50">
            <M initialValue={selectedMounth()} onchange={e => setSelectedMounth(e)}/>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-3 p-5">
        <For each={allPlans}>
          {p => <PlanCard plan={p}/>}
        </For>
      </div>
      <PlanSidebar/>
    </div>
  )
}

const M = GenerallSelect([
  {label: "یک ماهه", value: 1},
  {label: "دو ماهه", value: 2},
  {label: "سه ماهه", value: 3},
])

export default plans
