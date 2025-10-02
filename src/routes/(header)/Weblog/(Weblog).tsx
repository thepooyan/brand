import { createAsync } from "@solidjs/router"
import { Suspense } from "solid-js"
import BlogCard from "~/components/parts/BlogCard"
import { Loading } from "~/components/parts/Loading"
import { getAllBlogs } from "~/lib/queries"

const Weblog = () => {

  const blogs = createAsync(() => getAllBlogs())
  
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:p-10 pt-10 gap-5 w-max m-auto">
          {blogs()?.map(b => <BlogCard post={b} index={0}/> )}
        </div>
      </Suspense>
    </>
  )
}

export default Weblog
