import { FiChevronLeft as ChevronLeft, FiCode as Code, FiGlobe, FiMessageSquare as MessageSquare } from "solid-icons/fi"
import TA from "../parts/TA"

const Services = () => {
  return (
    <>
      <section id="services" class="py-20 bg-card">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">خدمات ما</h2>
            <p class="text-muted-foreground max-w-2xl mx-auto">
              ما راه‌حل‌های جامع دیجیتال برای کمک به رشد و موفقیت کسب و کار شما ارائه می‌دهیم.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Services */}
            <div class="bg-background p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare class="h-6 w-6 text-primary" />
              </div>
              <h3 class="text-xl font-bold mb-3">خدمات هوش مصنوعی</h3>
              <p class="text-muted-foreground mb-6">
                از قدرت هوش مصنوعی برای خودکارسازی فرآیندها، کسب بینش و بهبود تجربه مشتری استفاده کنید.
              </p>
              <TA href="/Services/AI" class="text-primary font-medium flex items-center">
                بیشتر بدانید <ChevronLeft class="mr-1 h-4 w-4" />
              </TA>
            </div>

            {/* Website Development */}
            <div class="bg-background p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <Code class="h-6 w-6 text-primary" />
              </div>
              <h3 class="text-xl font-bold mb-3">توسعه وب‌سایت</h3>
              <p class="text-muted-foreground mb-6">
                وب‌سایت‌های خیره‌کننده و واکنش‌گرا ایجاد کنید که برند شما را به نمایش بگذارند و تجربه کاربری فوق‌العاده‌ای
                ارائه دهند.
              </p>
              <TA href="/Services/Web-design" class="text-primary font-medium flex items-center">
                بیشتر بدانید <ChevronLeft class="mr-1 h-4 w-4" />
              </TA>
            </div>

            <div class="bg-background p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow pointer-events-none opacity-40">
              <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                <FiGlobe class="h-6 w-6 text-primary" />
              </div>
              <h3 class="text-xl font-bold mb-3">بازاریابی آنلاین</h3>
              <p class="text-muted-foreground mb-6">
                با کمپین‌های بازاریابی دیجیتال استراتژیک که باعث افزایش ترافیک، تعامل و تبدیل می‌شوند، به مخاطبان هدف خود
                برسید.
              </p>
              {/*<TA href="/Services" class="text-primary font-medium flex items-center">
                بیشتر بدانید <ChevronLeft class="mr-1 h-4 w-4" />
              </TA>*/}
              <span class="text-blue-500 text-lg"> به زودی... </span>
            </div> 

          </div>
        </div>
      </section>
    </>
  )
}

export default Services
