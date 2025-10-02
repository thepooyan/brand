import { createAsync, useParams } from "@solidjs/router"
import { Suspense } from "solid-js"
import { getBlogBySlug } from "~/lib/queries"

const slug = () => {
  const {slug} = useParams()

  const data = createAsync(() => getBlogBySlug(slug))

  return (
    <div>
      <Suspense fallback="Loading...">
        <div>
          {data()?.title}
        </div>
      </Suspense>
    </div>
  )
}

export default slug
