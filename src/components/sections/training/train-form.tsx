import BackBtn from "~/components/parts/back-btn"
import { set_training_state } from "./training-state"
import Input from "~/components/ui/input"
import { TrainingData } from "~/db/schema"
import { Button } from "~/components/ui/button"
import { createStore } from "solid-js/store"
import { preventDefault } from "~/lib/utils"
import { useBind } from "~/lib/hooks/useForm"
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
    {value: "tone", label: "لحن"},
    {value: "address", label: "آدرس"},
    {value: "language", label: "زبان"},
    {value: "useEmojies", label: "استفاده از ایموجی"},
    {value: "websiteUrl", label: "آدرس وبسایت"},
    {value: "maxResponseLength", label: "ماکسیمم طول پاسخ"},
    {value: "trainingText", label: "متن آموزش"},
  ]

  const [store, setStore] = createStore(newt)
  const {register} = useBind(store, setStore)

  const handleSubmit = () => {
    console.log({...store})
  }

  return (
    <div class="grid grid-cols-2">
      <div>

      <BackBtn onClick={() => set_training_state("choose")} class=""/>

      <form
          onsubmit={preventDefault(handleSubmit)}
          class="grid gap-2"
        >
        {myLabels.map(l => <label>
            {l.label}:
            <Input {...register(l.value)}/>
          </label> )}
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
