import { For } from "solid-js"
import PlanCard from "~/components/plan/plan-card"
import { allPlans } from "~/sections/plan"

const plans = () => {
  return (
    <div class="container">
      <h1 class="text-3xl mb-10 mt-10 font-bold text-center">پلن ها</h1>

      <div class="grid grid-cols-3 gap-3 p-5">
        <For each={allPlans}>
          {p => <PlanCard plan={p}/>}
        </For>
      </div>
    </div>
  )
}

export default plans
