import { createAsync, query } from "@solidjs/router"
import { createEffect, Show } from "solid-js"
import WebsiteOrdersMapper from "~/components/admin/orders/website-orders"
import { callModal } from "~/components/layout/Modal"
import LoadingSuspense from "~/components/pages/LoadingSuspense"
import { db } from "~/db/db"
import { safeDb } from "~/lib/utils"

const queryOrders = query(async () => {
  "use server"
  return safeDb(
    db.query.websiteOrdersTable.findMany()
  )
}, "admin-website-orders")

const WebsiteOrders = () => {

  const orders = createAsync(() => queryOrders())

  createEffect(() => {
    if (orders()?.ok === false) callModal.fail(orders()?.msg)
  })

  return (
    <div>
      <LoadingSuspense>
        <Show when={orders()?.data}>
          {d => <WebsiteOrdersMapper orders={d} />}
        </Show>
      </LoadingSuspense>
    </div>
  )
}

export default WebsiteOrders
