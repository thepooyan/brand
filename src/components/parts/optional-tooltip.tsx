import { Match, ParentProps, Switch } from "solid-js"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface props extends ParentProps {
  text: string
  active: boolean
}
const OptionalTooltip = ({ children, text, active }:props) => {
  return (
    <Switch>
      <Match when={!active}>{children}</Match>
      <Match when={active}>
        <Tooltip openDelay={0}>
          <TooltipTrigger as="div">
            {children}
          </TooltipTrigger>
          <TooltipContent>
            {text}
          </TooltipContent>
        </Tooltip>
      </Match>
    </Switch>
  )
}

export default OptionalTooltip
