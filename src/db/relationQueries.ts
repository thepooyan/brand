import { db } from "./db"

export const queryTicketsWithRelations = async () => await db.query.ticketTable.findMany({with: {user: true}})
export type TicketWithRelations = Awaited<ReturnType<typeof queryTicketsWithRelations>>[number]
