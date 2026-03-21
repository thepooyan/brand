import { type ClassValue, clsx } from "clsx"
import { Accessor, createSignal, Setter } from "solid-js"
import { twMerge } from "tailwind-merge"
import { DB_Plan } from "~/db/schema"
import { resolveError } from "./errorHandler"

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

export const orPlaceholder = (image: string | null | undefined) => image || "/placeholder.svg"

export const readableDate = (date: string) => {
  return new Date(date).toLocaleDateString("fa", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const limitChar = (string: string, limit: number) => {
  if (string.length < limit) return string
  return string.substring(0, limit-3) + "..."
}

export const createBlogFullUrl = (blogSlug: string) => {
  return `https://Hooshbaan.com/Blog/${encodeURIComponent(blogSlug)}`
}

export async function copyToClipboard(text: string): Promise<void> {
    if (!navigator.clipboard) {
        // Fallback for browsers that do not support the Clipboard API
        fallbackCopyTextToClipboard(text);
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Failed to copy text to clipboard:', err);
        // Fallback in case of error
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('Fallback: Text copied to clipboard successfully!');
        } else {
            console.error('Fallback: Failed to copy text to clipboard.');
        }
    } catch (err) {
        console.error('Fallback: Error copying text to clipboard:', err);
    }
    
    document.body.removeChild(textArea);
}

export const seprateByComma = (num: number) => {
  return num.toLocaleString("fa")
}

export const daysRemaining = (targetDate: string | Date): number => {
  const now = new Date();
  const target = new Date(targetDate);
  const diffMs = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}

export const calcMessageCount = (p: DB_Plan) => p.remainingMessages > p.messageCount ? p.remainingMessages : p.messageCount

export const calcMessagePercent = (p: DB_Plan) => {
  return Math.round(p.remainingMessages / calcMessageCount(p) * 100)
}

export const safe = async <T>(fn: Promise<T>): Promise<{ok: true, data: T} | {ok: false, msg: string}> => {
  try {
    const data = await fn
    return {ok: true, data: data }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    return { ok: false, msg: message }
  }
}

export const safeDb = async <T>(fn: Promise<T>): Promise<{ok: true, data: T} | {ok: false, msg: string}> => {
  try {
    return {ok: true, data: await fn }
  } catch (e) {
    return { ok: false, msg: resolveError(e) }
  }
}

export const safeDb2 = async <T>(fn: Promise<T>): Promise<{ok: true, data: T, msg: undefined} | {ok: false, msg: string, data: undefined}> => {
  try {
    return {ok: true, data: await fn , msg: undefined}
  } catch (e) {
    return { ok: false, msg: resolveError(e) , data: undefined}
  }
}

export const ifEnterPressed = (callback: (e: KeyboardEvent) => void) => (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault()
    callback(e)
  }
}

export const getUserNickname = (userIP: string) => userIP
