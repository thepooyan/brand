import { Accessor, For } from "solid-js"
import { WebsiteOrder } from "~/db/schema"
import WebsiteOrderCard from "./website-order-card"

interface p {
  orders: Accessor<WebsiteOrder[]>
}
const WebsiteOrdersMapper = ({orders}:p) => {
  return (
    <div class="p-5 space-y-3">
      <For each={orders()}>
        {o => <WebsiteOrderCard order={o}/>}
      </For>
    </div>
  )
}

export default WebsiteOrdersMapper
