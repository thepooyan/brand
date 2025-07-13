import { pageMarker } from "~/lib/routeChangeTransition";
import About from "~/components/landing/About";
import { Contact } from "~/components/landing/Contact";
import Hero from "~/components/landing/Hero";
import Services from "~/components/landing/Services";

export default function Home() {
  return (
    <div {...pageMarker()}>
      <Hero/>
      <Services/>
      <About/>
      <Contact/>
    </div>
  )
}
