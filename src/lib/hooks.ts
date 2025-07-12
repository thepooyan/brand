import { usePreloadRoute } from "@solidjs/router"

export const preload = (route: string, ...more: string[]) => {
  const pr = usePreloadRoute()
  pr(route, {preloadData: true})
  more.forEach(m => pr(m, {preloadData: true}))
}
