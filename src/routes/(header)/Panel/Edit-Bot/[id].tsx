import { createAsync, useParams } from "@solidjs/router"
import { Show, Suspense } from "solid-js"
import { Loading } from "~/components/parts/Loading"
import { getBotById } from "~/lib/queries"

const testbot = () => {
  const params = useParams()
  const bot = createAsync(() => getBotById(parseInt(params.id)))

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Show when={bot()}>
          {
            presentBot => <>
              You are logged in and allowed to access the bot number {presentBot().id}!
              {JSON.stringify(bot())}
            </>
          }
        </Show>
      </Suspense>
    </>
  )
}

export default testbot
