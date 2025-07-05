import { FiPhone } from "solid-icons/fi"
import { Button } from "../ui/button"
import { ImTelegram, ImWhatsapp } from "solid-icons/im"

const ContactInfo = () => {
  return (
    <div class="flex flex-col gap-2">
      <p>جهت دریافت مشاوره رایگان، میتواند از راه های زیر استفاده نمایید:</p>
      <Button variant="secondary">
        تلفن
      </Button>
        <FiPhone/>
      <Button variant="secondary">
        تلگرام
        <ImTelegram/>
      </Button>
      <Button variant="secondary">
        واتساپ
        <ImWhatsapp class="text-red-700"/>
      </Button>
    </div>
  )
}

export default ContactInfo
