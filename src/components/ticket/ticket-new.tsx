import { FiArrowLeft } from "solid-icons/fi"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import Input from "../ui/input"
import Textarea from "../ui/Textarea"
import { setTicketState } from "./ticket-signal"
import { callModal } from "../layout/Modal"
import { newTicket } from "~/server/actions"
import { revalidate } from "@solidjs/router"

const TicketNew = () => {

  const handleSubmit = async (e: SubmitEvent & {currentTarget: HTMLFormElement}) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form);

    const subject = formData.get("subject") as string
    const content = formData.get("content") as string

    if (!subject || !content) return callModal.fail("لطفا همه موارد را وارد کنید.")

    const res = await newTicket({subject, content})

    if (res.ok) {
      callModal.success()
      setTicketState("dashboard")
      revalidate("userTickets")
    } else {
      callModal.fail(res.msg)
    }
  }

  return (
    <Card  class="container p-10">
      <form onsubmit={handleSubmit} class="space-y-3">
        <h1 class="inline-block text-2xl font-bold mb-10">ثبت تیکت جدید</h1>
        <Button variant="secondary" onclick={() => setTicketState("dashboard")}
          class="float-left"
        >
          بازگشت
          <FiArrowLeft/>
        </Button>
        <Input placeholder="موضوع" name="subject"/>
        <Textarea class="min-h-40" placeholder="متن مورد نظر را انیجا وارد کنید..." name="content"/>
        <Button type="submit" >ارسال</Button>
      </form>
    </Card>
  )
}

export default TicketNew
