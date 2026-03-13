import { createAsync } from "@solidjs/router";
import { Button } from "../ui/button"
import { setTicketState } from "./ticket-signal";
import { getUserTickets } from "~/server/userActions";
import { For, ParentProps, Show } from "solid-js";
import TicketCard from "./ticket-card";
import { Loading } from "../parts/Loading";
import { FiFilter, FiPlus } from "solid-icons/fi";
import { useToggle } from "~/lib/hooks";
import { cn } from "~/lib/utils";

const TicketDashboard = () => {

  const tickets = createAsync(() => getUserTickets())

  const {activate, isActive} = useToggle()

  const Btn = ({children}:ParentProps) => {
    const id = Math.random()
    return <Button variant={isActive(id) ? "secondary" : "outline"}
      class={cn(
        // isActive(id) && "bg-primary text-primary-foreground"
      )}
      onclick={() => activate(id)}>
      {children}
    </Button>
  }

  return (
    <div class="p-1">
      <Button onclick={() => setTicketState("new") } class="float-left m-5">
        تیکت جدید
        <FiPlus/>
      </Button>

      <div>
        <div class="flex gap-2 my-5 mb-2 items-center text-muted-foreground">
          <FiFilter/>
          فیلتر:
        </div>
        <div class="space-x-1">
          <Btn>
            تیکت های خوانده نشده
          </Btn>
          <Btn>
            تیکت های خوانده شده
          </Btn>
          <Btn>
            تیکت های ارسال شده
          </Btn>
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
