import { FiChevronLeft as ChevronLeft } from "solid-icons/fi"
import { Button } from "../ui/button"
import { ChangeColor } from "~/animation/ChangeColor"
import { Wiggle } from "~/animation/Wiggle"
import IntroStagger from "~/animation/IntroStagger"

const Hero = () => {
  return (
    <>
      <IntroStagger>
        <section class="py-20 md:py-32">

          <div class="container mx-auto px-4 flex flex-col items-center text-center">
            <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6 intro">
              تبدیل ایده‌ها به 
              <ChangeColor>
                <span class="text-primary intro">واقعیت دیجیتال</span>
              </ChangeColor>
            </h1>
            <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 intro">
              ما در خدمات هوش مصنوعی، بازاریابی آنلاین و توسعه وب‌سایت تخصص داریم تا به کسب و کار شما در فضای دیجیتال کمک
              کنیم.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
                <Button class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg intro">
                  شروع کنید
                  <Wiggle>
                    <ChevronLeft class="  h-5 w-5" />
                  </Wiggle>
                </Button>
                <Button variant="outline" class="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg intro">
                  بیشتر بدانید
                </Button>
            </div>
          </div>
        </section>
      </IntroStagger>
    </>
  )
}

export default Hero
