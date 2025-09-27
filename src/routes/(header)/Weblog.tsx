import { createAsync } from "@solidjs/router"
import { Suspense } from "solid-js"
import BlogCard from "~/components/parts/BlogCard"
import { getAllBlogs } from "~/lib/queries"

const Weblog = () => {

  const blogs = createAsync(() => getAllBlogs())
  
  return (
    <div>
      <Suspense fallback="Loading...">
        {blogs()?.map(b => <BlogCard blog={b}/> )}
      </Suspense>
    </div>
  )
}

export default Weblog
