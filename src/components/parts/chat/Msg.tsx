import { ParentProps } from "solid-js"
import { cn } from "~/lib/utils"

interface props {
  left?: boolean
}
const Msg = ({children, left}:ParentProps<props>) => {
  return (
    <div class={cn("bg-green-800 rounded mb-2 p-2 w-5/6",
      left && "bg-blue-800 mr-auto"
    )}>
      {children}
    </div>
  )
}

export default Msg
