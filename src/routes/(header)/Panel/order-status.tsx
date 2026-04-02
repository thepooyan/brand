import { createAsync, query, redirect } from "@solidjs/router"
import { eq } from "drizzle-orm"
import WebsiteOrderCard from "~/components/admin/orders/website-order-card"
import ShowSuspense from "~/components/parts/ShowSuspense"
import { Title } from "~/components/prose/prose-item"
import { db } from "~/db/db"
import { panelPageMarker } from "~/lib/routeChangeTransition"
import { getAuthSession } from "~/lib/session"
import { safeDb } from "~/lib/utils"

const queryOrders = query(async () => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/Panel/order-status")

  return safeDb(
    db.query.websiteOrdersTable.findFirst({
      where: (tbl => eq(tbl.user_id, user.id))
    })
  )

}, "order-status")

const OrderStatus = () => {
  const orders = createAsync(() => queryOrders())
  return (
    <main {...panelPageMarker()}>
      <Title class="mb-4">وضعیت سفارش:</Title>
      <ShowSuspense when={orders()?.data}>
        {d => <WebsiteOrderCard order={d()}/> }
      </ShowSuspense>
    </main>
  )
}

export default OrderStatus
