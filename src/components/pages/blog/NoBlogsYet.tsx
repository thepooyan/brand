import { Button } from "@/components/ui/button"
import { FaRegularFaceSadCry } from "solid-icons/fa"
import TA from "~/components/parts/TA"

export default function NoBlogsYet() {
  return (
    <div class="min-h-screen bg-background flex items-center justify-center px-4">
      <div class="max-w-md w-full text-center space-y-8">
        <div class="space-y-4">
          <h1 class="text-9xl font-bold text-foreground/10 flex justify-center"><FaRegularFaceSadCry/></h1>
          <h2 class="text-3xl font-bold text-foreground">بلاگی وجود ندارد!</h2>
          <p class="text-muted-foreground text-lg leading-relaxed">
            متاسفانه هنوز مطلبی در این صفحه قرار داده نشده است
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" as={TA} href="/">
            بازگشت به خانه
          </Button>
        </div>
      </div>
    </div>
  )
}

