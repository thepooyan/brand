import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { createSignal } from "solid-js"
import { FiArrowLeft, FiLock, FiPhone } from "solid-icons/fi"
import Input from "../ui/input"
import { wait } from "~/lib/utils"
import clsx from "clsx"
import Spinner from "../parts/Spinner"
import MyButton from "../parts/MyButton"

export default function LoginPage() {
  const [step, setStep] = createSignal<"phone" | "otp">("phone")
  const [phoneNumber, setPhoneNumber] = createSignal("")
  const otpLength = 6;
  const otpElements:HTMLInputElement[] = Array(otpLength).fill("");
  const [isPhoneWaiting, setIsPhoneWaiting] = createSignal(false)
  const [isOtpWaiting, setIsOtpWaiting] = createSignal(false)

  const handlePhoneSubmit = async (e: any) => {
    e.preventDefault()
    if (phoneNumber().length < 10) return

    setIsPhoneWaiting(true)
    await wait(5000)
    setIsPhoneWaiting(false)
    setStep("otp")
  }

  const getOtpValue = () => {
    return otpElements.map(o => o.value)
  }

  const handleOtpSubmit = (e: any) => {
    e.preventDefault()
    sendOtpBack()
  }

  const sendOtpBack = async () => {
    setIsOtpWaiting(true)
    await wait(3000)
    console.log(getOtpValue())
    setIsOtpWaiting(false)
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
    if (otpElements[index+1]) otpElements[index+1].focus()
    else sendOtpBack()
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
              <MyButton type="submit" class="w-full bg-primary hover:bg-primary/90 text-primary-foreground" isWaiting={isPhoneWaiting}>
                  دریافت کد تایید
                  <FiArrowLeft class="mr-2 h-4 w-4" />
              </MyButton>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} class="space-y-4">
              <div class="space-y-2">
                <Label for="otp" class="text-right block text-foreground">
                  کد تایید
                </Label>
                <div class="flex justify-center gap-2 ltr ">
                  {otpElements.map((_,index) => (
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
              <MyButton type="submit" class="w-full bg-primary hover:bg-primary/90 text-primary-foreground" isWaiting={isOtpWaiting}>
                تایید و ورود
                <FiLock class="mr-2 h-4 w-4" />
              </MyButton>
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

