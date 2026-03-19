import { createEffect, createSignal, For } from "solid-js"
import Input from "./input"
import { InputChangeEvent } from "~/db/types"
import { Badge } from "./badge"
import { FiPlus, FiX } from "solid-icons/fi"
import { Button } from "./button"
import { ifEnterPressed } from "~/lib/utils"
import { callModal } from "../layout/Modal"

interface props {
  onchange?: (value: string[]) => void
  initialValue?: string[]
}
const ArrayInput = ({onchange, initialValue}:props) => {

  const [strValue, setStrValue] = createSignal("")
  const [value, setValue] = createSignal<string[]>(initialValue || [])

  onchange &&
  createEffect(() => onchange(value()))

  const flush = () => {
    if (value().length === 4) return callModal.fail("تعداد سوالات پیشنهاد نمیتواند بیشتر از ۴ عدد باشد.")
    let newval = strValue()
    if (!newval) return
    setValue(prev => ([...prev, newval]))
    setStrValue("")
  }
  const deleteItem = (v: string) => setValue(prev => prev.filter(f => f !== v))

  return (
    <>
      سوالات پیشنهادی:
      <div class="flex gap-2 mt-2">
        <Input
          value={strValue()}
          onkeydown={ (e:InputChangeEvent) => setStrValue(e.currentTarget.value)}
          onkeypress={ifEnterPressed(flush)}
          placeholder="مثال: اطلاعات قیمت"
        />
        <Button onclick={flush}>
          <FiPlus/>
        </Button>
      </div>
      <div class="space-y-1 py-2">
        <For each={value()}>
          {(v) => <Badge
            variant="secondary"
            class="rtl flex gap-2 w-max"
          >
            {v}
            <FiX
              class={`text-destructive hover:bg-destructive
hover:text-destructive-foreground rounded-full cursor-pointer`}
              onclick={() => deleteItem(v)}
            />
          </Badge>}
        </For>
      </div>
    </>
  )
}

export default ArrayInput
