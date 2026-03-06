import { Button } from "~/components/ui/button"

const AdminImageUploaderBtn = () => {
  return (
    <label>
      <Button class="m-5">افزودن</Button>
      <input
        type="file"
        accept="image/*"
        hidden
      />

    </label>
  )
}

export default AdminImageUploaderBtn 
