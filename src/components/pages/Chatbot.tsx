import { createSignal, For } from "solid-js"
import { Button } from "../ui/button"
import { TextField, TextFieldInput } from "../ui/text-field"
import { proccessQuestion } from "~/server/chat"

const Chatbot = () => {

  const [question, setQuestion] = createSignal("")
  const [response, setResponse] = createSignal<string[]>([])

  const sendQuestion = async () => {
    let res = await proccessQuestion(question())
    setQuestion("")
    setResponse(prev => [...prev, res])
  }

  return (
    <main class="h-dvh p-10">
      <div class=" rounded h-full flex justify-between flex-col  bg-zinc-900 p-5">
        <div>
          <For each={response()}>
            {r => <p>{r}</p>}
          </For>
        </div>

        <div class="flex gap-2">
          <Button onclick={sendQuestion}>Send</Button>
          <TextField class="w-full">
            <TextFieldInput class="bg-black" onchange={e => setQuestion(e.currentTarget.value)} value={question()}/>
          </TextField>
        </div>
      </div>

    </main>
  )
}

export default Chatbot
