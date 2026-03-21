import { useParams } from "@solidjs/router"

const botId = () => {

  const {botId} = useParams()

  return (
    <div>
      {botId}
    </div>
  )
}

export default botId
