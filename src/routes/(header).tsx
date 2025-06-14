import { RouteSectionProps } from "@solidjs/router"
import Footer from "~/components/layout/Footer"
import Header from "~/components/layout/Header"

const header = (props: RouteSectionProps) => {
  return (
    <div class="min-h-screen flex flex-col" dir="rtl">
      <Header/>
      {props.children}
      <Footer/>
    </div>
  )
}

export default header
