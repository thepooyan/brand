import {marked} from "marked"
import md from "../../md/terms-and-conditions.md?raw"
import { createSignal, onMount } from "solid-js"
import { Loading } from "~/components/parts/Loading"
import { Button } from "~/components/ui/button"
import { useToggle } from "~/lib/hooks"
import { respondToVisibility } from "~/lib/utils"

const TermsAndConditions = () => {

  const content = marked(md, {async: false})
  let div!:HTMLDivElement

  const [s, setS] = createSignal(<Loading/>)
  const {activate, isActive} = useToggle<number>(0)

  onMount(() => {
    let h = div.querySelectorAll("h2")
    setS( [...h].map((m,i) => {
      respondToVisibility(m, () => {
        activate(i)
        console.log("saw", m)
      })

      return <Button size="sm" variant={isActive(i) ? "secondary" : "ghost"} innerHTML={m.innerHTML}
        class="justify-start" onclick={() => m.scrollIntoView({behavior: "smooth"}) }
      />
    }))
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
