import { createSignal } from "solid-js"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select"

interface p {
  onchange?: (e: string) => void
  initialValue?: string
}
const UserSearchSelect = ({ onchange, initialValue }:p) => {

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
        options={["نام", "شماره"]}
        placeholder="جستجو بر اساس"
        itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>}
      
    >
        <SelectTrigger class="w-40">
            <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
        </SelectTrigger>
        <SelectContent />
    </Select>
  )
}

export default UserSearchSelect

