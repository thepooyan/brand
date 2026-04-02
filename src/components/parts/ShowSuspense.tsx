import { Accessor, JSX, Show } from "solid-js"
import LoadingSuspense from "../pages/LoadingSuspense"

interface p<T> {
  when: T | null | undefined | false
  children: (data: Accessor<T>) => JSX.Element
}
function ShowSuspense<T>(props:p<T>) {
  return (
    <LoadingSuspense>
      <Show when={props.when}>
        {(data) => props.children(data)}
      </Show>
    </LoadingSuspense>
  )
}

export default ShowSuspense
