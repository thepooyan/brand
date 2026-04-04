import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { FiArrowDownCircle, FiArrowUpCircle, FiTrash } from "solid-icons/fi"
import { FaSolidBan, FaSolidUnlock } from "solid-icons/fa"
import { createEffect, For, Show } from "solid-js"
import { Badge } from "../ui/badge"
import PlanCard from "./plan-card"
import { Muted, H3 } from "../prose/prose-item"
import BotCard from "./bot-card"
import { PartialUser } from "~/db/relationQueries"
import BackBtn from "../parts/back-btn"
import { blockUser, deleteUser, demoteUser, unblockUser } from "./userInteractions"
import { ifSure } from "~/lib/utils"
import { revalidate, useNavigate } from "@solidjs/router"
import { callModal } from "../layout/Modal"
import NewAdminModal from "./new-admin-modal"

interface p {
  user: () => PartialUser
}

const UserDetails = ({user}:p) => {

  const isAdmin = () => user().admin !== null
  const isBlocked = () => user().isBlocked === "1"
  const nv = useNavigate()

  const deleteMe = () => {
    ifSure(async() => {
      let {ok, msg} = await deleteUser(user().id!)
      if (ok) return nv("/admin/users")
      callModal.fail(msg)
    }, "کاربر حذف شود؟")
  }
  const blockMe = () => {
    ifSure(async () => {
      let {ok, msg} = await blockUser(user().id!)
      if (!ok) return callModal.fail(msg)
      callModal.success()
      revalidate("adminUser")
    }, "کاربر بلاک شود؟")
  }
  const unblockMe = () => {
    ifSure(async () => {
      let {ok, msg} = await unblockUser(user().id!)
      if (!ok) return callModal.fail(msg)
      callModal.success()
      revalidate("adminUser")
    }, "کاربر آنبلاک شود؟")
  }
  const promoteMe = () => {
    callModal(() => <NewAdminModal id={user().id!} number={user().number!}/>)
  }
  const demoteMe = () => {
    ifSure(async () => {
      let {ok, msg} = await demoteUser(user().id!)
      if (!ok) return callModal.fail(msg)
      revalidate("adminUser")
    }, "کاربر دیموت شود؟")
  }

  return (
    <Card class="m-4">
      <CardHeader class="relative">
        <CardTitle>
          {user().number}
        </CardTitle>
        <CardDescription>
          تاریخ عضویت: {user().createdAt?.toLocaleDateString("fa-IR")}
          <br/>
          نام: {user().name}
          <br/>
          ایمیل: {user().email}
        </CardDescription>
        <div class="absolute left-5 space-x-2">
          <Show when={isAdmin()}>
            <Badge class="font-normal">
              admin
            </Badge>
          </Show>
          <BackBtn href="/admin/users"/>
        </div>
      </CardHeader>

      <CardContent>
        <div class="space-y-2">
          <H3 class="mb-5">
            پلن ها:
          </H3>
          <For each={user().current_plans} fallback="ندارد...">
            {p => <PlanCard plan={p}/>}
          </For>
        </div>
        <div class="space-y-2">
          <H3 class="my-5">
            ربات ها:
          </H3>
          <For each={user().bots} fallback="ندارد...">
            {p => <BotCard bot={p}/>}
          </For>
        </div>
        <Show when={isAdmin()}>
          <div class="space-y-2">
            <H3 class="my-5">اطلاعات ادمین:</H3>
            <Muted class="mb-1">چت آیدی تلگرام:</Muted>
            {user().admin?.chat_id}
          </div>
        </Show>
      </CardContent>
      <CardFooter class="gap-2 justify-end">
        <Button variant="destructive" onclick={deleteMe}>
          حذف
          <FiTrash/>
        </Button>
        <Show when={isBlocked()}>
          <Button variant="secondary" onclick={unblockMe}>
            آنبلاک
            <FaSolidUnlock/>
          </Button>
        </Show>
        <Show when={!isBlocked()}>
          <Button variant="secondary" onclick={blockMe}>
            بلاک
            <FaSolidBan/>
          </Button>
        </Show>
        <Show when={!isAdmin()}>
          <Button onclick={promoteMe}>
            ارتقا به ادمین
            <FiArrowUpCircle/>
          </Button>
        </Show>
        <Show when={isAdmin()}>
          <Button onclick={demoteMe}>
            تنزل به کاربر معمولی
            <FiArrowDownCircle/>
          </Button>
        </Show>
      </CardFooter>
    </Card>
  )
}

export default UserDetails
