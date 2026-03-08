import { allFeatures, plan } from "~/sections/plan"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { For, Show } from "solid-js"
import { Button } from "../ui/button"
import { FiCheck, FiX } from "solid-icons/fi"

interface p {
  plan: plan
}
const PlanCard = ({plan}:p) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <Show when={plan.expiration}>
          <CardDescription>{plan.expiration} ماهه</CardDescription>
        </Show>
        <Show when={!plan.expiration}>
          <CardDescription>مدت نامحدود</CardDescription>
        </Show>
      </CardHeader>
      <CardContent>
        <For each={allFeatures}>
          {f => <p class="flex gap-2">
            {
              plan.features.includes(f)
              &&
              <FiCheck class="text-green-500"/>
              ||
              <FiX class="text-destructive"/>
            }
            {f}
          </p>}
        </For>
      </CardContent>
      <CardFooter class=" items-start justify-end flex-col gap-2 mt-auto">
        <div class=" font-semibold text-md text-secondary  ">
          قیمت: 
          {plan.price === "free" ? "رایگان" : `${plan.price},000 تومان`}
        </div>
        <Button class="text-center w-full">همین حالا بخرید!</Button>
      </CardFooter>
    </Card>
  )
}

export default PlanCard
