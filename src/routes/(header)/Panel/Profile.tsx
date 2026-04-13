import { action, revalidate, useSubmission } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { createEffect, Suspense } from "solid-js"
import { callModal } from "~/components/layout/Modal"
import Spinner from "~/components/parts/Spinner"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import Input from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { db } from "~/db/db"
import { usersTable } from "~/db/schema"
import { Transaction, transactionFail } from "~/lib/actionAbstraction"
import { extractFormData } from "~/lib/hooks/useForm"
import { panelPageMarker } from "~/lib/routeChangeTransition"
import { useGetUser, updateUserSession } from "~/lib/signal"
import { getUserServer } from "~/lib/user-signal"
import { safeDbTransaction } from "~/lib/utils"

interface form {
  name: string
  email: string
  number: string
}
const handleSubmit = action(async (formData:FormData):Transaction => {
  "use server"
  let {name, email, number} = extractFormData<form>(formData)

  if (!name || !email || !number) return transactionFail("لطفا همه موارد را وارد کنید")

  let result = await safeDbTransaction(
    db.transaction(async ctx => {
      let user = await getUserServer(ctx)
      if (!user.ok) return transactionFail("لطفا ابتدا لوگین کنید")

      return ctx.update(usersTable).set({name: name, email: email, number: number}).where(eq(usersTable.id, user.data.id))
    })
  )

  if (result.ok) {
    await updateUserSession({user: {
      name: name,
      email: email, 
      number: number
    }})
  }

  return result
})


const Profile = () => {
  const user = useGetUser(true)
  const submission = useSubmission(handleSubmit)

  createEffect(() => {
    if (submission.error) {
      callModal.fail()
    } else if (submission.result) {
      if (submission.result.ok) {
        callModal.success()
        revalidate("user")
      } else {
        callModal.fail(submission.result.msg)
      }
    } 
  })

  return (
    <div class="flex justify-center items-center h-full" {...panelPageMarker()}>
      <div class="flex justify-center w-lg">
        <Card class="w-full">
          <CardHeader class="text-right">
            <CardTitle class="text-2xl font-bold">فرم اطلاعات شخصی</CardTitle>
            <CardDescription>در صورت تمایل اطلاعات شخصی خود را کامل کنید</CardDescription>
          </CardHeader>
          <form method="post" action={handleSubmit}>
            <CardContent class="space-y-6">

              <div class="space-y-2">
                <Label for="name" class="block text-right">
                    نام
                </Label>
                <div class="flex items-center">
                  <Suspense fallback={<Fallback/>}>
                    <Input  placeholder="نام خود را وارد کنید" class="text-right" name="name" value={user()?.name || ""}/>
                  </Suspense>
                </div>
              </div>

              <div class="space-y-2">
                <Label for="fax" class="block text-right">
                  ایمیل
                </Label>
                <div class="flex items-center">
                  <Suspense fallback={<Fallback/>}>
                    <Input type="email" placeholder="ایمیل خود را وارد کنید" class="text-right" name="email" value={user()?.email || ""}/>
                  </Suspense>
                </div>
              </div>

              <div class="space-y-2">
                <Label for="fax" class="block text-right">
                  شماره همراه
                </Label>
                <div class="flex items-center">
                  <Suspense fallback={<Fallback/>}>
                    <Input  placeholder="شماره همراه خود را وارد کنید" class="text-right" name="number" value={user()?.number || ""}/>
                  </Suspense>
                </div>
              </div>

            </CardContent>
            <CardFooter>
              <Button type="submit" class="w-full" loading={submission.pending}>
                ثبت اطلاعات
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

const Fallback = () => <div class="w-full flex justify-center items-center rounded-md min-h-10 bg-gray-500 animate-pulse "><Spinner reverse/></div>

export default Profile
