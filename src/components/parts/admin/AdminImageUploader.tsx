import { createSignal } from "solid-js"
import { callModal } from "~/components/layout/Modal"
import { Button } from "~/components/ui/button"
import { ChangeEvent } from "~/lib/interface"
import { uploadFileToS3 } from "~/s3/s3Actions"

interface p {
  refetch: ()=>void
}
const AdminImageUploaderBtn = ({refetch}:p) => {

  const [loading, setLoading] = createSignal(false)
  let inputRef!:HTMLInputElement

  const handleClick = () => {
    inputRef.click()
  }

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return

    try {
      setLoading(true)
      const url = await uploadFileToS3(file)
      refetch()
      setLoading(false)
    } catch(e) {
      console.log(e)
      callModal.fail("متاسفانه آپلود فایل با مشکل مواجه شد. لطفا مجددا تلاش کنید.")
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) processFile(file)
  }

  return (
    <div>
      <Button class="m-5" onclick={handleClick}
        loading={loading}
      >
        افزودن
      </Button>
      <input
        type="file"
        accept="image/*"
        hidden
        ref={inputRef}
        onchange={handleChange}
      />

    </div>
  )
}

export default AdminImageUploaderBtn 
