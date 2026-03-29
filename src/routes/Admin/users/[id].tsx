import { createAsync, query, useParams } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { createEffect, Show } from "solid-js"
import UserDetails from "~/components/admin/user-details"
import LoadingSuspense from "~/components/pages/LoadingSuspense"
import { db } from "~/db/db"
import { partialUsersWith } from "~/db/relationQueries"
import { safeDb2 } from "~/lib/utils"

const queryUser = query(async (id: number) => {
  "use server"
  return safeDb2(
    db.query.usersTable.findFirst({
      where: (tbl => eq(tbl.id, id)),
      with: partialUsersWith
    })
  )
}, "adminUser")

const id = () => {

  const {id} = useParams()
  const user = createAsync(() => queryUser(parseInt(id)))

  createEffect(() => console.log(user()))
  return (
    <LoadingSuspense>
      <Show when={user()?.data}>
        {d => <UserDetails user={d()}/>}
      </Show>
    </LoadingSuspense>
  )
}

export default id
