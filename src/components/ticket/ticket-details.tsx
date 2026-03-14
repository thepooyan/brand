import { Ticket, ticketTable } from "~/db/schema"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Accessor, createSignal } from "solid-js"
import { Button } from "../ui/button"
import { AiFillWarning } from "solid-icons/ai"
import { FiArrowLeft, FiCheck, FiSend } from "solid-icons/fi"
import TA from "../parts/TA"
import { db } from "~/db/db"
import { eq } from "drizzle-orm"
import { FormSubmitEvent } from "~/db/types"
import { callModal } from "../layout/Modal"
import { revalidate } from "@solidjs/router"
import TicketRail from "./ticket-rail"
import Input from "../ui/InputNew"

interface p {
  t: Accessor<Ticket>
}

const replyTicketAction = async (response: string, id: number) => {
  "use server"
  await db.transaction(async ctx => {
    const item = await ctx.query.ticketTable.findFirst({
      where: eq(ticketTable.id, id)
    })
    if (!item) return
    await ctx.update(ticketTable).set( {
      content: [...item.content, {from: "user", msg: response}],
      state: "pending",
      updatedAt: new Date(),
    })
    .where(
      eq(ticketTable.id, id)
    )
  })
  return {ok: true}
}

const TicketDetails = ({t}:p) => {

  const [loading, setLoading] = createSignal(false)

  const handleSubmit = (e: FormSubmitEvent) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const response = formData.get("response") as string

    if (!response) return callModal.fail("لطفا پاسخ را خالی نگذارید")

    replyTicketAction(response, t().id)
    .then(res => {
        if (res.ok) {
          revalidate("singleTicket")
          form.reset()
        }
      })
    .catch(err => callModal.fail(err))
    .finally(() => setLoading(false))
  }

  return (
    <Card class="h-[calc(100dvh-6rem)] flex flex-col">
      <CardHeader class="pb-3">
        <CardTitle>{t().subject} | {t().category}</CardTitle>
        <CardDescription class="flex gap-2 items-center">
          {t().state === "pending" && <AiFillWarning class="text-orange-500"/>}
          {t().state === "responded" && <FiCheck class="bg-green-500 rounded-full text-foreground p-1"/>}
          وضعیت: 
          {t().state === "pending" && "در انتظار پاسخ"}
          {t().state === "responded" && "پاسخ داده شده"}
        </CardDescription>
        <Button variant="secondary"
          as={TA} href="/Panel/ticket"
          class="absolute left-10"
        >
          بازگشت
          <FiArrowLeft/>
        </Button>
      </CardHeader>
      <CardContent class="p-0 h-[calc(100dvh-16rem)]">
        <TicketRail t={t}/>
      </CardContent>
      <CardFooter class="p-4 mt-auto">
        <form class="flex gap-2 w-full" onsubmit={handleSubmit}>
          <Input placeholder="پاسخ..." class="w-full" name="response"/>
          <Button class="w-max" loading={loading} type="submit" >
            ارسال
            <FiSend/>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

export default TicketDetails
