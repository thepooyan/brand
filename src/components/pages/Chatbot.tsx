import { createSignal, For, Show } from "solid-js"
import { Button } from "../ui/button"
import { TextField, TextFieldInput } from "../ui/text-field"
import Msg from "../parts/chat/Msg"
import Spinner from "../parts/Spinner"
import { useChat } from "~/lib/chatUtil"

const Chatbot = () => {
  const [question, setQuestion] = createSignal("");
  const { response, send, messages, pending } = useChat()

  const submitHandler = async (e: SubmitEvent) => {
    e.preventDefault()
    let q = question()
    setQuestion("")
    await send(q)
  }

  return (
    <main class="h-dvh p-10">
      <div class=" rounded h-full flex justify-between flex-col  bg-zinc-900 p-5">
        <div class="overscroll-auto h-full overflow-scroll">
          <For each={messages()}>
            {r => <Msg left={r.role === "assistant"}>{r.content}</Msg>}
          </For>
          {response() && <Msg left>{response()}</Msg> }
          <Show when={pending()}>
            <div class="my-5">
              <Spinner reverse/>
            </div>
          </Show>
        </div>

        <form class="flex gap-2" onsubmit={submitHandler}>
          <Button type="submit" disabled={pending()}>ارسال</Button>
          <TextField class="w-full">
            <TextFieldInput class="bg-black" value={question()} onchange={e => setQuestion(e.currentTarget.value)} />
          </TextField>
        </form>
      </div>
    </main>
  )
}

export default Chatbot
