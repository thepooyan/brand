import { createAsync } from "@solidjs/router"
import { For, Show } from "solid-js"
import AdminImage from "~/components/parts/admin/AdminImage"
import { listS3Files } from "~/s3/s3Actions"

const Media = () => {
  const files = createAsync(() => listS3Files())

  return (
    <div class="grid grid-cols-3">
      <Show when={files()}>
        {f => <For each={f()}>
          {i => <AdminImage url={i}/>}
        </For>}
      </Show>
    </div>
  )
}

export default Media
