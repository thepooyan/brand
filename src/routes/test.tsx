import { Button } from "~/components/ui/button"
import Input from "~/components/ui/input"
import { useForm } from "~/lib/hooks/useForm"

const test = () => {


  let a = {
    ali: 22,
    akbar: true,
    folan: ""
  }
  const {registerSubmit, register, errors} = useForm({initialValues: a})
  
  const submit = (e:typeof a) => {
    console.log("submit!", e)
  }

  return (
    <div>
      <form onsubmit={registerSubmit(submit)}>
        <Input {...register("ali")} />
        {errors().ali}

        <Input {...register("akbar")} type="checkbox" />
        {errors().akbar}
        <Button type="submit">s</Button>
      </form>
    </div>
  )
}

export default test
