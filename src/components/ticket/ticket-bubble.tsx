import { cn } from "~/lib/utils"

interface p {
  msg: string
  from: "user" | "admin"
}
const TicketBubble = ({msg, from}:p) => {
  return (
    <div
      class={cn(
        "bg-stone-800 rounded-md mb-4 p-3 w-4/5",
        from === "admin" && "mr-auto"
      )}
    >
      {msg}
    </div>
  )
}

export default TicketBubble
