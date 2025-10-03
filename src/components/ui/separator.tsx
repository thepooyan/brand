import { JSX } from "solid-js"

interface SeparatorProps extends JSX.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

export function Separator(props: SeparatorProps) {
  const { orientation = "horizontal", class: className, ...rest } = props
  return (
    <div
      role="separator"
      class={`shrink-0 bg-border ${
        orientation === "vertical" ? "w-px h-full" : "h-px w-full"
      } ${className ?? ""}`}
      {...rest}
    />
  )
}

