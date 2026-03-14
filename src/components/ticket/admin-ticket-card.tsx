import { AiFillWarning, AiOutlineCheck } from "solid-icons/ai"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { TicketWithRelations } from "~/db/relationQueries"
import { limitChar } from "~/lib/utils"
import { isAdminLoggedIn } from "~/server/serverUtil"
import { db } from "~/db/db"
import { ticketTable } from "~/db/schema"
import { and, eq } from "drizzle-orm"
import { callModal } from "../layout/Modal"
import { revalidate } from "@solidjs/router"

const deleteTicket = async (id: number) => {
  "use server"
  if (!await isAdminLoggedIn()) return null

  await db.delete(ticketTable).where(
    and(
      eq(ticketTable.id, id),
    )
  )
  return {ok: true}
}
interface p {
  t: TicketWithRelations
}
const AdminTicketCard = ({t}:p) => {

  const deleteMe = () => {
    callModal.prompt(`تیکت ${t.subject} حذف شود؟`)
    .yes(async() => {
        await deleteTicket(t.id)
        revalidate("adminTickets")
      })
  }

  return (
    <Card class="relative">
      <CardHeader>
        <CardTitle>
          {t.subject}
        </CardTitle>
        <CardDescription>
          {t.user.number}
          <br/>
          {t.user.name}
          <br/>
          {t.user.email}
        </CardDescription>
        <div class="flex gap-2">
          {t.state === "pending" && <AiFillWarning class="text-orange-500"/>}
          {t.state === "responded" && <AiOutlineCheck class="text-green-500"/>}
          وضعیت: 
          {t.state === "pending" && "در انتظار پاسخ"}
          {t.state === "responded" && "پاسخ داده شده"}
        </div>
        <div class="absolute left-5 text-sm text-muted-foreground">
          دسته بندی: {t.category}
        </div>
      </CardHeader>
      <CardContent>
        {limitChar(t.content.at(-1)?.msg || "", 40)}
      </CardContent>
      <CardFooter class="justify-end space-x-2">
        <Button as="A" href={`/admin/ticket/answer/${t.id}`}
        >پاسخ</Button>
        <Button variant="destructive" onclick={deleteMe}>
          حذف
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AdminTicketCard
