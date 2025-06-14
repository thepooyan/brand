import { ParentProps } from "solid-js"
import Motion from "./Motion"

interface props {
  delay?: number
}
const Appear = (props: ParentProps<props>) => {
  return (
    <Motion
      animate={{y: [100, 0], opacity: [0, 100]}}
      options={{duration: 1, delay: props.delay ? props.delay + 1 : 0, type: "spring"}}
    >{props.children}</Motion>
  )
}

export default Appear
