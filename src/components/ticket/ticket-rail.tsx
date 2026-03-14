import { Accessor, createEffect, For } from "solid-js"
import TicketBubble from "./ticket-bubble"
import { Ticket } from "~/db/schema"

const TicketRail = ({t}:{t: Accessor<Ticket>}) => {

  let rail!:HTMLDivElement

  createEffect(() => {
    t().content;
    rail.scrollTo({top: rail.scrollHeight, behavior: "smooth"})
  })

  return (
    <div class=" h-80 overflow-auto bg-background p-5 rounded-md -mx-6" ref={rail}>
      <For each={t().content}>
        {c => <TicketBubble {...c}/>}
      </For>
    </div>
  )
}

export default TicketRail
