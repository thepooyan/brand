import { allFeatures, convertPlanToDTO, PlanDefinition } from "~/sections/plan"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { createSignal, For } from "solid-js"
import { Button } from "../ui/button"
import { FiCheck, FiX } from "solid-icons/fi"
import { seprateByComma } from "~/lib/utils"
import { getAuthSession } from "~/lib/session"
import { db } from "~/db/db"
import { planTable } from "~/db/schema"
import { eq } from "drizzle-orm"
import { callModal } from "../layout/Modal"
import { useNavigate } from "@solidjs/router"
import { ApiResponse } from "~/lib/actionAbstraction"

interface p {
  plan: PlanDefinition
}

const activatePlan = async (p: PlanDefinition):Promise<ApiResponse> => {
  "use server"
  const user = await getAuthSession()

  if (!user) return {ok: false, msg: "کاربر یافت نشد", status: 404}

  let result:ApiResponse = {ok: true}

  await db.transaction(async tx => {

    const dbUser = await tx.query.usersTable.findFirst({
      where: (tbl => eq(tbl.id, user.id)),
      with: {current_plans: true}
    })

    if (!dbUser) return result = {ok: false, msg: "کاربر یافت نشد", status: 404}

    await tx.insert(planTable).values(convertPlanToDTO(p, dbUser.id))

  })
  return result
}

const PlanCard = ({plan}:p) => {

  const [loading, setLoading] = createSignal(false)
  const nv = useNavigate()

  const handleClick = async () => {
    setLoading(true)
    activatePlan(plan)
      .then((res) => {
        if (res.ok) {
          callModal.success("با موفقیت انجام شد!")
          nv("/Panel")
        } else if (res.status === 404){
          nv("/Login?back=/pricing")
        } else {
          callModal.fail(res.msg)
        }
      })
      .catch(e => {
        callModal.fail("خطایی رخ داد. لطفا مجددا تلاش کنید.")
        console.log(e)
    })
    .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>۱ ماهه</CardDescription>
      </CardHeader>
      <CardContent>
        <For each={allFeatures}>
          {f => <p class="flex gap-2">
            {
              plan.features.includes(f)
              &&
              <Yes/>
              ||
              <No/>
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
          قیمت: {seprateByComma(plan.mounthlyPrice * 1000)} تومان
        </p>
        <Button class="text-center w-full"
          onclick={handleClick}
          loading={loading}
        >همین حالا بخرید!</Button>
      </CardFooter>
    </Card>
  )
}

const Yes = () => <FiCheck class="text-green-500"/>
const No = () => <FiX class="text-destructive"/>

export default PlanCard
