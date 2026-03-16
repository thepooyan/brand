import { Button } from "~/components/ui/button"
import Input from "~/components/ui/input"
import { crawl } from "~/server/crawler"

const test = () => {

  const send = () => {
    crawl("https://zarebin.ir")
    .then(s => console.log(s))
    .catch(s => console.log(s))
  }

  const limitArray = (arr: any[], limit: number) => {
  if (arr.length > limit) {
    arr = arr.slice(arr.length - limit)
  }
  return arr
}

  console.log(limitArray([1,2,3], 2))

  return (
    <div>
      <Input/>
      <Button onclick={send}>send</Button>
    </div>
  )
}

export default test
