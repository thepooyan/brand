import { Button } from "@/components/ui/button"
import { FiArrowLeft, FiFileText } from "solid-icons/fi"
import TA from "~/components/parts/TA"
import { getAdminUser } from "~/lib/signal"

export default function AdminLayout({children}:{children: Element}) {
  getAdminUser()
  return (
    <>
    <style>{`html {overflow: hidden}`}</style>
    <div class="dark min-h-screen bg-background text-foreground">
      {/* Header */}
      <header class="border-b border-border bg-card">
        <div class="flex h-16 items-center justify-between px-6">
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span class="font-mono text-sm font-bold text-primary-foreground">ا</span>
            </div>
            <h1 class="text-xl font-semibold">پنل ادمین</h1>
          </div>
          <Button variant="outline" size="sm" class="gap-2 bg-transparent" as={TA} href="/" >
            بازگشت به سایت
            <FiArrowLeft class="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <div class="flex h-[calc(100vh-4rem)]">
        {/* Left Content Area */}
        <main class="flex-1 overflow-auto ">{children}</main>

        {/* Right Sidebar */}
        <aside class="w-64 border-l border-border bg-card">
          <nav class="p-4">
            <div class="space-y-1">
              <TA
                href="BlogManagment"
                activeClass="!bg-primary text-primary-foreground"
                
                class={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground`}>
                <FiFileText class="h-5 w-5" />
                وبلاگ
              </TA>
            </div>
          </nav>
        </aside>
      </div>
    </div>
    </>
  )
}

