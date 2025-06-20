import { query, redirect } from "@solidjs/router"
import { ParentProps } from "solid-js"
import TA from "~/components/parts/TA"
import { getAuthSession } from "~/lib/session"

const checkAuth = query(async () => {
  "use server"
  const auth = await getAuthSession()
  if (!auth) {
    throw redirect("/Login")
  }
}, "checkAuth")

const Panel = ({children}:ParentProps) => {

  checkAuth()

  return (
    <main class="p-3" >
      <div class=" border-1 m-4 rounded w-max mx-auto overflow-hidden ">
        <I href="/Panel">داشبورد</I>
        <I href="/Panel/Profile">پروفایل</I>
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
