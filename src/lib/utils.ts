import { type ClassValue, clsx } from "clsx"
import { Accessor, createSignal, Setter } from "solid-js"
import { memo } from "solid-js/web"
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

type func = () => void
export class CallbackStore {
  private yes: func | null = null
  private no: func | null = null
  setYes(callback: ()=>void) {
    this.yes = callback
  }
  setNo(callback: ()=>void) {
    this.no = callback
  }
  callYes() {
    this.yes && this.yes()
    this.clear()
  }
  callNo() {
    this.no && this.no()
    this.clear()
  }
  private clear() {
    this.yes = null
    this.no = null
  }
}

export const buffer = () => {
  let isTyping = false;
  const queue: string[] = [];

  const processQueue = (element: HTMLDivElement) => {
    if (queue.length === 0 || isTyping) return;
    
    const str = queue.shift();
    if (!str) return;

    let index = 0;
    isTyping = true;

    const type = () => {
      if (index < str.length) {
        element.textContent += str[index];
        index++;
        setTimeout(type, 10);
      } else {
        isTyping = false;
        processQueue(element);
      }
    };

    type();
  };

  const init = (str: string, element: HTMLDivElement) => {
    if (typeof str !== 'string' || str.length === 0) return;
    
    queue.push(str);
    processQueue(element);
  };

  return { init };
};
