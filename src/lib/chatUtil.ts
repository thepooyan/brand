import { createSignal } from "solid-js";

export type message = {role: "user" | "assistant" | "system", content: string }
export const useChat = () => {
  const [response, setResponse] = createSignal("");
  const [messages, setMessages] = createSignal<message[]>([])
  const [pending, setPending] = createSignal(false)

  const send = async (message: string) => {
    setPending(true)
    setMessages(prev => [...prev, {role: "user", content: message}])

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages() }),
    });

    const reader = res.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    let { value, done } = await reader.read();

    while (!done) {
      const chunk = decoder.decode(value, { stream: true });
      setResponse(prev => prev + chunk);
      ({ value, done } = await reader.read());
    }

    setPending(false)
    const finalText = decoder.decode();
    setMessages(prev => [...prev, {role: "assistant", content: response() + finalText}])
    setResponse("");
  };

  return { response, send, messages, pending };
};
