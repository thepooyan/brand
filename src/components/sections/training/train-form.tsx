import BackBtn from "~/components/parts/back-btn"
import { set_training_state } from "./training-state"
import Input from "~/components/ui/input"
import Textarea from "~/components/ui/Textarea"
// import MinimalChat from "~/components/parts/chat/MinimalChat"

const TrainForm = () => {
  return (
    <div class="grid grid-cols-2">
      <div>

      <BackBtn onClick={() => set_training_state("choose")} class=""/>

      <div class="">
        <Input/>
        <Input/>
        <Input/>
        <Input/>
        <Textarea class="col-span-2"/>
      </div>
      </div>

      {/*
        <MinimalChat botId="2"/>
      */}
    </div>
  )
}

export default TrainForm
