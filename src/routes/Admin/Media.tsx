import { createAsync } from "@solidjs/router"
import { For, Show, Suspense } from "solid-js"
import AdminImage from "~/components/parts/admin/AdminImage"
import { Loading } from "~/components/parts/Loading"
import { Button } from "~/components/ui/button"
import { listS3Files } from "~/s3/s3Actions"

const Media = () => {
  const files = createAsync(() => listS3Files())

  return (
    <>
      <Button class="m-5">افزودن</Button>

      <Suspense fallback={<Loading/>}>
        <div class="grid grid-cols-3">
          <Show when={files()}>
            {f => <For each={f()}>
              {i => <AdminImage url={i}/>}
            </For>}
          </Show>
        </div>
      </Suspense>
    </>
  )
}

export default Media
