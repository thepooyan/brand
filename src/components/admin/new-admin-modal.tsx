import { createSignal } from "solid-js"
import { callModal, closeModal } from "../layout/Modal"
import { Title } from "../prose/prose-item"
import { Button } from "../ui/button"
import Input from "../ui/input"
import { promoteUser } from "./userInteractions"
import { revalidate } from "@solidjs/router"

interface p {
  id: number,
  number: string
}
const NewAdminModal = ({id, number}:p) => {

  const signal = createSignal("")

  const handleClick = async () => {
    let {ok, msg} = await promoteUser({
      id: id,
      number: number,
      chat_id: signal[0]()
    })

    closeModal()
    if (!ok) {
      return callModal.fail(msg)
    }
    callModal.success()
    revalidate("adminUser")
  }

  return (
    <div class="space-y-4">
      <Title>
        ثبت ادمین جدید:
      </Title>
      <Input placeholder="telegram chat id" bind={signal}/>
      <Button class="ml-2" onclick={handleClick}>
        ثبت
      </Button>
      <Button variant="secondary" onclick={closeModal} >
        کنسل
      </Button>
    </div>
  )
}

export default NewAdminModal
