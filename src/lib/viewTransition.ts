import { createSignal } from "solid-js"

export const transitionID = (name: string) => ({style: {"view-transition-name": name}})

export const transition = (callback: ()=>void) => {
  if (document.startViewTransition) 
    document.startViewTransition(callback)
  else callback()
}

type setterArg<T> = (T extends Function ? never : T) | (( prev: T ) => T );

export const transitionSignal = <T>(value: T):[() => T, (v: setterArg<T>)=>void] => {
  let [a , b] = createSignal<T>(value)

  const c = (v: setterArg<T>) => {
    transition(() => b(v))
  }

  return [a,c]
}
