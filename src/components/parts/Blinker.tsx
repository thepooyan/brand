import { cn } from "~/lib/utils"

interface p {
  class: string
}
const Blinker = (props:p) => {
  return (
    <div
      class={cn("bg-primary w-2 h-2 rounded-full flex justify-center items-center", props.class)}
    >
      <div
        class="bg-primary w-3 h-3 rounded-full animate-ping absolute"
      ></div>

    </div>
  )
}

export default Blinker
