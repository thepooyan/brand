import { AnimationOptions, DOMKeyframesDefinition } from "motion"
import Motion from "./Motion"
import { ParentProps } from "solid-js"

export const Capsule = (animate: DOMKeyframesDefinition, options: AnimationOptions) => {
  return (pr:ParentProps) => {
    return <Motion animate={animate} options={options}>
      {pr.children}
    </Motion>
  }
}
