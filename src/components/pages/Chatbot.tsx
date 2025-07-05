import { createSignal, For, Show } from "solid-js"
import { Button } from "../ui/button"
import { TextField, TextFieldInput } from "../ui/text-field"
import { proccessConversation } from "~/server/chat"
import Msg from "../parts/chat/Msg"
import Spinner from "../parts/Spinner"

export type message = {role: "user", content: string } | {role: "assistant", content: string | null}
const Chatbot = () => {

  const [conver, setConver] = createSignal<message[]>([])
  const [question, setQuestion] = createSignal("");
  const [isWaiting, setWaiting] = createSignal(false)

  const submitHandler = async (e: SubmitEvent) => {
    e.preventDefault()
    setWaiting(true)
    let ts = question()
    setQuestion("")
    setConver(prev => [...prev, {role: "user", content: ts}])
    let res = await proccessConversation([...conver()])
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
