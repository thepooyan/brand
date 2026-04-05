import { onMount } from "solid-js"
import Spinner from "~/components/parts/Spinner"
import { useTransaction } from "~/lib/actionAbstraction"
import { crawl } from "~/server/crawler"

const test = () => {

  const {callTransaction, loading} = useTransaction()

  const hi = () => {
    callTransaction(
      crawl("https://zarebin.ir")
      // crawl("https://tahlildadeh.com")
    )
  }
  onMount(() => hi())

  return <>
    {loading() && 
      <Spinner/>}
  </>
}

export default test
