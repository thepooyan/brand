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

export const H1 = ProseItem("flex gap-1 text-3xl font-bold")
export const H2 = ProseItem("flex gap-1 text-2xl font-bold")
export const H3 = ProseItem("flex gap-1 text-xl font-bold")
export const Muted = ProseItem("flex gap-1 text-sm text-muted-foreground")


export default ProseItem
