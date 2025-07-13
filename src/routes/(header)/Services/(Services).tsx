import { pageMarker } from "~/lib/routeChangeTransition"
import ServicesSection from "~/components/landing/Services"

const Services = () => {
  return (
    <main {...pageMarker()}>
      <ServicesSection/>
    </main>
  )
}

export default Services
