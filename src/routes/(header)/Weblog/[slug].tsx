import { createAsync, useParams } from "@solidjs/router"
import { Show, Suspense } from "solid-js"
import BlogNotFound from "~/components/pages/blog/BlogNotFound"
import { BlogPage } from "~/components/pages/BlogPage"
import { Loading } from "~/components/parts/Loading"
import { getBlogBySlug } from "~/lib/queries"

const slug = () => {
  const {slug} = useParams()

  const data = createAsync(() => getBlogBySlug(decodeURIComponent(slug)))

  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <Show when={data()} fallback={<BlogNotFound/>}>
          {d => <BlogPage blog={d()}/>}
        </Show>
      </Suspense>
    </div>
  )
}

export const route = {
  preload: (props: {params: {slug: string}}) => getBlogBySlug(decodeURIComponent((props.params.slug)))
}

export default slug
