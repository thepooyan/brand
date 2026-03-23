import { chatbot_history_table, History } from "~/db/schema"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { safeDb2 } from "~/lib/utils"
import { Accessor, ParentProps } from "solid-js"
import { callModal } from "../layout/Modal"
import { db } from "~/db/db"
import { eq } from "drizzle-orm"
import { getAuthSession } from "~/lib/session"
import { ActionResponse2 } from "~/lib/actionAbstraction"
import { revalidate } from "@solidjs/router"
import TA from "../parts/TA"

export type HistoryWithName = History & {chatbot: {botName: string}}
interface p {
  histroy: HistoryWithName
  idx: Accessor<number>
}

const deleteHistory = async (id: number):ActionResponse2 => {
  "use server"
  const user = await getAuthSession()
  if (!user) return {ok: false, msg: "ابتدا لوگین کنید", data: undefined}

  let a =  await safeDb2(
    db.delete(chatbot_history_table).where(eq(chatbot_history_table.id, id))
  )
  if (a.ok) 
    return {ok: true, msg: undefined, data: undefined}
  else
    return {ok: false, msg: a.msg, data: undefined}
}

const HistoryCard = ({histroy:h, idx}:p) => {

  const deleteMe = () => {
    callModal.prompt(`مکالمه ${idx()+1} حذف شود؟`)
    .yes(async () => {
      let {ok} = await deleteHistory(h.id)
      if (ok) {
        callModal.success()
        revalidate("botHistory")
      } else callModal.fail()
    })
  }

  return (
    <Card class="flex justify-between items-center mb-3">
      <CardHeader>
        <CardTitle>مکالمه {idx()+1}</CardTitle>
        <CardDescription>{h.chatbot.botName}</CardDescription>
      </CardHeader>
        <div>
          <Big>
            کاربر:
          </Big>
          <Small>
           {h.nickname}
          </Small>
        </div>
        <div>
          <Big>
            تاریخ آخرین پیام:
          </Big>
          <Small>
           {new Date(h.lastUpdated).toLocaleDateString("fa-IR")}
          </Small>
        </div>
        <div>
          <Big>
            آخرین پیام:
          </Big>
          <Small>
           {h.messages.at(-1)?.content}
          </Small>
        </div>
        <div>
          <Big>
            منبع:
          </Big>
          <Small>
           {h.source}
          </Small>
        </div>
      <div class="ml-5 space-x-1">
        <Button class="" size="sm" as={TA} href={`/Panel/history/${h.id}`}>
          نمایش کامل
        </Button>
        <Button variant="destructive" size="sm" onclick={deleteMe}>
          حذف
        </Button>
      </div>
    </Card>
  )
}

const Big = ({children}:ParentProps) => <div class="mb-1 font-bold text-sm">{children}</div>

const Small = ({children}:ParentProps) => <div class="text-xs text-muted-foreground">{children}</div>

export default HistoryCard
