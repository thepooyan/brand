import { type ClassValue, clsx } from "clsx"
import { Accessor, createSignal, Setter } from "solid-js"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const wait = async (amount: number) => {
  await new Promise(res => setTimeout(res, amount))
}


export class Timer {
  initialTime: number
  jump = 1000
  timeOut: NodeJS.Timeout | undefined
  accessor: Accessor<number>
  setter: Setter<number>

  constructor(initialTime: number) {
    this.initialTime = initialTime

    let [a, b] = createSignal(initialTime)
    this.accessor = a
    this.setter = b
  }

  start() {
    this.timeOut = setInterval(() => {
      if (this.accessor() === 0) return this.done()
      this.setter(prev => prev - 1)
    }, this.jump)
  }

  reset() {
    this.setter(this.initialTime)
  }

  restart() {
    this.done()
    this.reset()
    this.start()
  }

  done() {
    clearTimeout(this.timeOut)
  }

  getAccessor() {
    return this.accessor
  }
}

export const transitionID = (name: string) => ({style: {"view-transition-name": name}})

export const transition = (callback: ()=>void) => {
  if (document.startViewTransition) 
    document.startViewTransition(callback)
  else callback()
}
