import { createSignal } from "solid-js"
import Input from "./input"

interface p {
  initialValue?: string
}
const ColorPicker = ({initialValue}:p) => {

  const [value, setValue] = createSignal(initialValue || "")

  return (
    <div class="relative">
      <input type="color" value={value()} onchange={e => setValue(e.currentTarget.value)}
        class="absolute left-1 top-1 bottom-1 h-auto rounded"
      />
      <Input value={value()} class="ltr indent-8"/>
    </div>
  )
}

export default ColorPicker
