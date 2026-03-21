import { createAsync, query, useParams } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { Suspense } from "solid-js"
import { Loading } from "~/components/parts/Loading"
import { db } from "~/db/db"
import { safeDb } from "~/lib/utils"

const queryBotHistory = query(async(botId: number) => {
  "use server"
  return safeDb(
    db.query.chatbot_history_table.findMany({
      where: (tbl => eq(tbl.botId, botId))
    })
  )
}, "botHistory")

const botId = () => {

  const {botId} = useParams()
  const botHistory = createAsync(() => queryBotHistory(parseInt(botId)))

  return (
    <div>
      <Suspense fallback={<Loading/>}>
        {JSON.stringify(botHistory())}
      </Suspense>
    </div>
  )
}

export default botId
