import { Button } from "../ui/button"
import { name } from "../../../config/config"
import TA from "../parts/TA"
import { Show } from "solid-js"

const About = () => {
  return (
    <>
      <section id="about" class="py-20">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
              <h2 class="text-3xl md:text-4xl font-bold mb-6">درباره {name}</h2>
              <p class="text-muted-foreground mb-6">
در دنیای هوشمند امروزی که هر لحظه در حال تغییر و رشد است، هوش بان همراه شماست تا با تکیه بر قدرت هوش مصنوعی، مسیر رشد واقعی کسب و کار را هموار کند.
              </p>
              <p class="text-muted-foreground mb-6">
در هوش بان، با ترکیب دانش داده و فناوری‌های نوین هوش مصنوعی، راهکار هایی می‌سازیم که فرایندهای تکراری را سریع تر، دقیق تر و هوشمند تر پیش ببرند.
              </p>
              <p class="text-muted-foreground mb-8">
از طراحی چت بات های هوشمند و سیستم های پاسخ‌گویی خودکار گرفته تا تحلیل داده های مشتریان، پیش بینی رفتار بازار و بهینه سازی عملکرد تیم‌ها — همه برای آن است که زمان کمتری صرف ازمون و خطا شود و انرژی بیشتری صرف رشد و نوآوری گردد.
              </p>
              <Show when={false}>
              <Button
                as={TA} href="/About"
                class="bg-primary hover:bg-primary/90 text-primary-foreground">داستان ما</Button>
              </Show>
            </div>
            <div class="order-1 md:order-2">
              <div class="h-64 md:h-96 bg-muted rounded-lg">
                <img
                  src="/logo.webp"
                  alt={`درباره ${name}`}
                  class="w-full h-full rounded-lg bg-white object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default About
