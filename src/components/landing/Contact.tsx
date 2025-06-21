import { action, useSubmission } from "@solidjs/router"
import MyButton from "../parts/MyButton"
import { createEffect } from "solid-js"
import { callModal } from "../layout/Modal"

const contactAction = action(async (formData:FormData) => {
  "use server"
  let name = formData.get("name")
  let email = formData.get("email")
  let msg = formData.get("message")
  let sub = formData.get("subject")

  if (!name || !email || !msg) return {ok: false, msg: "نام، ایمیل و پیام نمیتوانند خالی باشند"}

  console.log(name, email, msg, sub)
  return {ok: true}
})

export const Contact = () => {
  const submission = useSubmission(contactAction)

  createEffect(()=> {
    if (submission.result)
      if (submission.result.ok)
        callModal.success()
      else
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
          <div class="max-w-2xl mx-auto">
            <form class="space-y-6" method="post" action={contactAction}>
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
                <label for="subject" class="block text-sm font-medium mb-1">
                  موضوع
                </label>
                <input
                  type="text"
                  name="subject"
                  class="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="موضوع"
                />
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
