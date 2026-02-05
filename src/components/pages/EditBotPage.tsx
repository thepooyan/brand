import { I_Bot } from "~/db/schema"
import Input from "../ui/InputNew"
import { Component } from "solid-js"
import Textarea from "../ui/Textarea"
import { cn } from "~/lib/utils"
import { Button } from "../ui/button"

interface p {
  bot: I_Bot
}
const EditBotPage = ({bot}:p) => {

  interface pp {
    key: keyof typeof bot
    name: string
    as?: Component
    className?: string
  }
  const In = ({key, name, className, as}:pp) => {
    let Comp = as ? as : Input
    return <label class={cn("flex gap-2 flex-col",className)}>
      {name}
      <Comp placeholder={name} value={bot[key] || undefined}/>
    </label>
  }

  return (
    <>
      <div class="p-5 bg-card text-card-foreground rounded-lg space-y-5 border-border border-1 container">
        <h2 class="text-xl font-bold mb-10">ویرایش چت‌بات</h2>
        <div class="grid grid-cols-3 gap-4">
          <In key="botName" name="نام ربات"/>
          <In key="businessName" name="نام بیزنس"/>
          <In key="language" name="زبان"/>
          <In key="tone" name="لحن"/>
          <In key="websiteUrl" name="آدرس وبسایت شما"/>
          <In key="trainingText" name="متن آموزش ربات" as={Textarea} className="col-span-3"/>
        </div>
        <Button>ویرایش</Button>
      </div>
    </>
  )
}


export default EditBotPage
