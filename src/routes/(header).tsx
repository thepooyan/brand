import { RouteSectionProps } from "@solidjs/router"

const header = (props: RouteSectionProps) => {
  return (
    <div class="min-h-screen flex flex-col relative" dir="rtl">
      {props.children}
    </div>
  )
}

export default header
