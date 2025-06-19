import { ParentProps } from "solid-js"
import TA from "~/components/parts/TA"

const Panel = ({children}:ParentProps) => {
  return (
    <main >
      <div class=" border-1 m-4 rounded w-max mx-auto overflow-hidden ">
        <I href="/Panel">داشبورد</I>
        <I href="/Panel/Profile">پروفایل</I>
      </div>
      <div class="p-4 border-1 bg-zinc-800 rounded m-4">
        {children}
      </div>
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
