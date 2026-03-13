import { FiArrowLeft } from "solid-icons/fi"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import Input from "../ui/input"
import Textarea from "../ui/Textarea"
import { setTicketState } from "./ticket-signal"

const TicketNew = () => {
  return (
    <Card>
      <h1>ثبت تیکت جدید</h1>
      <Button variant="secondary" onclick={() => setTicketState("dashboard")}>
        بازگشت
        <FiArrowLeft/>
      </Button>
      <Input placeholder="موضوع"/>
      <Textarea placeholder="متن مورد نظر را انیجا وارد کنید..."/>
      <Button>ارسال</Button>
    </Card>
  )
}

export default TicketNew
