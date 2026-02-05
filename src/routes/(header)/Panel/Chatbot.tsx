import { Card, CardContent,  } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { FiPlus, FiBookOpen, FiCode, FiGlobe } from "solid-icons/fi"
import { chatbotStatus } from "~/lib/interface"
import { createAsync, query, redirect } from "@solidjs/router"
import { db } from "~/db/db"
import { chatbotTable, chatbotStatusTable } from "~/db/schema"
import { eq } from "drizzle-orm"
import { getAuthSession } from "~/lib/session"
import { Suspense } from "solid-js"
import TA from "~/components/parts/TA"
import BotCard, { BotCardFallback } from "~/components/parts/BotCard"
import { pageMarker } from "~/lib/routeChangeTransition"

const getBots = query(async () => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect("/Login?back=/panel/ChatBot")

  return (await db
  .select({
    id: chatbotStatusTable.id,
    plan: chatbotStatusTable.plan,
    messageCount: chatbotStatusTable.messageCount,
    remainingMessages: chatbotStatusTable.remainingMessages,
    expirationDate: chatbotStatusTable.expirationDate,
    botName: chatbotTable.botName,
  })
  .from(chatbotStatusTable)
  .innerJoin(chatbotTable, eq(chatbotStatusTable.id, chatbotTable.id))
  .where(eq(chatbotTable.userId, user.id)))
}, "bots")

export default function Component() {

  const bots = createAsync(() => getBots())

  const pBots = ():chatbotStatus[] => {
    return bots()?.map((b) => ({...b, isActive: b.remainingMessages !== 0 })) || []
  }

  return (
    <div class="min-h-screen p-6 border-1 rounded-lg bg-zinc-950 " {...pageMarker()} >
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
            >
              <FiBookOpen class="w-4 h-4" />
              آموزش استفاده در تلگرام
            </Button>
            <Button
              variant="outline"
              size="sm"
              class="gap-2 border-primary-700 text-primary-300 hover:bg-primary-950 hover:text-primary-200 bg-gray-900"
            >
              <FiGlobe class="w-4 h-4" />
              آموزش استفاده به عنوان ویجت
            </Button>
            <Button
              variant="outline"
              size="sm"
              class="gap-2 border-primary-700 text-primary-300 hover:bg-primary-950 hover:text-primary-200 bg-gray-900"
            >
              <FiCode class="w-4 h-4" />
              API
            </Button>
          </div>
        </div>

        {/* Bots Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-10">
          <Suspense fallback={<BotCardFallback/>}>
            {pBots()?.map((bot) => <BotCard bot={bot} />)}
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
                as={TA} href="/Place-Order/Chatbot"
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

