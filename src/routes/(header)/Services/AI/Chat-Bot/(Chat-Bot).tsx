import { pageMarker } from "~/lib/routeChangeTransition"
import { FiMessageSquare, FiArrowRight} from "solid-icons/fi"
import TA from "~/components/parts/TA"
import { Button } from "~/components/ui/button"
import { callModal } from "~/components/layout/Modal"
import ContactInfo from "~/components/parts/ContactInfo"
import { features, integrationOptions } from "~/data/abstract"
import { preload } from "~/lib/hooks"
import ChatSample from "~/components/parts/chat/ChatSample"


export default function ChatBot() {

  preload("/Services/Chat-Bot/Demo")

  let chatboxRef!: HTMLDivElement

  return (
    <main {...pageMarker()}>
      <div class="container mx-auto px-4 py-8">
        {/* Back Button */}
        <TA
          href="/"
          class="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <FiArrowRight class="ml-2 h-4 w-4" />
          بازگشت به صفحه اصلی
        </TA>

        {/* Hero Section */}
        <div class="text-center mb-16">
          <div class="flex justify-center mb-6">
            <div class="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
              <FiMessageSquare class="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            چت‌بات هوشمند <span class="text-primary">با هوش مصنوعی</span>
          </h1>
          <p class="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            چت‌بات‌های هوشمند سفارشی که می‌تونن در تلگرام، وب‌سایت شما یا از طریق API کار کنن. پاسخ‌دهی سریع، دقیق و ۲۴ ساعته
            به مشتریان شما.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
              onclick={() => callModal(() => <ContactInfo/>)}
            >
              درخواست مشاوره رایگان
            </Button>
            <Button class="px-8 py-6 text-lg"
              variant="secondary" as={TA} href="Demo"
            >
              امتحان کنید!
            </Button>
          </div>
        </div>

        {/* Integration Options */}
        <div class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">روش‌های ادغام</h2>
            <p class="text-muted-foreground max-w-2xl mx-auto">
              چت‌بات شما را در هر پلتفرمی که نیاز دارید، راه‌اندازی می‌کنیم
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {integrationOptions.map((option, ) => (
              <div  class="bg-card p-8 rounded-lg border hover:shadow-md transition-shadow flex flex-col">
                <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
                  <option.icon class="h-6 w-6 text-primary" />
                </div>
                <h3 class="text-xl font-bold mb-3">{option.title}</h3>
                <p class="text-muted-foreground mb-6">{option.description}</p>
                <ul class="space-y-2 mb-4">
                  {option.features.map((feature, ) => (
                    <li  class="flex items-center text-sm">
                      <div class="h-1.5 w-1.5 bg-primary rounded-full ml-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" class="mt-auto"
                  as={TA} href={`/Services/Chat-Bot/${option.link}`}
                >مشاهده</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">ویژگی‌های کلیدی</h2>
            <p class="text-muted-foreground max-w-2xl mx-auto">چت‌بات‌های ما با بهترین تکنولوژی‌ها ساخته می‌شن</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, ) => (
              <div  class="bg-card p-6 rounded-lg border text-center">
                <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon class="h-6 w-6 text-primary" />
                </div>
                <h3 class="font-bold mb-2">{feature.title}</h3>
                <p class="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <ChatSample/>

        {/* CTA Section */}
        <div class="bg-card p-8 rounded-lg border text-center">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">آماده شروع هستید؟</h2>
          <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
            همین الان با ما تماس بگیرید تا چت‌بات اختصاصی برای کسب و کار شما طراحی کنیم
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
              درخواست مشاوره رایگان
            </Button>
            <Button
              variant="outline"
              class="border-primary text-primary hover:bg-primary/10 px-8 py-3 bg-transparent"
            >
              مشاهده قیمت‌ها
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
