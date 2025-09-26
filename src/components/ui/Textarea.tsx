import { TextField, TextFieldTextArea } from "./text-field"

type t = typeof TextFieldTextArea
const Textarea:t = (props) => {
  return (
    <TextField>
      <TextFieldTextArea {...props}/>
    </TextField>
  )
}

export default Textarea
