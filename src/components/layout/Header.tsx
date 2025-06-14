import { A } from "@solidjs/router"
import { Button } from "../ui/button"
import { name } from "../../../config/config"

const Header = () => {
  return (
    <>
      <header class="border-b border-border">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-full bg-primary"></div>
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
            <Button variant="outline" class="border-primary text-primary hover:bg-primary/10">
              ورود
            </Button>
            <Button class="bg-primary hover:bg-primary/90 text-primary-foreground">شروع کنید</Button>
          </nav>
          <Button variant="ghost" size="icon" class="md:hidden">
            <span class="sr-only">تغییر منو</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-Width="2"
              stroke-Linecap="round"
              stroke-Linejoin="round"
              class="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
    </>
  )
}

export default Header
