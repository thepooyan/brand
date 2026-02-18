import { RouteSectionProps } from "@solidjs/router"
import { ErrorBoundary } from "solid-js"
import Footer from "~/components/layout/Footer"
import Header from "~/components/layout/Header"
import ErrorPage from "~/components/pages/ErrorPage"

const header = (props: RouteSectionProps) => {
  return (
    <div class="min-h-screen flex flex-col relative" dir="rtl">
      <Header/>
      <ErrorBoundary fallback={e => <ErrorPage error={e}/>}>
        {props.children}
      </ErrorBoundary>
      <Footer/>
    </div>
  )
}

export default header
