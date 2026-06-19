import { Accessor, createSignal } from "solid-js"
import { isServer } from "solid-js/web"

export const transitionID = (name: string) => ({style: {"view-transition-name": name}})

export const startTransitionFallback = (callback: ()=>void, cleanup?: () => void) => {
  if (isServer) return
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
    startTransitionFallback(() => b(v))
  }

  return [a,c]
}

export function useTransitionMarker(groupName: string):[
  (name?: string) => { style: { "view-transition-name": string } },
  typeof applyTransition
] {
  const [que, setQue] = createSignal(false)

  const applyTransition = (changeTheDOM: ()=>void) => {
    setQue(true)
    startTransitionFallback(() => {
      changeTheDOM()
    }, () => {
      setQue(false)
    })
  }

  const markElement = (name = "") => {
    return transitionID(que() ? name ? `${groupName}-${name}` : groupName : "")
  }

  return [markElement, applyTransition]
}

/** 
 * @returns an array with these elements in order: [signalAccesor, signalSetter, markerFunction]
 * @example
 * const [name, setName, markElement] = useViewTransition("transition-group-1", "someName")
 * name() // returns: someName
 * setName("john") //reactively change the value with a view transition animation 
 * const ele = <div {...markElement("elementName")}></div>
 * //the element marked with {view-transition-name: `${groupName}-{elementName}`} 
 */
export function useViewTransition<T>(groupName: string, initial: T):[
  Accessor<T>,
  (arg: setterArg<T>)=>void,
  (name?: string) => { style: { "view-transition-name": string } }
] {
  const [state, setState] = createSignal<T>(initial)
  const [markElement, applyTransition] = useTransitionMarker(groupName)

  const setWithTransition = (arg: setterArg<T>) => {
    applyTransition(()=> {
      setState(arg)
    })
  }

  return [state, setWithTransition, markElement]
}
