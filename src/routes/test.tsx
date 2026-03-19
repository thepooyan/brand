import z from "zod"
import { Button } from "~/components/ui/button"
import Input from "~/components/ui/input"
import { useForm } from "~/lib/hooks/useForm"

const test = () => {


  //supported: string, boolean, number, email
  let sch = z.object({
    ali: z.email(),
    akbar: z.email().min(1),
  })
  const {registerSubmit, register, errors} = useForm(sch)

  const submit = (e:z.infer<typeof sch>) => {
    console.log(e)
  }


  return (
    <div>
      <form onsubmit={registerSubmit(submit)}>
        <Input {...register("ali")} />
        {errors.ali}

        <Input {...register("akbar")} />
        {errors.akbar}
        <Button type="submit">s</Button>
      </form>
    </div>
  )
}

export default test
