import { Ticket } from "~/db/schema"

interface p {
  t: Ticket
}
const TicketDetails = ({t}:p) => {
  return (
    <div>
      {JSON.stringify(t)}
    </div>
  )
}

export default TicketDetails
