import { TbCheck } from "solid-icons/tb"
import { createEffect, createSignal } from "solid-js"
import { cn } from "~/lib/utils"

interface props {
  onchange?: (value: boolean) => void
  initialValue?: boolean
}
const Checkbox = ({onchange, initialValue}:props) => {

  const [checked, setChecked] = createSignal(initialValue || false)

  createEffect(() => onchange && onchange(checked()) )
  
  return (
    <>
      <div
        class="border-border border-1 rounded-md bg-stone-600 hover:bg-stone-500 box-5 overflow-hidden cursor-pointer "
        onclick={() => setChecked(p => !p)}
      >
        <div 
          class={cn(`bg-indigo-600 w-full h-full scale-60 opacity-0 origin-center transition-all p-[2px] flex justify-center items-center`,
            checked() && `scale-100 opacity-100`
          )}
        >
          <TbCheck class="w-full"/>
        </div>
      </div>
    </>
  )
}

export default Checkbox
