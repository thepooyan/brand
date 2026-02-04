import { useParams } from "@solidjs/router"
import { Show } from "solid-js"
import Spinner from "~/components/parts/Spinner"
import { getUser } from "~/lib/signal"

const testbot = () => {
  const params = useParams()
  const user = getUser()
  return (
    <>
      <Show when={user()} fallback={<Spinner/>}>
        You are logged in and allowed to access the bot number {params.id}!
      </Show>
    </>
  )
}

export default testbot
