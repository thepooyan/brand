import { Accessor, createSignal } from "solid-js"

type predicate<T> = (value: T) => boolean
export type filterOptions<T> = {[key: string]: predicate<T>}

export const useFilter = <D>(data: Accessor<D[]>, filterOptions: filterOptions<D>) => {

  const noFilter: filterOptions<D> = {"": () => true}
  const allFilters:filterOptions<D> = {...noFilter, ...filterOptions}

  const [filter, setter] = createSignal<keyof typeof allFilters>("")

  const setFilter = (filterName: keyof filterOptions<D> | "") => {
    setter(filterName)
  }
  
  const filtered = () => data().filter( allFilters[filter()] )

  return {filtered, setFilter, activeFilter: filter, allFilters}
}

export type filterHook<D> = ReturnType<typeof useFilter<D>>
