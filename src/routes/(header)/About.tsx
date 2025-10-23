import { pageMarker } from "~/lib/routeChangeTransition"
import AboutSection from "~/components/landing/About"
import { Link } from "@solidjs/meta"

const About = () => {
  return (
    <main {...pageMarker()}>
      <Link rel="canonical" href="https://hooshbaan.com/About" />
      <AboutSection/>
    </main>
  )
}

export default About
