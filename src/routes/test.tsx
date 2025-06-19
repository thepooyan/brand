import { createResource } from "solid-js"
import { Button } from "~/components/ui/button"
import { getAuthSession, updateAuthSession } from "~/lib/session"

const test = () => {

  const [a] = createResource(getAuthSession)

  return (
    <div >
      {a()}
    </div>
  )
}

export default test
