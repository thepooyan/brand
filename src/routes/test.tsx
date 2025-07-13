import { onMount } from "solid-js"
import FallbackPage from "~/components/pages/FallbackPage"
import { sendTelegramMessage } from "~/server/telegram"

const test = () => {
  onMount(async() => {
    // sendTelegramMessage("i love my babe")
  })
  return (
    <FallbackPage/>
  )
}

export default test
