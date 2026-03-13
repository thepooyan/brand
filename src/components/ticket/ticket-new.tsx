import { FiArrowLeft } from "solid-icons/fi"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import Input from "../ui/input"
import Textarea from "../ui/Textarea"
import { setTicketState } from "./ticket-signal"
import { callModal } from "../layout/Modal"
import { newTicket } from "~/server/actions"

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
    } else {
      callModal.fail(res.msg)
    }
  }

  return (
    <Card>
      <form onsubmit={handleSubmit}>
        <h1>ثبت تیکت جدید</h1>
        <Button variant="secondary" onclick={() => setTicketState("dashboard")}>
          بازگشت
          <FiArrowLeft/>
        </Button>
        <Input placeholder="موضوع" name="subject"/>
        <Textarea placeholder="متن مورد نظر را انیجا وارد کنید..." name="content"/>
        <Button type="submit" >ارسال</Button>
      </form>
    </Card>
  )
}

export default TicketNew
