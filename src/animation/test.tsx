import { animate } from "motion"
import { onMount, ParentProps } from "solid-js";

interface props {
  animate?: any

}
const Motion = (props:ParentProps<props>) => {
  let ref!:HTMLDivElement;

  onMount(() => {
    props.animate && animate(ref, props.animate)
  })

  return (
    <div ref={ref}>{props.children}</div>
  )
}

export default Motion
