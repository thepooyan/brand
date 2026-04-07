import { H3, Muted } from "~/components/prose/prose-item"
import Checkbox from "~/components/ui/checkbox"
import { crawlTree } from "~/server/crawler"
import { tree } from "./training-state"
import { createEffect, createSignal } from "solid-js"
import { callModal } from "~/components/layout/Modal"
import { Button } from "~/components/ui/button"

interface p {
}
const CrawlTree = ({}:p) => {

  const [selected, setSelected] = createSignal<string[]>([])

  createEffect(() => {
    console.log(selected())
  })

  const handleContinue = () => {
    if (!selected().length) return callModal.fail("لطفا حداقل یک صفحه را انتخاب نمایید")

    callModal.prompt(`مطالب ${selected().length} صفحه جهت آموزش ربات بررسی خواهد شد. ادامه؟`)
  }

  return (
    <div>
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
      <div class="overflow-auto h-80 bg-card p-1 rounded">
        {tree().map(t => <div class="flex justify-between mb-1 ltr" >
          <div class="flex gap-2">
            <Checkbox initialValue={!!selected().find(f => f === t.link)?.length}
              onchange={val => val ? setSelected(prev => [...prev, t.link]) : setSelected(prev => prev.filter(p => p !==t.link ))}/>
            {t.link}
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
