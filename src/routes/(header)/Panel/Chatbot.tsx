import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { FiPlus, FiTrash2, FiPower, FiEdit, FiMessageCircle, FiKey, FiSend, FiBookOpen, FiCode, FiGlobe } from "solid-icons/fi"
import { bots as dummy } from "~/data/dummy"
import { createSignal } from "solid-js"
import { callModal } from "~/components/layout/Modal"
import { chatbotStatus } from "~/lib/interface"

export default function Component() {

  const [bots, setBots] = createSignal(dummy)

  const deleteBot = (bot: chatbotStatus) => {
    callModal.prompt(`آیا مایل به حذف ربات "${bot.name}" هستید؟`)
    .yes(() => {

      })
  }

  return (
    <div class="min-h-screen p-6 border-1 rounded-lg bg-zinc-950 " dir="rtl">
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
          {bots().map((bot) => (
            <Card
              class="hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 border-gray-800 bg-gray-900 hover:border-primary-700"
            >
              <CardHeader class="pb-4">
                <div class="flex items-center justify-between">
                  <CardTitle class="text-lg text-white">{bot.name}</CardTitle>
                  <div class="flex items-center gap-2">
                    <Badge class={bot.isActive ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
                      {bot.isActive ? "فعال" : "غیرفعال"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent class="space-y-4">
                {/* Bot Info */}
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-400">پلن:</span>
                    <span class="font-medium text-white">{bot.plan}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-400">تعداد پیام:</span>
                    <span class="font-medium text-white">{bot.messageCount.toLocaleString("fa-IR")}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-400">تعداد پیام باقی مانده:</span>
                    <span class="font-medium text-white">{bot.remainingMessages.toLocaleString("fa-IR")}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-400">تاریخ انقضا:</span>
                    <span class="font-medium text-white">{bot.expirationDate}</span>
                  </div>
                </div>

                {/* Progress Bar for Remaining Messages */}
                <div class="w-full bg-gray-800 rounded-full h-2">
                  <div
                    class="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(bot.remainingMessages / (bot.messageCount + bot.remainingMessages)) * 100}%`,
                    }}
                  />
                </div>

                {/* Action Buttons */}
                <div class="space-y-3 pt-2">
                  {/* First Group: Delete, Deactivate, Edit */}
                  <div class="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      class="flex-1 text-red-400 border-red-800 hover:bg-red-950 hover:text-red-300 bg-gray-800"
                      onclick={() => deleteBot(bot)}

                    >
                      <FiTrash2 class="w-3 h-3 ml-1" />
                      حذف
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      class="flex-1 text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white bg-gray-800"
                    >
                      <FiEdit class="w-3 h-3 ml-1" />
                      ویرایش
                    </Button>
                  </div>

                  {/* Second Group: Connect to Telegram, Switch Token */}
                  <div class="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      class="flex-1 text-primary-300 border-primary-800 hover:bg-primary-950 hover:text-primary-200 bg-gray-800"
                    >
                      <FiMessageCircle class="w-3 h-3 ml-1" />
                      اتصال به تلگرام
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      class="flex-1 text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white bg-gray-800"
                    >
                      <FiKey class="w-3 h-3 ml-1" />
                      تغییر توکن
                    </Button>
                  </div>

                  {/* Third Group: Send Message (Separate) */}
                  <Button
                    size="sm"
                    class="w-full bg-primary hover:bg-primary-600 text-white shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <FiSend class="w-3 h-3 ml-1" />
                    ارسال پیام
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {/* Add New Bot Card */}
          <Card class="hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 border-gray-800 bg-gray-900 hover:border-primary-700 border-dashed border-2">
            <CardContent class="flex flex-col items-center justify-center h-full py-12">
              <div class="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <FiPlus class="w-6 h-6 text-primary" />
              </div>
              <h3 class="text-lg font-medium mb-2 text-white">افزودن ربات جدید</h3>
              <p class="text-sm text-gray-400 text-center mb-4">یک چت بات جدید برای کسب و کار خود ایجاد کنید</p>
              <Button class="w-full bg-primary hover:bg-primary-600 text-white shadow-lg hover:shadow-primary/25 transition-all duration-300">
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

