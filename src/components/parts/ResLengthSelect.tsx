import { createSignal } from "solid-js"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select"
import { ResponseLengthOptions } from "~/lib/planUtil"

interface p {
  onchange?: (e: string) => void
  initialValue?: string
}
const ResLengthSelect = ({ onchange, initialValue }:p) => {

  const [value, setValue] = createSignal(initialValue || "")

  const changeHandler = (e: string | null) => {
    if (!e) return
    setValue(e)
    onchange && onchange(e)
  }

  return (
    <Select
        value={value()}
        onChange={changeHandler}
        options={Object.entries(ResponseLengthOptions).map( ([_,b]) => b.label)}
        placeholder="طول پاسخ مورد نظر را انتخاب کنید"
        itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>}
    >
        <SelectTrigger>
            <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
        </SelectTrigger>
        <SelectContent />
    </Select>
  )
}

export default ResLengthSelect
