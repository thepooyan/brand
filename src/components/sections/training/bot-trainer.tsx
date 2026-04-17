import { createEffect, Match, ParentProps, Switch } from "solid-js"
import Choose from "./choose"
import { mark_training_page, set_training_state, training_state } from "./training-state"
import TrainAuto from "./train-auto"
import CrawlTree from "./crawl-tree"
import TrainForm from "./train-form"
import { createAsync, query, redirect } from "@solidjs/router"
import { safeDb } from "~/lib/utils"
import { db } from "~/db/db"
import { eq } from "drizzle-orm"
import { getAuthSession } from "~/lib/session"
import { fetchFail, fetchSuccess } from "~/lib/actionAbstraction"
import { Loading } from "~/components/parts/Loading"

const queryChatbot = query(async (bot_id: number) => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect("/Login")
  let result = await safeDb(
    db.query.chatbotTable.findFirst({
      where: (tbl => eq(tbl.id, bot_id)),
      with: {trainingData: true}
    })
  )
  if (!result.ok) return result
  if (!result.data) return fetchFail("ربات یافت نشد!")
  return fetchSuccess(result.data)
}, "chatbotTraining")

interface p {
  bot_id: string
}
const BotTrainer = ({bot_id}:p) => {

  const chatbot = createAsync(() => queryChatbot(parseInt(bot_id)))

  createEffect(() => {
    if (chatbot()?.data?.trainingData === null) set_training_state("choose")
    if (chatbot()?.data?.trainingData !== null) set_training_state("form")
  })

  const stateComponents = [
    {n: "choose", c:<Choose/> },
    {n: "tree", c:<CrawlTree/> },
    {n: "auto", c:<TrainAuto/> },
    {n: "form", c:<TrainForm initialData={() => chatbot()?.data?.trainingData}/> },
    {n: "loading", c:<Loading/> },
  ]

  return (
    <>
      <div>
        <Switch>
          {stateComponents.map(s => 
            <Match when={training_state() === s.n}>
              <Wrap>
                {s.c}
              </Wrap>
            </Match>)}
        </Switch>
      </div>
    </>
  )
}

const Wrap = (p:ParentProps) => <div {...mark_training_page()}>{p.children}</div>

export default BotTrainer
