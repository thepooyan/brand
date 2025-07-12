import { query, redirect, revalidate } from "@solidjs/router";
import { clearAuthSession, getAuthSession, updateAuthSession } from "./session";

export const userQueryRedirect = query(async () => {
  console.log("qr")
  let user = await getAuthSession()
  if (!user) throw redirect("/Login")
  return user
}, "userRedirect")

export const userQuery = query(async () => {
  return await getAuthSession()
}, "user")

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
