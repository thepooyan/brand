import { useParams } from "@solidjs/router"
import { Show } from "solid-js"
import MinimalChat from "~/components/parts/chat/MinimalChat"
import Spinner from "~/components/parts/Spinner"
import { panelPageMarker } from "~/lib/routeChangeTransition"
import { getUser } from "~/lib/signal"

const testbot = () => {
  const params = useParams()
  const user = getUser()
  return (
    <div {...panelPageMarker()}>
      <Show when={user()} fallback={<Spinner/>}>
        <MinimalChat botId={params.id}/>
      </Show>
    </div>
  )
}

export default testbot
