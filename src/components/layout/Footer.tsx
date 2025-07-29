import { A } from "@solidjs/router"
import { info, name, nameEn, socialLinks } from "../../../config/config"
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "solid-icons/fi"

const Footer = () => {
  return (
    <>
      <footer class="bg-black py-12">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div class="flex items-center gap-2 mb-4">
                <div class="w-15 relative">
                  <img src="/logo.webp" alt={`${nameEn}'s logo`} class="" />
                  <div class="bg-primary w-15 h-15 rounded-full animate-ping absolute top-0 duration-2000
                    opacity-65
                    "></div>
                </div>
                <span class="text-xl font-bold">{name}</span>
              </div>
              <p class="text-muted-foreground">تبدیل ایده‌ها به واقعیت دیجیتال با راه‌حل‌های نوآورانه.</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">خدمات</h3>
              <ul class="space-y-2">
                <li>
                  <A href="#" class="text-muted-foreground hover:text-primary transition-colors">
                    خدمات هوش مصنوعی
                  </A>
                </li>
                <li>
                  <A href="#" class="text-muted-foreground hover:text-primary transition-colors">
                    بازاریابی آنلاین
                  </A>
                </li>
                <li>
                  <A href="#" class="text-muted-foreground hover:text-primary transition-colors">
                    توسعه وب‌سایت
                  </A>
                </li>
                <li>
                  <A href="#" class="text-muted-foreground hover:text-primary transition-colors">
                    استراتژی دیجیتال
                  </A>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">شرکت</h3>
              <ul class="space-y-2">
                <li>
                  <A href="#" class="text-muted-foreground hover:text-primary transition-colors">
                    درباره ما
                  </A>
                </li>
                <li>
                  <A href="#" class="text-muted-foreground hover:text-primary transition-colors">
                    تیم ما
                  </A>
                </li>
                <li>
                  <A href="#" class="text-muted-foreground hover:text-primary transition-colors">
                    فرصت‌های شغلی
                  </A>
                </li>
                <li>
                  <A href="#" class="text-muted-foreground hover:text-primary transition-colors">
                    وبلاگ
                  </A>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">تماس</h3>
              <ul class="space-y-2">
                <li class="text-muted-foreground">{socialLinks.email}</li>
                <li class="text-muted-foreground">{info.phone}</li>
                <li class="text-muted-foreground">{info.address}</li>
              </ul>
            </div>
          </div>
          <div class="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p class="text-muted-foreground text-sm">© ۱۴۰۴ {name}. تمامی حقوق محفوظ است.</p>
            <div class="flex space-x-6 mt-4 md:mt-0">
              <A href={socialLinks.facebook} class="text-muted-foreground hover:text-primary transition-colors">
                <span class="sr-only">فیسبوک</span>
                <FiFacebook/>
              </A>
              <A href={socialLinks.instagram} class="text-muted-foreground hover:text-primary transition-colors">
                <span class="sr-only">اینستاگرام</span>
                <FiInstagram/>
              </A>
              <A href={socialLinks.X} class="text-muted-foreground hover:text-primary transition-colors">
                <span class="sr-only">توییتر</span>
                <FiTwitter/>
              </A>
              <A href={socialLinks.linkedin} class="text-muted-foreground hover:text-primary transition-colors">
                <span class="sr-only">لینکدین</span>
                <FiLinkedin/>
              </A>
            </div>
          </div>
        </div>
      </footer>
</>
  )
}

export default Footer
