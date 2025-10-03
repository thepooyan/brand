import { createAsync, useParams } from "@solidjs/router"
import { Show, Suspense } from "solid-js"
import BlogEditor from "~/components/parts/BlogEditor"
import { Loading } from "~/components/parts/Loading"
import { getBlogById } from "~/lib/queries"

const id = () => {
  const {id} = useParams()
  const blog = createAsync(() => getBlogById(parseInt(id)))
  
  return (
    <Suspense fallback={<Loading/>}>
      <Show when={blog()} fallback="بلاگ مورد نظر یافت نشد">
        {b => <BlogEditor editData={b()}/>}
      </Show>
    </Suspense>
  )
}

export default id
