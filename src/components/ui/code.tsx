import { cn, copyToClipboard } from "~/lib/utils"
import { Button } from "./button"
import { createSignal } from "solid-js"
import { FiCheck, FiCopy } from "solid-icons/fi"
import PrismParser from "../prism/prism-parser"

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
      <PrismParser lang="javascript">{code}</PrismParser>

      <Button
        class={cn("absolute right-1 top-1 w-19 transition-all gap-2 !bg-background text-foreground",
          copied() && "!bg-success !text-success-foreground w-33"
        )}
        onclick={handleClick}
      >
        <FiCopy/>
        <span>
          <span>
            کپی
          </span>
          <div class={cn(
            "opacity-0 invisible w-0 transition-all center flex-row gap-1 overflow-hidden text-success-foreground inline-flex",
            copied() && "opacity-100 w-12 visible"

          )}>
             شد! <FiCheck/>
          </div>
        </span>
      </Button>
    </div>
  )
}

export default Code
