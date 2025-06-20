import { action } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { createResource } from "solid-js"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import Input from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { db } from "~/db/db"
import { usersTable } from "~/db/schema"
import { pageMarker } from "~/lib/routeChangeTransition"
import { getAuthSession } from "~/lib/session"

const handleSubmit = action(async (formData:FormData) => {
  "use server"
  let name = formData.get("name")?.toString() || ""
  let email = formData.get("email")?.toString() || ""

  let number = (await getAuthSession()).number

  await db.update(usersTable).set({name: name, email: email}).where(eq(usersTable.number, number))
})

const getData = async () => {
  "use server"
  let num = (await getAuthSession()).number
  return (await db.select().from(usersTable).where(eq(usersTable.number, num))).at(0)
}

const Profile = () => {
  const [data] = createResource(getData)

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
                  <Input  placeholder="نام خود را وارد کنید" class="text-right" name="name" value={data()?.name || ""}/>
                </div>
              </div>

              <div class="space-y-2">
                <Label for="fax" class="block text-right">
                  ایمیل
                </Label>
                <div class="flex items-center">
                  <Input  placeholder="نام خانوادگی خود را وارد کنید" class="text-right" name="email" value={data()?.email || ""}/>
                </div>
              </div>

            </CardContent>
            <CardFooter>
              <Button type="submit" class="w-full">
                ثبت اطلاعات
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Profile
