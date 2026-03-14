import { createAsync, query, redirect, revalidate, useParams } from "@solidjs/router"
import { and, eq } from "drizzle-orm"
import { createEffect, Show, Suspense } from "solid-js"
import { Loading } from "~/components/parts/Loading"
import TicketDetails from "~/components/ticket/ticket-details"
import { db } from "~/db/db"
import { ticketTable } from "~/db/schema"
import { getAuthSession } from "~/lib/session"
import NotFound from "~/routes/[...404]"

const a = query(async (id: number) => {
  "use server"

  const user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/Panel/ticket")

  let result = await db.transaction(async ctx => {

    const target = await ctx.query.ticketTable.findFirst({
      where: (tbl => and(
        eq(tbl.userId, user.id),
        eq(tbl.id, id)
      ))
    })
    if (!target) return undefined
    if (!target.isSeen) {
      await ctx.update(ticketTable).set({isSeen: true}).where(eq(ticketTable.id, target.id))
    }
    return target
  })
  return result
}, "singleTicket")

const id = () => {

  const {id} = useParams()
  const ticket = createAsync(() => a(parseInt(id)))

  createEffect(() => {
    ticket()
    revalidate("doesHaveNewTicket")
  })

  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <Show when={ticket()}>
          {pt => <TicketDetails t={pt}/>}
        </Show>
        <Show when={ticket() === undefined}>
          <NotFound/>
        </Show>
      </Suspense>
    </div>
  )
}

export default id
