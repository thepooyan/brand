import { createAsync, usePreloadRoute } from "@solidjs/router"
import { userQueryRedirect } from "./signal"
import { useTransitiveNavigate } from "./routeChangeTransition"

export const useGetUserRedirect = () => {
  let user =  createAsync(() => userQueryRedirect())
  const nv = useTransitiveNavigate()

  if (!user()) nv("/Login")
  return user
}

export const preload = (route: string, ...more: string[]) => {
  const pr = usePreloadRoute()
  pr(route, {preloadData: true})
  more.forEach(m => pr(m, {preloadData: true}))
}
