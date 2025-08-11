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

export function CapsuleProps<O extends Record<string, any>>(func: (pr:ParentProps<O>) => {animate: DOMKeyframesDefinition, options: AnimationOptions}) {
  return (pr:ParentProps<O>) => {
    let {animate, options} = func(pr)
    return <Motion animate={animate} options={options}>
      {pr.children}
    </Motion>
  }
}
