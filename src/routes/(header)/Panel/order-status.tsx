import { createAsync, query, redirect } from "@solidjs/router"
import { eq } from "drizzle-orm"
import ShowSuspense from "~/components/parts/ShowSuspense"
import TA from "~/components/parts/TA"
import { H2, H3, Muted } from "~/components/prose/prose-item"
import WebsiteOrderCard from "~/components/sections/order/website-order-card"
import { Button } from "~/components/ui/button"
import { db } from "~/db/db"
import { panelPageMarker } from "~/lib/routeChangeTransition"
import { getAuthSession } from "~/lib/session"
import { safeDb } from "~/lib/utils"

const queryOrders = query(async () => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/Panel/order-status")

  return safeDb(
    db.query.websiteOrdersTable.findMany({
      where: (tbl => eq(tbl.user_id, user.id))
    })
  )

}, "order-status")

const OrderStatus = () => {
  const orders = createAsync(() => queryOrders())
  return (
    <main {...panelPageMarker()}>
      <H2 class="mt-4">
        وضعیت سفارش
      </H2>
      <Muted class="mb-8">
        در صورت نیاز به پیگیری سریع تر، میتوانید با پشتیبانی تماس حاصل نمایید.
      </Muted>
      <ShowSuspense when={orders()?.data}>
        {d => <>
          {d().map(dd => <WebsiteOrderCard order={dd}/> )}
          {d().length === 0 && <div class="center gap-1 h-[calc(100dvh-20rem)]">
            <Muted>موردی یافت نشد...</Muted>
            <Button variant="secondary" size="sm" as={TA} href="/Place-Order/Website">ثبت سفارش وبسایت</Button>
          </div>}
        </>}
      </ShowSuspense>
    </main>
  )
}

export default OrderStatus
