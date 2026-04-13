import { createAsync, query, redirect, revalidate, useLocation } from "@solidjs/router";
import { clearAuthSession, getAuthSession, ROLES, AuthSessionData, updateAuthSession } from "./session";
import { DeepPartial } from "ai";
import { safeDb } from "./utils";
import { DB, dbCtx } from "~/db/db";
import { eq } from "drizzle-orm";
import { Fetch, fetchFail, fetchSuccess } from "./actionAbstraction";
import { User_Plan_Bots_Admin } from "~/db/schema";
import { serverUtil } from "~/server/serverUtil";

export const userQuery = query(async () => {
  return await getAuthSession()
}, "user")

export const strictUserQuery = (back?: string) => query(async () => {
  let user = await getAuthSession()
  if (!user) throw redirect(back ? `/Login?back=${back}` : "/Login")
  return user
}, "strictUser")()

export const adminUserQuery = (back?: string) => query(async () => {
  let user = await getAuthSession()
  if (!user) throw redirect(back ? `/Login?back=${back}` : "/Login")
  if (user.role !== ROLES.ADMIN) throw redirect("/")
  return user
}, "adminUser")()

export const useGetUser = (throwRedirect = false) => {
  if (!throwRedirect) {
    return createAsync(() => userQuery())
  }
  const location = useLocation() 
  return createAsync(() => strictUserQuery(location.pathname), {deferStream: true})
}

export const useGetAdminUser = () => {
  const location = useLocation() 
  return createAsync(() => adminUserQuery(location.pathname), {deferStream: true})
}

export const logUserOut = async () => {
  await clearAuthSession()
  revalidate("user")
  revalidate("isLoggedIn")
}

export const updateUserSession = async (data: DeepPartial<AuthSessionData>) => {
  let user = await getAuthSession()
  if (!user) throw redirect("/Login")
  await updateAuthSession({user: {
    ...user,
    ...data.user
  }})
}

interface options {
}
export const getUserServer = serverUtil(async (ctx: dbCtx | DB, _?: options):Fetch<User_Plan_Bots_Admin> => {
  const user = await getAuthSession()
  if (!user) return fetchFail("لطفا ابتدا لوگین کنید")

  const result = await safeDb(
    ctx.query.usersTable.findFirst({
      where: (tbl => eq(tbl.id, user.id)),
      with: {current_plans: true, admin: true, bots: true}
    })
  )
  if (!result.data) {
    return fetchFail("کاربر یافت نشد")
  }
  return fetchSuccess(result.data)
})
