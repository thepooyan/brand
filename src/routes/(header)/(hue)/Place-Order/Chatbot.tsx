import { AiFillRobot } from "solid-icons/ai"
import { FiUpload, FiGlobe,
  FiFileText, FiMessageSquare, FiSettings, 
  FiArrowRight} from "solid-icons/fi"
import { createEffect, createSignal } from "solid-js"
import RedStar from "~/components/parts/RedStar"
import TA from "~/components/parts/TA"
import { Button } from "~/components/ui/button"
import { getUser } from "~/lib/signal"

export default function OrderChatbotPage() {
  const [formData, setFormData] = createSignal({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    tone: "",
    language: "",
    pdfFiles: [] as File[],
    websiteUrl: "",
    additionalInfo: "",
    maxResponseLength: "medium",
    integrationPlatform: "",
    customization: "",
    budget: "",
    timeline: "",
    description: "",
  })

  const user = getUser()
  createEffect(() => {
    setFormData(prev => ({...prev,
      name: String(user()?.name),
      email: String(user()?.email),
      phone: String(user()?.number),
    }))
  })

  const [isSubmitting, setIsSubmitting] = createSignal(false)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: any) => {
    const files = Array.from(e.target.files || [])
    // setFormData((prev) => ({ ...prev, pdfFiles: files }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    alert("سفارش چت‌بات شما با موفقیت ثبت شد! به زودی با شما تماس خواهیم گرفت.")
  }

  const toneOptions = [
    { value: "formal", label: "رسمی", description: "مناسب برای کسب‌وکارهای جدی و حرفه‌ای" },
    { value: "friendly", label: "دوستانه", description: "صمیمی و گرم برای ارتباط نزدیک با مشتریان" },
    { value: "professional", label: "حرفه‌ای", description: "متعادل بین رسمی و دوستانه" },
    { value: "casual", label: "غیررسمی", description: "راحت و طبیعی برای مخاطبان جوان" },
    { value: "enthusiastic", label: "پرانرژی", description: "مثبت و انگیزه‌بخش" },
    { value: "helpful", label: "کمک‌کننده", description: "متمرکز بر حل مشکل و راهنمایی" },
  ]

  const languageOptions = [
    { value: "persian", label: "فارسی", flag: "🇮🇷" },
    { value: "english", label: "انگلیسی", flag: "🇺🇸" },
    { value: "bilingual", label: "دوزبانه (فارسی + انگلیسی)", flag: "🌐" },
    { value: "arabic", label: "عربی", flag: "🇸🇦" },
  ]

  const responseLengthOptions = [
    { value: "short", label: "کوتاه", description: "۱-۲ جمله (تا ۵۰ کلمه)" },
    { value: "medium", label: "متوسط", description: "۲-۴ جمله (۵۰-۱۰۰ کلمه)" },
    { value: "long", label: "بلند", description: "۴-۶ جمله (۱۰۰-۲۰۰ کلمه)" },
    { value: "detailed", label: "تفصیلی", description: "بیش از ۶ جمله (۲۰۰+ کلمه)" },
  ]

  const integrationOptions = [
    { value: "website", label: "وب‌سایت", icon: FiGlobe, description: "ویجت چت در وب‌سایت" },
    { value: "telegram", label: "تلگرام", icon: FiMessageSquare, description: "ربات تلگرام" },
    { value: "api", label: "API", icon: FiSettings, description: "ادغام با سیستم موجود" },
    { value: "multiple", label: "چندپلتفرمه", icon: AiFillRobot, description: "همه پلتفرم‌ها" },
  ]

  return (
    <>

      <div class="container mx-auto px-4 py-8">
        {/* Back Button */}
        <TA
          href="/ai-services"
          class="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <FiArrowRight class="ml-2 h-4 w-4" />
          بازگشت به خدمات هوش مصنوعی
        </TA>

        <div class="max-w-4xl mx-auto">
          {/* Header */}
          <div class="text-center mb-12">
            <div class="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AiFillRobot class="h-8 w-8 text-primary" />
            </div>
            <h1 class="text-3xl md:text-4xl font-bold mb-4">سفارش چت‌بات هوشمند</h1>
            <p class="text-muted-foreground text-lg">
              فرم زیر را تکمیل کنید تا چت‌بات اختصاصی و هوشمند برای کسب‌وکار شما طراحی کنیم
            </p>
          </div>

          <form onSubmit={handleSubmit} class="space-y-8">
            {/* Personal Information */}
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
                  <label for="businessName" class="block text-sm font-medium mb-2">
                    <RedStar/>
                    نام کسب‌وکار
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData().businessName}
                    onChange={handleInputChange}
                    class="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="نام شرکت یا کسب‌وکار"
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

            {/* Chatbot Configuration */}
            <div class="bg-card p-6 rounded-lg border">
              <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                <div class="h-6 w-6 bg-primary/20 rounded flex items-center justify-center">
                  <span class="text-primary text-sm font-bold">۲</span>
                </div>
                تنظیمات چت‌بات
              </h2>

              {/* Tone Selection */}
              <div class="mb-6">
                <label class="block text-sm font-medium mb-3">
                  <RedStar/>
                  انتخاب لحن چت‌بات
                </label>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {toneOptions.map((tone) => (
                    <label
                      class={`flex gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                        formData().tone === tone.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tone"
                        value={tone.value}
                        checked={formData().tone === tone.value}
                        onChange={handleInputChange}
                        class="mb-2"
                      />
                      <div>
                        <p class="font-medium mb-1">{tone.label}</p>
                        <p class="text-xs text-muted-foreground">{tone.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div class="mb-6">
                <label class="block text-sm font-medium mb-3">
                  <RedStar/>
                  انتخاب زبان چت‌بات
                </label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {languageOptions.map((lang) => (
                    <label
                      class={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                        formData().language === lang.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="language"
                        value={lang.value}
                        checked={formData().language === lang.value}
                        onChange={handleInputChange}
                      />
                      <span class="text-2xl">{lang.flag}</span>
                      <span class="font-medium">{lang.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Response Length */}
              <div>
                <label class="block text-sm font-medium mb-3">
                  <RedStar/>
                  حداکثر طول پاسخ
                </label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {responseLengthOptions.map((option) => (
                    <label
                      class={`flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                        formData().maxResponseLength === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="maxResponseLength"
                        value={option.value}
                        checked={formData().maxResponseLength === option.value}
                        onChange={handleInputChange}
                        class="mb-2"
                      />
                      <span class="font-medium mb-1">{option.label}</span>
                      <span class="text-xs text-muted-foreground">{option.description}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Sources */}
            <div class="bg-card p-6 rounded-lg border">
              <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                <div class="h-6 w-6 bg-primary/20 rounded flex items-center justify-center">
                  <span class="text-primary text-sm font-bold">۳</span>
                </div>
                منابع یادگیری چت‌بات
              </h2>

              {/* PDF Upload */}
              <div class="mb-6">
                <label class="block text-sm font-medium mb-3">
                  <FiUpload class="inline h-4 w-4 ml-1" />
                  آپلود فایل PDF برای یادگیری
                </label>
                <div class="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="pdfFiles"
                    name="pdfFiles"
                    multiple
                    accept=".pdf"
                    onChange={handleFileUpload}
                    class="hidden"
                  />
                  <label for="pdfFiles" class="cursor-pointer">
                    <FiFileText class="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p class="text-muted-foreground mb-2">فایل‌های PDF خود را اینجا بکشید یا کلیک کنید</p>
                    <p class="text-xs text-muted-foreground">حداکثر ۱۰ فایل، هر فایل تا ۱۰ مگابایت</p>
                  </label>
                  {formData().pdfFiles.length > 0 && (
                    <div class="mt-4">
                      <p class="text-sm font-medium mb-2">فایل‌های انتخاب شده:</p>
                      <ul class="text-sm text-muted-foreground">
                        {formData().pdfFiles.map((file) => (
                          <li>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Website URL */}
              <div class="mb-6">
                <label for="websiteUrl" class="block text-sm font-medium mb-2">
                  <FiGlobe class="inline h-4 w-4 ml-1" />
                  لینک وب‌سایت برای خزیدن و یادگیری خودکار
                </label>
                <input
                  type="url"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData().websiteUrl}
                  onChange={handleInputChange}
                  class="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-left"
                  placeholder="https://example.com"
                />
                <p class="text-xs text-muted-foreground mt-1">
                  چت‌بات تمام صفحات وب‌سایت شما را بررسی کرده و از محتوای آن یاد می‌گیرد
                </p>
              </div>

              {/* Additional Information */}
              <div>
                <label for="additionalInfo" class="block text-sm font-medium mb-2">
                  اطلاعات اضافی برای آموزش چت‌بات
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData().additionalInfo}
                  onChange={handleInputChange}
                  rows={6}
                  class="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="اطلاعات مهم درباره کسب‌وکار، محصولات، خدمات، سوالات متداول و هر چیزی که می‌خواهید چت‌بات درباره آن بداند را اینجا بنویسید..."
                />
                <p class="text-xs text-muted-foreground mt-1">
                  هر چه اطلاعات بیشتری ارائه دهید، چت‌بات دقیق‌تر و مفیدتر خواهد بود
                </p>
              </div>
            </div>

            {/* Project Details */}
            <div class="bg-card p-6 rounded-lg border">
              <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                <div class="h-6 w-6 bg-primary/20 rounded flex items-center justify-center">
                  <span class="text-primary text-sm font-bold">۵</span>
                </div>
                جزئیات پروژه
              </h2>
              <div class="space-y-6">
                <div>
                  <label for="customization" class="block text-sm font-medium mb-2">
                    سفارشی‌سازی‌های خاص
                  </label>
                  <textarea
                    id="customization"
                    name="customization"
                    value={formData().customization}
                    onChange={handleInputChange}
                    rows={3}
                    class="w-full px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="ویژگی‌های خاص، طراحی سفارشی، ادغام با سیستم‌های خاص و..."
                  />
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
                    placeholder="هر توضیح اضافی که فکر می‌کنید برای طراحی بهتر چت‌بات مفید است..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div class="flex justify-center pt-6">
              <Button
                type="submit"
                disabled={isSubmitting()}
                class="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-lg"
              >
                {isSubmitting() ? "در حال ارسال..." : "ثبت سفارش چت‌بات"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

