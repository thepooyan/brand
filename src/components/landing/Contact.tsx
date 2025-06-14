import { Button } from "../ui/button"

export const Contact = () => {
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
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium mb-1">
                    نام
                  </label>
                  <input
                    type="text"
                    id="name"
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
                    id="email"
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
                  id="subject"
                  class="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="موضوع"
                />
              </div>
              <div>
                <label for="message" class="block text-sm font-medium mb-1">
                  پیام
                </label>
                <textarea
                  id="message"
                  rows={4}
                  class="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="پیام شما"
                ></textarea>
              </div>
              <Button class="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6">ارسال پیام</Button>
            </form>
          </div>
        </div>
      </section>

    </>
  )
}
