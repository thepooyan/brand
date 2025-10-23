import { Link } from "@solidjs/meta"
import { createAsync } from "@solidjs/router"
import { Suspense } from "solid-js"
import NoBlogsYet from "~/components/pages/blog/NoBlogsYet"
import BlogCard from "~/components/parts/BlogCard"
import { Loading } from "~/components/parts/Loading"
import { getAllBlogs } from "~/lib/queries"

const Blog = () => {

  const blogs = createAsync(() => getAllBlogs())
  
  return (
    <>
      <Link rel="canonical" href="https://hooshbaan.com/Blog" />
      <Suspense fallback={<Loading/>}>
        {blogs()?.length === 0 && <NoBlogsYet/>}
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:p-10 pt-10 gap-5 w-max m-auto">
          {blogs()?.map(b => <BlogCard post={b} index={0}/> )}
        </div>
      </Suspense>
    </>
  )
}

export default Blog
