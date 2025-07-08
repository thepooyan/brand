import { createSignal } from "solid-js";

export type message = {
  role: "user" | "assistant" | "system",
  content: string
};

export const useChat = () => {
  const [response, setResponse] = createSignal("");
  const [messages, setMessages] = createSignal<message[]>([]);
  const [pending, setPending] = createSignal(false);

  const send = async (message: string) => {
    setPending(true);
    setResponse("");
    const updated = [...messages(), { role: "user", content: message } as message];
    setMessages(updated);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updated }),
    });

    const reader = res.body?.getReader();
    if (!reader) {
      setPending(false);
      return;
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop()!;

      for (const line of lines) {
        if (line.startsWith("0:")) {
          const chunk = line.slice(2);
          setResponse(prev => prev + chunk);
        }
      }

      await new Promise(r => setTimeout(r, 0));
    }

    if (buffer.startsWith("0:")) {
      setResponse(prev => prev + buffer.slice(2));
    }

    const final = response();
    setMessages(prev => [...prev, { role: "assistant", content: final }]);
    setResponse("");
    setPending(false);
  };

  return { response, send, messages, pending };
};

