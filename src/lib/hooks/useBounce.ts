import { useLocation, useNavigate } from "@solidjs/router"

export const useBounce = () => {
  const nv = useNavigate()
  const location = useLocation()

  const redirect = (to: string) => {
    nv(`${to}?back=${location.pathname}`)
  }

  return redirect
}
