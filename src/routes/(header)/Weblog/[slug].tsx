import { createAsync, useParams } from "@solidjs/router"
import { Show, Suspense } from "solid-js"
import { BlogPage } from "~/components/pages/BlogPage"
import { getBlogBySlug } from "~/lib/queries"

const slug = () => {
  const {slug} = useParams()

  const data = createAsync(() => getBlogBySlug(slug))

  return (
    <div>
      <Suspense fallback="Loading...">
        <Show when={data()} fallback="پست مورد نظر پیدا نشد">
          {d => <BlogPage blog={d()}/>}
        </Show>
      </Suspense>
    </div>
  )
}

export default slug
