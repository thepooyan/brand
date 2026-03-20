import { action, useSubmission } from "@solidjs/router"
import MyButton from "../parts/MyButton"
import { createEffect } from "solid-js"
import { callModal } from "../layout/Modal"
import { db } from "~/db/db"
import { messagesTable } from "~/db/schema"
import { validateEmail, validateMobileNumber } from "~/lib/validation"
import { telegram } from "~/server/telegram"
import { dump } from "js-yaml"
import { Button } from "../ui/button"
import { ImTelegram, ImWhatsapp } from "solid-icons/im"
import { FiPhone } from "solid-icons/fi"
import { support } from "../../../config/config"
import { extractFormData } from "~/lib/hooks/useForm"

interface formShape {
  name: string
  email: string
  message: string
  subject: string
  number: string
}
const contactAction = action(async (formData:FormData) => {
  "use server"
  let {name, email, message, subject, number} = extractFormData<formShape>(formData)

  if (!name || !message) return {ok: false, msg: "نام و پیام نمیتوانند خالی باشند"}
  if (!number && !email) return {ok: false, msg: "لطفا ایمیل یا شماره تلفن خود را جهت پاسخ دهی وارد کنید"}

  if (number) {
    let {msg} = validateMobileNumber(number)
    if (msg) return {ok: false, msg: msg}
  }

  if (email)
    if (!validateEmail(email)) return {ok: false, msg: "ایمیل وارد شده صحیح نمیباشد"}

  const values = {
    name: name,
    email: email,
    message: message,
    subject: subject,
    number: number
  }
  try {
    await db.insert(messagesTable).values(values)
    await telegram.admin.send(`پیام \n\n${dump(values)}`)
  } catch(_) {
    return {ok: false, msg: "خطایی در ثبت اطلاعات رخ داد. لطفا مجددا تلاش کنید"}
  }
  return {ok: true}
})

export const Contact = () => {
  const submission = useSubmission(contactAction)
  let formRef!: HTMLFormElement

  createEffect(()=> {
    if (submission.result)
      if (submission.result.ok) {
        callModal.success()
        formRef.reset()
      } else
        callModal.fail(submission.result.msg)
  })

  return (
    <>
      <section id="contact" class="py-20 bg-card">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">تماس با ما</h2>
            <p class="text-muted-foreground max-w-2xl mx-auto">
              آماده تحول کسب و کار خود هستید؟ همین امروز با ما تماس بگیرید تا در مورد چگونگی کمک به شما برای رسیدن به
              اهدافتان صحبت کنیم.
            </p>
          </div>
          <div class="flex gap-2 justify-center mt-5 mb-15 ">
            <Button variant="secondary"
              as="a"
              href={`tel:${support.mobile}`}
            >
              تلفن
              <FiPhone/>
            </Button>
            <Button variant="secondary" 
              as="a"
              href={support.telegram}
            >
              تلگرام
              <ImTelegram class="text-blue-500"/>
            </Button>
            <Button variant="secondary" 
              as="a"
              href={`https://wa.me/${support.whatsapp}`}
            >
              واتساپ
              <ImWhatsapp class="text-green-500"/>
            </Button>
          </div>
          <div class="max-w-2xl mx-auto">
            <form class="space-y-6" method="post" action={contactAction} ref={formRef}>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium mb-1">
                    نام
                  </label>
                  <input
                    type="text"
                    name="name"
                    class="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="نام شما"
                  />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium mb-1">
                    موضوع
                  </label>
                  <input
                    type="text"
                    name="subject"
                    class="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="موضوع"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium mb-1">
                    شماره تماس
                  </label>
                  <input
                    type="text"
                    name="number"
                    class="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="شماره تماس شما"
                  />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium mb-1">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    name="email"
                    class="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="ایمیل شما"
                  />
                </div>
              </div>
              <div>
                <label for="message" class="block text-sm font-medium mb-1">
                  پیام
                </label>
                <textarea
                  name="message"
                  rows={4}
                  class="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="پیام شما"
                ></textarea>
              </div>
              <MyButton
                class="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
                isWaiting={submission.pending}
                type="submit"
              >ارسال پیام</MyButton>
            </form>
          </div>
        </div>
      </section>

    </>
  )
}
