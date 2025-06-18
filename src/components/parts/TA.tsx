import {  usePreloadRoute } from "@solidjs/router"
import { JSXElement } from "solid-js"
import { useTransitiveNavigate } from "~/lib/routeChangeTransition"

const TA = (props: any):JSXElement => {

  const nv = useTransitiveNavigate()
  const pr = usePreloadRoute()

  const handleClick = (e:MouseEvent) => {
    e.preventDefault()
    nv(props.href)
  }

  const handleHover = () => {
    pr(props.href)
  }

  return (
    <a {...props} onclick={handleClick} onpointerenter={handleHover}>{props.children}</a>
  )
}

export default TA
