import { Ticket, ticketTable } from "~/db/schema"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { AiFillWarning } from "solid-icons/ai"
import { FiAlertCircle, FiCheck, FiEye, FiTrash } from "solid-icons/fi"
import { limitChar } from "~/lib/utils"
import TA from "../parts/TA"
import { callModal } from "../layout/Modal"
import { db } from "~/db/db"
import { getAuthSession } from "~/lib/session"
import { redirect } from "elysia"
import { and, eq } from "drizzle-orm"
import { revalidate } from "@solidjs/router"

const deleteTicket = async (id: number) => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/Panel/ticket")

  await db.delete(ticketTable).where(
    and(
      eq(ticketTable.id, id),
      eq(ticketTable.userId, user.id)
    )
  )
  return {ok: true}
}

interface p {
  t: Ticket
}
const TicketCard = ({t}:p) => {

  const deleteMe = async () => {
    callModal.prompt(`تیکت ${t.subject} حذف شود؟`)
    .yes(async() => {
        await deleteTicket(t.id)
        revalidate("userTickets")
      })
  }

  return (
    <Card class="relative flex flex-col">
      <CardHeader class="">
        <CardTitle>
          {t.subject}
        </CardTitle>
        <CardDescription class="flex gap-2 items-center">
          {t.state === "pending" && <AiFillWarning class="text-orange-500"/>}
          {t.state === "responded" && <FiCheck class="bg-green-500 rounded-full text-foreground p-1"/>}
          وضعیت: 
          {t.state === "pending" && "در انتظار پاسخ"}
          {t.state === "responded" && "پاسخ داده شده"}
        </CardDescription>
        {!t.isSeen && <Button variant="outline"
          class=" absolute text-green-500 font-bold left-5 top-5 flex items-center gap-2"
        >
          <FiAlertCircle/>
          خوانده نشده
        </Button>}
        <div class="text-sm text-muted-foreground">دسته بندی: {t.category}</div>
      </CardHeader>
      <CardContent class="space-y-4 mt-auto">
        <p>
          {limitChar(t.content.at(-1)?.msg || "", 120)}
        </p>
        <div class="gap-2 flex items-center justify-end">
          <Button variant="destructive" onclick={deleteMe}>
            <FiTrash/>
            حذف
          </Button>
          <Button as={TA} href={`/Panel/ticket/${t.id}`}>
            <FiEye/>
            مشاهده
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default TicketCard
