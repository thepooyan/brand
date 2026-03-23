import { createSignal } from "solid-js";

export type message = {
  role: "user" | "assistant" | "system",
  content: string
};

export interface timedMessage extends message {
  timestamp: Date
}

export const chat_sources = [
  {en: "telegram", fa: "تلگرام"},
  {en: "widget", fa: "ویجت"},
  {en: "api", fa: "ای‌پی‌آی"},
  {en: "website", fa: "وبسایت"}
] as const


export type chat_sources = typeof chat_sources[number]

type onType = (chunk: string) => any | undefined
const getUseChat = (endpoint: string, args?: Record<string, any>) => {

  return (getAnchor: () => HTMLElement, onType?: onType) => {
    const {pushToBuffer, onCleanup, getIsTyping} = buffer()
    const [messages, setMessages] = createSignal<message[]>([]);
    const [pending, setPending] = createSignal(false);
    const [streaming, setStreaming] = createSignal(false);
    const [errorMsg, setErrorMsg] = createSignal<string | null>(null);
    let streamDone = true
    let response = ""

    const send = async (message: string) => {
      setPending(true);
      const updated = [...messages(), { role: "user", content: message } as message];
      setMessages(updated);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated, ...args }),
      });

      if (res.status !== 200) {
        let data = await res.json()
        if (typeof data.errorMessage === "string")
          return setErrorMsg(data.errorMessage)
        if (res.status === 404) return setErrorMsg("متاسفانه ربات مورد نظر پیدا نشد!")
        if (res.status === 402) return setErrorMsg("متاسفانه اعتبار شما به پایان رسیده است.")
        return setErrorMsg("مشکلی پیش آمده. لطفا مجددا تلاش کنید.")
      }

      setPending(false);
      setStreaming(true)
      streamDone = false

      const reader = res.body?.getReader();
      if (!reader) { return }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop()!;

        for (const line of lines) {
          if (line.startsWith("0:")) {
            let chunk = line.slice(2).trim();

            if (chunk.startsWith('"') && chunk.endsWith('"')) {
              chunk = chunk.slice(1, -1);
            }

            try {
              chunk = JSON.parse(`"${chunk}"`);
            } catch { }

            response += chunk
            pushToBuffer(chunk, getAnchor(), onType)
          }
          if (line.startsWith("3:")) { // Response is error?
            if (line.startsWith('3:"An error occurred."')) {
              setStreaming(false)
              setErrorMsg("خطایی پیش آمد. لطفا مجددا تلاش کنید.")
              return
            }
          }
        }
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

export const useChat = getUseChat("/api/chat/hooshbaan")

export const useUserChat = (botId: string) => getUseChat(`/api/chat/session/${botId}`)

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
        processQueue(element); // Process next item in queue
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
