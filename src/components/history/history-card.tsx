import { History } from "~/db/schema"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { getUserNickname } from "~/lib/utils"
import { ParentProps } from "solid-js"

interface p {
  histroy: History & {chatbot: {botName: string}}
}
const HistoryCard = ({histroy}:p) => {
  return (
    <Card class="flex justify-between items-center mb-3">
      <CardHeader>
        <CardTitle>مکالمه {histroy.id}</CardTitle>
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
           {new Date(histroy.messages.at(-1)!.timestamp).toLocaleDateString("fa-IR")}
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
        <Button class="ml-5">
          نمایش کامل
        </Button>
    </Card>
  )
}

const Big = ({children}:ParentProps) => <div class="mb-1 font-bold">{children}</div>

const Small = ({children}:ParentProps) => <div class="text-sm text-muted-foreground">{children}</div>

export default HistoryCard
