import {marked} from "marked"
import md from "../../md/terms-and-conditions.md?raw"
import { createSignal, onMount } from "solid-js"
import { Dynamic } from "solid-js/web"
import { Loading } from "~/components/parts/Loading"
import { Button } from "~/components/ui/button"

const TermsAndConditions = () => {

  const content = marked(md, {async: false})
  let div!:HTMLDivElement

  const [s, setS] = createSignal(<Loading/>)

  onMount(() => {
    let h = div.querySelectorAll("h2")
    setS( [...h].map(m => <Button size="sm" variant="ghost" innerHTML={m.innerHTML} class="justify-start"
      onclick={() => window.scrollTo({top: m.clientHeight})}
    />) )
  })

  return (
    <div class="grid grid-cols-[5fr_2fr] gap-2">
      <div innerHTML={content} ref={div}></div>
      <div class="p-1 bg-sidebar rounded-md h-max sticky top-5  flex flex-col ">
        {s()}
      </div>
    </div>
  )
}

export default TermsAndConditions
