import {  useLocation, usePreloadRoute } from "@solidjs/router"
import clsx from "clsx"
import { JSXElement } from "solid-js"
import { useTransitiveNavigate } from "~/lib/routeChangeTransition"

const TA = (props: any):JSXElement => {

  const nv = useTransitiveNavigate()
  const pr = usePreloadRoute()
  const location = useLocation()
  
  const isActive = () => {
    return location.pathname.endsWith(props.href)
  }

  const handleClick = (e:MouseEvent) => {
    e.preventDefault()
    nv(props.href)
    props.onclick && props.onclick()
  }

  const handleHover = () => {
    pr(props.href, {preloadData: true})
  }

  return (
    <a {...props} onclick={handleClick} onpointerenter={handleHover}
      class={clsx(props.class,
        isActive() && props.activeClass
      )}
    >{props.children}</a>
  )
}

export default TA
