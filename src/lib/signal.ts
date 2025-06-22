import { query, revalidate } from "@solidjs/router";
import { clearAuthSession, getAuthSession } from "./session";

export const authQuery = query(() => getAuthSession(), "auth")

export const logUserOut = async () => {
  await clearAuthSession()
  revalidate("auth")
}
