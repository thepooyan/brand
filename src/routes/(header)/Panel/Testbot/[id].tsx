import { useParams } from "@solidjs/router"
import { Show } from "solid-js"
import MinimalChat from "~/components/parts/chat/MinimalChat"
import Spinner from "~/components/parts/Spinner"
import { getUser } from "~/lib/signal"

const testbot = () => {
  const params = useParams()
  const user = getUser()
  return (
    <>
      <Show when={user()} fallback={<Spinner/>}>
        {u => <MinimalChat botId={params.id} user={u()}/>}
      </Show>
    </>
  )
}

export default testbot
