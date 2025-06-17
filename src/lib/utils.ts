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
  time = 0
  jump = 1000
  timeOut: NodeJS.Timeout | undefined
  accessor: Accessor<number>
  setter: Setter<number>

  constructor(amount: number) {
    this.time = amount
    let [a, b] = createSignal(amount)
    this.accessor = a
    this.setter = b
  }

  start() {
    this.timeOut = setInterval(() => {
      this.time -= 1
      this.setter(this.time)
      if (this.time === 0) this.done()
    }, this.jump)
  }

  done() {
    clearTimeout(this.timeOut)
  }

  getAccessor() {
    return this.accessor
  }
}
