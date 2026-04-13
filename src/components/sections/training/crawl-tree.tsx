import { H3, Muted } from "~/components/prose/prose-item"
import Checkbox from "~/components/ui/checkbox"
import { crawlTree } from "~/server/crawler"
import { set_training_state, tree } from "./training-state"
import { createEffect, createSignal } from "solid-js"
import { callModal } from "~/components/layout/Modal"
import { Button } from "~/components/ui/button"
import BackBtn from "~/components/parts/back-btn"
import { Loading } from "~/components/parts/Loading"
import { wait } from "~/lib/utils"

interface p {
}
const CrawlTree = ({}:p) => {

  const [selected, setSelected] = createSignal<string[]>([])
  const [loading, setLoading] = createSignal(false)

  createEffect(() => {
    console.log(selected())
  })

  const handleContinue = () => {
    if (!selected().length) return callModal.fail("لطفا حداقل یک صفحه را انتخاب نمایید")

    callModal.prompt(`مطالب ${selected().length} صفحه جهت آموزش ربات بررسی خواهد شد. ادامه؟`)
    .yes(async () => {
        setLoading(true)
        await wait(2000)
        set_training_state("form")
      })
  }

  return (
    <div class="relative">
      <BackBtn onClick={() => set_training_state("auto")} class="absolute top-5 left-0"/>
      <H3>
        صفحات مهم را انتخاب کنید
      </H3>
      <Muted class="mb-5">
        صفحات زیر پس از بررسی سایت شما به دست امده اند
        <br/>
        تا سقف ۲۰ مورد، صفحات مهم را انتخاب کنید
      </Muted>

      <Muted class="text-left w-full block pl-4">
        موارد انتخاب شده: {selected().length.toLocaleString("fa-IR")} عدد
      </Muted>

      {loading() && <Loading class="absolute top-0 bg-background w-full opacity-80"/>}


      <div class="overflow-auto h-80 bg-card p-1 rounded">
        {tree().map(t => <div class="flex justify-between mb-1 ltr" >
          <div class="flex gap-2">
            <Checkbox value={!!selected().find(f => f === t.link)?.length}
              onchange={val => val ? setSelected(prev => [...prev, t.link]) : setSelected(prev => prev.filter(p => p !==t.link ))}/>
            {t.link.substring(7)}
          </div>
          <Muted class="rtl">(وضعیت: {Status(t.status)})</Muted>
        </div>)}
      </div>

      <Button onclick={handleContinue}>ادامه</Button>
    </div>
  )
}

const Status = (s: crawlTree[number]["status"]) => {
  switch (s) {
    case "ok":
      return <span class="text-success">سالم</span>
    case "unreachable":
      return <span class="text-warning">خارج از دسترس</span>
    case "unchecked":
      return <span class="">بررسی نشده</span>
    default:
      let _case:never = s
      throw new Error(`unhandled case: ${_case}`)
  }

}

export default CrawlTree
