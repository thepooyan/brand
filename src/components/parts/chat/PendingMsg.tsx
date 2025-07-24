import { cn } from "~/lib/utils";

interface props {
  size?: "auto" | "sm";
}
const PendingMsg = ({ size = "auto" }: props) => {

  const Dot = ({delay}:{delay?: string}) => (
    <div
      class={cn( "w-2 h-2 bg-current rounded-full animate-bounce  ",
        size === "sm" && "w-1 h-1",
      )}
      style={`animation-delay:${delay}s`}
    ></div>
  );

  return (
    <div class="flex justify-end">
      <div class="bg-muted text-foreground px-4 py-4 rounded-lg rounded-bl-sm">
        <div class="flex space-x-1">
          <Dot/>
          <Dot delay=".1"/>
          <Dot delay=".2"/>
        </div>
      </div>
    </div>
  );
};

export default PendingMsg;
