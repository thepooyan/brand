import { createSignal, For, Show, createEffect } from 'solid-js'
import { Send, Bot } from 'lucide-solid'
import { Button } from '../ui/button'
import RightSide from '../parts/DemoRightSide'
import { name } from '../../../config/config'
import { useChat } from '~/lib/chatUtil'
import Message from '../parts/chat/Message'

export default function ChatbotDemoPage() {
  const [inputMessage, setInputMessage] = createSignal('')

  let messagesRailRef!:HTMLDivElement
  let streamElementRef!:HTMLDivElement

  const time = new Date().toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const streamChat = (chunk: string) => {streamElementRef.innerText = chunk; scrollToBottom()}

  const {messages, pending, streaming, send} = useChat(streamChat)

  const scrollToBottom = () => {
    messagesRailRef.scrollTo({
      top: messagesRailRef.scrollHeight,
      behavior: "smooth"
    })
  }

  createEffect(() => {
    pending()
    scrollToBottom()
  })

  const handleSendMessage = () => {
    const msg = inputMessage().trim()
    if (!msg) return
    send(msg)
    setInputMessage('')
  }

  const handleQuickQuestion = (q:string) => setInputMessage(q)

  const quickQuestions = [
    'چت‌بات چقدر قیمت داره؟',
    'چه مدت زمان برای ساخت لازم داره؟',
    'می‌تونه با تلگرام کار کنه؟',
    'آیا با وب‌سایت ادغام می‌شه؟'
  ]

  return (
    <div class="min-h-screen bg-background" dir="rtl">
      <div class="flex h-dvh ">
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
                  <div class="h-2 w-2 bg-green-500 rounded-full absolute animate-ping duration-2000"></div>
                  آنلاین و آماده پاسخگویی
                </div>
              </div>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-4" ref={messagesRailRef}>
            <Message timestamp={time}>سلام! من دستیار هوشمند {name} هستم. چطور می‌تونم کمکتون کنم؟</Message>
            <For each={messages()}>{(message) => <Message isUser={message.role === "user"}>{message.content}</Message>}</For>
            <Show when={pending()}>
              <div class="flex justify-end">
                <div class="bg-muted text-foreground px-4 py-4 rounded-lg rounded-bl-sm">
                  <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-current rounded-full animate-bounce" style="animation-delay:0.1s"></div>
                    <div class="w-2 h-2 bg-current rounded-full animate-bounce" style="animation-delay:0.2s"></div>
                  </div>
                </div>
              </div>
            </Show>
            <Show when={streaming()}>
              <Message ref={streamElementRef}></Message>
            </Show>
          </div>

          <div class="px-6 py-4 border-t">
            <p class="text-sm text-muted-foreground mb-3">سوالات متداول:</p>
            <div class="flex flex-wrap gap-2">
              <For each={quickQuestions}>{(q) => (
                <button
                  onClick={() => handleQuickQuestion(q)}
                  class="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full transition-colors cursor-pointer"
                  disabled={pending()}
                >
                  {q}
                </button>
              )}</For>
            </div>
          </div>

          <div class="p-3 px-2 border-t">
            <div class="flex gap-3 items-center">
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
                disabled={pending()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage().trim() || pending()}
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
