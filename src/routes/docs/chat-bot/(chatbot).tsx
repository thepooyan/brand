import { A } from "@solidjs/router"
import { For } from "solid-js"
import { docsChatNav, docsNav } from "~/components/app-sidebar"

const chatbot = () => {
  const a = docsChatNav.find(i => i.url === "/docs/chat-bot")
  return (
    <>
      <h1>آموزش های مربوط به چت‌بات:</h1>
      {a && a.items && <Loop nav={a.items}/>}
    </>
  )
}

interface p {
  nav: docsNav[]
}
const Loop = ({nav}:p) => {
  return (
    <>
      <ol>
        <For each={nav}>
          {i => <li>
            <A href={i.url}>
              {i.title}
            </A>
            {i.items &&  <Loop nav={i.items}/>}
          </li>}
        </For>
      </ol>
    </>
  )
}

export default chatbot
