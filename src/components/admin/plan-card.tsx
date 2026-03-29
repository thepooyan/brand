import { PlanInstance } from "~/db/schema"
import { Muted } from "../prose/prose-item"

interface p {
  plan: Partial<PlanInstance>
}
const PlanCard = ({plan}:p) => {
  return (
    <div class="bg-muted rounded-lg p-2 flex justify-between px-4">
      <p>
        <Muted>نوع:</Muted> {plan.plan_id}
      </p>
      <p>
        <Muted>پیام باقی مانده:</Muted>  {plan.remainingMessages}
      </p>
      <p>
        <Muted>خرید:</Muted> {plan.boughtDate?.toLocaleDateString("fa-IR")}
      </p>
      <p>
        <Muted>انقضا:</Muted> {plan.expirationDate?.toLocaleDateString("fa-IR")}
      </p>
    </div>
  )
}

export default PlanCard
