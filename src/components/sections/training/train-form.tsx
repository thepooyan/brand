import BackBtn from "~/components/parts/back-btn"
import { set_training_state } from "./training-state"
import Input from "~/components/ui/input"
import { TrainingData } from "~/db/schema"
import { Button } from "~/components/ui/button"
import { createStore } from "solid-js/store"
import { preventDefault } from "~/lib/utils"
import { useBind } from "~/lib/hooks/useForm"
import GenerallSelect from "~/components/parts/generall-select"
import { ToneOptions } from "~/server/llmUtil"
import { createEffect, createSignal } from "solid-js"
// import MinimalChat from "~/components/parts/chat/MinimalChat"

const TrainForm = () => {

  let newt: TrainingData = {
    id: 5,
    businessName: "هوشبان",
    tone: "friendly",
    social: [
      {type: "telegram", link: "http://t.me/@thepooyan"},
      {type: "email", link: "thepooyan@gmail.com"},
    ],
    address: "خیابان فولان",
    language: "persian",
    useEmojies: true,
    websiteUrl: "https://some.com",
    trainingText: "t text",
    contactNumber: [
      "09027766926",
      "09027766925",
    ],
    maxResponseLength: "short"
  }
  const myLabels: {value: keyof TrainingData, label: string}[] = [
    {value: "businessName", label: "نام بیزنس"},
    {value: "address", label: "آدرس"},
    {value: "websiteUrl", label: "آدرس وبسایت"},
    {value: "trainingText", label: "متن آموزش"},
  ]

  const [store, setStore] = createStore(newt)
  const [sig, sett] = createSignal("helpful")

  createEffect(() => console.log(sig()))

  const {registerInput, registerCustom}
  = useBind(store, setStore)

  const handleSubmit = () => {
    console.log({...store})
    sett("friendly")
  }

  const ToneSelect = GenerallSelect(
    Object.entries(ToneOptions).map(([k,v]) => ({label: v.label, value: k}))
  )

  return (
    <div class="grid grid-cols-2">
      <div>

      <BackBtn onClick={() => set_training_state("choose")} class="mb-5"/>

      <form
          onsubmit={preventDefault(handleSubmit)}
          class="grid gap-2"
        >
        {myLabels.map(l => <label>
            {l.label}:
            <Input {...registerInput(l.value)}/>
          </label>
        )}
        <ToneSelect onchange={sett} value={sig()}/>


        <Button type="submit">ثبت</Button>
      </form>
      </div>

      {/*
        <MinimalChat botId="2"/>
      */}
    </div>
  )
}

export default TrainForm
