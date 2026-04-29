import Spinner from "./Spinner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { FiTrash2, FiEdit, FiKey, FiSend, FiLock } from "solid-icons/fi"
import { ImTelegram } from "solid-icons/im"
import { chatbotStatus } from "~/lib/interface"
import { callModal } from "../layout/Modal"
import TA from "./TA"
import { cn } from "~/lib/utils"
import { deleteChatbot } from "~/server/actions"
import { revalidate, useNavigate } from "@solidjs/router"
import { getNewToken } from "~/server/botActions"
import NewTokenAlert from "./bot/NewTokenAlert"
import TelegramSet from "./TelegramSet"
import { Accessor } from "solid-js"
import Restriction from "../pages/Restriction"
import { usePanelTransitiveNavigate } from "~/lib/routeChangeTransition"
import { FaSolidGear, FaSolidGraduationCap } from "solid-icons/fa"

interface props {
  bot: chatbotStatus 
  telegramAccess: Accessor<boolean>
}
const BotCard = ({bot, telegramAccess}:props) => {

  const deleteBot = async () => {
    callModal.prompt(`ربات "${bot.botName}" حذف شود؟`)
    .yes(async () => {
        let response = await deleteChatbot(bot.id)
        if (response.ok) {
          callModal.success()
          await revalidate("bots")
        }
        else callModal.fail(response.msg)
      })
  }

  const handleLimitation = () => {
    callModal(() => <Restriction initial={bot.limitation} bot_id={bot.id}/>)
  }

  const getToken = () => {
    callModal.prompt("توکن جدید ایجاد شود؟ (با تولید توکن جدید توکن قبل از بین خواهد رفت)")
    .yes( async () => {
        const result = await getNewToken(bot.id)
        if (result.ok) {
          callModal(() => <NewTokenAlert token={result.data}/>)
        } else {
          callModal.fail(result.msg)
        }
      })
  }

  const navigate = useNavigate()

  const handleTelegram = () => {
    if (telegramAccess())
      callModal(() => <TelegramSet navigate={navigate} />)
    else
    callModal.fail("متاسفانه پلن فعلی شما شامل اتصال به تلگرام نمیباشد. لطفا پلن خود را ارتقا دهید.")
  }

  return (
    <Card>
      <CardHeader class="pb-4 h-25">
        <CardTitle> {bot.botName}</CardTitle>
        <CardDescription>{bot.businessName}</CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span>تعداد مکالمات: </span>
            {bot.history?.length || "0"}
          </div>
          <div class="flex justify-between">
            <span>محدودیت تعداد پیام:</span>
            {bot.limitation || "ندارد"}
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="destructive"
            onclick={() => deleteBot()}
          >
            <FiTrash2 class="w-3 h-3 ml-1" />
            حذف
          </Button>
          <Button
            size="sm"
            variant="secondary"
            as={TA}
            navigatorHook={usePanelTransitiveNavigate}
            href={`/Panel/Edit-Bot/${bot.id}`}
          >
            <FiEdit class="w-3 h-3 ml-1" />
            ویرایش
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onclick={handleTelegram}
          >
            <ImTelegram class="w-3 h-3 ml-1 text-blue-600" />
            اتصال به تلگرام
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onclick={getToken}
          >
            <FiKey class="w-3 h-3 ml-1" />
            دریافت توکن
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onclick={handleLimitation}
          >
            <FiLock class="w-3 h-3 ml-1" />
            اعمال محدودیت
          </Button>
          <Button
            size="sm"
            variant="secondary"
            as={TA}
            href={`training/${bot.id}`}
          >
            <FaSolidGraduationCap class="w-3 h-3 ml-1" />
            آموزش
          </Button>

          <Button
            size="sm"
            class={cn("col-span-2",
              false && "opacity-30 pointer-events-none"
            )}
            as={TA} href={`/Panel/Testbot/${bot.id}`}
            navigatorHook={usePanelTransitiveNavigate}
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
    class=" h-97 w-full rounded-md bg-gray-900 animate-pulse flex justify-center border-2 border-dashed border-gray-800"
  >
    <Spinner reverse/>
  </div>
}
