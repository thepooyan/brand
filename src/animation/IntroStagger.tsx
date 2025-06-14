import { animate, stagger } from "motion"
import { onMount, ParentProps } from "solid-js"

const IntroStagger = (props: ParentProps) => {
  let ref!: HTMLDivElement

  onMount(() => {
    animate(".intro", 
      {opacity: [0, 100], y: [100, 0], filter: ["blur(6px)", "blur(0px)"]},
      {duration: 3, type: "spring", delay: stagger(.3)},
    )
  })

  return (
    <div ref={ref}>{props.children}</div>
  )
}

export default IntroStagger
