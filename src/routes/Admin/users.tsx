import { createAsync, query } from "@solidjs/router"
import { createEffect, Show } from "solid-js"
import UsersPage from "~/components/admin/users-page"
import { callModal } from "~/components/layout/Modal"
import LoadingSuspense from "~/components/pages/LoadingSuspense"
import { db } from "~/db/db"
import { AdminData, Chatbot, PlanInstance, User } from "~/db/schema"
import { useAdminQuery } from "~/lib/hooks"
import { safeDb2 } from "~/lib/utils"

const queryAdminUsers = query(async () => {

  await useAdminQuery()

  return safeDb2(
    db.query.usersTable.findMany({
      orderBy: (tbl => tbl.id),
      with: {
        current_plans: {
          columns: {id: true, plan_id: true, remainingMessages: true, boughtDate: true, expirationDate: true}
        },
        bots: {
          columns: {id: true, botName: true, businessName: true, websiteUrl: true}
        },
        admin: true
      },
    }),
  )
}, "adminUsers")

export type PartialUser = User & {
  current_plans: Partial<PlanInstance>[],
  bots: Partial<Chatbot>[]
  admin: AdminData | null
}

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
