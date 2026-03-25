import { Card, CardContent,  } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { FiPlus, FiBookOpen, FiCode, FiGlobe } from "solid-icons/fi"
import { createAsync, query, redirect } from "@solidjs/router"
import { db } from "~/db/db"
import { eq } from "drizzle-orm"
import { getAuthSession } from "~/lib/session"
import { For, Suspense } from "solid-js"
import TA from "~/components/parts/TA"
import BotCard, { BotCardFallback } from "~/components/parts/BotCard"
import { ActionResponse2 } from "~/lib/actionAbstraction"
import { callModal } from "~/components/layout/Modal"
import { chatbotStatus } from "~/lib/interface"
import { userPermissions } from "~/sections/plan"

type initialData = {
  bots: chatbotStatus[],
  canHaveMoreBots: boolean,
  telegramAccess: boolean
}
const getInitialData = query(async ():ActionResponse2<initialData> => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/panel/ChatBot")

  return await db.transaction(async ctx => {

    let dbUser = await ctx.query.usersTable.findFirst({
      where: (tbl => eq(tbl.id, user.id)),
      with: {current_plans: true, bots: true}
    })
    if (!dbUser) return {ok: false, msg: "کاربر لوگین شده یافت نشد"}

    const userBots = await ctx.query.chatbotTable.findMany({
      where: (tbl => eq(tbl.userId, dbUser.id)),
      with: {history: true},
      columns: {id: true, botName: true, limitation: true, businessName: true}
    })

    const userp = userPermissions(dbUser)

    return {ok: true, data: {canHaveMoreBots: userp.moreBots || false, bots: userBots, telegramAccess: userp.telegram || false} }
  })
}, "bots")

export default function Component() {

  const initialData = createAsync(() => getInitialData())

  const moreBotsPermission = () => {
    let d = initialData()
    if (d?.ok) {
      return d.data.canHaveMoreBots
    }
    return false
  }

  const telegramPermission = () => {
    let d = initialData()
    if (d?.ok) {
      return d.data.telegramAccess
    }
    return false
  }

  const checkPermission = () => {
    if (!moreBotsPermission())
      callModal.fail("جهت ساخت ربات های بیشتر، اکانت خود را ارتقا دهید")
  }

  const bots = () => {
    let result = initialData()
    if (!result) return []
    if (result.ok) {
      return result.data.bots
    } else {
      callModal.fail(result.msg)
      return []
    }
  }

  return (
    <div class="min-h-screen p-6 ">
      <div class="max-w-7xl mx-auto">
        {/* Header */}
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-bold text-white">چت بات های فعال شما</h1>

          {/* Three buttons at top left */}
          <div class="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              as={TA} href="/docs/chat-bot/telegram"
            >
              <FiBookOpen class="w-4 h-4" />
              آموزش استفاده در تلگرام
            </Button>
            <Button
              variant="outline"
              size="sm"
              as={TA} href="/docs/chat-bot/widget"
            >
              <FiGlobe class="w-4 h-4" />
              آموزش استفاده به عنوان ویجت
            </Button>
            <Button
              variant="outline"
              size="sm"
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
            <For each={bots()}>
              {b => <BotCard bot={b} telegramAccess={telegramPermission}/>}
            </For>
          </Suspense>

          <Card >
            <CardContent class="flex flex-col items-center justify-center h-full py-12">
              <div class="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <FiPlus class="w-6 h-6 text-primary" />
              </div>
              <h3 class="text-lg font-medium mb-2  ">افزودن ربات جدید</h3>
              <p class="text-sm text-muted-foreground text-center mb-4">یک چت بات جدید برای کسب و کار خود ایجاد کنید</p>
              <Button class="w-full bg-primary hover:bg-primary-600 text-white shadow-lg hover:shadow-primary/25 transition-all duration-300"
                {...(moreBotsPermission() ? {as: TA} : {} )}
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

