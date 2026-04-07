import { createSignal } from "solid-js"
import { Loading } from "~/components/parts/Loading"
import { Button } from "~/components/ui/button"
import Input from "~/components/ui/input"
import { useTransaction } from "~/lib/actionAbstraction"
import { buildLinkTree } from "~/server/crawler"
import { set_training_state, setTree } from "./training-state"

const TrainAuto = () => {

  const {callFetch} = useTransaction()
  const addressSignal = createSignal("")
  const [loading, setLoading] = createSignal(false)

  const handleTreeBuild = async () => {
    let val = addressSignal[0]()
    if (!val) return

    (await callFetch(
      buildLinkTree(val),
      {loadingSignal: setLoading}
    )).success(a => {
      setTree(a.data);
        set_training_state("tree")
      })
  }

  return (
    <div class="relative">
      <label>
        آدرس وبسایت خود را وارد کنید:
        <Input placeholder="https://www.example.com" class="ltr" bind={addressSignal} name="website"/>
      </label>
      <Button onclick={handleTreeBuild}>تایید</Button>
      {loading() && <Loading class="absolute top-0 bg-background w-full opacity-80"/>}
    </div>
  )
}

export default TrainAuto
