import { useNavigate, usePreloadRoute } from "@solidjs/router"
import { JSXElement } from "solid-js"
import { routeChangeTransition } from "~/lib/signal"

const TA = (props: any):JSXElement => {

  const nv = useNavigate()
  const pr = usePreloadRoute()

  const handleClick = (e:MouseEvent) => {
    e.preventDefault()
    routeChangeTransition(() => {
      nv(props.href)
    })
  }

  const handleHover = () => {
    pr(props.href)
  }

  return (
    <a {...props} onclick={handleClick} onpointerenter={handleHover}>{props.children}</a>
  )
}

export default TA
