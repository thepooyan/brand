import { callModal } from "../layout/Modal"
import { Button } from "../ui/button"
import ContactInfo from "./ContactInfo"

const Consult = () => {
  return (
    <Button
      variant="secondary"
      onclick={() => callModal(() => <ContactInfo/>)}
    >درخواست مشاوره</Button>
  )
}

export default Consult
