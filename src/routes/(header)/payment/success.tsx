import { useNavigate, useSearchParams } from "@solidjs/router"
import { FiHome, FiUser } from "solid-icons/fi"
import TA from "~/components/parts/TA"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import CheckRounded from "~/components/ui/check-rounded"
import CopyableBox from "~/components/ui/copyable-box"

const success = () => {

  const [{reference}] = useSearchParams()
  const nv = useNavigate()
  
  if (typeof reference !== "string") return nv("/")

  return (
    <Card class="w-sm m-auto my-10">
      <CardHeader>
        <CardTitle class="flex gap-2">
          <CheckRounded/>
          پرداخت موفقیت آمیز بود!
        </CardTitle>
        <CardDescription>
          خرید شما با موفقیت انجام شد
        </CardDescription>
      </CardHeader>
      <CardContent class="flex gap-2 flex-col">
        شماره پیگیری:
        <CopyableBox toCopy={reference}/>
      </CardContent>
      <CardFooter class="flex justify-center gap-2">
        <Button size="sm"
          as={TA} href="/panel"
        >
          <FiUser/>
          پنل کاربری
        </Button>
        <Button size="sm" variant="secondary"
          as={TA} href="/"
        >
          <FiHome/>
          خانه
        </Button>
      </CardFooter>
    </Card>
  )
}

export default success
