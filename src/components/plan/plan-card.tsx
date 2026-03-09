import { allFeatures, convertPlanToDTO, plan } from "~/sections/plan"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { For } from "solid-js"
import { Button } from "../ui/button"
import { FiCheck, FiX } from "solid-icons/fi"
import { seprateByComma } from "~/lib/utils"
import { getAuthSession } from "~/lib/session"
import { db } from "~/db/db"
import { planTable, usersTable } from "~/db/schema"
import { eq } from "drizzle-orm"

interface p {
  plan: plan
}

const activatePlan = async (p: plan) => {
  "use server"
  const user = await getAuthSession()

  if (!user) return

  await db.transaction(async tx => {

    const dbUser = await tx.query.usersTable.findFirst({
      where: (tbl => eq(tbl.id, user.id)),
      with: {current_plan: true}
    })

    if (!dbUser) throw new Error(`No such user was found.`)

    if (!dbUser.current_plan) {
      //new plan
      const [newPlan] = await tx.insert(planTable).values(convertPlanToDTO(p)).returning()
      await tx.update(usersTable).set({current_plan_id: newPlan.id}).where(eq(usersTable.id, dbUser.id))

    } else {
      //update plan
      await tx.update(planTable)
      .set(convertPlanToDTO(p, dbUser.current_plan.remainingMessages))
      .where(
        eq(
          planTable.id,
          dbUser.current_plan.id
        ))

    }
  })
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
        <p class="flex justify-between">
          <span>تعداد پیام:</span>
          <span>{seprateByComma(plan.messageCount)} عدد</span>
        </p>
        <p class="flex justify-between">
          <span>تعداد ربات:</span>
          <span>{seprateByComma(plan.botCount)} عدد</span>
        </p>
        <p class="flex justify-between">
          <span>پایگاه دانش:</span>
          <span>{seprateByComma(plan.knowledgeBase)} کلمه</span>
        </p>
      </CardContent>
      <CardFooter class=" items-start justify-end flex-col gap-2 mt-auto">
        <p>
          قیمت: {seprateByComma(plan.price * 1000)} تومان
        </p>
        <Button class="text-center w-full"
          onclick={() => activatePlan(plan)}
        >همین حالا بخرید!</Button>
      </CardFooter>
    </Card>
  )
}

export default PlanCard
