import { pageMarker } from "~/lib/routeChangeTransition"
import { FiMessageSquare, FiSend, FiSmartphone, FiCode, FiGlobe, FiZap, FiShield, FiClock, FiArrowRight } from "solid-icons/fi"
import TA from "../parts/TA"
import { Button } from "../ui/button"
import { createEffect, createSignal } from "solid-js"
import { AiFillRobot } from "solid-icons/ai"
import { callModal } from "../layout/Modal"
import ContactInfo from "../parts/ContactInfo"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = createSignal<Message[]>([
    {
      id: "1",
      text: "سلام! من دستیار هوشمند پویان هستم. چطور می‌تونم کمکتون کنم؟",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = createSignal("")
  const [isTyping, setIsTyping] = createSignal(false)

  let chatboxRef!: HTMLDivElement
  let messagesEndRef!: HTMLDivElement

  const scrollToBottom = () => {
    // messagesEndRef.scrollIntoView({ behavior: "smooth" })
  }

  createEffect(() => {
    messages()
    scrollToBottom()
  })

  const handleSendMessage = async () => {
    if (!inputMessage().trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage(),
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(
      () => {
        const responses = [
          "بله، ما می‌تونیم چت‌بات هوشمند برای کسب و کار شما طراحی کنیم که در تلگرام، وب‌سایت و از طریق API قابل استفاده باشه.",
          "چت‌بات‌های ما با هوش مصنوعی پیشرفته کار می‌کنن و می‌تونن به سوالات مشتریان شما پاسخ بدن.",
          "ما چت‌بات‌هایی طراحی می‌کنیم که ۲۴ ساعته در دسترس هستن و می‌تونن حجم زیادی از درخواست‌ها رو مدیریت کنن.",
          "قیمت چت‌بات بستگی به پیچیدگی و ویژگی‌هاش داره. می‌تونیم یه جلسه مشاوره رایگان داشته باشیم.",
          "چت‌بات‌های ما قابلیت یادگیری دارن و با گذشت زمان بهتر عمل می‌کنن.",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          isUser: false,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const integrationOptions = [
    {
      icon: FiSmartphone,
      title: "تلگرام بات",
      description: "چت‌بات هوشمند در تلگرام که مشتریان می‌تونن مستقیماً باهاش ارتباط برقرار کنن",
      features: ["پاسخ خودکار", "مدیریت سفارشات", "پشتیبانی ۲۴/۷"],
      link: "/Telegram"
    },
    {
      icon: FiCode,
      title: "API Integration",
      description: "ادغام چت‌بات با سیستم‌های موجود شما از طریق API قدرتمند",
      features: ["RESTful API", "Webhook Support", "مستندات کامل"],
      link: "/API"
    },
    {
      icon: FiGlobe,
      title: "ویجت وب‌سایت",
      description: "چت‌بات تعبیه شده در وب‌سایت شما با طراحی سفارشی",
      features: ["طراحی سفارشی", "نصب آسان", "واکنش‌گرا"],
      link: "/Widget"
    },
  ]

  const features = [
    {
      icon: FiZap,
      title: "پاسخ سریع",
      description: "پاسخ‌دهی در کمتر از ۲ ثانیه",
    },
    {
      icon: AiFillRobot,
      title: "هوش مصنوعی پیشرفته",
      description: "استفاده از آخرین تکنولوژی‌های AI",
    },
    {
      icon: FiShield,
      title: "امنیت بالا",
      description: "حفاظت کامل از اطلاعات مشتریان",
    },
    {
      icon: FiClock,
      title: "دسترسی ۲۴/۷",
      description: "خدمات بدون وقفه در تمام ساعات",
    },
  ]

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
              variant="secondary" onclick={() => chatboxRef.scrollIntoView({behavior: "smooth"})}
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

        {/* Live Chat Demo */}
        <div class="mb-16" ref={chatboxRef} >
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">تست کنید</h2>
            <p class="text-muted-foreground max-w-2xl mx-auto">
              با چت‌بات نمونه ما صحبت کنید و سرعت و کیفیت پاسخ‌ها را تجربه کنید
            </p>
          </div>

          <div class="max-w-2xl mx-auto">
            <div class="bg-card border rounded-lg overflow-hidden">
              {/* Chat Header */}
              <div class="bg-primary/10 p-4 border-b">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <AiFillRobot class="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 class="font-medium">دستیار هوشمند پویان</h3>
                    <p class="text-sm text-muted-foreground">آنلاین</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div class="h-96 overflow-y-auto p-4 space-y-4">
                {messages().map((message) => (
                  <div  class={`flex ${message.isUser ? "justify-start" : "justify-end"}`}>
                    <div
                      class={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p class="text-sm">{message.text}</p>
                      <p class="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString("fa-IR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping() && (
                  <div class="flex justify-end">
                    <div class="bg-muted text-muted-foreground px-4 py-2 rounded-lg">
                      <div class="flex space-x-1">
                        <div class="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div
                          class="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ "animation-delay": "0.1s" }}
                        ></div>
                        <div
                          class="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ "animation-delay": "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div class="p-4 border-t">
                <div class="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage()}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="پیام خود را بنویسید..."
                    class="flex-1 px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={isTyping()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage().trim() || isTyping()}
                    class="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <FiSend class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

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
