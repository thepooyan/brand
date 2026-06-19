import { FaSolidGear, FaSolidHand } from "solid-icons/fa"
import { ParentProps } from "solid-js"
import { H2, H3, Muted } from "~/components/prose/prose-item"
import { set_training_state } from "./training-state"

const Choose = () => {
  return (
    <>
      <div class="container space-y-5 mt-5">
        <H2>لطفا روش آموزش ربات خود را انتخاب کنید:</H2>

        <div class="grid grid-cols-2 gap-1">
          <Card onclick={() => set_training_state("form")}>
            <FaSolidHand size={40} class="group-hover:animate-bounce"/>
            <H3>
              آموزش به صورت دستی
            </H3>
            <Muted>
              اطلاعات مورد نیاز ربات را به صورت دستی وارد کنید و آزمون و خطا کنید
            </Muted>
          </Card>
          <Card onclick={() => set_training_state("auto")}>
            <FaSolidGear size={40} class="group-hover:rotate-190 transition-all duration-1000 "/>
            <H3>
              یادگیری از لینک
            </H3>
            <Muted>
              لینک وبسایت خود را وارد کنید، و فرایند یادگیری ربات به صورت اتومات اتفاق می افتد
            </Muted>
          </Card>
        </div>
      </div>
    </>
  )
}

interface p extends ParentProps {
  onclick?: () => void
}
const Card = (p:p) => <div
  class={`border-1 p-5 border-primary/50 rounded center h-90 hover:border-primary cursor-pointer transition-all
flex gap-2 text-muted-foreground hover:text-accent-foreground group
`}
  {...p}
>
    {p.children}
</div>

export default Choose
