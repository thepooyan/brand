import { Ticket } from "~/db/schema"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { AiFillWarning, AiOutlineCheck } from "solid-icons/ai"

interface p {
  t: Ticket
}
const TicketCard = ({t}:p) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t.subject}
        </CardTitle>
        <CardDescription class="flex gap-2 items-center">
          {t.state === "pending" && <AiFillWarning class="text-orange-500"/>}
          {t.state === "responded" && <AiOutlineCheck class="text-green-500"/>}
          وضعیت: 
          {t.state === "pending" && "در انتظار پاسخ"}
          {t.state === "responded" && "پاسخ داده شده"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {t.content}
      </CardContent>
      <CardFooter>
        <Button>نمایش</Button>
      </CardFooter>
    </Card>
  )
}

export default TicketCard
