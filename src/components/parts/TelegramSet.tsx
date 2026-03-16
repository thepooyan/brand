import { createSignal, Show } from "solid-js"
import { Button } from "../ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import Input from "../ui/input"
import { wait } from "~/lib/utils"
import { callModal, closeModal } from "../layout/Modal"
import { tokenLength } from "~/db/schema"

interface p {
}
const TelegramSet = ({}:p) => {

  const [telegramToken, setTelegramToken] = createSignal("")
  const [botToken, setBotToken] = createSignal("")
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal<string | null>(null)

  const TelegramTokenLength = 10

  const submit = async () => {
    setError("")
    const tt = telegramToken()
    if (tt.length !== TelegramTokenLength) {
      return setError(`طول توکن تلگرام باید ${TelegramTokenLength} کاراکتر باشد.`)
    }
    const bt = botToken()
    if (bt.length !== tokenLength) {
      return setError(`طول توکن چت‌بات باید ${tokenLength} کاراکتر باشد.`)
    }
    setLoading(true)
    registerTelegramToken(tt, bt)
    .then(() => {
      closeModal()
      callModal.success("ربات شما با موفقیت ثبت شد")
      })
    .catch(e => {
      console.log(e)
      setError("مشکلی پیش آمد. لطفا مجددا تلاش کنید.")
      })
    .finally(() => setLoading(false))
  }

  const registerTelegramToken = (telegram_bot_token: string, chatbot_token: string) => {
    console.log(`set telegram bot: ${telegram_bot_token} on chatbot: ${chatbot_token}`)
    return new Promise( async (res, rej) => {
      await wait(2000)
      rej("")
    })
  }


  return (
    <div>
      <CardHeader>
        <CardTitle>اتصال به تلگرام</CardTitle>
        <CardDescription>جهت اتصال ربات تلگرامی به چت‌بات خود توکن ربات تلگرام خود را وارد کنید.</CardDescription>
      </CardHeader>
      <CardContent class="text-right space-y-2">
        <Input
          placeholder="توکن ربات تلگرام"
          onchange={e => setTelegramToken(e.currentTarget.value)}
        />
        <p>توکن ربات تلگرام را پس از ساخت آن از تلگرام دریافت کنید</p>
        <Input
          placeholder="توکن چت‌بات شما"
          onchange={e => setBotToken(e.currentTarget.value)}
          class="mt-4"
        />
        <p>توکن چت‌بات خود را با دکمه "دریافت توکن" دریافت کنید</p>
        <Show when={error()}>
          { e => <p class="text-destructive font-bold text-right mt-2">{e()}</p>}

        </Show>
      </CardContent>
      <CardFooter class="justify-center">
        <Button onclick={submit} loading={loading}>ثبت</Button>
      </CardFooter>

    </div>
  )
}

export default TelegramSet
