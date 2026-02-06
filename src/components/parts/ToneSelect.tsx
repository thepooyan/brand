import { createSignal } from "solid-js"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select"
import { ToneOptions } from "~/server/llm-generation"

const ToneSelect = () => {

  const [value, setValue] = createSignal("")

  return (
    <Select
        value={value()}
        onChange={setValue}
        options={Object.entries(ToneOptions).map( ([_,b]) => b.label)}
        placeholder="لحن مورد نظر را انتخاب کنید"
        itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>}
    >
        <SelectTrigger>
            <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
        </SelectTrigger>
        <SelectContent />
    </Select>
  )
}

export default ToneSelect
