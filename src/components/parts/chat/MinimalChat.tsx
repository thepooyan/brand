import { name, nameEn } from "../../../../config/config";
import { FiSend } from "solid-icons/fi"
import { createEffect, createSignal, ParentProps, Show } from "solid-js"
import { Button } from "~/components/ui/button"
import { useUserChat } from "~/lib/chatUtil";
import { callModal } from "~/components/layout/Modal";
import { createAsync, query, redirect } from "@solidjs/router";
import { db } from "~/db/db";
import { getAuthSession } from "~/lib/session";
import { and, eq } from "drizzle-orm";
import { safeDb } from "~/lib/utils";
import { ActionResponse, ActionResponse2 } from "~/lib/actionAbstraction";

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

type query = {botName: string, businessName: string }
const queryBotName = query(async (botId: string):ActionResponse2<query> => {
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
  if (!res.data) return {ok: false, msg: "ربات یافت نشد", data: undefined}

  return {ok: true,msg: undefined, data: {
    botName: res.data.botName,
    businessName: res.data.businessName,
  }}
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

  const proccessing = () => {
    return pending() || streaming()
  }

  createEffect(() => {
    let a = errorMsg()
    if (a !== null)
    callModal.fail(a)
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
                <h3 class="font-medium">دستیار هوشمند {botName()?.data?.botName}</h3>
                <p class="text-sm text-muted-foreground">{botName()?.data?.businessName}</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div class="h-96 overflow-y-auto p-4 space-y-4" ref={messagesRailRef}>
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
