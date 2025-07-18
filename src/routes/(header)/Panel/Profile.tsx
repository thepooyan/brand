import { action, redirect, useSubmission } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { createEffect, Suspense } from "solid-js"
import { callModal } from "~/components/layout/Modal"
import MyButton from "~/components/parts/MyButton"
import Spinner from "~/components/parts/Spinner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import Input from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { db } from "~/db/db"
import { usersTable } from "~/db/schema"
import { pageMarker } from "~/lib/routeChangeTransition"
import { getAuthSession } from "~/lib/session"
import { getUser, updateUserSession } from "~/lib/signal"

const handleSubmit = action(async (formData:FormData) => {
  "use server"
  let name = formData.get("name")?.toString() || ""
  let email = formData.get("email")?.toString() || ""

  let number = (await getAuthSession())?.number
  if (!number) throw redirect("/Login")

  await db.update(usersTable).set({name: name, email: email}).where(eq(usersTable.number, number))
  updateUserSession(name, email)
  return "done"
})


const Profile = () => {
  const user = getUser()
  const submission = useSubmission(handleSubmit)

  createEffect(() => {
    if (submission.error) {
      callModal.fail()
    } else if (submission.result) {
      callModal.success()
    } 
  })

  return (
    <div {...pageMarker()} class=" rounded m-4 max-w-xl mx-auto ">
      <div class="flex justify-center">
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
                    <Input  placeholder="ایمیل خود را وارد کنید" class="text-right" name="email" value={user()?.email || ""}/>
                  </Suspense>
                </div>
              </div>

            </CardContent>
            <CardFooter>
              <MyButton type="submit" class="w-full" isWaiting={submission.pending}>
                ثبت اطلاعات
              </MyButton>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

const Fallback = () => <div class="w-full flex justify-center items-center rounded-md min-h-10 bg-gray-500 animate-pulse "><Spinner reverse/></div>

export default Profile
