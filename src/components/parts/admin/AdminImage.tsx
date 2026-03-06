import { FaSolidBucket } from "solid-icons/fa"
import { FiCopy } from "solid-icons/fi"
import { Button } from "~/components/ui/button"

interface p {
  url: string
}
const AdminImage = ({url}:p) => {
  return (
    <div class="p-10 hover:bg-muted rounded-lg transition-colors">
      <img src={url} class="rounded-lg h-60 w-60 m-auto object-contain"/>

      <div class="flex justify-center gap-3 mt-5">
      <Button>
        <FiCopy/>
      </Button>

      <Button class="bg-destructive hover:bg-destructive/80" >
        <FaSolidBucket/>
      </Button>
      </div>
      
    </div>
  )
}

export default AdminImage
