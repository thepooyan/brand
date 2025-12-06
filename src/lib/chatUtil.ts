import { createSignal } from "solid-js";

export type message = {
  role: "user" | "assistant" | "system",
  content: string
};


const getUseChat = (endpoint: string, args?: Record<string, any>) => {

  return (getAnchor: () => HTMLElement) => {
    const {pushToBuffer, onCleanup} = buffer()
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

      setPending(false);
      if (res.status === 404) return setErrorMsg("متاسفانه ربات مورد نظر پیدا نشد!")
      if (res.status === 402) return setErrorMsg("متاسفانه اعتبار شما به پایان رسیده است.")
      setStreaming(true)
      streamDone = false

      const reader = res.body?.getReader();
      if (!reader) { return }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          streamDone = true
          console.log("stream done")
          break
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop()!;

        for (const line of lines) {
          if (line.startsWith("0:")) {
            let chunk = line.slice(2).trim();

            // remove wrapping quotes if present
            if (chunk.startsWith('"') && chunk.endsWith('"')) {
              chunk = chunk.slice(1, -1);
            }

            // decode escaped characters like \n, \"
            try {
              chunk = JSON.parse(`"${chunk}"`);
            } catch {
              // fallback: use raw if JSON decoding fails
            }

            response += chunk
            pushToBuffer(chunk, getAnchor())
          }
        }
      } 

      onCleanup(() => {
        if (!streamDone) return
        setMessages(prev => [...prev, { role: "assistant", content: response }]);
        setStreaming(false)
        response = ""
      })
    };

    return { send, messages, pending, streaming, errorMsg };
  };
}

export const useChat = getUseChat("/api/oldchat")

export const useUserChat = (userId: string, botId: string) => getUseChat("/api/UserChat", {userId, botId})

const buffer = () => {
  let isTyping = false;
  const queue: string[] = [];
  let cleanupCallback: (() => void) | null = null;

  const processQueue = (element: HTMLElement) => {
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
        index++;
        setTimeout(type, 10);
      } else {
        isTyping = false;
        processQueue(element); // Process next item in queue
      }
    };

    type();
  };

  const pushToBuffer = (str: string, el: HTMLElement) => {
    if (typeof str !== 'string' || str.length === 0) return;
    
    queue.push(str);
    processQueue(el);
  };

  const onCleanup = (callback: () => void) => {
    cleanupCallback = callback;
  };

  return { pushToBuffer, onCleanup };
};
