import { createSignal, onMount } from "solid-js"
import { generateTrainingDataFromPages } from "~/server/crawler"

const test = () => {
  const [sig, sett] = createSignal("kk")
  onMount(async () => {
    let a = await generateTrainingDataFromPages(["http://tahlildadeh.com"])
    console.log(a.data)
  })
  return <>
    <input placeholder="hi" value={sig()} onchange={() => console.log("change")}/>
  </>
}

export default test
