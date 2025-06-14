import { animate, AnimationOptions, DOMKeyframesDefinition } from "motion"
import { onMount, ParentProps } from "solid-js";

interface props {
  animate?: DOMKeyframesDefinition
  options?: AnimationOptions
}
const Motion = (props:ParentProps<props>) => {
  let ref!:HTMLDivElement;

  onMount(() => {
    props.animate && animate(ref, props.animate, props.options)
  })

  return (
    <span ref={ref}>{props.children}</span>
  )
}

export default Motion
