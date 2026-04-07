import { cn } from "~/lib/utils"

interface p {
  class?: string
}
export function Loading(p:p) {
  return (
    <div class={cn("flex min-h-screen items-center justify-center", p.class)}>
      <div class="flex flex-col items-center gap-4">
        <div class="relative h-12 w-12">
          <div class="absolute inset-0 rounded-full border-2 border-border"></div>
          <div class="absolute inset-0 animate-spin rounded-full border-2 border-accent border-t-foreground"></div>
        </div>
        <p class="text-sm text-muted-foreground">لطفا صبر کنید...</p>
      </div>
    </div>
  )
}

