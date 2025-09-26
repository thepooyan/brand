import { TextField, TextFieldInput } from "./text-field"

type t = typeof TextFieldInput
const Input:t = (props) => {
  return (
    <TextField>
      <TextFieldInput {...props}/>
    </TextField>
  )
}

export default Input
