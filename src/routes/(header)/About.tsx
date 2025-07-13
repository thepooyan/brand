import { pageMarker } from "~/lib/routeChangeTransition"
import AboutSection from "~/components/landing/About"

const About = () => {
  return (
    <main {...pageMarker()}>
      <AboutSection/>
    </main>
  )
}

export default About
