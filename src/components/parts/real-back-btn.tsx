import { FiArrowLeft } from "solid-icons/fi"
import { Button, ButtonProps } from "../ui/button"

type props = {
  class?: string
  navigatorHook?: () => (to: string) => void
  size?: ButtonProps["size"]
  variant?: ButtonProps["variant"]
}
const RealBackBtn = (p:props) => {

  const handleClick = () => {
    window.history.back()
  }

  return (
    <Button
      size={p.size || "sm"}
      variant={p.variant || "secondary"}
      onClick={handleClick}
      {...p}
    >
      بازگشت
      <FiArrowLeft/>
    </Button>
  )
}

export default RealBackBtn
