import { FiPhone } from "solid-icons/fi"
import { Button } from "../ui/button"
import { ImTelegram, ImWhatsapp } from "solid-icons/im"
import { support } from "../../../config/config"

const ContactInfo = () => {
  return (
    <div class="flex flex-col gap-2">
      <p>جهت دریافت مشاوره رایگان، میتواند از راه های زیر استفاده نمایید:</p>
      <br/>
      <Button variant="secondary"
        as="a"
        href={`tel:${support.mobile}`}
      >
        تلفن
        <FiPhone/>
      </Button>
      <Button variant="secondary" 
        as="a"
        href={support.telegram}
      >
        تلگرام
        <ImTelegram class="text-blue-500"/>
      </Button>
      <Button variant="secondary" 
        as="a"
        href={`https://wa.me/${support.whatsapp}`}
      >
        واتساپ
        <ImWhatsapp class="text-green-500"/>
      </Button>
    </div>
  )
}

export default ContactInfo
