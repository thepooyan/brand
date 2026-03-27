import { createSignal } from "solid-js"
import Input from "./input"
import { ChangeEvent } from "~/lib/interface"

interface p {
  initialValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
}
const ColorPicker = ({initialValue, onChange, disabled}:p) => {

  const [value, setValue] = createSignal(initialValue || "")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    onChange && onChange(e.currentTarget.value)
  }

  return (
    <div class="relative">
      <input type="color" value={value()} onchange={handleChange}
        class="absolute left-1 top-1 bottom-1 h-auto rounded" name="" disabled={disabled}
      />
      <Input value={value()} class="ltr indent-8" name="" disabled={disabled}/>
    </div>
  )
}

export default ColorPicker
