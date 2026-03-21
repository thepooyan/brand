import { Button } from "~/components/ui/button"
import { crawl } from "~/server/crawler"

const test = () => {

  const hi = () => {
    crawl("https://zarebin.ir")

  }

  return <>
    <Button onclick={hi}>hi</Button>
  </>
}

export default test
