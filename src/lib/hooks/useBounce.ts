import { useLocation, useNavigate } from "@solidjs/router"

export const useBounce = () => {
  const nv = useNavigate()
  const location = useLocation()

  const redirect = (to: string) => {
    nv(`${to}?back=${location.pathname}`)
  }

  return redirect
}

export const useBounceBack = () => {
  const loc = useLocation()
  const nv = useNavigate()
  const backAvailable = typeof loc.query.back === "string"

  const returnBack = () => {
    if (typeof loc.query.back === "string") {
      nv(loc.query.back)
    }
  }
  return {returnBack, backAvailable}
}
