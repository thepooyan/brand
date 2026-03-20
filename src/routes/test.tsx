import { createEffect } from "solid-js"
import z from "zod"
import { Button } from "~/components/ui/button"
import Input from "~/components/ui/input"
import { useForm } from "~/lib/hooks/useForm"

const test = () => {


  let b = {
    ali: 2,
    akbar: false,
    folan: 5
  }
  let a = z.object({
    ali: z.string(),
    akbar: z.string().min(1).default("a"),
    folan: z.number().default(0)
  })
  const {registerSubmit, formValues, setForm, register, errors} = useForm({initialValues: b})

  createEffect(() => console.log({...formValues}))
  
  const submit = (e:typeof b) => {
    console.log("submit!", e)
  }
  const change = () => {
    // setForm("ali", "lalala")
  }

  return (
    <div>
      <form onsubmit={registerSubmit(submit)}>
        <Input {...register("ali")} />
        {errors().ali}

        <Input {...register("akbar")} />
        {errors().akbar}
        <Button type="submit">s</Button>
        <Button onclick={change}>sm</Button>
      </form>
    </div>
  )
}

export default test
