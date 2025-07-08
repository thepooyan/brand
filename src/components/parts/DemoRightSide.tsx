import { A } from '@solidjs/router'
import { ArrowLeft, MessageSquare, Zap, Users, Clock } from 'lucide-solid'
import { Button } from '../ui/button'

export default function RightSide() {
  return (
    <div class="w-96 bg-background p-8 flex flex-col">
      <A
        href="/ai-chatbot"
        class="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft class="ml-2 h-4 w-4" />
        بازگشت به صفحه چت‌بات
      </A>

      <div class="flex-1">
        <div class="text-center mb-8">
          <div class="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare class="h-8 w-8 text-primary" />
          </div>
          <h1 class="text-2xl font-bold mb-3">تست چت‌بات هوشمند</h1>
          <p class="text-muted-foreground text-sm leading-relaxed">
            با چت‌بات نمونه ما صحبت کنید و سرعت، دقت و کیفیت پاسخ‌ها را تجربه کنید
          </p>
        </div>

        <div class="space-y-4 mb-8">
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Zap class="h-4 w-4 text-primary" />
            </div>
            <div>
              <p class="font-medium text-sm">پاسخ سریع</p>
              <p class="text-xs text-muted-foreground">کمتر از ۲ ثانیه</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Users class="h-4 w-4 text-primary" />
            </div>
            <div>
              <p class="font-medium text-sm">پشتیبانی چندزبانه</p>
              <p class="text-xs text-muted-foreground">فارسی و انگلیسی</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Clock class="h-4 w-4 text-primary" />
            </div>
            <div>
              <p class="font-medium text-sm">دسترسی ۲۴/۷</p>
              <p class="text-xs text-muted-foreground">بدون وقفه</p>
            </div>
          </div>
        </div>

        <div class="bg-card p-6 rounded-lg border mb-6">
          <h3 class="font-bold mb-4">قیمت‌گذاری</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm">چت‌بات پایه</span>
              <span class="font-medium">از ۵ میلیون تومان</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm">چت‌بات پیشرفته</span>
              <span class="font-medium">از ۱۰ میلیون تومان</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm">چت‌بات سازمانی</span>
              <span class="font-medium">قیمت‌گذاری سفارشی</span>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <Button class="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
          درخواست مشاوره رایگان
        </Button>
        <Button
          variant="outline"
          class="w-full border-primary text-primary hover:bg-primary/10 bg-transparent py-3"
        >
          مشاهده قیمت‌های کامل
        </Button>
        <A href="/order">
          <Button variant="ghost" class="w-full text-muted-foreground hover:text-primary py-3">
            سفارش پروژه
          </Button>
        </A>
      </div>

      <div class="mt-6 pt-6 border-t text-center">
        <p class="text-xs text-muted-foreground mb-2">برای مشاوره تخصصی تماس بگیرید</p>
        <p class="text-sm font-medium">۰۲۱-۱۲۳۴۵۶۷</p>
      </div>
    </div>
  )
}

