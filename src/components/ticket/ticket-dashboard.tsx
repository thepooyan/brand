import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { setTicketState } from "./ticket-signal";

const TicketDashboard = () => {
  return (
    <Card>
      <Button onclick={() => setTicketState("new") }>تیکت جدید</Button>

      <div>
        تیکت های خوانده نشده
        تیکت های خوانده شده
      </div>

    </Card>
  )
}

export default TicketDashboard
