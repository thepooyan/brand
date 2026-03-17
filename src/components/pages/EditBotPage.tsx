import { I_Bot } from "~/db/schema"
import Input from "../ui/input"
import { Component, createSignal, ParentComponent } from "solid-js"
import Textarea from "../ui/Textarea"
import { cn } from "~/lib/utils"
import { Button } from "../ui/button"
import { createStore } from "solid-js/store"
import ToneSelect from "../parts/ToneSelect"
import { getLanguageKeyByLabel, getLanguageValue, getResponseLengthKeyByLabel, getResponseLengthValue, getToneKeyByLabel, getToneValue } from "~/server/llmUtil"
import { ChangeEvent } from "~/lib/interface"
import LangSelect from "../parts/LangSelect"
import ResLengthSelect from "../parts/ResLengthSelect"
import { editBot } from "~/server/mutation"
import { callModal } from "../layout/Modal"
import { useNavigate } from "@solidjs/router"
import ColorPicker from "../ui/color-picker"
import { ImageUploader } from "../parts/ImageUploader"
import { Dynamic } from "solid-js/web"

interface p {
  bot: I_Bot
}
const EditBotPage = ({bot}:p) => {

  const [store, setStore] = createStore<I_Bot>(bot)
  const [loading, setLoading] = createSignal(false)
  const nv = useNavigate()

  interface pp {
    key: keyof typeof bot
    name: string
    as?: Component
    className?: string
  }
  const In = ({key, name, className, as}:pp) => {
    let Comp = as ? as : Input
    return <Seprator className={className}>
      {name}
      <Comp placeholder={name} value={store[key] || undefined} onchange={(e:ChangeEvent<HTMLInputElement>) => setStore(key, e.currentTarget.value)}/>
    </Seprator>
  }
  const Seprator:ParentComponent<{className?: string, as?: Component | "div"}> = ({children, className, as}) => {
    return (
      <Dynamic component={as ? as : "label"} class={cn("flex gap-2 flex-col", className)}>
        {children}
      </Dynamic>
    )
  }
  
  const handleSubmit = async () => {
    setLoading(true)
    callModal.wait()
    let res = await editBot(store)
    setLoading(false)
    if (res.ok) {
      nv("/Panel/Chatbot")
      callModal.success()
    }
    else
    callModal.fail(res.msg)
  }

  return (
    <>
      <form class="p-5 bg-card text-card-foreground rounded-lg space-y-5 border-border border-1 container"
      onsubmit={(e:SubmitEvent) => {e.preventDefault(); handleSubmit()} }>
        <h2 class="text-xl font-bold mb-10">ویرایش چت‌بات</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <In key="botName" name="نام ربات"/>
          <In key="businessName" name="نام بیزنس"/>
          <Seprator>
            لحن
            <ToneSelect initialValue={getToneValue(bot.tone)?.label} onchange={(e:string) => setStore("tone", getToneKeyByLabel(e) || "") }/>
          </Seprator>
          <Seprator>
            زبان
            <LangSelect initialValue={getLanguageValue(bot.language)?.label} onchange={(e:string) => setStore("language", getLanguageKeyByLabel(e) || "")}/>
          </Seprator>
          <Seprator>
            حداکثر طول پاسخ
            <ResLengthSelect initialValue={getResponseLengthValue(bot.maxResponseLength)?.label}
              onchange={(e:string) => setStore("maxResponseLength", getResponseLengthKeyByLabel(e) || "")}/>
          </Seprator>
          <In key="websiteUrl" name="آدرس وبسایت شما"/>
          <Seprator className="">
            رنگ سازمانی
            <ColorPicker initialValue={bot.color} onChange={val => setStore("color", val)}/>
          </Seprator>
          <Seprator className="">
            رنگ نوشته (معمولا سفید یا سیاه)
            <ColorPicker initialValue={bot.color_foreground} onChange={val => setStore("color_foreground", val)}/>
          </Seprator>
          <Seprator className="md:row-start-2 md:row-span-4 md:col-start-3" as="div">
            لوگو
            <ImageUploader initialValue={bot.logo || undefined} onChange={val => setStore("logo", val)}/>
          </Seprator>
          <In key="trainingText" name="متن آموزش ربات" as={Textarea} className="md:col-span-3"/>
        </div>
        <p class="text-muted-foreground text-sm">
          هرچیزی که ربات باید بداند را در قسمت بالا وارد کنید!
        </p>
        <Button type="submit" disabled={loading()}>ویرایش</Button>
      </form>
    </>
  )
}


export default EditBotPage
