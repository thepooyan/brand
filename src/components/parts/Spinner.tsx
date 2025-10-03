import clsx from "clsx";

interface props {
  reverse?: boolean
  class?: string
}
const Spinner = (props:props) => {
  return (
    <div class="flex items-center justify-center  ">
      <div class={clsx(
        "animate-spin rounded-full h-4 w-4 border-4 border-t-transparent border-black",
        props.reverse && "border-white",
        props.class
      )}></div>
    </div>
  );
};

export default Spinner;

