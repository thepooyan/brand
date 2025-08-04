import { Button } from "../ui/button"
import { name } from "../../../config/config"
import TA from "../parts/TA"

const About = () => {
  return (
    <>
      <section id="about" class="py-20">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
              <h2 class="text-3xl md:text-4xl font-bold mb-6">درباره {name}</h2>
              <p class="text-muted-foreground mb-6">
                {name} یک آژانس دیجیتال آینده‌نگر است که به کمک کسب و کارها در هدایت فضای پیچیده دیجیتال اختصاص دارد. ما
                خلاقیت، فناوری و استراتژی را ترکیب می‌کنیم تا نتایج استثنایی ارائه دهیم.
              </p>
              <p class="text-muted-foreground mb-8">
                تیم متخصص ما مشتاق نوآوری و متعهد به ارائه راه‌حل‌های سفارشی است که نیازهای منحصر به فرد کسب و کار شما را
                برآورده می‌کند.
              </p>
              <Button
                as={TA} href="/About"
                class="bg-primary hover:bg-primary/90 text-primary-foreground">داستان ما</Button>
            </div>
            <div class="order-1 md:order-2">
              <div class="h-64 md:h-96 bg-muted rounded-lg">
                <img
                  src="/logo.webp"
                  alt={`درباره ${name}`}
                  class="w-full h-full rounded-lg bg-white  "
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
