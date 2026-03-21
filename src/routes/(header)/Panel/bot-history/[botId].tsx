import { createAsync, query, useParams } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { createEffect, For, Show, Suspense } from "solid-js"
import HistoryCard from "~/components/history/history-card"
import { callModal } from "~/components/layout/Modal"
import { Loading } from "~/components/parts/Loading"
import { db } from "~/db/db"
import { safeDb2 } from "~/lib/utils"

const queryBotHistory = query(async(botId: number) => {
  "use server"
  return safeDb2(
    db.query.chatbot_history_table.findMany({
      where: (tbl => eq(tbl.botId, botId))
    })
  )
}, "botHistory")

const botId = () => {

  const {botId} = useParams()
  const botHistory = createAsync(() => queryBotHistory(parseInt(botId)))

  createEffect(() => {
    let error = botHistory()?.msg
    if (error) callModal.fail(error)
  })

  return (
    <Suspense fallback={<Loading/>}>
      <Show when={botHistory()?.data}>
        {bh => <For each={bh()}>
          {b => <HistoryCard histroy={b}/>}
        </For>}
      </Show>
    </Suspense>
  )
}

export default botId
