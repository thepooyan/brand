import { ParentProps } from "solid-js"
import OptionalTooltip from "./optional-tooltip"

interface p extends ParentProps {
  active?: boolean
}
const UpgradeTooltip = ({ children, active }:p) => {
  return (
    <OptionalTooltip text="لطفا جهت دسترسی به این ویژگی، پلن خود را ارتقا دهید" active={active || false}>
      {children}
    </OptionalTooltip>
  )
}

export default UpgradeTooltip
