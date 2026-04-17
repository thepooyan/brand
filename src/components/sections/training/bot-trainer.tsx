import { createEffect, Match, onMount, ParentProps, Switch } from "solid-js"
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
import { callModal } from "~/components/layout/Modal"

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

  onMount(() => set_training_state("loading"))

  createEffect(() => {
    let query = chatbot()
    if (query !== undefined) {
      if (query.msg) return callModal.fail(query.msg)
      if (query.data?.trainingData === null) return set_training_state("choose")
      if (query.data?.trainingData) return set_training_state("form")
    }
  })

  const stateComponents = [
    {n: "choose", c:<Choose/> },
    {n: "tree", c:<CrawlTree/> },
    {n: "auto", c:<TrainAuto/> },
    {n: "form", c:<TrainForm initialData={() => chatbot()?.data?.trainingData} bot_id={parseInt(bot_id)}/> },
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
