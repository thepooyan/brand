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
      experimental_prefetchInRender: true
    }
  },
}

const getInitialProfile = (async () => {
  "use server"
  let num = (await getAuthSession())?.number 
  if (!num) return null
  return (await db.select().from(usersTable).where(eq(usersTable.number, num))).at(0)
})

export const profileQuery = () => useQuery(() => ({
  queryKey: ["profile"],
  queryFn: getInitialProfile
}))
