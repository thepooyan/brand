import { PolymorphicProps } from "@kobalte/core"
import { Button, ButtonProps } from "../ui/button"
import { Accessor, ValidComponent } from "solid-js"
import Spinner from "./Spinner"
import clsx from "clsx"

interface more {
  isWaiting?: Accessor<boolean> | boolean
  reverseSpinner?: boolean
}

function MyButton<T extends ValidComponent = "button">(props: PolymorphicProps<T, ButtonProps<T>> & more) {

  let isWaiting = () => {
    if (!props.isWaiting) return
    if (typeof props.isWaiting === "boolean")
      return props.isWaiting
    else return props.isWaiting()
  }

  return (
    <Button {...props}
      disabled={isWaiting()}
      class={clsx(props.class,
        isWaiting() && "opacity-85"
      )}
    >
      {isWaiting() ? <Spinner reverse={props.reverseSpinner}/> : props.children}
    </Button>
  )
}

export default MyButton
