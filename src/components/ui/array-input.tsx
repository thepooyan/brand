import { createEffect, createSignal, For } from "solid-js"
import Input from "./input"
import { InputChangeEvent } from "~/db/types"
import { Badge } from "./badge"
import { FiPlus, FiX } from "solid-icons/fi"
import { Button } from "./button"
import { ifEnterPressed } from "~/lib/utils"

interface props {
  onchange?: (value: string[]) => void
  value?: string[]
  disabled?: boolean
  placeholder?: string
  class?: string
}
const ArrayInput = ({onchange, disabled = false, value, ...props}:props) => {

  const [strValue, setStrValue] = createSignal("")
  const [val, setValue] = createSignal<string[]>(value || [])

  onchange &&
  createEffect(() => onchange(val()))

  const flush = () => {
    let newval = strValue()
    if (val().includes(newval)) return
    if (!newval) return
    setValue(prev => ([...prev, newval]))
    setStrValue("")
  }
  const deleteItem = (v: string) => setValue(prev => prev.filter(f => f !== v))

  return (
    <>
      <div class="flex gap-2 mt-2">
        <Input
          name=""
          value={strValue()}
          onKeyUp={ (e:InputChangeEvent) => setStrValue(e.currentTarget.value)}
          onkeypress={ifEnterPressed(flush)}
          placeholder={props.placeholder}
          disabled={disabled}
          class={props.class}
        />
        <Button onClick={flush} disabled={disabled} type="button">
          <FiPlus/>
        </Button>
      </div>
      <div class="space-y-1 py-2">
        <For each={val()}>
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
