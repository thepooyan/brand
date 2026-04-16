import {marked} from "marked"
import md from "../../md/terms-and-conditions.md?raw"

const TermsAndConditions = () => {

  const content = marked(md, {async: false})

  return (
    <>
      <div innerHTML={content}></div>
    </>
  )
}

export default TermsAndConditions
