import { pageMarker } from "~/lib/routeChangeTransition"
import AboutSection from "~/components/landing/About"
import { Link, Meta, Title } from "@solidjs/meta"
import { name, socialLinks } from "../../../config/config"

const About = () => {
  return (
    <main {...pageMarker()}>
      <Link rel="canonical" href={`${socialLinks.website}/About` }/>
      <Title> {name} | تیمی از برنامه نویسان متخصص هوش مصنوعی </Title>
      <Meta name="description" content={`${name} ، تیمی خلاق در ارائه خدمات هوش مصنوعی و طراحی سایت. با برنامه نویسان متخصص ، همراه کسب و کار شماییم` }/>
      <AboutSection/>
    </main>
  )
}

export default About
