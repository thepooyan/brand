import { createSignal } from "solid-js"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select"

type option<T> = {label: string, value: T}
function GenerallSelect<T>(options: option<T>[]) {
  type label = typeof options[number]["label"]

  interface p {
    onchange?: (e: T) => void
    value?: T
    placeholder?: string
    class?: string
  }

  return ({ onchange, value, placeholder, ...props }:p) => {

    const [val, setValue] = createSignal<option<T> | null>(options.find(o => o.value === value) || null)

    const changeHandler = (e: label | null) => {
      if (!e) return
      let newValue = options.find(o => o.label === e)!
      setValue(() =>  newValue)
      onchange && onchange(newValue.value)
    }

    const getValue = () => {
      return val()?.label || ""
    }

    return (
      <Select
          value={getValue()}
          onChange={changeHandler}
          options={options.map(o => o.label)}
          placeholder={placeholder}
          itemComponent={(props) => <SelectItem item={props.item}>{props.item.textValue}</SelectItem>}
          class={props.class}
      >
          <SelectTrigger>
              <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
          </SelectTrigger>
          <SelectContent />
      </Select>
    )
}
}

export default GenerallSelect
