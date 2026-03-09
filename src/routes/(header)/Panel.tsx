import { For, ParentProps } from "solid-js"
import TA from "~/components/parts/TA"
import { Button } from "~/components/ui/button"

type panelItems = {group: string, items: nav[]}[]
type nav = {name: string, href: string}

const panelItems:panelItems = [
  {group: "عمومی", items: [
    {name: "داشبورد", href: ""},
    {name: "پروفایل", href: "Profile"},
  ]},
  {
    group: "چت‌بات", items: [
      {name: "چت‌بات", href: "Chatbot"},
    ]
  }
]

const Panel = ({children}:ParentProps) => {
  return (
    <main class="flex">
      <div class="flex flex-col w-60 gap-1 p-2 border-border h-dvh border-l-1">
        <For each={panelItems}>
          {p => <>
            <span class="text-sm text-muted-foreground first-of-type:mt-0 mt-5 ">
              {p.group}
            </span>
            <For each={p.items}>
              {pp => <I href={pp.href}>{pp.name}</I>}
            </For>
          </>}
        </For>
      </div>
      <div class="p-3 w-full">
        {children}
      </div>
    </main>
  )
}

const I = ({href, children}:ParentProps<{href: string}>) => {
  return <Button as={TA} href={`/Panel/${href}`}
    variant="outline"
    class="px-5 py-3 inline-block"
    activeClass="bg-zinc-800"
  >
    {children}
  </Button>
}

export default Panel
