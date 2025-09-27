import { IBlog } from "~/db/schema"

interface p {
  blog: IBlog
}
const BlogCard = (props:p) => {
  return (
    <div>
      {props.blog.title}
    </div>
  )
}

export default BlogCard
