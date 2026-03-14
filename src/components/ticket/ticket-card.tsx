import { Ticket } from "~/db/schema"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { AiFillWarning } from "solid-icons/ai"
import { FiAlertCircle, FiCheck } from "solid-icons/fi"
import { limitChar } from "~/lib/utils"

interface p {
  t: Ticket
}
const TicketCard = ({t}:p) => {
  return (
    <Card class="relative">
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
      <CardContent>
        {limitChar(t.content.at(-1)?.msg || "", 40)}
      </CardContent>
        <Button class="absolute left-5 bottom-5" as="A" href={`/Panel/ticket/${t.id}`}>مشاهده</Button>
    </Card>
  )
}

export default TicketCard
