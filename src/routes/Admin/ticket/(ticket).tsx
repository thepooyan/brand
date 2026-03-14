import { createAsync, query, redirect } from "@solidjs/router"
import { FiFilter } from "solid-icons/fi"
import { createSignal, For, ParentProps, Show } from "solid-js"
import { Loading } from "~/components/parts/Loading"
import AdminTicketCard from "~/components/ticket/admin-ticket-card"
import { ticket_states, TicketStates } from "~/components/ticket/ticket-signal"
import { Button } from "~/components/ui/button"
import { queryTicketsWithRelations } from "~/db/relationQueries"
import { useToggle } from "~/lib/hooks"
import { isAdminLoggedIn } from "~/server/serverUtil"


const getAllTickets = query(async () => {
  "use server"
  if (!await isAdminLoggedIn()) throw redirect("/Login")
  return await queryTicketsWithRelations()
}, "adminTickets")


const ticket = () => {

  const tickets = createAsync(() => getAllTickets())

  type filterStates = TicketStates | null
  const [filter, setFilter] = createSignal<filterStates>(null)

  const filteredTickets = () => {
    if (filter() === null) return tickets()
    return tickets()?.filter(t => t.state === filter())
  }

  const {activate, isActive} = useToggle<filterStates>(null)

  const Btn = ({children, state}:ParentProps & {state: filterStates}) => {
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
    <div class="p-5 space-y-3">
      <h1 class="text-3xl font-bold mb-8">
        تیکت ها
      </h1>
        <div class="flex gap-2 my-5 mb-2 items-center text-muted-foreground text-sm">
          <FiFilter/>
          فیلتر:
        </div>
        <div class="space-x-1 mb-6">
          <Btn state={null}>همه</Btn>
          <For each={[...ticket_states]}>
            {s => <Btn state={s}>
              {s === "responded" && "پاسخ داده شده"}
              {s === "pending" && "در انتظار پاسخ"}
            </Btn>}
          </For>
        </div>
      <div class="grid grid-cols-2 gap-3">
        <Show when={filteredTickets()?.length === 0}>
          <p>
            تیکتی یافت نشد!
          </p>
        </Show>
        <Show when={filteredTickets()} fallback={<Loading/>}>
          {presentData => <For each={presentData()}>
            {f => <AdminTicketCard t={f}/>}
          </For>}
        </Show>
      </div>
    </div>
  )
}

export default ticket
