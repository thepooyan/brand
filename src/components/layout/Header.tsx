import { A } from "@solidjs/router"
import { Button } from "../ui/button"
import { name } from "../../../config/config"
import MobileMenu from "../parts/MobileMenu"
import { FiMenu } from "solid-icons/fi"
import { createResource, createSignal, Show } from "solid-js"
import TA from "../parts/TA"
import { clearAuthSession, getAuthSession } from "~/lib/session"

const Header = () => {

  const [user, {refetch}] = createResource(getAuthSession)
  const [isOpen, setOpen] = createSignal(false)

  const logout = async () => {
    await clearAuthSession()
    refetch()
  }

  return (
    <>
      <header class="border-b border-border">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-full bg-primary animate-ping duration-2000 ease-out"></div>
            <TA class="text-xl font-bold" href="/">{name}</TA>
          </div>
          <nav class="hidden md:flex items-center gap-6">
            <A href="#services" class="text-sm font-medium hover:text-primary transition-colors">
              خدمات
            </A>
            <TA href="/About" class="text-sm font-medium hover:text-primary transition-colors">
              درباره ما
            </TA>
            <A href="#contact" class="text-sm font-medium hover:text-primary transition-colors">
              تماس با ما
            </A>
            <Show when={user() !== undefined}>
              <Button class="bg-red-700 text-white hover:bg-red-900" onclick={logout}>خروج</Button>
            </Show>
            <Show when={user() === undefined}>
              <Button variant="outline" class="border-primary text-primary hover:bg-primary/10" as={TA} href="/Login">
                ورود
              </Button>
            </Show>
            <Button class="bg-primary hover:bg-primary/90 text-primary-foreground">شروع کنید</Button>
          </nav>
          <Button variant="outline" size="icon" class="md:hidden" onclick={() => setOpen(prev => !prev)}>
            <span class="sr-only">تغییر منو</span>
            <FiMenu/>
          </Button>
        </div>
        <MobileMenu isOpen={isOpen} setOpen={setOpen}/>
      </header>
    </>
  )
}

export default Header
