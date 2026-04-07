import { createSignal } from "solid-js"
import { Loading } from "~/components/parts/Loading"
import { Button } from "~/components/ui/button"
import Input from "~/components/ui/input"
import { useTransaction } from "~/lib/actionAbstraction"
import { buildLinkTree, crawlTree } from "~/server/crawler"
import CrawlTree from "./crawl-tree"

const TrainAuto = () => {

  const {callFetch} = useTransaction()
  const addressSignal = createSignal("")
  const [loading, setLoading] = createSignal(false)
  const [tree, setTree] = createSignal<crawlTree>([])

  const handleTreeBuild = async () => {
    let val = addressSignal[0]()
    if (!val) return

    (await callFetch(
      buildLinkTree(val),
      {loadingSignal: setLoading}
    )).success(a => setTree(a.data))
  }

  return (
    <div class="relative">
      <label>
        آدرس وبسایت خود را وارد کنید:
        <Input placeholder="https://www.example.com" class="ltr" bind={addressSignal} name="website"/>
      </label>
      <Button onclick={handleTreeBuild}>تایید</Button>
      {loading() && <Loading class="absolute top-0 bg-background w-full opacity-80"/>}
      <CrawlTree tree={tree}/>
    </div>
  )
}

export default TrainAuto
