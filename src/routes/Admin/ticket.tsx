import { createAsync } from "@solidjs/router"
import { For, Show } from "solid-js"
import { Loading } from "~/components/parts/Loading"
import { getAllTickets } from "~/server/adminActions"

const ticket = () => {

  const tickets = createAsync(() => getAllTickets())

  return (
    <div>
      <Show when={tickets()} fallback={<Loading/>}>
        {presentData => <For each={presentData()}>
          {f => <>{f.subject} {f.content}</>}
        </For>}
      </Show>
    </div>
  )
}

export default ticket
