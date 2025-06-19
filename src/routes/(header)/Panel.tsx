import { ParentProps } from "solid-js"
import TA from "~/components/parts/TA"

const Panel = ({children}:ParentProps) => {
  return (
    <main >
      <div class=" border-1 border-zinc-300 m-4 rounded ">
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
    class="px-4 py-2 hover:bg-zinc-800 inline-block"
    activeClass="bg-zinc-600"
  >
    {children}
  </TA>
}

export default Panel
