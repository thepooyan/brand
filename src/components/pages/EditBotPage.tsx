import { I_Bot } from "~/db/schema"
import Input from "../ui/InputNew"
import { Component } from "solid-js"
import Textarea from "../ui/Textarea"
import { cn } from "~/lib/utils"
import { Button } from "../ui/button"
import { createStore } from "solid-js/store"
import ToneSelect from "../parts/ToneSelect"
import { getLanguageKeyByLabel, getLanguageValue, getToneKeyByLabel, getToneValue } from "~/lib/planUtil"
import { ChangeEvent } from "~/lib/interface"
import LangSelect from "../parts/LangSelect"

interface p {
  bot: I_Bot
}
const EditBotPage = ({bot}:p) => {

  const [store, setStore] = createStore<I_Bot>(bot)

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
      <Comp placeholder={name} value={store[key] || undefined} onchange={(e:ChangeEvent<HTMLInputElement>) => setStore(key, e.currentTarget.value)}/>
    </label>
  }
  const handleSubmit = () => {
    console.log({...store})
  }

  return (
    <>
      <form class="p-5 bg-card text-card-foreground rounded-lg space-y-5 border-border border-1 container"
      onsubmit={(e:SubmitEvent) => {e.preventDefault(); handleSubmit()} }>
        <h2 class="text-xl font-bold mb-10">ویرایش چت‌بات</h2>
        <div class="grid grid-cols-3 gap-4">
          <In key="botName" name="نام ربات"/>
          <In key="businessName" name="نام بیزنس"/>
          <label class="flex gap-2 flex-col">
            لحن
            <ToneSelect initialValue={getToneValue(bot.tone)?.label} onchange={(e:string) => setStore("tone", getToneKeyByLabel(e) || "") }/>
          </label>
          <label>
            زبان
            <LangSelect initialValue={getLanguageValue(bot.language)?.label} onchange={(e:string) => setStore("language", getLanguageKeyByLabel(e) || "")}/>
          </label>
          <In key="websiteUrl" name="آدرس وبسایت شما"/>
          <In key="trainingText" name="متن آموزش ربات" as={Textarea} className="col-span-3"/>
        </div>
        <Button type="submit">ویرایش</Button>
      </form>
    </>
  )
}


export default EditBotPage
