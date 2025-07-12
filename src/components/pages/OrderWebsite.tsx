import { FiArrowRight, FiCode } from "solid-icons/fi"
import { createEffect, createSignal } from "solid-js"
import { Button } from "../ui/button"
import TA from '../parts/TA'
import RedStar from '../parts/RedStar'
import { createAsync, useSearchParams } from "@solidjs/router"
import { callModal } from "../layout/Modal"
import Spinner from "../parts/Spinner"
import { userQueryRedirect } from "~/lib/signal"


export default function OrderWebsite() {

  let user = createAsync(() => userQueryRedirect("/Login?back=/Place-Order/Website"))
  let [p] = useSearchParams()

  createEffect(() => {
    setFormData(prev => ({...prev, name: user()?.name || "",
      email: user()?.email || ""
    }))
  })
  
  const [formData, setFormData] = createSignal({
    name: user()?.name || "",
    email: user()?.email || "",
    phone: "",
    websiteType: p?.type || "",
    pageCount: "",
    isMarketplace: "",
    contentReady: "",
    timeline: "",
    budget: "",
    description: "",
    features: [] as string[],
  })

  const [isSubmitting, setIsSubmitting] = createSignal(false)

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.log(formData())

    setIsSubmitting(false)
    callModal.success("سفارش شما با موفقیت ثبت شد! به زودی با شما تماس خواهیم گرفت.")
  }

  const websiteTypes = [
    { value: "coded", label: "وب‌سایت کدنویسی شده", description: "عملکرد بالا و سفارشی‌سازی کامل" },
    { value: "wordpress", label: "وب‌سایت وردپرس", description: "راه‌اندازی سریع و مدیریت آسان" },
  ]

  const additionalFeatures = [
    "پنل مدیریت کاربران",
    "سیستم پرداخت آنلاین",
    "چت آنلاین",
    "تقویم و رزرو آنلاین",
    "گالری تصاویر",
    "بلاگ و اخبار",
    "فرم‌های پیشرفته",
    "نقشه و موقعیت مکانی",
    "چندزبانه بودن",
    "API و وب سرویس",
  ]

  return (
    <>
      <div class="container mx-auto px-4 py-8">
        
        <TA
          href="/"
          class="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <FiArrowRight class="ml-2 h-4 w-4" />
          بازگشت به صفحه اصلی
        </TA>

        <div class="max-w-4xl mx-auto">
          
          <div class="text-center mb-12">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">سفارش طراحی وب‌سایت</h1>
            <p class="text-muted-foreground text-lg">
              فرم زیر را تکمیل کنید تا بتوانیم بهترین پیشنهاد را برای پروژه شما ارائه دهیم
            </p>
          </div>

          <form onSubmit={handleSubmit} class="space-y-8">
            
            <div class="bg-card p-6 rounded-lg border">
              <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                <div class="h-6 w-6 bg-primary/20 rounded flex items-center justify-center">
                  <span class="text-primary text-sm font-bold">۱</span>
                </div>
                اطلاعات تماس
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium mb-2">
                    <RedStar/>
                    نام و نام خانوادگی 
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData().name}
                    onChange={handleInputChange}
                    class="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="نام کامل شما"
                    required
                  />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium mb-2">
                    <RedStar/>
                    ایمیل 
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData().email}
                    onChange={handleInputChange}
                    class="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>
            </div>

            
            <div class="bg-card p-6 rounded-lg border">
              <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                <div class="h-6 w-6 bg-primary/20 rounded flex items-center justify-center">
                  <span class="text-primary text-sm font-bold">۲</span>
                </div>
                نوع وب‌سایت
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {websiteTypes.map((type) => (
                  <label
                    
                    class={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                      formData().websiteType === type.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="websiteType"
                      value={type.value}
                      checked={formData().websiteType === type.value}
                      onChange={handleInputChange}
                      class="mt-1"
                    />
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        {type.value === "coded" ? (
                          <FiCode class="h-5 w-5 text-primary" />
                        ) : (
                          <div class="h-5 w-5 bg-blue-500 rounded flex items-center justify-center">
                            <span class="text-white text-xs font-bold">W</span>
                          </div>
                        )}
                        <span class="font-medium">{type.label}</span>
                      </div>
                      <p class="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            
            <div class="bg-card p-6 rounded-lg border">
              <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                <div class="h-6 w-6 bg-primary/20 rounded flex items-center justify-center">
                  <span class="text-primary text-sm font-bold">۳</span>
                </div>
                جزئیات وب‌سایت
              </h2>
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="pageCount" class="block text-sm font-medium mb-2">
                      <RedStar/>
                      تعداد صفحات 
                    </label>
                    <select
                      id="pageCount"
                      name="pageCount"
                      value={formData().pageCount}
                      onChange={handleInputChange}
                      class="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="1-5">۱ تا ۵ صفحه</option>
                      <option value="6-10">۶ تا ۱۰ صفحه</option>
                      <option value="11-20">۱۱ تا ۲۰ صفحه</option>
                      <option value="21-50">۲۱ تا ۵۰ صفحه</option>
                      <option value="50+">بیش از ۵۰ صفحه</option>
                    </select>
                  </div>
                  <div>
                    <label for="isMarketplace" class="block text-sm font-medium mb-2">
                      <RedStar/>
                      آیا این یک وب‌سایت فروشگاهی است؟ 
                    </label>
                    <select
                      id="isMarketplace"
                      name="isMarketplace"
                      value={formData().isMarketplace}
                      onChange={handleInputChange}
                      class="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="yes">بله، فروشگاه آنلاین</option>
                      <option value="no">خیر، وب‌سایت معرفی</option>
                      <option value="portfolio">نمونه کار و پورتفولیو</option>
                      <option value="blog">وبلاگ و محتوا</option>
                      <option value="service">ارائه خدمات</option>
                    </select>
                  </div>
                  <div>
                    <label for="timeline" class="block text-sm font-medium mb-2">
                      <RedStar/>
                      زمان مورد نیاز 
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData().timeline}
                      onChange={handleInputChange}
                      class="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="urgent">فوری (کمتر از ۱ ماه)</option>
                      <option value="normal">عادی (۱ تا ۲ ماه)</option>
                      <option value="flexible">انعطاف‌پذیر (۲ تا ۳ ماه)</option>
                      <option value="no-rush">عجله‌ای ندارم</option>
                    </select>
                  </div>
                  <div>
                    <label for="contentReady" class="block text-sm font-medium mb-2">
                      آیا محتوای وب‌سایت آماده است؟
                    </label>
                    <select
                      id="contentReady"
                      name="contentReady"
                      value={formData().contentReady}
                      onChange={handleInputChange}
                      class="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="yes">بله، محتوا آماده است</option>
                      <option value="partial">بخشی آماده است</option>
                      <option value="no">خیر</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-card p-6 rounded-lg border">
              <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                <div class="h-6 w-6 bg-primary/20 rounded flex items-center justify-center">
                  <span class="text-primary text-sm font-bold">۴</span>
                </div>
                خدمات دیگر
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {additionalFeatures.map((feature) => (
                  <label
                    
                    class={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                      formData().features.includes(feature)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData().features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      class="rounded"
                    />
                    <span class="text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            
            <div class="bg-card p-6 rounded-lg border">
              <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                <div class="h-6 w-6 bg-primary/20 rounded flex items-center justify-center">
                  <span class="text-primary text-sm font-bold">۵</span>
                </div>
                بودجه و توضیحات
              </h2>
              <div class="space-y-6">
                <div>
                  <label for="budget" class="block text-sm font-medium mb-2">
                    بودجه تقریبی (تومان)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData().budget}
                    onChange={handleInputChange}
                    class="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="under-5m">کمتر از ۵ میلیون</option>
                    <option value="5m-10m">۵ تا ۱۰ میلیون</option>
                    <option value="10m-20m">۱۰ تا ۲۰ میلیون</option>
                    <option value="20m-50m">۲۰ تا ۵۰ میلیون</option>
                    <option value="over-50m">بیش از ۵۰ میلیون</option>
                    <option value="discuss">ترجیح می‌دهم بحث کنیم</option>
                  </select>
                </div>
                <div>
                  <label for="description" class="block text-sm font-medium mb-2">
                    توضیحات تکمیلی
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData().description}
                    onChange={handleInputChange}
                    rows={4}
                    class="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="لطفاً هر توضیح اضافی که فکر می‌کنید برای پروژه مفید است را بنویسید..."
                  />
                </div>
              </div>
            </div>

            
            <div class="flex justify-center pt-6">
              <Button
                type="submit"
                disabled={isSubmitting()}
                class="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-lg"
              >
                {isSubmitting() ? <>
                  در حال ارسال... 
                  <Spinner/>
                </>: "ثبت سفارش"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

