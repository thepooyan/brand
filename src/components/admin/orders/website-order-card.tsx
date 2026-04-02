import { revalidate } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { createSignal } from "solid-js"
import GenerallSelect from "~/components/parts/generall-select"
import { Muted } from "~/components/prose/prose-item"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { order_status } from "~/db/constants"
import { db } from "~/db/db"
import { WebsiteOrder, websiteOrdersTable } from "~/db/schema"
import { useTransaction } from "~/lib/actionAbstraction"
import { safeDbTransaction } from "~/lib/utils"

const updateStatus = async (id:number, newStatus: order_status) => {
  "use server"
  return safeDbTransaction(
    db.update(websiteOrdersTable).set({status: newStatus}).where(
      eq(websiteOrdersTable.id, id)
    )
  )
}

interface p {
  order: WebsiteOrder
}
const WebsiteOrderCard = ({order}:p) => {

  const [status, setStatus] = createSignal(order.status)
  const {callTransaction} = useTransaction()

  const submitStatus = async () => {
    (await callTransaction(
      updateStatus(order.id, status()),
      {revalidate: "admin-website-orders"}
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{order.phone}</CardTitle>
        <CardDescription>{order.name} | {order.email}</CardDescription>
      </CardHeader>
      <CardContent class="grid grid-cols-5 gap-2">
        <p>
          <Muted>بودجه: </Muted>
          {order.budget}
        </p>
        <p>
          <Muted>تعداد صفحه:</Muted>
          {order.pageCount}
        </p>
        <p>
          <Muted>زمان درخواستی:</Muted>
          {order.timeline}
        </p>
        <p>
          <Muted>مطالب آماده است:</Muted>
          {order.contentReady}
        </p>
        <p>
          <Muted>نوع وبسایت:</Muted>
          {order.websiteType}
        </p>
        <p>
          <Muted>سایت فروشگاهی:</Muted>
          {order.isMarketplace}
        </p>
        <p class="col-span-3">
          <Muted>قابلیت‌ها:</Muted>
          {order.features}
        </p>
        <p class="col-span-3">
          <Muted>توضیحات:</Muted>
          {order.description}
        </p>
      </CardContent>
      <CardFooter class="flex justify-between">
        <p>
          <Muted>وضعیت: </Muted> {order.status}
        </p>
        <div class="space-y-2">
          <Muted>تغییر وضعیت:</Muted>
          <div class="flex gap-2">
            <M initialValue={status()} onchange={e => setStatus(e)} class="w-30"/>
            <Button onclick={submitStatus}>
              ثبت وضعیت
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
const M = GenerallSelect([
  ...order_status.map(s => ({label: s, value: s})),
])

export default WebsiteOrderCard
