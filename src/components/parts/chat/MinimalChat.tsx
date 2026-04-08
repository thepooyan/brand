import { nameEn } from "../../../../config/config";
import { FiSend } from "solid-icons/fi"
import { createEffect, createSignal, ParentProps, Show } from "solid-js"
import { Button } from "~/components/ui/button"
import { useUserChat } from "~/lib/chatUtil";
import { callModal } from "~/components/layout/Modal";
import { createAsync, query, redirect } from "@solidjs/router";
import { db } from "~/db/db";
import { getAuthSession } from "~/lib/session";
import { and, eq } from "drizzle-orm";
import { Fetch, fetchFail, fetchSuccess } from "~/lib/actionAbstraction";
import { safeDb } from "~/lib/utils";
import { Chatbot } from "~/db/schema";
import { Muted } from "~/components/prose/prose-item";

interface props {
  botId: string
}

const Message = (props: ParentProps<{ right?: boolean, ref?: HTMLDivElement }>) => {
  return (
    <div class={`flex ${props.right === true ? "justify-start" : "justify-end"}`}>
      <div
        class={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          props.right === true ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        <p class="text-sm" ref={props.ref}>{props.children}</p>
      </div>
    </div>
  )
}

const queryBotName = query(async (botId: string):Fetch<Chatbot> => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect(`/Login?back=/Panel/Testbot/${botId}`)

  let res = await safeDb(
    db.query.chatbotTable.findFirst({
      where: (tbl => and(
        eq(tbl.userId, user.id),
        eq(tbl.id, parseInt(botId)),
      ))
    })
  )
  if (!res.ok) return {...res, data: undefined}
  if (!res.data) return fetchFail("ربات یافت نشد")

  return fetchSuccess(res.data)
}, "botName")

const MinimalChat = ({botId}:props) => {
  let anchor!: HTMLDivElement
  let messagesRailRef!: HTMLDivElement

  const botName = createAsync(() => queryBotName(botId))

  createEffect(() => {
    let bi = botName()
    if (bi?.ok === false) {
      callModal.fail(bi.msg)
    }
  })

  const {messages, send, pending, streaming, errorMsg} = useUserChat( botId )(
    () => anchor,
    () => scrollToBottom()
  )
  const [inputMessage, setInputMessage] = createSignal("")
  let inputRef!: HTMLInputElement

  const proccessing = () => {
    return pending() || streaming()
  }

  createEffect(() => {
    let a = errorMsg()
    if (a !== null)
    callModal.fail(a)
  })

  createEffect(() => {
    proccessing()
    inputRef.focus()
  })

  const scrollToBottom = () => {
    messagesRailRef.scrollTo({
      top: messagesRailRef.scrollHeight,
      behavior: "smooth"
    })
  }

  createEffect(() => {
    messages()
    pending()
    streaming()
    scrollToBottom()
  })

  const Suggest = (p:{children: string}) => <div class={` p-2 text-xs rounded-md w-max text-accent-foreground 
    border-1 bg-muted hover:bg-accent cursor-pointer `}
    onclick={() => send(p.children)}
  >
    {p.children}
  </div>

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
              <div class="h-10 w-10 rounded-full flex items-center justify-center">
                <img src="/logo.webp" alt={`${nameEn}'s logo` }/>
              </div>
              <div>
                <h3 class="font-medium">{botName()?.data?.botName}</h3>
                <p class="text-sm text-muted-foreground">{botName()?.data?.businessName}</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div class="h-96 overflow-y-auto p-4 space-y-4" ref={messagesRailRef}>
            {botName()?.data?.greeting && <Message>
              {botName()?.data?.greeting}
            </Message>}
            {botName()?.data && messages().length === 0 && <div class="space-y-1">
              <Muted class="mb-2">
                سوالات پیشنهادی:
              </Muted>
              {botName()?.data?.suggestedQuestions.map(s => 
                <Suggest>{s}</Suggest>
              )}
            </div>}
            {messages().map((message) => (
              <Message right={message.role === "user"}>
                {message.content}
              </Message>
            ))}

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

            <Show when={streaming()}>
              <Message ref={anchor}></Message>
            </Show>
          </div>

          {/* Chat Input */}
          <div class="p-4 border-t">
            <div class="flex gap-2">
              <input
                type="text"
                ref={inputRef}
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
