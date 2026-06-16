import { createAsync, query, redirect, useParams } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { FiArrowLeft } from "solid-icons/fi"
import { Show, Suspense } from "solid-js"
import { Loading } from "~/components/parts/Loading"
import AdminTicketCardRespond from "~/components/ticket/admin-ticket-respond"
import { Button } from "~/components/ui/button"
import { db } from "~/db/db"
import { isAdminLoggedIn } from "~/server/serverUtil"

const queryTicket = query(async (id: number) => {
  "use server"
  if (!await isAdminLoggedIn()) throw redirect("/Login")
  return db.query.ticketTable.findFirst({
    where: (tbl => eq(tbl.id, id)),
    with: {user: true}
  })
}, "adminSingleTicket")

const answer = () => {

  const {id} = useParams()
  let ticket = createAsync(() => queryTicket(parseInt(id || "")))

  return (
    <div class="p-5 relative">
      <Button variant="secondary" class="absolute left-5 m-5" as="A" href="/admin/ticket">
        بازگشت
        <FiArrowLeft/>
      </Button>
      <Suspense fallback={<Loading/>}>
        <Show when={ticket()}>
          {pt => <AdminTicketCardRespond t={pt}/>}
        </Show>
      </Suspense>
    </div>
  )
}

export default answer
