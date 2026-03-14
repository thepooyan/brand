import { createSignal } from "solid-js"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select"
import { ticket_subjects } from "./ticket-signal"

interface p {
  onchange?: (e: string) => void
  initialValue?: string
}
const TicketSubjectSelect = ({ onchange, initialValue }:p) => {

  const [value, setValue] = createSignal(initialValue || "")

  const changeHandler = (e: string | null) => {
    if (!e) return
    setValue(e)
    onchange && onchange(e)
  }

  return (
    <>
    <input hidden value={value()} name="category" type="text"/>
    <Select
        value={value()}
        onChange={changeHandler}
        options={ticket_subjects}
        placeholder="موضوع تیکت"
        itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>}
    >
        <SelectTrigger>
            <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
        </SelectTrigger>
        <SelectContent />
    </Select>
    </>
  )
}

export default TicketSubjectSelect
