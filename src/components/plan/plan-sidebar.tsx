import { convertPlanToDTO, PlanDefinition, planDiscountMap } from "~/sections/plan"
import { eq } from "drizzle-orm"
import { db } from "~/db/db"
import { planTable } from "~/db/schema"
import { Transaction, transactionFail, transactionRedirect, useTransaction } from "~/lib/actionAbstraction"
import { getAuthSession } from "~/lib/session"
import { cn, safeDbTransaction, seprateByComma } from "~/lib/utils"
import { Button } from "../ui/button";
import { createSignal, Show,  } from "solid-js";
import { selectedMounth, selectedPlan, setSelectedPlan } from "./plan-signal"
import { Muted } from "../prose/prose-item"
import MounthSelectDropdown from "./mounth-select-dropdown"

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
  const { callTransaction } = useTransaction()

  const handleClick = async () => {
    
    const s = selectedPlan()
    if (!s) return

    callTransaction(
      activatePlan(s, selectedMounth()),
      {
        navigate: "/Panel/dashboard",
        loadingSignal: setLoading,
      }
    )
  }

  const price = () => {
    const s = selectedPlan()
    if (s) return (s.mounthlyPrice * 1000)
    return 0
  }
  const discount = () => planDiscountMap.get(selectedMounth())

  // const tax = () => price() / 10
  // const total = () => tax() + price()
  const mounthly = () => price() * selectedMounth()

  const total = () => {
    let d = discount()
    let m = mounthly()
    if (!d) return m
    return m - (m * d / 100)
  }

  return (
    <div
      class={cn(`w-full h-30 bg-sidebar text-sidebar-foreground fixed bottom-0 right-0 p-10 flex justify-between container mx-auto left-0
rounded-md items-center transition-all opacity-100 z-10`,
        selectedPlan() === null && `opacity-0 -bottom-30`
      )}
    >
      <div>
        <div class="grid grid-cols-2 gap-x-5 gap-1">
          <Muted class="inline-block">
            قیمت ماهیانه:
          </Muted> 
          <Muted>
            {seprateByComma(price())} تومان
          </Muted>
          <Muted>
            مدت:
          </Muted> 
          <Muted>
            {selectedMounth().toLocaleString("fa-IR")} ماه
          </Muted>
          <Muted>
            تخفیف:
          </Muted>
          <Muted>
            <Show when={discount()} fallback="ندارد">
              {d => `${d().toLocaleString("fa-IR")} درصد`}
            </Show>
          </Muted>

          <span>قابل پرداخت:</span> {seprateByComma(total())} تومان
        </div>
      </div>
      <div class="w-50 space-y-2">
        <Muted>
          تغییر مدت دوره:
        </Muted>
        <MounthSelectDropdown/>
      </div>
      <div class="flex flex-col gap-2 w-35">
      <Button
        loading={loading()}
        onclick={handleClick}
        class="bg-success text-success-foreground"
      >پرداخت</Button>
      <Button
        variant="secondary"
        onclick={() => setSelectedPlan(null)}
      >
        کنسل
      </Button>
      </div>
    </div>
  );
};

export default PlanSidebar;
