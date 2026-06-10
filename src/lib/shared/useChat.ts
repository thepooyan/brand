import { createSignal } from "solid-js";
import { type Api } from "./api";


export type message = {
  role: "user" | "assistant" | "system",
  content: string
};

type onType = (chunk: string) => any | undefined

export const getUseChat = (endpoint: string, api: Api, source: "widget" | "website") => {

  return (getAnchor: () => HTMLElement, onType?: onType) => {
    const {pushToBuffer, onCleanup, getIsTyping} = buffer()
    const [messages, setMessages] = createSignal<message[]>([]);
    const [pending, setPending] = createSignal(false);
    const [errorMsg, setErrorMsg] = createSignal<string | null>(null);
    const [streaming, setStreaming] = createSignal(false);

    let response = ""

    const returnError = (err: string) => {
      setErrorMsg(err)
      return
    }

    const send = async (message: string) => {
      if (pending() || streaming()) return
      setErrorMsg(null)
      setPending(true);
      const updated = [...messages(), { role: "user", content: message } as message];
      setMessages(updated);

      const res = await api.stream(endpoint, {messages: updated, from: source }).catch(e => e)

      setPending(false);

      if (res.status !== 200) {
        let data = await res.response.json().catch(() => null)
        if (typeof data?.errorMessage === "string")
          return returnError(data.errorMessage)
        if (res.status === 402) return returnError("متاسفانه اعتبار شما به پایان رسیده است.")
        if (res.status === 403) return returnError("توکن ارسال شده معتبر نمیباشد")
        if (res.status === 404) return returnError("متاسفانه ربات مورد نظر پیدا نشد!")
        return returnError("متاسفانه مشکلی در ارتباط با سرور وجود دارد. لطفا با پشتیبانی تماس بگیرید.")
      }
      
      setStreaming(true)

      const reader = res.response.body?.getReader();
      if (!reader) { return }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break
        }

        buffer += decoder.decode(value, { stream: true });
        response += buffer;
        pushToBuffer(buffer, getAnchor(), onType)
      } 

      if (getIsTyping()) {
        onCleanup(() => {
          setMessages(prev => [...prev, { role: "assistant", content: response }]);
          setStreaming(false)
          response = ""
        })
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: response }]);
        setStreaming(false)
        response = ""
      }
    };

    return { send, messages, pending, streaming, errorMsg };
  };
}

const buffer = () => {
  let isTyping = false;
  const queue: string[] = [];
  let cleanupCallback: (() => void) | null = null;

  const getIsTyping = () => isTyping || queue.length > 0

  const processQueue = (element: HTMLElement, onType?: onType) => {
    if (queue.length === 0) {
      if (cleanupCallback) cleanupCallback();
      return;
    }
    
    if (isTyping) return;

    const str = queue.shift();
    if (!str) return;

    let index = 0;
    isTyping = true;

    const type = () => {
      if (index < str.length) {
        element.textContent += str[index];
        onType && onType(str[index])
        index++;
        setTimeout(type, 10);
      } else {
        isTyping = false;
        processQueue(element, onType); // Process next item in queue
      }
    };

    type();
  };

  const pushToBuffer = (str: string, el: HTMLElement, onType?: onType) => {
    if (typeof str !== 'string' || str.length === 0) return;
    
    queue.push(str);
    processQueue(el, onType);
  };

  const onCleanup = (callback: () => void) => {
    cleanupCallback = callback;
  };

  return { pushToBuffer, onCleanup, getIsTyping };
};
