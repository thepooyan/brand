import { createSignal, Show } from "solid-js"
import { Button } from "../ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import Input from "../ui/input"
import { wait } from "~/lib/utils"
import { callModal, closeModal } from "../layout/Modal"

const TelegramSet = () => {

  const [token, setToken] = createSignal("")
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal<string | null>(null)

  const tokenLength = 10

  const submit = async () => {
    const t = token()
    if (t.length !== tokenLength) {
      return setError(`طول توکن باید ${tokenLength} کاراکتر باشد.`)
    }
    setLoading(true)
    registerTelegramToken(t)
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

  const registerTelegramToken = (token: string) => {
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
      <CardContent>
        <Input
          placeholder="توکن ربات تلگرام"
          onchange={e => setToken(e.currentTarget.value)}
        />
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
