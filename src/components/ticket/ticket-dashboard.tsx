import { createAsync } from "@solidjs/router";
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { setTicketState } from "./ticket-signal";
import { getUserTickets } from "~/server/userActions";
import { For, Show } from "solid-js";
import TicketCard from "./ticket-card";
import { Loading } from "../parts/Loading";
import { FiFilter } from "solid-icons/fi";

const TicketDashboard = () => {

  const tickets = createAsync(() => getUserTickets())

  return (
    <div class="p-1">
      <Button onclick={() => setTicketState("new") }>تیکت جدید</Button>

      <div>
        <div class="flex gap-2 my-5 mb-2 items-center text-muted-foreground">
          <FiFilter/>
          فیلتر:
        </div>
        <div class="space-x-1">
          <Button variant="outline">
            تیکت های خوانده نشده
          </Button>
          <Button variant="outline" >
            تیکت های خوانده شده
          </Button>
          <Button variant="outline" >
            تیکت های ارسال شده
          </Button>
        </div>
      </div>

      <div class="p-5 space-y-3">
        <Show when={tickets()} fallback={<Loading/>}>
          {pt => <For each={pt()}>
            {f => <TicketCard t={f}/>}
          </For>}
        </Show>
      </div>
    </div>
  )
}

export default TicketDashboard
