import { History } from "~/db/schema"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { getUserNickname } from "~/lib/utils"
import { Accessor, ParentProps } from "solid-js"

export type HistoryWithName = History & {chatbot: {botName: string}}
interface p {
  histroy: HistoryWithName
  idx: Accessor<number>
}
const HistoryCard = ({histroy, idx}:p) => {
  return (
    <Card class="flex justify-between items-center mb-3">
      <CardHeader>
        <CardTitle>مکالمه {idx()+1}</CardTitle>
        <CardDescription>{histroy.chatbot.botName}</CardDescription>
      </CardHeader>
        <div>
          <Big>
            کاربر:
          </Big>
          <Small>
           {getUserNickname(histroy.userIP)}
          </Small>
        </div>
        <div>
          <Big>
            تاریخ آخرین پیام:
          </Big>
          <Small>
           {new Date(histroy.lastUpdated).toLocaleDateString("fa-IR")}
          </Small>
        </div>
        <div>
          <Big>
            آخرین پیام:
          </Big>
          <Small>
           {histroy.messages.at(-1)?.content}
          </Small>
        </div>
      <div class="ml-5 space-x-1">
        <Button class="" size="sm">
          نمایش کامل
        </Button>
        <Button variant="destructive" size="sm">
          حذف
        </Button>
      </div>
    </Card>
  )
}

const Big = ({children}:ParentProps) => <div class="mb-1 font-bold text-sm">{children}</div>

const Small = ({children}:ParentProps) => <div class="text-xs text-muted-foreground">{children}</div>

export default HistoryCard
