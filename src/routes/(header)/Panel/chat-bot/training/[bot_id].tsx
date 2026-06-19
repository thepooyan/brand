import { useParams } from "@solidjs/router"
import BotTrainer from "~/components/sections/training/bot-trainer"

const bot_id = () => {
  const {bot_id} = useParams()

  return (
    <BotTrainer bot_id={bot_id!}/>
  )
}

export default bot_id
