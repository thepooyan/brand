import { useLocation, usePreloadRoute } from "@solidjs/router"
import clsx from "clsx"
import { JSX, JSXElement } from "solid-js"
import { useTransitiveNavigate } from "~/lib/routeChangeTransition"

type props = JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
  activeClass?: string
  navigatorHook?: () => (to: string) => void
};
const TA = ({onClick, navigatorHook,...props}:props):JSXElement => {

  const nv = navigatorHook ? navigatorHook() : useTransitiveNavigate()
  const pr = usePreloadRoute()
  const location = useLocation()
  let ref!: HTMLAnchorElement
  
  const isActive = () => {
    if (!props.href) return false
    return location.pathname.endsWith(props.href)
  }

  const handleClick = (e:MouseEvent) => {
    e.preventDefault();
    props.href && nv(props.href);

    if (typeof onClick === "function") 
    onClick && onClick({...e, currentTarget: ref, target: ref})
  }

  const handleHover = () => {
    props.href && pr(props.href, {preloadData: true})
  }

  return (
    <a {...props} onclick={handleClick} onpointerenter={handleHover} ref={ref}
      class={clsx(props.class,
        isActive() && props.activeClass
      )}
    >{props.children}</a>
  )
}

export default TA
