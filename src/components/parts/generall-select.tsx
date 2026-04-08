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

    const [val, setValue] = createSignal<label>(options.find(o => o.value === value)?.label || "")

    const changeHandler = (e: label | null) => {
      console.log("change")
      if (!e) return
      let newValue = options.find(o => o.label === e)!
      setValue(e)
      onchange && onchange(newValue.value)
    }

    return (
      <Select
          value={val()}
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
