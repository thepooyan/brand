"use server"

import { eq } from "drizzle-orm"
import { db } from "~/db/db"
import { getAuthSession } from "~/lib/session"

export const getUserTickets = async () => {
  const user = await getAuthSession()
  
  if (!user) return null

  return db.query.ticketTable.findMany({
    where: (tbl => eq(tbl.userId, user.id))
  })
}
