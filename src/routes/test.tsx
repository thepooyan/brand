import { createEffect } from "solid-js"
import z from "zod"
import { Button } from "~/components/ui/button"
import Input from "~/components/ui/input"
import { useForm } from "~/lib/hooks/useForm"

const test = () => {


  let b = {
    ali: "folan",
    akbar: false,
    folan: 5
  }
  let a = z.object({
    ali: z.string(),
    akbar: z.boolean(),
    folan: z.number()
  })
  const {registerSubmit, register, errors} = useForm({schema: a, initialValues: b})
  
  const submit = (e:z.infer<typeof a>) => {
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
