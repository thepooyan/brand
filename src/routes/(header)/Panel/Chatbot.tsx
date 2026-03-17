import { Card, CardContent,  } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { FiPlus, FiBookOpen, FiCode, FiGlobe } from "solid-icons/fi"
import { createAsync, query, redirect } from "@solidjs/router"
import { db } from "~/db/db"
import { chatbotTable } from "~/db/schema"
import { eq } from "drizzle-orm"
import { getAuthSession } from "~/lib/session"
import { createEffect, For, Suspense } from "solid-js"
import TA from "~/components/parts/TA"
import BotCard, { BotCardFallback } from "~/components/parts/BotCard"
import { ActionResponse } from "~/lib/actionAbstraction"
import { callModal } from "~/components/layout/Modal"

type folan = {botName: string, id: number}
const getBots = query(async ():ActionResponse<{bots: folan[], canHaveMoreBots: boolean}> => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/panel/ChatBot")

  return db.transaction(async ctx => {

    let dbUser = await ctx.query.usersTable.findFirst({
      where: (tbl => eq(tbl.id, user.id)),
      with: {current_plan: true}
    })
    if (!dbUser) return {ok: false, msg: "کاربر لوگین شده یافت نشد"}
    const userBots = await ctx.query.chatbotTable.findMany({
      where: (tbl => eq(tbl.userId, dbUser.id))
    })

    const canHaveMoreBots = userBots.length < dbUser.current_plan.botCount

    let result = await ctx.select({
      botName: chatbotTable.botName,
      id: chatbotTable.id
    }).from(chatbotTable)
    .where(eq(chatbotTable.userId, user.id)) 
    return {ok: true, data: {canHaveMoreBots, bots: result} }
  })
}, "bots")

export default function Component() {

  const bots = createAsync(() => getBots())

  const permission = () => {
    let a = bots()
    if (a?.ok) {
      return a.data.canHaveMoreBots
    }
    return false
  }

  const checkPermission = () => {
    if (!permission())
      callModal.fail("جهت ساخت ربات های بیشتر، اکانت خود را ارتقا دهید")
  }

  const lala = () => {
    let result = bots()
    if (!result) return []
    if (result.ok) {
      return result.data.bots
    } else {
      callModal.fail(result.msg)
      return []
    }
  }

  createEffect(() => {
  })

  return (
    <div class="min-h-screen p-6 border-1 rounded-lg bg-zinc-950 ">
      <div class="max-w-7xl mx-auto">
        {/* Header */}
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold text-white">چت بات های فعال شما</h1>

          {/* Three buttons at top left */}
          <div class="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              class="gap-2 border-primary-700 text-primary-300 hover:bg-primary-950 hover:text-primary-200 bg-gray-900"
              as={TA} href="/docs/chat-bot/telegram"
            >
              <FiBookOpen class="w-4 h-4" />
              آموزش استفاده در تلگرام
            </Button>
            <Button
              variant="outline"
              size="sm"
              class="gap-2 border-primary-700 text-primary-300 hover:bg-primary-950 hover:text-primary-200 bg-gray-900"
              as={TA} href="/docs/chat-bot/widget"
            >
              <FiGlobe class="w-4 h-4" />
              آموزش استفاده به عنوان ویجت
            </Button>
            <Button
              variant="outline"
              size="sm"
              class="gap-2 border-primary-700 text-primary-300 hover:bg-primary-950 hover:text-primary-200 bg-gray-900"
              as={TA} href="/docs/chat-bot/api"
            >
              <FiCode class="w-4 h-4" />
              API
            </Button>
          </div>
        </div>

        {/* Bots Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-10">
          <Suspense fallback={<BotCardFallback/>}>
            <For each={lala()}>
              {a => <BotCard bot={a}/>}
            </For>
          </Suspense>
          {/* Add New Bot Card */}
          <Card class="border-gray-800 bg-gray-900 border-dashed border-2">
            <CardContent class="flex flex-col items-center justify-center h-full py-12">
              <div class="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <FiPlus class="w-6 h-6 text-primary" />
              </div>
              <h3 class="text-lg font-medium mb-2 text-white">افزودن ربات جدید</h3>
              <p class="text-sm text-gray-400 text-center mb-4">یک چت بات جدید برای کسب و کار خود ایجاد کنید</p>
              <Button class="w-full bg-primary hover:bg-primary-600 text-white shadow-lg hover:shadow-primary/25 transition-all duration-300"
                {...(permission() ? {as: TA} : {} )}
                href="/Place-Order/Chatbot" 
                onclick={checkPermission}
              >
                <FiPlus class="w-4 h-4 ml-1" />
                ایجاد چت بات
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

