import { FiArrowLeft } from "solid-icons/fi"
import { Button } from "../ui/button"
import TA from "./TA"

type props = {
  href: string
} | {
  onClick: () => void
} & {
  class?: string
  navigatorHook?: () => (to: string) => void
}
const BackBtn = (p:props) => {
  return (
    <Button
      size="sm"
      variant="secondary"
      as={TA}
      {...p}
    >
      بازگشت
      <FiArrowLeft/>
    </Button>
  )
}

export default BackBtn
