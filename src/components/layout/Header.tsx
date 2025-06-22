import { Button } from "../ui/button"
import { name } from "../../../config/config"
import MobileMenu from "../parts/MobileMenu"
import { FiLogIn, FiMenu, FiUser } from "solid-icons/fi"
import { createSignal, Show } from "solid-js"
import TA from "../parts/TA"
import { clearAuthSession, getAuthSession } from "~/lib/session"
import { createAsync, query, revalidate } from "@solidjs/router"

const Header = () => {

  const authQ = query(() => getAuthSession(), "auth")
  const user = createAsync(() => authQ())
  const [isOpen, setOpen] = createSignal(false)

  const logout = async () => {
    await clearAuthSession()
    revalidate("auth")
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
            <TA href="/Services" class="text-sm font-medium hover:text-primary transition-colors">
              خدمات
            </TA>
            <TA href="/About" class="text-sm font-medium hover:text-primary transition-colors">
              درباره ما
            </TA>
            <TA href="/ContactUs" class="text-sm font-medium hover:text-primary transition-colors">
              تماس با ما
            </TA>
            <Show when={user() !== undefined}>
              <div class="space-x-2">
                <Button class="bg-red-700 text-white hover:bg-red-900" onclick={logout}>خروج</Button>
                <Button as={TA} href="/Panel">پنل کاربری</Button>
              </div>
            </Show>
            <Show when={user() === undefined}>
              <div class="space-x-2">
                <Button variant="outline" class="border-primary text-primary hover:bg-primary/10" as={TA} href="/Login">
                  ورود
                </Button>
                <Button class="bg-primary hover:bg-primary/90 text-primary-foreground">شروع کنید</Button>
              </div>
            </Show>
          </nav>
          <div class="md:hidden space-x-2">
            <Button variant="outline" size="icon" onclick={() => setOpen(prev => !prev)}>
              <span class="sr-only">تغییر منو</span>
              <FiMenu/>
            </Button>
            <Show when={user() === undefined}>
              <Button as={TA} href="/Login">
                <FiLogIn/>
              </Button>
            </Show>
            <Show when={user() !== undefined}>
              <Button as={TA} href="/Panel">
                <FiUser/>
              </Button>
            </Show>
          </div>
        </div>
        <MobileMenu isOpen={isOpen} setOpen={setOpen}/>
      </header>
    </>
  )
}

export default Header
