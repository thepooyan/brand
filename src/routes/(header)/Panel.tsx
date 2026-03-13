import { createAsync, query, redirect } from "@solidjs/router"
import { and, eq } from "drizzle-orm"
import { For, ParentProps } from "solid-js"
import TA from "~/components/parts/TA"
import { Button } from "~/components/ui/button"
import { db } from "~/db/db"
import { getAuthSession } from "~/lib/session"
import { getUser } from "~/lib/signal"

type panelItems = {group: string, items: nav[]}[]
type nav = {name: string, href: string}

const panelItems:panelItems = [
  {
    group: "عمومی", items: [
      {name: "داشبورد", href: "dashboard"},
      {name: "پروفایل", href: "Profile"},
    ]
  },
  {
    group: "خدمات", items: [
      {name: "چت‌بات", href: "Chatbot"},
    ]
  },
  {
    group: "پشتیبانی", items: [
      {name: "ثبت تیکت", href: "ticket"},
      {name: "مستندات", href: "/Docs"},
      {name: "تماس", href: "/ContactUs"},
    ]
  },
]

const doesHaveNewTicket = query(async () => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/Panel")
  let userTickets = await db.query.ticketTable.findFirst({
    where: (tbl => and(
      eq(tbl.userId, user.id),
      eq(tbl.isSeen, false)
    ))
  })
  return userTickets !== undefined
}, "doesHaveNewTicket")

const Panel = ({children}:ParentProps) => {

  getUser()
  const newTicket = createAsync(() => doesHaveNewTicket())

  return (
    <main class="flex">
      <div class="flex flex-col w-60 gap-1 p-2 border-border h-[calc(100dvh-108px)] border-l-1">
        <For each={panelItems}>
          {p => <>
            <span class="text-sm text-muted-foreground first-of-type:mt-0 mt-5 ">
              {p.group}
            </span>
            <For each={p.items}>
              {pp => <I href={pp.href}>
                {pp.name}
                {pp.href === "ticket" && newTicket() && <div>new</div>}
              </I>}
            </For>
          </>}
        </For>
      </div>
      <div class="p-3 w-full min-h-full">
        {children}
      </div>
    </main>
  )
}

const I = ({href, children}:ParentProps<{href: string}>) => {
  return <Button as={TA} href={href.startsWith("/") ? href : `/Panel/${href}`}
    variant="outline"
    class="px-5 py-3 inline-block"
    activeClass="bg-zinc-800"
  >
    {children}
  </Button>
}

export default Panel
