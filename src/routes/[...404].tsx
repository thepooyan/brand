import { HttpStatusCode } from "@solidjs/start";
import TA from "~/components/parts/TA";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <>
      <HttpStatusCode code={404} />
      <div class="min-h-screen bg-background flex items-center justify-center px-4">
        <div class="max-w-md w-full text-center space-y-8">
          <div class="space-y-4">
            <h1 class="text-9xl font-bold text-foreground/10">404</h1>
            <h2 class="text-3xl font-bold text-foreground">صفحه یافت نشد</h2>
            <p class="text-muted-foreground text-lg leading-relaxed">
              صفحه ای که به دنبال آن میگردید وجود ندارد یا به آدرس دیگری منتقل
              شده است
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" as={TA} href="/">
              خانه
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
