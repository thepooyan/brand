import { JSX, splitProps } from "solid-js";

type ScrollAreaProps = JSX.HTMLAttributes<HTMLDivElement> & {
  class?: string;
  children: JSX.Element;
  height?: string; // optional height, e.g. "300px" or "h-64"
};

export default function ScrollArea(props: ScrollAreaProps) {
  const [local, others] = splitProps(props, ["class", "children", "height"]);

  return (
    <div
      class={`overflow-auto rounded border border-gray-300 bg-white ${local.class ?? ""}`}
      style={{ height: local.height ?? "100%" }}
      {...others}
    >
      {local.children}
    </div>
  );
}

