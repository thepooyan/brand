import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { createSignal } from "solid-js"
import { FiArrowLeft, FiLock, FiPhone } from "solid-icons/fi"
import Input from "../ui/input"

export default function LoginPage() {
  const [step, setStep] = createSignal<"phone" | "otp">("otp")
  const [phoneNumber, setPhoneNumber] = createSignal("")
  const otpLength = 6;
  const otpElements:HTMLInputElement[] = [];

  const handlePhoneSubmit = (e: any) => {
    e.preventDefault()
    if (phoneNumber().length >= 10) {
      setStep("otp")
    }
  }

  const handleOtpSubmit = (e: any) => {
    e.preventDefault()
  }
  const handleKeydown = (index:number, e:KeyboardEvent) => {
    if (e.key === "Backspace") {
      let prev = otpElements[index-1]
      if (prev) prev.focus()
    }
  }

  const handleFocues = (index: number) => {
    otpElements[index].value = ""
  }

  const handleInput = (index: number) => {
    if (index+1 <= otpLength) otpElements[index+1].focus()
  }

  return (
    <div class="min-h-screen flex items-center justify-center bg-background dotted-background p-4">
      <Card class="w-full max-w-md border-border bg-card text-card-foreground">
        <CardHeader class="text-center">
          <CardTitle class="text-2xl font-bold text-primary">ورود به حساب کاربری</CardTitle>
          <CardDescription class="text-muted-foreground">
            {step() === "phone" ? "لطفا شماره تلفن همراه خود را وارد کنید" : "کد تایید ارسال شده را وارد کنید"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step() === "phone" ? (
            <form onSubmit={handlePhoneSubmit} class="space-y-4">
              <div class="space-y-2">
                <Label for="phone" class="text-right block text-foreground">
                  شماره تلفن همراه
                </Label>
                <div class="relative">
                  <FiPhone class="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    value={phoneNumber()}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    class="pl-3 pr-10 bg-input border-border ltr placeholder:text-muted-foreground"
                    dir="rtl"
                  />
                </div>
              </div>
              <Button type="submit" class="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                دریافت کد تایید
                <FiArrowLeft class="mr-2 h-4 w-4" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} class="space-y-4">
              <div class="space-y-2">
                <Label for="otp" class="text-right block text-foreground">
                  کد تایید
                </Label>
                <div class="flex justify-center gap-2 ltr ">
                  {[1,2,3,4,5,6].map((index) => (
                    <Input
                      ref={otpElements[index]}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      oninput={() => handleInput(index)}
                      onKeyDown={e => handleKeydown(index, e)}
                      onfocus={() => handleFocues(index)}
                      class="w-10 h-12 text-center bg-input border-border text-lg ltr"
                    />
                  ))}
                </div>
                <p class="text-sm text-muted-foreground text-center mt-2">
                  کد تایید به شماره {phoneNumber()} ارسال شد
                </p>
              </div>
              <Button type="submit" class="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                تایید و ورود
                <FiLock class="mr-2 h-4 w-4" />
              </Button>
              <Button type="button" variant="link" class="w-full text-primary" onClick={() => setStep("phone")}>
                تغییر شماره تلفن
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

