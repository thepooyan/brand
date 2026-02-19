import { pageMarker } from "~/lib/routeChangeTransition"
import { Contact } from "~/components/landing/Contact"
import { Link, Meta, Title } from "@solidjs/meta"

const ContactUs = () => {
  return (
    <main {...pageMarker()}>
      <Link rel="canonical" href="https://hooshbaan.com/ContactUs" />
      <Title> تماس با هوشبان | راه های ارتباطی با هوشبان </Title>
      <Meta name="description" content="برای دریافت مشاوره و شروع همکاری با هوشبان در زمینه هوش مصنوعی و طراحی سایت ، همین حالا با ما تماس بگیرید." />
      <Contact/>
    </main>
  )
}

export default ContactUs
