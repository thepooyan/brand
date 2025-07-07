import { FiSend } from "solid-icons/fi"
import { AiFillRobot } from "solid-icons/ai"
import { createEffect, createSignal } from "solid-js"
import { Button } from "~/components/ui/button"
import { name } from "../../../../config/config"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const MinimalChat = () => {
  const [messages, setMessages] = createSignal<Message[]>([
    {
      id: "1",
      text: `سلام! من دستیار هوشمند ${name} هستم. چطور می‌تونم کمکتون کنم؟`,
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = createSignal("")
  const [isTyping, setIsTyping] = createSignal(false)
  let messagesRailRef!: HTMLDivElement

  const scrollToBottom = () => {
    messagesRailRef.scrollTo({
      top: messagesRailRef.scrollHeight,
      behavior: "smooth"
    })
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
  return (
    <div class="mb-16">
      <div class="max-w-2xl mx-auto">
        <div class="bg-card border rounded-lg overflow-hidden">
          {/* Chat Header */}
          <div class="bg-primary/10 p-4 border-b">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                <AiFillRobot class="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 class="font-medium">دستیار هوشمند {name}</h3>
                <p class="text-sm text-muted-foreground">آنلاین</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div class="h-96 overflow-y-auto p-4 space-y-4" ref={messagesRailRef}>
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
                  <div class="flex space-x-1 py-2">
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
          </div>

          {/* Chat Input */}
          <div class="p-4 border-t">
            <div class="flex gap-2">
              <input
                type="text"
                value={inputMessage()}
                onKeyUp={(e) => setInputMessage(e.currentTarget.value)}
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
  )
}

export default MinimalChat
