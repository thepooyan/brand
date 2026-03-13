import { Ticket } from "~/db/schema"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

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
        <CardDescription>
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

export default TicketCard
