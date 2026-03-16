import { Button } from "~/components/ui/button"
import Input from "~/components/ui/input"
import { crawl } from "~/server/crawler"

const test = () => {

  const send = () => {
    crawl("https://zarebin.ir")
    .then(s => console.log(s))
    .catch(s => console.log(s))
  }

  return (
    <div>
      <Input/>
      <Button onclick={send}>send</Button>
    </div>
  )
}

export default test
