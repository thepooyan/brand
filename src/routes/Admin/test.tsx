import Input from "~/components/ui/InputNew"

const test = () => {
  return (
    <div>
      <Input onInput={() => console.log("hi")}/>
    </div>
  )
}

export default test
