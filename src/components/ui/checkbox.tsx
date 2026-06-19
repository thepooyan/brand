// import { TbCheck } from "solid-icons/tb"
import { createEffect, createSignal } from "solid-js"
import { cn } from "~/lib/utils"

interface props {
  onchange?: (value: boolean) => void
  value?: boolean
  disabled?: boolean
}
const Checkbox = ({onchange, disabled, value}:props) => {

  const [checked, setChecked] = createSignal(value || false)

  createEffect(() => onchange && onchange(checked()) )
  const TbCheck = (_:{class:string}) => "+"
  
  return (
    <>
      <div
        class={cn("border-border border-1 rounded-sm bg-muted hover:bg-muted/80 box-5 overflow-hidden cursor-pointer ",
          disabled && "opacity-70 pointer-events-none "
        )}
        onclick={() => setChecked(p => !p)}
      >
        <div 
          class={cn(`bg-indigo-600 w-full h-full scale-60 opacity-0 origin-center transition-all p-[2px] flex justify-center items-center`,
            checked() && `scale-100 opacity-100`
          )}
        >
          <TbCheck class="w-full text-white"/>
        </div>
      </div>
    </>
  )
}

export default Checkbox
