import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { setTicketState } from "./ticket-signal";

const TicketDashboard = () => {
  return (
    <Card>
      <Button onclick={() => setTicketState("new") }>تیکت جدید</Button>

      <div>
        <Button variant="outline">
          تیکت های خوانده نشده
        </Button>
        <Button variant="outline" >
          تیکت های خوانده شده
        </Button>
      </div>

    </Card>
  )
}

export default TicketDashboard
