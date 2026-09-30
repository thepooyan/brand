import { pageMarker } from "~/lib/routeChangeTransition";
import About from "~/components/landing/About";
import { Contact } from "~/components/landing/Contact";
import Hero from "~/components/landing/Hero";
import Services from "~/components/landing/Services";
import { Link } from "@solidjs/meta";
import { socialLinks } from "../../../config/config";

export default function Home() {
  return (
    <div {...pageMarker()}>
      <Link rel="canonical" href={`${socialLinks.website}/`} />
      <Hero/>
      <Services/>
      <About/>
      <Contact/>
    </div>
  )
}
