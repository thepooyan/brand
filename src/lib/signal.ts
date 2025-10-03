import { createAsync, query, redirect, revalidate, useLocation } from "@solidjs/router";
import { clearAuthSession, getAuthSession, ROLES, updateAuthSession } from "./session";

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

export const updateUserSession = async (name: string, email: string) => {
  let user = await getAuthSession()
  if (!user) throw redirect("/Login")
  await updateAuthSession({user: {
    ...user,
    email,
    name
  }})
}

export const getAdminUser = () => {
  const location = useLocation() 
  return createAsync(() => adminUserQuery(location.pathname), {deferStream: true})
}
