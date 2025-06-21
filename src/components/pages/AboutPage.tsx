import { pageMarker } from "~/lib/routeChangeTransition"
import About from "../landing/About"

const AboutPage = () => {
  return (
    <main {...pageMarker()}>
      <About/>
    </main>
  )
}

export default AboutPage
