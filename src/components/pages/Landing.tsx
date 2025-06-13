import { A } from "@solidjs/router"
import { Button } from "../ui/button"
import { FiChevronLeft as ChevronLeft, FiCode as Code, FiGlobe as Globe, FiMessageSquare as MessageSquare } from "solid-icons/fi"

export default function Landing() {
  return (
    <div class="min-h-screen flex flex-col" dir="rtl">
      <header class="border-b">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="h-8 w-8 rounded-full bg-orange-500"></div>
            <span class="text-xl font-bold">پویان</span>
          </div>
          <nav class="hidden md:flex items-center gap-6">
            <A href="#services" class="text-sm font-medium hover:text-orange-500 transition-colors">
              خدمات
            </A>
            <A href="#about" class="text-sm font-medium hover:text-orange-500 transition-colors">
              درباره ما
            </A>
            <A href="#contact" class="text-sm font-medium hover:text-orange-500 transition-colors">
              تماس با ما
            </A>
            <Button variant="outline" class="border-orange-500 text-orange-500 hover:bg-orange-50">
              ورود
            </Button>
            <Button class="bg-orange-500 hover:bg-orange-600 text-white">شروع کنید</Button>
          </nav>
          <Button variant="ghost" size="icon" class="md:hidden">
            <span class="sr-only">تغییر منو</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-Linejoin="round"
              class="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section class="py-20 md:py-32">
        <div class="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            تبدیل ایده‌ها به <span class="text-orange-500">واقعیت دیجیتال</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
            ما در خدمات هوش مصنوعی، بازاریابی آنلاین و توسعه وب‌سایت تخصص داریم تا به کسب و کار شما در فضای دیجیتال کمک
            کنیم.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <Button class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg">
              شروع کنید
              <ChevronLeft class="mr-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              class="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-6 text-lg"
            >
              بیشتر بدانید
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">خدمات ما</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
              ما راه‌حل‌های جامع دیجیتال برای کمک به رشد و موفقیت کسب و کار شما ارائه می‌دهیم.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Services */}
            <div class="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div class="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare class="h-6 w-6 text-orange-500" />
              </div>
              <h3 class="text-xl font-bold mb-3">خدمات هوش مصنوعی</h3>
              <p class="text-gray-600 mb-6">
                از قدرت هوش مصنوعی برای خودکارسازی فرآیندها، کسب بینش و بهبود تجربه مشتری استفاده کنید.
              </p>
              <A href="#" class="text-orange-500 font-medium flex items-center">
                بیشتر بدانید <ChevronLeft class="mr-1 h-4 w-4" />
              </A>
            </div>

            {/* Online Marketing */}
            <div class="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div class="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Globe class="h-6 w-6 text-orange-500" />
              </div>
              <h3 class="text-xl font-bold mb-3">بازاریابی آنلاین</h3>
              <p class="text-gray-600 mb-6">
                با کمپین‌های بازاریابی دیجیتال استراتژیک که باعث افزایش ترافیک، تعامل و تبدیل می‌شوند، به مخاطبان هدف خود
                برسید.
              </p>
              <A href="#" class="text-orange-500 font-medium flex items-center">
                بیشتر بدانید <ChevronLeft class="mr-1 h-4 w-4" />
              </A>
            </div>

            {/* Website Development */}
            <div class="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div class="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Code class="h-6 w-6 text-orange-500" />
              </div>
              <h3 class="text-xl font-bold mb-3">توسعه وب‌سایت</h3>
              <p class="text-gray-600 mb-6">
                وب‌سایت‌های خیره‌کننده و واکنش‌گرا ایجاد کنید که برند شما را به نمایش بگذارند و تجربه کاربری فوق‌العاده‌ای
                ارائه دهند.
              </p>
              <A href="#" class="text-orange-500 font-medium flex items-center">
                بیشتر بدانید <ChevronLeft class="mr-1 h-4 w-4" />
              </A>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" class="py-20">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
              <h2 class="text-3xl md:text-4xl font-bold mb-6">درباره پویان</h2>
              <p class="text-gray-600 mb-6">
                پویان یک آژانس دیجیتال آینده‌نگر است که به کمک کسب و کارها در هدایت فضای پیچیده دیجیتال اختصاص دارد. ما
                خلاقیت، فناوری و استراتژی را ترکیب می‌کنیم تا نتایج استثنایی ارائه دهیم.
              </p>
              <p class="text-gray-600 mb-8">
                تیم متخصص ما مشتاق نوآوری و متعهد به ارائه راه‌حل‌های سفارشی است که نیازهای منحصر به فرد کسب و کار شما را
                برآورده می‌کند.
              </p>
              <Button class="bg-orange-500 hover:bg-orange-600 text-white">داستان ما</Button>
            </div>
            <div class="order-1 md:order-2">
              <div class="h-64 md:h-96 bg-gray-200 rounded-lg">
                <img
                  src="/placeholder.svg?height=384&width=576"
                  alt="درباره پویان"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">تماس با ما</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
              آماده تحول کسب و کار خود هستید؟ همین امروز با ما تماس بگیرید تا در مورد چگونگی کمک به شما برای رسیدن به
              اهدافتان صحبت کنیم.
            </p>
          </div>
          <div class="max-w-2xl mx-auto">
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                    نام
                  </label>
                  <input
                    type="text"
                    id="name"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="نام شما"
                  />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="ایمیل شما"
                  />
                </div>
              </div>
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">
                  موضوع
                </label>
                <input
                  type="text"
                  id="subject"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="موضوع"
                />
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                  پیام
                </label>
                <textarea
                  id="message"
                  rows={4}
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="پیام شما"
                ></textarea>
              </div>
              <Button class="w-full bg-orange-500 hover:bg-orange-600 text-white py-6">ارسال پیام</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div class="flex items-center gap-2 mb-4">
                <div class="h-8 w-8 rounded-full bg-orange-500"></div>
                <span class="text-xl font-bold">پویان</span>
              </div>
              <p class="text-gray-400">تبدیل ایده‌ها به واقعیت دیجیتال با راه‌حل‌های نوآورانه.</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">خدمات</h3>
              <ul class="space-y-2">
                <li>
                  <A href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                    خدمات هوش مصنوعی
                  </A>
                </li>
                <li>
                  <A href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                    بازاریابی آنلاین
                  </A>
                </li>
                <li>
                  <A href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                    توسعه وب‌سایت
                  </A>
                </li>
                <li>
                  <A href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                    استراتژی دیجیتال
                  </A>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">شرکت</h3>
              <ul class="space-y-2">
                <li>
                  <A href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                    درباره ما
                  </A>
                </li>
                <li>
                  <A href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                    تیم ما
                  </A>
                </li>
                <li>
                  <A href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                    فرصت‌های شغلی
                  </A>
                </li>
                <li>
                  <A href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                    وبلاگ
                  </A>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">تماس</h3>
              <ul class="space-y-2">
                <li class="text-gray-400">info@pooyan.com</li>
                <li class="text-gray-400">۱۲۳۴۵۶۷-۰۲۱</li>
                <li class="text-gray-400">خیابان دیجیتال، شهر فناوری، ایران</li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400 text-sm">© ۱۴۰۴ پویان. تمامی حقوق محفوظ است.</p>
            <div class="flex space-x-6 mt-4 md:mt-0">
              <A href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                <span class="sr-only">فیسبوک</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-Rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clip-Rule="evenodd"
                  />
                </svg>
              </A>
              <A href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                <span class="sr-only">اینستاگرام</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill-Rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clip-Rule="evenodd"
                  />
                </svg>
              </A>
              <A href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                <span class="sr-only">توییتر</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </A>
              <A href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
                <span class="sr-only">لینکدین</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </A>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

