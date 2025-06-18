import { createSignal, Signal } from "solid-js"

export const transitionID = (name: string) => ({style: {"view-transition-name": name}})

export const transition = (callback: ()=>void, cleanup?: () => void) => {
  if (document.startViewTransition) 
    document.startViewTransition(callback).finished.then(() => {
      cleanup && cleanup()
    })
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

export class viewTransition<T> {
  name: string
  signal: Signal<T>
  que: Signal<boolean>

  constructor(name: string, T: T) {
    this.name = name
    this.signal = createSignal(T)
    this.que = createSignal(false)
    this.middleSetter = this.middleSetter.bind(this)
  }
  getAccessor() {
    return this.signal[0]
  }
  middleSetter(arg: setterArg<T>) {
    this.que[1](true)
    transition(() => {
      this.signal[1](arg)
    }, () => {
      this.que[1](false)
    })
  }
  getSetter() {
    return this.middleSetter
  }
  markElement() {
    //replace this with transition ID and see if it works
    return {style: {"view-transition-name": this.que[0]() ? this.name : ""}}
  }
}
