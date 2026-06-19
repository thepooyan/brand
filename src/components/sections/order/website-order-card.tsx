import { ParentProps } from "solid-js"
import { FiCode, FiLoader, FiPhone } from "solid-icons/fi";
import { Badge } from "~/components/ui/badge";
import Check from "~/components/ui/check";
import { Muted } from "~/components/prose/prose-item"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { order_status } from "~/db/constants"
import { WebsiteOrder } from "~/db/schema"

interface p {
  order: WebsiteOrder
}
const WebsiteOrderCard = ({order}:p) => {

  const features = JSON.parse(order.features || "") as string[] 

  return (
    <Card>
      <CardHeader>
        <CardTitle>{order.phone}</CardTitle>
        <CardDescription>{order.name} | {order.email}</CardDescription>
      </CardHeader>
      <CardContent class="grid grid-cols-5 gap-2">
        {order.budget && 
        <p>
          <Muted>بودجه: </Muted>
          {order.budget}
        </p>}
        {order.pageCount && 
        <p>
          <Muted>تعداد صفحه:</Muted>
          {order.pageCount}
        </p>}
        {order.timeline && 
        <p>
          <Muted>زمان درخواستی:</Muted>
          {order.timeline}
        </p>}
        {order.contentReady && 
        <p>
          <Muted>مطالب آماده است:</Muted>
          {order.contentReady}
        </p>}
        {order.websiteType && 
        <p>
          <Muted>نوع ساخت:</Muted>
          {order.websiteType}
        </p>}
        {order.isMarketplace && 
        <p>
          <Muted>نوع سایت:</Muted>
          {order.isMarketplace}
        </p>}
        {features.length && 
        <p class="col-span-3">
          <Muted>قابلیت‌ها:</Muted>
          {features.map(f => <Badge>{f}</Badge>)}
        </p>}
        {order.description && 
        <p class="col-span-3">
          <Muted>توضیحات:</Muted>
          {order.description}
        </p>}
      </CardContent>
      <CardFooter class="flex justify-between">
        <p>
          <Muted>وضعیت: </Muted> {order_status_fa(order.status)}
        </p>
      </CardFooter>
    </Card>
  )
}

const order_status_fa = (o: order_status) => {
  const B = ({children}:ParentProps) => <Badge variant="secondary" class="flex gap-2 mt-2">{children}</Badge>
  switch (o) {
    case "pending":
      return <B><FiLoader/>در انتظار بررسی </B>
    case "in-call-line":
      return <B><FiPhone/> در صف تماس</B>
    case "making":
      return <B><FiCode/> در حال ساخت</B>
    case "done":
      return <B><Check/>ساخت به پایان رسیده</B>
    default:
    throw new Error("وضعیت تعریف نشده: ", o)
  }
}

export default WebsiteOrderCard
