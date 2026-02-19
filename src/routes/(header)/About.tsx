import { pageMarker } from "~/lib/routeChangeTransition"
import AboutSection from "~/components/landing/About"
import { Link, Meta, Title } from "@solidjs/meta"
import { name } from "../../../config/config"

const About = () => {
  return (
    <main {...pageMarker()}>
      <Link rel="canonical" href="https://hooshbaan.com/About" />
      <Title> {name} | تیمی از برنامه نویسان متخصص هوش مصنوعی </Title>
      <Meta name="description" content="هوش بان ، تیمی خلاق در ارائه خدمات هوش مصنوعی و طراحی سایت. با برنامه نویسان متخصص ، همراه کسب و کار شماییم" />
      <AboutSection/>
    </main>
  )
}

export default About
