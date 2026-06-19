import BackBtn from "~/components/parts/back-btn"
import { set_training_state } from "./training-state"

const TrainManual = () => {
  return (
    <div>
      <BackBtn onClick={() => set_training_state("choose")}/>
      TrainManual
    </div>
  )
}

export default TrainManual
