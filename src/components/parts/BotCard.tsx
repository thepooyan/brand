import Spinner from "./Spinner"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { FiTrash2, FiEdit, FiKey, FiSend } from "solid-icons/fi"
import { ImTelegram } from "solid-icons/im"
import { chatbotStatus } from "~/lib/interface"

interface props {
  bot: chatbotStatus
}
const BotCard = ({bot}:props) => {

  const deleteBot = () => {}

  return (
    <Card
      class="hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 border-gray-800 bg-gray-900 hover:border-primary-700"
    >
      <CardHeader class="pb-4">
        <div class="flex items-center justify-between">
          <CardTitle class="text-lg text-white">{bot.botName}</CardTitle>
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
            <span class="font-medium text-white">{bot.expirationDate.getDate()}</span>
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
              onclick={() => deleteBot()}

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
              <ImTelegram class="w-3 h-3 ml-1" />
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
  )
}

export default BotCard

export const BotCardFallback = () => {
  return <div
    class=" h-97 w-97 rounded-md bg-gray-900 animate-pulse flex justify-center"
  >
    <Spinner reverse/>
  </div>
}
