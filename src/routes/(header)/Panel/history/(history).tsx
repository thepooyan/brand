import { createAsync, query, redirect } from "@solidjs/router"
import { desc, eq, inArray } from "drizzle-orm"
import { createEffect, Show, Suspense } from "solid-js"
import HistoryCardMapper from "~/components/history/history-card-mapper"
import { callModal } from "~/components/layout/Modal"
import { Loading } from "~/components/parts/Loading"
import { H2, Muted } from "~/components/prose/prose-item"
import { db } from "~/db/db"
import { panelPageMarker } from "~/lib/routeChangeTransition"
import { getAuthSession } from "~/lib/session"
import { safeDb } from "~/lib/utils"

const queryBotHistory = query(async() => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/Panel/history")

  return safeDb(
    db.transaction(async ctx => {
      const bots = await ctx.query.chatbotTable.findMany({ where: (tbl => eq(tbl.userId, user.id)) })
      const botIds = bots.map(i => i.id)

      let history = await ctx.query.chatbot_history_table.findMany({
        where: (tbl => inArray(tbl.botId, botIds)),
        with: {chatbot: {columns: {botName: true}}},
        orderBy: (tbl => desc(tbl.lastUpdated))
      })
      return history.map(h => ({...h}))
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
    <div {...panelPageMarker()}>
      <H2 class="mt-4">مکالمات</H2>
      <Muted class="mb-8">نمایش مکالمات انجام شده با چت‌بات های شما</Muted>

      <Suspense fallback={<Loading/>}>
        <Show when={botHistory()?.data}>
          {d => <HistoryCardMapper data={d}/>}
        </Show>
      </Suspense>
    </div>
  )
}

export default botId
