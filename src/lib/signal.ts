import { createAsync, query, redirect, revalidate, useLocation } from "@solidjs/router";
import { clearAuthSession, getAuthSession, ROLES, AuthSessionData, updateAuthSession } from "./session";
import { DeepPartial } from "ai";

const userQuery = (back?: string) => query(async () => {
  let user = await getAuthSession()
  if (!user) throw redirect(back ? `/Login?back=${back}` : "/Login")
  return user
}, "user")()

const adminUserQuery = (back?: string) => query(async () => {
  let user = await getAuthSession()
  if (!user) throw redirect(back ? `/Login?back=${back}` : "/Login")
  if (user.role !== ROLES.ADMIN) throw redirect("/")
  return user
}, "adminUser")()

const isLoggedInQuery = query(async () => {
  return await getAuthSession()
}, "isLoggedIn")

export const useIsLoggedIn = () => {
  return createAsync(() => isLoggedInQuery(), {deferStream: true})
}

export const getUser = () => {
  const location = useLocation() 
  return createAsync(() => userQuery(location.pathname), {deferStream: true})
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

export const getAdminUser = () => {
  const location = useLocation() 
  return createAsync(() => adminUserQuery(location.pathname), {deferStream: true})
}
