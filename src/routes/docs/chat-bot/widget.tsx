import { A } from "@solidjs/router";
import Code from "~/components/ui/code";

const create = () => {
  let url = "https://hooshbaan.com/zaza"
  let package_name = "hooshbaan-zaza"

  return (
    <>
      <h1>آموزش استفاده از ویجت وبسایت</h1>
      <p>
        در صورتی که مایل هستید چت‌بات خود را به صورت ویجت در وبسایت خود نمایش دهید، مراحل زیر را طی کنید:
      </p>
      <ol>
        <li>
          قبل از هرچیز باید یک دستیار هوشمند (چت‌بات) خود را ساخته باشید. 
          <A href="/Docs/chat-bot/create">آموزش ساخت چت‌بات</A>
        </li>
        <li>
          سپس در 
          <A href="/Panel/Chatbot">پنل کاربری </A>
          خود گزینه 
          <strong>دریافت توکن </strong>
          را انتخاب کنید. توکن دریافت شده را نگه دارید.
        </li>
        <li>
          سپس با مراجه به <strong>npm</strong> پکیج <strong>{package_name}</strong> را نصب کنید.
          <Code code={`npm install ${package_name}`}/>
          <p>یا دانلود مستقیم:</p>
          <Code code={url}/>
        </li>
        <li>
          سپس به صورت زیر پکیج را ایمپرت کرده و استفاده کنید:
          <Code code={`import {init_chatbot} from "${package_name}"

init_chatbot({token: "paster your token..."})
`}/>
        </li>
        <li>
          یا در صورتی که از لینک مستقیم استفاده میکنید:
          <Code code={`<script src="${url}"></script>

<script>
  init_chatbot({token: "paster your token..."})
</script>`}/>
        </li>
        <li>
          حال ویجت هوشبان، با اتصال به ربات خودتان باید نمایش داده شود.
        </li>
        <li>
          با تغییر دادن تنظیمات ربات خود در 
          <A href="/Panel/Chatbot">پنل کاربری </A>
          ویجت به صورت خودکار بعد از هر رفرش آپدیت میشود.
        </li>
      </ol>
      <p>
        در صورتی که با مشکل مواجه شدید میتوانید با <A href="/ContactUs">پشتیبانی</A> تماس بگیرید.
      </p>
    </>
  );
}

export default create
