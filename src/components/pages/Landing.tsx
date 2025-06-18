import { pageMarker } from "~/lib/routeChangeTransition";
import About from "../landing/About";
import { Contact } from "../landing/Contact";
import Hero from "../landing/Hero";
import Services from "../landing/Services";

export default function Landing() {
  return (
    <div {...pageMarker()}>
      <Hero/>
      <Services/>
      <About/>
      <Contact/>
    </div>
  )
}

