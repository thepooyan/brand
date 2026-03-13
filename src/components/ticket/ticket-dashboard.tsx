import { createAsync, query, redirect } from "@solidjs/router";
import { Button } from "../ui/button"
import { setTicketState } from "./ticket-signal";
import { For, ParentProps, Show, Suspense } from "solid-js";
import TicketCard from "./ticket-card";
import { Loading } from "../parts/Loading";
import { FiFilter, FiPlus } from "solid-icons/fi";
import { useToggle } from "~/lib/hooks";
import { cn } from "~/lib/utils";
import { getAuthSession } from "~/lib/session";
import { db } from "~/db/db";
import { eq } from "drizzle-orm";

const getUserTickets = query(async () => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/Panel/ticket")

  return db.query.ticketTable.findMany({
    where: (tbl => eq(tbl.userId, user.id))
  })
}, "userTickets")

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
        <Suspense fallback={<Loading/>}>
          <Show when={tickets()}>
            {pt => <For each={pt()}>
              {f => <TicketCard t={f}/>}
            </For>}
          </Show>
        </Suspense>
      </div>
    </div>
  )
}


export default TicketDashboard
