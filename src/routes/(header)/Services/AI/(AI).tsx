import { pageMarker } from "~/lib/routeChangeTransition";
import { ArrowLeft } from "lucide-solid";
import TA from "~/components/parts/TA";
import { Button } from "~/components/ui/button";
import { benefits, services } from "~/data/abstract";
import { callModal } from "~/components/layout/Modal";
import ContactInfo from "~/components/parts/ContactInfo";

const AI = () => {
  return (
    <main {...pageMarker()}>
        <div class="container mx-auto px-4 py-8">
          {/* Back Button */}
          <TA
            href="/"
            class="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft class="ml-2 h-4 w-4" />
            بازگشت به صفحه اصلی
          </TA>

          {/* Hero Section */}
          <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">
              خدمات <span class="text-primary">هوش مصنوعی</span>
            </h1>
            <p class="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              مجموعه کاملی از راه‌حل‌های هوش مصنوعی برای خودکارسازی، بهینه‌سازی
              و هوشمندسازی کسب‌وکار شما
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
              onclick={() => callModal(() => <ContactInfo/>)}
            >
                مشاوره رایگان
              </Button>
            </div>
          </div>

          {/* Services Grid */}
          <div class="mb-16">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold mb-4">خدمات ما</h2>
              <p class="text-muted-foreground max-w-2xl mx-auto">
                از چت‌بات‌های ساده تا سیستم‌های پیچیده هوش مصنوعی، همه چیز را
                برای شما طراحی می‌کنیم
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  class={`bg-card p-6 rounded-lg border hover:shadow-lg transition-all relative ${service.popular ? "ring-2 ring-primary" : ""
                    }`}
                >
                  {service.popular && (
                    <div class="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      محبوب‌ترین
                    </div>
                  )}

                  <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <service.icon class="h-6 w-6 text-primary" />
                  </div>

                  <h3 class="text-xl font-bold mb-2">{service.title}</h3>
                  <p class="text-sm text-primary/80 mb-3">{service.subtitle}</p>
                  <p class="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <ul class="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li class="flex items-center text-sm">
                        <div class="h-1.5 w-1.5 bg-primary rounded-full ml-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div class="flex items-center justify-between mb-4">
                    <span class="text-lg font-bold text-primary">
                      {service.price}
                    </span>
                  </div>

                  <div class="space-y-2">
                    {service.demoLink ? (
                      <TA href={service.demoLink}>
                        <Button class="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          تست رایگان
                        </Button>
                      </TA>
                    ) : (
                      <Button class="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        درخواست مشاوره
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      class="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                    >
                      اطلاعات بیشتر
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div class="mb-16">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold mb-4">
                چرا هوش مصنوعی پویان؟
              </h2>
              <p class="text-muted-foreground max-w-2xl mx-auto">
                مزایای استفاده از راه‌حل‌های هوش مصنوعی ما برای کسب‌وکار شما
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <div class="bg-card p-6 rounded-lg border text-center">
                  <div class="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon class="h-6 w-6 text-primary" />
                  </div>
                  <h3 class="font-bold mb-2">{benefit.title}</h3>
                  <p class="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div class="mb-16">
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold mb-4">فرآیند همکاری</h2>
              <p class="text-muted-foreground max-w-2xl mx-auto">
                مراحل ساده و شفاف برای شروع پروژه هوش مصنوعی شما
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "۱",
                  title: "مشاوره",
                  description: "بررسی نیازها و ارائه راهکار",
                },
                {
                  step: "۲",
                  title: "طراحی",
                  description: "طراحی سیستم مطابق نیاز شما",
                },
                {
                  step: "۳",
                  title: "توسعه",
                  description: "پیاده‌سازی و تست سیستم",
                },
                {
                  step: "۴",
                  title: "راه‌اندازی",
                  description: "نصب، آموزش و پشتیبانی",
                },
              ].map((item) => (
                <div class="text-center">
                  <div class="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-2xl font-bold text-primary">
                      {item.step}
                    </span>
                  </div>
                  <h3 class="font-bold mb-2">{item.title}</h3>
                  <p class="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div class="bg-card p-8 rounded-lg border text-center">
            <h2 class="text-2xl md:text-3xl font-bold mb-4">
              آماده شروع هستید؟
            </h2>
            <p class="text-muted-foreground mb-6 max-w-2xl mx-auto">
              همین الان با ما تماس بگیرید تا راه‌حل هوش مصنوعی مناسب برای
              کسب‌وکار شما طراحی کنیم
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button class="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                مشاوره رایگان
              </Button>
              <TA href="/order">
                <Button
                  variant="outline"
                  class="border-primary text-primary hover:bg-primary/10 px-8 py-3 bg-transparent"
                >
                  سفارش پروژه
                </Button>
              </TA>
            </div>
          </div>
        </div>
    </main>
  );
};

export default AI;
