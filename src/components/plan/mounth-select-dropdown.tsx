import GenerallSelect from "../parts/generall-select"
import { selectedMounth, setSelectedMounth } from "./plan-signal"

const MounthSelectDropdown = () => {
  return (
    <M value={selectedMounth()} onchange={e => setSelectedMounth(e)}/>
  )
}

const M = GenerallSelect([
  {label: "یک ماهه", value: 1},
  {label: "دو ماهه", value: 2},
  {label: "سه ماهه", value: 3},
])

export default MounthSelectDropdown
