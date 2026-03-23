import { createAsync, query, redirect } from "@solidjs/router"
import { desc, eq, inArray } from "drizzle-orm"
import { createEffect, Show, Suspense } from "solid-js"
import HistoryCardMapper from "~/components/history/history-card-mapper"
import { callModal } from "~/components/layout/Modal"
import { Loading } from "~/components/parts/Loading"
import { db } from "~/db/db"
import { getAuthSession } from "~/lib/session"
import { safeDb2 } from "~/lib/utils"

const queryBotHistory = query(async() => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/Panel/history")

  return safeDb2(
    db.transaction(async ctx => {
      const bots = await ctx.query.chatbotTable.findMany({ where: (tbl => eq(tbl.userId, user.id)) })
      const botIds = bots.map(i => i.id)

      return ctx.query.chatbot_history_table.findMany({
        where: (tbl => inArray(tbl.botId, botIds)),
        with: {chatbot: {columns: {botName: true}}},
        orderBy: (tbl => desc(tbl.lastUpdated))
      })
    })
  )
}, "botHistory")

const botId = () => {

  const botHistory = createAsync(() => queryBotHistory())

  createEffect(() => {
    let error = botHistory()?.msg
    if (error) callModal.fail(error)
  })

  return (
    <Suspense fallback={<Loading/>}>
      <Show when={botHistory()?.data}>
        {d => <HistoryCardMapper data={d}/>}
      </Show>
    </Suspense>
  )
}

export default botId
