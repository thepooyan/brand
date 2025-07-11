import { CapsuleProps } from "./primitives/Capsule"

interface props {
  delay?: number
}
export const ComeUp = CapsuleProps<props>(pr => ({
  animate: {y: [100, 0], opacity: [0, 100]},
  options: {duration: 1, delay: pr.delay ? pr.delay + 2 : 2, type: "spring"}
}))
