import z from "zod"
import { Button } from "~/components/ui/button"
import Input from "~/components/ui/input"
import { useForm } from "~/lib/hooks/useForm"

const test = () => {


  //supported: string, boolean, number
  let sch = z.object({
    ali: z.email(),
    akbar: z.boolean(),
  })
  const {registerSubmit, register} = useForm(sch)

  const submit = (e:z.infer<typeof sch>) => {
    console.log(e)
  }


  return (
    <div>
      <form onsubmit={registerSubmit(submit)}>
        <Input {...register("ali")} />
        <Input type="checkbox" {...register("akbar")} />
        <Button type="submit">s</Button>
      </form>
    </div>
  )
}

export default test
