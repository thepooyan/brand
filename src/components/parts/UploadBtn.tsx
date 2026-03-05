import { FiUpload } from "solid-icons/fi"
import { Button } from "../ui/button"
import { callModal } from "../layout/Modal"
import { createEffect, createSignal } from "solid-js"
import Spinner from "./Spinner"
import { uploadFileToS3 } from "~/s3/s3Actions"

interface p {
  onUploaded: (url: string) => void
  setIsUploading?: (val: boolean)=>void
}
const UploadBtn = ({onUploaded, setIsUploading}:p) => {
  const [loading, setLoading] = createSignal(false)

  if (setIsUploading)
  createEffect(() => {
    setIsUploading(loading())
  })

    const changeHandler = async (e: any) => {
        const files = e.target.files
        if (!files || files.length === 0) return
        try {
          setLoading(true)
          let result = await uploadFileToS3(files[0])
          if (!result) return callModal.fail("مشکلی در آپلود فایل پیش آمد. لطفا مجددا تلاش کنید.")
          setLoading(false)
          onUploaded(result)
        } catch(_) {
          callModal.fail("Error while uploading file")
        }
    }

  return (
    <>
        <Button type="button" variant="outline" size="sm" as="label" for="file" class="cursor-pointer"  >
          {loading() ? <Spinner reverse/> : <FiUpload class="h-4 w-4" />}
        </Button>
        <input type="file" class="hidden" id="file" onChange={changeHandler} disabled={loading()}/>
    </>
  )
}

export default UploadBtn

