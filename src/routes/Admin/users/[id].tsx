import { createAsync, query, useParams } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { Show } from "solid-js"
import UserDetails from "~/components/admin/user-details"
import LoadingSuspense from "~/components/pages/LoadingSuspense"
import { db } from "~/db/db"
import { partialUsersWith } from "~/db/relationQueries"
import { safeDb } from "~/lib/utils"

const queryUser = query(async (id: number) => {
  "use server"
  return safeDb(
    db.query.usersTable.findFirst({
      where: (tbl => eq(tbl.id, id)),
      with: partialUsersWith
    })
  )
}, "adminUser")

const id = () => {

  const {id} = useParams()
  const user = createAsync(() => queryUser(parseInt(id)))

  return (
    <LoadingSuspense>
      <Show when={user()?.data}>
        {d => <UserDetails user={d}/>}
      </Show>
    </LoadingSuspense>
  )
}

export default id
