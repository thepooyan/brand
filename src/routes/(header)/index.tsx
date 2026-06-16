import { pageMarker } from "~/lib/routeChangeTransition";

export default function Home() {
  return (
    <div {...pageMarker()}>
      hi
    </div>
  )
}
