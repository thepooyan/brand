import { FiX } from "solid-icons/fi"
import { cn } from "~/lib/utils"

interface p {
  class?: string
  onclick?: () => void
}
const X = (p:p) => {
  return (
    <FiX
      class={cn("text-destructive", p.class)}
      {...p}
    />
  )
}

export default X
