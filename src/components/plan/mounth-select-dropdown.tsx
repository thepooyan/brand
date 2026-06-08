import GenerallSelect from "../parts/generall-select"
import { selectedMounth, setSelectedMounth } from "./plan-signal"

const MounthSelectDropdown = () => {
  return (
    <M value={selectedMounth()} onchange={e => setSelectedMounth(e)}/>
  )
}

const M = GenerallSelect([
  {label: "یک ماهه", value: 1},
  {label: "دو ماهه (3% تخفیف)", value: 2},
  {label: "سه ماهه (5% تخفیف)", value: 3},
])

export default MounthSelectDropdown
