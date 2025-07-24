import { createEffect, createSignal, Show } from "solid-js"
import Input from "./ui/input"
import { Card } from "./ui/card"
import { FiMessageCircle, FiMoon, FiSend, FiSun, FiX } from "solid-icons/fi"
import { Button } from "./ui/button"
import { cn } from "~/lib/utils"
import PendingMsg from "./parts/chat/PendingMsg"
import { useChat } from "~/lib/chatUtil"

interface ChatWidgetProps {
  className?: string
}

export function Widget({ className }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = createSignal(true)
  const [isDark, setIsDark] = createSignal(false)
  const [inputValue, setInputValue] = createSignal("")

  let streamRef!:HTMLDivElement  
  let messagesEndRef!:HTMLDivElement  

  const {messages, pending, streaming, send} = useChat(() => streamRef)

  const scrollToBottom = () => {
    messagesEndRef?.scrollIntoView({ behavior: "smooth" })
  }

  createEffect(() => {
    scrollToBottom()
    messages()
    isOpen()
    pending()
  })

  const toggleWidget = () => {
    setIsOpen(!isOpen())
  }

  const toggleTheme = () => {
    setIsDark(!isDark())
  }

  const sendMessage = () => {
    if (!inputValue().trim()) return


    send(inputValue().trim())
    setInputValue("")

  }

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <>
      {/* Theme Toggle */}
      <Button onClick={toggleTheme} variant="ghost" size="sm" class="fixed top-4 right-4 z-50">
        {isDark() ? <FiSun class="h-4 w-4" /> : <FiMoon class="h-4 w-4" />}
      </Button>

      <div class={cn("fixed bottom-6 right-6 z-50 ", className)}>
        {/* Chat Window */}
        {isOpen() && (
          <div class="mb-4 shadow-lg  ">
            <Card class="w-90 h-[80dvh] shadow-2xl  bg-background/95 backdrop-blur-sm flex flex-col
              absolute bottom-0 z-20 right-0 border-1 animate-content-show 
              ">
              {/* Header */}
              <div class="flex items-center justify-between p-4 border-b border-border">
                <div class="flex items-center">
                  <img src="/logo.webp" alt="Hooshban's logo" class="h-15"/>
                  <div>
                    <h3 class="font-semibold text-foreground">پشتیبانی هوشمند</h3>
                    <p class="text-sm text-muted-foreground">آماده پاسخگویی</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={toggleWidget} class="h-8 w-8 p-0 hover:bg-muted">
                  <FiX class="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <div class="flex-1 p-4 overflow-y-auto space-y-3">
                {messages().map((message) => (
                  <div
                    class={`flex ${message.role !== "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      class={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                <Show when={pending()}>
                  <PendingMsg size="sm"/>
                </Show>
                <Show when={streaming()}>
                  <div ref={streamRef} class={`max-w-[80%] p-3 rounded-lg text-sm bg-muted text-muted-foreground mr-auto`}/>
                </Show>
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div class="p-4 border-t border-border">
                <div class="flex space-x-2 items-center">
                  <Input
                    value={inputValue()}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    class="flex-1"
                  />
                  <Button onClick={sendMessage} size="sm" class="px-3">
                    <FiSend class="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Chat Button - Fixed position */}
        <div class="relative w-14 h-14">
          {/* Pulse animation background */}
          {!isOpen() && (
            <div class="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 pointer-events-none" />
          )}

          {/* Main Chat Button */}
          <Button
            onClick={toggleWidget}
            class="absolute inset-0 w-14 h-14 rounded-full shadow-lg transition-all duration-200 ease-in-out bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 active:scale-95"
          >
            {isOpen() ? (
              <FiX class="h-6 w-6 transition-transform duration-200" />
            ) : (
              <FiMessageCircle class="h-6 w-6 transition-transform duration-200" />
            )}
          </Button>
        </div>
      </div>
    </>
  )
}

