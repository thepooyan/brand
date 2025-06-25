import { action, redirect, revalidate, useSubmission } from "@solidjs/router"
import { useQueryClient } from "@tanstack/solid-query"
import { eq } from "drizzle-orm"
import { createEffect, onMount, Suspense } from "solid-js"
import { callModal } from "~/components/layout/Modal"
import MyButton from "~/components/parts/MyButton"
import Spinner from "~/components/parts/Spinner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import Input from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { db } from "~/db/db"
import { usersTable } from "~/db/schema"
import { profileQuery } from "~/lib/queries"
import { pageMarker, useTransitiveNavigate } from "~/lib/routeChangeTransition"
import { getAuthSession } from "~/lib/session"

const handleSubmit = action(async (formData:FormData) => {
  "use server"
  let name = formData.get("name")?.toString() || ""
  let email = formData.get("email")?.toString() || ""

  let number = (await getAuthSession())?.number
  if (!number) throw redirect("/Login")

  await db.update(usersTable).set({name: name, email: email}).where(eq(usersTable.number, number))
  return "done"
})


const Profile = () => {
  const data = profileQuery()
  const submission = useSubmission(handleSubmit)
  const qc = useQueryClient()
  const navigate = useTransitiveNavigate()

  onMount(() => {
    if (data.data === null) navigate("/Login")
  })

  createEffect(() => {
    console.log(data.data)
    if (data.data === null) navigate("/Login")

    if (submission.error) {
      callModal.fail()
    } else if (submission.result) {
      callModal.success()
      qc.invalidateQueries({queryKey: ["profile"]})
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
                    <Input  placeholder="نام خود را وارد کنید" class="text-right" name="name" value={data.data?.name || ""}/>
                  </Suspense>
                </div>
              </div>

              <div class="space-y-2">
                <Label for="fax" class="block text-right">
                  ایمیل
                </Label>
                <div class="flex items-center">
                  <Suspense fallback={<Fallback/>}>
                    <Input  placeholder="ایمیل خود را وارد کنید" class="text-right" name="email" value={data.data?.email || ""}/>
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
