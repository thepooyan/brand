import { createAsync } from "@solidjs/router"
import { getAllBlogs } from "~/lib/queries"

const Weblog = () => {

  const blogs = createAsync(() => getAllBlogs())
  
  return (
    <div>
      {blogs()?.map(b => <>{b.title}</>)}
    </div>
  )
}

export default Weblog
