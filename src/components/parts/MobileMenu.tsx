import { Accessor, ParentProps, Setter, Show } from "solid-js"
import { A, createAsync } from "@solidjs/router"
import clsx from "clsx"
import { Button } from "../ui/button"
import TA from "./TA"
import { userQuery, logUserOut } from "~/lib/signal"

interface props {
  isOpen: Accessor<boolean>,
  setOpen: Setter<boolean>
}
const MobileMenu = ({isOpen, setOpen}:props) => {

  const user = createAsync(() => userQuery(), {deferStream: true})

  let menuRef!: HTMLDivElement
  let backdropRef!: HTMLDivElement

  return (
    <>
      <div class={clsx("fixed bg-secondary -left-100 h-dvh top-0 flex flex-col w-3/5 z-100 invisible transition-all duration-200",
        isOpen() && "left-0 visible"
      )} ref={menuRef}>
          <L href="#services">
            خدمات
          </L>
          <L href="#about">
            درباره ما
          </L>
          <L href="#contact">
            تماس با ما
          </L>
        <Show when={user() !== undefined}>
          <div class="flex gap-2 mx-auto mt-auto mb-5">

            <Button class="bg-red-700 text-white hover:bg-red-900" onclick={() => {logUserOut();setOpen(false)}}>خروج</Button>
            <Button as={TA} href="/Panel" onclick={()=> {setOpen(false)} } >پنل کاربری</Button>
          </div>
        </Show>
        <Show when={user() === undefined}>
          <Button as={TA} href="/Login" class="w-max mx-auto mt-auto mb-5">
            ورود
          </Button>
        </Show>
      </div>
      <div class={clsx("fixed bg-black w-full h-full top-0  z-99 opacity-0 invisible transition-all duration-200 ",
        isOpen() && "opacity-90 visible blur-[100px]"
      )} ref={backdropRef} onclick={() => setOpen(false)}>
      </div>
    </>
  )
}

const L = ({children, href}:ParentProps<{href: string}>) => {
  return <A href={href}
    class="text-sm font-medium hover:text-primary transition-colors p-4 w-40 z-100"
  >{children}</A>
}

export default MobileMenu
