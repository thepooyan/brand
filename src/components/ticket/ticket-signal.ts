import { createSignal } from "solid-js"

export type state = "dashboard" | "new"
export const [ticketState, setTicketState] = createSignal<state>("dashboard")

