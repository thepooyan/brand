import { createAsync, query, useParams } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { FiArrowLeft } from "solid-icons/fi"
import { Show, Suspense } from "solid-js"
import HistoryChatbox from "~/components/history/history-chatbox"
import { Loading } from "~/components/parts/Loading"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { db } from "~/db/db"
import { safeDb2 } from "~/lib/utils"

const queryHistoryDetails = query(async (id: number) => {
  "use server"
  return safeDb2(
    db.query.chatbot_history_table.findFirst({
      where: (tbl => eq(tbl.id, id)),
      with: {chatbot: true}
    })
  )
}, "historyDetail")

const id = () => {

  const {id} = useParams()
  const h = createAsync(() => queryHistoryDetails(parseInt(id)))

  return (
    <div>
      <Button onclick={() => history.back()}
        variant="secondary"
        size="sm"
        class="mr-auto flex"
      >
        بازگشت
        <FiArrowLeft/>
      </Button>
      <Suspense fallback={<Loading/>}>

        <Show when={h()?.data}>
          {ph => <Card class="mt-3">
            <CardHeader>
              <CardTitle>
                {ph().chatbot.botName}
              </CardTitle>
              <CardDescription>
                {ph().nickname} | 
                {ph().lastUpdated.toLocaleDateString("fa-IR")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HistoryChatbox messages={ph().messages}/>
            </CardContent>
          </Card>}
        </Show>
      </Suspense>
    </div>
  )
}

export default id
