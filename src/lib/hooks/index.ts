import { usePreloadRoute } from "@solidjs/router"
import { Accessor, createSignal } from "solid-js"

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

type predicate<T> = (value: T) => boolean
export type filterOptions<T> = {[key: string]: predicate<T>}

export const useFilter = <D>(data: Accessor<D[]>, filterOptions: filterOptions<D>) => {

  const noFilter: filterOptions<D> = {"": () => true}
  const allFilters:filterOptions<D> = {...noFilter, ...filterOptions}

  const [filter, setter] = createSignal<keyof typeof allFilters>("")

  const setFilter = (filterName: keyof filterOptions<D> | "") => setter(filterName as string)
  
  const filtered = () => data().filter( allFilters[filter()] )

  return {filtered, setFilter, activeFilter: filter, allFilters}
}

export type filterHook<D> = ReturnType<typeof useFilter<D>>
