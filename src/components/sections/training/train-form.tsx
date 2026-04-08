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
import MinimalChat from "~/components/parts/chat/MinimalChat"

const TrainForm = () => {

  let emptyValue: TrainingData = {
    id: 5,
    businessName: "",
    tone: "",
    social: [
      {type: "", link: ""}
    ],
    address: "",
    language: "",
    useEmojies: false,
    websiteUrl: "",
    trainingText: "",
    contactNumber: [],
    maxResponseLength: ""
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

  type label = {
    value: keyof TrainingData,
    label: string,
    Component?: Component<any>
    class?: string
  }
  const myLabels: label[] = [
    {value: "businessName", label: "نام بیزنس"},
    {value: "address", label: "آدرس"},
    {value: "websiteUrl", label: "آدرس وبسایت"},
    {value: "trainingText", label: "متن آموزش"},
    {value: "tone", label: "لحن", Component: ToneSelect},
    {value: "maxResponseLength", label: "طول پاسخ", Component: MRLSelect},
    {value: "language", label: "زبان", Component: LangSelect},
    {value: "contactNumber", label: "شماره تماس", Component: ArrayInput},
    {value: "useEmojies", label: "استفاده از ایموجی", Component: Checkbox, class: "flex gap-1"},
  ]

  return (
    <div class="grid grid-cols-2 gap-3">

      <div class="overflow-auto h-134 pl-2 pr-1">
        <form
            onsubmit={preventDefault(handleSubmit)}
            class="grid gap-4"
          >
          {myLabels.map(l => <label class={l.class}>
              <p class="text-sm mb-1  ">
                {l.label}:
              </p>
              {l.Component ? 
                <l.Component {...registerCustom(l.value)} placeholder={l.label} class="bg-muted text-muted-foreground"/>
                :
                <Input {...registerInput(l.value)} placeholder={l.label} class="bg-muted text-muted-foreground"/>
              }
            </label>
          )}

          <p class="text-sm">
            لینک سوشیال:
          </p>
          <SocialLinkInputs store={store} setStore={setStore}/>

          <Button type="submit">ثبت</Button>
        </form>
      </div>

      <MinimalChat botId="5"/>
    </div>
  )
}

export default TrainForm
