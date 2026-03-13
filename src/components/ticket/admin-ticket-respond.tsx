import { AiFillWarning, AiOutlineCheck } from "solid-icons/ai"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { TicketWithRelations } from "~/server/adminActions"
import Textarea from "../ui/Textarea"

interface p {
  t: TicketWithRelations
}
const AdminTicketCardRespond = ({t}:p) => {
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
      <CardFooter class="flex flex-col items-stretch gap-2">
        <Textarea
          placeholder="پاسخ..."
          class="w-full block min-h-30"
        />
        <Button class="w-max">ارسال</Button>
      </CardFooter>
    </Card>
  )
}

export default AdminTicketCardRespond
