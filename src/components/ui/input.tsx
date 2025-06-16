import clsx from "clsx";
import { JSX } from "solid-js";

const Input = ( props :JSX.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      class={clsx(
        "p-2 w-full border-1 border-zinc-300 rounded-md bg-transparent min-h-10 " +
        props.class,
      )}
    />
  );
};

export default Input;
