import GenerallSelect from "../parts/generall-select"
import { selectedMounth, setSelectedMounth } from "./plan-signal"
import { planDiscountMap, planMounthOptions } from "~/sections/plan"

const MounthSelectDropdown = () => {
  return (
    <M value={selectedMounth()} onchange={e => setSelectedMounth(e)}/>
  )
}

const discountString = (m: number) => {
  let dis = planDiscountMap.get(m)
  if (!dis) return ""
  return `(${dis.toLocaleString("fa-IR")}% تخفیف)`
}

const M = GenerallSelect([
  ...planMounthOptions.map(m => ({
    label: `${m.toLocaleString("fa-IR")} ماهه ${discountString(m)}`,
    value: m
  })),
])

export default MounthSelectDropdown
