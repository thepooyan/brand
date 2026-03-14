import { createSignal } from "solid-js"

type ticketPageState = "dashboard" | "new"
export const [ticketState, setTicketState] = createSignal<ticketPageState>("dashboard")

export const ticket_states = [
  "pending",
  "responded"
] as const

export type TicketStates = typeof ticket_states[number]

export const ticket_subjects = [
  "چت‌بات",
  "سفارش وبسایت",
  "مشکلات پنل کاربری",
  "انتقادات یا پیشنهادات",
  "سایر",
]
