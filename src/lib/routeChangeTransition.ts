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
