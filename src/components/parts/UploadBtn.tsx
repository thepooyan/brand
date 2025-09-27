import { FiUpload } from "solid-icons/fi"
import { Button } from "../ui/button"
import { uploadToS3 } from "~/server/actions"

interface p {
    onUploaded: (url: string) => void

}
const UploadBtn = ({onUploaded}:p) => {

    const changeHandler = async (e: any) => {
        const files = e.target.files
        if (!files || files.length === 0) return
        let result = await uploadToS3(files[0])
        onUploaded(result)
    }

  return (
    <>
        <Button type="button" variant="outline" size="sm" as="label" for="file" class="cursor-pointer">
          <FiUpload class="h-4 w-4" />
        </Button>
        <input type="file" class="hidden" id="file" onChange={changeHandler}/>
    </>
  )
}

export default UploadBtn

