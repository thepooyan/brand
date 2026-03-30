import { query } from "@solidjs/router"
import { createEffect, createResource, Show } from "solid-js"
import UsersPage from "~/components/admin/users-page"
import { callModal } from "~/components/layout/Modal"
import LoadingSuspense from "~/components/pages/LoadingSuspense"
import { db } from "~/db/db"
import { useAdminQuery } from "~/lib/hooks"
import { safeDb } from "~/lib/utils"
import { Search, search } from "./searchSignal"
import { like } from "drizzle-orm"

const queryAdminUsers = query(async (s: Search) => {
  "use server"

  await useAdminQuery()

  return safeDb(
    db.query.usersTable.findMany({
      orderBy: (tbl => tbl.id),
      with: {current_plans: true, bots: true, admin: true},
      where: s.str === "" ? undefined : s.type === "name" ? (tbl => like(tbl.name, `%${s.str}%`)) : (tbl => like(tbl.number, `%${s.str}%`))
    })
  )
}, "adminUsers")


const users = () => {
  const [users] = createResource(search, (s) => queryAdminUsers(s))

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
