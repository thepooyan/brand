import { H2, Muted } from "~/components/prose/prose-item"
import { panelPageMarker } from "~/lib/routeChangeTransition"

const analytics = () => {
  return (
    <div class="" {...panelPageMarker()}>
      <H2 class="mt-4">آمار</H2>
      <Muted class="mb-8">اطلاعات درباره میزان استفاده مشتریان شما از چت‌بات</Muted>
    </div>
  )
}

export default analytics
