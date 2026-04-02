import { createAsync, query } from "@solidjs/router"
import { createEffect,  } from "solid-js"
import WebsiteOrdersMapper from "~/components/admin/orders/website-orders"
import { callModal } from "~/components/layout/Modal"
import ShowSuspense from "~/components/parts/ShowSuspense"
import { db } from "~/db/db"
import { safeDb } from "~/lib/utils"

const queryOrders = query(async () => {
  "use server"
  return safeDb(
    db.query.websiteOrdersTable.findMany({
      orderBy: (tbl => tbl.createdAt)
    })
  )
}, "admin-website-orders")

const WebsiteOrders = () => {

  const orders = createAsync(() => queryOrders())

  createEffect(() => {
    if (orders()?.ok === false) callModal.fail(orders()?.msg)
  })

  return (
    <div>
      <ShowSuspense when={orders()?.data}>
        {d => <WebsiteOrdersMapper orders={d} />}
      </ShowSuspense>
    </div>
  )
}

export default WebsiteOrders
