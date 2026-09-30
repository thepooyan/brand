import { pageMarker } from "~/lib/routeChangeTransition"
import ServicesSection from "~/components/landing/Services"
import { Link } from "@solidjs/meta"
import { socialLinks } from "../../../../config/config"

const Services = () => {
  return (
    <main {...pageMarker()}>
      <Link rel="canonical" href={`${socialLinks.website}/Services`} />
      <ServicesSection/>
    </main>
  )
}

export default Services
