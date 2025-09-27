import { createAsync } from "@solidjs/router"
import { Suspense } from "solid-js"
import BlogCard from "~/components/parts/BlogCard"
import { getAllBlogs } from "~/lib/queries"

const Weblog = () => {

  const blogs = createAsync(() => getAllBlogs())
  
  return (
    <div class="grid grid-cols-3 p-10">
      <Suspense fallback="Loading...">
        {blogs()?.map(b => <BlogCard post={b} index={0}/> )}
      </Suspense>
    </div>
  )
}

export default Weblog
