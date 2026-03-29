import { desc, eq } from "drizzle-orm"
import { db } from "./db"
import { AdminData, Chatbot, PlanInstance, User } from "./schema"

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

export type PartialUser = User & {
  current_plans: Partial<PlanInstance>[],
  bots: Partial<Chatbot>[]
  admin: AdminData | null
}

export const partialUsersWith = {
  current_plans: {
    columns: {id: true, plan_id: true, remainingMessages: true, boughtDate: true, expirationDate: true}
  },
  bots: {
    columns: {id: true, botName: true, businessName: true, websiteUrl: true}
  },
  admin: true
} as const
