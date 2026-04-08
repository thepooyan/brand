import BackBtn from "~/components/parts/back-btn"
import { set_training_state } from "./training-state"
import Input from "~/components/ui/input"
import { TrainingData } from "~/db/schema"
import { Button } from "~/components/ui/button"
import { createStore } from "solid-js/store"
import { preventDefault } from "~/lib/utils"
import { useBind } from "~/lib/hooks/useForm"
import GenerallSelect from "~/components/parts/generall-select"
import { LanguageOptions, ResponseLengthOptions, ToneOptions } from "~/server/llmUtil"
import { Component } from "solid-js"
import ArrayInput from "~/components/ui/array-input"
import Checkbox from "~/components/ui/checkbox"
import SocialLinkInputs from "./social-link-inputs"
// import MinimalChat from "~/components/parts/chat/MinimalChat"

const TrainForm = () => {

  let emptyValue: TrainingData = {
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

  const [store, setStore] = createStore(emptyValue)

  const {registerInput, registerCustom}
  = useBind(store, setStore)

  const handleSubmit = () => {
    console.log({...store})
  }

  const ToneSelect = GenerallSelect(
    Object.entries(ToneOptions).map(([k,v]) => ({label: v.label, value: k}))
  )
  const MRLSelect = GenerallSelect(
    Object.entries(ResponseLengthOptions).map(([k,v]) => ({label: v.label, value: k}))
  )
  const LangSelect = GenerallSelect(
    Object.entries(LanguageOptions).map(([k,v]) => ({label: v.label, value: k}))
  )

  type label = {value: keyof TrainingData, label: string, Component?: Component<any>}
  const myLabels: label[] = [
    {value: "businessName", label: "نام بیزنس"},
    {value: "address", label: "آدرس"},
    {value: "websiteUrl", label: "آدرس وبسایت"},
    {value: "trainingText", label: "متن آموزش"},
    {value: "tone", label: "لحن", Component: ToneSelect},
    {value: "maxResponseLength", label: "طول پاسخ", Component: MRLSelect},
    {value: "language", label: "زبان", Component: LangSelect},
    {value: "contactNumber", label: "شماره تماس", Component: ArrayInput},
    {value: "useEmojies", label: "استفاده از ایموجی", Component: Checkbox},
  ]

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
            {l.Component ? 
              <l.Component {...registerCustom(l.value)} placeholder={l.label}/>
              :
              <Input {...registerInput(l.value)} placeholder={l.label}/>
            }
          </label>
        )}

        لینک سوشیال:
        <SocialLinkInputs store={store} setStore={setStore}/>

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
