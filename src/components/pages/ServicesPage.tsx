import { pageMarker } from "~/lib/routeChangeTransition"
import Services from "../landing/Services"

const ServicesPage = () => {
  return (
    <main {...pageMarker()}>
      <Services/>
    </main>
  )
}

export default ServicesPage
