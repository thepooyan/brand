import { Match, ParentProps, Switch } from "solid-js"
import Choose from "./choose"
import { mark_training_page, set_training_state, training_state } from "./training-state"
import TrainAuto from "./train-auto"
import CrawlTree from "./crawl-tree"
import TrainForm from "./train-form"

interface p {
  firstTime?: boolean
  bot_id: string
}
const BotTrainer = ({firstTime = true}:p) => {

  // if (firstTime) set_training_state("choose")

  const stateComponents = [
    {n: "choose", c:Choose },
    {n: "tree", c:CrawlTree },
    {n: "auto", c:TrainAuto },
    {n: "form", c:TrainForm },
  ]

  return (
    <>
      <div>
        <Switch>
          {stateComponents.map(s => 
            <Match when={training_state() === s.n}>
              <Wrap>
                <s.c/>
              </Wrap>
            </Match>)}
        </Switch>
      </div>
    </>
  )
}

const Wrap = (p:ParentProps) => <div {...mark_training_page()}>{p.children}</div>

export default BotTrainer
