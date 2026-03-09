import { allFeatures, countingFeatures, plan } from "~/sections/plan"
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
        <CardDescription>{plan.expirationMounth} ماهه</CardDescription>
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
        <br/>
        <p>
          تعداد پیام: {plan.messageCount}
        </p>
        <p>
          تعداد ربات: {plan.botCount}
        </p>
      </CardContent>
      <CardFooter class=" items-start justify-end flex-col gap-2 mt-auto">
        <p>
          قیمت: {plan.price},000 تومان
        </p>
        <Button class="text-center w-full">همین حالا بخرید!</Button>
      </CardFooter>
    </Card>
  )
}

export default PlanCard
