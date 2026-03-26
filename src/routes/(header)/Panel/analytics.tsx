import { panelPageMarker } from "~/lib/routeChangeTransition"

const analytics = () => {
  return (
    <div class="grid grid-cols-2" {...panelPageMarker()}>
      analytics
    </div>
  )
}

export default analytics
