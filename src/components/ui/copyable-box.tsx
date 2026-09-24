import { FiCopy } from "solid-icons/fi"
import { Button } from "./button"
import Copyable from "./copyable"

interface p {
  toCopy: string
}
const CopyableBox = ({toCopy}:p) => {
  return (
    <>
      <Copyable toCopy={toCopy}>
        <Button variant="secondary">
          <FiCopy/>
            {toCopy}
        </Button>
      </Copyable>
    </>
  )
}

export default CopyableBox
