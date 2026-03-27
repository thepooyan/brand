import { createAsync, query, redirect, useParams } from "@solidjs/router"
import { eq } from "drizzle-orm"
import { createEffect, Show, Suspense } from "solid-js"
import { fa } from "zod/v4/locales"
import { callModal } from "~/components/layout/Modal"
import EditBotPage from "~/components/pages/EditBotPage"
import { Loading } from "~/components/parts/Loading"
import { db } from "~/db/db"
import { ActionResponse2, ApiResponse } from "~/lib/actionAbstraction"
import { getBotById } from "~/lib/queries"
import { panelPageMarker } from "~/lib/routeChangeTransition"
import { clearAuthSession, getAuthSession } from "~/lib/session"
import { userPermissions } from "~/sections/plan"

const queryData = query(async(bot_id: number) => {
  const sessionUser = await getAuthSession()
  if (!sessionUser) throw redirect("/Login?back=/Panel/Chatbot")

  const user = await db.query.usersTable.findFirst({
    where: (tbl => eq(tbl.id, sessionUser.id)),
    with: {bots: true, current_plans: true}
  })
  if (!user) {
    await clearAuthSession()
    throw redirect("/Login?back=/Panel/Chatbot")
  }
  const permissions = userPermissions(user)
  const targetBot = user.bots.find(b => b.id === bot_id)

  if (!permissions ) return {ok: false, msg: "طرح شما منتقضی شده است. لطفا ابتدا طرح خود را تمدید کنید.", data: undefined}
  if (!targetBot) return {ok: false, msg: "ربات مورد نظر یافت نشد", data: undefined}

  return {ok: true, msg: undefined, data: {permissions, targetBot}}
}, "permissionsAndBot")

const testbot = () => {
  const params = useParams()
  const data = createAsync(() => queryData(parseInt(params.id)))

  createEffect(() => {
    if (!data()?.ok) callModal.fail(data()?.msg)
  })

  return (
    <div {...panelPageMarker()}>
      <Suspense fallback={<Loading />}>
        <Show when={data()?.data}>
          {
            presentData => <EditBotPage bot={presentData().targetBot} permission={presentData().permissions}/>
          }
        </Show>
      </Suspense>
    </div>
  )
}

export default testbot
