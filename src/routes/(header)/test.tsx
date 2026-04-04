import { onMount } from "solid-js"
import Spinner from "~/components/parts/Spinner"
import { useTransaction } from "~/lib/actionAbstraction"
import { crawl } from "~/server/crawler"

const test = () => {

  const {callTransaction, loading} = useTransaction()

  const hi = () => {
    callTransaction(
      crawl("http://localhost:3000")
    )
  }
  onMount(() => hi())

  return <>
    {loading() && 
      <Spinner/>}
  </>
}

export default test
