import { useParams } from "@solidjs/router"
import { Show } from "solid-js"
import BackBtn from "~/components/parts/back-btn"
import MinimalChat from "~/components/parts/chat/MinimalChat"
import Spinner from "~/components/parts/Spinner"
import { panelPageMarker, usePanelTransitiveNavigate } from "~/lib/routeChangeTransition"
import { getUser } from "~/lib/signal"

const testbot = () => {
  const params = useParams()
  const user = getUser()
  return (
    <div {...panelPageMarker()}>

      <BackBtn href="/Panel/chatbot"
        class="mr-auto flex w-max ml-46 mb-3"
        navigatorHook={usePanelTransitiveNavigate}
      />

      <Show when={user()} fallback={<Spinner/>}>
        <MinimalChat botId={params.id}/>
      </Show>
    </div>
  )
}

export default testbot
