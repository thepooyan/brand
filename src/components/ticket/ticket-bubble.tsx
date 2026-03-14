import { cn } from "~/lib/utils"

interface p {
  msg: string
  from: "user" | "admin"
}
const TicketBubble = ({msg, from}:p) => {
  return (
    <div
      class={cn(
        "bg-secondary text-secondary-foreground rounded-md mb-4 p-3 w-4/5 border-border border-1",
        from === "admin" && "mr-auto"
      )}
    >
      {msg}
    </div>
  )
}

export default TicketBubble
