import { usePreloadRoute } from "@solidjs/router"
import { createSignal } from "solid-js"

export const preload = (route: string, ...more: string[]) => {
  const pr = usePreloadRoute()
  pr(route, {preloadData: true})
  more.forEach(m => pr(m, {preloadData: true}))
}

type acceptableToggleTypes = string | number | null | undefined
export const useToggle = <T extends acceptableToggleTypes>(initial?: T) => {
  const [active, setActive] = createSignal<acceptableToggleTypes>(initial)

  const activate = (id: T) => {
    setActive(() => id)
  }

  const isActive = (id: T) => {
    return active() === id
  }

  return {activate, isActive}
}

