export function Loading() {
  return (
    <div class="flex min-h-screen items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <div class="relative h-12 w-12">
          <div class="absolute inset-0 rounded-full border-2 border-border"></div>
          <div class="absolute inset-0 animate-spin rounded-full border-2 border-accent border-t-white"></div>
        </div>
        <p class="text-sm text-muted-foreground">لطفا صبر کنید...</p>
      </div>
    </div>
  )
}

