import { createSignal } from "solid-js"

export type ticketState = "dashboard" | "new"
export const [ticketState, setTicketState] = createSignal<ticketState>("new")

export type Ticket = {
  subject: string
  content: string
}

