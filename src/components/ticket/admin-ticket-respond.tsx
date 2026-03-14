import { AiFillWarning, AiOutlineCheck } from "solid-icons/ai"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import Textarea from "../ui/Textarea"
import { TicketWithRelations } from "~/db/relationQueries"
import { FormSubmitEvent } from "~/db/types"
import { db } from "~/db/db"
import { ticketTable } from "~/db/schema"
import { eq } from "drizzle-orm"
import { callModal } from "../layout/Modal"
import { revalidate } from "@solidjs/router"
import { Accessor, createSignal } from "solid-js"
import TicketRail from "./ticket-rail"

interface p {
  t: Accessor<TicketWithRelations>
}

const saveTicketResponse = async (response: string, id: number) => {
  "use server"
  await db.transaction(async ctx => {

    const item = await ctx.query.ticketTable.findFirst({
      where: eq(ticketTable.id, id)
    })

    if (!item) return

    await ctx.update(ticketTable).set( {
      content: [...item.content, {from: "admin", msg: response}],
      state: "responded",
      updatedAt: new Date(),
      isSeen: false
    })
    .where(
      eq(ticketTable.id, id)
    )
  })
  return {ok: true}
}

const AdminTicketCardRespond = ({t}:p) => {

  const [loading, setLoading] = createSignal(false)

  const handleSubmit = (e:FormSubmitEvent) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const response = data.get("response") as string
    if (!response) return

    setLoading(true)
    saveTicketResponse(response, t().id)
    .then(({ok}) => {
        if (ok) {
          revalidate("adminSingleTicket")
          form.reset()
        } else {
          callModal.fail()
        }
      })
    .catch(() => callModal.fail())
    .finally(() => setLoading(false))
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t().subject}
        </CardTitle>
        <CardDescription>
          {t().user.number}
          <br/>
          {t().user.name}
          <br/>
          {t().user.email}
        </CardDescription>
        <div class="flex gap-2">
          {t().state === "pending" && <AiFillWarning class="text-orange-500"/>}
          {t().state === "responded" && <AiOutlineCheck class="text-green-500"/>}
          وضعیت: 
          {t().state === "pending" && "در انتظار پاسخ"}
          {t().state === "responded" && "پاسخ داده شده"}
        </div>
      </CardHeader>
      <CardContent>
        <TicketRail t={t}/>
      </CardContent>
      <CardFooter class="flex flex-col items-stretch gap-2" >
        <form onsubmit={handleSubmit}>
          <Textarea
            placeholder="پاسخ..."
            class="w-full block min-h-30"
            name="response"
          />
          <Button type="submit"
            loading={loading}
            class="w-max mt-3">ارسال</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

export default AdminTicketCardRespond
