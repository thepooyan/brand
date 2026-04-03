import { AiFillBuild } from "solid-icons/ai";
import { FiCode, FiLoader, FiPhone } from "solid-icons/fi";
import { ImMakeGroup } from "solid-icons/im";
import { children, ParentProps } from "solid-js";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Check from "~/components/ui/check";

export const chat_sources = [
  "telegram",
  "widget",
  "api",
  "website",
] as const

export type chat_sources = typeof chat_sources[number]

export type message = {
  role: "user" | "assistant" | "system",
  content: string
};

export interface timedMessage extends message {
  timestamp: Date
}

export const order_status = [
  "pending",
  "in-call-line",
  "making",
  "done",
] as const

export const order_status_fa = (o: order_status) => {
  const B = ({children}:ParentProps) => <Badge variant="secondary" class="flex gap-2 mt-2">{children}</Badge>
  switch (o) {
    case "pending":
      return <B><FiLoader/>در انتظار بررسی </B>
    case "in-call-line":
      return <B><FiPhone/> در صف تماس</B>
    case "making":
      return <B><FiCode/> در حال ساخت</B>
    case "done":
      return <B><Check/>ساخت به پایان رسیده</B>
    default:
    throw new Error("وضعیت تعریف نشده: ", o)
  }

}

export type order_status = typeof order_status[number]
