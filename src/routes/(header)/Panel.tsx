import { ParentProps } from "solid-js"
import TA from "~/components/parts/TA"

const Panel = ({children}:ParentProps) => {
  return (
    <main class="p-3" >
      <div class=" border-1 m-4 rounded w-max mx-auto overflow-hidden ">
        <I href="/Panel">داشبورد</I>
        <I href="/Panel/Profile">پروفایل</I>
        <I href="/Panel/Place-order">ثبت سفارش</I>
        <I href="/Panel/Order-status">وضعیت سفارش</I>
      </div>
      {children}
    </main>
  )
}

const I = ({href, children}:ParentProps<{href: string}>) => {
  return <TA href={href}
    class="px-5 py-3 inline-block"
    activeClass="bg-zinc-800"
  >
    {children}
  </TA>
}

export default Panel
