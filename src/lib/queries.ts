import { QueryClientConfig } from "@tanstack/solid-query";
import { getAuthSession } from "./session";
import { db } from "~/db/db";
import { blogsTable, chatbotTable, usersTable } from "~/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { query, redirect } from "@solidjs/router";

export const queryConfig:QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5,
      staleTime: Infinity,
      experimental_prefetchInRender: true
    }
  },
}

export const getInitialProfile = query(async () => {
  "use server"
  let num = (await getAuthSession())?.number 
  if (!num) return null
  return (await db.select().from(usersTable).where(eq(usersTable.number, num))).at(0)
}, "profile")

export const getAllBlogs = query(async () => {
  "use server"
    return await db.select().from(blogsTable).orderBy(desc(blogsTable.date))
}, "blogs")

export const getBlogBySlug = query(async (slug: string) => {
  "use server"
  const [blog] = await db.select().from(blogsTable).where(eq(blogsTable.slug, slug))
  return blog
}, "blog")

export const getBlogById = query(async (id: number) => {
  "use server"
  const [blog] = await db.select().from(blogsTable).where(eq(blogsTable.id, id))
  return blog
}, "blog")

export const getBotById = query(async (id: number) => {
  "use server"
  const user = await getAuthSession()
  if (!user) throw redirect("/Login")
  return db.query.chatbotTable.findFirst(
    {
      where: and(
        eq(chatbotTable.id , id),
        eq(chatbotTable.userId, user.id)
      )
    }
  )
}, "botById")

// export const profileQuery = () => useQuery(() => ({
//   queryKey: ["profile"],
//   queryFn: getInitialProfile
// }))
