import { Ticket } from "~/db/schema"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { For } from "solid-js"
import TicketBubble from "./ticket-bubble"
import Textarea from "../ui/Textarea"
import { Button } from "../ui/button"
import { AiFillWarning } from "solid-icons/ai"
import { FiArrowLeft, FiCheck } from "solid-icons/fi"
import TA from "../parts/TA"

interface p {
  t: Ticket
}
const TicketDetails = ({t}:p) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.subject} | {t.category}</CardTitle>
        <CardDescription class="flex gap-2 items-center">
          {t.state === "pending" && <AiFillWarning class="text-orange-500"/>}
          {t.state === "responded" && <FiCheck class="bg-green-500 rounded-full text-foreground p-1"/>}
          وضعیت: 
          {t.state === "pending" && "در انتظار پاسخ"}
          {t.state === "responded" && "پاسخ داده شده"}
        </CardDescription>
        <Button variant="secondary"
          as={TA} href="/Panel/ticket"
          class="absolute left-10"
        >
          بازگشت
          <FiArrowLeft/>
        </Button>
      </CardHeader>
      <CardContent>
        <For each={t.content}>
          {c => <TicketBubble {...c}/>}
        </For>
      </CardContent>
      <CardFooter>
        <Textarea placeholder="پاسخ..." class="w-full"/>
        <Button>ارسال</Button>
      </CardFooter>
    </Card>
  )
}

export default TicketDetails
