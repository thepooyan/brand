import { Match, Switch } from "solid-js"
import TicketDashboard from "~/components/ticket/ticket-dashboard"
import TicketNew from "~/components/ticket/ticket-new"
import { ticketState } from "~/components/ticket/ticket-signal"


const ticket = () => {
  return (
    <>
      <Switch>
        <Match when={ticketState() === "dashboard"}>
          <TicketDashboard/>
        </Match>
        <Match when={ticketState() === "new"}>
          <TicketNew/>
        </Match>
      </Switch>
    </>
  )
}

export default ticket
