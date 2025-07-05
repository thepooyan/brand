import { createSignal, For } from "solid-js"
import { Button } from "../ui/button"
import { TextField, TextFieldInput } from "../ui/text-field"
import { proccessQuestion } from "~/server/chat"

export type folan = {role: string, content: string | null}
const Chatbot = () => {

  const [conver, setConver] = createSignal<folan[]>([])
  const [question, setQuestion] = createSignal("");

  const submitHandler = async (e: SubmitEvent) => {
    e.preventDefault()
    let ts = {role: "user", content: question() }
    let res = await proccessQuestion([...conver(), ts])
    if (res === null) return
    setConver(prev => [...prev, ts, res])
    console.log(conver())
  }

  return (
    <main class="h-dvh p-10">
      <div class=" rounded h-full flex justify-between flex-col  bg-zinc-900 p-5">
        <div>
          <For each={conver()}>
            {r => <p>{r.content}</p>}
          </For>
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
