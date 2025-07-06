import { query, redirect, revalidate } from "@solidjs/router";
import { clearAuthSession, getAuthSession, updateAuthSession } from "./session";

export const userQuery = query(async () => {
  let user = await getAuthSession()
  if (!user) throw redirect("/Login")
  return user
}, "user")

export const logUserOut = async () => {
  console.log("logout")
  await clearAuthSession()
  revalidate("user")
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
