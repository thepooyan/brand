import { children, Match, ParentProps, Switch } from "solid-js"
import Choose from "./choose"
import { mark_training_page, set_training_state, training_state } from "./training-state"
import TrainAuto from "./train-auto"
import CrawlTree from "./crawl-tree"

interface p {
  firstTime?: boolean
  bot_id: string
}
const BotTrainer = ({firstTime = true}:p) => {

  if (firstTime) set_training_state("choose")

  return (
    <>
      <div>
        <Switch>
          <Match when={training_state() === "choose"}>
            <Wrap>
              <Choose/>
            </Wrap>
          </Match>
          <Match when={training_state() === "auto"}>
            <Wrap>
              <TrainAuto/>
            </Wrap>
          </Match>
          <Match when={training_state() === "tree"}>
            <Wrap>
              <CrawlTree/>
            </Wrap>
          </Match>
        </Switch>

      </div>
    </>
  )
}

const Wrap = (p:ParentProps) => <div {...mark_training_page()}>{p.children}</div>

export default BotTrainer
