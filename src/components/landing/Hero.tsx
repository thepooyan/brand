import { FiChevronLeft as ChevronLeft } from "solid-icons/fi"
import { Button } from "../ui/button"
import Motion from "~/animation/test"

const Hero = () => {
  return (
    <>
      <Motion animate={{opacity: [0,1]}} options={{duration: 4}}>
        <section class="py-20 md:py-32">

          <div class="container mx-auto px-4 flex flex-col items-center text-center">
            <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              تبدیل ایده‌ها به <span class="text-primary">واقعیت دیجیتال</span>
            </h1>
            <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
              ما در خدمات هوش مصنوعی، بازاریابی آنلاین و توسعه وب‌سایت تخصص داریم تا به کسب و کار شما در فضای دیجیتال کمک
              کنیم.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <Button class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                شروع کنید
                <ChevronLeft class="mr-2 h-5 w-5" />
              </Button>
              <Button variant="outline" class="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg">
                بیشتر بدانید
              </Button>
            </div>
          </div>
        </section>
      </Motion>
    </>
  )
}

export default Hero
