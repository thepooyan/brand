import { usePreloadRoute } from "@solidjs/router"
import { createSignal } from "solid-js"

export const preload = (route: string, ...more: string[]) => {
  const pr = usePreloadRoute()
  pr(route, {preloadData: true})
  more.forEach(m => pr(m, {preloadData: true}))
}

export const useToggle = (initial?: number) => {
  const [active, setActive] = createSignal(initial)

  const activate = (id: number) => {
    setActive(id)
  }

  const isActive = (id: number) => {
    return active() === id
  }

  return {activate, isActive}
}
