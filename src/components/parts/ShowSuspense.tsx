import { Accessor, Show } from "solid-js"
import LoadingSuspense from "../pages/LoadingSuspense"

interface p<T> {
  when: T | boolean | null | undefined
  children: (data: Accessor<T | true>) => Element | string
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
