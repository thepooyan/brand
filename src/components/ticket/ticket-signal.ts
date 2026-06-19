import { useViewTransition } from "~/lib/viewTransition"

type ticketPageState = "dashboard" | "new"
export const [ticketState, setTicketState, markTicketPage] = useViewTransition<ticketPageState>("panelPage","dashboard")

export const ticket_subjects = [
  "چت‌بات",
  "سفارش وبسایت",
  "مشکلات پنل کاربری",
  "انتقادات یا پیشنهادات",
  "سایر",
]
