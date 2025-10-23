import { pageMarker } from "~/lib/routeChangeTransition";
import About from "~/components/landing/About";
import { Contact } from "~/components/landing/Contact";
import Hero from "~/components/landing/Hero";
import Services from "~/components/landing/Services";
import { Link } from "@solidjs/meta";

export default function Home() {
  return (
    <div {...pageMarker()}>
      <Link rel="canonical" href="https://hooshbaan.com/" />
      <Hero/>
      <Services/>
      <About/>
      <Contact/>
    </div>
  )
}
