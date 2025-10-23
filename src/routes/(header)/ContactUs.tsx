import { pageMarker } from "~/lib/routeChangeTransition"
import { Contact } from "~/components/landing/Contact"
import { Link } from "@solidjs/meta"

const ContactUs = () => {
  return (
    <main {...pageMarker()}>
      <Link rel="canonical" href="https://hooshbaan.com/ContactUs" />
      <Contact/>
    </main>
  )
}

export default ContactUs
