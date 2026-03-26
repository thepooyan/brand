import { useNavigate } from "@solidjs/router";
import { useTransitionMarker } from "./viewTransition";

export const [pageMarker, routeChangeTransition] = useTransitionMarker("page")

export const useTransitiveNavigate = () => {
  const nv = useNavigate()
  return (to: string) => {
    routeChangeTransition(() => {
      nv(to)
    })
  }
}

export const [panelPageMarker, panelRouteChangeTransition] = useTransitionMarker("panelPage")

export const usePanelTransitiveNavigate = () => {
  const nv = useNavigate()
  return (to: string) => {
    panelRouteChangeTransition(() => {
      nv(to)
    })
  }
}
