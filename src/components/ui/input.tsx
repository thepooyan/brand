import { TextField, TextFieldInput } from "./text-field"

type t = typeof TextFieldInput
const Input:t = (props) => {
  return (
    <TextField class="w-full">
      <TextFieldInput {...props}/>
    </TextField>
  )
}

export default Input
