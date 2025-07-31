import { useParams } from "@solidjs/router"
import MinimalChat from "~/components/parts/chat/MinimalChat"

const testbot = () => {

  const {id} = useParams()
  console.log(id)

  return (
    <div>
      <MinimalChat/>
    </div>
  )
}

export default testbot
