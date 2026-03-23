import { For } from "solid-js"
import { timedMessage } from "~/lib/chatUtil"
import Message from "../parts/chat/Message"

interface p {
  messages: timedMessage[]
}
const HistoryChatbox = ({messages}:p) => {
  return (
    <div>
      <For each={messages}>
        {m => <Message isUser={m.role === "user"}
          timestamp={new Date(m.timestamp).toLocaleTimeString("fa-IR", {hour: "2-digit", minute: "2-digit"})}
        >{m.content}</Message>}
      </For>
    </div>
  )
}

export default HistoryChatbox
