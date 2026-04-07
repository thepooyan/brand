import { Accessor } from "solid-js"
import { Muted } from "~/components/prose/prose-item"
import Checkbox from "~/components/ui/checkbox"
import { crawlTree } from "~/server/crawler"

interface p {
  tree: Accessor<crawlTree>
}
const CrawlTree = ({tree}:p) => {
  return (
    <div class="ltr">
      {tree().map(t => <div class="flex justify-between mb-1 " >
        <div class="flex gap-2">
          <Checkbox/>
          {t.link}
        </div>
        <Muted class="rtl">(وضعیت: {Status(t.status)})</Muted>
      </div>)}
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
