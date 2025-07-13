import { pageMarker } from "~/lib/routeChangeTransition"
import { Contact } from "~/components/landing/Contact"

const ContactUs = () => {
  return (
    <main {...pageMarker()}>
      <Contact/>
    </main>
  )
}

export default ContactUs
