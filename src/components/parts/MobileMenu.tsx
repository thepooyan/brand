import { Accessor, ParentProps, Setter } from "solid-js"
import { A } from "@solidjs/router"
import clsx from "clsx"

interface props {
  isOpen: Accessor<boolean>,
  setOpen: Setter<boolean>
}
const MobileMenu = ({isOpen, setOpen}:props) => {

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
      </div>
      <div class={clsx("fixed bg-black w-2/5 h-full top-0 z-100 opacity-0 invisible transition-all duration-200",
        isOpen() && "opacity-90 visible"
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
