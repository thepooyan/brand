import { createAsync, query } from "@solidjs/router"
import { createEffect, Show } from "solid-js"
import UsersPage from "~/components/admin/users-page"
import { callModal } from "~/components/layout/Modal"
import LoadingSuspense from "~/components/pages/LoadingSuspense"
import { db } from "~/db/db"
import { useAdminQuery } from "~/lib/hooks"
import { safeDb2 } from "~/lib/utils"

const queryAdminUsers = query(async () => {
  "use server"

  await useAdminQuery()

  return safeDb2(
    db.query.usersTable.findMany({
      orderBy: (tbl => tbl.id),
      with: {current_plans: true, bots: true, admin: true}
    })
  )
}, "adminUsers")


const users = () => {

  const users = createAsync(() => queryAdminUsers())

  createEffect(() => {
    if (users()?.ok === false) callModal.fail(users()?.msg)
  })

  return (
    <>
      <LoadingSuspense>
        <Show when={users()?.data}>
          {data =>  <UsersPage users={data}/>}
        </Show>
      </LoadingSuspense>
    </>
  )
}

export default users
