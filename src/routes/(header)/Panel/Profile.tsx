import { FiPhone } from "solid-icons/fi"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import Input from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { pageMarker } from "~/lib/routeChangeTransition"

const Profile = () => {
  return (
    <div {...pageMarker()} class="  rounded m-4 max-w-xl mx-auto">
      <div class="flex justify-center">
        <Card class="w-full">
          <CardHeader class="text-right">
            <CardTitle class="text-2xl font-bold">فرم اطلاعات شخصی</CardTitle>
            <CardDescription>در صورت تمایل اطلاعات شخصی خود را کامل کنید</CardDescription>
          </CardHeader>
          <form  >
            <CardContent class="space-y-6">

              <div class="space-y-2">
                <Label for="name" class="block text-right">
                    نام
                </Label>
                <div class="flex items-center">
                  <Input  placeholder="نام خود را وارد کنید" class="text-right" />
                </div>
              </div>

              <div class="space-y-2">
                <Label for="fax" class="block text-right">
                    نام خانوادگی
                </Label>
                <div class="flex items-center">
                  <Input  placeholder="نام خانوادگی خود را وارد کنید" class="text-right" />
                </div>
              </div>

              <div class="space-y-2">
                <Label for="phone" class="block text-right">
                  شماره تلفن
                </Label>
                <div class="flex items-center">
                  <Input  placeholder="شماره تلفن را وارد کنید" class="text-right" />
                  <FiPhone class="w-5 h-5 text-gray-400 -mr-8" />
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
