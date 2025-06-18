import { Accessor, createSignal, Setter, Signal } from "solid-js"

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
  groupName: string
  signal: Signal<T>
  que: Signal<boolean>

  constructor(groupName: string, T: T) {
    this.groupName = groupName
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
  markElement(name?: string) {
    //replace this with transition ID and see if it works
    return {style: {"view-transition-name": this.que[0]() ? `${this.groupName}-${name}` : ""}}
  }
}

export function useViewTransition<T>(groupName: string, initial: T):[
  Accessor<T>,
  (arg: setterArg<T>)=>void,
  (name: string) => { style: { "view-transition-name": string } }
] {
  const [state, setState] = createSignal<T>(initial)
  const [que, setQue] = createSignal(false)

  const setWithTransition = (arg: setterArg<T>) => {
    setQue(true)
    transition(() => {
      setState(arg)
    }, () => {
      setQue(false)
    })
  }

  const markElement = (name = "") => ({
    style: {
      "view-transition-name": que() ? `${groupName}-${name}` : ""
    }
  })

  return [state, setWithTransition, markElement]
}

