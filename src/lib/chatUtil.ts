import { createSignal } from "solid-js";

export type message = {
  role: "user" | "assistant" | "system",
  content: string
};

export const useChat = (valueSetter: (chunk: string) => void) => {
  const [messages, setMessages] = createSignal<message[]>([]);
  const [pending, setPending] = createSignal(false);
  const [streaming, setStreaming] = createSignal(false);
  let response = ""

  const send = async (message: string) => {
    setPending(true);
    const updated = [...messages(), { role: "user", content: message } as message];
    setMessages(updated);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updated }),
    });

    setPending(false);
    setStreaming(true)

    const reader = res.body?.getReader();
    if (!reader) { return }

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

          response += chunk
          valueSetter(chunk)
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

      response += chunk
      valueSetter(chunk)
    }

    setMessages(prev => [...prev, { role: "assistant", content: response }]);
    response = ""
    setStreaming(false)
  };

  return { send, messages, pending, streaming };
};
