const create = () => {

  return (
    <>
      <h1>راهنمای استفاده از API چت‌بات</h1>
      <ol>
        <li>
          قبل از هرچیز باید چت‌بات خود را ساخته باشید. 
          <a href="/Docs/chat-bot/create">آموزش ساخت چت‌بات</a>
        </li>
        <li>
          سپس از طریق <a href="/Panel/Chatbot">پنل کاربری</a> اقدام به دریافت توکن چت‌بات خود کنید.

          <span class="text-muted-foreground block">
            (هر ربات یک توکن مخصوص به خود دارد که میتواند از آن برای ارسال پیام به ربات استفاده کنید)
          </span>
        </li>
        <li>
          حال با استفاده از توکن، میتوانید به آدرس زیر ریکوئست ارسال کنید و با ربات خود صحبت کنید:
          <pre class="text-left">
            https://hooshbaan.com/api/chat
          </pre>
          <ul>
            <li>متد ریکوئیت باید <code>POST</code> باشد</li>
            <li>
              توکن باید به صورت Authorization Header ارسال شود:
              <pre class="text-left">
                Request Header: <br/>
                Authorization: Bearer [paste-your-token]
              </pre>
            </li>
            <li>
              دیتا ارسالی (Request Body) باید به صورت زیر باشد:
              <pre class="text-left">
                Request Body: <br/>
                
                  messages: [ <br/>
                    
                      role: "user", // can be "assistant" or "user" <br/>
                      content: "پیام خود را اینجا ارسال کنید!" <br/>
                    
                  ]
              </pre>
              توجه کنید که باید تمام پیام های قبلی را نیز با هر پیام جدید مجددا ارسال کنید، <br/>
              در غیر این صورت ربات به یاد نخواهد آورد.
              همه پیام ها را به صورت یک آرایه به ترتیب در messages قرار دهید.
            </li>
          </ul>
        </li>
      </ol>
      <p>
        در صورتی که با مشکل مواجه شدید میتوانید با <a href="/ContactUs">پشتیبانی</a> تماس بگیرید.
      </p>
    </>
  );
}

export default create
