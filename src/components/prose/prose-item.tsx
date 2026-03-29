import { ParentProps } from "solid-js"
import { cn } from "~/lib/utils"

interface p extends ParentProps {
  class?: string
}

const ProseItem = (style: string) => (props:p) => {
  return (
    <span
      class={cn(style, props.class)}
    >
      {props.children}
    </span>
  )
}

export const Title = ProseItem("block text-xl font-bold")
export const Muted = ProseItem("block text-sm text-muted-foreground")


export default ProseItem
