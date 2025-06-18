import { callModal } from "~/components/layout/Modal";
import { account, ID } from "~/lib/appwrite";

const test = () => {

  const ff = async () => {
    callModal.success("hey")
  }

  return (
    <div onclick={ff}>test</div>
  )
}

export default test
