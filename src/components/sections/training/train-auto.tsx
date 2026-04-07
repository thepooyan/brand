import { Button } from "~/components/ui/button"
import Input from "~/components/ui/input"

const TrainAuto = () => {
  return (
    <>
      <label>
        آدرس وبسایت خود را وارد کنید:
        <Input placeholder="https://www.example.com" class="ltr"/>
      </label>
      <Button>تایید</Button>
    </>
  )
}

export default TrainAuto
