import { createSignal } from "solid-js"
import { Loading } from "~/components/parts/Loading"
import { Button } from "~/components/ui/button"
import Input from "~/components/ui/input"
import { useTransaction } from "~/lib/actionAbstraction"
import { buildLinkTree } from "~/server/crawler"
import { set_training_state, setTree } from "./training-state"
import RealBackBtn from "~/components/parts/real-back-btn"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

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
    <Card class="relative w-md m-auto mt-20">
      <CardHeader>
        <CardTitle>
          آدرس وبسایت خود را وارد کنید:
        </CardTitle>
        <RealBackBtn class="absolute left-5 top-5"/>
      </CardHeader>
      <CardContent class="flex flex-col gap-2">
        <Input placeholder="https://www.example.com" class="ltr w-full" bind={addressSignal} name="website" />
        <Button onclick={handleTreeBuild}>تایید</Button>
        {loading() && <Loading class="absolute top-0 bg-background w-full opacity-80"/>}
      </CardContent>
    </Card>
  )
}

export default TrainAuto
