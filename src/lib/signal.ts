import { createAsync, query, redirect, revalidate } from "@solidjs/router";
import { clearAuthSession, getAuthSession, updateAuthSession } from "./session";

const userQuery = query(async (to?: string) => {
  let user = await getAuthSession()
  if (!user) throw redirect(to ? to : "/Login")
  return user
}, "user")

const isLoggedInQuery = query(async () => {
  return await getAuthSession()
}, "isLoggedIn")

export const useIsLoggedIn = () => {
  return createAsync(() => isLoggedInQuery())
}

export const getUser = (redirect?: string) => {
  return createAsync(() => userQuery(redirect), {deferStream: true})
}

export const logUserOut = async () => {
  await clearAuthSession()
  revalidate("user")
  revalidate("userRedirect")
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
