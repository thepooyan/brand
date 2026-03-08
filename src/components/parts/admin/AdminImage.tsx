import { FaSolidBucket } from "solid-icons/fa"
import { FiCopy } from "solid-icons/fi"
import { callModal } from "~/components/layout/Modal"
import { Button } from "~/components/ui/button"
import Copyable from "~/components/ui/copyable"
import { deleteFileFromS3 } from "~/s3/s3Actions"
import { sharedEnv } from "~/server/env/shared-env"

interface p {
  url: string
  refetch: ()=>void
}
const AdminImage = ({url, refetch}:p) => {

  const fullurl = `https://${sharedEnv.VITE_BUCKET_URL}/${url}`
  const deleteImage = () => {
    callModal.prompt("حذف شود؟")
    .yes(async () => {
        let res = await deleteFileFromS3(url)
        if (res === null) callModal.fail("حذف موفقیت آمیز نبود.")
        refetch()
      })
  }

  return (
    <div class="p-10 hover:bg-muted rounded-lg transition-colors">
      <img src={fullurl} class="rounded-lg h-59 w-60 m-auto object-contain"/>

      <div class="flex justify-center gap-3 mt-5">
        <Copyable toCopy={fullurl}>
          <Button>
            <FiCopy/>
          </Button>
        </Copyable>

        <Button class="bg-destructive hover:bg-destructive/80" onclick={deleteImage}>
          <FaSolidBucket/>
        </Button>
      </div>
      
    </div>
  )
}

export default AdminImage
