"use server"

import { db } from "~/db/db"
import { isAdminLoggedIn } from "./serverUtil"

export const getAllTickets = async () => {
  if (!await isAdminLoggedIn()) return null
  return await db.query.ticketTable.findMany()
}
