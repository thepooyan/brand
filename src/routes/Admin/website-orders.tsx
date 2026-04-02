import { createAsync, query } from "@solidjs/router"
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

  return (
    <div>
      {JSON.stringify(orders())}
    </div>
  )
}

export default WebsiteOrders
