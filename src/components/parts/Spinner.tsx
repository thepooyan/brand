import { cn } from "~/lib/utils";

interface props {
  reverse?: boolean
  class?: string
}
const Spinner = (props:props) => {
  return (
    <div class="flex items-center justify-center  ">
      <div class={cn(
        "animate-spin rounded-full h-4 w-4 border-4 !border-t-transparent border-foreground",
        props.reverse && "border-background",
        props.class
      )}></div>
    </div>
  );
};

export default Spinner;

