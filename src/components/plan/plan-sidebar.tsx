import { convertPlanToDTO, PlanDefinition } from "~/sections/plan"
import { eq } from "drizzle-orm"
import { db } from "~/db/db"
import { planTable } from "~/db/schema"
import { Transaction, transactionFail, transactionRedirect, useTransaction } from "~/lib/actionAbstraction"
import { getAuthSession } from "~/lib/session"
import { cn, safeDbTransaction, seprateByComma } from "~/lib/utils"
import { Button } from "../ui/button";
import { createSignal,  } from "solid-js";
import { selectedMounth, selectedPlan, setSelectedPlan } from "./plan-signal"
import { Title } from "../prose/prose-item"

const activatePlan = async (p: PlanDefinition, mounth: number):Transaction => {
  "use server"
  const user = await getAuthSession()

  if (!user) return transactionRedirect("/Login", true)

  return await db.transaction(async tx => {

    const dbUser = await tx.query.usersTable.findFirst({
      where: (tbl => eq(tbl.id, user.id)),
      with: {current_plans: true}
    })

    if (!dbUser) return transactionFail("کاربر یافت نشد!")

    return safeDbTransaction(
     tx.insert(planTable).values(convertPlanToDTO(p, dbUser.id, mounth))
    )
  })
}

const PlanSidebar = () => {

  const [loading , setLoading] = createSignal(false)
  const {callTransaction} = useTransaction()

  const handleClick = async () => {
    const s = selectedPlan()
    if (!s) return
    setLoading(true)
    await callTransaction(
      activatePlan(s, selectedMounth())
    )
    // activatePlan(s, selectedMounth() )
    //   .then((res) => {
    //     if (res.redirect) return nv(res.redirect)
    //     if (res.ok) {
    //       callModal.success("با موفقیت انجام شد!")
    //       nv("/Panel")
    //     } else {
    //       callModal.fail(res.msg)
    //     }
    //   })
    //   .catch(e => {
    //     callModal.fail(e)
    // })
    // .finally(() => {
    //     setLoading(false)
    //   })

  }

  const price = () => {
    const s = selectedPlan()
    const m = selectedMounth()
    if (s) return (s.mounthlyPrice * 1000 * m)
    return 0
  }
  const tax = () => price() / 10
  const total = () => tax() + price()

  return (
    <div
      class={cn(`w-full h-30 bg-sidebar text-sidebar-foreground fixed bottom-0 right-0 p-10 flex justify-between container mx-auto left-0
rounded-md items-center transition-all opacity-100 z-10`,
        selectedPlan() === null && `opacity-0 -bottom-30`
      )}
    >
      <div>
        <div>
          قیمت پلن: {seprateByComma(price())} تومان
          <br />
          مالیات بر ارزش افزوده: {seprateByComma(tax())} تومان
        </div>
        <Title class="mt-2">قیمت کل: {seprateByComma(total())} تومان</Title>
      </div>
      <div class="flex flex-col gap-2">
      <Button
        loading={loading()}
        onclick={handleClick}
        size="sm"
      >پرداخت و فعال‌سازی</Button>
      <Button
        variant="secondary"
        onclick={() => setSelectedPlan(null)}
        size="sm"
      >
        کنسل
      </Button>
      </div>
    </div>
  );
};

export default PlanSidebar;
