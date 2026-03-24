import { createSignal } from "solid-js"
import { Button } from "~/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import Input from "~/components/ui/input"
import { InputChangeEvent } from "~/db/types"

const Restriction = () => {

  const [value, setValue] = createSignal<number | null>(null)

  return (
    <div class="w-md ">
      <CardHeader>
        <CardTitle>اعمال محدودیت</CardTitle>
        <CardDescription>محدودیت استفاده هر کاربر از ربات شما</CardDescription>
      </CardHeader>
      <CardContent>
        <Input placeholder="تعداد پیام" type="number" onchange={(e:InputChangeEvent) => setValue(parseInt(e.currentTarget.value) || null)}/>
        <p class="text-muted-foreground text-sm mt-1">
          {value() === null ?
            "محدودیتی برای کاربران شما وجود ندارد"
            :
            `هر کاربر مجاز است ${value()} سوال از ربات شما بپرسد`
          }
        </p>
        <Button class="mt-2" size="sm">
          ثبت
        </Button>
      </CardContent>
    </div>
  )
}

export default Restriction

