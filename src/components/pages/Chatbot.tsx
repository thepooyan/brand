import { createSignal, For, Show } from "solid-js"
import { Button } from "../ui/button"
import { TextField, TextFieldInput } from "../ui/text-field"
import { proccessConversation } from "~/server/chat"
import Msg from "../parts/chat/Msg"
import Spinner from "../parts/Spinner"

export type folan = {role: string, content: string | null}
const Chatbot = () => {

  const [conver, setConver] = createSignal<folan[]>([
    // {role: 'user', content: 'سلام'}
    // ,{content: 'سلام علیکم! خوش آمدید به هوشبان.  چطور می‌توانم به…که در ذهن دارید، خوشحال می‌شوم راهنمایی‌تان کنم.\n', role: 'assistant'}
    // ,{role: 'user', content: 'چه خدماتی دارید'}
    // ,{content: 'سلام! هوشبان طیف وسیعی از خدمات در حوزه توسعه وب و…اطلاعات بیشتری در مورد آن خدمت به شما ارائه دهم.\n', role: 'assistant'}
  ])
  const [question, setQuestion] = createSignal("");
  const [isWaiting, setWaiting] = createSignal(false)

  const submitHandler = async (e: SubmitEvent) => {
    e.preventDefault()
    setWaiting(true)
    let ts = {role: "user", content: question()}
    setQuestion("")
    setConver(prev => [...prev, ts])
    let res = await proccessConversation([...conver(), ts])
    if (res === null) return
    setConver(prev => [...prev, res])
    setWaiting(false)
  }

  return (
    <main class="h-dvh p-10">
      <div class=" rounded h-full flex justify-between flex-col  bg-zinc-900 p-5">
        <div class="overscroll-auto h-full overflow-scroll">
          <For each={conver()}>
            {r => <Msg left={r.role === "assistant"}>{r.content}</Msg>}
          </For>
          <Show when={isWaiting()}>
            <div class="my-5">
              <Spinner reverse/>
            </div>
          </Show>
        </div>

        <form class="flex gap-2" onsubmit={submitHandler}>
          <Button type="submit">Send</Button>
          <TextField class="w-full">
            <TextFieldInput class="bg-black" value={question()} onchange={e => setQuestion(e.currentTarget.value)} />
          </TextField>
        </form>
      </div>

    </main>
  )
}

export default Chatbot
