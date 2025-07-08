import { createSignal, onMount, For, Show } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Send, Bot } from 'lucide-solid'
import { Button } from '../ui/button'
import RightSide from '../parts/DemoRightSide'
import { name } from '../../../config/config'

const initialMessages = [
  {
    id: '1',
    text: `سلام! من دستیار هوشمند ${name} هستم. چطور می‌تونم کمکتون کنم؟`,
    isUser: false,
    timestamp: new Date()
  }
]

export default function ChatbotDemoPage() {
  const [messages, setMessages] = createStore(initialMessages)
  const [inputMessage, setInputMessage] = createSignal('')
  const [isTyping, setIsTyping] = createSignal(false)
  let messagesEndRef!:HTMLDivElement

  const scrollToBottom = () => {
    messagesEndRef?.scrollIntoView({ behavior: 'smooth' })
  }

  onMount(() => {
    // scrollToBottom()
  })

  const handleSendMessage = () => {
    const msg = inputMessage().trim()
    if (!msg) return

    const userMessage = {
      id: Date.now().toString(),
      text: msg,
      isUser: true,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInputMessage('')
    setIsTyping(true)

    setTimeout(() => {
      const responses = [
        'بله، ما می‌تونیم چت‌بات هوشمند برای کسب و کار شما طراحی کنیم...',
        'چت‌بات‌های ما با هوش مصنوعی پیشرفته کار می‌کنن...',
        'ما چت‌بات‌هایی طراحی می‌کنیم که ۲۴ ساعته در دسترس هستن...',
        'قیمت چت‌بات بستگی به پیچیدگی و ویژگی‌هاش داره...',
        'چت‌بات‌های ما قابلیت یادگیری دارن...',
        'می‌تونیم چت‌بات رو طوری تنظیم کنیم که با سبک و لحن برند شما هماهنگ باشه.',
        'چت‌بات‌های ما می‌تونن با سیستم‌های CRM و پایگاه داده شما ادغام بشن.',
        'ما پشتیبانی کامل و آپدیت‌های منظم برای چت‌بات‌ها ارائه می‌دیم.'
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      }

      setMessages([...messages, aiMessage])
      setIsTyping(false)
      scrollToBottom()
    }, 800 + Math.random() * 1500)
  }

  const handleQuickQuestion = (q:any) => setInputMessage(q)

  const quickQuestions = [
    'چت‌بات چقدر قیمت داره؟',
    'چه مدت زمان برای ساخت لازم داره؟',
    'می‌تونه با تلگرام کار کنه؟',
    'آیا با وب‌سایت ادغام می‌شه؟'
  ]

  return (
    <div class="min-h-screen bg-background" dir="rtl">

      <div class="flex h-[calc(100vh-73px)]">
        <div class="flex-1 flex flex-col bg-card border-l">
          <div class="bg-primary/10 p-6 border-b">
            <div class="flex items-center gap-4">
              <div class="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Bot class="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 class="text-xl font-bold">دستیار هوشمند {name}</h2>
                <div class="text-sm text-muted-foreground flex items-center gap-2">
                  <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                  آنلاین و آماده پاسخگویی
                </div>
              </div>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            <For each={messages}>{(message) => (
              <div class={`flex ${message.isUser ? 'justify-start' : 'justify-end'}`}>
                <div
                  class={`max-w-md px-4 py-3 rounded-lg ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                  }`}
                >
                  <p class="text-sm leading-relaxed">{message.text}</p>
                  <p class="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString('fa-IR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            )}</For>
            <Show when={isTyping()}>
              <div class="flex justify-end">
                <div class="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-sm">
                  <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-current rounded-full animate-bounce" style="animation-delay:0.1s"></div>
                    <div class="w-2 h-2 bg-current rounded-full animate-bounce" style="animation-delay:0.2s"></div>
                  </div>
                </div>
              </div>
            </Show>
            <div ref={messagesEndRef}></div>
          </div>

          <div class="px-6 py-4 border-t">
            <p class="text-sm text-muted-foreground mb-3">سوالات متداول:</p>
            <div class="flex flex-wrap gap-2">
              <For each={quickQuestions}>{(q) => (
                <button
                  onClick={() => handleQuickQuestion(q)}
                  class="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full transition-colors"
                  disabled={isTyping()}
                >
                  {q}
                </button>
              )}</For>
            </div>
          </div>

          <div class="p-6 border-t">
            <div class="flex gap-3">
              <input
                type="text"
                value={inputMessage()}
                onInput={(e) => setInputMessage(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="پیام خود را بنویسید..."
                class="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isTyping()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage().trim() || isTyping()}
                class="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                <Send class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side left out for brevity */}
        <RightSide/>
      </div>
    </div>
  )
}
