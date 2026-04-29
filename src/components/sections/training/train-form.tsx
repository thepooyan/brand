import Input from "~/components/ui/input"
import { TrainingData } from "~/db/schema"
import { Button } from "~/components/ui/button"
import { createStore } from "solid-js/store"
import { preventDefault } from "~/lib/utils"
import { useBind } from "~/lib/hooks/useForm"
import GenerallSelect from "~/components/parts/generall-select"
import { LanguageOptions, ResponseLengthOptions, ToneOptions } from "~/server/llmUtil"
import { Accessor, Component, createEffect, onMount } from "solid-js"
import ArrayInput from "~/components/ui/array-input"
import Checkbox from "~/components/ui/checkbox"
import SocialLinkInputs from "./social-link-inputs"
import MinimalChat from "~/components/parts/chat/MinimalChat"
import { callModal } from "~/components/layout/Modal"
import { saveTrainingData, set_training_state } from "./training-state"
import { useTransaction } from "~/lib/actionAbstraction"

interface p {
  initialData?: Accessor<TrainingData | null | undefined>
  bot_id: number
}
const TrainForm = ({initialData, bot_id}:p) => {

  const recrawl = () => {
    callModal.prompt(`آیا مطمئنید؟ در صورت یادگیری مجدد اطلاعات قبلی از بین خواهد رفت.`)
    .yes(() => set_training_state("auto"))
  }

  let emptyValue: TrainingData = {
    id: -1,
    tone: "",
    social: [
      {type: "", link: ""}
    ],
    address: "",
    language: "",
    useEmojies: false,
    trainingText: "",
    contactNumber: [],
    maxResponseLength: ""
  }

  const [store, setStore] = createStore(emptyValue)

  if (initialData)
  createEffect(() => {
    let data = initialData()
      if (data) {
        setStore({...data})
      }
  })

  const {registerInput, registerCustom}
  = useBind(store, setStore)
  const {callTransaction} = useTransaction()

  const handleSubmit = () => {
    callTransaction(
      saveTrainingData(store, bot_id)
    )
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
    {value: "address", label: "آدرس"},
    {value: "trainingText", label: "متن آموزش"},
    {value: "tone", label: "لحن", Component: ToneSelect},
    {value: "maxResponseLength", label: "طول پاسخ", Component: MRLSelect},
    {value: "language", label: "زبان", Component: LangSelect},
    {value: "contactNumber", label: "شماره تماس", Component: ArrayInput},
    {value: "useEmojies", label: "استفاده از ایموجی", Component: Checkbox, class: "flex gap-1"},
  ]

  let scrollRef!:HTMLDivElement
  onMount(() => {
    setTimeout(() => {
      const sh = scrollRef.scrollHeight
      scrollRef.scrollTo({top: sh})
      scrollRef.scrollTo({top: 0, behavior: "smooth"})
    }, 100)
  })

  return (
    <div class="grid grid-cols-2 gap-3">

      <div class="overflow-auto h-134 pl-2 pr-1" ref={scrollRef}>
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

          <div class="space-x-2">
            <Button type="submit">ثبت</Button>
            <Button variant="secondary" onclick={recrawl}>یادگیری مجدد از لینک</Button>
          </div>
        </form>
      </div>

      <MinimalChat botId={String(bot_id)}/>
    </div>
  )
}

export default TrainForm
