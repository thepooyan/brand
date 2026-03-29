import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { FiArrowDownCircle, FiArrowUpCircle, FiTrash } from "solid-icons/fi"
import { FaSolidBan } from "solid-icons/fa"
import { For, Show } from "solid-js"
import { Badge } from "../ui/badge"
import PlanCard from "./plan-card"
import { Muted, Title } from "../prose/prose-item"
import BotCard from "./bot-card"
import { PartialUser } from "~/db/relationQueries"
import BackBtn from "../parts/back-btn"
import { blockUser, deleteUser, demoteUser } from "./userInteractions"
import { ifSure } from "~/lib/utils"

interface p {
  user: PartialUser
}

const UserDetails = ({user}:p) => {

  const isAdmin = user.admin !== null

  return (
    <Card class="m-4">
      <CardHeader class="relative">
        <CardTitle>
          {user.number}
        </CardTitle>
        <CardDescription>
          تاریخ عضویت: {user.createdAt?.toLocaleDateString("fa-IR")}
          <br/>
          نام: {user.name}
          <br/>
          ایمیل: {user.email}
        </CardDescription>
        <div class="absolute left-5 space-x-2">
          <Show when={isAdmin}>
            <Badge class="font-normal">
              admin
            </Badge>
          </Show>
          <BackBtn href="/admin/users"/>
        </div>
      </CardHeader>

      <CardContent>
        <div class="space-y-2">
          <Title class="mb-5">
            پلن ها:
          </Title>
          <For each={user.current_plans} fallback="ندارد...">
            {p => <PlanCard plan={p}/>}
          </For>
        </div>
        <div class="space-y-2">
          <Title class="my-5">
            ربات ها:
          </Title>
          <For each={user.bots} fallback="ندارد...">
            {p => <BotCard bot={p}/>}
          </For>
        </div>
        <Show when={isAdmin}>
          <div class="space-y-2">
            <Title class="my-5">اطلاعات ادمین:</Title>
            <Muted class="mb-1">چت آیدی تلگرام:</Muted>
            {user.admin?.chat_id}
          </div>
        </Show>
      </CardContent>
      <CardFooter class="gap-2 justify-end">
        <Button variant="destructive" onclick={() => ifSure(() => deleteUser(user.id!), "کاربر حذف شود؟")}>
          حذف
          <FiTrash/>
        </Button>
        <Button variant="secondary" onclick={() => ifSure(() => blockUser(user.id!), "کاربر بلاک شود؟") }>
          بلاک
          <FaSolidBan/>
        </Button>
        <Show when={!isAdmin}>
          <Button>
            ارتقا به ادمین
            <FiArrowUpCircle/>
          </Button>
        </Show>
        <Show when={isAdmin}>
          <Button onclick={() => ifSure(() => demoteUser(user.id!), "کاربر به کاربر عادی تغییر پیدا کند؟") }>
            تنزل به کاربر معمولی
            <FiArrowDownCircle/>
          </Button>
        </Show>
      </CardFooter>
    </Card>
  )
}

export default UserDetails
