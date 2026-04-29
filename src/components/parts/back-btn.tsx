import { FiArrowLeft } from "solid-icons/fi"
import { Button, ButtonProps } from "../ui/button"
import TA from "./TA"

type props = ({ href: string } | { onClick: () => void })
& {
  class?: string
  navigatorHook?: () => (to: string) => void
  size?: ButtonProps["size"]
  variant?: ButtonProps["variant"]
}
const BackBtn = (p:props) => {
  return (
    <Button
      size={p.size || "sm"}
      variant={p.variant || "secondary"}
      as={TA}
      {...p}
    >
      بازگشت
      <FiArrowLeft/>
    </Button>
  )
}

export default BackBtn
