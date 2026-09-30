import { pageMarker } from "~/lib/routeChangeTransition"
import { Contact } from "~/components/landing/Contact"
import { Link, Meta, Title } from "@solidjs/meta"
import { name, socialLinks } from "../../../config/config"

const ContactUs = () => {
  return (
    <main {...pageMarker()}>
      <Link rel="canonical" href={`${socialLinks.website}/ContactUs`} />
      <Title> تماس با {name} | راه های ارتباطی با {name} </Title>
      <Meta name="description" content={`برای دریافت مشاوره و شروع همکاری با ${name} در زمینه هوش مصنوعی و طراحی سایت ، همین حالا با ما تماس بگیرید.` }/>
      <Contact/>
    </main>
  )
}

export default ContactUs
