import { TextField, TextFieldTextArea } from "./text-field"

type t = typeof TextFieldTextArea
const Textarea:t = (props) => {
  return (
    <TextField class={props.class}>
      <TextFieldTextArea {...props}/>
    </TextField>
  )
}

export default Textarea
