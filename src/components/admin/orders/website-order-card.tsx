import { Muted } from "~/components/prose/prose-item"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { WebsiteOrder } from "~/db/schema"

interface p {
  order: WebsiteOrder
}
const WebsiteOrderCard = ({order}:p) => {
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
      <CardFooter>

      </CardFooter>
    </Card>
  )
}

export default WebsiteOrderCard
