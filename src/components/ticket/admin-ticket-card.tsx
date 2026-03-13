import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { TicketWithRelations } from "~/server/adminActions"

interface p {
  t: TicketWithRelations
}
const AdminTicketCard = ({t}:p) => {
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
      </CardHeader>
      <CardContent>
        {t.content}
      </CardContent>
      <CardFooter>
        <Button>پاسخ</Button>
      </CardFooter>
    </Card>
  )
}

export default AdminTicketCard
