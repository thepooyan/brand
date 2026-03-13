"use server"

import { db } from "~/db/db"
import { isAdminLoggedIn } from "./serverUtil"


const queryTicketsWithRelations = async () => await db.query.ticketTable.findMany({with: {user: true}})
export type TicketWithRelations = Awaited<ReturnType<typeof queryTicketsWithRelations>>[number]

export const getAllTickets = async () => {
  if (!await isAdminLoggedIn()) return null
  return await queryTicketsWithRelations()
}

