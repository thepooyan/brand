import { createAsync, useParams } from "@solidjs/router"
import { Show, Suspense } from "solid-js"
import EditBotPage from "~/components/pages/EditBotPage"
import { Loading } from "~/components/parts/Loading"
import { getBotById } from "~/lib/queries"
import { panelPageMarker } from "~/lib/routeChangeTransition"

const testbot = () => {
  const params = useParams()
  const bot = createAsync(() => getBotById(parseInt(params.id)))

  return (
    <div {...panelPageMarker()}>
      <Suspense fallback={<Loading />}>
        <Show when={bot()}>
          {
            presentBot => <EditBotPage bot={presentBot()}/>
          }
        </Show>
      </Suspense>
    </div>
  )
}

export default testbot
