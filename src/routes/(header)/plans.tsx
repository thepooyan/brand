import { For } from "solid-js"
import PlanCard from "~/components/plan/plan-card"
import { allPlans } from "~/sections/plan"

const plans = () => {
  return (
    <div class="grid grid-cols-3 gap-3 p-5">
      <For each={allPlans}>
        {p => <PlanCard plan={p}/>}
      </For>

    </div>
  )
}

export default plans
