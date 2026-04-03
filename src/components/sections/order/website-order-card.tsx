import { Muted } from "~/components/prose/prose-item"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { order_status, order_status_fa } from "~/db/constants"
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

export default WebsiteOrderCard
