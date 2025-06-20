import { action } from "@solidjs/router"

const test = () => {
  return (
    <form action={deleteTodo} method="post">
      <input name="folan"  class="bg-white"/>
      <button type="submit">send</button>
    </form>
)}

const deleteTodo = action(async (formData:FormData) => {
  "use server"
  console.log(formData)
})
export default test
