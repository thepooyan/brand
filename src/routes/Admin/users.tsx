import { createAsync, query } from "@solidjs/router"
import { createEffect, Show } from "solid-js"
import { callModal } from "~/components/layout/Modal"
import LoadingSuspense from "~/components/pages/LoadingSuspense"
import { db } from "~/db/db"
import { safeDb2 } from "~/lib/utils"

const queryAdminUsers = query(async () => {
  return safeDb2(
    db.query.usersTable.findMany({
      orderBy: (tbl => tbl.id)
    })
  )
}, "adminUsers")

const users = () => {

  const users = createAsync(() => queryAdminUsers())

  createEffect(() => {
    if (users()?.ok === false) callModal.fail(users()?.msg)
  })

  return (
    <div>
      <LoadingSuspense>
        <Show when={users()?.data}>
          {data => JSON.stringify(data()) }
        </Show>
      </LoadingSuspense>
    </div>
  )
}

export default users
