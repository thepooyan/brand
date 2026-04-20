import { type ClassValue, clsx } from "clsx"
import { Accessor, createSignal, onMount, Setter } from "solid-js"
import { twMerge } from "tailwind-merge"
import { PlanInstance } from "~/db/schema"
import { resolveError } from "./errorHandler"
import { getPlan } from "~/sections/plan"
import { callModal } from "~/components/layout/Modal"
import { Fetch, fetchFail, fetchSuccess, Transaction, transactionFail, transactionSuccess } from "./actionAbstraction"

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

export const calcMessageCount = (p: PlanInstance) => getPlan(p).messageCount

export const calcMessagePercent = (p: PlanInstance) => {
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

export const safeFetch = async <T>(fn: Fetch<T>):Fetch<T> => {
  try {
    return await fn
  } catch (e) {
    return fetchFail(resolveError(e))
  }
}

export const safeDb = async <T>(fn: Promise<T>):Fetch<T> => {
  try {
    return fetchSuccess(await fn)
  } catch (e) {
    return fetchFail(resolveError(e))
  }
}

export const safeDbTransaction = async (fn: Promise<any>):Transaction => {
  try {
    await fn
    return transactionSuccess()
  } catch (e) {
    return transactionFail(resolveError(e))
  }
}

export const ifEnterPressed = (callback: (e: KeyboardEvent) => void) => (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault()
    callback(e)
  }
}

export const getUserNickname = (userIP: string) => userIP

export function filterLastWeek(date: Date | undefined | null): boolean {
  if (!date) return false
  const today = new Date();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return  (date >= sevenDaysAgo && date <= today);
}

export function filterOlderThanLastMonth(date: Date | undefined | null): boolean {
  if (!date) return false
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  // Start of the current month
  const currentMonthStartDate = new Date(year, month, 1);

  return (date < currentMonthStartDate);
}

export function filterToday(date: Date | null | undefined): boolean {
  if (!date) return false
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day

  const dCopy = new Date(date);
  dCopy.setHours(0, 0, 0, 0); // Normalize to start of day
  return dCopy.getTime() === today.getTime();
}

export function filterLastMonth(date: Date | null | undefined): boolean {
  if (!date) return false
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  // Previous month's year and month
  let prevMonthYear = year;
  let prevMonth = month - 1;
  if (prevMonth < 0) {
    prevMonth = 11; // December
    prevMonthYear--;
  }

  const lastMonthStartDate = new Date(prevMonthYear, prevMonth, 1);
  const lastMonthEndDate = new Date(year, month, 0); // Day 0 of current month = last day of previous month

  return (date >= lastMonthStartDate && date <= lastMonthEndDate);
}

export const toEnNumbers = (str: string) => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

  return str.replace(/[۰-۹]/g, d => persianDigits.indexOf(d).toString())
}

export const ifSure = (fn: () => any, msg?: string) => {
  callModal.prompt(msg)
  .yes(() => fn())
}

export const preventDefault = (cb: () => void) => {
  return (e:SubmitEvent) => {
    e.preventDefault()
    cb()
  }
}

export function respondToVisibility(element:Element, callback:() => void, once = false) {
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        callback();
        once && observer.disconnect();
      }
    });
  });
  observer.observe(element);
}
