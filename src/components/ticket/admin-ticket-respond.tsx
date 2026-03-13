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
import { useNavigate } from "@solidjs/router"
import { createSignal } from "solid-js"

interface p {
  t: TicketWithRelations
}

const saveTicketResponse = async (response: string, id: number) => {
  "use server"
  await db.update(ticketTable).set( { response: response, state: "responded" })
  .where(
    eq(ticketTable.id, id)
  )
  return {ok: true}
}

const AdminTicketCardRespond = ({t}:p) => {

  const nv = useNavigate()
  const [loading, setLoading] = createSignal(false)

  const handleSubmit = (e:FormSubmitEvent) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const response = data.get("response") as string
    if (!response) return

    setLoading(true)
    saveTicketResponse(response, t.id)
    .then(({ok}) => {
        if (ok) {
          callModal.success()
          nv("/admin/ticket")
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
      </CardHeader>
      <CardContent>
        {t.content}
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
            class="w-max">ارسال</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

export default AdminTicketCardRespond
