import { createAsync, query, redirect } from "@solidjs/router";
import { Button } from "../ui/button"
import { setTicketState, ticket_states, TicketStates } from "./ticket-signal";
import { createSignal, For, ParentProps, Show, Suspense } from "solid-js";
import TicketCard from "./ticket-card";
import { Loading } from "../parts/Loading";
import { FiFilter, FiPlus } from "solid-icons/fi";
import { useToggle } from "~/lib/hooks";
import { getAuthSession } from "~/lib/session";
import { db } from "~/db/db";
import { desc, eq } from "drizzle-orm";

const getUserTickets = query(async () => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/Panel/ticket")

  return db.query.ticketTable.findMany({
    where: (tbl => eq(tbl.userId, user.id)),
    orderBy: (tbl => desc(tbl.updatedAt) )
  })
}, "userTickets")

const TicketDashboard = () => {

  const tickets = createAsync(() => getUserTickets())
  const [filter, setFilter] = createSignal<TicketStates | null>(null)

  const filteredTickets = () => {
    if (filter() === null) return tickets()
    return tickets()?.filter(t => t.state === filter())
  }

  const {activate, isActive} = useToggle<TicketStates | null>(null)

  const Btn = ({children, state}:ParentProps & {state: TicketStates | null}) => {
    const id = state
    return <Button variant={isActive(id) ? "secondary" : "outline"}
      onclick={() => {
        activate(id)
        setFilter(state)
      }}>
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
        <div class="flex gap-2 my-5 mb-2 items-center text-muted-foreground text-sm">
          <FiFilter/>
          فیلتر:
        </div>
        <div class="space-x-1">
          <Btn state={null}>همه</Btn>
          <For each={ticket_states}>
            {s => <Btn state={s}>
              {s === "responded" && "پاسخ داده شده"}
              {s === "pending" && "در انتظار پاسخ"}
            </Btn>}
          </For>
        </div>
      </div>

      <Show when={filteredTickets()?.length === 0}>
        <p class="text-muted-foreground p-5 text-center mt-10">
          موردی یافت نشد...
        </p>
      </Show>

      <div class="p-5 grid grid-cols-2 gap-3">
        <Suspense fallback={<Loading/>}>
          <Show when={filteredTickets()}>
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
