import { eq } from "drizzle-orm"
import { createSignal } from "solid-js"
import { Button } from "~/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import Input from "~/components/ui/input"
import { db } from "~/db/db"
import { chatbotTable } from "~/db/schema"
import { InputChangeEvent } from "~/db/types"
import { safeDb2 } from "~/lib/utils"
import { callModal, closeModal } from "../layout/Modal"
import { revalidate } from "@solidjs/router"

interface p {
  initial: number | null
  bot_id: number
}

const applyLimitation = async (bot_id: number, limitation: number | null) => {
  "use server"
  let res = await safeDb2(
    db.update(chatbotTable).set({limitation: limitation}).where(eq(chatbotTable.id, bot_id))
  )
  return {ok: res.ok, msg: res.msg, data: undefined}
}

const Restriction = ({initial, bot_id}:p) => {

  const [value, setValue] = createSignal<number | null>(initial)
  const [loading, setLoading] = createSignal(false)

  const handleSubmit = async () => {
    setLoading(true)
    applyLimitation(bot_id, value())
    .then(async () => {
      closeModal()
      await revalidate("bots")
      })
    .catch(err => {
        closeModal()
        callModal.fail(err)
      })
    .finally(() => setLoading(false))
  }

  return (
    <div class="w-md ">
      <CardHeader>
        <CardTitle>اعمال محدودیت</CardTitle>
        <CardDescription>محدودیت استفاده هر کاربر از ربات شما</CardDescription>
      </CardHeader>
      <CardContent>
        <Input placeholder="تعداد پیام" type="number"
          onKeyUp={(e:InputChangeEvent) => setValue(parseInt(e.currentTarget.value) || null)}
          value={value() || undefined}
        />
        <p class="text-muted-foreground text-sm mt-1">
          {value() === null ?
            "محدودیتی برای کاربران شما وجود ندارد"
            :
            `هر کاربر مجاز است ${value()} سوال از ربات شما بپرسد`
          }
        </p>
        <Button class="mt-2" size="sm" loading={loading} onclick={handleSubmit}>
          ثبت
        </Button>
      </CardContent>
    </div>
  )
}

export default Restriction

