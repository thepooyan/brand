import { createAsync, useParams } from "@solidjs/router"
import { Show, Suspense } from "solid-js"
import EditBotPage from "~/components/pages/EditBotPage"
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
            presentBot => <EditBotPage bot={presentBot()}/>
          }
        </Show>
      </Suspense>
    </>
  )
}

export default testbot
