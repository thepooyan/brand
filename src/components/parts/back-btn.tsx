import { FiArrowLeft } from "solid-icons/fi"
import { Button } from "../ui/button"
import TA from "./TA"

interface props {
  href: string
  class?: string
  navigatorHook?: () => (to: string) => void
}
const BackBtn = ({href, ...props}:props) => {
  return (
    <Button
      size="sm"
      variant="secondary"
      as={TA}
      href={href}
      {...props}
    >
      بازگشت
      <FiArrowLeft/>
    </Button>
  )
}

export default BackBtn
