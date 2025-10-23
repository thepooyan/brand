import { pageMarker } from "~/lib/routeChangeTransition"
import ServicesSection from "~/components/landing/Services"
import { Link } from "@solidjs/meta"

const Services = () => {
  return (
    <main {...pageMarker()}>
      <Link rel="canonical" href="https://hooshbaan.com/Services" />
      <ServicesSection/>
    </main>
  )
}

export default Services
