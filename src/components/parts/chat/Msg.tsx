import { ParentProps } from "solid-js"
import { cn } from "~/lib/utils"

interface props {
  left?: boolean
  ref?: HTMLDivElement
}
const Msg = ({children, left, ref}:ParentProps<props>) => {
  return (
    <div class={cn("bg-green-800 rounded mb-2 p-2 w-5/6",
      left && "bg-blue-800 mr-auto"
    )}
      ref={ref}
    >
      {children}
    </div>
  )
}

export default Msg
