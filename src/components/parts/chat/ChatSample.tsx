import { Button } from "~/components/ui/button";
import { name, nameEn } from "../../../../config/config";
import TA from "../TA";

const ChatSample = () => {
  const messages = [
    {
      text: `سلام! من دستیار هوشمند ${name} هستم. چطور می‌تونم کمکتون کنم؟`,
      isUser: false,
      timestamp: new Date(),
    },
    {
      text: "سلام! آیا چت بات تست رایگان داره؟",
      isUser: true,
      timestamp: new Date(),
    },
    {
      text: `بله! میتونید همین آلان باهاش صحبت کنید!`,
      isUser: false,
      timestamp: new Date(),
    },
  ];

  return (
    <div>
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">تست کنید</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          با چت‌بات نمونه ما صحبت کنید و سرعت و کیفیت پاسخ‌ها را تجربه کنید
        </p>
      </div>
      <div class="mb-16">
        <div class="max-w-2xl mx-auto">
          <div class="bg-card border rounded-lg overflow-hidden">
            {/* Chat Header */}
            <div class="bg-primary/10 p-4 border-b">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <img src="/mini-logo.webp" alt={`${nameEn}'s logo` }/>
                </div>
                <div>
                  <h3 class="font-medium">دستیار هوشمند {name}</h3>
                  <p class="text-sm text-muted-foreground">آنلاین</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div class=" overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  class={`flex ${message.isUser ? "justify-start" : "justify-end"}`}
                >
                  <div
                    class={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                      }`}
                  >
                    <p class="text-sm">{message.text}</p>
                    <p class="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString("fa-IR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              <div class="flex justify-end">
                <div class="bg-muted text-muted-foreground px-4 py-2 rounded-lg">
                  <div class="flex space-x-1 py-2">
                    <div class="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div
                      class="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ "animation-delay": "0.1s" }}
                    ></div>
                    <div
                      class="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ "animation-delay": "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full p-7">
              <Button class=" m-auto text-lg"  size="lg"
                as={TA} href="Demo"
              >همین حالا امتحان کنید!</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSample;
