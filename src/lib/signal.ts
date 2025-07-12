import { createAsync, query, redirect, revalidate, useLocation } from "@solidjs/router";
import { clearAuthSession, getAuthSession, updateAuthSession } from "./session";

const userQuery = (back?: string) => query(async () => {
  let user = await getAuthSession()
  if (!user) throw redirect(back ? `/Login?back=${back}` : "/Login")
  return user
}, "user")()

const isLoggedInQuery = query(async () => {
  return await getAuthSession()
}, "isLoggedIn")

export const useIsLoggedIn = () => {
  return createAsync(() => isLoggedInQuery())
}

export const getUser = () => {
  const location = useLocation() 
  return createAsync(() => userQuery(location.pathname), {deferStream: true})
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
