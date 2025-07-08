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

          setResponse(prev => prev + chunk);
        }
      }

    }

    if (buffer.startsWith("0:")) {
      let chunk = buffer.slice(2).trim();
      if (chunk.startsWith('"') && chunk.endsWith('"')) {
        chunk = chunk.slice(1, -1);
      }
      try {
        chunk = JSON.parse(`"${chunk}"`);
      } catch {}

      setResponse(prev => prev + chunk);
    }

    const final = response();
    setMessages(prev => [...prev, { role: "assistant", content: final }]);
    setResponse("");
    setPending(false);
  };

  return { response, send, messages, pending };
};

