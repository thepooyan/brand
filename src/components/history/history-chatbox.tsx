import { For } from "solid-js"
import Message from "../parts/chat/Message"
import { timedMessage } from "~/db/constants"

interface p {
  messages: timedMessage[]
}
const HistoryChatbox = ({messages}:p) => {
  return (
    <div class="space-y-2 h-[calc(100dvh-17rem)] overflow-auto">
      <For each={messages}>
        {m => <Message isUser={m.role === "user"}
          timestamp={new Date(m.timestamp).toLocaleTimeString("fa-IR", {hour: "2-digit", minute: "2-digit"})}
        >{m.content}</Message>}
      </For>
    </div>
  )
}

export default HistoryChatbox
