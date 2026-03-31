import { createSignal, For } from "solid-js"
import GenerallSelect from "~/components/parts/generall-select"
import PlanCard from "~/components/plan/plan-card"
import { Muted } from "~/components/prose/prose-item"
import { allPlans } from "~/sections/plan"

const plans = () => {

  const [mounth, setMounth] = createSignal(1)

  return (
    <div class="container">
      <h1 class="text-3xl mb-10 mt-10 font-bold text-center">پلن ها</h1>

      <div class="flex gap-2 items-center">
        <Muted>
          انتخاب مدت دوره:
        </Muted>
        <div class="w-50">
          <M initialValue={mounth()} onchange={e => setMounth(e)}/>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-3 p-5">
        <For each={allPlans}>
          {p => <PlanCard plan={p} mounth={mounth}/>}
        </For>
      </div>
    </div>
  )
}

const M = GenerallSelect([
  {label: "یک ماهه", value: 1},
  {label: "دو ماهه", value: 2},
  {label: "سه ماهه", value: 3},
])

export default plans
