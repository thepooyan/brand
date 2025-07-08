import { createSignal, onMount } from "solid-js";

export default function Chat() {
  const [get, set] = createSignal("");

  onMount(async () => {
    const msg = [
        { role: "user", content: "Hi" },
        { role: "assistant", content: "Hello!" },
    ];

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: msg }),
    });

    // console.log(await res.json())
    const reader = res.body?.getReader();
    if (!reader) return;
    const decoder = new TextDecoder();
    let text = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
      console.log(text)
    }
  });

  return <div>{get()}</div>;
}
