import { createAsync } from "@solidjs/router"
import { userQueryRedirect } from "./signal"
import { useTransitiveNavigate } from "./routeChangeTransition"

export const useGetUserRedirect = () => {
  let user =  createAsync(() => userQueryRedirect())
  const nv = useTransitiveNavigate()

  if (!user()) nv("/Login")
  return user
}
