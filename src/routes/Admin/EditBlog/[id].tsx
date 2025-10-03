import { useParams } from "@solidjs/router"
import BlogEditor from "~/components/parts/BlogEditor"

const id = () => {
  const {id} = useParams()
  return (
    <BlogEditor/>
  )
}

export default id
