import { pageMarker } from "~/lib/routeChangeTransition"
import { Contact } from "../landing/Contact"

const ContactUsPage = () => {
  return (
    <main {...pageMarker()}>
      <Contact/>
    </main>
  )
}

export default ContactUsPage
