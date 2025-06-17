import { A } from "@solidjs/router"
import { Button } from "../ui/button"
import { name } from "../../../config/config"
import MobileMenu from "../parts/MobileMenu"
import { FiMenu } from "solid-icons/fi"
import { createSignal } from "solid-js"

const Header = () => {

  const [isOpen, setOpen] = createSignal(false)

  return (
    <>
      <header class="border-b border-border">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-full bg-primary animate-ping duration-2000 ease-out"></div>
            <span class="text-xl font-bold">{name}</span>
          </div>
          <nav class="hidden md:flex items-center gap-6">
            <A href="#services" class="text-sm font-medium hover:text-primary transition-colors">
              خدمات
            </A>
            <A href="#about" class="text-sm font-medium hover:text-primary transition-colors">
              درباره ما
            </A>
            <A href="#contact" class="text-sm font-medium hover:text-primary transition-colors">
              تماس با ما
            </A>
            <Button variant="outline" class="border-primary text-primary hover:bg-primary/10" as="A" href="/Login">
              ورود
            </Button>
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
