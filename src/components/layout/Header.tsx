import { Button } from "../ui/button"
import { name, nameEn } from "../../../config/config"
import MobileMenu from "../parts/MobileMenu"
import { FiLogIn, FiMenu, FiUser } from "solid-icons/fi"
import { createSignal, Show } from "solid-js"
import TA from "../parts/TA"
import { logUserOut, useIsLoggedIn } from "~/lib/signal"
import { ROLES } from "~/lib/session"

const Header = () => {

  const isLoggedIn = useIsLoggedIn()
  const [isOpen, setOpen] = createSignal(false)

  const logout = () => {
    logUserOut()
  }

  return (
    <>
      <header class="border-b border-border z-10 bg-black">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="relative w-13 flex justify-center ">
              <div class="h-10 w-10 rounded-full bg-primary animate-ping duration-2000 ease-out"></div>
              <img src="/logo.webp" class="absolute -top-1 rounded-full w-13 " alt={`${nameEn}'s logo`}/>
            </div>
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
            <TA href="/Weblog" class="text-sm font-medium hover:text-primary transition-colors">
              وبلاگ
            </TA>
            <Show when={isLoggedIn()?.role === ROLES.ADMIN}>
              <div class="space-x-2">
                <Button as={TA} href="/Admin">ادمین</Button>
                <Button class="bg-red-700 text-white hover:bg-red-900" onclick={logout}>خروج</Button>
              </div>
            </Show>
            <Show when={isLoggedIn()?.role === ROLES.USER}>
              <div class="space-x-2">
                <Button class="bg-red-700 text-white hover:bg-red-900" onclick={logout}>خروج</Button>
                <Button as={TA} href="/Panel">پنل کاربری</Button>
              </div>
            </Show>
            <Show when={isLoggedIn() === undefined}>
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
            <Show when={isLoggedIn() === undefined}>
              <Button as={TA} href="/Login">
                <FiLogIn/>
              </Button>
            </Show>
            <Show when={isLoggedIn() !== undefined}>
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
