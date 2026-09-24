import { FiHome, FiUser } from "solid-icons/fi"
import TA from "~/components/parts/TA"
import { Button } from "~/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import X from "~/components/ui/x"

const success = () => {

  return (
    <Card class="w-sm m-auto my-10">
      <CardHeader>
        <CardTitle class="flex gap-2">
          <X/>
          پرداخت با شکست مواجه شد!
        </CardTitle>
        <CardDescription>
          خرید شما انجام نشد. لطفا مجددا تلاش نمایید. در صورت تکرار، با پشتیبانی تماس بگیرید.
        </CardDescription>
      </CardHeader>
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
