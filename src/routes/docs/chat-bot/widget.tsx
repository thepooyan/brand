const create = () => {

  return (
    <>
      <h1>راهنمای استفاده از API چت‌بات</h1>

      <section>
        <h2>۱. احراز هویت</h2>
        <p>
          برای ارسال درخواست به چت‌بات، باید توکن چت‌بات را در هدر Authorization قرار دهید.
          این توکن مشخص می‌کند درخواست به کدام چت‌بات ارسال شود.
        </p>
      </section>

      <section>
        <h2>۲. اندپوینت</h2>
        <p>
          تمام پیام‌ها باید به اندپوینت زیر ارسال شوند:
        </p>
        <p>
          <strong>POST</strong> <code>/chat</code>
        </p>
      </section>

      <section>
        <h2>۳. فرمت درخواست (استاندارد OpenAI)</h2>
        <p>
          ساختار درخواست دقیقاً مشابه Chat Completions در OpenAI است و از آرایه messages استفاده می‌کند.
        </p>

        <pre>
          <code>{`POST /chat
Content-Type: application/json
Authorization: YOUR_CHATBOT_TOKEN

{
  "model": "gpt-4.1",
  "messages": [
    {
      "role": "system",
      "content": "تو یک دستیار پشتیبانی هستی"
    },
    {
      "role": "user",
      "content": "سلام، خدمات شما چیه؟"
    }
  ]
}`}</code>
        </pre>
      </section>

      <section>
        <h2>۴. فرمت پاسخ</h2>
        <p>
          پاسخ API نیز مشابه پاسخ OpenAI بوده و پیام نهایی در choices برگردانده می‌شود.
        </p>

        <pre>
          <code>{`{
  "id": "chatcmpl-9f8a2",
  "object": "chat.completion",
  "created": 1735650000,
  "model": "gpt-4.1",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "سلام! ما خدمات پشتیبانی و مشاوره آنلاین ارائه می‌دهیم."
      },
      "finish_reason": "stop"
    }
  ]
}`}</code>
        </pre>
      </section>

      <section>
        <h2>۵. توضیح عملکرد</h2>
        <p>
          سرور با استفاده از توکن ارسال‌شده در هدر، چت‌بات مربوطه را شناسایی می‌کند.
          سپس پیام‌ها را پردازش کرده و پاسخ چت‌بات را با فرمت استاندارد OpenAI برمی‌گرداند.
          این موضوع باعث می‌شود بتوانید بدون تغییر منطق، از SDKها و کلاینت‌های OpenAI استفاده کنید.
        </p>
      </section>
    </>
  );
}

export default create
