import { ParentProps, Show } from "solid-js";

interface props {
  isUser?: boolean
  ref?: HTMLDivElement
  timestamp?: string
}
const Message = ({isUser = false, children, timestamp, ref}:ParentProps<props>) => {
  return (
    <div
      class={`flex ${isUser ? "justify-start" : "justify-end"}`}
    >
      <div
        class={`max-w-md px-4 py-3 rounded-lg ${isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm"
          }`}
      >
        <p class="text-sm leading-relaxed" ref={ref}>{children}</p>

        <Show when={timestamp}>
          <p class="text-xs opacity-70 mt-2 -mb-1">
            {timestamp}
          </p>
        </Show>
      </div>
    </div>
  );
};

export default Message;
