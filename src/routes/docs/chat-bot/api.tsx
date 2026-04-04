import { A } from "@solidjs/router";
import Code from "~/components/ui/code";

const create = () => {

  return (
    <>
      <h1>راهنمای استفاده از API چت‌بات</h1>
      <ol>
        <li>
          قبل از هرچیز باید چت‌بات خود را ساخته باشید. 
          <A href="/Docs/chat-bot/create">آموزش ساخت چت‌بات</A>
        </li>
        <li>
          سپس از طریق <A href="/Panel/Chatbot">پنل کاربری</A> اقدام به دریافت توکن چت‌بات خود کنید.

          <span class="text-muted-foreground block">
            (هر ربات یک توکن مخصوص به خود دارد که میتواند از آن برای ارسال پیام به ربات استفاده کنید)
          </span>
        </li>
        <li>
          حال با استفاده از توکن، میتوانید به آدرس زیر ریکوئست ارسال کنید و با ربات خود صحبت کنید:
          <Code code={`https://hooshbaan.com/api/chat`}/>
          <ul>
            <li>متد ریکوئیت باید <code>POST</code> باشد</li>
            <li>
              توکن باید به صورت Authorization Header ارسال شود:
              <Code code={`let headers = {
  Authorization: "Bearer [paste-your-token]"
}
`}/>
            </li>
            <li>
              دیتا ارسالی (Request Body) باید به صورت زیر باشد:
              <Code code={`let body = {
  messages: [
    {
      role: "user", // can be "assistant" or "user"
      content: "پیام خود را اینجا ارسال کنید!"
    }
  ]
}
`}/>
              توجه کنید که باید تمام پیام های قبلی را نیز با هر پیام جدید مجددا ارسال کنید، <br/>
              در غیر این صورت ربات به یاد نخواهد آورد.
              همه پیام ها را به صورت یک آرایه به ترتیب در messages قرار دهید.
            </li>
          </ul>
        </li>
      </ol>
      <p>
        در صورتی که با مشکل مواجه شدید میتوانید با <A href="/ContactUs">پشتیبانی</A> تماس بگیرید.
      </p>
    </>
  );
}

export default create
