import { createSignal, ParentProps } from "solid-js";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { AiFillCheckCircle } from "solid-icons/ai";
import clsx from "clsx";
import { copyToClipboard } from "~/lib/utils";

interface props extends ParentProps {
  toCopy: string;
}
const Copyable = ({ children, toCopy }: props) => {
  const [copied, setCopied] = createSignal(false);
  const [open, setOpen] = createSignal(false);

  const click = () => {
    copyToClipboard(toCopy).catch((e) => alert(e));
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  };
  const limitSize = (str: string) => {
    let limit = 20;
    if (str.length > limit) return str.substring(0, limit).concat("...");
    return str;
  };
  return (
    <Tooltip open={open()}>
      <TooltipTrigger onmouseover={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
        <div class="cursor-pointer inline select-none" onclick={click}>
          {children ? children : limitSize(toCopy)}
        </div>
      </TooltipTrigger>
      <TooltipContent class={clsx(copied() && " bg-success-foreground font-bold ")}>
        {!copied() ? "برای کپی کلیک کنید" : <>
          کپی شد!
          <AiFillCheckCircle class="inline mr-2 !w-max" />
        </>}
      </TooltipContent>
    </Tooltip>
  );
};

export default Copyable;

