import { cn, copyToClipboard } from "~/lib/utils"
import { Button } from "./button"
import { createSignal } from "solid-js"
import { FiCheck } from "solid-icons/fi"

interface p {
  code: string
}
const Code = ({code}:p) => {

  const [copied, setCopied] = createSignal(false)

  const handleClick = () => {
    copyToClipboard(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 4000)
  }

  return (
    <div class="relative">
      <pre>
        {code}
      </pre>

      <Button
        class={cn("absolute right-2 top-2 w-13 transition-all gap-0",
          copied() && "!bg-success !text-success-foreground w-26"
        )}
        onclick={handleClick}
      >
        کپی
        <div class={cn(
          "opacity-0 invisible w-0 transition-all center flex-row gap-1 overflow-hidden text-foreground",
          copied() && "opacity-100 w-12 visible"

        )}>
           شد! <FiCheck/>
        </div>
      </Button>
    </div>
  )
}

export default Code
