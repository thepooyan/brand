import { PolymorphicProps } from "@kobalte/core"
import { Button, ButtonProps } from "../ui/button"
import { Accessor, ValidComponent } from "solid-js"
import Spinner from "./Spinner"
import clsx from "clsx"

interface more {
  isWaiting?: Accessor<boolean>
  reverseSpinner?: boolean
}

function MyButton<T extends ValidComponent = "button">(props: PolymorphicProps<T, ButtonProps<T>> & more) {

  return (
    <Button {...props}
      disabled={props.isWaiting && props.isWaiting()}
      class={clsx(props.class,
        props.isWaiting && props.isWaiting() && "opacity-85"
      )}
    >
      {props.isWaiting && props.isWaiting() ? <Spinner reverse={props.reverseSpinner}/> : props.children}
    </Button>
  )
}

export default MyButton
