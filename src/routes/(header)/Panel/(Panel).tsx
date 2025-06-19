import { pageMarker } from "~/lib/routeChangeTransition"

const index = () => {
  return (
    <main {...pageMarker()}>
      index
    </main>
  )
}

export default index
