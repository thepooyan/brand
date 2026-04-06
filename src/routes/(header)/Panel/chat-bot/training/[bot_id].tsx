import { useParams } from "@solidjs/router"

const bot_id = () => {
  const {bot_id} = useParams()
  return (
    <div>
      train {bot_id}
    </div>
  )
}

export default bot_id
