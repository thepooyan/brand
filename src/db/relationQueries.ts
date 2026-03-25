import { desc } from "drizzle-orm"
import { db } from "./db"

export const queryTicketsWithRelations = async () =>
  await db.query.ticketTable.findMany(
    {
      with: {user: true},
      orderBy: (tbl => desc(tbl.updatedAt))
    })
export type TicketWithRelations = Awaited<ReturnType<typeof queryTicketsWithRelations>>[number]

export const queryUserWithRelations = async () => 
await db.query.usersTable.findMany({
    with: {current_plans: true}
  })
export type UserRelations = Awaited<ReturnType<typeof queryUserWithRelations>>[number]
