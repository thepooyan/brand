import { Match, Switch } from "solid-js"
import TicketDashboard from "~/components/ticket/ticket-dashboard"
import TicketNew from "~/components/ticket/ticket-new"
import { ticketState } from "~/components/ticket/ticket-signal"
import { panelPageMarker } from "~/lib/routeChangeTransition"


const ticket = () => {
  return (
    <div {...panelPageMarker()}>
      <Switch>
        <Match when={ticketState() === "dashboard"}>
          <TicketDashboard/>
        </Match>
        <Match when={ticketState() === "new"}>
          <TicketNew/>
        </Match>
      </Switch>
    </div>
  )
}

export default ticket
