// import { TbCheck } from "solid-icons/tb"
import { TbOutlineCheck } from "solid-icons/tb"
import { createSignal } from "solid-js"
import { cn } from "~/lib/utils"

interface props {
  onchange?: (value: boolean) => void
  value?: () => boolean
  defaultValue?: boolean
  disabled?: boolean
}
const Checkbox = ({onchange, disabled, defaultValue, ...props}:props) => {

  const [checked, setChecked] = createSignal(defaultValue ?? false)
  const value = () => props.value?.() ?? checked()

  const flip = () => {
    const newValue = !value()
    if (!props.value) {
      setChecked(newValue)
    }
    onchange?.(newValue)
  }

  
  return (
    <>
      <div
        class={cn("border-border border-1 rounded-sm bg-muted hover:bg-muted/80 box-5 overflow-hidden cursor-pointer ",
          disabled && "opacity-70 pointer-events-none "
        )}
        onclick={flip}
      >
        <div 
          class={cn(`bg-indigo-600 w-full h-full scale-60 opacity-0 origin-center transition-all p-[2px] flex justify-center items-center`,
            value() && `scale-100 opacity-100`
          )}
        >
          <TbOutlineCheck class="w-full text-white"/>
        </div>
      </div>
    </>
  )
}

export default Checkbox
