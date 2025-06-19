import { pageMarker } from "~/lib/routeChangeTransition"

const PanelPage = () => {
  return (
    <main {...pageMarker()}>
      Panel
    </main>
  )
}

export default PanelPage
