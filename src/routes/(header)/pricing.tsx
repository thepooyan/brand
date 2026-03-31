import { For } from "solid-js"
import GenerallSelect from "~/components/parts/generall-select"
import PlanCard from "~/components/plan/plan-card"
import { allPlans } from "~/sections/plan"

const plans = () => {
  return (
    <div class="container">
      <h1 class="text-3xl mb-10 mt-10 font-bold text-center">پلن ها</h1>

      <M initialValue={1} onchange={e => console.log(e)}/>
      <div class="grid grid-cols-3 gap-3 p-5">
        <For each={allPlans}>
          {p => <PlanCard plan={p}/>}
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
