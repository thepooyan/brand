import { createAsync, query, redirect } from "@solidjs/router"
import { For, Show } from "solid-js"
import { Loading } from "~/components/parts/Loading"
import AdminTicketCard from "~/components/ticket/admin-ticket-card"
import { queryTicketsWithRelations } from "~/db/relationQueries"
import { isAdminLoggedIn } from "~/server/serverUtil"


const getAllTickets = query(async () => {
  "use server"
  if (!await isAdminLoggedIn()) throw redirect("/Login")
  return await queryTicketsWithRelations()
}, "adminTickets")


const ticket = () => {

  const tickets = createAsync(() => getAllTickets())

  return (
    <div class="p-5 space-y-3">
      <h1 class="text-3xl font-bold mb-8">
        تیکت ها
      </h1>
      <Show when={tickets()} fallback={<Loading/>}>
        {presentData => <For each={presentData()}>
          {f => <AdminTicketCard t={f}/>}
        </For>}
      </Show>
    </div>
  )
}

export default ticket
