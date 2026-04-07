import { Match, Switch } from "solid-js"
import Choose from "./choose"
import { set_training_state, training_state } from "./training-state"
import TrainAuto from "./train-auto"

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
            <Choose/>
          </Match>
          <Match when={training_state() === "auto"}>
            <TrainAuto/>
          </Match>
        </Switch>

      </div>
    </>
  )
}

export default BotTrainer
