import { query, redirect } from "@solidjs/router";
import { QueryClientConfig, useQuery } from "@tanstack/solid-query";
import { getAuthSession } from "./session";
import { db } from "~/db/db";
import { usersTable } from "~/db/schema";
import { eq } from "drizzle-orm";

export const queryConfig:QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5,
      staleTime: Infinity,
    }
  },
}

const getInitialProfile = query(async () => {
  "use server"
  let num = (await getAuthSession())?.number 
  if (!num) throw redirect("/Login")
  return (await db.select().from(usersTable).where(eq(usersTable.number, num))).at(0)
}, "profile")

export const profileQuery = () => useQuery(() => ({
  queryKey: ["profile"],
  queryFn: () => getInitialProfile()
}))
