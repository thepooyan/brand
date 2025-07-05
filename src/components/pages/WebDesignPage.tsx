import { FiCheck as Check, FiX as X, FiCode as Code, FiZap as Zap,
  FiShield as Shield, FiSearch as Search } from "solid-icons/fi"
import { Button } from "../ui/button"
import { ImWordpress, ImWrench } from "solid-icons/im"
import { name } from "../../../config/config"
import { pageMarker } from "~/lib/routeChangeTransition"
import TA from "../parts/TA"
import { callModal } from "../layout/Modal"
import ContactInfo from "../parts/ContactInfo"

export default function WebDesign() {
  const comparisonData = [
    {
      feature: "سرعت بارگذاری",
      coded: { value: "بسیار سریع", icon: "check", description: "کد بهینه‌سازی شده" },
      wordpress: { value: "متوسط", icon: "x", description: "وابسته به افزونه‌ها" },
    },
    {
      feature: "قابلیت سفارشی‌سازی",
      coded: { value: "نامحدود", icon: "check", description: "طراحی کاملاً منحصر به فرد" },
      wordpress: { value: "محدود", icon: "x", description: "وابسته به قالب و افزونه" },
    },
    {
      feature: "امنیت",
      coded: { value: "بسیار بالا", icon: "check", description: "کد امن و بدون آسیب‌پذیری" },
      wordpress: { value: "متوسط", icon: "x", description: "نیاز به به‌روزرسانی مداوم" },
    },
    {
      feature: "سئو",
      coded: { value: "عالی", icon: "check", description: "کد بهینه برای موتورهای جستجو" },
      wordpress: { value: "خوب", icon: "check", description: "با افزونه‌های سئو" },
    },
    {
      feature: "هزینه اولیه",
      coded: { value: "بالاتر", icon: "x", description: "سرمایه‌گذاری اولیه بیشتر" },
      wordpress: { value: "کمتر", icon: "check", description: "هزینه اولیه پایین‌تر" },
    },
    {
      feature: "زمان توسعه",
      coded: { value: "بیشتر", icon: "x", description: "نیاز به زمان بیشتر برای کدنویسی" },
      wordpress: { value: "کمتر", icon: "check", description: "راه‌اندازی سریع‌تر" },
    },
    {
      feature: "نگهداری",
      coded: { value: "آسان", icon: "check", description: "نگهداری ساده و کم‌هزینه" },
      wordpress: { value: "پیچیده", icon: "x", description: "نیاز به به‌روزرسانی مداوم" },
    },
    {
      feature: "مقیاس‌پذیری",
      coded: { value: "عالی", icon: "check", description: "قابلیت رشد بالا" },
      wordpress: { value: "محدود", icon: "x", description: "محدودیت در رشد" },
    },
  ]

  const freeConsultation = () => {
    callModal(() => <ContactInfo/>)
  }

  return (
    <main {...pageMarker()}>

      {/* Hero Section */}
      <section class="py-16 md:py-24">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto text-center">
            <div class="flex justify-center mb-6">
              <div class="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Code class="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-6">
              خدمات <span class="text-primary">طراحی وب‌سایت</span>
            </h1>
            <p class="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              ما دو نوع خدمات طراحی وب‌سایت ارائه می‌دهیم: وب‌سایت‌های کدنویسی شده سفارشی که برای عملکرد و منحصر به فرد بودن
              بهینه‌سازی شده‌اند، و راه‌حل‌های وردپرس که سریع و مقرون به صرفه هستند. هر دو گزینه برای نیازهای مختلف کسب و
              کار طراحی شده‌اند تا بهترین تجربه کاربری و نتایج را برای شما فراهم کنند.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section class="py-16 bg-card">
        <div class="container mx-auto px-4">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">مقایسه گزینه‌های طراحی</h2>

            {/* Mobile Cards */}
            <div class=" md:hidden space-y-6">
              {/* Coded Website Card */}
              <div class="bg-background border border-primary/20 rounded-lg p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Code class="h-5 w-5 text-primary" />
                  </div>
                  <h3 class="text-xl font-bold">وب‌سایت کدنویسی شده</h3>
                </div>
                <div class="space-y-3 mb-6">
                  {comparisonData.map((item) => (
                    <div class="flex justify-between items-center py-2 border-b border-border/50">
                      <span class="text-sm font-medium">{item.feature}</span>
                      <div class="flex items-center gap-2">
                        {item.coded.icon === "check" ? (
                          <Check class="h-4 w-4 text-green-500" />
                        ) : (
                          <X class="h-4 w-4 text-red-500" />
                        )}
                        <span class="text-sm">{item.coded.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button class="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  سفارش وب‌سایت کدنویسی شده
                </Button>
              </div>

              {/* WordPress Card */}
              <div class="bg-background border rounded-lg p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div class="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <ImWordpress class="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 class="text-xl font-bold">وب‌سایت وردپرس</h3>
                </div>
                <div class="space-y-3 mb-6">
                  {comparisonData.map((item) => (
                    <div class="flex justify-between items-center py-2 border-b border-border/50">
                      <span class="text-sm font-medium">{item.feature}</span>
                      <div class="flex items-center gap-2">
                        {item.wordpress.icon === "check" ? (
                          <Check class="h-4 w-4 text-green-500" />
                        ) : (
                          <X class="h-4 w-4 text-red-500" />
                        )}
                        <span class="text-sm">{item.wordpress.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" class="w-full border-blue-500 text-blue-500 hover:bg-blue-500/10">
                  سفارش وب‌سایت وردپرس
                </Button>
              </div>
            </div>

            {/* Desktop Table */}
            <div class="hidden md:block">
              <div class="bg-background rounded-lg border overflow-hidden">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-border">
                      <th class="text-right p-6 font-bold text-lg">ویژگی</th>
                      <th class="text-center p-6">
                        <div class="flex flex-col items-center gap-2">
                          <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Code class="h-6 w-6 text-primary" />
                          </div>
                          <span class="font-bold text-lg">وب‌سایت کدنویسی شده</span>
                        </div>
                      </th>
                      <th class="text-center p-6">
                        <div class="flex flex-col items-center gap-2">
                          <div class="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <ImWordpress class="h-6 w-6 text-blue-500" />
                          </div>
                          <span class="font-bold text-lg">وب‌سایت وردپرس</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((item, index) => (
                      <tr class={`border-b border-border/50 ${index % 2 === 0 ? "bg-card/50" : ""}`}>
                        <td class="p-6 font-medium">{item.feature}</td>
                        <td class="p-6 text-center">
                          <div class="flex flex-col items-center gap-2">
                            <div class="flex items-center gap-2">
                              {item.coded.icon === "check" ? (
                                <Check class="h-5 w-5 text-green-500" />
                              ) : (
                                <X class="h-5 w-5 text-red-500" />
                              )}
                              <span class="font-medium">{item.coded.value}</span>
                            </div>
                            <span class="text-xs text-muted-foreground">{item.coded.description}</span>
                          </div>
                        </td>
                        <td class="p-6 text-center">
                          <div class="flex flex-col items-center gap-2">
                            <div class="flex items-center gap-2">
                              {item.wordpress.icon === "check" ? (
                                <Check class="h-5 w-5 text-green-500" />
                              ) : (
                                <X class="h-5 w-5 text-red-500" />
                              )}
                              <span class="font-medium">{item.wordpress.value}</span>
                            </div>
                            <span class="text-xs text-muted-foreground">{item.wordpress.description}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr class="bg-card">
                      <td class="p-6 font-bold text-lg">سفارش</td>
                      <td class="p-6 text-center">
                        <Button class="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                          سفارش وب‌سایت کدنویسی شده
                        </Button>
                      </td>
                      <td class="p-6 text-center">
                        <Button variant="outline" class="border-blue-500 text-blue-500 hover:bg-blue-500/10 px-8">
                          سفارش وب‌سایت وردپرس
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-center mb-12">چرا {name} را انتخاب کنید؟</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="flex gap-4">
                <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap class="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 class="font-bold mb-2">عملکرد بالا</h3>
                  <p class="text-muted-foreground">وب‌سایت‌های ما با سرعت بارگذاری بالا و عملکرد بهینه طراحی می‌شوند.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield class="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 class="font-bold mb-2">امنیت تضمین شده</h3>
                  <p class="text-muted-foreground">تمام وب‌سایت‌ها با بالاترین استانداردهای امنیتی توسعه می‌یابند.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Search class="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 class="font-bold mb-2">سئو حرفه‌ای</h3>
                  <p class="text-muted-foreground">بهینه‌سازی کامل برای موتورهای جستجو و رتبه‌بندی بهتر.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ImWrench class="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 class="font-bold mb-2">پشتیبانی مادام‌العمر</h3>
                  <p class="text-muted-foreground">پشتیبانی فنی و نگهداری مداوم پس از تحویل پروژه.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-16 bg-primary/10 border-y border-primary/20">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-4">آماده شروع هستید؟</h2>
          <p class="text-muted-foreground mb-8 max-w-2xl mx-auto">
            با تیم متخصص {name} تماس بگیرید و پروژه وب‌سایت خود را همین امروز شروع کنید.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              onclick={freeConsultation}
            >مشاوره رایگان</Button>
            <Button variant="outline" class="border-primary text-primary hover:bg-primary/10 px-8 py-3">
              مشاهده نمونه کارها
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

