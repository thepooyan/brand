import { AiFillWarning, AiOutlineCheck } from "solid-icons/ai"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { TicketWithRelations } from "~/db/relationQueries"
import { For } from "solid-js"
import { limitChar } from "~/lib/utils"

interface p {
  t: TicketWithRelations
}
const AdminTicketCard = ({t}:p) => {
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
      <CardFooter class="justify-end">
        <Button as="A" href={`/admin/ticket/answer/${t.id}`}
        >پاسخ</Button>
      </CardFooter>
    </Card>
  )
}

export default AdminTicketCard
