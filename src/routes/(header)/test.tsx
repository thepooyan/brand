import Spinner from "~/components/parts/Spinner"
import { crawl } from "~/server/crawler"

const test = () => {

  const hi = () => {
    crawl("https://zarebin.ir")

  }

  return <>
    hi
    <Spinner/>
    hi
  </>
}

export default test
