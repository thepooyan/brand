import Input from "~/components/ui/input"
import { TrainingData } from "~/db/schema"
import { Button } from "~/components/ui/button"
import { createStore } from "solid-js/store"
import { preventDefault } from "~/lib/utils"
import GenerallSelect from "~/components/parts/generall-select"
import { LanguageOptions, ResponseLengthOptions, ToneOptions } from "~/server/llmConst"
import { Accessor, createEffect, onMount } from "solid-js"
import ArrayInput from "~/components/ui/array-input"
import Checkbox from "~/components/ui/checkbox"
import SocialLinkInputs from "./social-link-inputs"
import MinimalChat from "~/components/parts/chat/MinimalChat"
import { callModal } from "~/components/layout/Modal"
import { saveTrainingData, set_training_state } from "./training-state"
import { useTransaction } from "~/lib/actionAbstraction"
import BackBtn from "~/components/parts/back-btn"

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
          <label>
            <p class="text-sm mb-1  ">
              آدرس:
            </p>
            <Input
              name="address"
              value={store.address}
              onchange={e => setStore("address", e.currentTarget.value)}
              placeholder="آدرس"
              class="bg-muted text-muted-foreground"
            />
          </label>

          <label>
            <p class="text-sm mb-1  ">
              متن آموزش:
            </p>
            <Input
              name="trainingText"
              value={store.trainingText}
              onchange={e => setStore("trainingText", e.currentTarget.value)}
              placeholder="متن آموزش"
              class="bg-muted text-muted-foreground"
            />
          </label>

          <label>
            <p class="text-sm mb-1  ">
              لحن:
            </p>
            <ToneSelect
              value={store.tone}
              onchange={value => setStore("tone", value)}
              placeholder="لحن"
              class="bg-muted text-muted-foreground"
            />
          </label>

          <label>
            <p class="text-sm mb-1  ">
              طول پاسخ:
            </p>
            <MRLSelect
              value={store.maxResponseLength}
              onchange={value => setStore("maxResponseLength", value)}
              placeholder="طول پاسخ"
              class="bg-muted text-muted-foreground"
            />
          </label>

          <label>
            <p class="text-sm mb-1  ">
              زبان:
            </p>
            <LangSelect
              value={store.language}
              onchange={value => setStore("language", value)}
              placeholder="زبان"
              class="bg-muted text-muted-foreground"
            />
          </label>

          <label>
            <p class="text-sm mb-1  ">
              شماره تماس:
            </p>
            <ArrayInput
              value={store.contactNumber}
              onchange={value => setStore("contactNumber", value)}
              placeholder="شماره تماس"
              class="bg-muted text-muted-foreground"
            />
          </label>

          <label class="flex gap-1">
            <p class="text-sm mb-1  ">
              استفاده از ایموجی:
            </p>
            <Checkbox
              value={store.useEmojies}
              onchange={value => setStore("useEmojies", value)}
            />
          </label>

          <p class="text-sm">
            لینک سوشیال:
          </p>
          <SocialLinkInputs store={store} setStore={setStore}/>

          <div class="space-x-2 sticky bottom-0 backdrop-blur-md py-2 rounded ">
            <Button type="submit">ثبت</Button>
            <Button variant="secondary" onclick={recrawl}>یادگیری مجدد از لینک</Button>
            <BackBtn href="/panel/chat-bot" class="float-left" size="default" variant="outline"/>
          </div>
        </form>
      </div>

      <MinimalChat botId={String(bot_id)}/>
    </div>
  )
}

export default TrainForm
