import { name, nameEn } from "../../../../config/config";
import { FiSend } from "solid-icons/fi"
import { createEffect, createSignal } from "solid-js"
import { Button } from "~/components/ui/button"
import { useUserChat } from "~/lib/chatUtil";
import { usersTable } from "~/db/schema";

interface props {
  user: typeof usersTable.$inferSelect,
  botId: string
}
const MinimalChat = ({user, botId}:props) => {
  let anchor!: HTMLDivElement
  let messagesRailRef!: HTMLDivElement

  const {messages, send, pending, streaming} = useUserChat( String(user.id), botId )(() => anchor)
  const [inputMessage, setInputMessage] = createSignal("")

  const proccessing = () => {
    return pending() || streaming()
  }

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
    send(inputMessage().trim())
    setInputMessage("")
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
                <img src="/mini-logo.webp" alt={`${nameEn}'s logo` }/>
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
              <div  class={`flex ${message.role === "user" ? "justify-start" : "justify-end"}`}>
                <div
                  class={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p class="text-sm">{message.content}</p>
                  {/*<p class="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>*/}
                </div>
              </div>
            ))}

            <div ref={anchor}></div>

            {pending() && (
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
                disabled={proccessing()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage().trim() || proccessing()}
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
