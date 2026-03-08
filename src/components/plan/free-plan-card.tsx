import { allFeatures, countingFeatures } from "~/sections/plan"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { For } from "solid-js"
import { Button } from "../ui/button"
import { FiX } from "solid-icons/fi"

const FreePlanCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>پلن رایگان</CardTitle>
        <CardDescription>زمان نامحدود</CardDescription>
      </CardHeader>
      <CardContent>
        <For each={allFeatures}>
          {f => <p class="flex gap-2">
            <FiX class="text-destructive"/>
            {f}
          </p>}
        </For>
        <br/>
        <For each={countingFeatures}>
          {f => <div class="flex justify-between">
            <span>{f}:</span>
            <FiX class="text-destructive"/>
          </div>}
        </For>
      </CardContent>
      <CardFooter class=" items-start justify-end flex-col gap-2 mt-auto">
        <p>
          قیمت: رایگان
        </p>
        <Button class="text-center w-full" disabled>همین حالا بخرید!</Button>
      </CardFooter>
    </Card>
  )
}

export default FreePlanCard
