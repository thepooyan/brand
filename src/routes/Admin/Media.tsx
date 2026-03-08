import { createResource, For, Show, Suspense } from "solid-js"
import AdminImage from "~/components/parts/admin/AdminImage"
import AdminImageUploaderBtn from "~/components/parts/admin/AdminImageUploader"
import { Loading } from "~/components/parts/Loading"
import { listS3Files } from "~/s3/s3Actions"

const Media = () => {
  const [files, {refetch}] = createResource(() => listS3Files())
  

  return (
    <>
      <AdminImageUploaderBtn refetch={refetch} />

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
