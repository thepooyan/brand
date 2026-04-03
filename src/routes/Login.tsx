import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { createSignal } from "solid-js"
import { FiArrowLeft, FiLock, FiPhone } from "solid-icons/fi"
import Input from "~/components/ui/input"
import { Timer, toEnNumbers } from "~/lib/utils"
import { useViewTransition } from "~/lib/viewTransition"
import TA from "~/components/parts/TA"
import { pageMarker, useTransitiveNavigate } from "~/lib/routeChangeTransition"
import { callModal } from "~/components/layout/Modal"
import { forceEnter, sendOTP, verifyOTP } from "~/server/actions"
import { Link } from "@solidjs/meta"
import { InputChangeEvent } from "~/db/types"
import { useBounceBack } from "~/lib/hooks/useBounce"
import { isProd } from "~/server/env/shared-env"
import { useTransaction } from "~/lib/actionAbstraction"

export default function Login() {
  const [rawPhoneNumber, setPhoneNumber] = createSignal("")
  const phoneNumber = () => toEnNumbers(rawPhoneNumber())
  const otpLength = 6;
  const otpElements:HTMLInputElement[] = Array(otpLength).fill("");
  const [isPhoneWaiting, setIsPhoneWaiting] = createSignal(false)
  const [isOtpWaiting, setIsOtpWaiting] = createSignal(false)
  const [isResendWaiting, setIsResendWaiting] = createSignal(false)
  const [tempOtp, setTempOtp] = createSignal("")
  const timer = new Timer(30)
  const timerSignal = timer.getAccessor()

  const navigate = useTransitiveNavigate()
  const {backAvailable, returnBack} = useBounceBack()
  const {callTransaction} = useTransaction()

  const forceEnterHandler = async () => {
    if (phoneNumber().length !== 11) return
    await callTransaction(
      forceEnter(phoneNumber()),
      {navigate: "/", revalidate: "isLoggedIn"}
    )
  }

  const handlePhoneSubmit = async (e: any) => {
    e.preventDefault()
    if (phoneNumber().length !== 11) return

    setIsPhoneWaiting(true)
    let res = await sendOTP(phoneNumber())
    if (res.ok) {
      setStep("otp"); 
      setTempOtp(res.data)
      timer.restart()
    } else {
      callModal.fail(res.msg)
    }
    setIsPhoneWaiting(false)
  }

  const getOtpValue = () => {
    return otpElements.map(o => toEnNumbers(o.value))
  }

  const handleOtpSubmit = (e: any) => {
    e.preventDefault()
    sendOtpBack()
  }

  const sendOtpBack = async () => {
    setIsOtpWaiting(true)
    let res = await verifyOTP(phoneNumber(), getOtpValue().join(""))
    if (res.ok) {
      if (backAvailable) {
        return returnBack()
      }
      navigate("/");
      callModal.success("خوش آمدید!")
    } else {
      callModal.fail(res.msg)
    }
    setIsOtpWaiting(false)
  }

  const handleKeydown = (index:number, e:KeyboardEvent) => {
    if (e.key === "Backspace") {
      let prev = otpElements[index-1]
      if (prev) prev.focus()
    }
  }

  const sendAgain = async () => {
    setIsResendWaiting(true)
    let res = await sendOTP(phoneNumber())
    if (!res.ok) {
      callModal.fail(res.msg)
    }
    setIsResendWaiting(false)
    timer.restart()
  }

  const handleFocues = (index: number) => {
    otpElements[index].value = ""
  }

  const handleInput = (index: number) => {
    if (otpElements[index+1]) otpElements[index+1].focus()
    else sendOtpBack()
  }

  const [step, setStep, markElement] = useViewTransition<"phone" | "otp">("step", "phone")

  return (
    <div class="min-h-screen flex items-center justify-center p-4 flex-col gap-2 bg-black bg-[url('/wave.webp')] bg-repeat-x bg-position-[0_-5rem]" {...pageMarker()}>
      <Link rel="canonical" href="https://hooshbaan.com/Login"/>
      <Card class="w-full max-w-md border-border bg-card text-card-foreground" {...markElement("card")}>
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
                    name="phoneNumber"
                    type="tel"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    value={phoneNumber()}
                    onChange={(e:InputChangeEvent) => setPhoneNumber(e.currentTarget.value)}
                    class="pl-3 pr-10 bg-input border-border ltr placeholder:text-muted-foreground"
                    dir="rtl"
                  />
                </div>
              </div>
              <Button type="submit" class="w-full bg-primary hover:bg-primary/90 text-primary-foreground" loading={isPhoneWaiting}
                {...markElement("btn")}
              >
                  دریافت کد تایید
                  <FiArrowLeft class="mr-2 h-4 w-4" />
              </Button>
              {!isProd && <Button class="w-full" onclick={forceEnterHandler}>force enter</Button>}
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} class="space-y-4">
              <div class="space-y-2">
                <Label for="otp" class="text-right block text-foreground">
                  کد تایید
                </Label>
                <div class="flex justify-center gap-4 ltr ">
                  {otpElements.map((_,index) => (
                    <Input
                      ref={otpElements[index]}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      oninput={() => handleInput(index)}
                      onKeyDown={ (e:KeyboardEvent) => handleKeydown(index, e)}
                      onfocus={() => handleFocues(index)}
                      class="w-full h-12 text-center bg-input border-border text-lg ltr"
                    />
                  ))}
                </div>
                <p class="text-sm text-muted-foreground text-center mt-2">
                  کد تایید به شماره {phoneNumber()} ارسال شد ({tempOtp()})
                </p>
                <p class="text-sm text-muted-foreground text-center mt-2">
                    {timerSignal() === 0 ? <>
                      کد را دریافت نکرده اید؟
                      <Button variant="link" class="inline p-0 mr-1 h-auto" onclick={sendAgain} loading={isResendWaiting}>ارسال مجدد</Button>
                    </> : <>
                      کد را دریافت نکرده اید؟
                      ارسال مجدد در {timerSignal()} ثانیه
                    </>}
                </p>
              </div>
              <Button type="submit" class="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  {...markElement("btn")}
                  loading={isOtpWaiting}>
                تایید و ورود
                <FiLock class="mr-2 h-4 w-4" />
              </Button>
              <Button type="button" variant="link" class="w-full text-primary" onClick={() =>  setStep("phone")}>
                تغییر شماره تلفن
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
      <Button as={TA} variant="link" href="/" {...markElement("a")}>
        خانه
        <FiArrowLeft/>
      </Button>
    </div>
  )
}
